const enunciadoEl = document.getElementById("enunciado");
const alternativasEl = document.getElementById("alternativas");
const contadorPerguntaEl = document.getElementById("contador-pergunta");
const barraProgressoEl = document.getElementById("barra-progresso");
const resultadoEl = document.getElementById("resultado");
const tituloFuturoEl = document.getElementById("titulo-futuro");
const textoResultadoEl = document.getElementById("texto-resultado");
const reiniciarBtn = document.getElementById("reiniciar");

const perguntas = [
  {
    enunciado:
      "Assim que saiu da escola, você se depara com uma nova tecnologia: um chat que responde dúvidas, cria imagens e produz áudios hiper-realistas. Qual é o seu primeiro pensamento?",
    alternativas: [
      { texto: "Isso é assustador e exige cuidado.", valor: 1 },
      { texto: "Isso é fascinante e pode ajudar muita gente.", valor: 2 }
    ]
  },
  {
    enunciado:
      "A professora de tecnologia propôs uma sequência de aulas sobre IA. No fim, ela pede que você escreva um trabalho sobre o uso da tecnologia em sala de aula. Qual atitude você toma?",
    alternativas: [
      {
        texto:
          "Uso uma ferramenta com IA para encontrar informações relevantes e entender melhor o tema.",
        valor: 2
      },
      {
        texto:
          "Escrevo o texto baseado apenas no que conheço e em pesquisas manuais.",
        valor: 1
      }
    ]
  },
  {
    enunciado:
      "Durante uma discussão, o assunto foi como a IA pode afetar o futuro do trabalho. Como você se posiciona?",
    alternativas: [
      {
        texto:
          "Preocupo-me com os trabalhadores e defendo regras para proteger empregos.",
        valor: 1
      },
      {
        texto:
          "Acredito que a IA pode criar novas oportunidades e melhorar habilidades humanas.",
        valor: 2
      }
    ]
  },
  {
    enunciado:
      "Ao final da discussão, você precisa criar uma imagem para representar o que pensa sobre IA. O que você faz?",
    alternativas: [
      { texto: "Crio uma imagem com um editor simples, como o Paint.", valor: 1 },
      { texto: "Uso um gerador de imagens por IA para expressar a ideia.", valor: 2 }
    ]
  },
  {
    enunciado:
      "Você tem um trabalho em grupo de biologia para entregar. Uma pessoa do grupo usa IA para escrever grande parte do texto, mas o conteúdo ficou quase igual ao do chat. O que você faz?",
    alternativas: [
      {
        texto:
          "Reviso com atenção, acrescento ideias próprias e deixo o texto crítico e original.",
        valor: 2
      },
      {
        texto:
          "Aceito o texto inteiro do chat sem questionar a qualidade ou a originalidade.",
        valor: 0
      }
    ]
  },
  {
    enunciado:
      "Em uma aula de história, o professor pede para resumir um tema importante usando IA. Você prefere: ",
    alternativas: [
      {
        texto: "Pedir ajuda à IA para resumir, mas depois comparar com fontes confiáveis.",
        valor: 2
      },
      {
        texto: "Escrever o resumo sozinho sem usar nenhum recurso digital.",
        valor: 1
      }
    ]
  },
  {
    enunciado:
      "Se a IA pudesse recomendar o seu futuro profissional, o que você acha que deveria acontecer?",
    alternativas: [
      {
        texto: "Ela deve apoiar decisões, mas as pessoas precisam decidir o que é melhor para elas.",
        valor: 2
      },
      {
        texto: "Ela deve assumir todas as decisões, porque sabe mais do que as pessoas.",
        valor: 0
      }
    ]
  },
  {
    enunciado:
      "Ao pensar no uso de IA na escola, qual visão você mais valoriza?",
    alternativas: [
      {
        texto: "Usar a tecnologia com ética, criatividade e pensamento crítico.",
        valor: 2
      },
      {
        texto: "Usar a IA sem limites, desde que seja rápida e prática.",
        valor: 1
      }
    ]
  }
];

let indiceAtual = 0;
let pontuacaoTotal = 0;

function atualizaProgresso() {
  const progresso = ((indiceAtual + 1) / perguntas.length) * 100;
  contadorPerguntaEl.textContent = `Pergunta ${indiceAtual + 1} de ${perguntas.length}`;
  barraProgressoEl.style.width = `${progresso}%`;
}

function mostraPergunta() {
  const perguntaAtual = perguntas[indiceAtual];

  enunciadoEl.textContent = perguntaAtual.enunciado;
  alternativasEl.innerHTML = "";
  atualizaProgresso();

  perguntaAtual.alternativas.forEach((alternativa) => {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.textContent = alternativa.texto;
    botao.addEventListener("click", () => selecionarResposta(alternativa.valor));
    alternativasEl.appendChild(botao);
  });
}

function selecionarResposta(valor) {
  pontuacaoTotal += valor;
  indiceAtual += 1;

  if (indiceAtual < perguntas.length) {
    mostraPergunta();
    return;
  }

  mostrarResultado();
}

function mostrarResultado() {
  const resultado = obterResultado();

  document.querySelector(".quiz").hidden = true;
  resultadoEl.hidden = false;
  tituloFuturoEl.textContent = resultado.titulo;
  textoResultadoEl.textContent = resultado.texto;
}

function obterResultado() {
  if (pontuacaoTotal >= 12) {
    return {
      titulo: "IA como aliada humana",
      texto:
        "Você vê a inteligência artificial como uma ferramenta poderosa, mas entende que a responsabilidade, a crítica e a criatividade humanas continuam essenciais. Esse caminho pode levar a um futuro em que tecnologia e pessoas crescem juntas, com inovação e ética trabalhando lado a lado."
    };
  }

  if (pontuacaoTotal >= 7) {
    return {
      titulo: "Futuro em equilíbrio",
      texto:
        "Seu pensamento mostra uma visão consciente da IA: ela pode trazer benefícios, mas precisa ser usada com mente crítica e responsabilidade. O futuro depende de como as pessoas escolhem construir regras, educar a sociedade e garantir que a tecnologia sirva ao bem coletivo."
    };
  }

  return {
    titulo: "IA com riscos e desafios",
    texto:
        "Você percebe os impactos da IA com cautela, especialmente quando a tecnologia é usada sem revisão, critério ou pensamento humano. Isso mostra um olhar importante, porque o futuro da IA depende também de como a sociedade decide limitar erros, proteger pessoas e manter a ética no centro da inovação."
  };
}

function reiniciarQuiz() {
  indiceAtual = 0;
  pontuacaoTotal = 0;
  document.querySelector(".quiz").hidden = false;
  resultadoEl.hidden = true;
  mostraPergunta();
}

reiniciarBtn.addEventListener("click", reiniciarQuiz);
mostraPergunta();