// Dados fictícios de demonstração. Edite perguntas e respostas aqui.
const pesquisa = {
  "aviso": "SIMULAÇÃO ACADÊMICA: respostas fictícias, não coletadas com os participantes.",
  "escala": "1 = muito ruim; 5 = excelente",
  "perguntas": [
    "O cardápio é fácil de navegar?",
    "As informações dos produtos são claras?",
    "O visual do site é agradável?",
    "É fácil adicionar produtos à sacola?",
    "Você recomendaria a experiência do site?"
  ],
  "participantes": [
    {
      "nome": "Joedson da Cruz",
      "respostas": [
        5,
        5,
        5,
        4,
        5
      ]
    },
    {
      "nome": "Luiz Otávio Pinheiros Medeiros",
      "respostas": [
        4,
        5,
        5,
        4,
        5
      ]
    },
    {
      "nome": "Lucas Silva Freitas",
      "respostas": [
        5,
        4,
        4,
        5,
        4
      ]
    },
    {
      "nome": "Jardel Ribeiro dos Santos",
      "respostas": [
        4,
        4,
        5,
        4,
        4
      ]
    },
    {
      "nome": "Thercya Silva Papalardo",
      "respostas": [
        5,
        5,
        4,
        5,
        5
      ]
    }
  ]
};
const el = id => document.getElementById(id);
el("notice").textContent=pesquisa.aviso+" "+pesquisa.escala;
const addText=(parent,tag,value)=>{const node=document.createElement(tag);node.textContent=value;parent.appendChild(node);return node;};
pesquisa.perguntas.forEach(q=>addText(el("questions"),"li",q));
pesquisa.participantes.forEach(p=>{const section=addText(el("responses"),"section","");section.className="person";addText(section,"h3",p.nome);const list=addText(section,"ol","");p.respostas.forEach((r,i)=>addText(list,"li",pesquisa.perguntas[i]+" — "+r+"/5"));});
pesquisa.perguntas.forEach((q,i)=>{const row=document.createElement("tr");addText(row,"td",q);const avg=pesquisa.participantes.reduce((sum,p)=>sum+p.respostas[i],0)/pesquisa.participantes.length;addText(row,"td",avg.toFixed(1).replace(".",","));el("summary").appendChild(row);});
