let products = [
 {id:1,name:"Chocolate Belga",category:"Clássicos",price:12.90,rating:"4,9",tag:"Mais vendido",description:"Massa de chocolate intenso, recheio cremoso e cobertura aveludada de chocolate belga.",image:"https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=85"},
 {id:2,name:"Red Velvet",category:"Especiais",price:13.90,rating:"4,9",tag:"Favorito",description:"Massa red velvet macia com creme suave e um toque delicado de baunilha.",image:"https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&w=800&q=85"},
 {id:3,name:"Baunilha & Frutas",category:"Frutados",price:11.90,rating:"4,8",tag:"Levinho",description:"Massa de baunilha, creme delicado e frutas selecionadas para um sabor fresco.",image:"https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=800&q=85"},
 {id:4,name:"Doce de Leite",category:"Clássicos",price:12.50,rating:"4,8",tag:"Artesanal",description:"Massa amanteigada com recheio generoso de doce de leite e cobertura cremosa.",image:"https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&w=800&q=85"},
 {id:5,name:"Morango Encantado",category:"Frutados",price:13.50,rating:"5,0",tag:"Da estação",description:"Cupcake delicado com notas de morango e cobertura rosada feita artesanalmente.",image:"assets/morango-encantado.jpg"},
 {id:6,name:"Cookies & Cream",category:"Especiais",price:13.90,rating:"4,9",tag:"Irresistível",description:"Massa macia, creme inspirado em cookies e pedacinhos crocantes em cada mordida.",image:"https://images.unsplash.com/photo-1603532648955-039310d9ed75?auto=format&fit=crop&w=800&q=85"},
 {id:7,name:"Cenoura com Brigadeiro",category:"Clássicos",price:11.90,rating:"4,8",tag:"Conforto",description:"Massa fofinha de cenoura com brigadeiro cremoso, uma combinação cheia de afeto.",image:"https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=800&q=85"},
 {id:8,name:"Limão Siciliano",category:"Frutados",price:12.90,rating:"4,7",tag:"Refrescante",description:"Massa leve com toque cítrico de limão siciliano e cobertura suave.",image:"https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=85"}
];
const money = value => value.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
let cart = [];
let category = "Todos";
let toastTimer;
let apiConnected = false;
const $ = id => document.getElementById(id);
const grid = $("productGrid");
function renderProducts(){
 const term = $("searchInput").value.trim().toLocaleLowerCase("pt-BR");
 const filtered = products.filter(p => (category==="Todos" || p.category===category) && `${p.name} ${p.description} ${p.category}`.toLocaleLowerCase("pt-BR").includes(term));
 grid.innerHTML = filtered.map(p=>`<article class="product-card">
  <div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.src='assets/referencia-interface.png'"><span class="product-tag">${p.tag}</span></div>
  <div class="product-info"><div class="product-title-row"><h3>${p.name}</h3><span class="rating">★ ${p.rating}</span></div><p>${p.description}</p><div class="product-bottom"><span class="price">${money(p.price)}</span><button class="add-button" data-add="${p.id}" aria-label="Adicionar ${p.name} à sacola">+</button></div></div>
 </article>`).join("");
 $("emptyState").classList.toggle("hidden",filtered.length>0);
}
function notify(message){const el=$("toast");el.textContent=message;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),2600)}
function addToCart(id){const product=products.find(p=>p.id===id);const existing=cart.find(i=>i.id===id);if(existing)existing.qty++;else cart.push({...product,qty:1});renderCart();notify(`${product.name} adicionado à sacola!`)}
function changeQty(id,delta){const item=cart.find(i=>i.id===id);if(!item)return;item.qty+=delta;if(item.qty<=0)cart=cart.filter(i=>i.id!==id);renderCart()}
function renderCart(){
 const count=cart.reduce((n,i)=>n+i.qty,0), subtotal=cart.reduce((n,i)=>n+i.price*i.qty,0), fee=count?8:0;
 $("cartCount").textContent=count;$("cartItems").innerHTML=cart.map(i=>`<div class="cart-line"><img src="${i.image}" alt=""><div><h4>${i.name}</h4><small>${money(i.price)} cada</small><div class="quantity"><button data-qty="${i.id}" data-delta="-1" aria-label="Diminuir quantidade">−</button><span>${i.qty}</span><button data-qty="${i.id}" data-delta="1" aria-label="Aumentar quantidade">+</button></div></div><button class="remove-item" data-remove="${i.id}" aria-label="Remover ${i.name}">×</button></div>`).join("");
 const empty=cart.length===0;$("cartEmpty").classList.toggle("hidden",!empty);$("cartSummary").classList.toggle("hidden",empty);
 $("subtotal").textContent=money(subtotal);$("deliveryFee").textContent=money(fee);$("total").textContent=money(subtotal+fee);$("checkoutTotal").textContent=money(subtotal+fee);
}
function openCart(){ $("overlay").classList.remove("hidden");$("cartDrawer").classList.add("open");$("cartDrawer").setAttribute("aria-hidden","false");document.body.style.overflow="hidden"}
function closeCart(){ $("overlay").classList.add("hidden");$("cartDrawer").classList.remove("open");$("cartDrawer").setAttribute("aria-hidden","true");document.body.style.overflow=""}
function showProduct(id){const p=products.find(x=>x.id===id);if(!p)return;$("productDetail").innerHTML=`<img class="detail-image" src="${p.image}" alt="${p.name}"><div class="detail-body"><p class="eyebrow">${p.category.toUpperCase()}</p><h2>${p.name}</h2><p class="rating">★ ${p.rating} · preparado artesanalmente</p><p>${p.description}</p><div class="detail-bottom"><strong class="price">${money(p.price)}</strong><button class="button button-primary" data-add="${p.id}">Adicionar à sacola <span>＋</span></button></div></div>`;$("productDialog").showModal()}
$("filters").addEventListener("click",e=>{const btn=e.target.closest("[data-category]");if(!btn)return;category=btn.dataset.category;document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b===btn));renderProducts()});
$("searchInput").addEventListener("input",renderProducts);
grid.addEventListener("click",e=>{const add=e.target.closest("[data-add]");if(add){addToCart(Number(add.dataset.add));return}const card=e.target.closest(".product-card");if(card){const index=[...grid.children].indexOf(card);const term=$("searchInput").value.trim().toLocaleLowerCase("pt-BR");const filtered=products.filter(p=>(category==="Todos"||p.category===category)&&`${p.name} ${p.description} ${p.category}`.toLocaleLowerCase("pt-BR").includes(term));if(filtered[index])showProduct(filtered[index].id)}});
document.addEventListener("click",e=>{const add=e.target.closest("[data-add]");if(add && !grid.contains(add)){addToCart(Number(add.dataset.add));if($("productDialog").open)$("productDialog").close()}const qty=e.target.closest("[data-qty]");if(qty)changeQty(Number(qty.dataset.qty),Number(qty.dataset.delta));const remove=e.target.closest("[data-remove]");if(remove){cart=cart.filter(i=>i.id!==Number(remove.dataset.remove));renderCart()}});
$("openCart").addEventListener("click",openCart);$("closeCart").addEventListener("click",closeCart);$("overlay").addEventListener("click",closeCart);$("browseProducts").addEventListener("click",()=>{closeCart();$("cardapio").scrollIntoView({behavior:"smooth"})});
$("closeProduct").addEventListener("click",()=>$("productDialog").close());$("closeCheckout").addEventListener("click",()=>$("checkoutDialog").close());
$("checkoutButton").addEventListener("click",()=>{closeCart();$("successState").classList.add("hidden");$("checkoutForm").classList.remove("hidden");$("checkoutDialog").showModal()});
$("checkoutForm").addEventListener("submit",async e=>{
 e.preventDefault();
 if(!cart.length){notify("Sua sacola está vazia.");$("checkoutDialog").close();return}
 const data=new FormData(e.currentTarget);
 const payload={name:String(data.get("name")||"").trim(),email:String(data.get("email")||"").trim(),phone:String(data.get("phone")||"").trim(),address:String(data.get("address")||"").trim(),payment:String(data.get("payment")||""),items:cart.map(i=>({id:i.id,qty:i.qty}))};
 if(!apiConnected){
  const code=`DEMO-${Math.random().toString(36).slice(2,8).toUpperCase()}`;
  $("successTitle").textContent="Resumo demonstrativo criado!";
  $("successMessage").textContent=`${payload.name.split(/\s+/)[0]}, seu resumo ${code} foi montado neste navegador. Total estimado: ${money(cart.reduce((sum,item)=>sum+item.price*item.qty,0)+8)}. Nenhum pedido foi enviado ou salvo.`;
  $("successNotice").textContent="Modo Live Server: este resumo existe apenas nesta demonstração e não foi gravado no banco de dados.";
  $("checkoutForm").classList.add("hidden");$("successState").classList.remove("hidden");cart=[];renderCart();return;
 }
 const submit=e.currentTarget.querySelector('button[type="submit"]'); if(submit){submit.disabled=true;submit.dataset.originalText=submit.textContent;submit.textContent="Registrando pedido…"}
 try{
  const response=await fetch("api/orders",{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(payload)});
  const result=await response.json(); if(!response.ok)throw new Error(result.error||"Não foi possível registrar o pedido.");
  const order=result.data; $("successMessage").textContent=`${payload.name.split(/\s+/)[0]}, seu pedido ${order.code} foi registrado com sucesso. Total: ${money(order.total)}. Pagamento não processado: modo de demonstração.`;
  $("successTitle").textContent="Pedido demonstrativo registrado!";
  $("successNotice").textContent="Este pedido foi registrado no banco configurado para fins demonstrativos. Nenhum pagamento foi processado.";
  $("checkoutForm").classList.add("hidden");$("successState").classList.remove("hidden");cart=[];renderCart();
 }catch(error){notify(error.message||"Falha ao registrar pedido. Tente novamente.")}
 finally{if(submit){submit.disabled=false;submit.textContent=submit.dataset.originalText||"Finalizar pedido"}}
});
$("finishSuccess").addEventListener("click",()=>{$("checkoutDialog").close();$("checkoutForm").reset();$("checkoutForm").classList.remove("hidden");$("successState").classList.add("hidden");notify("Obrigado por visitar a Cupcake Gourmet!")});
$("contactOrder").addEventListener("click",()=>{if(cart.length)openCart();else{$("cardapio").scrollIntoView({behavior:"smooth"});notify("Escolha seus sabores favoritos para começar.")}});
$("menuToggle").addEventListener("click",()=>{const open=$("mainNav").classList.toggle("open");$("menuToggle").setAttribute("aria-expanded",String(open));$("menuToggle").textContent=open?"×":"☰"});
$("mainNav").addEventListener("click",e=>{if(e.target.closest("a")){$("mainNav").classList.remove("open");$("menuToggle").setAttribute("aria-expanded","false");$("menuToggle").textContent="☰"}});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeCart()});
$("year").textContent=new Date().getFullYear();renderProducts();renderCart();
(async()=>{try{const response=await fetch("api/products",{headers:{"Accept":"application/json"}});if(!response.ok)throw new Error("API indisponível");const result=await response.json();if(Array.isArray(result.data)&&result.data.length){products=result.data.map(p=>({...p,id:Number(p.id),price:Number(p.price),rating:Number(p.rating).toLocaleString("pt-BR",{minimumFractionDigits:1,maximumFractionDigits:1})}));apiConnected=true;renderProducts();renderCart();}}catch(_){apiConnected=false;console.info("Cupcake Gourmet: usando catálogo local de demonstração; pedidos não serão gravados.")}})();