<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
function respond(int $code, array $data): never { http_response_code($code); echo json_encode($data,JSON_UNESCAPED_UNICODE); exit; }
function db(): PDO {
 $file=__DIR__.'/config/database.php';
 if (!is_file($file)) respond(500,['error'=>'Arquivo config/database.php ausente. Copie o exemplo conforme README.']);
 $c=require $file;
 try { return new PDO('mysql:host='.$c['host'].';port='.$c['port'].';dbname='.$c['database'].';charset=utf8mb4',$c['username'],$c['password'],[PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION,PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC,PDO::ATTR_EMULATE_PREPARES=>false]); }
 catch(Throwable $e) { error_log($e->getMessage()); respond(500,['error'=>'Falha na conexão MySQL. Verifique config/database.php e o XAMPP.']); }
}
function payload(): array { $d=json_decode(file_get_contents('php://input')?:'',true); if(!is_array($d))respond(400,['error'=>'JSON inválido.']); return $d; }
$action=$_GET['action']??'';
try {
 $pdo=db();
 if($action==='health' && $_SERVER['REQUEST_METHOD']==='GET')respond(200,['status'=>'ok','service'=>'Cupcake Gourmet']);
 if($action==='products' && $_SERVER['REQUEST_METHOD']==='GET') {
  $rows=$pdo->query('SELECT id,name,description,category,price,image FROM products WHERE active=1 ORDER BY id')->fetchAll();
  foreach($rows as &$row)$row['price']=(float)$row['price'];
  respond(200,['data'=>$rows]);
 }
 if($action==='order' && $_SERVER['REQUEST_METHOD']==='POST') {
  $d=payload();
  $name=trim((string)($d['name']??''));$email=trim((string)($d['email']??''));$phone=trim((string)($d['phone']??''));$address=trim((string)($d['address']??''));$payment=(string)($d['payment']??'');$items=$d['items']??null;
  if(mb_strlen($name)<3||mb_strlen($name)>120)respond(422,['error'=>'Informe um nome de 3 a 120 caracteres.']);
  if(!filter_var($email,FILTER_VALIDATE_EMAIL)||strlen($email)>254)respond(422,['error'=>'E-mail inválido.']);
  if(strlen($phone)<8||strlen($phone)>30)respond(422,['error'=>'Telefone inválido.']);
  if(mb_strlen($address)<8||mb_strlen($address)>300)respond(422,['error'=>'Endereço inválido.']);
  if(!in_array($payment,['Pix (simulação)','Cartão (simulação)','Na entrega (simulação)'],true))respond(422,['error'=>'Forma de pagamento inválida.']);
  if(!is_array($items)||count($items)<1||count($items)>20)respond(422,['error'=>'Adicione de 1 a 20 produtos diferentes.']);
  $qty=[];
  foreach($items as $item) {
   if(!is_array($item))respond(422,['error'=>'Item inválido.']);
   $id=filter_var($item['id']??null,FILTER_VALIDATE_INT);$q=filter_var($item['qty']??null,FILTER_VALIDATE_INT);
   if(!$id||!$q||$q<1||$q>20)respond(422,['error'=>'Quantidade ou produto inválido.']);
   $qty[$id]=($qty[$id]??0)+$q;
   if($qty[$id]>20)respond(422,['error'=>'Limite de 20 unidades por produto.']);
  }
  $pdo->beginTransaction();
  $ids=array_keys($qty);$marks=implode(',',array_fill(0,count($ids),'?'));
  $s=$pdo->prepare("SELECT id,name,price FROM products WHERE active=1 AND id IN ($marks)");$s->execute($ids);
  $found=[];foreach($s->fetchAll() as $p)$found[(int)$p['id']]=$p;
  if(count($found)!==count($ids)){ $pdo->rollBack();respond(422,['error'=>'Produto indisponível. Atualize a página.']);}
  $subtotal=0;foreach($qty as $id=>$q)$subtotal+=(int)round((float)$found[$id]['price']*100)*$q;
  $fee=800;$total=$subtotal+$fee;$code=strtoupper(bin2hex(random_bytes(6)));
  $s=$pdo->prepare('INSERT INTO orders(code,customer_name,email,phone,address,payment_method,subtotal,delivery_fee,total) VALUES(?,?,?,?,?,?,?,?,?)');
  $s->execute([$code,$name,$email,$phone,$address,$payment,$subtotal/100,$fee/100,$total/100]);
  $orderId=(int)$pdo->lastInsertId();
  $s=$pdo->prepare('INSERT INTO order_items(order_id,product_id,product_name,quantity,unit_price) VALUES(?,?,?,?,?)');
  foreach($qty as $id=>$q)$s->execute([$orderId,$id,$found[$id]['name'],$q,$found[$id]['price']]);
  $pdo->commit();respond(201,['message'=>'Pedido registrado com sucesso.','code'=>$code,'total'=>$total/100]);
 }
 if($action==='status' && $_SERVER['REQUEST_METHOD']==='GET'){
  $code=strtoupper(trim((string)($_GET['code']??'')));
  if(!preg_match('/^[A-F0-9]{12}$/',$code))respond(422,['error'=>'Código inválido.']);
  $s=$pdo->prepare('SELECT code,status,total,created_at FROM orders WHERE code=?');$s->execute([$code]);$row=$s->fetch();
  if(!$row)respond(404,['error'=>'Pedido não encontrado.']);respond(200,['data'=>$row]);
 }
 respond(404,['error'=>'Rota não encontrada.']);
} catch(Throwable $e) {
 if(isset($pdo)&&$pdo->inTransaction())$pdo->rollBack();
 error_log('Cupcake: '.$e->getMessage());
 respond(500,['error'=>'Falha interna. Tente novamente.']);
}
