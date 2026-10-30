// Questionário demonstrativo: todas as respostas são fictícias.
const pesquisa = {
  "aviso": "SIMULAÇÃO ACADÊMICA: depoimentos fictícios atribuídos a personagens de teste, não entrevistas reais.",
  "escala": "Respostas abertas, escritas para simular a experiência de usuários.",
  "perguntas": [
    "Você conseguiu encontrar os cupcakes que queria?",
    "O que achou da aparência do site?",
    "As informações e os preços dos produtos ficaram claros?",
    "Foi fácil colocar produtos na sacola e alterar quantidades?",
    "Como foi sua experiência geral? O que melhoraria?"
  ],
  "participantes": [
    {
      "nome": "Joedson da Cruz",
      "respostas": [
        "Sim, achei os sabores bem rápido. A busca ajudou bastante.",
        "Gostei das cores e das fotos. Ficou com cara de confeitaria mesmo.",
        "Sim, deu pra entender os sabores e ver os preços sem dificuldade.",
        "Foi tranquilo. Coloquei dois cupcakes e consegui mudar a quantidade.",
        "Gostei de usar. Só colocaria mais opções de sabores."
      ]
    },
    {
      "nome": "Luiz Otávio Pinheiros Medeiros",
      "respostas": [
        "Consegui sim. Os filtros por tipo de cupcake facilitaram.",
        "O visual ficou bonito e organizado, sem muita informação na tela.",
        "Achei claro, principalmente a descrição de cada cupcake.",
        "Sim, mas demorei um pouquinho para perceber onde abria a sacola.",
        "No geral foi bom. Eu deixaria o botão da sacola mais destacado."
      ]
    },
    {
      "nome": "Lucas Silva Freitas",
      "respostas": [
        "Sim, fui direto no cardápio e encontrei o que procurava.",
        "Achei a página bonita, principalmente a parte inicial.",
        "Os preços estão visíveis. Gostaria de ver mais detalhes dos ingredientes.",
        "Foi fácil adicionar e tirar produtos da sacola.",
        "Usaria de novo. Seria legal mostrar uma previsão de entrega."
      ]
    },
    {
      "nome": "Jardel Ribeiro dos Santos",
      "respostas": [
        "Achei os produtos sem problema, usando a pesquisa por nome.",
        "Gostei do estilo, parece um site de loja de verdade.",
        "Sim. As descrições são curtas e ajudam a escolher.",
        "Consegui usar a sacola, inclusive retirar um produto.",
        "Minha experiência foi boa. Melhoraria a parte de finalizar o pedido."
      ]
    },
    {
      "nome": "Thercya Silva Papalardo",
      "respostas": [
        "Sim, gostei de poder olhar os sabores por categoria.",
        "Achei as cores delicadas e as imagens chamam atenção.",
        "Sim, os preços e as informações são fáceis de entender.",
        "Foi bem simples, mesmo testando pelo celular.",
        "Gostei bastante. Acrescentaria informações sobre alergênicos."
      ]
    }
  ]
};
const el = id => document.getElementById(id);
const addText=(parent,tag,value)=>{const node=document.createElement(tag);node.textContent=value;parent.appendChild(node);return node;};
el("notice").textContent=pesquisa.aviso+" "+pesquisa.escala;
pesquisa.perguntas.forEach(q=>addText(el("questions"),"li",q));
pesquisa.participantes.forEach(p=>{const section=addText(el("responses"),"section","");section.className="person";addText(section,"h3",p.nome);const list=addText(section,"ol","");p.respostas.forEach((r,i)=>addText(list,"li",pesquisa.perguntas[i]+" — "+r));});
const themes=[["Facilidade para encontrar produtos","Os cinco participantes simulados conseguiram encontrar os cupcakes."],["Aparência do site","As respostas destacam cores, fotos e organização."],["Informações dos produtos","Os preços foram considerados claros; surgiram sugestões sobre ingredientes e alergênicos."],["Uso da sacola","Os participantes conseguiram usar a sacola; um sugeriu destacar mais o botão."],["Melhorias sugeridas","Mais sabores, previsão de entrega e melhorias na finalização do pedido."]];
themes.forEach(([topic,summary])=>{const row=document.createElement("tr");addText(row,"td",topic);addText(row,"td",summary);el("summary").appendChild(row);});
