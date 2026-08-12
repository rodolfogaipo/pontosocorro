/* =========================================================
   PONTO SOCORRO — content-extra.js
   Trilhas adicionais: Itinerário Formativo, EMTI (Tempo
   Integral) e Ensino Técnico, com a grade curricular real
   da SEE/MG (Resolução SEE nº 5.212/2025).
   ========================================================= */

function slugify(str){
  return str.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
}

/* ---------------- TRILHAS ---------------- */
const TRACKS = [
  { id:'regular', name:'Ensino Médio Regular', subtitle:'Diurno, Noturno e EJA', icon:'🏫' },
  { id:'emti',    name:'Tempo Integral (EMTI)', subtitle:'Formação geral + atividades integradoras', icon:'⏰' },
  { id:'tecnico', name:'Ensino Técnico', subtitle:'17 cursos profissionalizantes', icon:'🛠️' },
];

/* ---------------- ITINERÁRIO FORMATIVO ----------------
   Os componentes do Itinerário, conforme a matriz oficial.
   Alguns reaproveitam tópicos já escritos (mesmo conteúdo,
   já que na prática são a mesma habilidade trabalhada). */
const ITINERARY_ITEMS = [
  { id:'leitura',        name:'Leitura e Protagonismo',                    icon:'📖', color:'#2E86AB', modules:['1ano'] },
  { id:'conexoes',       name:'Conexões Matemáticas',                      icon:'🔢', color:'#E63946', modules:['1ano'] },
  { id:'prodcultural',   name:'Produção Cultural e Comunicação',           icon:'🎭', color:'#2E86AB', modules:['2ano'] },
  { id:'inovsustentab',  name:'Inovação e Saberes em Sustentabilidade',    icon:'🌱', color:'#2A9D8F', modules:['2ano'] },
  { id:'intervcidada',   name:'Intervenção Cidadã',                        icon:'🤝', color:'#457B9D', modules:['3ano'] },
  { id:'solucoesmat',    name:'Soluções Matemáticas',                      icon:'🧮', color:'#E63946', modules:['3ano'] },
];

// mapa de aliases: reaproveita tópicos já escritos no content.js
const ITIN_ALIASES = {
  'itin_1ano_leitura':      '1ano_portugues',
  'itin_1ano_conexoes':     '1ano_matematica',
  'itin_2ano_prodcultural': '2ano_portugues',
  'itin_3ano_solucoesmat':  '3ano_matematica',
};

const ITIN_TOPICS = {
  "itin_2ano_inovsustentab": {
    title: "Inovação e Saberes em Sustentabilidade",
    emoji: "🌱",
    intro: "Sustentabilidade é usar os recursos da natureza de um jeito que dure para sempre — sem esgotar o que as próximas gerações também vão precisar.",
    analogy: "É como dividir uma pizza pensando em quem ainda vai chegar na festa: se você comer tudo agora, não sobra nada para depois. A Terra é a pizza, e as próximas gerações são os convidados que ainda vão chegar.",
    visual: {"type":"flow","steps":["Problema ambiental","Solução existente","Aplicar na realidade"]},
    steps: [
      "Identifique um problema ambiental local (lixo, água, energia...).",
      "Pesquise soluções que já existem (reciclagem, energia solar, reuso).",
      "Pense em como aplicar essa solução na sua realidade (escola, bairro, empresa)."
    ],
    exercises: [
      { level:"facil", question:"O que significa \"energia renovável\"?", options:["Energia que só existe à noite","Energia feita só de petróleo","Um tipo de energia proibido","Energia que nunca acaba, tipo solar e eólica"], correct:3, resolution:"Energias renováveis (solar, eólica, hídrica) vêm de fontes naturais que se renovam constantemente, ao contrário do petróleo, que é finito." },
      { level:"medio", question:"O que é a \"economia circular\"?", options:["Um modelo que busca reduzir, reutilizar e reciclar produtos","Um tipo de dinheiro com formato redondo usado em algumas transações comerciais antigas","Uma lei específica que proíbe totalmente qualquer tipo de comércio de produtos usados","Uma forma de gastar mais dinheiro comprando produtos novos com mais frequência do que o necessário"], correct:0, resolution:"A economia circular tenta \"fechar o ciclo\" dos produtos: reduzir o consumo de recursos novos, reutilizar o que já existe e reciclar o que não pode mais ser usado, ao invés do modelo tradicional de linha reta (produzir, usar, descartar)." },
      { level:"dificil", question:"Por que uma indústria trocar combustível fóssil por energia solar pode ser bom tanto para o ambiente quanto para o bolso, a longo prazo?", options:["A energia solar é, segundo essa ideia equivocada, sempre mais cara do que combustíveis fósseis em qualquer prazo","Nunca compensa financeiramente, segundo essa hipótese equivocada, trocar de fonte de energia numa indústria","Reduz emissões de poluentes E, depois do investimento inicial, diminui os custos de energia ao longo dos anos","Só ajuda o ambiente, nessa interpretação incorreta, sem nenhum benefício financeiro real para a empresa"], correct:2, resolution:"Apesar do investimento inicial em painéis solares ser alto, ao longo dos anos o custo de operação cai bastante (sol é \"gratuito\"), reduzindo a conta de energia — além de reduzir a emissão de gases poluentes. É um exemplo de sustentabilidade que também faz sentido econômico no longo prazo." },
      { level:"dificilimo", question:"Por que soluções sustentáveis muitas vezes exigem repensar todo um sistema, e não apenas trocar um produto por outro \"mais verde\"?", options:["Porque trocar produtos por versões \"verdes\", segundo essa ideia equivocada, sempre resolve tudo sozinho","Não existe, segundo essa hipótese equivocada, nenhuma conexão real entre esses diferentes fatores ambientais","Sustentabilidade é, nessa interpretação simplista e incompleta, apenas sobre reciclagem de lixo doméstico","Porque um problema ambiental costuma estar conectado a vários fatores (produção, transporte, consumo, descarte)"], correct:3, resolution:"Trocar um copo plástico por um \"biodegradável\", por exemplo, não resolve o problema se ele ainda for descartado incorretamente, ou se sua produção gastar muita água e energia. Pensar sistemicamente — olhando produção, transporte, uso e descarte como um todo conectado — é o que realmente permite soluções sustentáveis eficazes, e não apenas symbolic (\"de fachada\")." }
    ]
  },
  "itin_3ano_intervcidada": {
    title: "Intervenção Cidadã",
    emoji: "🤝",
    intro: "Intervenção cidadã é agir de forma organizada para melhorar um problema da sua comunidade — não é só reclamar, é fazer algo a respeito.",
    analogy: "É como perceber que a rua do seu bairro está sem iluminação e, ao invés de só reclamar, organizar um abaixo-assinado, procurar a prefeitura e mobilizar vizinhos para resolver.",
    visual: {"type":"flow","steps":["Identificar problema","Planejar ação","Executar e acompanhar"]},
    steps: [
      "Identifique um problema real da sua comunidade.",
      "Entenda quem é responsável por resolver isso (prefeitura, escola, empresa...).",
      "Planeje uma ação concreta: abaixo-assinado, campanha, reunião com autoridades.",
      "Execute e acompanhe os resultados."
    ],
    exercises: [
      { level:"facil", question:"O que é \"intervenção cidadã\"?", options:["Assistir às notícias sobre o problema sem fazer absolutamente nada a respeito dele","Agir de forma organizada para resolver um problema da comunidade","Ignorar problemas sociais, fingindo que eles simplesmente não existem na comunidade","Brigar com vizinhos sem nenhum tipo de organização ou objetivo claro definido"], correct:1, resolution:"Intervenção cidadã é a ação organizada e consciente de uma pessoa ou grupo para melhorar algo na sua comunidade, indo além de apenas observar ou reclamar." },
      { level:"medio", question:"Qual das opções é um exemplo de ação cidadã organizada?", options:["Culpar os outros publicamente sem tomar nenhuma atitude concreta a respeito do problema","Reclamar sozinho em casa, sem nenhuma tentativa real de mobilizar outras pessoas","Ignorar o problema completamente, esperando que ele se resolva sozinho com o tempo","Organizar um abaixo-assinado e levá-lo à prefeitura"], correct:3, resolution:"Um abaixo-assinado organizado, com uma proposta clara, levado ao órgão responsável, é uma forma concreta e eficaz de intervenção cidadã." },
      { level:"dificil", question:"Por que é importante identificar QUEM é o responsável (prefeitura, escola, empresa) antes de agir sobre um problema comunitário?", options:["Porque direcionar a ação ao responsável certo aumenta muito a chance de o problema ser realmente resolvido, evitando esforço desperdiçado","Serve, segundo essa ideia equivocada, apenas para culpar alguém publicamente, sem nenhuma intenção real de solução","Não importa, nessa interpretação incorreta, quem é o responsável, desde que alguém seja cobrado por qualquer coisa","Porque toda intervenção cidadã deve, segundo essa hipótese equivocada, ser feita sempre sem nenhum planejamento prévio"], correct:0, resolution:"Reclamar ou cobrar a pessoa errada não resolve o problema. Identificar corretamente quem tem poder de decisão sobre aquela questão (por exemplo, buraco na rua = prefeitura, não a escola) torna a ação muito mais eficaz." },
      { level:"dificilimo", question:"Por que movimentos de intervenção cidadã que combinam dados concretos (estatísticas, fotos, relatos documentados) com mobilização coletiva costumam ter mais impacto do que reclamações isoladas?", options:["Porque, segundo essa ideia equivocada, só a mobilização em massa importa, e dados concretos são sempre irrelevantes","Porque autoridades e a opinião pública tendem a levar mais a sério demandas bem documentadas e apoiadas por um grupo organizado","Dados, nessa interpretação incorreta, nunca fazem diferença real nesse tipo específico de ação cidadã organizada","Porque isso, segundo essa hipótese equivocada, nunca funciona de fato na prática de movimentos sociais organizados"], correct:1, resolution:"Uma reclamação isolada é fácil de ignorar. Já uma demanda com evidências concretas (números, fotos, relatos) e apoiada por um grupo mostra que o problema é real, relevante e sentido por muitas pessoas — isso aumenta a pressão social e a legitimidade perante quem tem o poder de resolver, tornando a ação muito mais efetiva." }
    ]
  }
};;;;;;;;;



/* ---------------- EMTI (Tempo Integral) ----------------
   Atividades Integradoras — o mesmo conteúdo se aplica aos
   3 anos, então o tópico é reutilizado, mudando só o "crumb". */
const EMTI_ITEMS = [
  { id:'projetodevida', name:'Projeto de Vida',        icon:'🎯', color:'#FF7A29' },
  { id:'estudosorient', name:'Estudos Orientados',      icon:'📚', color:'#2A9D8F' },
  { id:'praticasexp',   name:'Práticas Experimentais',  icon:'🔬', color:'#6A4C93' },
  { id:'nivelamentolp', name:'Nivelamento — Português',  icon:'📖', color:'#2E86AB' },
  { id:'nivelamentomat',name:'Nivelamento — Matemática', icon:'🔢', color:'#E63946' },
];

const EMTI_TOPICS = {
  "projetodevida": {
    title: "Projeto de Vida",
    emoji: "🎯",
    intro: "Projeto de Vida é um espaço para você parar e pensar: quem eu sou, o que eu quero, e quais passos vou dar para chegar lá — nos estudos, no trabalho e na vida.",
    analogy: "É como planejar uma viagem: antes de sair de casa, você decide o destino, olha o mapa e organiza o caminho. Sem isso, você anda sem rumo — pode até chegar em algum lugar, mas não necessariamente onde queria.",
    visual: {"type":"flow","steps":["Autoconhecimento","Metas curto prazo","Metas longo prazo"]},
    steps: [
      "Autoconhecimento: quais são meus interesses, valores e habilidades?",
      "Defina metas de curto prazo (este ano) e longo prazo (5-10 anos).",
      "Identifique os passos concretos para chegar lá (estudar, praticar, buscar experiência).",
      "Revise o plano de tempos em tempos — está tudo bem mudar de ideia."
    ],
    exercises: [
      { level:"facil", question:"O que é uma \"meta de curto prazo\"?", options:["Um objetivo para alcançar em pouco tempo, tipo este ano","Um objetivo distante, para daqui a uns 20 anos ou mais","Um sonho considerado impossível de se realizar algum dia","Algo que, por definição, nunca muda ao longo da vida toda"], correct:0, resolution:"Metas de curto prazo são objetivos que podem ser alcançados em pouco tempo (semanas a um ano), diferente das metas de longo prazo, que levam mais anos." },
      { level:"medio", question:"Por que é importante ter metas de curto E de longo prazo ao mesmo tempo?", options:["Metas de curto prazo, segundo essa hipótese equivocada, sempre atrapalham as metas de longo prazo","Apenas metas de curto prazo importam de verdade, nessa interpretação incorreta, sem nenhuma outra","As metas de curto prazo são os passos concretos que te levam até a meta grande de longo prazo","Não é importante ter as duas, segundo essa ideia, já que só o longo prazo realmente importa no fim"], correct:2, resolution:"Uma meta grande de longo prazo (ex: \"ser engenheiro\") pode parecer distante demais. As metas de curto prazo (ex: \"estudar matemática toda semana\") são os degraus concretos que, somados, te levam até lá." },
      { level:"dificil", question:"Por que é normal — e até saudável — mudar de ideia sobre o Projeto de Vida ao longo do Ensino Médio?", options:["Um bom projeto de vida nunca muda","Porque o autoconhecimento se desenvolve com novas experiências","Mudar de ideia é sinal de fracasso","Isso significa que a pessoa não sabe o que quer da vida"], correct:1, resolution:"Projeto de Vida não é uma decisão definitiva tomada de uma vez — é um processo. Conforme você vive novas experiências (estágios, matérias, conversas), você se conhece melhor, e é natural (e saudável) ajustar os planos com base nesse autoconhecimento crescente." },
      { level:"dificilimo", question:"Por que definir metas específicas e mensuráveis (ex: \"estudar matemática 3x por semana\") costuma funcionar melhor do que metas vagas (ex: \"quero ser melhor em matemática\")?", options:["Metas específicas permitem acompanhar o progresso de forma concreta e ajustar o plano quando necessário","Metas específicas, segundo essa hipótese equivocada, na verdade atrapalham bastante a criatividade pessoal","Metas vagas são, nessa interpretação incorreta, sempre consideradas muito mais motivadoras do que específicas","Não faz diferença nenhuma, segundo essa ideia, ter metas específicas ou vagas para planejar o futuro"], correct:0, resolution:"Esse é um princípio usado em planejamento pessoal e profissional (parecido com o método SMART): quando a meta é específica e mensurável, fica fácil saber se você está progredindo ou não, e ajustar o caminho. Metas vagas soam bem, mas são difíceis de acompanhar e acabam sendo abandonadas com mais facilidade." }
    ]
  },
  "estudosorient": {
    title: "Estudos Orientados: como estudar melhor",
    emoji: "📚",
    intro: "Estudos Orientados é o momento de aprender técnicas para estudar de um jeito mais inteligente — não é sobre estudar mais horas, é sobre estudar melhor.",
    analogy: "É como treinar para uma corrida: não adianta só correr sem técnica. Com o método certo (respiração, ritmo, descanso), você rende muito mais gastando a mesma energia.",
    visual: {"type":"compare","leftTitle":"Reler o texto","leftItems":["Fluência ilusória"],"rightTitle":"Testar-se ativamente","rightItems":["Aprendizado real"]},
    steps: [
      "Divida o estudo em blocos curtos (ex: 25 min estudando, 5 min de pausa).",
      "Revise o conteúdo em intervalos (hoje, depois de 1 dia, depois de 1 semana).",
      "Teste-se ativamente: tente responder perguntas sobre o que estudou, ao invés de só reler.",
      "Elimine distrações (celular longe) durante o tempo de foco."
    ],
    exercises: [
      { level:"facil", question:"A técnica de estudar em blocos curtos com pausas (ex: 25 min estudo + 5 min pausa) é chamada de:", options:["Técnica da Preguiça","Técnica Pomodoro","Técnica do Sono","Método Copiar e Colar"], correct:1, resolution:"A Técnica Pomodoro usa ciclos de foco intenso (geralmente 25 minutos) seguidos de pausas curtas, ajudando a manter a concentração sem cansar demais." },
      { level:"medio", question:"Por que \"reler o texto várias vezes\" é considerada uma técnica de estudo pouco eficiente, segundo pesquisas de aprendizagem?", options:["Porque dá uma falsa sensação de que você aprendeu","Reler é sempre a melhor técnica que existe","Reler nunca ajuda em nada","Não existe diferença entre reler e se testar"], correct:0, resolution:"Reler cria familiaridade com o texto, o que engana o cérebro fazendo parecer que você \"sabe\" o conteúdo. Mas técnicas ativas, como se testar (responder perguntas sem olhar o material), exercitam de verdade a memória de recuperação, que é o que você vai precisar numa prova." },
      { level:"dificil", question:"O que é a \"repetição espaçada\" e por que ela é mais eficiente que estudar tudo de uma vez na véspera da prova?", options:["É estudar sempre no mesmo dia, segundo essa ideia, sem nenhuma pausa entre os blocos de estudo","É revisar o conteúdo em intervalos crescentes de tempo (hoje, amanhã, em uma semana...)","É, segundo essa hipótese equivocada, apenas um mito sem nenhuma comprovação científica real","É estudar todo o conteúdo, nessa interpretação incorreta, uma única vez e nunca mais revisar depois"], correct:1, resolution:"A repetição espaçada aproveita como o cérebro consolida memórias: revisar o conteúdo em intervalos crescentes fortalece as conexões neurais ao longo do tempo. Estudar tudo de uma vez na véspera (o famoso \"virar a noite\") pode até ajudar a passar numa prova no dia seguinte, mas o conteúdo é esquecido muito mais rápido." },
      { level:"dificilimo", question:"Por que alunos que \"se sentem\" mais confiantes ao reler o material muitas vezes têm desempenho pior em provas do que alunos que se testam ativamente, mesmo se sentindo \"menos preparados\" durante o estudo?", options:["Porque reler é, nessa interpretação incorreta, sempre melhor, sendo isso apenas um mito da neurociência","Porque, segundo essa ideia, isso simplesmente nunca acontece de verdade na prática dos estudantes","Porque, segundo essa hipótese equivocada, a confiança nunca influencia realmente o desempenho final","Porque a releitura gera uma falsa sensação de domínio (fluência ilusória)"], correct:3, resolution:"Esse fenômeno é bem documentado em pesquisas de psicologia cognitiva: reler cria \"fluência ilusória\" — o texto fica familiar, e a familiaridade é confundida com aprendizado real. Já o teste ativo (tentar responder sem consultar) é mais desconfortável, porque expõe o que você realmente não sabe — mas é exatamente esse \"esforço de recuperar da memória\" que fortalece o aprendizado de verdade e é o mais parecido com o que a prova vai exigir." }
    ]
  },
  "praticasexp": {
    title: "Práticas Experimentais",
    emoji: "🔬",
    intro: "Práticas Experimentais é o momento de colocar a mão na massa: testar na prática o que se aprende em teoria, seja num experimento de laboratório, numa investigação de campo ou num projeto prático.",
    analogy: "Pense na diferença entre ler sobre andar de bicicleta e realmente pedalar pela primeira vez: a teoria te dá o mapa, mas é a prática que te ensina o equilíbrio de verdade.",
    visual: {"type":"flow","steps":["Hipótese","Experimento","Dados","Conclusão"]},
    steps: [
      "Formule uma pergunta ou hipótese antes de começar o experimento.",
      "Planeje o procedimento: o que vai testar, e como vai medir o resultado.",
      "Registre os dados observados, mesmo que o resultado seja diferente do esperado.",
      "Compare o resultado real com a hipótese inicial, e tire suas conclusões."
    ],
    exercises: [
      { level:"facil", question:"Qual é o primeiro passo antes de começar um experimento científico?", options:["Formular uma pergunta ou hipótese para testar","Comparar com o experimento de outra pessoa","Guardar todos os materiais usados","Escrever a conclusão final"], correct:0, resolution:"Todo experimento científico começa com uma pergunta ou hipótese clara — é ela que orienta o que será testado e como o experimento será planejado." },
      { level:"medio", question:"Por que é importante registrar os dados de um experimento mesmo quando o resultado é diferente do esperado?", options:["Porque resultados inesperados nunca têm nenhum valor científico real","Porque resultados diferentes do esperado também geram informação valiosa sobre o fenômeno estudado","Porque só interessa registrar quando a hipótese se confirma exatamente","Porque registrar dados é apenas uma formalidade sem nenhuma utilidade prática"], correct:1, resolution:"Um resultado \"diferente do esperado\" não é um fracasso — ele revela algo real sobre o fenômeno, e pode até apontar para uma hipótese melhor. Ignorar esses dados seria perder informação científica genuína." },
      { level:"dificil", question:"Por que repetir um experimento várias vezes (não fazer só uma tentativa) é considerado essencial na prática científica?", options:["Porque repetir o experimento só serve para gastar mais tempo e material sem necessidade real","Porque repetições permitem verificar se o resultado é consistente, reduzindo a chance de conclusões baseadas em acaso ou erro isolado","Porque a primeira tentativa de qualquer experimento está sempre garantidamente errada","Porque a ciência exige, por regra formal, um número fixo e obrigatório de dez repetições"], correct:1, resolution:"Um único resultado pode ser fruto de coincidência, erro de medição ou uma variável não controlada. Repetir o experimento várias vezes permite verificar se o padrão se mantém, dando mais confiança de que a conclusão reflete o fenômeno real, e não um acaso isolado." },
      { level:"dificilimo", question:"Por que a existência de um \"grupo de controle\" (que não recebe o tratamento sendo testado) é fundamental para experimentos que buscam provar causa e efeito, como testar um novo fertilizante em plantas?", options:["Porque, nessa interpretação incorreta e sem base metodológica, todo experimento científico deve obrigatoriamente ter exatamente dois grupos, sem nenhuma outra razão explicativa","Porque o grupo de controle, segundo essa hipótese equivocada e sem fundamento científico real, serve apenas para ocupar espaço físico extra dentro do laboratório de pesquisa","Porque o grupo de controle é, segundo essa ideia equivocada e superficial, apenas uma exigência puramente burocrática, sem nenhuma função científica real por trás","Porque, sem comparar com um grupo que não recebeu o fertilizante, seria impossível saber se as mudanças observadas nas plantas foram realmente causadas pelo fertilizante ou por outros fatores, como clima ou solo"], correct:3, resolution:"O grupo de controle serve como referência de comparação: se as plantas com fertilizante crescerem mais do que as sem fertilizante (o grupo de controle), nas mesmas condições de clima, água e solo, aí sim é possível atribuir a diferença ao fertilizante com mais confiança — sem essa comparação, qualquer mudança observada poderia ter outras causas, tornando impossível provar a relação de causa e efeito." }
    ]
  },
  "nivelamentolp": {
    title: "Nivelamento — Português",
    emoji: "📖",
    intro: "Nivelamento em Português é um espaço para reforçar habilidades essenciais de leitura e escrita — revisando conceitos básicos de forma tranquila, no ritmo de cada estudante, antes de avançar para conteúdos mais complexos.",
    analogy: "Pense no nivelamento como o aquecimento antes de um treino: reforçar a base (leitura, gramática, interpretação) garante que você aproveite melhor o conteúdo mais avançado que vem depois, sem lacunas atrapalhando o caminho.",
    visual: {"type":"flow","steps":["Identificar dificuldade","Praticar leitura","Ganhar fluência"]},
    steps: [
      "Identifique as principais dificuldades de leitura e escrita que você sente hoje.",
      "Pratique leitura ativa: leia com atenção, buscando o sentido geral do texto.",
      "Revise regras básicas de gramática que geram mais dúvidas no dia a dia.",
      "Escreva com regularidade, mesmo textos curtos, para ganhar fluência aos poucos."
    ],
    exercises: [
      { level:"facil", question:"Qual é o principal objetivo de uma atividade de nivelamento em Português?", options:["Aplicar apenas provas finais sem nenhuma explicação prévia","Ensinar exclusivamente literatura clássica avançada logo de início","Reforçar habilidades básicas de leitura e escrita antes de avançar para conteúdos mais complexos","Substituir completamente as aulas regulares de Português"], correct:2, resolution:"O nivelamento serve para fortalecer a base de leitura e escrita, garantindo que o estudante tenha as ferramentas necessárias para acompanhar bem os conteúdos mais avançados que virão depois." },
      { level:"medio", question:"Por que praticar a leitura com regularidade, mesmo de textos curtos, ajuda a melhorar a interpretação de textos mais longos e complexos?", options:["Porque a prática regular de leitura desenvolve vocabulário, fluência e a capacidade de identificar ideias principais, habilidades que se aplicam a qualquer tamanho de texto","Porque, nessa interpretação incorreta, só textos muito longos realmente ajudam a desenvolver a capacidade de interpretação","Porque ler textos curtos, segundo essa hipótese equivocada, nunca traz nenhum benefício real para a leitura de textos mais longos","Porque a leitura regular, segundo essa ideia, só serve para memorizar palavras novas, sem nenhum outro benefício real"], correct:0, resolution:"A prática de leitura, mesmo em textos curtos, desenvolve habilidades transferíveis — como reconhecer vocabulário, acompanhar a lógica do texto e identificar a ideia principal — que fazem toda diferença na hora de interpretar textos mais longos e complexos depois." },
      { level:"dificil", question:"Por que revisar regras básicas de gramática (como concordância e pontuação) continua sendo útil mesmo para quem já lê e escreve com certa fluência no dia a dia?", options:["Porque quem fala e escreve bem no dia a dia, segundo essa ideia, nunca comete nenhum tipo de erro gramatical formal","Porque revisar gramática básica, nessa interpretação incorreta, serve apenas para quem nunca teve contato prévio com leitura","Porque gramática básica é, segundo essa hipótese equivocada, um assunto irrelevante para quem já sabe se comunicar bem","Porque a fluência no uso cotidiano da língua nem sempre garante domínio das regras formais exigidas em textos mais formais, como redações e documentos oficiais"], correct:3, resolution:"Muitas pessoas se comunicam bem informalmente sem dominar todas as regras da norma culta exigidas em contextos formais, como uma redação de vestibular ou um documento de trabalho. Revisar essas regras ajuda a fechar essa lacuna entre a fala cotidiana fluente e a escrita formal exigida em situações específicas." },
      { level:"dificilimo", question:"Por que o nivelamento, quando bem planejado, deve focar nas dificuldades específicas de cada estudante, em vez de repetir o mesmo conteúdo básico para toda a turma igualmente?", options:["Porque nivelamento personalizado é, nessa interpretação incorreta e sem fundamento legal algum, proibido por regra burocrática nas escolas da rede estadual de ensino","Porque repetir o mesmo conteúdo básico para todos é, segundo essa ideia equivocada, sempre a estratégia pedagógica mais eficiente possível em qualquer contexto de sala de aula","Porque, segundo essa hipótese equivocada e sem nenhuma base pedagógica real, todos os estudantes de uma mesma turma sempre têm exatamente as mesmas dificuldades de aprendizagem","Porque cada estudante chega com um conjunto diferente de lacunas de aprendizagem, e um nivelamento genérico pode ser repetitivo demais para uns e insuficiente para outros, desperdiçando o tempo de todos"], correct:3, resolution:"Diferente de uma turma homogênea, cada estudante costuma ter lacunas específicas — um pode ter dificuldade em interpretação, outro em ortografia, outro em pontuação. Um nivelamento que trata todos da mesma forma corre o risco de ser repetitivo para quem já domina certo ponto e insuficiente para quem realmente precisa de mais apoio nele, tornando o processo menos eficaz para a turma como um todo." }
    ]
  },
  "nivelamentomat": {
    title: "Nivelamento — Matemática",
    emoji: "🔢",
    intro: "Nivelamento em Matemática é um espaço para revisar operações e conceitos fundamentais — como frações, porcentagem e equações básicas — no ritmo de cada estudante, fortalecendo a base antes de avançar para conteúdos mais complexos.",
    analogy: "Pense na matemática como uma construção: sem uma fundação sólida (operações básicas bem entendidas), fica muito mais difícil erguer os \"andares\" mais avançados, como funções, geometria ou estatística.",
    visual: {"type":"flow","steps":["Identificar dúvida","Praticar com exemplos","Refazer até dominar"]},
    steps: [
      "Identifique quais operações básicas ainda geram mais dúvida (frações, porcentagem, equações).",
      "Pratique com exemplos do dia a dia, para dar sentido concreto aos números.",
      "Refaça exercícios parecidos várias vezes até sentir mais segurança no processo.",
      "Peça ajuda sempre que uma dúvida específica travar o avanço para o próximo conteúdo."
    ],
    exercises: [
      { level:"facil", question:"Qual é o principal objetivo de uma atividade de nivelamento em Matemática?", options:["Ensinar exclusivamente cálculo avançado logo nas primeiras semanas de aula","Reforçar operações e conceitos básicos antes de avançar para conteúdos mais complexos","Aplicar somente provas surpresa sem nenhuma explicação prévia do conteúdo","Substituir por completo as aulas regulares de Matemática do ano letivo"], correct:1, resolution:"O nivelamento em Matemática busca fortalecer operações e conceitos básicos (como frações, porcentagem e equações simples), criando uma base sólida para acompanhar bem conteúdos mais avançados no futuro." },
      { level:"medio", question:"Por que dificuldades com frações e porcentagem, se não resolvidas, costumam prejudicar o aprendizado de conteúdos mais avançados, como funções e estatística?", options:["Porque frações e porcentagem, nessa interpretação incorreta e isolada demais, são assuntos completamente separados do restante da matemática estudada na escola","Porque frações e porcentagem, segundo essa hipótese equivocada e sem base curricular real, nunca aparecem de fato dentro de conteúdos matemáticos mais avançados do currículo","Porque muitos conceitos avançados (como funções e proporções) se constroem sobre a compreensão sólida de frações e porcentagem, então lacunas nessa base dificultam o entendimento do que vem depois","Porque, segundo essa ideia equivocada e restritiva, apenas quem já domina cálculo avançado precisa realmente entender frações de forma correta e completa"], correct:2, resolution:"Frações e porcentagem aparecem, de forma disfarçada, em muitos conteúdos mais avançados — como funções, proporções e até estatística. Uma dificuldade não resolvida nessa base tende a se acumular, tornando mais difícil entender conteúdos futuros que dependem diretamente desses conceitos." },
      { level:"dificil", question:"Por que praticar exercícios de matemática com exemplos do cotidiano (como calcular desconto numa compra) costuma ajudar mais do que apenas repetir contas sem contexto?", options:["Porque contas sem nenhum contexto aplicado são sempre mais fáceis de entender e memorizar corretamente","Porque exemplos do dia a dia nunca ajudam de fato a fixar nenhum conceito matemático estudado","Porque a matemática pura, sem nenhuma aplicação prática, é sempre mais eficiente para o aprendizado real","Porque exemplos do cotidiano tornam o conceito mais concreto e significativo, facilitando a compreensão e a memorização do procedimento matemático envolvido"], correct:3, resolution:"Quando um conceito matemático é conectado a uma situação real e concreta (como calcular quanto se economiza num desconto), fica mais fácil para o cérebro dar sentido ao procedimento, o que ajuda tanto na compreensão quanto na memorização de longo prazo, comparado a exercícios totalmente abstratos e descontextualizados." },
      { level:"dificilimo", question:"Por que refazer o mesmo tipo de exercício várias vezes, mesmo depois de acertar uma vez, é considerado uma estratégia eficaz de nivelamento matemático, e não uma simples repetição desnecessária?", options:["Porque, segundo essa hipótese equivocada e contrária a estudos de aprendizagem, refazer exercícios repetidamente nunca traz nenhum benefício real de aprendizagem adicional para o estudante","Porque acertar um exercício uma única vez nem sempre significa domínio consolidado do procedimento — repetir em contextos ligeiramente diferentes ajuda a garantir que o raciocínio realmente foi internalizado, e não apenas memorizado momentaneamente","Porque repetir exercícios idênticos, segundo essa ideia simplista e equivocada, sempre garante por si só domínio automático e permanente do conteúdo matemático estudado","Porque errar um exercício uma única vez já significa, nessa interpretação incorreta e definitiva demais, que o estudante nunca vai conseguir aprender aquele conteúdo específico"], correct:1, resolution:"Acertar uma vez pode ser fruto de sorte, memorização de um caso específico ou apoio momentâneo, sem indicar domínio real do raciocínio por trás do procedimento. Refazer o exercício em variações ligeiramente diferentes ajuda a verificar (e consolidar) se o estudante realmente entendeu a lógica matemática envolvida, e não apenas decorou os passos daquele caso particular." }
    ]
  }
};;;;;;;



/* ---------------- ENSINO TÉCNICO ----------------
   17 cursos técnicos ofertados pela rede estadual, com a
   grade de matérias técnicas real (Anexos da Resolução SEE
   nº 5.212/2025). O conteúdo explicativo (aula) está pronto
   para algumas matérias-piloto — as demais mostram a grade
   real e ficam marcadas "Em breve". */
const TECH_COURSES = [
  { id:'agronegocio', name:'Técnico em Agronegócio', icon:'🌾', eixo:'Recursos Naturais',
    subjects:['Saúde e Segurança do Trabalho','Fundamentos e Qualidade no Agronegócio','Ecologia Aplicada e Práticas de Extensão Rural','Gestão Rural e Agricultura Automatizada','Estratégias de Marketing e Comercialização de Produtos Agropecuários','Agricultura Familiar e Desenvolvimento Regional Sustentável','Ética Profissional e Noções de Direito','Gestão Sustentável e Logística Agropecuária','Agricultura','Zootecnia','Fundamentos de Economia e Contabilidade','Qualidade e Segurança Alimentar na Agroindústria'] },
  { id:'agropecuaria', name:'Técnico em Agropecuária', icon:'🐄', eixo:'Recursos Naturais',
    subjects:['Irrigação e Drenagem','Gestão Ambiental e Empreendedorismo','Cooperativismo, Associativismo e Extensão Rural','Solos','Zootecnia','Agricultura','Desenho Técnico','Agroindústria','Construções e Instalações Rurais','Topografia','Administração Rural','Mecanização Agrícola, Saúde e Segurança no Trabalho'] },
  { id:'alimentos', name:'Técnico em Alimentos', icon:'🍞', eixo:'Produção Alimentícia',
    subjects:['Fundamentos de Bromatologia e Nutrição','Química e Bioquímica de Alimentos','Higiene, Biossegurança e Introdução ao Laboratório','Microbiologia de Alimentos','Gestão de Qualidade','Tecnologia de Frutas, Hortaliças e Cereais','Tecnologia de Bebidas','Tecnologias de Carnes','Tecnologias do Leite','Análise Sensorial','Gestão da Indústria e Operações Unitárias','Tratamento e Valorização de Resíduos e Biotecnologia'] },
  { id:'celulose-papel', name:'Técnico em Celulose e Papel', icon:'📄', eixo:'Produção Industrial',
    subjects:['Tecnologia da Madeira','Tecnologia das Matérias-Primas do Papel','Tecnologia da Fabricação de Celulose, Secagem e Branqueamento','Tecnologia da Fabricação do Papel e Máquina de Celulose','Noções sobre Fabricação de Papel e Propriedades Físico-Mecânicas','Ciclo de Recuperação Química e Utilidades','Química Aplicada à Indústria de Celulose e Papel','Instrumentação, Sistemas Elétricos e Controle de Processos','Interpretação de Desenhos, Plantas e Fluxogramas de Processos','Higiene, Segurança e Meio Ambiente','Qualidade e Gestão de Pessoas','Gestão de Processos Industriais de Celulose e Papel'] },
  { id:'dev-sistemas', name:'Técnico em Desenvolvimento de Sistemas', icon:'💻', eixo:'Informação e Comunicação',
    subjects:['Introdução à Lógica e Matemática Discreta','Desenvolvimento Front-End I','Pensamento Computacional e Caminhos Profissionais','Banco de Dados','Algoritmos e Estrutura de Dados','Arquitetura de Sistemas','Conceitos Avançados em Arquitetura de Sistemas','Desenvolvimento Front-End II','Desenvolvimento de Softwares','Fundamentos de Segurança de Softwares','Desenvolvimento Back-End','Desenvolvimento de Aplicativos'] },
  { id:'eletroeletronica', name:'Técnico em Eletroeletrônica', icon:'🔌', eixo:'Controle e Processos Industriais',
    subjects:['Introdução à Informática','Eletricidade Básica e Manutenção de Computadores','Eletromagnetismo','Geração, Transmissão e Distribuição de Energia Elétrica','Eletrônica','Eletrônica Digital','Desenho Técnico e Assistido por Computador (CAD)','Projetos Elétricos e Automação Industrial','Lógica de Programação','Sistemas Elétricos de Acionamento e Eletrônica de Potência','Projetos','Instalações Elétricas'] },
  { id:'eletronica', name:'Técnico em Eletrônica', icon:'📡', eixo:'Controle e Processos Industriais',
    subjects:['Eletricidade Básica e Circuitos Elétricos','Desenho Técnico Aplicado (CAD/EDA)','Eletrônica','Instalação Elétrica de Baixa Tensão','Manutenção Eletroeletrônica Básica','Automação Comercial e Residencial','Energias Renováveis e Eficiência Energética','Sistemas Microcontrolados','Redes, Telecomunicações e IoT','Manutenção Eletroeletrônica Industrial','Eletrônica e Automação Industriais','Prática Profissional'] },
  { id:'eletrotecnica', name:'Técnico em Eletrotécnica', icon:'⚡', eixo:'Controle e Processos Industriais',
    subjects:['Fundamentos e Medidas Elétricas','Saúde e Segurança do Trabalho','Circuitos Elétricos e Eletrônica Analógica','Sistemas Digitais e Programação','Sistemas de Potência e Energia','Práticas em Instalações Elétricas','Máquinas e Acionamentos Elétricos','Projeto em Eletrotécnica','Desenho Técnico','Automação e Controle de Processos','Instalações Elétricas em Edificações','Instalações, Comandos e Manutenção Industrial'] },
  { id:'informatica', name:'Técnico em Informática', icon:'🖥️', eixo:'Informação e Comunicação',
    subjects:['Fundamentos de Informática e Computadores','Fundamentos de Programação','Manutenção de Computadores','Segurança de Sistemas','Redes de Computadores','Sistemas Operacionais','Programação e Desenvolvimento Web','Banco de Dados','Análise de Projetos de Sistemas','Linguagem Orientada a Objetos','Estatística Aplicada','Projeto Integrador'] },
  { id:'informatica-internet', name:'Técnico em Informática para Internet', icon:'🌐', eixo:'Informação e Comunicação',
    subjects:['Fundamentos de Informática e Programação','Arquitetura e Manutenção de Computadores','Sistemas Operacionais, HTML/CSS e P.O.O./JAVA','Programação WEB e Design I','Fundamentos de Robótica e Redes de Computadores','Laboratório de Software','Programação WEB e Design II','Laboratório WEB','Gerenciador de Conteúdos e Banco de Dados','Práticas Profissionais'] },
  { id:'logistica', name:'Técnico em Logística', icon:'📦', eixo:'Gestão e Negócios',
    subjects:['Fundamentos de Logística','Cadeia de Suprimentos e Controle de Estoque','Contabilidade Geral','Estatística Aplicada','Logística Reversa e Gestão de Custos e Qualidade','Processamento de Pedidos, Operação de Transporte e Distribuição','Língua Estrangeira para Negócios — Inglês','Língua Estrangeira para Negócios — Espanhol','Prática Profissional'] },
  { id:'transacoes-imobiliarias', name:'Técnico em Transações Imobiliárias', icon:'🏠', eixo:'Gestão e Negócios',
    subjects:['Ética Profissional e Princípios Jurídicos Imobiliários','Economia, Mercado e Marketing Imobiliário','Planejamento Urbano e Ambiental','Direito Imobiliário — Obrigações e Contratos','Mercado Imobiliário e Registros Públicos','Avaliação de Imóveis e Técnicas de Negociação','Noções de Construção Civil','Informática Aplicada','Gestão Imobiliária','Operações Imobiliárias','Sistema Habitacional e Financeiro Imobiliário','Administração e Locação de Imóveis'] },
  { id:'mecanica', name:'Técnico em Mecânica', icon:'⚙️', eixo:'Controle e Processos Industriais',
    subjects:['Desenho Técnico e Auxiliado por Computador','Motores de Combustão','Gestão de Manutenção, Qualidade e Pessoas','Saúde e Segurança do Trabalho','Mecânica Técnica e Tecnologia dos Materiais','Processos de Fabricação','Metrologia e Eletrotécnica','Manufatura Auxiliada por Computador','Metalografia e Tratamento Térmico','Resistência dos Materiais e Ensaios Mecânicos','Conformação Mecânica e Elementos de Máquinas','Comandos Elétricos','Sistemas Hidráulicos e Pneumáticos'] },
  { id:'meio-ambiente', name:'Técnico em Meio Ambiente', icon:'🌳', eixo:'Ambiente e Saúde',
    subjects:['Ecologia: Conceitos e Soluções Eficazes','Legislação Ambiental: Brasil e Perspectiva Global','Ambiente e Elementos da Natureza: Parâmetros para Saúde','Impactos Ambientais: Aspectos da Poluição e Degradação','Impactos Ambientais e Estratégias de Recuperação','Sustentabilidade e Educação Ambiental','Parâmetros Físicos, Químicos e Biológicos','Comportamento Humano — Aspectos Socioambientais','Economia Ambiental','Climatologia e Hidrologia','Gestão, Licenciamento e Perícia Ambiental','Geoprocessamento'] },
  { id:'quimica-tecnico', name:'Técnico em Química', icon:'🧪', eixo:'Produção Industrial',
    subjects:['Segurança do Trabalho e Ética Profissional','Introdução à Química e Físico-Química Básica','Processos Eletroquímicos e de Corrosão','Gestão Ambiental e Sustentabilidade','Metrologia Aplicada e Procedimentos de Laboratório','Processos Químicos e Bioquímicos Industriais','Química Instrumental e Química de Polímeros','Química Industrial: Orgânica e Inorgânica','Reatores Químicos e Catálise','Química Analítica Qualitativa e Quantitativa','Microbiologia e Tecnologia de Águas, Resíduos e Alimentos','Fenômenos de Transporte e Operações Unitárias na Indústria Química'] },
  { id:'seguranca-trabalho', name:'Técnico em Segurança do Trabalho', icon:'🦺', eixo:'Segurança',
    subjects:['Higiene Ocupacional I e II','Legislação Aplicada à Segurança do Trabalho','Metodologia e Ferramentas Aplicadas','Introdução à Segurança do Trabalho','Ergonomia e Psicologia do Trabalho','Sustentabilidade e Meio Ambiente','Gestão e Qualidade Integrada','Projeto Técnico e CAD','Segurança do Trabalho e Prevenção de Riscos','Gestão de Riscos e Prevenção de Sinistros','Saúde Ocupacional e Doenças do Trabalho','Programas de Saúde e Segurança do Trabalho'] },
  { id:'vendas', name:'Técnico em Vendas', icon:'🛒', eixo:'Gestão e Negócios',
    subjects:['Fundamentos de Administração e Contabilidade','Matemática Aplicada e Gestão Financeira','Fundamentos de Marketing e Pesquisa de Mercado','Estratégias e Técnicas de Vendas','Comportamento do Consumidor e Produtos/Serviços','Logística e Empreendedorismo em Vendas','Layout de Loja e Vitrinismo','Ética, Direito e Saúde no Trabalho'] },
];

/* Conteúdo-piloto para algumas matérias técnicas (uma por
   curso, para começar). Chave: `${cursoId}__${slug da matéria}` */
const TECH_TOPICS = {
  "dev-sistemas__algoritmos-e-estrutura-de-dados": {
    title: "Algoritmos e Estrutura de Dados",
    emoji: "🧩",
    intro: "Estrutura de dados é a forma como organizamos informações no computador para que fiquem fáceis de guardar, buscar e alterar.",
    analogy: "Pense numa gaveta de talheres organizada (garfos aqui, facas ali) versus uma gaveta bagunçada: as duas guardam os mesmos talheres, mas na organizada você acha o que precisa muito mais rápido. Estruturas de dados são \"gavetas organizadas\" para informação.",
    visual: {"type":"compare","leftTitle":"Array","leftItems":["Acesso rápido"],"rightTitle":"Lista ligada","rightItems":["Inserção rápida"]},
    steps: [
      "Lista/Array: guarda itens em sequência, acessados por posição (índice).",
      "Pilha (Stack): o último que entra é o primeiro que sai (tipo pilha de pratos).",
      "Fila (Queue): o primeiro que entra é o primeiro que sai (tipo fila de banco)."
    ],
    exercises: [
      { level:"facil", question:"Em uma lista (array), como você acessa o primeiro elemento, na maioria das linguagens de programação?", options:["Índice 0","Índice -1","Índice 1","Índice 100"], correct:0, resolution:"A maioria das linguagens de programação (JavaScript, Python, C, Java) usa indexação começando em 0, então o primeiro elemento está no índice 0." },
      { level:"medio", question:"Qual estrutura de dados segue a lógica \"o último que entra é o primeiro que sai\"?", options:["Árvore binária de busca","Lista simplesmente encadeada","Fila (Queue) de atendimento","Pilha (Stack) de elementos"], correct:3, resolution:"A pilha (Stack) segue a lógica LIFO (Last In, First Out) — como uma pilha de pratos: o último prato colocado é o primeiro a ser retirado." },
      { level:"dificil", question:"Por que buscar um item em uma lista NÃO ordenada geralmente é mais lento do que buscar em uma lista ordenada usando busca binária?", options:["Listas ordenadas, segundo essa hipótese equivocada, não podem ser buscadas por nenhum método de busca de forma alguma, em nenhuma linguagem de programação","Não existe, nessa interpretação incorreta, absolutamente nenhuma diferença real de velocidade entre buscar em listas ordenadas ou em listas não ordenadas","Numa lista não ordenada, é preciso checar item por item, e numa lista ordenada, a busca binária descarta metade das opções a cada passo, sendo muito mais rápida","Busca binária é, segundo essa ideia equivocada, sempre mais lenta do que percorrer a lista item por item de forma sequencial, em qualquer situação"], correct:2, resolution:"Numa lista desordenada, no pior caso, é necessário verificar todos os N elementos um por um. Já a busca binária, aplicada a listas ordenadas, elimina metade das possibilidades a cada comparação, chegando ao resultado muito mais rápido (log₂N passos, ao invés de N)." },
      { level:"dificilimo", question:"Por que, ao escolher entre um Array e uma Lista Ligada (Linked List) para um programa que faz MUITAS inserções no meio da coleção, a Lista Ligada costuma ser mais eficiente?", options:["Arrays são, nessa interpretação incorreta, sempre mais rápidos do que listas ligadas em absolutamente qualquer situação de uso, independentemente do tipo de operação realizada","Não existe, segundo essa ideia equivocada, nenhuma diferença real de desempenho entre as duas estruturas de dados nesse cenário específico de inserção","Porque inserir no meio de um array exige deslocar todos os elementos seguintes uma posição, enquanto numa lista ligada basta reconectar dois ponteiros","Listas ligadas, segundo essa hipótese equivocada, na verdade não permitem a inserção de novos elementos no meio da estrutura de dados"], correct:2, resolution:"Num array, os elementos ficam em posições de memória contíguas — inserir um item no meio exige \"empurrar\" todos os elementos seguintes uma posição para abrir espaço, o que é custoso para listas grandes. Já numa lista ligada, cada elemento aponta para o próximo; inserir no meio é só reconectar dois ponteiros, uma operação muito mais rápida, independente do tamanho da lista." }
    ]
  },
  "informatica__fundamentos-de-programacao": {
    title: "Fundamentos de Programação",
    emoji: "👨‍💻",
    intro: "Programar é dar instruções, passo a passo, para o computador executar. Toda linguagem de programação (Python, JavaScript, C...) serve para isso.",
    analogy: "É como ensinar um robô muito literal a fazer um sanduíche: se você não disser exatamente \"pegue o pão, passe a manteiga, feche o sanduíche\", ele não sabe fazer sozinho — ele só faz exatamente o que você mandar, na ordem certa.",
    visual: {"type":"labeled","center":"Programa","parts":["Variável","Condição","Laço de repetição"]},
    steps: [
      "Variável: uma \"caixinha\" que guarda um valor (número, texto...).",
      "Condicional (if/else): permite o programa \"decidir\" entre caminhos diferentes.",
      "Laço de repetição (for/while): repete uma ação várias vezes sem copiar e colar o código."
    ],
    exercises: [
      { level:"facil", question:"O que é uma \"variável\" em programação?", options:["Um tipo de vírus de computador criado para prejudicar arquivos do sistema","Uma linguagem específica de programação usada exclusivamente para desenvolvimento web moderno","Um erro comum no código que impede o programa de funcionar corretamente","Um espaço na memória que guarda um valor, que pode mudar"], correct:3, resolution:"Uma variável é como uma caixinha rotulada que guarda um valor (número, texto, etc.), e esse valor pode ser alterado ao longo do programa." },
      { level:"medio", question:"Qual estrutura você usaria para repetir uma ação exatamente 10 vezes?", options:["Um comentário explicativo inserido no código-fonte","Uma estrutura condicional simples do tipo if/else","Um laço de repetição, como for ou while","Uma variável simples armazenando apenas um valor"], correct:2, resolution:"Laços de repetição (for ou while) servem exatamente para repetir um bloco de código um número determinado de vezes, sem precisar copiar e colar o mesmo código 10 vezes." },
      { level:"dificil", question:"No trecho: `if (idade >= 18) { print(\"Maior de idade\") } else { print(\"Menor de idade\") }`, o que acontece se idade = 17?", options:["O programa imprime o texto \"Menor de idade\" na tela","O programa não imprime absolutamente nenhum texto na tela","O programa apresenta um erro e para de funcionar","O programa imprime o texto \"Maior de idade\" na tela"], correct:0, resolution:"Como 17 não é maior ou igual a 18, a condição do \"if\" é falsa, então o programa executa o bloco do \"else\", imprimindo \"Menor de idade\"." },
      { level:"dificilimo", question:"Por que um laço de repetição mal escrito (por exemplo, uma condição de parada que nunca se torna verdadeira) pode travar completamente um programa ou aplicativo?", options:["Laços de repetição, segundo essa hipótese equivocada, sempre param automaticamente sozinhos depois de um curto período de tempo","Programas, nessa interpretação incorreta, nunca travam de fato por causa de erros de lógica presentes no próprio código-fonte","Porque o programa entra em \"loop infinito\", executando a mesma instrução repetidamente sem nunca parar, travando o sistema","Isso, segundo essa ideia equivocada, simplesmente nunca acontece de verdade na prática real da programação de computadores"], correct:2, resolution:"Se a condição que deveria parar o laço (por exemplo, \"enquanto x for menor que 10\") nunca é alcançada — porque o valor de x nunca é atualizado corretamente dentro do laço, por exemplo —, o programa fica preso repetindo a mesma ação para sempre, consumindo processamento e travando o app. É um dos erros mais clássicos (e frustrantes) de quem está aprendendo a programar." }
    ]
  },
  "agronegocio__zootecnia": {
    title: "Zootecnia: cuidando bem dos animais de produção",
    emoji: "🐮",
    intro: "Zootecnia é a ciência que estuda como criar animais (gado, aves, porcos...) de forma saudável e produtiva, cuidando da alimentação, reprodução e bem-estar deles.",
    analogy: "É parecido com cuidar de um time de futebol: cada \"jogador\" (animal) precisa de alimentação adequada, descanso e cuidado médico para render o seu melhor.",
    visual: {"type":"labeled","center":"Zootecnia","parts":["Nutrição","Reprodução","Bem-estar animal"]},
    steps: [
      "Nutrição animal: cada espécie precisa de uma dieta balanceada específica.",
      "Manejo reprodutivo: planejar a reprodução para melhorar a genética do rebanho.",
      "Sanidade animal: prevenir doenças com vacinação e boas práticas."
    ],
    exercises: [
      { level:"facil", question:"O que estuda a Zootecnia?", options:["Apenas o estudo de doenças humanas relacionadas ao consumo de carne e derivados","A criação e o manejo de animais de produção","Apenas a construção e manutenção de máquinas usadas na agricultura moderna","Apenas o cultivo de plantas e técnicas de agricultura tradicional no campo"], correct:1, resolution:"Zootecnia é a área que estuda a criação, nutrição, reprodução e manejo de animais destinados à produção (gado, aves, suínos, etc.)." },
      { level:"medio", question:"Por que a nutrição animal precisa ser específica para cada espécie (por exemplo, boi não come a mesma coisa que galinha)?", options:["Porque cada espécie tem um sistema digestivo e necessidades nutricionais diferentes, adaptados à sua fisiologia","É apenas, segundo essa ideia equivocada, uma questão de gosto e preferência pessoal de cada animal","Não precisa ser específica, segundo essa hipótese equivocada, pois todos os animais comem exatamente igual","Animais de produção, nessa interpretação incorreta, não precisam de nenhum tipo de dieta balanceada real"], correct:0, resolution:"Cada espécie evoluiu com um sistema digestivo próprio (o boi, por exemplo, é ruminante e digere fibras de forma diferente da galinha) — por isso a dieta precisa ser adaptada às necessidades nutricionais específicas de cada tipo de animal." },
      { level:"dificil", question:"Por que o manejo reprodutivo (escolher quais animais cruzam com quais) é importante para a produtividade de um rebanho?", options:["Isso, segundo essa ideia equivocada, só importa realmente para animais de estimação, e nunca para animais destinados à produção comercial","Não influencia em nada, nessa interpretação incorreta, a produtividade final de um rebanho voltado para a produção comercial","Porque selecionar características desejadas (mais leite, mais carne, resistência a doenças) ao longo de gerações melhora geneticamente o rebanho todo","Reprodução é, segundo essa hipótese equivocada, apenas um evento puramente natural, sem nenhum tipo de controle técnico possível"], correct:2, resolution:"Ao selecionar cuidadosamente quais animais se reproduzem (com base em características desejáveis, como produção de leite ou resistência a doenças), o produtor melhora geneticamente as próximas gerações do rebanho, aumentando a produtividade ao longo do tempo — é o princípio do melhoramento genético animal." },
      { level:"dificilimo", question:"Por que o bem-estar animal (espaço adequado, baixo estresse, boas condições sanitárias) é considerado hoje um fator ECONÔMICO, e não apenas ético, na pecuária moderna?", options:["Isso é apenas uma tendência de marketing recente, segundo essa hipótese equivocada, sem nenhuma base científica real por trás","Bem-estar animal, nessa interpretação incorreta, só importa comercialmente quando o produto final é destinado à exportação internacional","Porque animais estressados ou mal cuidados produzem menos leite, menos ganho de peso, e ficam mais suscetíveis a doenças, reduzindo a produtividade geral do rebanho","Bem-estar animal, segundo essa ideia equivocada, não tem relação nenhuma com produtividade ou resultados econômicos da produção"], correct:2, resolution:"Estudos em zootecnia mostram que animais estressados liberam hormônios (como cortisol) que prejudicam o ganho de peso, a produção de leite e a fertilidade, além de ficarem mais suscetíveis a doenças. Por isso, investir em bem-estar animal (espaço, conforto térmico, manejo de baixo estresse) não é só uma questão ética — reflete diretamente em melhores resultados produtivos e econômicos para o produtor." }
    ]
  },
  "agronegocio__saude-e-seguranca-do-trabalho": {
    title: "Saúde e Segurança do Trabalho no Campo",
    emoji: "🦺",
    intro: "Saúde e Segurança do Trabalho no agronegócio é o conjunto de normas e práticas que protegem o trabalhador rural de acidentes e doenças causadas pelo contato com máquinas, agrotóxicos, animais e condições climáticas do campo.",
    analogy: "Pense no EPI (Equipamento de Proteção Individual) como o cinto de segurança de um carro: ele não evita que situações de risco aconteçam, mas reduz muito a chance de um machucado grave quando elas acontecem.",
    visual: {"type": "labeled", "center": "EPIs no Campo", "parts": ["Botas de borracha", "Luvas resistentes", "Óculos de proteção", "Máscara respiratória"]},
    steps: [
      "Identificar o risco da atividade (máquina, produto químico, animal, altura).",
      "Escolher o EPI adequado para aquele risco específico.",
      "Usar o EPI corretamente durante toda a atividade.",
      "Higienizar e guardar o equipamento após o uso, e substituí-lo quando estiver danificado."
    ],
    exercises: [
      { level:"facil", question:"Para que serve o uso de EPI (Equipamento de Proteção Individual) no trabalho rural?", options:[
      "Substituir totalmente a necessidade de treinamento e de atenção durante o trabalho",
      "Servir apenas como identificação visual do cargo de cada trabalhador na fazenda",
      "Aumentar a velocidade com que as tarefas do campo são realizadas todos os dias",
      "Reduzir o risco de acidentes e o contato direto do trabalhador com agentes perigosos"
    ], correct:3, resolution:"O EPI existe para reduzir a exposição do trabalhador a riscos como produtos químicos, máquinas e agentes físicos, diminuindo a chance e a gravidade de acidentes — mas ele complementa, e não substitui, o treinamento e a atenção do trabalhador." },
      { level:"medio", question:"Por que o manuseio de agrotóxicos exige cuidados especiais de segurança do trabalho?", options:[
      "Porque esses produtos deixam manchas visíveis e permanentes na roupa usada pelo trabalhador",
      "Porque esses produtos têm custo elevado e por isso exigem cuidado apenas financeiro",
      "Porque esses produtos alteram a cor da plantação de forma indesejada durante a aplicação",
      "Porque esses produtos podem causar intoxicação por contato com a pele, inalação ou ingestão acidental"
    ], correct:3, resolution:"Agrotóxicos são substâncias tóxicas que podem entrar no corpo por absorção pela pele, pelas vias respiratórias ou por ingestão acidental, causando intoxicação aguda ou crônica — por isso o uso de EPI completo e a leitura do rótulo do produto são obrigatórios." },
      { level:"dificil", question:"Qual é a diferença central entre um acidente de trabalho típico e uma doença ocupacional no contexto rural?", options:[
      "O acidente precisa ser registrado oficialmente junto aos órgãos competentes, e a doença ocupacional nunca exige nenhum tipo de registro",
      "O acidente ocorre em um evento único e identificável, enquanto a doença ocupacional se desenvolve por exposição repetida ao longo do tempo",
      "O acidente sempre acontece exclusivamente dentro dos limites da propriedade rural, e a doença ocupacional sempre se manifesta fora dela",
      "O acidente é sempre causado unicamente por máquinas agrícolas, e a doença ocupacional é sempre causada apenas pelo contato com animais"
    ], correct:1, resolution:"O acidente de trabalho tem um momento definido (um corte, uma queda, um choque elétrico), enquanto a doença ocupacional — como uma perda auditiva por ruído de máquinas ou uma intoxicação crônica por agrotóxico — se desenvolve gradualmente pela exposição repetida ao risco ao longo do tempo." },
      { level:"dificilimo", question:"Por que a Norma Regulamentadora NR-31, voltada ao trabalho rural, exige medidas específicas diferentes das normas aplicadas à indústria urbana?", options:[
      "Porque, segundo essa interpretação incorreta, o trabalho rural nunca envolve o uso de máquinas ou equipamentos motorizados",
      "Porque a legislação trabalhista brasileira, segundo essa ideia equivocada, não se aplica a nenhuma atividade realizada no meio rural",
      "Porque o trabalho rural envolve riscos particulares, como exposição a agrotóxicos, animais, clima e máquinas agrícolas em espaços abertos e dispersos",
      "Porque, nessa hipótese equivocada, todo trabalho rural é considerado tecnicamente seguro e dispensa qualquer norma"
    ], correct:2, resolution:"A NR-31 foi criada porque o ambiente rural tem riscos próprios — grandes áreas abertas, exposição a agrotóxicos e ao clima, contato com animais e máquinas agrícolas específicas (como tratores e colheitadeiras) — que exigem regras diferentes das aplicadas a uma fábrica ou escritório urbano." }
    ]
  },
  "agronegocio__fundamentos-e-qualidade-no-agronegocio": {
    title: "Fundamentos e Qualidade no Agronegócio",
    emoji: "🌱",
    intro: "O agronegócio é o conjunto de atividades que vão desde a produção de insumos agrícolas até o processamento e a chegada do alimento à mesa do consumidor, e a qualidade é o que garante que esse produto atenda às exigências do mercado em cada uma dessas etapas.",
    analogy: "Pense na cadeia do agronegócio como uma corrente de elos: insumo, produção, processamento, distribuição e consumo. Se um elo enfraquece — por exemplo, falta de controle de qualidade no processamento — a corrente toda perde valor, mesmo que os outros elos estejam fortes.",
    visual: {"type": "cycle", "steps": ["Insumos", "Produção", "Processamento", "Distribuição", "Consumo"]},
    exercises: [
      { level:"facil", question:"O que caracteriza a cadeia produtiva do agronegócio?", options:[
      "Apenas a etapa de plantio realizada diretamente na propriedade rural",
      "Apenas a fabricação de máquinas agrícolas usadas na colheita",
      "Apenas a etapa de venda do produto já pronto no supermercado",
      "Um conjunto de etapas interligadas, do insumo até o consumidor final"
    ], correct:3, resolution:"A cadeia produtiva do agronegócio envolve várias etapas interligadas — fornecimento de insumos, produção agrícola, processamento industrial, distribuição e consumo — e não apenas uma etapa isolada." },
      { level:"medio", question:"Por que a qualidade é considerada um fator estratégico dentro do agronegócio?", options:[
      "Porque ela determina o acesso a mercados mais exigentes e o valor que o produto consegue alcançar",
      "Porque ela influencia unicamente o tempo de plantio, sem nenhum efeito sobre o preço",
      "Porque ela determina apenas a cor final da embalagem usada para venda do produto",
      "Porque ela é exigida apenas em produtos destinados exclusivamente à exportação"
    ], correct:0, resolution:"Produtos com qualidade comprovada (por exemplo, dentro de padrões sanitários e de certificação) conseguem acessar mercados mais exigentes, inclusive internacionais, e costumam alcançar preços melhores do que produtos sem controle de qualidade." },
      { level:"dificil", question:"Qual é a relação entre rastreabilidade e qualidade no agronegócio moderno?", options:[
      "A rastreabilidade permite identificar a origem e o histórico do produto, o que sustenta a garantia de qualidade exigida por mercados mais rigorosos",
      "A rastreabilidade serve apenas para calcular o preço final de venda no comércio varejista da região local",
      "A rastreabilidade é usada exclusivamente para controlar o valor do salário pago aos trabalhadores contratados na propriedade rural",
      "A rastreabilidade tem uma função apenas decorativa impressa nas embalagens dos produtos vendidos pela agroindústria"
    ], correct:0, resolution:"A rastreabilidade — registrar de onde veio o produto, como foi produzido e por onde passou — permite comprovar que padrões de qualidade e segurança foram seguidos em cada etapa, o que é cada vez mais exigido por mercados exportadores e por grandes redes de varejo." },
      { level:"dificilimo", question:"Por que uma falha de qualidade isolada em uma única etapa da cadeia do agronegócio pode comprometer todo o lote de um produto, mesmo que as demais etapas tenham sido bem executadas?", options:[
      "Porque, segundo essa ideia equivocada, cada etapa da cadeia é avaliada de forma totalmente separada e independente das demais",
      "Porque, segundo essa hipótese equivocada, falhas de qualidade nunca conseguem se espalhar além da etapa onde ocorreram",
      "Porque as etapas são interdependentes, e um problema em uma delas — como contaminação no processamento — pode se propagar por todo o lote antes de ser identificado",
      "Porque, nessa interpretação incorreta, apenas a etapa de plantio tem impacto real sobre a qualidade final do produto"
    ], correct:2, resolution:"Como as etapas do agronegócio formam uma cadeia interligada, um problema de qualidade em um ponto — como contaminação durante o processamento ou armazenamento inadequado — tende a afetar todo o lote do produto, já que ele passa pelas etapas seguintes antes de ser identificado, exigindo controle de qualidade em cada elo da cadeia." }
    ]
  },
  "agronegocio__ecologia-aplicada-e-praticas-de-extensao-rural": {
    title: "Ecologia Aplicada e Práticas de Extensão Rural",
    emoji: "🌾",
    intro: "Ecologia aplicada, no contexto do agronegócio, estuda como as atividades agrícolas interagem com o meio ambiente, e a extensão rural é o trabalho de levar conhecimento técnico e orientação até o produtor no campo.",
    analogy: "Pense no extensionista rural como um médico de família, mas para a propriedade: ele visita o produtor, entende a realidade específica daquela terra e daquela família, e recomenda práticas ajustadas àquele caso — não uma receita genérica igual para todos.",
    visual: {"type": "flow", "steps": ["Diagnóstico da propriedade", "Planejamento de ações", "Execução orientada", "Avaliação de resultados"]},
    exercises: [
      { level:"facil", question:"Qual é a função principal da extensão rural?", options:[
      "Fiscalizar e multar propriedades rurais que não seguem determinada técnica de plantio",
      "Vender diretamente sementes e insumos agrícolas para os produtores da região",
      "Substituir integralmente o trabalho do produtor na condução da lavoura",
      "Levar orientação técnica e conhecimento até o produtor rural em sua propriedade"
    ], correct:3, resolution:"A extensão rural tem como função principal levar conhecimento técnico, orientação e apoio até o produtor, ajudando-o a melhorar suas práticas — ela não fiscaliza, não vende insumos nem substitui o trabalho do produtor." },
      { level:"medio", question:"Por que a ecologia aplicada é importante no planejamento de uma propriedade agrícola?", options:[
      "Porque ela determina exclusivamente o preço de venda dos produtos agrícolas no mercado",
      "Porque ela serve apenas para decidir a cor das embalagens usadas na comercialização",
      "Porque ela define unicamente o horário de funcionamento da propriedade rural",
      "Porque ela ajuda a entender como as práticas agrícolas afetam o solo, a água e a biodiversidade local"
    ], correct:3, resolution:"A ecologia aplicada estuda as relações entre as práticas agrícolas e o ambiente — como o manejo do solo afeta sua fertilidade, como o uso da água impacta os recursos hídricos, como certas práticas afetam a biodiversidade — permitindo um planejamento mais sustentável da propriedade." },
      { level:"dificil", question:"Qual é a diferença entre uma abordagem de extensão rural participativa e uma abordagem puramente prescritiva?", options:[
      "A participativa é aplicada somente em propriedades rurais de grande porte, e a prescritiva é aplicada somente nas de pequeno porte",
      "A participativa nunca utiliza nenhum tipo de dado técnico levantado em campo, e a prescritiva se baseia exclusivamente nesses dados",
      "A participativa é utilizada apenas dentro de cursos de capacitação, e a prescritiva é usada apenas durante visitas presenciais de campo",
      "A participativa envolve o produtor na construção da solução, enquanto a prescritiva apenas transmite uma recomendação pronta, sem considerar o contexto local"
    ], correct:3, resolution:"Na abordagem participativa, o extensionista dialoga com o produtor, considera sua realidade e o envolve na construção da solução; na abordagem prescritiva, uma recomendação padrão é simplesmente transmitida, sem levar em conta as particularidades daquela propriedade e daquela família." },
      { level:"dificilimo", question:"Por que práticas ecologicamente corretas recomendadas por um extensionista podem falhar quando aplicadas sem adaptação ao contexto socioeconômico da propriedade?", options:[
      "Porque a viabilidade de uma prática depende também de fatores como custo, mão de obra disponível e cultura local, não apenas de sua correção técnica e ambiental",
      "Porque, nessa interpretação incorreta, o contexto socioeconômico da propriedade não tem nenhuma relação com a técnica agrícola",
      "Porque, segundo essa ideia equivocada, práticas ecologicamente corretas nunca funcionam de fato no ambiente real do campo",
      "Porque, segundo essa hipótese equivocada, a extensão rural deveria ignorar totalmente qualquer critério ambiental em suas recomendações"
    ], correct:0, resolution:"Uma prática pode ser tecnicamente correta do ponto de vista ecológico e ainda assim falhar se exigir investimento que o produtor não tem, mão de obra que a propriedade não possui, ou se conflitar com hábitos culturais estabelecidos — por isso a extensão rural precisa considerar o contexto socioeconômico junto com a técnica." }
    ]
  },
  "agronegocio__gestao-rural-e-agricultura-automatizada": {
    title: "Gestão Rural e Agricultura Automatizada",
    emoji: "🛰️",
    intro: "Gestão rural é a administração organizada de uma propriedade agrícola — planejamento, controle de custos e tomada de decisão — e a agricultura automatizada usa tecnologias como sensores, GPS e drones para tornar essa gestão mais precisa.",
    analogy: "Pense na agricultura de precisão como trocar um mapa de papel genérico por um GPS que mostra o trânsito em tempo real: em vez de tratar a lavoura inteira do mesmo jeito, o produtor enxerga, talhão por talhão, onde falta água ou nutriente, e age exatamente ali.",
    visual: {"type": "labeled", "center": "Agricultura de Precisão", "parts": ["GPS e piloto automático", "Sensores de solo", "Drones de monitoramento", "Mapas de produtividade"]},
    exercises: [
      { level:"facil", question:"O que é agricultura de precisão?", options:[
      "Um tipo específico de adubo orgânico aplicado manualmente em toda a lavoura",
      "O uso de tecnologias como GPS e sensores para gerenciar a lavoura de forma mais localizada e eficiente",
      "Uma técnica de plantio que dispensa totalmente o uso de qualquer máquina agrícola",
      "Um método de venda direta de produtos agrícolas sem passar por intermediários"
    ], correct:1, resolution:"Agricultura de precisão é o uso de tecnologias — GPS, sensores de solo, drones, mapas de produtividade — para gerenciar a lavoura considerando as variações dentro de uma mesma área, em vez de tratá-la de forma uniforme." },
      { level:"medio", question:"Qual é a principal vantagem de usar mapas de produtividade na gestão de uma propriedade rural?", options:[
      "Permitir identificar quais áreas do talhão produzem mais ou menos, direcionando melhor os investimentos",
      "Permitir prever com certeza absoluta o preço futuro dos produtos no mercado internacional",
      "Permitir substituir totalmente a necessidade de análise de solo em qualquer área",
      "Permitir eliminar por completo qualquer risco climático sobre a safra plantada"
    ], correct:0, resolution:"Os mapas de produtividade mostram, ponto a ponto dentro da lavoura, onde a produção foi maior ou menor, permitindo que o produtor invista de forma direcionada — por exemplo, aplicando mais adubo apenas nas áreas de menor rendimento, em vez de tratar toda a área igualmente." },
      { level:"dificil", question:"Por que a gestão rural moderna combina dados de sensores com registros financeiros da propriedade?", options:[
      "Porque decisões técnicas de manejo só fazem sentido econômico quando avaliadas junto ao custo e ao retorno financeiro que geram",
      "Porque sensores de solo, segundo essa interpretação incorreta, já calculam automaticamente o lucro final da propriedade",
      "Porque dados financeiros, nessa hipótese equivocada, substituem totalmente a necessidade de qualquer sensor no campo",
      "Porque a lei brasileira, segundo essa ideia equivocada, exige que todo sensor agrícola esteja vinculado obrigatoriamente à contabilidade"
    ], correct:0, resolution:"Um dado técnico (como um sensor indicando baixa umidade em determinada área) só se torna uma decisão de gestão completa quando cruzado com informações financeiras — custo da irrigação extra, retorno esperado da produção adicional — permitindo decidir se o investimento vale a pena." },
      { level:"dificilimo", question:"Por que a adoção de agricultura automatizada pode gerar ganhos de produtividade sem necessariamente aumentar a lucratividade da propriedade no curto prazo?", options:[
      "Porque o investimento em tecnologia tem custo elevado, e o retorno financeiro desse investimento pode levar tempo para superar o gasto inicial",
      "Porque, segundo essa ideia equivocada, produtividade e lucratividade são sempre exatamente a mesma coisa na prática",
      "Porque, nessa interpretação incorreta, tecnologias automatizadas nunca produzem nenhum ganho real de produtividade",
      "Porque, segundo essa hipótese equivocada, o custo de sensores e drones é sempre irrelevante para o resultado financeiro"
    ], correct:0, resolution:"Equipamentos de agricultura de precisão — sensores, drones, sistemas de piloto automático — exigem investimento inicial alto; mesmo gerando mais produtividade, o retorno financeiro desse investimento (o chamado payback) pode levar algumas safras para compensar o gasto, então produtividade maior nem sempre significa lucro maior de imediato." }
    ]
  },
  "agronegocio__estrategias-de-marketing-e-comercializacao-de-produtos-agropecuarios": {
    title: "Estratégias de Marketing e Comercialização de Produtos Agropecuários",
    emoji: "📈",
    intro: "Marketing e comercialização no agronegócio envolvem definir como um produto agropecuário chega até o comprador, por qual canal de venda, e como ele é apresentado para gerar valor além do preço da commodity.",
    analogy: "Pense em dois produtores da mesma fruta: um vende a granel para um atravessador, sem marca nem diferenciação; o outro embala, certifica e vende direto ao consumidor com uma história por trás. O produto físico é quase o mesmo, mas o segundo consegue um preço bem maior porque agregou valor de marketing.",
    visual: {"type": "compare", "leftTitle": "Venda via intermediário", "leftItems": ["Menor preço por unidade", "Menor esforço de venda", "Sem contato com o consumidor final"], "rightTitle": "Venda direta ao consumidor", "rightItems": ["Maior preço por unidade", "Maior esforço de venda", "Contato direto com o consumidor final"]},
    exercises: [
      { level:"facil", question:"O que significa 'agregar valor' a um produto agropecuário do ponto de vista de marketing?", options:[
      "Reduzir ao máximo o tempo de plantio até a colheita do produto agrícola",
      "Aumentar o peso físico do produto antes de ele ser embalado para a venda",
      "Tornar o produto mais atraente ou diferenciado, permitindo vendê-lo por um preço melhor",
      "Diminuir o número de etapas do processo produtivo até chegar ao consumidor"
    ], correct:2, resolution:"Agregar valor significa tornar o produto mais atrativo para o comprador — por meio de embalagem, marca, certificação ou história — de forma que ele se destaque e possa ser vendido por um preço melhor do que uma commodity comum." },
      { level:"medio", question:"Por que muitos produtores rurais optam por vender através de cooperativas em vez de vender individualmente?", options:[
      "Porque vender por cooperativa dispensa completamente qualquer tipo de controle de qualidade",
      "Porque a cooperativa reúne a produção de vários produtores, aumentando o poder de negociação com compradores",
      "Porque vender por cooperativa elimina totalmente qualquer custo de transporte da produção",
      "Porque vender por cooperativa garante um preço fixo idêntico durante todos os anos seguintes"
    ], correct:1, resolution:"Ao reunir a produção de vários produtores, a cooperativa consegue negociar volumes maiores e obter melhores condições de preço e logística do que cada produtor conseguiria sozinho, aumentando o poder de barganha do grupo." },
      { level:"dificil", question:"Qual é a diferença estratégica entre comercializar uma commodity e comercializar um produto agropecuário certificado (como orgânico ou de origem controlada)?", options:[
      "A commodity nunca pode ser comercializada por meio de cooperativas, e o produto certificado só pode ser vendido através delas",
      "A commodity só pode ser vendida dentro do território brasileiro, e o produto certificado só pode ser vendido para fora do país",
      "A commodity é vendida principalmente pelo preço de mercado padrão, enquanto o produto certificado pode competir por diferenciação e atingir nichos dispostos a pagar mais",
      "A commodity tem seu preço definido exclusivamente pelo próprio produtor, e o produto certificado tem preço definido diretamente pelo governo"
    ], correct:2, resolution:"Uma commodity (como soja ou milho comum) tende a ser vendida pelo preço de referência do mercado, com pouca diferenciação; já um produto certificado — orgânico, de origem controlada, com selo de qualidade — pode ser posicionado para nichos de consumidores dispostos a pagar mais por esses atributos." },
      { level:"dificilimo", question:"Por que uma estratégia de marketing bem-sucedida para um produto agropecuário de exportação pode não funcionar da mesma forma no mercado interno brasileiro?", options:[
      "Porque, nessa interpretação incorreta, produtos de exportação são sempre proibidos de serem vendidos dentro do Brasil",
      "Porque, segundo essa hipótese equivocada, estratégias de marketing funcionam de forma idêntica em qualquer mercado do mundo",
      "Porque hábitos de consumo, exigências regulatórias e percepção de valor variam entre mercados, exigindo adaptação da estratégia a cada público",
      "Porque, segundo essa ideia equivocada, o mercado interno brasileiro nunca valoriza nenhum tipo de certificação de qualidade"
    ], correct:2, resolution:"Cada mercado tem hábitos de consumo, exigências regulatórias (sanitárias, fitossanitárias) e percepções de valor diferentes — uma certificação valorizada na Europa, por exemplo, pode ser pouco conhecida ou pouco valorizada por parte do consumidor brasileiro — então a estratégia de marketing precisa ser adaptada a cada mercado, não apenas replicada." }
    ]
  },
  "agronegocio__agricultura-familiar-e-desenvolvimento-regional-sustentavel": {
    title: "Agricultura Familiar e Desenvolvimento Regional Sustentável",
    emoji: "👨‍👩‍👧‍👦",
    intro: "Agricultura familiar é a produção agropecuária conduzida principalmente pela mão de obra da própria família em pequenas propriedades, e seu fortalecimento é uma estratégia importante de desenvolvimento regional sustentável, especialmente na produção de alimentos para o consumo interno.",
    analogy: "Pense na agricultura familiar como pequenos comércios de bairro e o agronegócio de grande escala como uma rede de supermercados: os dois têm papéis diferentes e complementares na economia — um geralmente abastece o mercado interno e gera emprego local, o outro tem foco maior em escala e exportação.",
    visual: {"type": "compare", "leftTitle": "Agricultura familiar", "leftItems": ["Mão de obra principalmente da família", "Propriedades geralmente menores", "Forte papel no abastecimento local"], "rightTitle": "Agronegócio de grande escala", "rightItems": ["Mão de obra assalariada contratada", "Propriedades geralmente maiores", "Forte papel na exportação"]},
    exercises: [
      { level:"facil", question:"O que caracteriza a agricultura familiar?", options:[
      "A produção realizada exclusivamente por grandes empresas multinacionais do setor agrícola",
      "A produção conduzida majoritariamente pela mão de obra da própria família, em geral em pequenas propriedades",
      "A produção que utiliza exclusivamente máquinas agrícolas de grande porte importadas",
      "A produção destinada obrigatoriamente apenas à exportação para outros países"
    ], correct:1, resolution:"A agricultura familiar é definida pela predominância da mão de obra da própria família na produção, geralmente em propriedades de menor porte — é diferente da produção conduzida por grandes empresas com mão de obra assalariada em larga escala." },
      { level:"medio", question:"Qual é o papel da agricultura familiar no desenvolvimento regional?", options:[
      "Ela contribui para o abastecimento local de alimentos e para a geração de renda e emprego no interior",
      "Ela substitui totalmente a necessidade de estradas e infraestrutura de transporte na região",
      "Ela é responsável exclusivamente pela produção de commodities destinadas à exportação em massa",
      "Ela é responsável apenas pela fabricação de máquinas usadas nas grandes propriedades"
    ], correct:0, resolution:"A agricultura familiar tem papel importante no abastecimento de alimentos para o mercado local e regional (como feiras e merenda escolar), além de gerar renda e manter famílias no meio rural, contribuindo para o desenvolvimento das regiões onde está presente." },
      { level:"dificil", question:"Por que políticas públicas de desenvolvimento rural costumam tratar a agricultura familiar como uma categoria distinta do agronegócio de exportação?", options:[
      "Porque a legislação brasileira, segundo essa ideia equivocada, proíbe qualquer tipo de relação entre as duas categorias",
      "Porque a agricultura familiar, nessa interpretação incorreta, não produz nenhum tipo de alimento vendido no mercado",
      "Porque o agronegócio de exportação, segundo essa hipótese equivocada, nunca recebe nenhum tipo de política pública",
      "Porque as duas enfrentam desafios estruturais diferentes — acesso a crédito, escala de produção e canais de venda — que exigem políticas específicas para cada uma"
    ], correct:3, resolution:"A agricultura familiar geralmente tem menor acesso a crédito e escala de produção diferente do agronegócio de grande porte, por isso políticas públicas específicas (como o PRONAF) foram criadas para atender às suas necessidades particulares, distintas das políticas voltadas ao agronegócio exportador." },
      { level:"dificilimo", question:"Por que o fortalecimento da agricultura familiar é frequentemente associado à segurança alimentar de uma região, mesmo em contextos onde o agronegócio de exportação já é economicamente forte?", options:[
      "Porque a agricultura familiar concentra grande parte da produção de alimentos básicos consumidos internamente, enquanto o agronegócio de exportação foca majoritariamente em commodities voltadas ao mercado externo",
      "Porque, nessa interpretação incorreta, a agricultura familiar nunca depende de nenhum tipo de apoio governamental ou de crédito rural para se manter ativa",
      "Porque, segundo essa ideia equivocada, o agronegócio de exportação produz exclusivamente alimentos que não são comestíveis pela população local da região",
      "Porque, segundo essa hipótese equivocada, o conceito de segurança alimentar só se aplica a países que não exportam absolutamente nenhum tipo de alimento"
    ], correct:0, resolution:"Mesmo com um agronegócio de exportação forte, a segurança alimentar de uma região depende de alimentos disponíveis para consumo interno — e estudos mostram que a agricultura familiar responde por parcela expressiva dos itens básicos da mesa do brasileiro (como feijão, mandioca e hortaliças), enquanto o agronegócio de exportação concentra-se mais em commodities como soja e carne voltadas ao mercado externo." }
    ]
  },
  "agronegocio__etica-profissional-e-nocoes-de-direito": {
    title: "Ética Profissional e Noções de Direito no Agronegócio",
    emoji: "⚖️",
    intro: "Ética profissional no agronegócio envolve agir com honestidade, responsabilidade e respeito nas relações de trabalho e de negócio, enquanto as noções de direito tratam das leis que regulam contratos, propriedade rural e relações trabalhistas no campo.",
    analogy: "Pense na ética profissional como as regras não escritas de um jogo de futebol amador entre vizinhos: mesmo sem um juiz presente o tempo todo, os jogadores que respeitam o combinado mantêm a confiança do grupo — no trabalho, agir com ética mantém a confiança de colegas, clientes e parceiros de negócio.",
    visual: {"type": "labeled", "center": "Ética Profissional", "parts": ["Responsabilidade", "Honestidade", "Respeito às leis", "Sigilo de informações"]},
    exercises: [
      { level:"facil", question:"O que significa agir com ética profissional no ambiente de trabalho do agronegócio?", options:[
      "Buscar sempre o menor preço possível, independentemente da qualidade oferecida ao cliente",
      "Evitar qualquer tipo de contato com fiscais e órgãos reguladores do setor agrícola",
      "Priorizar unicamente o lucro da empresa acima de qualquer outro critério de conduta",
      "Agir com honestidade, responsabilidade e respeito nas relações de trabalho e de negócio"
    ], correct:3, resolution:"Agir com ética profissional significa conduzir o trabalho com honestidade, responsabilidade e respeito — com colegas, clientes, parceiros e com a legislação — e não apenas buscar o maior lucro ou menor preço a qualquer custo." },
      { level:"medio", question:"Por que o conhecimento básico de direito trabalhista é importante para quem trabalha na gestão de uma propriedade rural?", options:[
      "Porque substitui totalmente a necessidade de contratar um contador especializado para cuidar da propriedade",
      "Porque permite ao gestor calcular sozinho o preço de venda de qualquer produto agropecuário no mercado",
      "Porque garante que os direitos e deveres dos trabalhadores rurais contratados sejam respeitados conforme a legislação",
      "Porque define exclusivamente qual modelo de máquina agrícola deve ser comprado pela fazenda naquele ano"
    ], correct:2, resolution:"Conhecer noções de direito trabalhista rural ajuda o gestor a cumprir corretamente as obrigações com os trabalhadores contratados — como registro, jornada e condições de trabalho — evitando problemas legais e garantindo relações de trabalho justas." },
      { level:"dificil", question:"Qual é a diferença entre uma conduta ilegal e uma conduta antiética no contexto profissional do agronegócio?", options:[
      "A conduta ilegal e a conduta antiética são consideradas, nessa visão equivocada, exatamente a mesma coisa em qualquer situação de trabalho",
      "A conduta ilegal é sempre cometida de forma totalmente intencional, e a conduta antiética é sempre resultado de um acidente puramente involuntário",
      "A conduta ilegal viola uma lei específica, enquanto a conduta antiética pode não violar nenhuma lei, mas ainda assim ser considerada incorreta pelos padrões profissionais e morais",
      "A conduta ilegal ocorre apenas dentro de grandes empresas do setor, e a conduta antiética ocorre apenas dentro de pequenas propriedades rurais familiares"
    ], correct:2, resolution:"Uma conduta pode ser tecnicamente legal (não infringir nenhuma lei específica) e, ainda assim, ser antiética — como omitir informações relevantes de um cliente em uma negociação sem, no entanto, cometer fraude formal. A ética vai além do que é apenas legalmente exigido." },
      { level:"dificilimo", question:"Por que a informalidade nas relações de trabalho rural (sem registro formal do trabalhador) representa um risco tanto ético quanto jurídico para o proprietário?", options:[
      "Porque, além de violar direitos trabalhistas previstos em lei, a informalidade expõe o trabalhador à falta de proteção social e o proprietário a sanções legais e passivos trabalhistas futuros",
      "Porque, segundo essa hipótese equivocada, o risco jurídico gerado pela informalidade afeta exclusivamente o próprio trabalhador contratado",
      "Porque, nessa interpretação incorreta, contratos informais garantem automaticamente mais direitos e benefícios ao trabalhador rural contratado",
      "Porque, segundo essa ideia equivocada, o trabalho informal no meio rural é sempre totalmente permitido e regularizado pela legislação brasileira"
    ], correct:0, resolution:"A informalidade priva o trabalhador de direitos como FGTS, INSS e férias remuneradas — uma violação tanto ética quanto legal — e ainda expõe o proprietário rural a fiscalizações, multas e ações trabalhistas futuras (passivos), já que o trabalhador pode reivindicar esses direitos judicialmente mesmo anos depois." }
    ]
  },
  "agronegocio__gestao-sustentavel-e-logistica-agropecuaria": {
    title: "Gestão Sustentável e Logística Agropecuária",
    emoji: "🚚",
    intro: "Logística agropecuária é o processo de planejar e controlar o transporte e armazenamento de produtos do campo até o destino final, e a gestão sustentável busca fazer isso reduzindo desperdícios e impactos ambientais ao longo do caminho.",
    analogy: "Pense na logística agropecuária como uma corrida contra o relógio: um produto perecível, como uma fruta colhida, começa a perder qualidade assim que sai da planta — quanto mais eficiente for o caminho até o consumidor, menos qualidade (e menos lucro) se perde no percurso.",
    visual: {"type": "flow", "steps": ["Colheita", "Armazenamento", "Transporte", "Distribuição"]},
    exercises: [
      { level:"facil", question:"Qual é o principal objetivo da logística agropecuária?", options:[
      "Planejar o transporte e armazenamento dos produtos do campo até o seu destino final",
      "Calcular unicamente o valor do salário dos trabalhadores contratados na propriedade",
      "Definir exclusivamente qual semente será utilizada no plantio da próxima safra",
      "Escolher apenas a cor da embalagem que será usada para venda do produto"
    ], correct:0, resolution:"A logística agropecuária cuida do planejamento e controle do transporte e armazenamento dos produtos, desde a colheita até o destino final, e não de decisões como escolha de sementes ou definição de salários." },
      { level:"medio", question:"Por que o armazenamento inadequado de grãos pode gerar prejuízo significativo ao produtor?", options:[
      "Porque condições incorretas de umidade e temperatura podem causar deterioração, pragas e perda de qualidade do produto",
      "Porque o armazenamento inadequado impede qualquer tipo de transporte posterior do produto",
      "Porque o armazenamento inadequado é sempre proibido por lei em qualquer tipo de propriedade",
      "Porque o armazenamento inadequado altera automaticamente o preço de mercado da commodity"
    ], correct:0, resolution:"Grãos armazenados com umidade ou temperatura incorretas ficam vulneráveis a fungos, pragas e deterioração, o que reduz a qualidade e o valor do produto — por isso o controle das condições de armazenamento é essencial para evitar prejuízo." },
      { level:"dificil", question:"Qual é a diferença estratégica entre logística de produtos perecíveis (como frutas e verduras) e logística de commodities de grãos (como soja e milho)?", options:[
      "A logística de perecíveis é sempre mais barata do que a de grãos, e a de grãos é sempre mais cara em qualquer situação de mercado",
      "A logística de perecíveis não depende de nenhum tipo de armazenamento prévio, e a de grãos depende exclusivamente dele em todos os casos",
      "A logística de perecíveis exige rapidez e controle de temperatura, enquanto a de grãos permite maior tempo de armazenamento em condições controladas antes do transporte",
      "A logística de perecíveis nunca envolve transporte rodoviário, e a de grãos utiliza exclusivamente transporte aéreo em qualquer situação"
    ], correct:2, resolution:"Produtos perecíveis como frutas se deterioram rapidamente e exigem transporte veloz e, muitas vezes, refrigerado; já grãos como soja e milho podem ser armazenados por períodos mais longos em silos com controle de umidade, permitindo mais flexibilidade no momento de transportar e vender." },
      { level:"dificilimo", question:"Por que investir em infraestrutura de armazenamento (silos) na propriedade pode ser mais vantajoso financeiramente do que vender toda a safra imediatamente após a colheita?", options:[
      "Porque, segundo essa hipótese equivocada, vender toda a produção durante a safra sempre garante o melhor preço possível ao produtor",
      "Porque armazenar permite esperar por um momento de preço mais favorável no mercado, evitando vender tudo no período de safra, quando a oferta é maior e o preço tende a ser mais baixo",
      "Porque, segundo essa ideia equivocada, o preço dos grãos nunca varia ao longo do ano em absolutamente nenhuma situação de mercado",
      "Porque, nessa interpretação incorreta, armazenar os grãos em silos elimina totalmente qualquer custo futuro de logística e transporte"
    ], correct:1, resolution:"Durante a colheita (safra), a oferta do produto no mercado aumenta bastante, o que costuma pressionar os preços para baixo; ter capacidade própria de armazenamento permite ao produtor guardar parte da produção e vender aos poucos, aproveitando momentos de preço mais favorável ao longo do ano, em vez de vender tudo de uma vez sob pressão da colheita." }
    ]
  },
  "agronegocio__agricultura": {
    title: "Agricultura: Técnicas de Cultivo",
    emoji: "🚜",
    intro: "Agricultura é a atividade de cultivar plantas para produção de alimentos, fibras e outros produtos, envolvendo etapas como preparo do solo, plantio, tratos culturais, irrigação e colheita.",
    analogy: "Pense no ciclo de cultivo como o processo de assar um bolo: pular ou fazer mal uma etapa — como não preparar bem a forma (o solo) ou não controlar a temperatura (irrigação) — compromete o resultado final, mesmo que as outras etapas tenham sido feitas corretamente.",
    visual: {"type": "cycle", "steps": ["Preparo do solo", "Plantio", "Adubação", "Irrigação", "Colheita"]},
    exercises: [
      { level:"facil", question:"Qual é a finalidade do preparo do solo antes do plantio?", options:[
      "Calcular unicamente a quantidade de chuva que cairá durante toda a safra",
      "Definir apenas o tipo de embalagem que será usada na colheita do produto",
      "Deixar o solo em condições adequadas de estrutura e nutrientes para receber as sementes ou mudas",
      "Determinar exclusivamente o preço final que o produto terá no mercado consumidor"
    ], correct:2, resolution:"O preparo do solo — como aração, gradagem e correção — busca deixar a terra em condições físicas e químicas adequadas para receber sementes ou mudas, favorecendo a germinação e o desenvolvimento das plantas." },
      { level:"medio", question:"Por que a adubação é uma etapa importante no cultivo de uma lavoura?", options:[
      "Porque ela impede totalmente qualquer incidência de chuva sobre a área da lavoura já plantada",
      "Porque ela substitui completamente a necessidade de irrigação em qualquer tipo de cultura agrícola",
      "Porque ela determina de forma exclusiva a data exata em que a colheita da safra deve ocorrer",
      "Porque ela repõe nutrientes que a planta precisa para se desenvolver, muitas vezes esgotados no solo por cultivos anteriores"
    ], correct:3, resolution:"A adubação repõe nutrientes essenciais — como nitrogênio, fósforo e potássio — que a planta consome do solo durante seu desenvolvimento, especialmente em áreas cultivadas repetidamente, onde esses nutrientes se esgotam ao longo do tempo." },
      { level:"dificil", question:"Por que a época de plantio (o chamado calendário agrícola) é uma decisão técnica tão importante quanto a escolha da semente utilizada?", options:[
      "Porque o desenvolvimento da planta depende de condições climáticas específicas em cada fase, e plantar fora da época ideal pode comprometer toda a produção mesmo com boa semente",
      "Porque a escolha da semente, nessa interpretação incorreta, é sempre mais importante do que qualquer outro fator envolvido no cultivo",
      "Porque o calendário agrícola, segundo essa hipótese equivocada, é definido de forma exclusiva por decisão direta do governo federal",
      "Porque a época de plantio, segundo essa ideia equivocada, não tem absolutamente nenhuma relação com os fatores climáticos da região cultivada"
    ], correct:0, resolution:"Cada cultura tem uma janela ideal de plantio, ligada a fatores como temperatura, disponibilidade de chuva e duração do dia; plantar fora dessa janela pode expor a lavoura a condições climáticas desfavoráveis em fases críticas do desenvolvimento (como floração), comprometendo a produtividade mesmo com uma semente de boa qualidade genética." },
      { level:"dificilimo", question:"Por que a rotação de culturas é recomendada mesmo quando uma única cultura, como a soja, apresenta alta lucratividade em determinada região?", options:[
      "Porque, nessa interpretação incorreta, o cultivo repetido de uma mesma espécie nunca afeta de forma alguma a qualidade do solo",
      "Porque, segundo essa hipótese equivocada, pragas e doenças agrícolas surgem de forma totalmente aleatória e sem nenhuma relação com o cultivo",
      "Porque, segundo essa ideia equivocada, a rotação de culturas sempre reduz drasticamente a lucratividade total da propriedade rural",
      "Porque o cultivo repetido da mesma espécie esgota nutrientes específicos do solo e favorece o acúmulo de pragas e doenças associadas àquela cultura ao longo do tempo"
    ], correct:3, resolution:"Cultivar a mesma espécie repetidamente na mesma área tende a esgotar nutrientes específicos consumidos por aquela planta e favorece o acúmulo de pragas, fungos e doenças adaptados àquela cultura no solo; a rotação com outras espécies quebra esse ciclo, protegendo a produtividade da lavoura no longo prazo — mesmo que a cultura principal seja, isoladamente, a mais lucrativa." }
    ]
  },
  "agronegocio__fundamentos-de-economia-e-contabilidade": {
    title: "Fundamentos de Economia e Contabilidade Rural",
    emoji: "💰",
    intro: "Economia e contabilidade rural tratam do controle financeiro de uma propriedade agrícola — quanto se gasta, quanto se ganha e como esses números orientam decisões de produção e investimento.",
    analogy: "Pense na contabilidade rural como o painel de instrumentos de um carro: sem ele, até é possível dirigir por um tempo, mas o motorista não sabe se está ficando sem combustível, com o motor superaquecendo, ou indo bem — os números da propriedade cumprem esse papel de mostrar a real situação do negócio.",
    visual: {"type": "bars", "data": [{"label": "Receita", "value": 120}, {"label": "Custo", "value": 80}, {"label": "Lucro", "value": 40}], "unit": " mil"},
    exercises: [
      { level:"facil", question:"O que é lucro, em termos simples de contabilidade rural?", options:[
      "O valor total de tudo o que foi vendido pela propriedade, sem descontar nenhum custo",
      "O valor fixo definido pelo governo para qualquer atividade agropecuária no país",
      "A diferença entre a receita obtida com a venda da produção e os custos totais da atividade",
      "O valor total gasto pela propriedade, sem considerar nenhuma receita obtida"
    ], correct:2, resolution:"Lucro é o que sobra depois de subtrair todos os custos da atividade (insumos, mão de obra, manutenção etc.) da receita obtida com a venda da produção — não é apenas o total vendido, nem apenas o total gasto." },
      { level:"medio", question:"Por que é importante separar custos fixos de custos variáveis na gestão financeira de uma propriedade rural?", options:[
      "Porque essa separação define, nessa interpretação incorreta, exclusivamente o preço final de venda do produto",
      "Porque custos fixos, segundo essa hipótese equivocada, deixam de existir quando a propriedade não produz nada",
      "Porque isso ajuda a entender quais gastos existem independentemente da produção e quais mudam conforme o volume produzido, melhorando o planejamento",
      "Porque a lei brasileira exige, segundo essa ideia equivocada, essa separação apenas para fins de exportação"
    ], correct:2, resolution:"Custos fixos (como o aluguel da terra ou salários fixos) existem independentemente do volume produzido, enquanto custos variáveis (como sementes e combustível) mudam conforme a quantidade produzida; entender essa diferença ajuda o produtor a planejar melhor e a saber o ponto mínimo de produção necessário para cobrir os gastos." },
      { level:"dificil", question:"Qual é a diferença entre fluxo de caixa e lucro na análise financeira de uma propriedade agrícola?", options:[
      "O fluxo de caixa e o lucro representam sempre, segundo essa ideia equivocada, exatamente o mesmo valor numérico em qualquer período analisado",
      "O fluxo de caixa mede, segundo essa hipótese equivocada, apenas as despesas da propriedade, e o lucro mede apenas as receitas, sem nenhuma relação entre os dois",
      "O fluxo de caixa mostra a entrada e saída real de dinheiro ao longo do tempo, enquanto o lucro é um resultado contábil que pode não coincidir com o dinheiro disponível no caixa naquele momento",
      "O fluxo de caixa é calculado apenas uma vez a cada ano civil, e o lucro contábil, nessa interpretação incorreta, é sempre calculado a cada semana de produção"
    ], correct:2, resolution:"Uma propriedade pode ter lucro contábil positivo em determinado período, mas enfrentar dificuldade de caixa se as receitas ainda não foram recebidas (por exemplo, uma venda a prazo) enquanto os custos já precisam ser pagos — por isso o fluxo de caixa (dinheiro que efetivamente entra e sai) é analisado separadamente do lucro contábil." },
      { level:"dificilimo", question:"Por que duas propriedades com o mesmo lucro líquido no fim do ano podem estar em situações financeiras de risco muito diferentes?", options:[
      "Porque, nessa interpretação incorreta, apenas o tamanho físico total da propriedade determina de fato seu risco financeiro real",
      "Porque, segundo essa hipótese equivocada, propriedades que apresentam o mesmo lucro nunca podem ter dívidas de valores diferentes entre si",
      "Porque o nível de endividamento, a distribuição do fluxo de caixa ao longo do ano e a dependência de poucas culturas podem variar entre elas, mesmo com o lucro final igual",
      "Porque, segundo essa ideia equivocada, o lucro líquido sempre representa exatamente o mesmo nível de risco financeiro em qualquer propriedade rural"
    ], correct:2, resolution:"O lucro líquido é apenas um número final; duas propriedades podem chegar a ele por caminhos muito diferentes — uma pode estar fortemente endividada e dependente de uma única cultura (alto risco), enquanto a outra tem baixo endividamento e produção diversificada (baixo risco) — por isso a análise financeira completa vai além do lucro e observa também endividamento, liquidez e diversificação." }
    ]
  },
  "agronegocio__qualidade-e-seguranca-alimentar-na-agroindustria": {
    title: "Qualidade e Segurança Alimentar na Agroindústria",
    emoji: "🔬",
    intro: "Segurança alimentar na agroindústria é o conjunto de práticas que garante que os alimentos processados cheguem ao consumidor livres de contaminação biológica, química ou física, seguindo padrões técnicos de qualidade.",
    analogy: "Pense no controle de qualidade de uma agroindústria como as travas de segurança de um elevador: elas não aparecem no dia a dia de quem usa o elevador normalmente, mas existem justamente para impedir que uma falha rara se transforme em um acidente grave.",
    visual: {"type": "labeled", "center": "Análise de Perigos (APPCC)", "parts": ["Perigo biológico", "Perigo químico", "Perigo físico", "Ponto crítico de controle"]},
    exercises: [
      { level:"facil", question:"O que é um perigo biológico em segurança alimentar?", options:[
      "A presença de microrganismos, como bactérias ou fungos, capazes de causar doença ao consumidor",
      "A presença de qualquer tipo de sabor considerado forte pelo consumidor final",
      "A ausência completa de qualquer rótulo de informação nutricional no produto",
      "A presença de qualquer tipo de embalagem colorida usada no produto final"
    ], correct:0, resolution:"Perigo biológico se refere à contaminação por microrganismos como bactérias, vírus ou fungos que podem causar doenças no consumidor — é uma das três categorias clássicas de perigo em segurança alimentar, junto com os perigos químicos e físicos." },
      { level:"medio", question:"Qual é a função de um Ponto Crítico de Controle (PCC) dentro do sistema APPCC?", options:[
      "Definir apenas a cor da embalagem que será utilizada no produto final entregue diretamente ao consumidor",
      "Calcular unicamente o tempo total de transporte do produto processado até chegar ao ponto final de venda",
      "Determinar de forma exclusiva qual será o preço de venda final do produto já processado pela agroindústria",
      "Identificar uma etapa do processo onde um controle específico é essencial para prevenir ou eliminar um perigo à segurança do alimento"
    ], correct:3, resolution:"Um Ponto Crítico de Controle é uma etapa do processo produtivo (como a temperatura de cozimento) onde é essencial aplicar um controle específico, porque uma falha ali pode comprometer a segurança do alimento — se esse ponto não for controlado, o perigo pode não ser eliminado em nenhuma etapa posterior." },
      { level:"dificil", question:"Por que o sistema APPCC é considerado preventivo, e não apenas corretivo, dentro da gestão de qualidade da agroindústria?", options:[
      "Porque ele identifica e controla os perigos antes que o produto seja finalizado, em vez de apenas testar o produto pronto para descartar lotes com problema",
      "Porque ele substitui, nessa interpretação incorreta, totalmente a necessidade de qualquer inspeção durante o processo produtivo",
      "Porque ele é aplicado, segundo essa ideia equivocada, somente depois que o produto já chegou às mãos do consumidor final",
      "Porque ele é usado, segundo essa hipótese equivocada, apenas em produtos que já apresentaram problema de contaminação anterior"
    ], correct:0, resolution:"O APPCC (Análise de Perigos e Pontos Críticos de Controle) atua ao longo de todo o processo produtivo, identificando onde os perigos podem surgir e controlando-os antes da finalização do produto — diferente de um sistema puramente corretivo, que testaria apenas o produto já pronto e descartaria lotes contaminados depois do fato consumado." },
      { level:"dificilimo", question:"Por que uma agroindústria pode ter todos os seus produtos aprovados em testes laboratoriais de qualidade e, ainda assim, apresentar falhas graves de segurança alimentar no sistema de produção?", options:[
      "Porque, segundo essa ideia equivocada, testes laboratoriais de qualidade nunca têm nenhuma relação real com a segurança do produto final",
      "Porque, nessa interpretação incorreta, falhas de segurança alimentar só podem ocorrer em produtos que nunca passaram por nenhum teste",
      "Porque, segundo essa hipótese equivocada, uma agroindústria aprovada em testes está sempre garantida contra qualquer falha futura",
      "Porque testes laboratoriais analisam apenas amostras pontuais, enquanto falhas sistêmicas no processo podem afetar lotes específicos não capturados por essas amostras"
    ], correct:3, resolution:"Testes laboratoriais normalmente analisam amostras — não é possível testar 100% de cada lote produzido — então uma falha pontual no processo (como uma temperatura mal controlada em determinado turno) pode gerar um lote contaminado que não foi capturado pela amostragem, mesmo que o sistema de qualidade geral da empresa seja robusto. Por isso o controle de processo (como o APPCC) é tão importante quanto o teste do produto final." }
    ]
  },
  "eletroeletronica__eletronica": {
    title: "Eletrônica: os componentes por trás dos aparelhos",
    emoji: "🔧",
    intro: "Eletrônica é a área que estuda como controlar o fluxo de corrente elétrica usando componentes como resistores, capacitores e transistores, para fazer aparelhos funcionarem.",
    analogy: "Pense num circuito elétrico como um sistema de encanamento: a corrente elétrica é a água, os fios são os canos, e componentes como resistores são \"torneiras\" que controlam o quanto de \"água\" passa.",
    visual: {"type":"labeled","center":"Circuito","parts":["Resistor","Capacitor","Transistor"]},
    steps: [
      "Resistor: controla (limita) a quantidade de corrente que passa.",
      "Capacitor: armazena energia elétrica temporariamente, como uma pequena \"pilha recarregável rápida\".",
      "Transistor: funciona como uma \"chave\" que liga/desliga ou amplifica sinais elétricos."
    ],
    exercises: [
      { level:"facil", question:"Qual é a função principal de um resistor em um circuito?", options:["Armazenar grandes quantidades de energia elétrica por longos períodos de tempo indefinidamente","Aumentar a voltagem de um circuito de forma infinita e sem nenhum limite técnico real","Gerar energia elétrica do nada, sem nenhuma fonte externa de alimentação conectada ao circuito","Limitar/controlar a quantidade de corrente elétrica"], correct:3, resolution:"O resistor controla (limita) o fluxo de corrente elétrica em um circuito, protegendo outros componentes de receberem corrente excessiva." },
      { level:"medio", question:"O que um capacitor faz em um circuito eletrônico?", options:["Gera luz colorida de forma constante, funcionando como um pequeno componente decorativo","Sempre bloqueia toda a corrente elétrica que tenta passar pelo circuito eletrônico","Serve apenas de enfeite visual dentro da placa, sem nenhuma função elétrica real","Armazena energia elétrica temporariamente e a libera quando necessário"], correct:3, resolution:"O capacitor armazena carga elétrica e a libera quando necessário, funcionando como um pequeno \"reservatório\" de energia de resposta rápida em um circuito." },
      { level:"dificil", question:"Por que um transistor é considerado um dos componentes mais importantes da eletrônica moderna, presente em bilhões de unidades dentro de um único processador de computador?", options:["Ele serve, segundo essa ideia equivocada, apenas para armazenar dados de forma permanente no circuito","Transistores, segundo essa hipótese equivocada, não são de fato usados dentro de computadores modernos","Porque ele pode funcionar como uma chave eletrônica (liga/desliga) ou amplificador","Porque ele, nessa interpretação incorreta, só serve tecnicamente para acender lâmpadas simples"], correct:2, resolution:"O transistor consegue atuar como uma \"chave\" controlada eletricamente — ligada ou desligada — o que permite representar os estados binários (0 e 1) usados na computação. Bilhões de transistores combinados formam as portas lógicas que processam toda a informação em um computador, tornando-o um dos componentes mais fundamentais da eletrônica digital." },
      { level:"dificilimo", question:"Por que circuitos eletrônicos costumam usar capacitores em paralelo com a fonte de alimentação para \"filtrar\" ruídos e picos de tensão?", options:["Isso serve, segundo essa ideia equivocada, apenas para aumentar artificialmente o custo final de fabricação do circuito eletrônico","Capacitores, nessa interpretação incorreta, na verdade aumentam os ruídos elétricos ao invés de reduzi-los dentro do circuito","Capacitores, segundo essa hipótese equivocada, não têm nenhuma relação real com a estabilidade de tensão de um circuito eletrônico","Porque o capacitor absorve variações rápidas de tensão (picos), carregando-se e descarregando-se, suavizando a energia entregue ao circuito"], correct:3, resolution:"Quando há uma variação brusca de tensão (um \"pico\" ou ruído), o capacitor consegue absorver rapidamente esse excesso de energia (carregando-se) e depois devolvê-la de forma mais suave (descarregando-se), atuando como um \"amortecedor\" elétrico. Essa técnica, chamada de \"capacitor de desacoplamento\" ou \"filtro\", protege componentes sensíveis (como chips) de danos ou mau funcionamento causados por instabilidades na alimentação elétrica." }
    ]
  },
  "agropecuaria__irrigacao-e-drenagem": {
    title: "Irrigação e Drenagem",
    emoji: "💧",
    intro: "Irrigação é o fornecimento controlado de água para as plantas quando a chuva não é suficiente, e drenagem é a remoção do excesso de água do solo, evitando encharcamento e apodrecimento das raízes.",
    analogy: "Pense na irrigação e na drenagem como as duas metades de um mesmo sistema de controle de água: uma torneira que enche demais um vaso de planta é tão prejudicial quanto uma que nunca abre — o segredo é manter o equilíbrio certo de água no solo, nem seco demais, nem encharcado.",
    visual: {"type": "compare", "leftTitle": "Irrigação", "leftItems": ["Adiciona água ao solo", "Usada em época seca", "Métodos: gotejamento, aspersão"], "rightTitle": "Drenagem", "rightItems": ["Remove excesso de água", "Usada em solo encharcado", "Métodos: valas, drenos subterrâneos"]},
    exercises: [
      { level:"facil", question:"Qual é a finalidade principal da irrigação em uma lavoura?", options:[
      "Aumentar de forma artificial e permanente a temperatura média do solo cultivado na propriedade",
      "Substituir por completo a necessidade de preparo do solo antes do plantio das sementes",
      "Eliminar totalmente a necessidade de qualquer tipo de adubação ao longo de todo o ciclo da cultura",
      "Fornecer água às plantas de forma controlada quando a chuva não é suficiente"
    ], correct:3, resolution:"A irrigação existe para suprir a necessidade de água das plantas quando as chuvas naturais não são suficientes para o desenvolvimento da cultura, garantindo o volume de água necessário em cada fase do cultivo." },
      { level:"medio", question:"Por que o excesso de água no solo, sem drenagem adequada, pode prejudicar uma lavoura?", options:[
      "Porque o excesso de água aumenta de forma direta e imediata o valor de mercado da produção colhida",
      "Porque o excesso de água altera apenas a coloração visual das folhas, sem nenhum outro efeito real na planta",
      "Porque o excesso de água impede exclusivamente a germinação das sementes plantadas na safra seguinte",
      "Porque o encharcamento reduz o oxigênio disponível nas raízes, favorecendo o apodrecimento e doenças"
    ], correct:3, resolution:"Quando o solo fica encharcado por muito tempo, o oxigênio disponível para as raízes diminui bastante, o que favorece o apodrecimento radicular e a proliferação de fungos e doenças, prejudicando o desenvolvimento da planta como um todo." },
      { level:"dificil", question:"Qual é a diferença técnica entre irrigação por gotejamento e irrigação por aspersão?", options:[
      "O gotejamento é usado exclusivamente em grandes lavouras de milho, e a aspersão apenas em pequenas hortas domésticas",
      "O gotejamento não utiliza nenhum tipo de tubulação, e a aspersão depende unicamente de canais abertos escavados no solo",
      "O gotejamento é aplicado somente durante a noite, e a aspersão é aplicada exclusivamente durante o período da manhã",
      "O gotejamento aplica água diretamente na região das raízes, gota a gota, enquanto a aspersão espalha água sobre toda a área como uma chuva artificial"
    ], correct:3, resolution:"No gotejamento, a água é liberada lentamente, gota a gota, bem próxima da raiz da planta, o que reduz o desperdício por evaporação; na aspersão, aspersores espalham água sobre toda a área cultivada, simulando uma chuva, cobrindo áreas maiores de uma vez." },
      { level:"dificilimo", question:"Por que um sistema de drenagem mal dimensionado pode comprometer a eficiência de um sistema de irrigação instalado na mesma área, mesmo que ambos estejam tecnicamente corretos isoladamente?", options:[
      "Porque, segundo essa ideia equivocada, irrigação e drenagem são sistemas completamente independentes que nunca interagem entre si na prática",
      "Porque, segundo essa hipótese equivocada, qualquer sistema de irrigação funciona de forma idêntica independentemente das condições de drenagem do solo",
      "Porque, nessa interpretação incorreta, a drenagem mal dimensionada afeta apenas a estética visual da propriedade, sem nenhum efeito técnico real",
      "Porque a água aplicada pela irrigação precisa de um caminho de escoamento adequado, e sem drenagem eficiente ela se acumula no solo, anulando o controle hídrico pretendido pela irrigação"
    ], correct:3, resolution:"Irrigação e drenagem formam um sistema integrado de manejo de água: a irrigação adiciona água de forma controlada, mas se a drenagem não escoa o excesso adequadamente, a água se acumula, encharca o solo e anula o controle hídrico pretendido — por isso os dois sistemas precisam ser projetados em conjunto, não isoladamente." }
    ]
  },
  "agropecuaria__gestao-ambiental-e-empreendedorismo": {
    title: "Gestão Ambiental e Empreendedorismo Rural",
    emoji: "🌿",
    intro: "Gestão ambiental na propriedade rural envolve práticas que reduzem o impacto ambiental da produção, e empreendedorismo rural é a capacidade de identificar oportunidades de negócio e gerar valor a partir da atividade agropecuária.",
    analogy: "Pense na gestão ambiental como a manutenção preventiva de um carro: cuidar do motor regularmente custa menos do que consertar uma quebra grave depois — cuidar do solo, da água e da vegetação nativa da propriedade evita prejuízos ambientais e financeiros muito maiores no futuro.",
    visual: {"type": "labeled", "center": "Gestão Ambiental Rural", "parts": ["Reserva legal", "Recursos hídricos", "Manejo do solo", "Resíduos da produção"]},
    exercises: [
      { level:"facil", question:"O que é reserva legal em uma propriedade rural?", options:[
      "Uma área reservada apenas para a construção de novas edificações residenciais no futuro",
      "Uma área de plantio destinada obrigatoriamente apenas à produção voltada para exportação",
      "Uma área específica destinada exclusivamente ao armazenamento de máquinas agrícolas da propriedade",
      "Uma área de vegetação nativa que deve ser mantida preservada dentro da propriedade, conforme a legislação"
    ], correct:3, resolution:"A reserva legal é uma área de vegetação nativa que a legislação ambiental brasileira exige que seja mantida preservada dentro da propriedade rural, com percentual mínimo que varia conforme o bioma e a região do país." },
      { level:"medio", question:"Por que o empreendedorismo rural vai além de apenas produzir bem uma cultura ou criação?", options:[
      "Porque o empreendedorismo rural, segundo essa ideia equivocada, se resume exclusivamente a aumentar a área plantada todo ano",
      "Porque o empreendedorismo rural, segundo essa hipótese equivocada, depende apenas da sorte com as condições climáticas",
      "Porque, nessa interpretação incorreta, produzir bem uma cultura já garante automaticamente o sucesso financeiro do negócio",
      "Porque envolve identificar oportunidades de mercado, agregar valor ao produto e planejar o negócio de forma estratégica"
    ], correct:3, resolution:"O empreendedor rural precisa, além de dominar a técnica produtiva, identificar oportunidades de mercado, pensar em formas de agregar valor ao produto (como beneficiamento ou certificação) e planejar financeiramente o negócio — produzir bem é necessário, mas não é suficiente para o sucesso do empreendimento." },
      { level:"dificil", question:"Qual é a relação entre gestão ambiental e competitividade de mercado para uma propriedade rural nos dias de hoje?", options:[
      "A competitividade de mercado, nessa interpretação incorreta, depende exclusivamente do preço mais baixo possível de venda",
      "Práticas ambientais, segundo essa hipótese equivocada, sempre reduzem a competitividade da propriedade frente a outros produtores",
      "A gestão ambiental, segundo essa ideia equivocada, nunca tem nenhuma relação com o acesso a crédito ou financiamento rural",
      "Práticas ambientalmente responsáveis podem abrir acesso a mercados que exigem certificação e a linhas de crédito com condições melhores"
    ], correct:3, resolution:"Cada vez mais compradores, especialmente no mercado externo, exigem comprovação de práticas ambientalmente responsáveis (como certificações de origem sustentável), e instituições financeiras oferecem linhas de crédito rural com condições melhores para propriedades regularizadas ambientalmente — tornando a gestão ambiental um diferencial competitivo, não apenas uma obrigação legal." },
      { level:"dificilimo", question:"Por que uma propriedade rural pode ter excelente desempenho produtivo e, ainda assim, enfrentar sérias restrições comerciais por questões de gestão ambiental?", options:[
      "Porque, segundo essa hipótese equivocada, compradores de commodities agropecuárias nunca exigem, em nenhuma circunstância, qualquer tipo de comprovação de regularidade ambiental",
      "Porque a irregularidade ambiental (como desmatamento ilegal ou falta de regularização da reserva legal) pode impedir o acesso a certificações e a compradores que exigem conformidade ambiental, independentemente da produtividade",
      "Porque, segundo essa ideia equivocada, o desempenho produtivo de uma propriedade nunca é avaliado de forma separada de sua situação ambiental por nenhum comprador ou instituição financeira do setor",
      "Porque, nessa interpretação incorreta, restrições comerciais causadas por questões ambientais só existem, de fato, para propriedades localizadas fora do território brasileiro"
    ], correct:1, resolution:"Uma propriedade pode ser altamente produtiva tecnicamente e ainda assim ficar de fora de determinados mercados (como grandes exportadoras que exigem rastreabilidade livre de desmatamento) se não estiver regularizada ambientalmente — a produtividade agrícola e a conformidade ambiental são avaliadas por critérios distintos pelos compradores mais exigentes." }
    ]
  },
  "agropecuaria__cooperativismo-associativismo-e-extensao-rural": {
    title: "Cooperativismo, Associativismo e Extensão Rural",
    emoji: "🤝",
    intro: "Cooperativismo e associativismo são formas de produtores rurais se unirem para ganhar força coletiva — em compras, vendas e representação — e a extensão rural leva orientação técnica até essas comunidades organizadas.",
    analogy: "Pense em uma cooperativa como um grupo de vizinhos que compram materiais de construção juntos: sozinho, cada um pagaria o preço cheio de varejo; unidos, conseguem comprar por atacado e negociar condições muito melhores.",
    visual: {"type": "flow", "steps": ["Produtores individuais", "União em cooperativa", "Negociação coletiva", "Ganho de escala"]},
    exercises: [
      { level:"facil", question:"O que é uma cooperativa agropecuária?", options:[
      "Uma organização formada por produtores rurais que se unem para obter benefícios coletivos, como melhores preços e condições de venda",
      "Um tipo específico de seguro agrícola de contratação obrigatória para todo produtor rural registrado no país",
      "Um órgão vinculado diretamente ao governo federal, responsável exclusivamente pela fiscalização periódica de propriedades rurais",
      "Uma empresa privada estrangeira especializada na compra de terras de pequenos produtores rurais brasileiros para revenda futura"
    ], correct:0, resolution:"Uma cooperativa agropecuária é formada pela união voluntária de produtores rurais que se organizam coletivamente para obter vantagens que, individualmente, seriam mais difíceis de conseguir — como melhores preços de insumos e melhores condições de venda da produção." },
      { level:"medio", question:"Qual é a principal vantagem do associativismo para pequenos produtores rurais?", options:[
      "Eliminar de forma completa qualquer necessidade de acompanhamento técnico da produção agrícola",
      "Dispensar totalmente a necessidade de registro formal da atividade rural perante o governo",
      "Ganhar maior poder de negociação e acesso a recursos que seriam inviáveis para um produtor sozinho",
      "Garantir de forma automática o mesmo lucro para todos os produtores associados ao grupo"
    ], correct:2, resolution:"Ao se associarem, pequenos produtores conseguem negociar em maior volume, acessar equipamentos e serviços compartilhados, e ter mais força de representação política e comercial do que teriam individualmente, algo essencial para quem produz em pequena escala." },
      { level:"dificil", question:"Qual é a diferença fundamental entre uma cooperativa e uma associação de produtores rurais?", options:[
      "A cooperativa nunca pode legalmente reunir mais de dez produtores rurais associados em sua estrutura, e a associação não possui nenhum tipo de limite de participantes",
      "A cooperativa é proibida por lei federal de comercializar qualquer tipo de produto agropecuário, e a associação é a única entidade autorizada a fazê-lo",
      "A cooperativa é sempre de propriedade exclusiva do governo estadual, e a associação é sempre de propriedade privada de uma única pessoa física",
      "A cooperativa realiza atividade econômica direta (como comprar e vender em nome dos cooperados), enquanto a associação tem foco mais representativo e social, sem necessariamente operar economicamente"
    ], correct:3, resolution:"A cooperativa é uma sociedade que realiza atividade econômica em benefício dos cooperados (compra insumos, comercializa produção, presta serviços), enquanto a associação costuma ter um caráter mais representativo e social, defendendo interesses do grupo, sem necessariamente operar diretamente no mercado como a cooperativa faz." },
      { level:"dificilimo", question:"Por que a extensão rural desempenha um papel estratégico na formação e no fortalecimento de cooperativas em regiões de agricultura familiar?", options:[
      "Porque, além de levar conhecimento técnico produtivo, o extensionista pode orientar sobre gestão coletiva, organização social e acesso a políticas públicas de apoio ao cooperativismo",
      "Porque, segundo essa ideia equivocada, a extensão rural é responsável por administrar diretamente as finanças de qualquer cooperativa formada",
      "Porque, nessa interpretação incorreta, cooperativas só conseguem se formar legalmente com a participação direta de um extensionista rural",
      "Porque, segundo essa hipótese equivocada, o papel da extensão rural se limita exclusivamente a ensinar técnicas de plantio e colheita"
    ], correct:0, resolution:"O trabalho do extensionista rural vai além da técnica produtiva: ele pode orientar produtores sobre como se organizar coletivamente, formar cooperativas ou associações de forma correta, e acessar políticas públicas de crédito e apoio ao cooperativismo — um papel importante especialmente em regiões de agricultura familiar, onde o acesso a essas informações costuma ser mais limitado." }
    ]
  },
  "agropecuaria__solos": {
    title: "Ciência do Solo",
    emoji: "🟤",
    intro: "A ciência do solo estuda a composição física, química e biológica do solo, fundamental para entender sua fertilidade e capacidade de sustentar o crescimento das plantas cultivadas.",
    analogy: "Pense no solo como a despensa de uma casa: se ela está bem abastecida com os ingredientes certos (nutrientes), a 'receita' (a planta) se desenvolve bem; se está vazia ou desorganizada, mesmo a melhor semente não consegue se desenvolver plenamente.",
    visual: {"type": "pie", "slices": [{"label": "Minerais", "value": 45}, {"label": "Matéria orgânica", "value": 5}, {"label": "Ar", "value": 25}, {"label": "Água", "value": 25}]},
    exercises: [
      { level:"facil", question:"Quais são os principais componentes que formam o solo?", options:[
      "Apenas rochas sólidas, sem qualquer espaço poroso disponível para ar ou água",
      "Apenas restos de plantas, sem a presença de nenhum tipo de partícula mineral",
      "Partículas minerais, matéria orgânica, ar e água",
      "Apenas água e areia, sem nenhum outro tipo de componente adicional presente"
    ], correct:2, resolution:"O solo é formado por uma combinação de partículas minerais (areia, silte, argila), matéria orgânica, além de espaços porosos ocupados por ar e água — é essa combinação que determina suas características físicas e sua fertilidade." },
      { level:"medio", question:"Por que a matéria orgânica é considerada tão importante para a fertilidade do solo, mesmo representando uma pequena porcentagem do total?", options:[
      "Porque a matéria orgânica, nessa interpretação incorreta, substitui totalmente a necessidade de água para o desenvolvimento vegetal",
      "Porque a matéria orgânica, segundo essa hipótese equivocada, determina sozinha a cor final que o solo terá em qualquer região",
      "Porque ela melhora a estrutura do solo, retém água e nutrientes e alimenta os microrganismos responsáveis pela ciclagem de nutrientes",
      "Porque a matéria orgânica, segundo essa ideia equivocada, é o único componente capaz de sustentar fisicamente as raízes das plantas"
    ], correct:2, resolution:"Mesmo em pequena quantidade, a matéria orgânica melhora a estrutura física do solo (formando agregados que facilitam a infiltração de água e ar), retém umidade e nutrientes, e serve de alimento para microrganismos que decompõem material orgânico e liberam nutrientes disponíveis para as plantas." },
      { level:"dificil", question:"Qual é a diferença entre solo arenoso e solo argiloso em termos de manejo agrícola?", options:[
      "O solo arenoso é sempre mais fértil naturalmente do que qualquer solo argiloso em qualquer região do país",
      "O solo arenoso drena água rapidamente e retém pouco nutriente, enquanto o argiloso retém mais água e nutrientes, mas pode ter drenagem mais lenta",
      "O solo arenoso é usado exclusivamente para pastagem, e o solo argiloso é usado exclusivamente para lavoura de grãos",
      "O solo argiloso nunca precisa de nenhum tipo de adubação, e o solo arenoso sempre precisa de adubação intensa"
    ], correct:1, resolution:"Solos arenosos têm partículas maiores, o que facilita a drenagem da água mas dificulta a retenção de nutrientes; solos argilosos têm partículas menores e mais compactadas, retendo mais água e nutrientes, porém podendo apresentar drenagem mais lenta e maior risco de encharcamento — cada tipo exige um manejo diferente." },
      { level:"dificilimo", question:"Por que a análise de solo é considerada uma ferramenta indispensável antes de decidir a quantidade e o tipo de adubo a ser aplicado em uma lavoura?", options:[
      "Porque, nessa interpretação incorreta, a quantidade de adubo aplicada em uma lavoura nunca guarda nenhuma relação com o custo final da produção",
      "Porque, segundo essa ideia equivocada, todo tipo de solo agrícola do território brasileiro possui exatamente a mesma composição química e nutricional",
      "Porque cada solo tem uma composição química diferente, e aplicar adubo sem conhecer essa composição pode gerar excesso, desperdício financeiro ou até desequilíbrio de nutrientes prejudicial à planta",
      "Porque, segundo essa hipótese equivocada, qualquer planta cultivada consegue se adaptar perfeitamente a excesso ou falta de nutrientes no solo"
    ], correct:2, resolution:"Solos diferentes — mesmo em propriedades vizinhas — podem ter composições químicas bem distintas; sem a análise de solo, o produtor corre o risco de aplicar adubo em excesso (desperdiçando dinheiro e podendo até prejudicar a planta por desequilíbrio de nutrientes) ou em quantidade insuficiente (limitando a produtividade), por isso a análise é a base técnica para uma adubação eficiente." }
    ]
  },
  "agropecuaria__zootecnia": {
    title: "Zootecnia Aplicada à Agropecuária",
    emoji: "🐄",
    intro: "Zootecnia aplicada envolve o manejo prático de animais de produção na propriedade agropecuária — alimentação, reprodução, sanidade e bem-estar — para garantir eficiência produtiva e qualidade do rebanho.",
    analogy: "Pense na zootecnia aplicada como o trabalho de um técnico de futebol acompanhando o dia a dia do time: não basta ter bons jogadores (animais), é preciso planejar treino, alimentação e recuperação de cada um para que o time inteiro renda o seu melhor durante toda a temporada.",
    visual: {"type": "labeled", "center": "Manejo do Rebanho", "parts": ["Alimentação", "Reprodução", "Sanidade", "Bem-estar animal"]},
    steps: [
      "Planejar a alimentação conforme a fase de vida e a categoria do animal (cria, recria, engorda).",
      "Organizar o calendário reprodutivo para concentrar nascimentos em épocas favoráveis.",
      "Manter um programa sanitário preventivo, com vacinação e vermifugação regulares.",
      "Monitorar sinais de estresse e garantir espaço e conforto adequados ao rebanho."
    ],
    exercises: [
      { level:"facil", question:"O que é manejo sanitário de um rebanho?", options:[
      "O cálculo do peso ideal de cada animal no momento da comercialização final",
      "A construção de currais e cercas destinados exclusivamente à contenção do gado",
      "O processo de venda dos animais adultos já prontos para o abate na propriedade",
      "O conjunto de práticas preventivas, como vacinação e vermifugação, para manter os animais saudáveis"
    ], correct:3, resolution:"O manejo sanitário é o conjunto de práticas preventivas — como vacinação, vermifugação e controle de parasitas — que visam evitar doenças e manter a saúde do rebanho, diferente de atividades como venda ou construção de instalações." },
      { level:"medio", question:"Por que concentrar a época de nascimentos (estação de monta planejada) traz vantagens para o manejo do rebanho?", options:[
      "Porque, segundo essa ideia equivocada, concentrar nascimentos elimina totalmente a necessidade de qualquer vacinação futura",
      "Porque, segundo essa hipótese equivocada, a estação de monta planejada é exigida obrigatoriamente pela legislação federal em qualquer rebanho",
      "Porque facilita o planejamento de alimentação, manejo sanitário e comercialização de lotes de animais em idades semelhantes",
      "Porque, nessa interpretação incorreta, animais nascidos na mesma época nunca precisam de nenhum tipo de alimentação suplementar"
    ], correct:2, resolution:"Ao concentrar os nascimentos em um período definido (estação de monta), o produtor consegue planejar melhor a alimentação, o manejo sanitário e a venda de lotes de animais com idade e peso semelhantes, o que facilita a logística e melhora a eficiência da propriedade." },
      { level:"dificil", question:"Por que o índice de conversão alimentar é um indicador tão relevante na zootecnia de produção?", options:[
      "Porque esse índice, segundo essa ideia equivocada, mede exclusivamente a quantidade de água consumida pelo animal por dia",
      "Porque esse índice, nessa interpretação incorreta, determina diretamente o preço de venda do produto no mercado consumidor",
      "Porque esse índice, segundo essa hipótese equivocada, é usado apenas para calcular impostos sobre a produção animal",
      "Porque mostra quanto alimento é necessário para gerar cada unidade de ganho de peso, indicando a eficiência econômica da criação"
    ], correct:3, resolution:"O índice de conversão alimentar relaciona a quantidade de alimento consumido com o ganho de peso obtido pelo animal — quanto menor esse índice, mais eficiente é a conversão de alimento em peso, o que impacta diretamente o custo e a lucratividade da atividade pecuária." },
      { level:"dificilimo", question:"Por que dois rebanhos com a mesma genética e a mesma dieta podem apresentar índices de produtividade bem diferentes ao final do ciclo de engorda?", options:[
      "Porque fatores de manejo, como controle de estresse, sanidade preventiva e condições ambientais (espaço, temperatura), também influenciam diretamente o desempenho produtivo dos animais",
      "Porque, nessa interpretação incorreta, a dieta fornecida aos animais nunca tem nenhuma influência real sobre o resultado produtivo",
      "Porque, segundo essa ideia equivocada, a genética do rebanho é o único fator capaz de determinar a produtividade final dos animais",
      "Porque, segundo essa hipótese equivocada, rebanhos com a mesma genética sempre apresentam resultados produtivos idênticos entre si"
    ], correct:0, resolution:"Genética e dieta são fatores importantes, mas não são os únicos: o manejo do rebanho — controle de estresse, prevenção sanitária, conforto térmico e espaço adequado — também afeta diretamente a conversão alimentar e o ganho de peso, explicando por que rebanhos com condições genéticas e alimentares semelhantes podem ter desempenho final bem diferente." }
    ]
  },
  "agropecuaria__agricultura": {
    title: "Agricultura na Propriedade Agropecuária",
    emoji: "🌽",
    intro: "A agricultura na propriedade agropecuária envolve o cultivo de culturas destinadas tanto à venda quanto à alimentação do próprio rebanho, integrando produção vegetal e animal na mesma área.",
    analogy: "Pense na integração lavoura-pecuária como um casal que divide as tarefas de casa de forma complementar: a lavoura fornece alimento e melhora o solo para o pasto seguinte, e o pasto, com o esterco animal, ajuda a repor nutrientes para a lavoura seguinte — cada atividade fortalece a outra.",
    visual: {"type": "cycle", "steps": ["Plantio da lavoura", "Colheita de grãos", "Pastagem do rebanho", "Adubação com esterco"]},
    exercises: [
      { level:"facil", question:"O que caracteriza a integração lavoura-pecuária em uma propriedade agropecuária?", options:[
      "A proibição legal de qualquer tipo de pastagem em áreas que já tenham sido usadas para lavoura",
      "O uso da mesma área, de forma planejada, tanto para cultivo de lavoura quanto para criação animal",
      "A construção de cercas permanentes que separam totalmente lavoura e pastagem na propriedade",
      "A obrigação de vender toda a produção de lavoura exclusivamente para outras propriedades vizinhas"
    ], correct:1, resolution:"A integração lavoura-pecuária é o sistema em que a mesma área é usada, de forma planejada e alternada, tanto para cultivo agrícola quanto para pastagem animal, aproveitando os benefícios de cada atividade para a outra." },
      { level:"medio", question:"Qual é um dos principais benefícios agronômicos de integrar lavoura e pecuária na mesma propriedade?", options:[
      "Essa integração, segundo essa ideia equivocada, elimina totalmente a necessidade de qualquer tipo de adubação futura",
      "Essa integração, segundo essa hipótese equivocada, é exigida obrigatoriamente pela legislação ambiental em todo o país",
      "Essa integração, nessa interpretação incorreta, garante automaticamente o dobro de produtividade em qualquer cultura plantada",
      "O esterco dos animais em pastagem ajuda a repor nutrientes ao solo, beneficiando o cultivo de lavoura no ciclo seguinte"
    ], correct:3, resolution:"Quando o rebanho pasta em uma área que depois será usada para lavoura, o esterco depositado ao longo do tempo ajuda a repor nutrientes e matéria orgânica ao solo, o que pode reduzir a necessidade de adubação química e melhorar a fertilidade natural para o cultivo seguinte." },
      { level:"dificil", question:"Por que o planejamento do calendário agrícola em uma propriedade com integração lavoura-pecuária é mais complexo do que em uma propriedade só de lavoura ou só de pecuária?", options:[
      "Porque é preciso coordenar simultaneamente o ciclo da cultura, a disponibilidade de pasto e as necessidades nutricionais do rebanho ao longo do ano",
      "Porque, segundo essa ideia equivocada, propriedades integradas são sempre proibidas de plantar mais de uma cultura por ano",
      "Porque, nessa interpretação incorreta, o calendário agrícola de propriedades integradas é definido exclusivamente pelo governo estadual",
      "Porque, segundo essa hipótese equivocada, a pecuária e a lavoura nunca podem compartilhar exatamente a mesma área de terra"
    ], correct:0, resolution:"Em uma propriedade integrada, o produtor precisa planejar o momento certo de retirar o rebanho para plantar a lavoura, cuidar do desenvolvimento da cultura, colher no momento adequado e depois reintroduzir os animais para pastejo — tudo isso coordenado com o ciclo climático e as necessidades nutricionais do rebanho, o que exige um planejamento mais detalhado do que em sistemas isolados." },
      { level:"dificilimo", question:"Por que a integração lavoura-pecuária pode reduzir o risco financeiro de uma propriedade agropecuária, mesmo sem necessariamente aumentar a receita total?", options:[
      "Porque, segundo essa ideia equivocada, a integração lavoura-pecuária elimina totalmente qualquer tipo de risco climático da propriedade",
      "Porque, nessa interpretação incorreta, propriedades integradas nunca sofrem nenhum tipo de oscilação de preço no mercado agropecuário",
      "Porque, segundo essa hipótese equivocada, a integração garante sempre o dobro da receita obtida por propriedades não integradas",
      "Porque diversifica as fontes de renda da propriedade, reduzindo a dependência de uma única atividade sujeita a oscilações de preço ou clima"
    ], correct:3, resolution:"Ao diversificar entre lavoura e pecuária, a propriedade reduz sua dependência de uma única fonte de renda: se o preço de determinado grão cair em um ano, a renda da pecuária pode compensar parte da perda, e vice-versa — essa diversificação reduz o risco financeiro global do negócio, mesmo que não garanta, sozinha, uma receita total maior." }
    ]
  },
  "agropecuaria__desenho-tecnico": {
    title: "Desenho Técnico Rural",
    emoji: "📐",
    intro: "Desenho técnico rural é a representação gráfica padronizada de instalações, equipamentos e estruturas da propriedade agropecuária, usando normas específicas para comunicar medidas e detalhes de forma precisa.",
    analogy: "Pense no desenho técnico como uma receita de bolo bem detalhada: em vez de descrever tudo em texto corrido, ele usa símbolos e medidas padronizados que qualquer pedreiro ou engenheiro consegue interpretar da mesma forma, evitando erros de construção por interpretação equivocada.",
    visual: {"type": "labeled", "center": "Desenho Técnico", "parts": ["Escala", "Cotas (medidas)", "Vistas (planta, corte)", "Legenda e símbolos"]},
    exercises: [
      { level:"facil", question:"Para que serve o desenho técnico em uma propriedade rural?", options:[
      "Representar de forma padronizada e precisa instalações e estruturas, facilitando sua construção e interpretação",
      "Substituir totalmente a necessidade de qualquer medição física realizada diretamente no local da obra",
      "Servir apenas como decoração artística para ser exposta dentro do escritório da propriedade",
      "Registrar exclusivamente o histórico de vendas de produtos realizadas ao longo do ano"
    ], correct:0, resolution:"O desenho técnico serve para representar de forma padronizada, com medidas e símbolos precisos, instalações e estruturas rurais — como currais, galpões ou sistemas de irrigação — facilitando sua construção correta e sua interpretação por diferentes profissionais envolvidos." },
      { level:"medio", question:"O que representa a 'escala' em um desenho técnico?", options:[
      "O tipo específico de material que deve ser usado obrigatoriamente na construção real",
      "O tempo estimado necessário para concluir totalmente a obra representada no desenho",
      "A proporção entre o tamanho representado no papel e o tamanho real do objeto ou estrutura",
      "O valor total investido na construção da estrutura representada no desenho técnico"
    ], correct:2, resolution:"A escala indica a proporção entre as medidas representadas no desenho e as medidas reais da estrutura — por exemplo, uma escala 1:100 significa que cada centímetro no papel corresponde a 100 centímetros (1 metro) na construção real." },
      { level:"dificil", question:"Por que um desenho técnico costuma apresentar mais de uma vista (como planta baixa e corte) de uma mesma estrutura rural?", options:[
      "Porque a legislação brasileira, segundo essa ideia equivocada, exige obrigatoriamente pelo menos três vistas em qualquer desenho técnico",
      "Porque múltiplas vistas, segundo essa hipótese equivocada, servem apenas para aumentar o valor cobrado pelo projeto",
      "Porque uma única vista, nessa interpretação incorreta, nunca é permitida por norma técnica em nenhum tipo de projeto",
      "Porque cada vista mostra informações diferentes e complementares, necessárias para entender completamente a estrutura em três dimensões"
    ], correct:3, resolution:"Uma planta baixa mostra a disposição de ambientes vista de cima, enquanto um corte mostra detalhes internos e alturas que não aparecem na planta — como a estrutura precisa ser construída em três dimensões, múltiplas vistas complementares são necessárias para representar completamente a obra." },
      { level:"dificilimo", question:"Por que um erro na leitura da escala de um desenho técnico pode ter consequências muito mais graves do que um pequeno erro visual no desenho em si?", options:[
      "Porque um erro de escala se multiplica proporcionalmente em todas as medidas da construção real, podendo tornar a estrutura inteira incompatível com o espaço ou uso pretendido",
      "Porque, nessa interpretação incorreta, a escala definida em um desenho técnico nunca guarda nenhuma relação real com as medidas efetivas da obra",
      "Porque, segundo essa ideia equivocada, erros de escala afetam exclusivamente a aparência estética final da estrutura já construída na propriedade",
      "Porque, segundo essa hipótese equivocada, qualquer erro de escala pode ser facilmente corrigido depois que a obra já estiver totalmente concluída"
    ], correct:0, resolution:"Como todas as medidas do desenho são proporcionais à escala indicada, um erro na leitura da escala se propaga para toda a estrutura — por exemplo, interpretar 1:100 como 1:50 faria com que todas as dimensões construídas ficassem incorretas proporcionalmente, o que pode tornar a estrutura inutilizável ou incompatível com o espaço e o propósito originalmente planejados." }
    ]
  },
  "agropecuaria__agroindustria": {
    title: "Agroindústria",
    emoji: "🏭",
    intro: "Agroindústria é o processo de transformar matéria-prima agropecuária (grãos, leite, carne) em produtos processados com maior valor agregado, prontos ou quase prontos para o consumo.",
    analogy: "Pense na agroindústria como a diferença entre vender café em grão cru e vender café torrado e moído embalado: a matéria-prima é a mesma, mas o processamento agrega valor, muda o preço e amplia o mercado consumidor do produto.",
    visual: {"type": "flow", "steps": ["Matéria-prima", "Processamento", "Embalagem", "Produto final"]},
    exercises: [
      { level:"facil", question:"O que é agroindústria?", options:[
      "Um tipo de máquina agrícola usada apenas para o preparo inicial do solo antes do plantio",
      "Uma área da propriedade destinada exclusivamente ao pasto de animais em fase de engorda",
      "O processo de transformar produtos agropecuários em produtos processados com maior valor agregado",
      "Um imposto cobrado sobre a venda direta de produtos agrícolas ainda não processados"
    ], correct:2, resolution:"Agroindústria é o processo de transformação de matérias-primas agropecuárias — como leite, grãos ou carne — em produtos processados, como queijo, farinha ou embutidos, agregando valor ao produto original." },
      { level:"medio", question:"Por que processar o leite em queijo, por exemplo, costuma gerar mais receita do que vender o leite in natura?", options:[
      "Porque o leite in natura, nessa interpretação incorreta, não pode ser legalmente vendido em nenhuma parte do território brasileiro",
      "Porque a fabricação de queijo, segundo essa hipótese equivocada, é sempre obrigatória por lei em qualquer propriedade leiteira",
      "Porque o processamento agrega valor ao produto, permitindo vendê-lo por um preço proporcionalmente maior e com maior durabilidade",
      "Porque o processo de fabricação de queijo, segundo essa ideia equivocada, elimina totalmente qualquer custo de produção"
    ], correct:2, resolution:"O processamento do leite em queijo agrega valor ao produto original, além de aumentar sua durabilidade (o queijo se conserva por mais tempo que o leite in natura), permitindo que o produtor venda por um preço proporcionalmente maior do que venderia a matéria-prima bruta." },
      { level:"dificil", question:"Qual é a diferença entre agroindústria de pequena escala (artesanal) e agroindústria de grande escala (industrial) em termos de gestão?", options:[
      "A de pequena escala é sempre proibida por lei de vender seus produtos fora dos limites da própria região onde foi originalmente produzida",
      "A de grande escala nunca produz, em nenhuma hipótese possível, qualquer tipo de produto derivado de leite ou de carne, apenas de grãos",
      "A de pequena escala não pode, segundo essa interpretação da legislação, empregar formalmente nenhum tipo de trabalhador contratado",
      "A de pequena escala costuma ter processos mais manuais e produção limitada, enquanto a de grande escala utiliza automação e produz em volumes muito maiores com padronização rigorosa"
    ], correct:3, resolution:"A agroindústria artesanal, geralmente familiar, opera em menor volume com processos mais manuais e um público mais local; a agroindústria industrial trabalha em grande escala, com automação, padronização rigorosa e distribuição em mercados mais amplos — cada uma exige uma estrutura de gestão bem diferente." },
      { level:"dificilimo", question:"Por que uma agroindústria de pequena escala pode competir com sucesso contra grandes indústrias, mesmo sem ter a mesma capacidade de produção?", options:[
      "Porque, nessa interpretação incorreta, a legislação brasileira proíbe grandes indústrias de vender determinados tipos de produto processado",
      "Porque, segundo essa hipótese equivocada, o consumidor nunca valoriza nenhuma característica além do preço mais baixo do produto",
      "Porque pode se posicionar em nichos que valorizam produtos artesanais, com identidade local, história e características que a produção industrial em massa não consegue replicar",
      "Porque, segundo essa ideia equivocada, agroindústrias de pequena escala sempre têm um custo de produção menor do que as grandes indústrias"
    ], correct:2, resolution:"Embora não consiga competir em volume ou preço com grandes indústrias, uma agroindústria de pequena escala pode se diferenciar por atributos que parte do consumidor valoriza — como produção artesanal, identidade regional e proximidade com a origem do produto — conquistando nichos de mercado dispostos a pagar mais por essas características específicas." }
    ]
  },
  "agropecuaria__construcoes-e-instalacoes-rurais": {
    title: "Construções e Instalações Rurais",
    emoji: "🏚️",
    intro: "Construções e instalações rurais são as estruturas físicas de uma propriedade — currais, galpões, silos, cercas — planejadas para atender às necessidades específicas da produção agropecuária.",
    analogy: "Pense em cada instalação rural como uma ferramenta especializada de uma caixa de ferramentas: um curral mal projetado é como usar a chave errada em um parafuso — até funciona de algum jeito, mas com muito mais esforço, desgaste e risco de acidente do que usar a ferramenta certa para aquela função.",
    visual: {"type": "labeled", "center": "Instalações Rurais", "parts": ["Curral", "Galpão de máquinas", "Silo de armazenamento", "Cercas e divisões"]},
    exercises: [
      { level:"facil", question:"Qual é a função principal de um curral em uma propriedade de pecuária?", options:[
      "Facilitar o manejo, a contenção e a movimentação segura dos animais durante procedimentos como vacinação e pesagem",
      "Guardar unicamente as máquinas agrícolas utilizadas durante o preparo do solo antes do plantio",
      "Servir apenas como local de moradia temporária destinado aos trabalhadores contratados pela fazenda",
      "Armazenar exclusivamente os grãos colhidos durante toda a época de safra registrada na propriedade rural"
    ], correct:0, resolution:"O curral é projetado para facilitar o manejo seguro do gado — reunir, conter e movimentar os animais durante procedimentos como vacinação, pesagem e separação de lotes — e não para armazenamento de grãos ou máquinas." },
      { level:"medio", question:"Por que o dimensionamento correto de um galpão de armazenamento é importante para a propriedade agropecuária?", options:[
      "Porque, nessa interpretação incorreta, galpões maiores são sempre obrigatórios por lei em qualquer tipo de propriedade rural",
      "Porque, segundo essa hipótese equivocada, o dimensionamento do galpão não tem nenhuma relação com a conservação dos produtos",
      "Porque um espaço mal dimensionado pode comprometer a conservação dos produtos armazenados e a eficiência operacional da propriedade",
      "Porque, segundo essa ideia equivocada, o tamanho do galpão determina exclusivamente o preço final de venda da produção"
    ], correct:2, resolution:"Um galpão subdimensionado pode não comportar toda a produção com ventilação e organização adequadas, favorecendo perdas por umidade ou pragas, enquanto um galpão superdimensionado representa um investimento desnecessário — o dimensionamento correto equilibra capacidade de armazenamento com uso eficiente do investimento." },
      { level:"dificil", question:"Por que a localização de instalações como currais e galpões dentro da propriedade é uma decisão técnica importante, e não apenas uma questão de espaço disponível?", options:[
      "Porque fatores como topografia, direção do vento, proximidade de fontes de água e distância de vias de acesso afetam diretamente a funcionalidade e o custo operacional das instalações",
      "Porque a localização das instalações, nessa interpretação incorreta, nunca tem nenhuma relação com fatores como vento ou topografia",
      "Porque a legislação ambiental, segundo essa ideia equivocada, determina exatamente o mesmo local para qualquer tipo de instalação rural",
      "Porque, segundo essa hipótese equivocada, qualquer área plana da propriedade serve igualmente bem para qualquer tipo de instalação"
    ], correct:0, resolution:"A localização de instalações rurais deve considerar fatores técnicos como a topografia do terreno (para facilitar drenagem), a direção predominante do vento (para reduzir odores e melhorar ventilação), a proximidade de fontes de água e a distância até vias de acesso — ignorar esses fatores pode gerar custos operacionais maiores e problemas de funcionalidade no dia a dia." },
      { level:"dificilimo", question:"Por que investir em instalações rurais bem planejadas pode reduzir custos de mão de obra da propriedade a longo prazo, mesmo exigindo um investimento inicial maior?", options:[
      "Porque, segundo essa ideia equivocada, instalações bem planejadas eliminam totalmente a necessidade de qualquer trabalhador contratado na propriedade",
      "Porque, segundo essa hipótese equivocada, instalações mais caras sempre garantem automaticamente uma redução proporcional nos salários pagos",
      "Porque, nessa interpretação incorreta, o custo de mão de obra rural nunca tem nenhuma relação com o layout das instalações físicas",
      "Porque instalações bem projetadas tornam o manejo diário mais rápido e seguro, reduzindo o tempo e o esforço necessários para realizar tarefas repetidas ao longo dos anos"
    ], correct:3, resolution:"Um curral bem projetado, por exemplo, permite que menos pessoas consigam manejar um lote de animais com mais rapidez e segurança do que em uma estrutura mal planejada, onde tarefas simples podem levar muito mais tempo e exigir mais mão de obra — ao longo de anos de uso repetido, essa eficiência de tempo e pessoal compensa o investimento inicial mais alto." }
    ]
  },
  "agropecuaria__topografia": {
    title: "Topografia Rural",
    emoji: "🗺️",
    intro: "Topografia rural é a técnica de medir e representar o relevo e as características da superfície de uma propriedade, informação essencial para planejar plantio, drenagem, estradas e construções.",
    analogy: "Pense na topografia como o mapa de elevação de um jogo de estratégia: antes de decidir onde construir cada estrutura, o jogador precisa entender o relevo do terreno — onde é mais alto, mais baixo, mais inclinado — para tomar decisões mais eficientes; o mesmo vale para planejar uma propriedade rural.",
    visual: {"type": "line", "points": [{"x": 0, "y": 10, "label": "0m"}, {"x": 1, "y": 25, "label": "100m"}, {"x": 2, "y": 18, "label": "200m"}, {"x": 3, "y": 30, "label": "300m"}], "xLabel": "Distância", "yLabel": "Altitude"},
    exercises: [
      { level:"facil", question:"O que estuda a topografia aplicada à propriedade rural?", options:[
      "A medição e representação do relevo e das características da superfície do terreno",
      "A análise unicamente da quantidade de chuva registrada ao longo de todo o ano",
      "O cálculo do valor de mercado de cada hectare de terra disponível na região",
      "O estudo exclusivo da composição química presente no solo cultivado da propriedade"
    ], correct:0, resolution:"A topografia se ocupa de medir e representar o relevo do terreno — desníveis, inclinações, altitudes — informação diferente da composição química do solo, do valor de mercado ou dos dados climáticos, que são estudados por outras áreas." },
      { level:"medio", question:"Por que conhecer a declividade do terreno é importante antes de planejar o plantio de uma lavoura?", options:[
      "Porque a declividade do terreno, segundo essa ideia equivocada, determina exclusivamente qual será o preço final da colheita",
      "Porque terrenos muito inclinados aumentam o risco de erosão do solo e podem exigir práticas específicas de manejo, como o plantio em curvas de nível",
      "Porque, segundo essa hipótese equivocada, a declividade do terreno não tem nenhuma relação com o risco de erosão do solo",
      "Porque, nessa interpretação incorreta, terrenos inclinados nunca podem ser utilizados para nenhum tipo de cultivo agrícola"
    ], correct:1, resolution:"Terrenos com maior declividade são mais suscetíveis à erosão, já que a água da chuva escoa com mais força e velocidade, arrastando partículas de solo — por isso, em áreas inclinadas, técnicas como o plantio em curvas de nível ajudam a reduzir esse risco, mantendo a fertilidade do solo." },
      { level:"dificil", question:"Qual é a relação entre o levantamento topográfico e o planejamento de um sistema de irrigação em uma propriedade?", options:[
      "O levantamento topográfico mostra os desníveis do terreno, o que ajuda a definir por onde a água pode ser conduzida por gravidade ou onde será necessário bombeamento",
      "O levantamento topográfico, nessa interpretação incorreta, é usado apenas para calcular o valor de revenda futura do imóvel rural",
      "O levantamento topográfico, segundo essa ideia equivocada, determina exclusivamente qual cultura deve ser plantada na propriedade",
      "O levantamento topográfico, segundo essa hipótese equivocada, não tem nenhuma relação prática com o planejamento de sistemas de irrigação"
    ], correct:0, resolution:"Conhecer os desníveis do terreno através do levantamento topográfico permite planejar de forma mais eficiente o sistema de irrigação — identificando trechos onde a água pode ser conduzida por gravidade (mais barato) e onde será necessário bombeamento (mais caro), otimizando o projeto e reduzindo custos de energia." },
      { level:"dificilimo", question:"Por que um projeto de terraceamento (construção de patamares no terreno para conter erosão) exige um levantamento topográfico preciso antes de sua execução, e não pode ser feito apenas por observação visual do terreno?", options:[
      "Porque, nessa interpretação incorreta, a simples observação visual do terreno é sempre tecnicamente mais precisa do que qualquer levantamento topográfico instrumental realizado",
      "Porque, segundo essa ideia equivocada, o terraceamento é uma técnica proibida por lei em qualquer propriedade que não possua levantamento topográfico prévio registrado",
      "Porque o dimensionamento correto dos terraços depende de medições exatas de declividade e desnível, e erros nessas medidas podem tornar o terraceamento ineficaz ou até agravar o escoamento de água em vez de controlá-lo",
      "Porque, segundo essa hipótese equivocada, terraços mal dimensionados nunca representam absolutamente nenhum tipo de risco adicional de erosão para o solo"
    ], correct:2, resolution:"O terraceamento precisa seguir cálculos precisos de declividade e espaçamento entre os patamares para conduzir a água de forma controlada; um erro nessas medidas — algo que a observação visual não é capaz de garantir com precisão — pode fazer com que a água se concentre em pontos específicos e acelere a erosão, em vez de controlá-la, tornando o levantamento topográfico instrumental indispensável nesse tipo de projeto." }
    ]
  },
  "agropecuaria__administracao-rural": {
    title: "Administração Rural",
    emoji: "📊",
    intro: "Administração rural é o planejamento, organização e controle dos recursos de uma propriedade agropecuária — financeiros, humanos e materiais — para alcançar melhores resultados produtivos e econômicos.",
    analogy: "Pense na administração rural como o painel de controle de uma orquestra: cada instrumento (lavoura, pecuária, mão de obra, finanças) pode até tocar bem sozinho, mas é o maestro (a administração) que garante que tudo funcione em conjunto, no tempo certo e gerando um resultado harmonioso.",
    visual: {"type": "cycle", "steps": ["Planejamento", "Organização", "Execução", "Controle e avaliação"]},
    exercises: [
      { level:"facil", question:"O que é administração rural?", options:[
      "Um imposto cobrado anualmente sobre a produção total comercializada pela propriedade rural",
      "O planejamento e controle dos recursos financeiros, humanos e materiais de uma propriedade agropecuária",
      "Um documento legal que comprova exclusivamente a propriedade da terra perante o cartório de registro",
      "Um tipo específico de seguro obrigatório contratado para toda safra plantada na propriedade"
    ], correct:1, resolution:"Administração rural é o processo de planejar, organizar e controlar os recursos de uma propriedade — dinheiro, pessoas, máquinas, insumos — buscando os melhores resultados produtivos e financeiros possíveis, e não um documento, seguro ou imposto." },
      { level:"medio", question:"Por que o planejamento é considerado a primeira etapa da administração rural?", options:[
      "Porque, segundo essa ideia equivocada, o planejamento é a única etapa realmente necessária na administração rural",
      "Porque, nessa interpretação incorreta, o planejamento elimina totalmente a necessidade de qualquer controle posterior das atividades",
      "Porque, segundo essa hipótese equivocada, o planejamento é exigido por lei apenas em propriedades de grande porte",
      "Porque define os objetivos e as ações necessárias antes de organizar recursos e executar as atividades da propriedade"
    ], correct:3, resolution:"O planejamento é a etapa inicial porque define os objetivos da propriedade e as ações necessárias para alcançá-los, servindo de base para as etapas seguintes — organizar os recursos, executar as atividades e depois controlar e avaliar os resultados obtidos." },
      { level:"dificil", question:"Qual é a diferença entre planejamento estratégico e planejamento operacional na administração de uma propriedade rural?", options:[
      "O planejamento estratégico nunca considera nenhum tipo de meta financeira, e o operacional considera apenas metas financeiras",
      "O planejamento estratégico é usado somente em propriedades de pecuária, e o operacional é usado somente em propriedades de lavoura",
      "O planejamento estratégico é elaborado exclusivamente pelo governo federal, e o operacional é elaborado apenas pelo produtor individualmente",
      "O estratégico define objetivos de longo prazo para o negócio como um todo, enquanto o operacional trata das ações do dia a dia necessárias para executar esse planejamento"
    ], correct:3, resolution:"O planejamento estratégico trata de decisões de longo prazo, como expandir a produção ou diversificar atividades, enquanto o planejamento operacional lida com as tarefas cotidianas necessárias para colocar essa estratégia em prática, como o cronograma de plantio ou a escala de trabalho da equipe." },
      { level:"dificilimo", question:"Por que uma propriedade rural pode ter bons resultados produtivos e, ainda assim, apresentar problemas administrativos graves que comprometem sua sustentabilidade financeira no longo prazo?", options:[
      "Porque, segundo essa ideia equivocada, bons resultados produtivos sempre garantem automaticamente uma boa administração financeira da propriedade",
      "Porque, segundo essa hipótese equivocada, a sustentabilidade financeira de uma propriedade depende exclusivamente da quantidade produzida",
      "Porque, nessa interpretação incorreta, problemas administrativos só podem ocorrer em propriedades com baixa produtividade agrícola",
      "Porque bom desempenho produtivo não garante, por si só, controle financeiro adequado, planejamento de investimentos ou gestão eficiente de custos e riscos do negócio"
    ], correct:3, resolution:"Produzir bem tecnicamente é apenas uma parte do sucesso do negócio rural — sem controle de custos, planejamento financeiro e gestão de riscos adequados, uma propriedade produtiva pode acumular dívidas, tomar decisões de investimento equivocadas ou ficar vulnerável a oscilações de mercado, comprometendo sua sustentabilidade mesmo com boa produção agrícola." }
    ]
  },
  "agropecuaria__mecanizacao-agricola-saude-e-seguranca-no-trabalho": {
    title: "Mecanização Agrícola, Saúde e Segurança no Trabalho",
    emoji: "🚜",
    intro: "Mecanização agrícola é o uso de máquinas e equipamentos para otimizar as etapas da produção rural, e saúde e segurança no trabalho tratam da prevenção de acidentes e doenças relacionadas à operação dessas máquinas.",
    analogy: "Pense em um trator mal regulado ou operado sem treinamento como uma faca afiada usada sem cuidado: a ferramenta em si aumenta muito a eficiência do trabalho, mas exige atenção e respeito, porque o mesmo poder que otimiza o trabalho pode causar um acidente sério se usado de forma incorreta.",
    visual: {"type": "labeled", "center": "Segurança na Mecanização", "parts": ["Treinamento do operador", "Manutenção preventiva", "EPIs adequados", "Sinalização de risco"]},
    exercises: [
      { level:"facil", question:"Qual é o principal objetivo da mecanização agrícola?", options:[
      "Substituir por completo a necessidade de análise de solo antes do plantio da lavoura",
      "Eliminar totalmente a necessidade de qualquer tipo de mão de obra humana na propriedade rural",
      "Aumentar a eficiência e reduzir o esforço manual nas etapas da produção rural",
      "Servir exclusivamente como forma de aumentar o valor de revenda da propriedade rural"
    ], correct:2, resolution:"A mecanização agrícola tem como objetivo tornar as etapas da produção — como preparo do solo, plantio e colheita — mais rápidas e eficientes, reduzindo o esforço manual, mas não eliminando totalmente a necessidade de mão de obra qualificada para operar e supervisionar as máquinas." },
      { level:"medio", question:"Por que o treinamento do operador é tão importante quanto a qualidade da máquina agrícola utilizada?", options:[
      "Porque, nessa interpretação incorreta, máquinas agrícolas modernas nunca oferecem nenhum tipo de risco ao operador",
      "Porque, segundo essa hipótese equivocada, o treinamento é exigido apenas para máquinas importadas de outros países",
      "Porque, segundo essa ideia equivocada, o treinamento do operador substitui totalmente a necessidade de manutenção da máquina",
      "Porque mesmo uma máquina de boa qualidade pode causar acidentes ou operar de forma ineficiente se manuseada por alguém sem treinamento adequado"
    ], correct:3, resolution:"Uma máquina bem construída ainda depende de um operador que saiba usá-la corretamente — que conheça seus limites, procedimentos de segurança e manutenção básica — caso contrário, o risco de acidentes e o desgaste desnecessário do equipamento aumentam, independentemente da qualidade da máquina." },
      { level:"dificil", question:"Por que a manutenção preventiva das máquinas agrícolas é considerada uma medida de segurança do trabalho, e não apenas uma questão econômica?", options:[
      "Porque falhas mecânicas não identificadas a tempo podem causar acidentes graves durante a operação, além de prejuízos financeiros",
      "Porque a manutenção preventiva, nessa interpretação incorreta, não tem nenhuma relação real com o risco de acidentes durante o trabalho",
      "Porque a manutenção preventiva, segundo essa hipótese equivocada, serve apenas para manter a aparência estética da máquina",
      "Porque a manutenção preventiva, segundo essa ideia equivocada, é exigida exclusivamente para fins de garantia comercial do fabricante"
    ], correct:0, resolution:"Peças desgastadas, freios comprometidos ou sistemas hidráulicos com defeito podem falhar durante a operação de uma máquina agrícola, colocando em risco a segurança do operador e de outras pessoas próximas — por isso a manutenção preventiva é também uma medida essencial de segurança do trabalho, além de evitar prejuízos financeiros com reparos maiores." },
      { level:"dificilimo", question:"Por que a introdução de máquinas cada vez mais automatizadas no campo não elimina, e em alguns casos pode até aumentar, a importância da capacitação em segurança do trabalho?", options:[
      "Porque, nessa interpretação incorreta, a capacitação em segurança do trabalho se torna completamente desnecessária e dispensável à medida que a tecnologia agrícola avança",
      "Porque, segundo essa hipótese equivocada, quanto mais automatizada for a máquina agrícola, sempre menor será a necessidade de qualquer tipo de treinamento prévio do operador",
      "Porque máquinas mais complexas exigem conhecimento técnico mais específico para operação e manutenção segura, e falhas de interpretação de sistemas automatizados podem gerar riscos novos e menos óbvios que os de máquinas simples",
      "Porque, segundo essa ideia equivocada, máquinas automatizadas modernas nunca apresentam absolutamente nenhum tipo de risco real ao operador rural em qualquer situação de trabalho"
    ], correct:2, resolution:"Máquinas automatizadas e de precisão trazem sistemas eletrônicos, sensores e comandos mais complexos, que exigem do operador uma compreensão técnica mais aprofundada; um erro de interpretação de um sistema automatizado pode gerar riscos menos óbvios do que os de uma máquina simples e mecânica, tornando a capacitação contínua em segurança do trabalho ainda mais relevante à medida que a mecanização avança." }
    ]
  },
  "alimentos__fundamentos-de-bromatologia-e-nutricao": {
    title: "Fundamentos de Bromatologia e Nutrição",
    emoji: "🍎",
    intro: "Bromatologia é a ciência que estuda a composição dos alimentos — nutrientes, propriedades físico-químicas e valor nutricional — servindo de base para entender como os alimentos afetam a saúde humana.",
    analogy: "Pense na bromatologia como a ficha técnica de um produto: assim como uma ficha técnica de eletrônico lista os componentes internos de um aparelho, a bromatologia detalha os componentes internos de um alimento — proteínas, carboidratos, gorduras, vitaminas e minerais.",
    visual: {"type": "pie", "slices": [{"label": "Carboidratos", "value": 50}, {"label": "Proteínas", "value": 20}, {"label": "Gorduras", "value": 25}, {"label": "Vitaminas/Minerais", "value": 5}]},
    exercises: [
      { level:"facil", question:"O que estuda a bromatologia?", options:[
      "Apenas o tempo de validade impresso na embalagem de produtos industrializados",
      "Unicamente o transporte e a logística de distribuição de alimentos entre cidades",
      "A composição e as propriedades nutricionais dos alimentos",
      "Exclusivamente o preço de venda dos alimentos praticado nos supermercados de uma região"
    ], correct:2, resolution:"A bromatologia estuda a composição química e as propriedades nutricionais dos alimentos — como proteínas, carboidratos, gorduras, vitaminas e minerais — e não aspectos como preço, validade impressa ou logística de transporte." },
      { level:"medio", question:"Por que os carboidratos são considerados a principal fonte de energia rápida na alimentação humana?", options:[
      "Porque os carboidratos, segundo essa ideia equivocada, são o único nutriente capaz de ser absorvido pelo intestino humano",
      "Porque os carboidratos, segundo essa hipótese equivocada, nunca são armazenados pelo corpo em nenhuma forma de reserva",
      "Porque os carboidratos, nessa interpretação incorreta, substituem completamente a necessidade de proteínas na dieta diária",
      "Porque o corpo os converte em glicose de forma relativamente rápida, usando-a como combustível imediato para as células"
    ], correct:3, resolution:"Os carboidratos são digeridos e convertidos em glicose relativamente rápido, sendo utilizados pelas células como fonte de energia imediata — diferente de gorduras e proteínas, que o corpo processa e utiliza de forma mais lenta como fonte energética." },
      { level:"dificil", question:"Qual é a diferença entre macronutrientes e micronutrientes do ponto de vista bromatológico?", options:[
      "Macronutrientes (carboidratos, proteínas, gorduras) são necessários em grandes quantidades para energia e estrutura, enquanto micronutrientes (vitaminas, minerais) são necessários em pequenas quantidades para funções regulatórias",
      "Macronutrientes são encontrados exclusivamente em alimentos de origem animal, e micronutrientes apenas em alimentos de origem vegetal em qualquer contexto da produção industrial de alimentos",
      "Macronutrientes são sempre prejudiciais à saúde em qualquer quantidade, e micronutrientes são sempre benéficos em qualquer quantidade independentemente do tipo de alimento ou processo envolvido",
      "Macronutrientes são medidos apenas em miligramas, e micronutrientes são medidos exclusivamente em quilogramas na análise ao longo de qualquer etapa do processo produtivo considerado"
    ], correct:0, resolution:"Macronutrientes são consumidos em grandes quantidades e fornecem energia e material estrutural ao corpo (carboidratos, proteínas, gorduras), enquanto micronutrientes são necessários em quantidades muito menores, mas essenciais para funções regulatórias do organismo, como vitaminas e minerais." },
      { level:"dificilimo", question:"Por que a análise bromatológica de um mesmo alimento pode apresentar resultados nutricionais diferentes dependendo da origem, do cultivo e do processamento aplicado a ele?", options:[
      "Porque, segundo essa ideia equivocada, a composição nutricional de um alimento é sempre fixa e idêntica, independentemente de onde ou como foi produzido",
      "Porque, segundo essa hipótese equivocada, apenas alimentos de origem animal apresentam variação em sua composição nutricional real",
      "Porque fatores como solo, clima, variedade cultivada e método de processamento alteram a composição química real do alimento, mesmo que ele seja da mesma espécie",
      "Porque, nessa interpretação incorreta, a análise bromatológica é um processo impreciso que nunca consegue detectar nenhuma diferença real entre alimentos"
    ], correct:2, resolution:"A composição nutricional de um alimento não é fixa: fatores como o tipo de solo, o clima da região, a variedade genética cultivada e o processamento aplicado (cozimento, industrialização) podem alterar significativamente seus níveis de nutrientes, mesmo entre alimentos da mesma espécie — por isso análises bromatológicas específicas são importantes para conhecer a composição real de cada lote." }
    ]
  },
  "alimentos__quimica-e-bioquimica-de-alimentos": {
    title: "Química e Bioquímica de Alimentos",
    emoji: "🧪",
    intro: "Química e bioquímica de alimentos estudam as reações químicas e biológicas que ocorrem nos alimentos — como oxidação, fermentação e desnaturação de proteínas — e como essas reações afetam sabor, textura e conservação.",
    analogy: "Pense nas reações químicas de um alimento como o envelhecimento de uma maçã cortada: o escurecimento que aparece depois de alguns minutos não é 'sujeira' se formando, é uma reação química real (oxidação) acontecendo diante dos nossos olhos — entender essas reações é o que permite controlar, retardar ou aproveitar esses processos na indústria.",
    visual: {"type": "flow", "steps": ["Alimento fresco", "Reação química/bioquímica", "Alteração de cor, sabor ou textura", "Produto final ou deterioração"]},
    exercises: [
      { level:"facil", question:"O que causa o escurecimento de uma maçã cortada exposta ao ar?", options:[
      "A ação exclusiva de bactérias específicas que se multiplicam apenas em frutas cortadas",
      "Uma reação causada unicamente pela luz solar direta incidindo sobre a fruta cortada",
      "O acúmulo de poeira e sujeira do ambiente sobre a superfície exposta da fruta",
      "Uma reação química de oxidação entre compostos da fruta e o oxigênio do ar"
    ], correct:3, resolution:"O escurecimento da maçã cortada é causado por uma reação de oxidação enzimática, em que enzimas presentes na fruta reagem com o oxigênio do ar, formando compostos escuros — não é causado por bactérias, sujeira ou apenas pela luz solar." },
      { level:"medio", question:"O que é desnaturação de proteínas, um fenômeno comum ao cozinhar um ovo?", options:[
      "A desnaturação, nessa interpretação incorreta, ocorre apenas em proteínas de origem vegetal, nunca em proteínas animais",
      "A desnaturação, segundo essa hipótese equivocada, é reversível em qualquer situação, retornando a proteína ao seu estado original",
      "A mudança na estrutura da proteína causada por calor, ácido ou outros fatores, alterando sua forma e propriedades originais",
      "A desnaturação, segundo essa ideia equivocada, é o processo de destruição total e completa das proteínas presentes no alimento"
    ], correct:2, resolution:"A desnaturação é a alteração na estrutura tridimensional da proteína, causada por calor, ácido ou outros agentes, mudando sua forma e propriedades — como quando a clara do ovo, translúcida e líquida, se torna branca e firme ao ser aquecida — sem necessariamente destruir a proteína, apenas mudar sua conformação." },
      { level:"dificil", question:"Qual é a diferença entre fermentação e putrefação do ponto de vista bioquímico?", options:[
      "A fermentação ocorre apenas em bebidas alcoólicas, e a putrefação ocorre exclusivamente em produtos cárneos processados em qualquer contexto da produção industrial de alimentos",
      "A fermentação é sempre um processo mais rápido do que a putrefação, que sempre demora vários meses para se iniciar ao longo de qualquer etapa do processo produtivo considerado",
      "A fermentação nunca envolve nenhum tipo de microrganismo vivo, e a putrefação depende inteiramente deles para ocorrer independentemente do tipo de alimento ou processo envolvido",
      "A fermentação é um processo controlado por microrganismos específicos que gera produtos desejáveis, enquanto a putrefação é a decomposição descontrolada por microrganismos indesejados, gerando produtos impróprios para consumo"
    ], correct:3, resolution:"Tanto a fermentação quanto a putrefação envolvem a ação de microrganismos sobre o alimento, mas a fermentação é controlada e utiliza microrganismos específicos e desejáveis (como leveduras e certas bactérias) para produzir alimentos como pão, queijo e vinho, enquanto a putrefação é a decomposição descontrolada por microrganismos indesejados, tornando o alimento impróprio para consumo." },
      { level:"dificilimo", question:"Por que o controle da atividade de água (e não apenas da umidade total) é fundamental para prever a estabilidade química e microbiológica de um alimento processado?", options:[
      "Porque, nessa interpretação incorreta, a atividade de água só é relevante para alimentos líquidos, nunca para alimentos sólidos ou desidratados independentemente do tipo de alimento ou processo envolvido",
      "Porque, segundo essa hipótese equivocada, microrganismos conseguem se desenvolver normalmente mesmo sem nenhuma quantidade de água disponível no alimento",
      "Porque a atividade de água indica a quantidade de água efetivamente disponível para reações químicas e para o crescimento de microrganismos, o que pode ser bem diferente da umidade total presente no alimento",
      "Porque, segundo essa ideia equivocada, a atividade de água e a umidade total de um alimento são sempre exatamente o mesmo valor numérico em qualquer contexto da produção industrial de alimentos"
    ], correct:2, resolution:"A atividade de água mede a fração de água que está livre e disponível para reações químicas e para o metabolismo de microrganismos — dois alimentos podem ter a mesma umidade total, mas atividades de água diferentes, porque parte da água pode estar quimicamente ligada a outras moléculas e indisponível; é a atividade de água, não a umidade total, que determina o quanto um alimento é vulnerável à deterioração." }
    ]
  },
  "alimentos__higiene-biosseguranca-e-introducao-ao-laboratorio": {
    title: "Higiene, Biossegurança e Introdução ao Laboratório",
    emoji: "🧤",
    intro: "Higiene e biossegurança na indústria de alimentos envolvem práticas que evitam a contaminação dos produtos, enquanto a introdução ao laboratório ensina procedimentos básicos e seguros para análises técnicas de alimentos.",
    analogy: "Pense na higiene industrial como o protocolo de uma sala de cirurgia: cada etapa — lavar as mãos, usar equipamento adequado, evitar contato desnecessário — existe para reduzir ao máximo o risco de contaminação, mesmo quando não há nenhum sinal visível de sujeira ou perigo.",
    visual: {"type": "labeled", "center": "Boas Práticas de Higiene", "parts": ["Higienização das mãos", "Uso de EPIs", "Sanitização de equipamentos", "Controle de pragas"]},
    exercises: [
      { level:"facil", question:"Qual é o objetivo principal das boas práticas de higiene em uma indústria de alimentos?", options:[
      "Prevenir a contaminação dos alimentos durante o processamento, protegendo a saúde do consumidor",
      "Aumentar exclusivamente a velocidade de produção da linha industrial de alimentos",
      "Reduzir apenas o custo final de fabricação dos produtos alimentícios processados",
      "Melhorar unicamente a aparência visual externa das instalações da fábrica"
    ], correct:0, resolution:"As boas práticas de higiene existem para prevenir a contaminação dos alimentos ao longo de todo o processo produtivo, protegendo a saúde do consumidor final — não têm como objetivo principal velocidade, custo ou aparência externa da fábrica." },
      { level:"medio", question:"Por que o uso de EPIs (como toucas e luvas) é obrigatório em áreas de processamento de alimentos?", options:[
      "Porque, nessa interpretação incorreta, EPIs são exigidos exclusivamente em fábricas destinadas à exportação de alimentos",
      "Porque, segundo essa ideia equivocada, o uso de EPIs serve apenas para identificar visualmente o cargo do trabalhador na fábrica",
      "Porque reduz o risco de contaminação física e biológica do alimento por contato direto com o corpo do trabalhador",
      "Porque, segundo essa hipótese equivocada, o uso de EPIs elimina totalmente a necessidade de qualquer outro tipo de higienização"
    ], correct:2, resolution:"EPIs como toucas, luvas e aventais reduzem o risco de contaminação do alimento por cabelo, células de pele, suor ou contato direto das mãos, funcionando como uma barreira física entre o trabalhador e o produto — mas complementam, e não substituem, outras práticas de higienização." },
      { level:"dificil", question:"Qual é a diferença entre limpeza e sanitização (desinfecção) de um equipamento na indústria de alimentos?", options:[
      "A limpeza remove sujidades visíveis, como restos de alimento e gordura, enquanto a sanitização reduz microrganismos a níveis seguros, muitas vezes usando agentes químicos ou calor",
      "A limpeza remove apenas microrganismos, e a sanitização remove apenas sujidades visíveis, sem nenhuma sobreposição entre elas ao longo de qualquer etapa do processo produtivo considerado",
      "A limpeza é feita exclusivamente com água fria, e a sanitização é feita exclusivamente com água fervente em qualquer situação independentemente do tipo de alimento ou processo envolvido",
      "A limpeza e a sanitização são sempre exatamente o mesmo processo, apenas com nomes diferentes usados na indústria em qualquer contexto da produção industrial de alimentos"
    ], correct:0, resolution:"A limpeza remove sujidades visíveis, como restos de alimento, gordura e poeira; já a sanitização (ou desinfecção) é uma etapa posterior que reduz a carga de microrganismos a níveis seguros, geralmente usando produtos químicos sanitizantes ou calor — um equipamento pode parecer limpo visualmente e ainda assim não estar sanitizado." },
      { level:"dificilimo", question:"Por que a ordem das etapas de higienização (pré-lavagem, limpeza, enxágue, sanitização, enxágue final) é tecnicamente importante, e não pode ser alterada livremente?", options:[
      "Porque, nessa interpretação incorreta, qualquer uma dessas etapas pode ser completamente eliminada sem afetar o resultado final da higienização",
      "Porque, segundo essa hipótese equivocada, a ordem das etapas só importa em fábricas de grande porte, nunca em pequenas agroindústrias",
      "Porque cada etapa prepara as condições necessárias para a eficácia da etapa seguinte, e alterar a ordem pode reduzir a eficácia da sanitização final, mesmo usando os mesmos produtos",
      "Porque, segundo essa ideia equivocada, a ordem das etapas de higienização é definida apenas por tradição, sem nenhum fundamento técnico real"
    ], correct:2, resolution:"Cada etapa cumpre uma função específica: a pré-lavagem remove sujidade grosseira, a limpeza remove resíduos com detergente, o enxágue retira o detergente, a sanitização reduz microrganismos, e o enxágue final remove resíduos do sanitizante — pular ou inverter etapas pode deixar resíduos que reduzem a eficácia da sanitização, mesmo usando os produtos corretos." }
    ]
  },
  "alimentos__microbiologia-de-alimentos": {
    title: "Microbiologia de Alimentos",
    emoji: "🦠",
    intro: "Microbiologia de alimentos estuda os microrganismos — bactérias, fungos, leveduras — que podem estar presentes nos alimentos, seja causando deterioração e doenças, seja sendo usados de forma benéfica em processos como fermentação.",
    analogy: "Pense nos microrganismos em um alimento como moradores invisíveis de um prédio: alguns são vizinhos úteis que ajudam a manter tudo funcionando bem (como as bactérias do iogurte), e outros são intrusos que causam estragos (como bactérias patogênicas) — o trabalho da microbiologia de alimentos é saber identificar e controlar quem está morando ali.",
    visual: {"type": "compare", "leftTitle": "Microrganismos benéficos", "leftItems": ["Usados em fermentação", "Ex: leveduras, lactobacilos", "Melhoram sabor e conservação"], "rightTitle": "Microrganismos patogênicos", "rightItems": ["Causam doenças alimentares", "Ex: Salmonella, E. coli", "Precisam ser controlados/eliminados"]},
    exercises: [
      { level:"facil", question:"O que é um microrganismo patogênico em alimentos?", options:[
      "Um microrganismo utilizado exclusivamente na fabricação de queijos e iogurtes fermentados",
      "Um composto químico usado como conservante artificial em produtos industrializados",
      "Um microrganismo capaz de causar doença no consumidor quando presente em quantidade suficiente no alimento",
      "Um tipo específico de vitamina encontrada naturalmente em vegetais folhosos crus"
    ], correct:2, resolution:"Microrganismo patogênico é aquele capaz de causar doença ao ser humano quando ingerido em quantidade suficiente — diferente de microrganismos benéficos usados na fermentação, e diferente de vitaminas ou conservantes, que não são microrganismos." },
      { level:"medio", question:"Por que a refrigeração de alimentos ajuda a retardar a deterioração microbiológica?", options:[
      "Porque temperaturas baixas reduzem a velocidade de multiplicação da maioria dos microrganismos deteriorantes e patogênicos",
      "Porque a refrigeração, nessa interpretação incorreta, altera permanentemente a composição química do alimento refrigerado",
      "Porque a refrigeração, segundo essa ideia equivocada, elimina completamente todos os microrganismos presentes no alimento",
      "Porque a refrigeração, segundo essa hipótese equivocada, impede totalmente a entrada de qualquer novo microrganismo no alimento"
    ], correct:0, resolution:"Temperaturas baixas retardam o metabolismo e a taxa de multiplicação da maioria dos microrganismos, mas não os eliminam completamente — por isso alimentos refrigerados ainda podem deteriorar, só que de forma mais lenta do que em temperatura ambiente." },
      { level:"dificil", question:"Qual é a diferença entre intoxicação alimentar e infecção alimentar?", options:[
      "A intoxicação ocorre apenas em alimentos de origem vegetal, e a infecção ocorre exclusivamente em alimentos de origem animal em qualquer contexto da produção industrial de alimentos",
      "A intoxicação é causada exclusivamente por vírus, e a infecção é causada exclusivamente por fungos presentes no alimento ao longo de qualquer etapa do processo produtivo considerado",
      "A intoxicação é sempre mais grave e demorada do que a infecção, que sempre apresenta sintomas leves e rápidos independentemente do tipo de alimento ou processo envolvido",
      "A intoxicação é causada pela ingestão de toxinas já produzidas pelo microrganismo no alimento, enquanto a infecção é causada pela ingestão do próprio microrganismo vivo, que se multiplica dentro do organismo"
    ], correct:3, resolution:"Na intoxicação alimentar, o microrganismo já produziu toxinas no alimento antes mesmo de ser ingerido, e são essas toxinas que causam os sintomas; na infecção alimentar, o microrganismo vivo é ingerido e se multiplica dentro do trato digestivo da pessoa, causando a doença — os mecanismos e os tempos de manifestação dos sintomas costumam ser diferentes entre os dois casos." },
      { level:"dificilimo", question:"Por que um alimento pode estar microbiologicamente seguro em termos de contagem total de microrganismos e, ainda assim, representar risco grave à saúde do consumidor?", options:[
      "Porque a presença de mesmo uma pequena quantidade de um microrganismo altamente patogênico, ou de toxinas já formadas, pode causar doença grave, independentemente da contagem microbiana total estar dentro dos limites aceitáveis",
      "Porque, segundo essa ideia equivocada, a contagem total de microrganismos é sempre o único critério relevante para avaliar a segurança de um alimento em qualquer contexto da produção industrial de alimentos",
      "Porque, nessa interpretação incorreta, alimentos com baixa contagem microbiana nunca podem, em nenhuma hipótese, causar qualquer tipo de doença independentemente do tipo de alimento ou processo envolvido",
      "Porque, segundo essa hipótese equivocada, toxinas produzidas por microrganismos são sempre destruídas automaticamente durante o processamento do alimento ao longo de qualquer etapa do processo produtivo considerado"
    ], correct:0, resolution:"A contagem total de microrganismos é apenas um dos indicadores de segurança alimentar — um alimento pode ter poucos microrganismos no total, mas se entre eles estiver presente um patógeno altamente virulento (como certas cepas de E. coli) ou uma toxina termoestável já formada (que não é destruída nem pelo cozimento), o risco à saúde pode ser grave mesmo com contagem microbiana geral dentro dos padrões considerados aceitáveis." }
    ]
  },
  "alimentos__gestao-de-qualidade": {
    title: "Gestão de Qualidade na Indústria de Alimentos",
    emoji: "✅",
    intro: "Gestão de qualidade na indústria de alimentos é o conjunto de sistemas e práticas usados para garantir que os produtos atendam consistentemente aos padrões técnicos, sanitários e legais exigidos.",
    analogy: "Pense na gestão de qualidade como o processo de revisão de um texto antes da publicação: não basta escrever bem uma vez, é preciso ter etapas de revisão consistentes para garantir que cada nova edição mantenha o mesmo padrão de qualidade, sem depender apenas da atenção pontual de uma pessoa.",
    visual: {"type": "cycle", "steps": ["Planejar padrões", "Executar produção", "Verificar conformidade", "Agir e corrigir"]},
    exercises: [
      { level:"facil", question:"O que é gestão de qualidade em uma indústria de alimentos?", options:[
      "Um departamento responsável exclusivamente pela contratação de novos funcionários da fábrica",
      "Um processo aplicado unicamente ao transporte dos produtos já finalizados até o ponto de venda",
      "O conjunto de sistemas e práticas que garantem que os produtos atendam consistentemente aos padrões exigidos",
      "Um sistema usado apenas para calcular o valor dos impostos pagos pela indústria de alimentos"
    ], correct:2, resolution:"A gestão de qualidade envolve sistemas e práticas — planejamento, controle, verificação e ação corretiva — que garantem que os produtos atendam de forma consistente aos padrões técnicos e sanitários exigidos, e não se resume a contratação, impostos ou transporte." },
      { level:"medio", question:"Por que a padronização de processos é importante para a gestão de qualidade em uma fábrica de alimentos?", options:[
      "Porque reduz a variabilidade entre lotes de produção, garantindo que o consumidor receba um produto com qualidade consistente",
      "Porque a padronização, segundo essa hipótese equivocada, é exigida exclusivamente para produtos destinados à exportação internacional",
      "Porque a padronização, nessa interpretação incorreta, serve apenas para reduzir o número de funcionários contratados pela fábrica",
      "Porque a padronização, segundo essa ideia equivocada, elimina totalmente a necessidade de qualquer supervisão humana na produção"
    ], correct:0, resolution:"A padronização de processos — receitas, temperaturas, tempos de produção — reduz a variação entre lotes diferentes, garantindo que o consumidor receba um produto com sabor, textura e qualidade consistentes, independentemente de qual lote ou turno de produção originou aquele item." },
      { level:"dificil", question:"Qual é a diferença entre controle de qualidade e garantia de qualidade dentro de um sistema de gestão da qualidade?", options:[
      "O controle de qualidade foca em detectar e corrigir problemas em produtos já produzidos, enquanto a garantia de qualidade foca em prevenir problemas por meio de processos e padrões bem definidos desde o início",
      "O controle de qualidade nunca envolve nenhum tipo de teste laboratorial, e a garantia de qualidade depende inteiramente desses testes independentemente do tipo de alimento ou processo envolvido",
      "O controle de qualidade é aplicado apenas em fábricas pequenas, e a garantia de qualidade é aplicada exclusivamente em grandes multinacionais em qualquer contexto da produção industrial de alimentos",
      "O controle de qualidade é obrigatório por lei em qualquer situação, e a garantia de qualidade é sempre um processo totalmente opcional ao longo de qualquer etapa do processo produtivo considerado"
    ], correct:0, resolution:"O controle de qualidade atua de forma mais reativa, testando e inspecionando produtos já fabricados para detectar desvios; já a garantia de qualidade atua de forma mais preventiva, estruturando processos, padrões e treinamentos desde o início da produção para reduzir a chance de problemas ocorrerem — os dois enfoques se complementam dentro de um sistema de gestão de qualidade completo." },
      { level:"dificilimo", question:"Por que uma indústria de alimentos pode aprovar 100% dos testes de qualidade realizados em laboratório e, ainda assim, ter um sistema de gestão de qualidade considerado deficiente por um auditor externo?", options:[
      "Porque a gestão de qualidade avalia também a consistência dos processos, a documentação, a rastreabilidade e a capacidade de prevenir falhas futuras, não apenas o resultado pontual de testes já realizados",
      "Porque, nessa interpretação incorreta, auditores externos avaliam exclusivamente a aparência física das instalações da fábrica, e nada além disso em qualquer contexto da produção industrial de alimentos",
      "Porque, segundo essa ideia equivocada, testes de qualidade aprovados em laboratório nunca têm nenhuma relação real com o sistema de gestão da fábrica",
      "Porque, segundo essa hipótese equivocada, um sistema de gestão de qualidade só pode ser considerado deficiente se algum produto já causou dano ao consumidor"
    ], correct:0, resolution:"Testes de qualidade aprovados mostram que aquele lote específico atendeu aos padrões, mas um sistema de gestão de qualidade robusto avalia também se os processos são bem documentados, se há rastreabilidade completa, se falhas são registradas e corrigidas de forma sistemática, e se existe prevenção de riscos futuros — uma fábrica pode ter produtos aprovados pontualmente e, mesmo assim, apresentar fragilidades estruturais em como a qualidade é gerida ao longo do tempo." }
    ]
  },
  "alimentos__tecnologia-de-frutas-hortalicas-e-cereais": {
    title: "Tecnologia de Frutas, Hortaliças e Cereais",
    emoji: "🥕",
    intro: "Tecnologia de frutas, hortaliças e cereais estuda os processos de conservação e transformação desses alimentos vegetais — como secagem, enlatamento e moagem — para aumentar sua vida útil e criar novos produtos.",
    analogy: "Pense na tecnologia de conservação de vegetais como diferentes formas de 'congelar o tempo' de um alimento: secar, enlatar ou fermentar uma hortaliça são estratégias distintas para interromper ou retardar os processos naturais que fariam aquele alimento se deteriorar rapidamente.",
    visual: {"type": "labeled", "center": "Conservação Vegetal", "parts": ["Secagem/desidratação", "Enlatamento", "Congelamento", "Fermentação"]},
    exercises: [
      { level:"facil", question:"Qual é o principal objetivo da secagem (desidratação) de frutas e hortaliças?", options:[
      "Aumentar de forma artificial o peso total do produto antes de sua embalagem final",
      "Alterar exclusivamente a cor do alimento para fins decorativos e comerciais",
      "Adicionar açúcar em grande quantidade para melhorar apenas o sabor doce do produto",
      "Remover a água do alimento para reduzir a atividade microbiológica e aumentar sua vida útil"
    ], correct:3, resolution:"A secagem remove a água disponível do alimento, o que reduz a atividade microbiológica (já que microrganismos precisam de água para se desenvolver), aumentando significativamente a vida útil do produto sem depender de aditivos como açúcar." },
      { level:"medio", question:"Por que o branqueamento (pré-cozimento rápido) de hortaliças é uma etapa comum antes do congelamento?", options:[
      "Porque o branqueamento, nessa interpretação incorreta, elimina totalmente a necessidade de embalagem adequada do produto",
      "Porque o branqueamento, segundo essa hipótese equivocada, é exigido exclusivamente para hortaliças destinadas à exportação",
      "Porque inativa enzimas que causariam deterioração de cor, sabor e textura durante o armazenamento congelado",
      "Porque o branqueamento, segundo essa ideia equivocada, serve apenas para clarear artificialmente a cor natural da hortaliça"
    ], correct:2, resolution:"Muitas hortaliças contêm enzimas que continuam ativas mesmo sob congelamento, causando alterações indesejadas de cor, sabor e textura ao longo do tempo de armazenamento; o branqueamento (uma breve exposição a água quente ou vapor) inativa essas enzimas antes do congelamento, preservando melhor a qualidade do produto." },
      { level:"dificil", question:"Qual é a diferença tecnológica entre o enlatamento e o congelamento como métodos de conservação de vegetais?", options:[
      "O enlatamento nunca utiliza nenhum tipo de embalagem hermética, e o congelamento depende inteiramente dela para funcionar independentemente do tipo de alimento ou processo envolvido",
      "O enlatamento conserva o alimento por poucos dias, e o congelamento conserva o alimento por apenas algumas horas ao longo de qualquer etapa do processo produtivo considerado",
      "O enlatamento utiliza calor intenso para esterilizar o produto e a embalagem hermética para evitar recontaminação, enquanto o congelamento preserva o alimento reduzindo drasticamente a temperatura, sem necessariamente esterilizá-lo",
      "O enlatamento é aplicado exclusivamente a frutas de determinadas variedades, e o congelamento é aplicado apenas a hortaliças e cereais específicos, nunca a frutas em qualquer contexto da produção industrial de alimentos"
    ], correct:2, resolution:"O enlatamento aplica calor intenso o suficiente para destruir microrganismos e enzimas, associado a uma embalagem hermética que impede recontaminação, permitindo armazenamento à temperatura ambiente por longos períodos; o congelamento preserva o alimento reduzindo drasticamente a temperatura, o que retarda (mas não elimina totalmente) a atividade microbiológica e enzimática, exigindo manutenção contínua da cadeia de frio." },
      { level:"dificilimo", question:"Por que a escolha da variedade de uma fruta ou hortaliça destinada ao processamento industrial pode ser diferente da variedade escolhida para consumo in natura, mesmo sendo a mesma espécie?", options:[
      "Porque, nessa interpretação incorreta, o processamento industrial elimina totalmente qualquer diferença nutricional entre variedades diferentes de uma fruta independentemente do tipo de alimento ou processo envolvido",
      "Porque, segundo essa ideia equivocada, variedades destinadas ao processamento industrial nunca podem ser da mesma espécie botânica original em qualquer contexto da produção industrial de alimentos",
      "Porque características como resistência ao processamento térmico, teor de sólidos solúveis e estabilidade de textura durante o processo são mais relevantes para a indústria do que atributos valorizados no consumo fresco, como aparência e sabor imediato",
      "Porque, segundo essa hipótese equivocada, a escolha da variedade utilizada nunca influencia de forma real o resultado final do produto processado ao longo de qualquer etapa do processo produtivo considerado"
    ], correct:2, resolution:"Variedades destinadas ao processamento industrial costumam ser selecionadas por características técnicas relevantes ao processo — como maior resistência ao calor sem perder textura, teor adequado de sólidos solúveis para conservas e boa estabilidade durante o cozimento — enquanto variedades para consumo in natura priorizam atributos como aparência atrativa e sabor imediato ao ser consumida fresca, o que pode levar à escolha de cultivares diferentes mesmo dentro da mesma espécie." }
    ]
  },
  "alimentos__tecnologia-de-bebidas": {
    title: "Tecnologia de Bebidas",
    emoji: "🥤",
    intro: "Tecnologia de bebidas estuda os processos de produção de sucos, refrigerantes, cervejas e outras bebidas, envolvendo etapas como extração, fermentação, pasteurização e envase.",
    analogy: "Pense na produção de uma bebida fermentada, como a cerveja, como uma orquestra controlada de microrganismos: leveduras específicas são selecionadas e colocadas em condições ideais para 'tocar' exatamente a transformação química desejada — se as condições saem do controle, o resultado final muda completamente.",
    visual: {"type": "flow", "steps": ["Matéria-prima", "Extração/mosto", "Fermentação", "Envase e pasteurização"]},
    exercises: [
      { level:"facil", question:"O que é pasteurização, aplicada com frequência em bebidas como sucos e cervejas?", options:[
      "Um tratamento térmico que reduz microrganismos presentes na bebida, aumentando sua segurança e conservação",
      "Um método de coloração artificial aplicado apenas em bebidas destinadas à exportação",
      "Um processo utilizado exclusivamente para adicionar açúcar artificial à composição da bebida",
      "Uma etapa exigida apenas para bebidas alcoólicas, nunca aplicada a sucos e refrigerantes"
    ], correct:0, resolution:"A pasteurização é um tratamento térmico controlado que reduz a quantidade de microrganismos presentes na bebida, aumentando sua segurança microbiológica e prolongando sua conservação, sendo aplicada tanto a bebidas alcoólicas quanto a sucos e refrigerantes." },
      { level:"medio", question:"Por que a temperatura é um fator crítico durante a fermentação de uma bebida como a cerveja?", options:[
      "Porque a temperatura, segundo essa ideia equivocada, determina exclusivamente a cor final que a bebida terá depois de pronta",
      "Porque temperaturas fora da faixa ideal podem alterar o metabolismo das leveduras, mudando o sabor, o aroma e a qualidade final da bebida",
      "Porque a temperatura, segundo essa hipótese equivocada, é relevante apenas na etapa de envase, nunca durante a fermentação",
      "Porque a temperatura, nessa interpretação incorreta, não tem nenhuma relação real com o metabolismo dos microrganismos envolvidos"
    ], correct:1, resolution:"As leveduras responsáveis pela fermentação têm uma faixa de temperatura ideal para funcionar adequadamente; temperaturas muito altas ou muito baixas podem alterar seu metabolismo, produzindo compostos indesejados de sabor e aroma, ou até interromper a fermentação, comprometendo a qualidade final da bebida." },
      { level:"dificil", question:"Qual é a diferença entre suco integral e néctar de fruta do ponto de vista tecnológico e de composição?", options:[
      "O suco integral é sempre vendido apenas congelado, e o néctar é vendido exclusivamente em temperatura ambiente em qualquer contexto da produção industrial de alimentos",
      "O suco integral contém obrigatoriamente conservantes artificiais, e o néctar é sempre livre de qualquer tipo de aditivo ao longo de qualquer etapa do processo produtivo considerado",
      "O suco integral nunca passa por nenhum tipo de pasteurização, e o néctar depende inteiramente desse processo independentemente do tipo de alimento ou processo envolvido",
      "O suco integral é extraído diretamente da fruta sem adição de água ou açúcar, enquanto o néctar é uma bebida diluída com água, geralmente com adição de açúcar, contendo uma proporção menor de fruta"
    ], correct:3, resolution:"O suco integral é obtido diretamente da fruta, sem diluição em água nem adição de açúcar, mantendo a concentração original da polpa ou do líquido extraído; o néctar, por sua vez, é uma bebida à base de fruta diluída com água e, frequentemente, com açúcar adicionado, contendo uma proporção de fruta menor do que o suco integral." },
      { level:"dificilimo", question:"Por que duas garrafas do mesmo suco de fruta, produzidas no mesmo dia e lote, podem apresentar diferenças perceptíveis de sabor após alguns meses de armazenamento, mesmo estando dentro do prazo de validade?", options:[
      "Porque reações químicas lentas, como oxidação e degradação de compostos aromáticos, continuam ocorrendo gradualmente durante o armazenamento, mesmo em produtos processados e dentro da validade",
      "Porque, segundo essa ideia equivocada, o prazo de validade de um alimento garante que nenhuma alteração química ocorra durante todo esse período",
      "Porque, nessa interpretação incorreta, diferenças de sabor em garrafas do mesmo lote só podem ser causadas por erro de fabricação em qualquer contexto da produção industrial de alimentos",
      "Porque, segundo essa hipótese equivocada, sucos processados industrialmente nunca sofrem nenhum tipo de reação química após o envase independentemente do tipo de alimento ou processo envolvido"
    ], correct:0, resolution:"Mesmo dentro do prazo de validade, reações químicas mais lentas — como a oxidação de compostos aromáticos e pequenas alterações enzimáticas residuais — continuam ocorrendo gradualmente durante o armazenamento, o que pode gerar diferenças sutis de sabor e aroma ao longo do tempo, mesmo em produtos do mesmo lote de fabricação; o prazo de validade indica o período em que essas alterações permanecem dentro de limites aceitáveis, não a ausência total de mudança química." }
    ]
  },
  "alimentos__tecnologias-de-carnes": {
    title: "Tecnologias de Carnes",
    emoji: "🥩",
    intro: "Tecnologia de carnes estuda os processos de abate, conservação e processamento de produtos cárneos, como embutidos e defumados, garantindo segurança alimentar e qualidade do produto final.",
    analogy: "Pense no processamento de carnes como uma corrida contra o relógio biológico: a carne é um meio muito favorável para o crescimento de microrganismos, então cada técnica de conservação — resfriamento, cura, defumação — é uma forma diferente de 'ganhar tempo' antes que a deterioração se instale.",
    visual: {"type": "labeled", "center": "Conservação de Carnes", "parts": ["Resfriamento", "Cura (sal/nitrito)", "Defumação", "Embalagem a vácuo"]},
    exercises: [
      { level:"facil", question:"Qual é a finalidade do resfriamento imediato da carne após o abate?", options:[
      "Retardar o crescimento microbiológico e preservar a qualidade da carne",
      "Melhorar exclusivamente a coloração visual externa da peça de carne já embalada",
      "Reduzir o custo total de transporte da carne até os pontos de distribuição",
      "Aumentar artificialmente o peso final da carne antes de sua comercialização no mercado"
    ], correct:0, resolution:"O resfriamento rápido da carne após o abate tem como principal objetivo retardar o crescimento de microrganismos, que se multiplicam mais rapidamente em temperaturas elevadas, preservando assim a segurança e a qualidade do produto." },
      { level:"medio", question:"Qual é a função do nitrito de sódio, comumente usado no processo de cura de embutidos como o presunto?", options:[
      "O nitrito de sódio, segundo essa hipótese equivocada, não tem nenhuma relação real com a segurança microbiológica do alimento",
      "Inibir o crescimento de bactérias perigosas, como a Clostridium botulinum, além de contribuir para cor e sabor característicos",
      "O nitrito de sódio, segundo essa ideia equivocada, serve apenas para aumentar artificialmente o peso final do produto embutido",
      "O nitrito de sódio, nessa interpretação incorreta, é usado exclusivamente para conferir sabor doce aos produtos cárneos"
    ], correct:1, resolution:"O nitrito de sódio, usado em quantidades controladas no processo de cura, inibe o crescimento de bactérias perigosas como a Clostridium botulinum (causadora do botulismo), além de contribuir para a coloração rosada característica e para o sabor típico de produtos curados como presunto e salame." },
      { level:"dificil", question:"Qual é a diferença entre carne resfriada e carne congelada em termos de conservação tecnológica?", options:[
      "A carne resfriada é mantida em temperaturas próximas de 0°C sem congelar, com vida útil mais curta, enquanto a congelada é mantida bem abaixo de 0°C, o que interrompe quase totalmente a atividade microbiológica por muito mais tempo",
      "A carne resfriada é destinada exclusivamente à exportação, e a carne congelada é destinada apenas ao mercado interno ao longo de qualquer etapa do processo produtivo considerado",
      "A carne resfriada é sempre mais cara do que a carne congelada, independentemente da região, da época do ano ou das condições de mercado consideradas independentemente do tipo de alimento ou processo envolvido",
      "A carne resfriada nunca pode ser posteriormente congelada, e a carne congelada nunca pode ser resfriada em nenhuma etapa em qualquer contexto da produção industrial de alimentos"
    ], correct:0, resolution:"A carne resfriada é mantida em temperaturas baixas, próximas de 0°C, sem que a água presente nela congele, o que retarda (mas não interrompe totalmente) a atividade microbiológica, exigindo consumo em prazo relativamente curto; a carne congelada é mantida em temperaturas bem mais baixas, o que interrompe quase completamente essa atividade, permitindo armazenamento por períodos muito mais longos." },
      { level:"dificilimo", question:"Por que o processo de descongelamento incorreto de uma peça de carne pode representar um risco de segurança alimentar maior do que o próprio congelamento em si?", options:[
      "Porque um descongelamento lento ou em temperatura ambiente pode permitir que a superfície da carne fique em temperaturas favoráveis ao crescimento microbiano por um tempo prolongado, mesmo com o interior ainda congelado",
      "Porque, nessa interpretação incorreta, o descongelamento de uma carne nunca tem nenhuma relação real com o risco de contaminação microbiológica independentemente do tipo de alimento ou processo envolvido",
      "Porque, segundo essa hipótese equivocada, qualquer método de descongelamento produz exatamente o mesmo resultado de segurança alimentar ao longo de qualquer etapa do processo produtivo considerado",
      "Porque, segundo essa ideia equivocada, o próprio congelamento da carne sempre elimina completamente todos os microrganismos presentes nela em qualquer contexto da produção industrial de alimentos"
    ], correct:0, resolution:"O congelamento retarda, mas não elimina totalmente, os microrganismos presentes na carne; durante um descongelamento lento (especialmente em temperatura ambiente), a superfície externa da peça pode passar um bom tempo em temperaturas favoráveis ao crescimento microbiano, mesmo que o centro da peça ainda esteja congelado — por isso métodos recomendados de descongelamento (geladeira, água fria corrente ou micro-ondas) buscam minimizar esse tempo de exposição a temperaturas de risco." }
    ]
  },
  "alimentos__tecnologias-do-leite": {
    title: "Tecnologias do Leite",
    emoji: "🥛",
    intro: "Tecnologia do leite estuda os processos de conservação e transformação do leite em derivados como queijo, iogurte e manteiga, envolvendo etapas como pasteurização, fermentação e coagulação.",
    analogy: "Pense na transformação do leite em queijo como uma espécie de 'concentração controlada': o leite perde água e soro ao longo do processo, e o que sobra é uma versão mais densa e concentrada dos sólidos originais, com sabor e textura totalmente diferentes do produto de partida.",
    visual: {"type": "flow", "steps": ["Leite cru", "Pasteurização", "Fermentação/coagulação", "Queijo, iogurte ou manteiga"]},
    exercises: [
      { level:"facil", question:"Qual é a finalidade da pasteurização do leite?", options:[
      "Reduzir microrganismos presentes no leite através de calor controlado, aumentando sua segurança e conservação",
      "Adicionar artificialmente gordura extra à composição original do leite antes da venda",
      "Alterar exclusivamente a cor natural do leite para fins de identificação comercial",
      "Aumentar o volume total do leite através da adição de água durante o processo em qualquer contexto da produção industrial de alimentos"
    ], correct:0, resolution:"A pasteurização é um tratamento térmico controlado que reduz significativamente os microrganismos presentes no leite cru, aumentando sua segurança para consumo e prolongando sua conservação, sem alterar sua composição básica de forma artificial." },
      { level:"medio", question:"Por que a fermentação por bactérias lácticas é essencial na produção de iogurte?", options:[
      "Porque a fermentação, segundo essa ideia equivocada, serve apenas para adicionar cor artificial ao produto final",
      "Porque a fermentação, nessa interpretação incorreta, elimina completamente toda a proteína presente no leite original",
      "Porque a fermentação, segundo essa hipótese equivocada, é usada exclusivamente para aumentar o prazo de validade do leite",
      "Porque essas bactérias transformam a lactose em ácido láctico, o que espessa o leite e confere o sabor azedo característico do iogurte"
    ], correct:3, resolution:"As bactérias lácticas utilizadas na produção de iogurte fermentam a lactose (o açúcar do leite), transformando-a em ácido láctico; esse processo abaixa o pH do leite, faz com que as proteínas coagulem parcialmente (espessando o produto) e confere o sabor levemente azedo característico do iogurte." },
      { level:"dificil", question:"Qual é a diferença entre a coagulação do leite por ácido (usada em alguns queijos frescos) e por coagulante enzimático, como o coalho (usado em queijos maturados)?", options:[
      "A coagulação ácida rompe a estrutura da proteína pela redução do pH, gerando uma massa mais frágil e úmida, enquanto a coagulação enzimática forma uma rede proteica mais firme, ideal para queijos que passam por maturação",
      "A coagulação ácida ocorre sempre em temperaturas acima de 90°C, e a coagulação enzimática ocorre sempre em temperaturas negativas ao longo de qualquer etapa do processo produtivo considerado",
      "A coagulação ácida nunca produz nenhum tipo de queijo, apenas iogurte, e a coagulação enzimática produz apenas manteiga independentemente do tipo de alimento ou processo envolvido",
      "A coagulação ácida é usada apenas para leite de vaca, e a coagulação enzimática é usada exclusivamente para leite de cabra em qualquer contexto da produção industrial de alimentos"
    ], correct:0, resolution:"A coagulação ácida ocorre pela redução do pH do leite, o que desestabiliza as proteínas e forma uma massa geralmente mais frágil e úmida, comum em queijos frescos; a coagulação enzimática, usada com coalho, forma uma rede proteica mais firme e elástica, característica que favorece queijos que passarão por processos de maturação mais longos." },
      { level:"dificilimo", question:"Por que dois queijos produzidos com o mesmo tipo de leite e a mesma técnica de coagulação podem apresentar sabores muito diferentes após o período de maturação?", options:[
      "Porque, segundo essa hipótese equivocada, queijos produzidos com a mesma técnica sempre apresentam exatamente o mesmo sabor final ao longo de qualquer etapa do processo produtivo considerado",
      "Porque a maturação envolve reações bioquímicas complexas realizadas por microrganismos e enzimas, e pequenas variações de temperatura, umidade e tempo de maturação podem alterar significativamente o resultado final",
      "Porque, segundo essa ideia equivocada, o tipo de leite utilizado é sempre o único fator capaz de influenciar o sabor final do queijo em qualquer contexto da produção industrial de alimentos",
      "Porque, nessa interpretação incorreta, o processo de maturação do queijo nunca envolve nenhum tipo de reação química ou biológica real independentemente do tipo de alimento ou processo envolvido"
    ], correct:1, resolution:"Durante a maturação, microrganismos e enzimas continuam agindo sobre as proteínas e gorduras do queijo, produzindo compostos responsáveis pelo sabor e aroma característicos; pequenas diferenças nas condições de maturação — temperatura da câmara, umidade do ambiente, tempo total de cura — podem alterar significativamente a velocidade e o resultado dessas reações, explicando por que queijos produzidos de forma semelhante podem ter sabores finais bem distintos." }
    ]
  },
  "alimentos__analise-sensorial": {
    title: "Análise Sensorial de Alimentos",
    emoji: "👅",
    intro: "Análise sensorial é o método científico usado para avaliar as características de um alimento através dos sentidos humanos — sabor, aroma, textura, aparência — de forma padronizada e mensurável.",
    analogy: "Pense na análise sensorial como um teste cego em um show de talentos: os avaliadores não sabem qual marca ou produtor fez cada amostra, e seguem critérios objetivos e padronizados, evitando que preferências pessoais ou preconceitos sobre a marca influenciem o resultado da avaliação.",
    visual: {"type": "labeled", "center": "Atributos Sensoriais", "parts": ["Aparência", "Aroma", "Sabor", "Textura"]},
    exercises: [
      { level:"facil", question:"O que é análise sensorial de alimentos?", options:[
      "Um exame que analisa unicamente a validade impressa na embalagem do produto alimentício",
      "Um método científico e padronizado de avaliar características do alimento por meio dos sentidos humanos",
      "Um teste laboratorial que mede exclusivamente a composição química do alimento sem envolver pessoas",
      "Um processo que avalia apenas o preço final de venda do produto no mercado consumidor"
    ], correct:1, resolution:"A análise sensorial é um método científico que avalia características do alimento — como sabor, aroma, textura e aparência — utilizando os sentidos humanos de forma padronizada, diferente de uma análise química de laboratório, que mede a composição sem envolver a percepção humana." },
      { level:"medio", question:"Por que os testes sensoriais costumam ser realizados de forma 'cega' (sem que o avaliador saiba a marca do produto)?", options:[
      "Porque, nessa interpretação incorreta, avaliadores só conseguem identificar sabores corretamente quando não veem o produto",
      "Porque, segundo essa hipótese equivocada, o teste cego serve apenas para reduzir o custo total da análise sensorial",
      "Para evitar que a expectativa sobre a marca influencie a percepção real do avaliador sobre o sabor ou a qualidade do alimento",
      "Porque, segundo essa ideia equivocada, testes cegos são exigidos por lei apenas para produtos destinados à exportação"
    ], correct:2, resolution:"O teste cego busca eliminar o viés de expectativa: se o avaliador soubesse a marca do produto, sua opinião prévia sobre aquela marca poderia influenciar (positiva ou negativamente) sua percepção real do sabor, aroma ou textura, comprometendo a objetividade da avaliação." },
      { level:"dificil", question:"Qual é a diferença entre um teste sensorial afetivo (de aceitação) e um teste sensorial discriminativo (de diferença)?", options:[
      "O teste afetivo nunca envolve consumidores comuns, apenas especialistas treinados, e o discriminativo envolve apenas consumidores leigos",
      "O teste afetivo mede exclusivamente a composição química da amostra, e o discriminativo mede apenas sua aparência visual independentemente do tipo de alimento ou processo envolvido",
      "O teste afetivo é usado exclusivamente em bebidas, e o teste discriminativo é usado apenas em produtos sólidos como carnes em qualquer contexto da produção industrial de alimentos",
      "O teste afetivo mede se o consumidor gosta ou prefere o produto, enquanto o discriminativo verifica se existe diferença perceptível entre duas ou mais amostras, sem medir preferência"
    ], correct:3, resolution:"O teste afetivo busca entender a preferência ou aceitação do consumidor em relação a um produto (se ele gosta mais ou menos), enquanto o teste discriminativo busca apenas verificar se existe uma diferença perceptível entre amostras — por exemplo, entre uma formulação original e uma nova formulação — sem necessariamente indicar qual delas é preferida." },
      { level:"dificilimo", question:"Por que um painel de avaliadores treinados (analistas sensoriais) pode identificar diferenças entre duas amostras de um alimento que a maioria dos consumidores comuns não percebe conscientemente?", options:[
      "Porque, nessa interpretação incorreta, consumidores comuns nunca são capazes de perceber absolutamente nenhuma diferença entre produtos alimentícios independentemente do tipo de alimento ou processo envolvido",
      "Porque, segundo essa hipótese equivocada, o treinamento sensorial altera quimicamente a composição real do alimento sendo avaliado ao longo de qualquer etapa do processo produtivo considerado",
      "Porque, segundo essa ideia equivocada, avaliadores treinados possuem órgãos sensoriais fisicamente diferentes dos consumidores comuns em qualquer contexto da produção industrial de alimentos",
      "Porque o treinamento sensorial desenvolve maior sensibilidade e vocabulário específico para identificar e nomear atributos sutis, mesmo que esses atributos ainda influenciem inconscientemente a percepção geral dos consumidores comuns"
    ], correct:3, resolution:"O treinamento sensorial não muda a fisiologia do avaliador, mas desenvolve sua capacidade de perceber, isolar e nomear atributos específicos (como um leve amargor residual ou uma nota aromática sutil) que passam despercebidos conscientemente pela maioria dos consumidores comuns — embora esses mesmos atributos possam, ainda assim, influenciar de forma inconsciente a impressão geral que o consumidor tem do produto, mesmo sem conseguir descrevê-la com precisão." }
    ]
  },
  "alimentos__gestao-da-industria-e-operacoes-unitarias": {
    title: "Gestão da Indústria e Operações Unitárias",
    emoji: "🏗️",
    intro: "Operações unitárias são as etapas físicas básicas e repetíveis de um processo industrial de alimentos — como aquecimento, resfriamento, mistura e filtração — e a gestão da indústria organiza essas etapas de forma eficiente na linha de produção.",
    analogy: "Pense nas operações unitárias como os blocos de montar de um brinquedo de encaixe: independentemente do produto final (suco, queijo, biscoito), o processo é construído a partir de blocos básicos e repetíveis — misturar, aquecer, resfriar, filtrar — combinados de formas diferentes para cada tipo de produto.",
    visual: {"type": "labeled", "center": "Operações Unitárias", "parts": ["Aquecimento", "Resfriamento", "Mistura", "Filtração/separação"]},
    exercises: [
      { level:"facil", question:"O que são operações unitárias em um processo industrial de alimentos?", options:[
      "Documentos legais exigidos exclusivamente para o registro sanitário de um novo produto alimentício",
      "Etapas físicas básicas e repetíveis, como aquecimento e mistura, que compõem diferentes processos produtivos",
      "Contratos comerciais firmados unicamente entre a indústria e seus fornecedores de matéria-prima",
      "Cargos específicos da linha de produção responsáveis apenas pela limpeza final da fábrica"
    ], correct:1, resolution:"Operações unitárias são as etapas físicas básicas e repetíveis — como aquecimento, resfriamento, mistura e filtração — que, combinadas de diferentes formas, compõem os processos produtivos de praticamente qualquer indústria de alimentos, e não se referem a documentos, cargos ou contratos." },
      { level:"medio", question:"Por que entender as operações unitárias facilita o planejamento de um novo processo industrial de alimentos?", options:[
      "Porque, segundo essa ideia equivocada, cada novo produto alimentício exige a criação de operações completamente inéditas e nunca testadas antes",
      "Porque, segundo essa hipótese equivocada, o conceito de operações unitárias se aplica exclusivamente a produtos líquidos, nunca a sólidos",
      "Porque, nessa interpretação incorreta, as operações unitárias eliminam totalmente a necessidade de qualquer controle de qualidade no processo",
      "Porque permite reconhecer etapas conhecidas e testadas, mesmo em produtos diferentes, agilizando o projeto e a otimização do processo"
    ], correct:3, resolution:"Como muitas operações unitárias (aquecimento, mistura, filtração) se repetem em diferentes processos, um engenheiro ou técnico pode aproveitar conhecimento já testado e validado sobre cada etapa individual, mesmo ao projetar o processo de um produto totalmente novo, o que agiliza o desenvolvimento e reduz o risco de erros no projeto." },
      { level:"dificil", question:"Qual é a diferença entre uma operação de transferência de calor (como pasteurização) e uma operação de transferência de massa (como secagem) dentro das operações unitárias?", options:[
      "A transferência de calor nunca envolve nenhum tipo de equipamento industrial, e a transferência de massa depende inteiramente deles independentemente do tipo de alimento ou processo envolvido",
      "A transferência de calor sempre reduz a temperatura do alimento, e a transferência de massa sempre aumenta essa temperatura ao longo de qualquer etapa do processo produtivo considerado",
      "A transferência de calor é usada apenas em produtos líquidos, e a transferência de massa é usada exclusivamente em produtos sólidos em qualquer contexto da produção industrial de alimentos",
      "A transferência de calor envolve principalmente a troca de energia térmica entre o alimento e o meio, enquanto a transferência de massa envolve a movimentação de substâncias, como água, de dentro para fora do alimento"
    ], correct:3, resolution:"Na transferência de calor, como na pasteurização, o foco principal é a troca de energia térmica entre o alimento e o meio (aquecendo ou resfriando); na transferência de massa, como na secagem, o foco é a movimentação de uma substância — geralmente água — de dentro do alimento para o ambiente externo, embora frequentemente as duas transferências ocorram simultaneamente em um mesmo processo." },
      { level:"dificilimo", question:"Por que otimizar uma única operação unitária isoladamente (por exemplo, tornar o aquecimento mais rápido) nem sempre resulta em melhoria real do processo industrial como um todo?", options:[
      "Porque, segundo essa ideia equivocada, operações unitárias funcionam sempre de forma totalmente independente umas das outras dentro da fábrica em qualquer contexto da produção industrial de alimentos",
      "Porque, segundo essa hipótese equivocada, a velocidade de uma única operação nunca tem relação real com o desempenho geral da linha de produção ao longo de qualquer etapa do processo produtivo considerado",
      "Porque, nessa interpretação incorreta, otimizar qualquer etapa do processo sempre resulta automaticamente em piora do resultado final independentemente do tipo de alimento ou processo envolvido",
      "Porque as operações unitárias estão interligadas em uma linha de produção, e uma mudança em uma etapa pode gerar gargalos ou desequilíbrios nas etapas seguintes, mesmo que a etapa otimizada individualmente tenha melhorado"
    ], correct:3, resolution:"Um processo industrial funciona como uma sequência interligada de etapas; se uma operação (como o aquecimento) é acelerada sem que as etapas seguintes (como o resfriamento ou a embalagem) consigam acompanhar esse novo ritmo, cria-se um gargalo que pode até reduzir a eficiência geral da linha — por isso a gestão industrial avalia o processo como um sistema integrado, e não apenas etapa por etapa isoladamente." }
    ]
  },
  "alimentos__tratamento-e-valorizacao-de-residuos-e-biotecnologia": {
    title: "Tratamento e Valorização de Resíduos e Biotecnologia",
    emoji: "♻️",
    intro: "Tratamento e valorização de resíduos na indústria de alimentos buscam reduzir o impacto ambiental de subprodutos do processamento, enquanto a biotecnologia aplica organismos vivos ou seus componentes para criar novos produtos ou processos.",
    analogy: "Pense na valorização de resíduos como transformar 'lixo' de uma cozinha em ingrediente de outra receita: a casca da fruta que sobra da fabricação de suco pode virar farinha, ração animal ou adubo — o que antes era descarte se torna matéria-prima de um novo processo produtivo.",
    visual: {"type": "cycle", "steps": ["Resíduo do processamento", "Tratamento/triagem", "Novo produto ou uso", "Redução do impacto ambiental"]},
    exercises: [
      { level:"facil", question:"O que significa 'valorização de resíduos' na indústria de alimentos?", options:[
      "Descartar diretamente todo o resíduo industrial em aterros sanitários sem nenhum tipo de tratamento",
      "Aumentar artificialmente o preço de venda dos produtos alimentícios já prontos para o consumidor",
      "Transformar subprodutos e sobras do processamento em novos produtos com valor comercial ou ambiental",
      "Reduzir exclusivamente o volume total de produção da indústria de alimentos para diminuir custos"
    ], correct:2, resolution:"A valorização de resíduos consiste em transformar subprodutos e sobras — como cascas, bagaço e soro de leite — em novos produtos com valor comercial ou ambiental, como ração animal, adubo ou novos ingredientes, em vez de simplesmente descartar esse material." },
      { level:"medio", question:"Por que o soro de leite, antes considerado apenas um resíduo da fabricação de queijo, passou a ser valorizado pela indústria de alimentos?", options:[
      "Porque o soro de leite, segundo essa hipótese equivocada, não pode mais ser descartado de nenhuma forma pela legislação vigente",
      "Porque contém proteínas e nutrientes aproveitáveis, sendo hoje usado na produção de suplementos, bebidas e outros alimentos processados",
      "Porque o soro de leite, segundo essa ideia equivocada, deixou totalmente de ser considerado um resíduo do processo de fabricação",
      "Porque o soro de leite, nessa interpretação incorreta, é hoje o único ingrediente permitido na fabricação de queijos no Brasil"
    ], correct:1, resolution:"O soro de leite contém proteínas de alto valor biológico e outros nutrientes que antes eram simplesmente descartados; avanços tecnológicos permitiram aproveitar esse material na fabricação de suplementos proteicos, bebidas lácteas e outros produtos, transformando um antigo resíduo em matéria-prima valorizada pela indústria." },
      { level:"dificil", question:"Qual é a diferença entre o uso da biotecnologia para melhorar um processo de fermentação já existente e o uso da biotecnologia para criar um ingrediente totalmente novo?", options:[
      "A biotecnologia aplicada à fermentação nunca envolve nenhum tipo de microrganismo vivo, e a de novos ingredientes depende inteiramente deles independentemente do tipo de alimento ou processo envolvido",
      "A biotecnologia aplicada à fermentação é usada apenas em bebidas alcoólicas, e a de novos ingredientes é usada exclusivamente em laticínios ao longo de qualquer etapa do processo produtivo considerado",
      "A biotecnologia aplicada à fermentação é sempre proibida por lei, e a biotecnologia aplicada a novos ingredientes é sempre permitida sem restrições em qualquer contexto da produção industrial de alimentos",
      "No primeiro caso, a biotecnologia otimiza microrganismos ou enzimas já utilizados, tornando um processo tradicional mais eficiente; no segundo caso, ela é usada para desenvolver algo novo, que não existia anteriormente no mercado"
    ], correct:3, resolution:"Melhorar um processo de fermentação já existente envolve otimizar microrganismos ou enzimas conhecidas para tornar aquele processo tradicional mais eficiente ou consistente; criar um ingrediente totalmente novo envolve desenvolver, através de técnicas biotecnológicas, um produto que não existia anteriormente — os dois usos aplicam princípios biotecnológicos semelhantes, mas com objetivos e graus de inovação diferentes." },
      { level:"dificilimo", question:"Por que a valorização de resíduos agroindustriais é considerada uma estratégia tanto ambiental quanto econômica, e não apenas uma obrigação de conformidade ambiental?", options:[
      "Porque, segundo essa hipótese equivocada, o custo de tratamento de resíduos é sempre menor do que o custo de simplesmente descartá-los sem tratamento algum",
      "Porque, além de reduzir o impacto ambiental do descarte, transformar resíduos em novos produtos pode gerar receita adicional e reduzir custos de tratamento e disposição final para a indústria",
      "Porque, segundo essa ideia equivocada, a valorização de resíduos é exigida exclusivamente pela legislação ambiental, sem nenhum benefício econômico real",
      "Porque, nessa interpretação incorreta, resíduos agroindustriais nunca podem gerar nenhum tipo de produto com valor comercial de fato em qualquer contexto da produção industrial de alimentos"
    ], correct:1, resolution:"Além de reduzir o impacto ambiental — menos resíduo indo para aterros ou cursos d'água — a valorização de subprodutos pode gerar uma nova fonte de receita para a indústria (vendendo o que antes era descartado) e reduzir os custos associados ao tratamento e à disposição final desses resíduos, tornando-se uma estratégia que combina benefício ambiental com vantagem econômica direta para o negócio." }
    ]
  },
  "celulose-papel__tecnologia-da-madeira": {
    title: "Tecnologia da Madeira",
    emoji: "🌲",
    intro: "Tecnologia da madeira estuda a estrutura, composição e propriedades da madeira usada como matéria-prima para a produção de celulose e papel, incluindo espécies de eucalipto e pinus mais utilizadas na indústria brasileira.",
    analogy: "Pense na madeira como a matéria-prima de um suco: assim como frutas diferentes rendem sucos com características diferentes, espécies de árvores diferentes rendem fibras de celulose com comprimento, resistência e rendimento também diferentes, o que muda diretamente a qualidade do papel final.",
    visual: {"type": "compare", "leftTitle": "Eucalipto", "leftItems": ["Fibra curta", "Ciclo de corte rápido (6-7 anos)", "Papel mais liso e opaco"], "rightTitle": "Pinus", "rightItems": ["Fibra longa", "Ciclo de corte mais longo", "Papel mais resistente à tração"]},
    exercises: [
      { level:"facil", question:"Por que o eucalipto é amplamente utilizado na indústria brasileira de celulose e papel?", options:[
      "Porque tem crescimento rápido no clima brasileiro e produz fibra curta adequada para papéis de escrita e impressão",
      "Porque o eucalipto, segundo essa ideia equivocada, é a única espécie de árvore que existe naturalmente em todo o território brasileiro",
      "Porque o eucalipto, nessa interpretação incorreta, produz uma madeira que nunca pode ser utilizada para nenhuma outra finalidade além do papel",
      "Porque o eucalipto, segundo essa hipótese equivocada, é proibido por lei de ser utilizado para qualquer finalidade que não seja a celulose"
    ], correct:0, resolution:"O eucalipto se adaptou muito bem ao clima brasileiro, com ciclos de corte relativamente curtos (cerca de 6 a 7 anos), e sua fibra curta é adequada para produzir papéis lisos e opacos, como papéis de escrita e impressão, o que tornou a espécie amplamente cultivada pela indústria nacional." },
      { level:"medio", question:"Qual é a diferença prática entre madeira de fibra curta (como o eucalipto) e fibra longa (como o pinus) na produção de papel?", options:[
      "A fibra curta, segundo essa ideia equivocada, é usada exclusivamente para embalagens, e a fibra longa apenas para papel higiênico",
      "A fibra curta, segundo essa hipótese equivocada, produz sempre um papel mais resistente do que qualquer papel feito com fibra longa",
      "A fibra curta, nessa interpretação incorreta, nunca pode ser misturada com fibra longa em nenhum tipo de processo produtivo",
      "A fibra curta gera papéis mais lisos e com melhor formação de folha, enquanto a fibra longa gera papéis com maior resistência mecânica"
    ], correct:3, resolution:"Fibras curtas, como as do eucalipto, tendem a formar uma folha de papel mais lisa e uniforme, ideal para escrita e impressão; fibras longas, como as do pinus, conferem maior resistência mecânica ao papel, sendo usadas em produtos que exigem mais resistência, como embalagens e papéis kraft — muitas vezes as duas são combinadas para equilibrar propriedades." },
      { level:"dificil", question:"Por que a densidade da madeira é considerada uma propriedade tecnológica importante para a produção de celulose?", options:[
      "Porque madeiras mais densas geralmente rendem mais massa de fibra por volume, mas podem exigir mais energia e reagentes químicos no processo de cozimento",
      "Porque a densidade da madeira, segundo essa ideia equivocada, determina exclusivamente a cor final que o papel produzido terá",
      "Porque a densidade da madeira, nessa interpretação incorreta, não tem nenhuma relação real com o rendimento do processo de celulose",
      "Porque a densidade da madeira, segundo essa hipótese equivocada, é relevante apenas para a fabricação de móveis, nunca para papel"
    ], correct:0, resolution:"A densidade da madeira influencia diretamente o rendimento do processo produtivo: madeiras mais densas costumam conter mais massa de fibra por metro cúbico transportado, mas por outro lado podem exigir mais tempo, energia e reagentes químicos durante o cozimento para liberar adequadamente as fibras de celulose, sendo uma variável técnica relevante no planejamento industrial." },
      { level:"dificilimo", question:"Por que o manejo florestal com ciclos de corte planejados é considerado tecnicamente tão importante quanto a escolha da espécie de árvore para a indústria de celulose e papel?", options:[
      "Porque, segundo essa ideia equivocada, o ciclo de corte de uma floresta plantada nunca tem nenhuma relação real com a qualidade da fibra obtida em qualquer contexto da produção industrial de alimentos",
      "Porque colher a madeira antes ou depois do ponto ideal de maturação altera significativamente o rendimento de fibra e as propriedades físicas do papel produzido, mesmo utilizando a mesma espécie plantada",
      "Porque, segundo essa hipótese equivocada, o manejo florestal é exigido apenas por questões estéticas da paisagem, sem nenhum fundamento técnico real",
      "Porque, nessa interpretação incorreta, qualquer espécie de árvore pode ser colhida a qualquer momento sem gerar nenhuma diferença técnica no processo"
    ], correct:1, resolution:"Assim como frutas colhidas cedo ou tarde demais têm qualidade diferente, a madeira colhida fora do ponto ideal de maturação apresenta variações na proporção de fibra, na densidade e na composição química, afetando o rendimento do processo de celulose e as propriedades finais do papel — por isso o manejo florestal com ciclos de corte bem planejados é tão estratégico quanto a escolha inicial da espécie plantada." }
    ]
  },
  "celulose-papel__tecnologia-das-materias-primas-do-papel": {
    title: "Tecnologia das Matérias-Primas do Papel",
    emoji: "📦",
    intro: "A tecnologia das matérias-primas do papel estuda os diferentes insumos usados na fabricação — celulose virgem, papel reciclado (aparas) e aditivos — e como cada um influencia as propriedades do produto final.",
    analogy: "Pense na produção de papel como uma receita culinária: a celulose virgem é como um ingrediente fresco de alta qualidade, as aparas recicladas são como sobras reaproveitadas de uma refeição anterior, e os aditivos são os temperos — cada combinação diferente resulta em um 'prato' (tipo de papel) com características distintas.",
    visual: {"type": "pie", "slices": [{"label": "Celulose virgem", "value": 55}, {"label": "Aparas recicladas", "value": 35}, {"label": "Aditivos", "value": 10}]},
    exercises: [
      { level:"facil", question:"O que são aparas de papel, usadas como matéria-prima na indústria papeleira?", options:[
      "Papel já utilizado e descartado, coletado para ser reciclado e reintroduzido no processo produtivo",
      "Um aditivo químico artificial adicionado apenas para melhorar a cor final do papel produzido",
      "Um equipamento industrial usado especificamente para cortar folhas de papel já prontas",
      "Um tipo específico de madeira bruta utilizada exclusivamente na fabricação de celulose virgem"
    ], correct:0, resolution:"Aparas de papel são materiais de papel já utilizados — como jornais, caixas de papelão e aparas do próprio processo produtivo — que são coletados e reintroduzidos como matéria-prima reciclada na fabricação de novo papel, reduzindo a dependência de celulose virgem." },
      { level:"medio", question:"Por que o papel produzido com alta proporção de aparas recicladas costuma ter resistência mecânica menor do que o papel de celulose virgem?", options:[
      "Porque as aparas recicladas, segundo essa ideia equivocada, contêm sempre uma quantidade maior de água do que a celulose virgem",
      "Porque as aparas recicladas, nessa interpretação incorreta, são sempre mais pesadas do que a mesma quantidade de celulose virgem",
      "Porque as aparas recicladas, segundo essa hipótese equivocada, nunca passam por nenhum tipo de processo de limpeza antes do reuso",
      "Porque as fibras recicladas perdem parte de sua resistência estrutural a cada novo ciclo de reprocessamento, tornando-se mais curtas e frágeis"
    ], correct:3, resolution:"Cada vez que uma fibra de celulose passa pelo processo de reciclagem, ela sofre um desgaste mecânico que a torna progressivamente mais curta e menos flexível, reduzindo sua capacidade de formar ligações fortes com outras fibras — por isso papéis com alta proporção de fibra reciclada tendem a ter resistência mecânica menor do que os produzidos com celulose virgem." },
      { level:"dificil", question:"Qual é a função dos aditivos químicos, como cargas minerais e agentes de colagem, na produção de papel?", options:[
      "Os aditivos, nessa interpretação incorreta, são usados exclusivamente para aumentar artificialmente o peso final do papel vendido",
      "Os aditivos, segundo essa hipótese equivocada, são proibidos pela legislação brasileira em qualquer tipo de papel comercializado",
      "Melhorar propriedades específicas do papel, como opacidade, resistência à água ou capacidade de receber tinta, sem serem a principal fonte de fibra",
      "Os aditivos, segundo essa ideia equivocada, substituem completamente a necessidade de qualquer fibra de celulose no processo produtivo"
    ], correct:2, resolution:"Aditivos como cargas minerais (por exemplo, carbonato de cálcio) e agentes de colagem são incorporados em pequenas proporções para melhorar propriedades específicas do papel — como opacidade, brancura, resistência à passagem de água ou capacidade de receber tinta de impressão — sem serem a principal fonte estrutural de fibra, que continua sendo a celulose." },
      { level:"dificilimo", question:"Por que uma indústria de papel pode optar por misturar celulose virgem com fibra reciclada em vez de usar apenas uma das duas, mesmo que a celulose virgem tenha melhor qualidade estrutural?", options:[
      "Porque a combinação permite equilibrar custo de produção, disponibilidade de matéria-prima e sustentabilidade ambiental, mantendo propriedades aceitáveis para o tipo de papel desejado",
      "Porque, nessa interpretação incorreta, o uso exclusivo de celulose virgem é proibido por lei em qualquer fábrica de papel do país em qualquer contexto da produção industrial de alimentos",
      "Porque, segundo essa hipótese equivocada, a fibra reciclada sempre produz um papel de qualidade estrutural superior à celulose virgem",
      "Porque, segundo essa ideia equivocada, misturar os dois tipos de matéria-prima é uma exigência obrigatória prevista em toda legislação ambiental"
    ], correct:0, resolution:"Misturar celulose virgem com fibra reciclada permite à indústria equilibrar fatores como o custo mais baixo das aparas recicladas, a disponibilidade variável de cada matéria-prima ao longo do tempo e as metas de sustentabilidade ambiental, mantendo ao mesmo tempo propriedades técnicas aceitáveis para o tipo específico de papel que está sendo produzido — a proporção ideal varia conforme o uso final pretendido para o papel." }
    ]
  },
  "celulose-papel__tecnologia-da-fabricacao-de-celulose-secagem-e-branqueamento": {
    title: "Fabricação de Celulose, Secagem e Branqueamento",
    emoji: "⚗️",
    intro: "A fabricação de celulose envolve separar as fibras da madeira dos demais componentes (como a lignina) por meio de cozimento químico, seguida por etapas de secagem e branqueamento para obter a celulose clara usada na produção de papel.",
    analogy: "Pense no processo de fabricação de celulose como descascar e limpar um camarão: a madeira 'bruta' contém a fibra desejada (a parte comestível) misturada com outros componentes indesejados (a casca, no caso a lignina) — o cozimento químico é a etapa que 'descasca' a madeira, separando a fibra útil do restante.",
    visual: {"type": "flow", "steps": ["Cavacos de madeira", "Cozimento químico", "Lavagem e depuração", "Branqueamento e secagem"]},
    exercises: [
      { level:"facil", question:"Qual é o objetivo do cozimento químico da madeira no processo de fabricação de celulose?", options:[
      "Dissolver a lignina que envolve as fibras, separando-as para formar a polpa de celulose",
      "Aumentar artificialmente o tamanho físico dos cavacos de madeira antes de sua utilização",
      "Reduzir exclusivamente o teor de água presente nos cavacos de madeira colhidos",
      "Misturar diferentes espécies de madeira em uma proporção fixa antes da fabricação"
    ], correct:0, resolution:"O cozimento químico utiliza reagentes específicos, sob calor e pressão, para dissolver a lignina — substância que envolve e une as fibras de celulose na madeira — permitindo que as fibras se soltem e formem a polpa de celulose usada na fabricação de papel." },
      { level:"medio", question:"Por que o branqueamento é uma etapa importante na produção de celulose destinada a papéis de escrita e impressão?", options:[
      "Porque o branqueamento, segundo essa hipótese equivocada, é exigido exclusivamente para celulose destinada à exportação internacional",
      "Porque remove a lignina residual e outros compostos que dão coloração escura à celulose, resultando em um produto mais claro e adequado à impressão",
      "Porque o branqueamento, segundo essa ideia equivocada, serve apenas para aumentar o peso final da polpa de celulose produzida",
      "Porque o branqueamento, nessa interpretação incorreta, elimina totalmente a necessidade de qualquer etapa de secagem posterior"
    ], correct:1, resolution:"Mesmo após o cozimento, a celulose ainda contém resíduos de lignina e outros compostos que conferem coloração amarelada ou acastanhada; o branqueamento remove esses resíduos, resultando em uma celulose mais clara, adequada para produzir papéis brancos de escrita e impressão de alta qualidade visual." },
      { level:"dificil", question:"Qual é a diferença entre o processo de cozimento Kraft e um processo de polpação mecânica na obtenção de fibras de celulose?", options:[
      "O processo Kraft é usado exclusivamente para produzir papel higiênico, e a polpação mecânica é usada apenas para papelão ondulado em qualquer contexto da produção industrial de alimentos",
      "O processo Kraft produz sempre celulose mais escura do que a polpação mecânica, independentemente de qualquer etapa de branqueamento ao longo de qualquer etapa do processo produtivo considerado",
      "O processo Kraft nunca envolve nenhum tipo de reagente químico, e a polpação mecânica depende inteiramente de reagentes para funcionar independentemente do tipo de alimento ou processo envolvido",
      "O processo Kraft usa reagentes químicos para dissolver a lignina, produzindo fibras mais resistentes com menor rendimento, enquanto a polpação mecânica separa as fibras por atrito físico, com maior rendimento mas fibras mais fracas"
    ], correct:3, resolution:"O processo Kraft utiliza reagentes químicos (como hidróxido de sódio e sulfeto de sódio) para dissolver quimicamente a lignina, resultando em fibras mais resistentes, mas com menor rendimento (parte da madeira é dissolvida e perdida); a polpação mecânica separa as fibras por desgaste físico (atrito e moagem), aproveitando quase toda a madeira, mas produzindo fibras mais curtas e fracas, com lignina residual ainda presente." },
      { level:"dificilimo", question:"Por que o controle preciso da temperatura e do tempo de cozimento é considerado mais crítico para a qualidade final da celulose do que apenas a quantidade de reagente químico utilizado?", options:[
      "Porque tempo e temperatura excessivos podem degradar as próprias fibras de celulose, mesmo com a quantidade correta de reagente, reduzindo a resistência do produto final",
      "Porque, segundo essa hipótese equivocada, o tempo de cozimento pode ser reduzido a zero sem nenhum efeito sobre a separação da lignina",
      "Porque, nessa interpretação incorreta, apenas a quantidade de reagente químico utilizado determina totalmente a qualidade final da celulose",
      "Porque, segundo essa ideia equivocada, a temperatura e o tempo de cozimento nunca têm nenhuma relação real com a resistência final da fibra"
    ], correct:0, resolution:"Embora a quantidade de reagente seja importante para dissolver a lignina, um cozimento com temperatura ou tempo excessivos pode começar a degradar as próprias cadeias de celulose (não apenas a lignina), enfraquecendo as fibras mesmo que a quantidade de reagente esteja tecnicamente correta — por isso o controle conjunto e preciso de temperatura, tempo e concentração química é essencial para preservar a resistência da fibra final." }
    ]
  },
  "celulose-papel__tecnologia-da-fabricacao-do-papel-e-maquina-de-celulose": {
    title: "Fabricação do Papel e Máquina de Celulose",
    emoji: "🏭",
    intro: "A fabricação do papel envolve transformar a polpa de celulose diluída em água em uma folha contínua, através de etapas realizadas por grandes máquinas industriais — formação, prensagem e secagem.",
    analogy: "Pense na máquina de papel como uma esteira gigante que transforma uma 'sopa' líquida de fibras em uma folha sólida e contínua: a polpa entra bem diluída em água, e ao longo do percurso da máquina — tela, prensas, cilindros secadores — a água vai sendo removida gradualmente até restar apenas a folha de papel seca no final.",
    visual: {"type": "flow", "steps": ["Polpa diluída", "Formação na tela", "Prensagem", "Secagem"]},
    exercises: [
      { level:"facil", question:"Qual é a etapa inicial da máquina de papel, onde a folha começa a se formar?", options:[
      "O corte, no qual a folha já pronta é dividida em bobinas de tamanho comercial padronizado",
      "A calandragem, na qual a superfície da folha já seca recebe acabamento e brilho final",
      "A formação, na qual a polpa diluída em água é espalhada sobre uma tela que permite a drenagem inicial da água",
      "O enrolamento, no qual a folha finalizada é enrolada em grandes bobinas para transporte"
    ], correct:2, resolution:"A formação é a primeira grande etapa da máquina de papel: a polpa diluída em água é espalhada sobre uma tela em movimento, que permite que parte da água escoe por gravidade e sucção, começando a formar a estrutura inicial da folha, antes das etapas seguintes de prensagem e secagem." },
      { level:"medio", question:"Por que a etapa de prensagem é importante no processo de fabricação de papel, antes da secagem final?", options:[
      "Porque a prensagem, segundo essa hipótese equivocada, é usada exclusivamente para cortar a folha em tamanhos comerciais",
      "Porque remove mecanicamente boa parte da água ainda presente na folha, reduzindo o consumo de energia necessário na secagem térmica seguinte",
      "Porque a prensagem, segundo essa ideia equivocada, serve apenas para imprimir um padrão decorativo na superfície do papel",
      "Porque a prensagem, nessa interpretação incorreta, substitui totalmente a necessidade de qualquer etapa de secagem posterior"
    ], correct:1, resolution:"A prensagem utiliza rolos que comprimem mecanicamente a folha ainda úmida, removendo boa parte da água por pressão física — um método muito mais eficiente em termos de energia do que remover essa mesma água apenas por evaporação térmica na etapa seguinte de secagem, o que reduz o consumo total de energia do processo." },
      { level:"dificil", question:"Por que a velocidade da máquina de papel precisa ser cuidadosamente sincronizada com a taxa de drenagem de água na etapa de formação?", options:[
      "Porque a velocidade da máquina, segundo essa ideia equivocada, nunca tem nenhuma relação real com a qualidade final da folha produzida",
      "Porque a velocidade da máquina, segundo essa hipótese equivocada, deve ser sempre a mais alta tecnicamente possível, independentemente de qualquer outro fator",
      "Porque uma velocidade muito alta em relação à drenagem pode comprometer a formação uniforme da folha, gerando defeitos de qualidade como variação de espessura",
      "Porque a velocidade da máquina, nessa interpretação incorreta, é definida exclusivamente pelo tipo de embalagem usada no produto final"
    ], correct:2, resolution:"Se a máquina avança rápido demais em relação à capacidade de a água drenar pela tela, a fibra não tem tempo suficiente para se distribuir uniformemente antes de ser fixada na estrutura da folha, resultando em defeitos como variação de espessura ou formação irregular — por isso velocidade e drenagem precisam estar tecnicamente equilibradas." },
      { level:"dificilimo", question:"Por que um pequeno ajuste na quantidade de água retida na folha ao final da prensagem pode ter impacto desproporcional no consumo energético total da fábrica de papel?", options:[
      "Porque, nessa interpretação incorreta, a etapa de secagem térmica é a que menos consome energia dentro de todo o processo de fabricação independentemente do tipo de alimento ou processo envolvido",
      "Porque, segundo essa ideia equivocada, a quantidade de água na folha após a prensagem nunca tem nenhuma relação real com o consumo de energia em qualquer contexto da produção industrial de alimentos",
      "Porque a secagem térmica que remove a água remanescente é a etapa que mais consome energia do processo, então mesmo pequenas reduções na umidade após a prensagem geram economia significativa na etapa seguinte",
      "Porque, segundo essa hipótese equivocada, o consumo energético total da fábrica depende exclusivamente da etapa inicial de formação da folha ao longo de qualquer etapa do processo produtivo considerado"
    ], correct:2, resolution:"A secagem térmica — que remove por evaporação a água que a prensagem mecânica não conseguiu retirar — é tipicamente a etapa que mais consome energia em toda a fabricação do papel; por isso, uma pequena melhoria na eficiência da prensagem, que reduza mesmo poucos pontos percentuais de umidade antes da secagem, pode representar uma economia energética desproporcionalmente maior no processo total, já que evita evaporar quantidades adicionais de água na etapa mais custosa energeticamente." }
    ]
  },
  "celulose-papel__nocoes-sobre-fabricacao-de-papel-e-propriedades-fisico-mecanicas": {
    title: "Propriedades Físico-Mecânicas do Papel",
    emoji: "📐",
    intro: "As propriedades físico-mecânicas do papel — como resistência à tração, gramatura e opacidade — determinam sua adequação para diferentes usos, desde embalagens resistentes até papéis finos de impressão.",
    analogy: "Pense nas propriedades físico-mecânicas do papel como as especificações técnicas de um tecido: assim como um tecido para roupa de praia precisa de propriedades diferentes de um tecido para terno, um papel de embalagem precisa de resistência muito maior do que um papel fino de impressão — cada uso exige uma combinação diferente de características.",
    visual: {"type": "labeled", "center": "Propriedades do Papel", "parts": ["Gramatura", "Resistência à tração", "Opacidade", "Porosidade"]},
    exercises: [
      { level:"facil", question:"O que é gramatura de um papel?", options:[
      "A cor predominante observada na superfície final da folha de papel produzida",
      "O peso do papel medido em gramas por metro quadrado, indicando sua espessura e robustez relativa",
      "A quantidade exata de fibras recicladas presentes na composição do papel produzido",
      "O tempo total gasto no processo de secagem daquela folha específica de papel"
    ], correct:1, resolution:"A gramatura é a medida de peso do papel por unidade de área, expressa em gramas por metro quadrado (g/m²); ela indica de forma prática a espessura e a robustez relativa do papel — papéis de escrita costumam ter gramatura menor do que cartões e embalagens." },
      { level:"medio", question:"Por que a resistência à tração é uma propriedade especialmente importante para papéis destinados a sacos e embalagens?", options:[
      "Porque a resistência à tração, segundo essa ideia equivocada, determina exclusivamente a cor final que o papel de embalagem terá",
      "Porque esses papéis precisam suportar esforços de puxar e carregar peso sem rasgar durante o transporte e manuseio",
      "Porque a resistência à tração, segundo essa hipótese equivocada, não tem nenhuma relação real com a capacidade de suportar peso",
      "Porque a resistência à tração, nessa interpretação incorreta, é relevante apenas para papéis de escrita, nunca para embalagens"
    ], correct:1, resolution:"Papéis usados em sacos e embalagens são submetidos a esforços de tração — sendo puxados, carregados e manuseados com peso dentro — por isso precisam de alta resistência à tração para não rasgar durante o transporte e uso, uma exigência técnica bem diferente da de um papel de escrita comum." },
      { level:"dificil", question:"Qual é a relação entre a orientação das fibras na folha (sentido de máquina) e a resistência mecânica do papel em diferentes direções?", options:[
      "A orientação das fibras, segundo essa ideia equivocada, nunca gera nenhuma diferença de resistência entre as direções da folha",
      "A orientação das fibras, nessa interpretação incorreta, afeta exclusivamente a cor da folha, sem nenhuma relação com resistência",
      "A orientação das fibras, segundo essa hipótese equivocada, é sempre idêntica em qualquer direção, independentemente do processo produtivo",
      "O papel tende a apresentar maior resistência à tração no sentido em que as fibras estão predominantemente alinhadas (sentido de máquina) do que no sentido perpendicular"
    ], correct:3, resolution:"Durante a formação na máquina de papel, as fibras tendem a se alinhar predominantemente no sentido do movimento da máquina, o chamado 'sentido de máquina'; isso gera uma anisotropia nas propriedades do papel, fazendo com que a resistência à tração seja geralmente maior nesse sentido do que no sentido perpendicular (sentido transversal), uma característica técnica relevante para o design de embalagens e produtos." },
      { level:"dificilimo", question:"Por que dois papéis com a mesma gramatura podem apresentar propriedades mecânicas e de impressão bem diferentes entre si?", options:[
      "Porque a gramatura mede apenas o peso por área, mas fatores como tipo de fibra, grau de refino, aditivos e processo de formação também influenciam decisivamente as propriedades finais do papel",
      "Porque, nessa interpretação incorreta, papéis com a mesma gramatura são sempre idênticos em absolutamente todas as suas outras propriedades",
      "Porque, segundo essa ideia equivocada, a gramatura de um papel é sempre a única propriedade tecnicamente relevante para qualquer aplicação em qualquer contexto da produção industrial de alimentos",
      "Porque, segundo essa hipótese equivocada, o tipo de fibra utilizado nunca tem nenhuma influência real sobre as propriedades finais do papel"
    ], correct:0, resolution:"A gramatura indica apenas o peso do papel por unidade de área, mas não descreve como esse peso está distribuído estruturalmente; fatores como o tipo de fibra usada, o grau de refino aplicado, os aditivos incorporados e as condições do processo de formação afetam de forma decisiva propriedades como resistência, opacidade e capacidade de absorção de tinta — por isso dois papéis de mesma gramatura podem se comportar de maneiras bem diferentes na prática." }
    ]
  },
  "celulose-papel__ciclo-de-recuperacao-quimica-e-utilidades": {
    title: "Ciclo de Recuperação Química e Utilidades",
    emoji: "🔄",
    intro: "O ciclo de recuperação química recupera e reutiliza os reagentes usados no cozimento da madeira, enquanto o setor de utilidades fornece insumos essenciais como vapor, energia e água tratada para todo o processo produtivo.",
    analogy: "Pense no ciclo de recuperação química como o sistema de reciclagem de água de uma piscina: em vez de descartar toda a água usada e comprar água nova o tempo todo, um sistema de filtragem trata e devolve a mesma água ao ciclo — a indústria de celulose faz algo semelhante com os reagentes químicos do cozimento, recuperando-os para reutilização, o que reduz custo e impacto ambiental.",
    visual: {"type": "cycle", "steps": ["Licor usado no cozimento", "Queima na caldeira de recuperação", "Regeneração dos reagentes", "Reagentes reutilizados no cozimento"]},
    exercises: [
      { level:"facil", question:"Qual é o objetivo principal do ciclo de recuperação química em uma fábrica de celulose?", options:[
      "Reduzir apenas o tempo total gasto na etapa de secagem da celulose já produzida em qualquer contexto da produção industrial de alimentos",
      "Aumentar exclusivamente a temperatura da água utilizada em todas as etapas do processo produtivo",
      "Recuperar e reutilizar os reagentes químicos usados no cozimento da madeira, reduzindo custo e impacto ambiental",
      "Eliminar totalmente a necessidade de qualquer tipo de tratamento de efluentes da fábrica"
    ], correct:2, resolution:"O ciclo de recuperação química existe para recuperar os reagentes utilizados no cozimento da madeira — que de outra forma seriam descartados —, reduzindo tanto o custo de compra de novos reagentes quanto o impacto ambiental do descarte desses compostos químicos." },
      { level:"medio", question:"Por que a caldeira de recuperação é considerada uma das partes mais estratégicas de uma fábrica de celulose?", options:[
      "Porque a caldeira de recuperação, segundo essa hipótese equivocada, tem como única função aquecer o ambiente interno da fábrica",
      "Porque ela queima o licor residual do cozimento, gerando energia (vapor) e ao mesmo tempo regenerando os reagentes químicos que serão reutilizados",
      "Porque a caldeira de recuperação, segundo essa ideia equivocada, serve apenas para incinerar o lixo comum gerado pela fábrica",
      "Porque a caldeira de recuperação, nessa interpretação incorreta, é usada exclusivamente para aquecer a água potável dos funcionários"
    ], correct:1, resolution:"A caldeira de recuperação cumpre uma dupla função estratégica: queima o licor residual do cozimento (rico em matéria orgânica), gerando energia na forma de vapor que é aproveitada no processo, e ao mesmo tempo permite a recuperação dos compostos químicos inorgânicos que serão regenerados e reutilizados no cozimento seguinte." },
      { level:"dificil", question:"Qual é a relação entre o setor de utilidades (vapor, energia elétrica, água tratada) e a eficiência global de uma fábrica de celulose e papel?", options:[
      "O fornecimento estável e eficiente dessas utilidades é essencial para manter todas as demais etapas do processo funcionando de forma contínua e dentro dos parâmetros técnicos exigidos",
      "O setor de utilidades, nessa interpretação incorreta, é responsável exclusivamente pela venda dos produtos finais da fábrica em qualquer contexto da produção industrial de alimentos",
      "O setor de utilidades, segundo essa hipótese equivocada, é totalmente independente do restante do processo produtivo da fábrica independentemente do tipo de alimento ou processo envolvido",
      "O setor de utilidades, segundo essa ideia equivocada, tem função apenas administrativa, sem nenhuma relação real com a produção industrial"
    ], correct:0, resolution:"Vapor, energia elétrica e água tratada são insumos essenciais consumidos continuamente por praticamente todas as etapas do processo — do cozimento à secagem — então qualquer instabilidade no fornecimento dessas utilidades pode comprometer o funcionamento contínuo e a qualidade de todo o processo produtivo, tornando o setor de utilidades tecnicamente estratégico, e não apenas um serviço de apoio administrativo." },
      { level:"dificilimo", question:"Por que uma fábrica de celulose moderna pode se tornar autossuficiente em energia elétrica e até exportar excedente para a rede, mesmo sendo um processo industrial intensivo em consumo energético?", options:[
      "Porque, segundo essa ideia equivocada, fábricas de celulose nunca consomem, em nenhuma hipótese, qualquer quantidade real de energia elétrica em qualquer contexto da produção industrial de alimentos",
      "Porque, nessa interpretação incorreta, a autossuficiência energética depende exclusivamente da instalação de painéis solares na cobertura da fábrica independentemente do tipo de alimento ou processo envolvido",
      "Porque, segundo essa hipótese equivocada, o excedente de energia exportado é sempre gerado por uma fonte totalmente externa ao processo produtivo ao longo de qualquer etapa do processo produtivo considerado",
      "Porque a queima do licor residual na caldeira de recuperação gera vapor em quantidade suficiente para movimentar turbinas geradoras, produzindo energia elétrica a partir de um subproduto do próprio processo"
    ], correct:3, resolution:"A queima do licor residual na caldeira de recuperação — um subproduto que seria descartado se não fosse reaproveitado — gera grande quantidade de vapor, que pode movimentar turbinas geradoras de energia elétrica; esse aproveitamento energético do próprio processo é o que permite a muitas fábricas modernas de celulose não apenas suprir seu próprio consumo, mas também exportar energia excedente para a rede elétrica, algo pouco comum em outros setores industriais intensivos em energia." }
    ]
  },
  "celulose-papel__quimica-aplicada-a-industria-de-celulose-e-papel": {
    title: "Química Aplicada à Indústria de Celulose e Papel",
    emoji: "🧫",
    intro: "A química aplicada à indústria de celulose e papel estuda os reagentes, reações e controles analíticos envolvidos no processo produtivo, desde o cozimento da madeira até o branqueamento e tratamento de efluentes.",
    analogy: "Pense na química aplicada como o painel de controle de um laboratório em escala industrial: cada reagente dosado incorretamente pode comprometer o resultado de toneladas de produto, então entender as reações químicas com precisão é o que permite prever e controlar o resultado antes que ele aconteça em grande escala.",
    visual: {"type": "labeled", "center": "Química do Processo", "parts": ["Reagentes de cozimento", "Agentes de branqueamento", "Controle de pH", "Tratamento de efluentes"]},
    exercises: [
      { level:"facil", question:"Por que o controle de pH é importante em diversas etapas do processo de celulose e papel?", options:[
      "Porque muitas reações químicas do processo, como o cozimento e o branqueamento, dependem de uma faixa específica de pH para funcionar corretamente",
      "Porque o controle de pH, segundo essa hipótese equivocada, não tem nenhuma relação real com as reações químicas do processo",
      "Porque o controle de pH, nessa interpretação incorreta, é relevante apenas na etapa final de venda do papel produzido",
      "Porque o controle de pH, segundo essa ideia equivocada, serve apenas para determinar a cor final da embalagem do produto vendido"
    ], correct:0, resolution:"Diversas reações químicas do processo produtivo — como o cozimento alcalino da madeira e certas etapas de branqueamento — dependem de uma faixa específica de pH para ocorrer de forma eficiente; um pH fora dessa faixa pode reduzir a eficácia da reação ou até prejudicar a qualidade da fibra." },
      { level:"medio", question:"Por que agentes de branqueamento à base de cloro têm sido progressivamente substituídos por alternativas como o dióxido de cloro ou o oxigênio na indústria de celulose?", options:[
      "Porque o cloro, segundo essa ideia equivocada, nunca conseguiu efetivamente branquear a celulose em nenhuma condição de processo",
      "Porque compostos organoclorados gerados no branqueamento com cloro podem ser prejudiciais ao meio ambiente, levando a indústria a adotar processos com menor impacto ambiental",
      "Porque o cloro, segundo essa hipótese equivocada, é um reagente atualmente mais caro do que qualquer alternativa disponível no mercado",
      "Porque o cloro, nessa interpretação incorreta, é hoje proibido em qualquer aplicação industrial em todo o território brasileiro"
    ], correct:1, resolution:"O branqueamento tradicional com cloro elementar podia gerar compostos organoclorados no efluente, associados a impactos ambientais negativos; por isso a indústria passou a adotar processos alternativos, como o branqueamento com dióxido de cloro (ECF) ou totalmente livre de cloro (TCF), reduzindo a geração desses compostos e o impacto ambiental do processo." },
      { level:"dificil", question:"Qual é a diferença química fundamental entre um processo de branqueamento oxidativo e um processo de branqueamento redutivo aplicado à celulose?", options:[
      "O branqueamento oxidativo remove a coloração ao oxidar e degradar compostos cromóforos, geralmente de forma mais permanente, enquanto o redutivo apenas altera temporariamente a estrutura desses compostos, sem removê-los completamente",
      "O branqueamento oxidativo é usado apenas em fábricas de pequeno porte, e o redutivo é usado exclusivamente em grandes indústrias multinacionais em qualquer contexto da produção industrial de alimentos",
      "O branqueamento oxidativo nunca envolve nenhum tipo de reagente químico, e o redutivo depende inteiramente de reagentes para funcionar independentemente do tipo de alimento ou processo envolvido",
      "O branqueamento oxidativo sempre reduz o rendimento da celulose a zero, e o redutivo sempre mantém exatamente cem por cento do rendimento ao longo de qualquer etapa do processo produtivo considerado"
    ], correct:0, resolution:"No branqueamento oxidativo, reagentes como o dióxido de cloro ou o peróxido de hidrogênio oxidam e degradam quimicamente os compostos que causam a coloração escura (cromóforos), geralmente com efeito mais duradouro; no branqueamento redutivo, reagentes como o hidrossulfito alteram temporariamente a estrutura eletrônica desses compostos sem removê-los completamente, podendo resultar em um efeito de branqueamento menos estável ao longo do tempo." },
      { level:"dificilimo", question:"Por que o monitoramento contínuo da composição química do efluente de uma fábrica de celulose é tão importante quanto o controle químico do próprio processo produtivo?", options:[
      "Porque, nessa interpretação incorreta, o monitoramento do efluente serve apenas para fins burocráticos, sem nenhuma utilidade técnica real independentemente do tipo de alimento ou processo envolvido",
      "Porque, segundo essa ideia equivocada, o efluente de uma fábrica de celulose nunca tem nenhuma relação química real com o processo produtivo interno em qualquer contexto da produção industrial de alimentos",
      "Porque reações químicas incompletas ou reagentes em excesso no processo se refletem diretamente na composição do efluente, tornando seu monitoramento um indicador indireto da eficiência e da conformidade ambiental de todo o processo",
      "Porque, segundo essa hipótese equivocada, a composição do efluente é sempre idêntica independentemente de qualquer variação no processo produtivo ao longo de qualquer etapa do processo produtivo considerado"
    ], correct:2, resolution:"A composição química do efluente reflete diretamente o que aconteceu — ou deixou de acontecer — dentro do processo produtivo: reagentes usados em excesso, reações incompletas ou desvios de parâmetros técnicos tendem a aparecer no efluente final; por isso seu monitoramento contínuo funciona não apenas como controle ambiental, mas também como um indicador indireto valioso da própria eficiência química do processo industrial." }
    ]
  },
  "celulose-papel__instrumentacao-sistemas-eletricos-e-controle-de-processos": {
    title: "Instrumentação, Sistemas Elétricos e Controle de Processos",
    emoji: "🎛️",
    intro: "Instrumentação e controle de processos envolvem sensores, atuadores e sistemas automatizados que monitoram e ajustam continuamente variáveis como temperatura, pressão e vazão ao longo de toda a fábrica de celulose e papel.",
    analogy: "Pense na instrumentação de uma fábrica como o painel de instrumentos de um avião: o piloto não consegue enxergar diretamente a pressão do combustível ou a temperatura do motor, mas confia nos sensores e mostradores para tomar decisões seguras — da mesma forma, o operador de uma fábrica depende de sensores para monitorar variáveis que não pode observar diretamente.",
    visual: {"type": "labeled", "center": "Controle de Processo", "parts": ["Sensor de temperatura", "Sensor de pressão", "Válvula automatizada", "Painel de controle"]},
    exercises: [
      { level:"facil", question:"Qual é a função de um sensor de temperatura em um processo industrial de celulose e papel?", options:[
      "Determinar exclusivamente o preço final de venda do produto processado pela fábrica em qualquer contexto da produção industrial de alimentos",
      "Registrar unicamente o volume total de água consumido durante toda a produção diária independentemente do tipo de alimento ou processo envolvido",
      "Medir continuamente a temperatura de uma etapa do processo, permitindo monitoramento e ajustes automáticos ou manuais",
      "Substituir totalmente a necessidade de qualquer operador humano supervisionando o processo"
    ], correct:2, resolution:"O sensor de temperatura mede continuamente essa variável em pontos estratégicos do processo (como no cozimento ou na secagem), enviando essa informação para o sistema de controle, que pode então acionar ajustes automáticos ou alertar o operador, quando necessário." },
      { level:"medio", question:"Por que a automação de válvulas é importante para o controle de processos em uma fábrica de celulose e papel?", options:[
      "Porque permite ajustes rápidos e precisos de vazão ou pressão em resposta a variações do processo, mais rápido do que uma intervenção manual",
      "Porque a automação de válvulas, nessa interpretação incorreta, serve apenas para reduzir o número de funcionários contratados pela fábrica",
      "Porque a automação de válvulas, segundo essa ideia equivocada, elimina totalmente a necessidade de qualquer manutenção do equipamento",
      "Porque a automação de válvulas, segundo essa hipótese equivocada, é exigida exclusivamente para processos destinados à exportação"
    ], correct:0, resolution:"Válvulas automatizadas, controladas pelo sistema de instrumentação, conseguem responder a variações do processo (como uma queda de pressão) de forma muito mais rápida e precisa do que uma intervenção manual, ajudando a manter as variáveis do processo dentro dos parâmetros técnicos desejados de forma contínua." },
      { level:"dificil", question:"Qual é a diferença entre um sistema de controle em malha aberta e um sistema de controle em malha fechada aplicado a um processo industrial?", options:[
      "Na malha fechada, o sistema usa a leitura de um sensor para ajustar continuamente sua ação, enquanto na malha aberta a ação é executada sem considerar o resultado real medido posteriormente",
      "O controle em malha aberta é usado apenas em processos manuais, e o controle em malha fechada é usado exclusivamente em processos totalmente robotizados",
      "O controle em malha aberta nunca envolve nenhum tipo de atuador, e o controle em malha fechada depende inteiramente de atuadores para funcionar",
      "O controle em malha aberta é sempre mais preciso do que o controle em malha fechada, independentemente do tipo de processo envolvido em qualquer contexto da produção industrial de alimentos"
    ], correct:0, resolution:"Em um sistema de malha fechada, a leitura de um sensor é constantemente comparada com o valor desejado, e o sistema ajusta sua ação automaticamente com base nessa diferença (retroalimentação); em um sistema de malha aberta, a ação de controle é executada sem considerar o resultado medido posteriormente, o que geralmente resulta em menor precisão diante de variações imprevistas do processo." },
      { level:"dificilimo", question:"Por que a calibração periódica dos sensores de um sistema de controle de processo é tão importante quanto a qualidade dos algoritmos de controle utilizados?", options:[
      "Porque, segundo essa hipótese equivocada, sensores descalibrados afetam apenas a aparência visual dos painéis de controle da fábrica ao longo de qualquer etapa do processo produtivo considerado",
      "Porque mesmo um algoritmo de controle bem projetado toma decisões erradas se estiver recebendo leituras imprecisas de um sensor descalibrado, comprometendo todo o processo mesmo sem nenhuma falha na lógica de controle",
      "Porque, segundo essa ideia equivocada, a calibração de sensores nunca tem nenhuma relação real com a qualidade das decisões tomadas pelo sistema em qualquer contexto da produção industrial de alimentos",
      "Porque, nessa interpretação incorreta, algoritmos de controle bem projetados são sempre capazes de corrigir sozinhos qualquer erro de leitura de um sensor independentemente do tipo de alimento ou processo envolvido"
    ], correct:1, resolution:"Um sistema de controle automatizado toma decisões com base nas leituras que recebe dos sensores; se um sensor estiver descalibrado, fornecendo valores imprecisos, o algoritmo de controle — por mais bem projetado que seja — vai basear suas decisões em informações erradas, podendo levar o processo para fora dos parâmetros ideais mesmo sem nenhuma falha na lógica do próprio sistema de controle, o que torna a calibração periódica dos sensores tão crítica quanto o software de controle." }
    ]
  },
  "celulose-papel__interpretacao-de-desenhos-plantas-e-fluxogramas-de-processos": {
    title: "Interpretação de Desenhos, Plantas e Fluxogramas de Processos",
    emoji: "🗺️",
    intro: "Interpretar desenhos técnicos, plantas industriais e fluxogramas de processo é essencial para entender como equipamentos, tubulações e etapas produtivas se conectam dentro de uma fábrica de celulose e papel.",
    analogy: "Pense em um fluxograma de processo como o mapa de uma linha de metrô: assim como o mapa mostra como diferentes estações se conectam e por onde os trens circulam, o fluxograma mostra como diferentes equipamentos se conectam e por onde o material (madeira, celulose, papel) circula ao longo de toda a fábrica.",
    visual: {"type": "labeled", "center": "Fluxograma de Processo", "parts": ["Símbolo de equipamento", "Linha de fluxo", "Instrumento de medição", "Válvula de controle"]},
    exercises: [
      { level:"facil", question:"Para que serve um fluxograma de processo em uma fábrica de celulose e papel?", options:[
      "Determinar apenas o preço final de venda do papel produzido pela fábrica no mercado",
      "Representar de forma esquemática como os equipamentos e etapas do processo produtivo estão conectados",
      "Registrar exclusivamente o histórico de vendas de produtos realizadas pela fábrica ao longo do ano",
      "Calcular unicamente o salário dos funcionários que atuam diretamente na linha de produção"
    ], correct:1, resolution:"O fluxograma de processo é uma representação esquemática que mostra como os diferentes equipamentos, tubulações e etapas produtivas estão conectados, permitindo que técnicos e engenheiros entendam o caminho percorrido pelo material ao longo de toda a fábrica." },
      { level:"medio", question:"Por que a leitura correta de uma planta industrial é importante antes de realizar uma manutenção em um equipamento?", options:[
      "Porque a leitura da planta, segundo essa ideia equivocada, determina exclusivamente o valor do salário pago ao técnico responsável",
      "Porque permite identificar corretamente tubulações, válvulas e conexões relacionadas àquele equipamento, evitando erros ou riscos durante a intervenção",
      "Porque a leitura da planta, segundo essa hipótese equivocada, é exigida apenas em fábricas de grande porte, nunca em pequenas indústrias",
      "Porque a leitura da planta, nessa interpretação incorreta, serve apenas para calcular o tempo total de vida útil do equipamento"
    ], correct:1, resolution:"Antes de intervir em um equipamento, é fundamental identificar corretamente, através da planta industrial, quais tubulações, válvulas e conexões estão associadas àquele ponto específico do processo — um erro de interpretação pode levar a intervenções em partes erradas do sistema, gerando riscos de acidente ou falhas operacionais." },
      { level:"dificil", question:"Qual é a diferença entre um fluxograma de processo (PFD) e um diagrama de tubulação e instrumentação (P&ID) usados na indústria de celulose e papel?", options:[
      "O PFD é usado exclusivamente durante a fase de construção da fábrica, e o P&ID é usado apenas após a fábrica já estar em operação em qualquer contexto da produção industrial de alimentos",
      "O PFD nunca representa nenhum tipo de equipamento, e o P&ID representa exclusivamente tubulações, sem nenhum equipamento independentemente do tipo de alimento ou processo envolvido",
      "O PFD é elaborado apenas por técnicos de nível médio, e o P&ID é elaborado exclusivamente por engenheiros seniores da empresa ao longo de qualquer etapa do processo produtivo considerado",
      "O PFD mostra uma visão geral simplificada do processo e dos principais equipamentos, enquanto o P&ID detalha tubulações específicas, instrumentos e válvulas com maior precisão técnica"
    ], correct:3, resolution:"O PFD (fluxograma de processo) apresenta uma visão geral e simplificada do processo, mostrando os principais equipamentos e o fluxo geral de material, útil para entendimento conceitual; já o P&ID (diagrama de tubulação e instrumentação) detalha com muito mais precisão técnica cada tubulação, instrumento, válvula e ponto de controle, sendo essencial para operação, manutenção e projetos de engenharia mais detalhados." },
      { level:"dificilimo", question:"Por que um erro de interpretação em um único símbolo de um fluxograma de processo pode ter consequências desproporcionalmente maiores em uma fábrica de celulose do que em um desenho técnico comum?", options:[
      "Porque os fluxogramas de fábricas de celulose frequentemente envolvem substâncias químicas perigosas e alta pressão/temperatura, então um erro de interpretação pode levar a uma intervenção incorreta em um ponto crítico de segurança do processo",
      "Porque, nessa interpretação incorreta, qualquer erro de leitura em um desenho técnico tem exatamente a mesma consequência, independentemente do tipo de indústria independentemente do tipo de alimento ou processo envolvido",
      "Porque, segundo essa ideia equivocada, fluxogramas de processo de fábricas de celulose nunca envolvem nenhum tipo de substância quimicamente perigosa em qualquer contexto da produção industrial de alimentos",
      "Porque, segundo essa hipótese equivocada, símbolos de fluxograma são sempre padronizados de forma idêntica em qualquer setor industrial existente ao longo de qualquer etapa do processo produtivo considerado"
    ], correct:0, resolution:"Fábricas de celulose e papel envolvem processos com reagentes químicos corrosivos ou perigosos, além de sistemas operando sob alta pressão e temperatura; um erro na interpretação de um símbolo — confundir, por exemplo, o tipo de válvula ou a linha de um fluido perigoso — pode levar a uma intervenção incorreta justamente em um ponto crítico de segurança, com consequências potencialmente muito mais graves do que um erro equivalente em um desenho técnico de um processo menos perigoso." }
    ]
  },
  "celulose-papel__higiene-seguranca-e-meio-ambiente": {
    title: "Higiene, Segurança e Meio Ambiente na Indústria de Celulose",
    emoji: "🛡️",
    intro: "Higiene, segurança e meio ambiente na indústria de celulose e papel tratam da prevenção de acidentes de trabalho, doenças ocupacionais e do controle dos impactos ambientais gerados por um processo industrial de grande escala.",
    analogy: "Pense na gestão de segurança e meio ambiente de uma fábrica de celulose como o sistema imunológico de um corpo grande e complexo: ele precisa identificar e neutralizar riscos constantemente — vazamentos, exposição a produtos químicos, emissões — antes que causem dano sério ao trabalhador ou ao ambiente ao redor da fábrica.",
    visual: {"type": "labeled", "center": "Segurança Industrial", "parts": ["EPIs específicos", "Controle de emissões", "Tratamento de efluentes", "Plano de emergência"]},
    exercises: [
      { level:"facil", question:"Por que o uso de EPIs específicos é obrigatório em áreas da fábrica que lidam com reagentes químicos do cozimento?", options:[
      "Porque esses reagentes podem ser corrosivos ou tóxicos, exigindo proteção adequada contra contato direto e inalação",
      "Porque os EPIs, nessa interpretação incorreta, são exigidos exclusivamente para fins de fiscalização governamental periódica",
      "Porque os EPIs, segundo essa hipótese equivocada, aumentam artificialmente a velocidade de trabalho do funcionário na fábrica",
      "Porque os EPIs, segundo essa ideia equivocada, servem apenas para identificar visualmente o setor onde o trabalhador atua"
    ], correct:0, resolution:"Reagentes químicos usados no cozimento da madeira, como compostos alcalinos, podem ser corrosivos para a pele e os olhos, ou tóxicos se inalados; por isso EPIs específicos — como óculos de proteção química, luvas resistentes e proteção respiratória — são obrigatórios para reduzir o risco de exposição direta a esses agentes." },
      { level:"medio", question:"Por que o tratamento de efluentes é uma etapa obrigatória antes que a água utilizada no processo de celulose retorne a um curso d'água?", options:[
      "Porque a água usada no processo carrega resíduos químicos e orgânicos que podem contaminar o ambiente aquático se descartados sem tratamento adequado",
      "Porque o tratamento de efluentes, segundo essa hipótese equivocada, não tem nenhuma relação real com a qualidade da água do rio",
      "Porque o tratamento de efluentes, nessa interpretação incorreta, é exigido exclusivamente para fábricas localizadas próximas a áreas urbanas",
      "Porque o tratamento de efluentes, segundo essa ideia equivocada, serve apenas para melhorar a aparência visual da água descartada"
    ], correct:0, resolution:"A água utilizada ao longo do processo de celulose e papel carrega resíduos químicos do cozimento, do branqueamento e material orgânico dissolvido; sem tratamento adequado, esse efluente poderia contaminar significativamente o ambiente aquático — vida aquática, qualidade da água — quando descartado em rios, por isso o tratamento é uma etapa obrigatória antes do descarte." },
      { level:"dificil", question:"Por que a gestão de segurança em uma fábrica de celulose precisa considerar tanto riscos agudos (como um vazamento súbito) quanto riscos crônicos (como exposição prolongada a ruído ou produtos químicos em baixa concentração)?", options:[
      "Porque cada tipo de risco exige estratégias de prevenção diferentes: riscos agudos demandam planos de resposta rápida, enquanto riscos crônicos exigem monitoramento contínuo e controle de exposição ao longo do tempo",
      "Porque a legislação brasileira, segundo essa ideia equivocada, reconhece exclusivamente riscos agudos, nunca considerando riscos crônicos de exposição em qualquer contexto da produção industrial de alimentos",
      "Porque riscos crônicos, nessa interpretação incorreta, nunca representam nenhum perigo real à saúde do trabalhador ao longo do tempo independentemente do tipo de alimento ou processo envolvido",
      "Porque riscos agudos, segundo essa hipótese equivocada, são sempre menos graves do que qualquer tipo de risco crônico de exposição ao longo de qualquer etapa do processo produtivo considerado"
    ], correct:0, resolution:"Um risco agudo, como um vazamento súbito de reagente químico, exige planos de resposta rápida e treinamento para emergências; já um risco crônico, como exposição prolongada a ruído de máquinas ou baixas concentrações de determinados compostos químicos ao longo de anos, exige monitoramento contínuo da saúde do trabalhador e controle sistemático da exposição — as estratégias de prevenção para cada tipo de risco são bem diferentes entre si." },
      { level:"dificilimo", question:"Por que uma fábrica de celulose pode cumprir rigorosamente todos os limites legais de emissão de poluentes e, ainda assim, enfrentar questionamentos legítimos sobre seu impacto ambiental cumulativo na região onde está instalada?", options:[
      "Porque, nessa interpretação incorreta, questionamentos sobre impacto ambiental cumulativo nunca têm nenhum fundamento técnico ou científico real independentemente do tipo de alimento ou processo envolvido",
      "Porque, segundo essa hipótese equivocada, o impacto ambiental de uma fábrica depende exclusivamente do tamanho físico de suas instalações ao longo de qualquer etapa do processo produtivo considerado",
      "Porque, segundo essa ideia equivocada, cumprir os limites legais de emissão sempre garante automaticamente a ausência total de qualquer impacto ambiental em qualquer contexto da produção industrial de alimentos",
      "Porque limites legais individuais de emissão nem sempre consideram o efeito cumulativo de múltiplas fontes poluidoras na mesma região ao longo do tempo, algo que pode gerar impacto ambiental significativo mesmo com cada fonte isoladamente dentro da lei"
    ], correct:3, resolution:"Os limites legais de emissão costumam ser definidos considerando uma única fonte poluidora isolada, mas quando várias fontes — a própria fábrica, outras indústrias da região, tráfego, agricultura — emitem poluentes na mesma área ao longo do tempo, o efeito cumulativo pode ser significativo mesmo que cada fonte, isoladamente, esteja dentro dos limites legais individuais; por isso análises de impacto ambiental mais completas buscam considerar também esse efeito cumulativo regional, não apenas a conformidade pontual de cada fonte." }
    ]
  },
  "celulose-papel__qualidade-e-gestao-de-pessoas": {
    title: "Qualidade e Gestão de Pessoas",
    emoji: "👥",
    intro: "Qualidade e gestão de pessoas na indústria de celulose e papel envolvem garantir a consistência técnica dos produtos e, ao mesmo tempo, desenvolver e coordenar as equipes responsáveis por operar um processo industrial complexo e contínuo.",
    analogy: "Pense na gestão de pessoas em uma fábrica de processo contínuo como a escalação de uma equipe de plantão em um hospital: o trabalho não pode parar, então a coordenação de turnos, treinamento e comunicação entre equipes precisa ser tão bem planejada quanto qualquer parâmetro técnico do próprio processo produtivo.",
    visual: {"type": "cycle", "steps": ["Definir padrões de qualidade", "Treinar equipe", "Executar e monitorar", "Avaliar e ajustar"]},
    exercises: [
      { level:"facil", question:"Por que o treinamento contínuo da equipe é importante em uma fábrica de celulose e papel?", options:[
      "Porque o treinamento, segundo essa hipótese equivocada, tem como único objetivo reduzir o valor do salário pago aos funcionários",
      "Porque garante que os operadores conheçam corretamente os procedimentos técnicos e de segurança necessários para o processo funcionar bem",
      "Porque o treinamento, segundo essa ideia equivocada, serve apenas para aumentar o número total de funcionários contratados",
      "Porque o treinamento, nessa interpretação incorreta, é exigido exclusivamente para cargos de gerência e nunca para operadores"
    ], correct:1, resolution:"O treinamento contínuo garante que operadores e técnicos conheçam corretamente os procedimentos técnicos, de qualidade e de segurança do processo, algo especialmente importante em uma indústria que envolve reagentes químicos, alta temperatura e equipamentos complexos operando de forma contínua." },
      { level:"medio", question:"Por que a comunicação eficiente entre turnos é especialmente importante em uma fábrica de processo contínuo, como a de celulose e papel?", options:[
      "Porque a comunicação entre turnos, segundo essa ideia equivocada, serve apenas para organizar eventos sociais entre os funcionários",
      "Porque a comunicação entre turnos, segundo essa hipótese equivocada, não tem nenhuma relação real com a continuidade do processo produtivo",
      "Porque a comunicação entre turnos, nessa interpretação incorreta, é exigida exclusivamente em fábricas de pequeno porte",
      "Porque o processo não para, e informações sobre ajustes, problemas ou pendências precisam ser transmitidas com precisão de um turno para o outro"
    ], correct:3, resolution:"Como o processo de celulose e papel funciona de forma contínua, sem interrupção entre turnos, informações sobre ajustes realizados, problemas identificados ou pendências precisam ser transmitidas de forma clara e precisa de uma equipe para a seguinte, evitando que erros ou riscos passem despercebidos na transição entre turnos." },
      { level:"dificil", question:"Qual é a diferença entre gestão de qualidade focada no produto e gestão de qualidade focada no processo, aplicada à indústria de celulose e papel?", options:[
      "A gestão focada no produto é usada apenas em fábricas de pequeno porte, e a gestão focada no processo é usada exclusivamente em grandes multinacionais em qualquer contexto da produção industrial de alimentos",
      "A gestão focada no produto avalia principalmente as características do papel já pronto, enquanto a gestão focada no processo monitora e ajusta as variáveis ao longo da produção para prevenir desvios antes que o produto final seja afetado",
      "A gestão focada no produto é sempre mais barata de implementar, e a gestão focada no processo é sempre mais cara em qualquer situação ao longo de qualquer etapa do processo produtivo considerado",
      "A gestão focada no produto nunca envolve nenhum tipo de teste laboratorial, e a gestão focada no processo depende inteiramente desses testes independentemente do tipo de alimento ou processo envolvido"
    ], correct:1, resolution:"A gestão de qualidade focada no produto testa e avalia principalmente as características do papel já finalizado, como resistência e gramatura; a gestão focada no processo monitora continuamente as variáveis ao longo da produção — temperatura, pressão, concentração química — buscando identificar e corrigir desvios antes mesmo que eles cheguem a afetar o produto final, uma abordagem mais preventiva." },
      { level:"dificilimo", question:"Por que uma fábrica de celulose e papel com equipamentos tecnicamente avançados ainda pode apresentar problemas recorrentes de qualidade se a gestão de pessoas for deficiente?", options:[
      "Porque, segundo essa ideia equivocada, equipamentos tecnicamente avançados sempre garantem automaticamente a qualidade final do produto, independentemente da equipe em qualquer contexto da produção industrial de alimentos",
      "Porque a operação correta de equipamentos avançados depende do conhecimento, da atenção e da comunicação eficaz da equipe humana responsável por monitorá-los e ajustá-los, e falhas nesse aspecto podem comprometer resultados mesmo com boa tecnologia disponível",
      "Porque, segundo essa hipótese equivocada, problemas de qualidade em uma fábrica avançada só podem ser causados por falhas puramente mecânicas ao longo de qualquer etapa do processo produtivo considerado",
      "Porque, nessa interpretação incorreta, a gestão de pessoas nunca tem nenhuma relação real com o desempenho técnico de um processo industrial independentemente do tipo de alimento ou processo envolvido"
    ], correct:1, resolution:"Mesmo o equipamento mais avançado precisa ser operado, monitorado e ajustado por pessoas — se a equipe não estiver bem treinada, comunicada e engajada, erros de operação, atrasos na identificação de problemas ou falhas de comunicação entre turnos podem comprometer a qualidade do produto final, mostrando que tecnologia avançada e boa gestão de pessoas são fatores complementares, não substitutos um do outro." }
    ]
  },
  "celulose-papel__gestao-de-processos-industriais-de-celulose-e-papel": {
    title: "Gestão de Processos Industriais de Celulose e Papel",
    emoji: "📈",
    intro: "Gestão de processos industriais integra o planejamento, o controle e a melhoria contínua de todas as etapas da fábrica de celulose e papel, buscando eficiência produtiva, qualidade consistente e uso racional de recursos.",
    analogy: "Pense na gestão de processos industriais como o trabalho de um regente de orquestra em uma sinfonia muito longa e ininterrupta: não basta que cada músico (cada etapa do processo) toque bem individualmente — é o regente que garante que todos estejam sincronizados, no ritmo certo, produzindo um resultado coeso do início ao fim.",
    visual: {"type": "flow", "steps": ["Planejamento da produção", "Execução e monitoramento", "Análise de indicadores", "Melhoria contínua"]},
    exercises: [
      { level:"facil", question:"O que é gestão de processos industriais aplicada a uma fábrica de celulose e papel?", options:[
      "O planejamento, controle e melhoria contínua das etapas produtivas para garantir eficiência e qualidade",
      "Um tipo específico de seguro contratado apenas para cobrir os equipamentos da fábrica",
      "Um imposto cobrado anualmente sobre o volume total de papel produzido pela fábrica",
      "Um documento legal exigido exclusivamente para o registro sanitário do produto final vendido"
    ], correct:0, resolution:"A gestão de processos industriais envolve planejar, controlar e melhorar continuamente as etapas produtivas de uma fábrica de celulose e papel, buscando eficiência, qualidade consistente e uso racional de recursos — não se trata de um documento, seguro ou imposto." },
      { level:"medio", question:"Por que o acompanhamento de indicadores de processo (como consumo de energia por tonelada produzida) é importante para a gestão industrial?", options:[
      "Porque permite identificar tendências, comparar desempenho ao longo do tempo e detectar oportunidades de melhoria antes que se tornem problemas maiores",
      "Porque o acompanhamento de indicadores, nessa interpretação incorreta, é exigido exclusivamente para fábricas destinadas à exportação",
      "Porque o acompanhamento de indicadores, segundo essa hipótese equivocada, elimina totalmente a necessidade de qualquer supervisão humana",
      "Porque o acompanhamento de indicadores, segundo essa ideia equivocada, serve apenas para preencher relatórios burocráticos sem nenhuma utilidade prática"
    ], correct:0, resolution:"Indicadores como consumo de energia por tonelada produzida permitem à gestão acompanhar tendências ao longo do tempo, comparar o desempenho entre diferentes períodos ou turnos, e identificar desvios ou oportunidades de melhoria antes que se transformem em problemas de qualidade ou custo mais graves." },
      { level:"dificil", question:"Qual é a diferença entre uma melhoria de processo pontual (ação corretiva) e um programa de melhoria contínua na gestão industrial?", options:[
      "A ação corretiva é aplicada apenas em fábricas pequenas, e a melhoria contínua é aplicada exclusivamente em grandes corporações multinacionais",
      "A ação corretiva nunca envolve nenhum tipo de análise técnica, e a melhoria contínua depende inteiramente dessa análise para funcionar em qualquer contexto da produção industrial de alimentos",
      "A ação corretiva é sempre mais cara de implementar, e a melhoria contínua é sempre um processo totalmente gratuito para a empresa independentemente do tipo de alimento ou processo envolvido",
      "A ação corretiva resolve um problema específico identificado, enquanto a melhoria contínua busca sistematicamente pequenos avanços constantes, mesmo sem um problema evidente naquele momento"
    ], correct:3, resolution:"Uma ação corretiva é acionada em resposta a um problema específico já identificado, buscando resolvê-lo pontualmente; um programa de melhoria contínua, por outro lado, busca de forma sistemática e constante pequenos avanços incrementais no processo, mesmo quando não há um problema evidente no momento, com o objetivo de elevar gradualmente o desempenho geral ao longo do tempo." },
      { level:"dificilimo", question:"Por que uma fábrica de celulose e papel pode registrar melhoria em um indicador isolado (como redução de custo de energia) e, ainda assim, apresentar piora no desempenho geral do processo?", options:[
      "Porque otimizar um indicador isoladamente pode gerar efeitos colaterais negativos em outras variáveis interligadas do processo, como qualidade ou produtividade, se a mudança não for avaliada em relação ao sistema como um todo",
      "Porque, nessa interpretação incorreta, melhorar qualquer indicador isoladamente sempre resulta automaticamente em piora total do processo independentemente do tipo de alimento ou processo envolvido",
      "Porque, segundo essa ideia equivocada, indicadores de processo industrial nunca têm nenhuma relação real entre si dentro de uma mesma fábrica em qualquer contexto da produção industrial de alimentos",
      "Porque, segundo essa hipótese equivocada, o desempenho geral de uma fábrica depende exclusivamente de um único indicador isolado de custo ao longo de qualquer etapa do processo produtivo considerado"
    ], correct:0, resolution:"Os diferentes indicadores de um processo industrial estão frequentemente interligados: uma mudança feita para reduzir o consumo de energia, por exemplo, pode reduzir também a temperatura ou o tempo de uma etapa crítica, afetando negativamente a qualidade do produto ou a velocidade de produção — por isso a gestão eficaz avalia o impacto de qualquer mudança no sistema como um todo, e não apenas no indicador isolado que se pretendia melhorar inicialmente." }
    ]
  },
  "dev-sistemas__introducao-a-logica-e-matematica-discreta": {
    title: "Introdução à Lógica e Matemática Discreta",
    emoji: "🔢",
    intro: "Lógica e matemática discreta são a base do raciocínio usado em programação — envolvem operadores lógicos, conjuntos e estruturas que não variam de forma contínua, sendo fundamentais para entender como os computadores tomam decisões.",
    analogy: "Pense na lógica de programação como as regras de um jogo de tabuleiro: cada operador lógico (E, OU, NÃO) é uma regra clara que determina se um movimento é permitido ou não — sem ambiguidade, sem 'talvez', apenas verdadeiro ou falso.",
    visual: {"type": "labeled", "center": "Operadores Lógicos", "parts": ["E (AND)", "OU (OR)", "NÃO (NOT)", "OU exclusivo (XOR)"]},
    exercises: [
      { level:"facil", question:"O que faz o operador lógico 'E' (AND) em uma expressão de programação?", options:[
      "Retorna verdadeiro apenas quando todas as condições envolvidas também são verdadeiras",
      "Compara dois números e retorna qual deles é numericamente maior que o outro",
      "Inverte o valor lógico de uma única condição, transformando verdadeiro em falso",
      "Retorna verdadeiro sempre que pelo menos uma das condições envolvidas for verdadeira"
    ], correct:0, resolution:"O operador 'E' (AND) só retorna verdadeiro quando todas as condições avaliadas são verdadeiras ao mesmo tempo; se qualquer uma delas for falsa, o resultado final também será falso." },
      { level:"medio", question:"Qual é a diferença entre o operador 'OU' (OR) e o 'OU exclusivo' (XOR)?", options:[
      "O OR é usado exclusivamente em linguagens de programação antigas, e o XOR é usado apenas em linguagens modernas em qualquer contexto da produção industrial de alimentos",
      "O OR nunca pode ser usado com mais de duas condições, e o XOR pode ser usado com qualquer quantidade de condições independentemente do tipo de alimento ou processo envolvido",
      "O OR sempre retorna um número, e o XOR sempre retorna obrigatoriamente um texto como resultado ao longo de qualquer etapa do processo produtivo considerado",
      "O OR retorna verdadeiro se pelo menos uma condição for verdadeira, enquanto o XOR retorna verdadeiro apenas quando exatamente uma das condições for verdadeira, não ambas"
    ], correct:3, resolution:"O operador OR retorna verdadeiro se qualquer uma das condições (ou ambas) for verdadeira; já o XOR retorna verdadeiro apenas quando exatamente uma das condições é verdadeira — se as duas forem verdadeiras ao mesmo tempo, o XOR retorna falso, diferente do OR comum." },
      { level:"dificil", question:"Por que conjuntos (uma estrutura da matemática discreta) são úteis na lógica de programação, mesmo antes de qualquer código ser escrito?", options:[
      "Porque ajudam a modelar relações entre grupos de dados, como pertencimento, união e interseção, que se traduzem diretamente em estruturas e algoritmos de programação",
      "Porque conjuntos, nessa interpretação incorreta, só podem ser usados em linguagens de programação voltadas à matemática pura",
      "Porque conjuntos, segundo essa hipótese equivocada, eliminam totalmente a necessidade de qualquer tipo de operador lógico",
      "Porque conjuntos, segundo essa ideia equivocada, servem apenas para armazenar números em ordem crescente de valor em qualquer contexto da produção industrial de alimentos"
    ], correct:0, resolution:"Conceitos de conjuntos — como pertencimento a um grupo, união de dois grupos ou interseção entre eles — servem de base conceitual para diversas estruturas de dados e algoritmos em programação, como filtros de dados, buscas e comparações entre coleções, sendo úteis mesmo antes da implementação em código." },
      { level:"dificilimo", question:"Por que um erro na tabela-verdade de uma condição lógica complexa (com vários operadores combinados) pode ser mais difícil de detectar do que um erro de sintaxe no código?", options:[
      "Porque, segundo essa ideia equivocada, erros lógicos em condições complexas nunca produzem nenhum tipo de resultado incorreto no programa em qualquer contexto da produção industrial de alimentos",
      "Porque, segundo essa hipótese equivocada, tabelas-verdade são usadas apenas em disciplinas de matemática, nunca em programação real ao longo de qualquer etapa do processo produtivo considerado",
      "Porque um erro de sintaxe geralmente impede o programa de rodar e é sinalizado imediatamente, enquanto um erro lógico permite que o programa rode normalmente, produzindo resultados incorretos apenas em certos casos específicos",
      "Porque, nessa interpretação incorreta, erros de sintaxe são sempre mais difíceis de identificar do que qualquer erro lógico complexo independentemente do tipo de alimento ou processo envolvido"
    ], correct:2, resolution:"Um erro de sintaxe geralmente impede a execução do programa e costuma ser sinalizado de forma clara pelo compilador ou interpretador; já um erro na lógica de uma condição complexa permite que o programa continue rodando normalmente, mas produz resultados incorretos apenas em combinações específicas de valores — tornando esse tipo de erro mais silencioso e, por isso, mais difícil de detectar sem testes cuidadosos." }
    ]
  },
  "dev-sistemas__desenvolvimento-front-end-i": {
    title: "Desenvolvimento Front-End I",
    emoji: "🎨",
    intro: "Desenvolvimento Front-End I introduz as tecnologias básicas que constroem a interface visual de um site — HTML para estrutura, CSS para estilo — que o usuário vê e interage diretamente no navegador.",
    analogy: "Pense no HTML como o esqueleto de uma casa (paredes, cômodos, portas) e o CSS como a decoração e pintura (cores, estilos, acabamentos): o HTML organiza o conteúdo, e o CSS define como esse conteúdo aparece visualmente na tela.",
    visual: {"type": "compare", "leftTitle": "HTML", "leftItems": ["Define a estrutura", "Títulos, parágrafos, listas", "Conteúdo da página"], "rightTitle": "CSS", "rightItems": ["Define o estilo visual", "Cores, fontes, espaçamento", "Aparência da página"]},
    exercises: [
      { level:"facil", question:"Qual é a função do HTML em uma página web?", options:[
      "Armazenar de forma permanente os dados digitados pelo usuário em um formulário",
      "Definir a estrutura e o conteúdo da página, como títulos, parágrafos e imagens",
      "Definir exclusivamente as cores e o estilo visual aplicado a cada elemento da página",
      "Executar cálculos matemáticos complexos diretamente dentro do navegador do usuário"
    ], correct:1, resolution:"O HTML (HyperText Markup Language) define a estrutura e o conteúdo de uma página web, organizando elementos como títulos, parágrafos, listas e imagens — a aparência visual é responsabilidade do CSS, e o comportamento interativo, do JavaScript." },
      { level:"medio", question:"Por que separar o CSS do HTML (em vez de misturar estilo diretamente no conteúdo) é considerada uma boa prática de desenvolvimento?", options:[
      "Porque facilita a manutenção do código e permite alterar o visual da página sem precisar modificar a estrutura do conteúdo",
      "Porque separar CSS do HTML, segundo essa ideia equivocada, é a única forma tecnicamente possível de exibir uma página no navegador",
      "Porque separar CSS do HTML, nessa interpretação incorreta, elimina totalmente a necessidade de qualquer teste da página",
      "Porque separar CSS do HTML, segundo essa hipótese equivocada, é exigido por lei em qualquer site publicado no Brasil"
    ], correct:0, resolution:"Manter o CSS separado do HTML facilita a manutenção do código: é possível alterar cores, fontes e layout de toda uma página editando apenas o arquivo CSS, sem precisar tocar na estrutura do conteúdo, além de permitir reutilizar o mesmo estilo em várias páginas diferentes." },
      { level:"dificil", question:"Qual é a diferença entre um seletor de classe e um seletor de ID em CSS?", options:[
      "Um seletor de classe é usado apenas em imagens, e um seletor de ID é usado exclusivamente em textos de parágrafo",
      "Um seletor de classe nunca pode ser combinado com outro seletor, e o de ID pode ser combinado com qualquer quantidade",
      "Um seletor de classe é definido apenas em arquivos JavaScript, e o de ID é definido exclusivamente em arquivos HTML",
      "Um seletor de classe pode ser aplicado a vários elementos da página, enquanto um seletor de ID deve identificar apenas um único elemento específico"
    ], correct:3, resolution:"Um seletor de classe (identificado por um ponto no CSS) pode ser aplicado a múltiplos elementos da página que compartilham o mesmo estilo, enquanto um seletor de ID (identificado por uma cerquilha) deve, por convenção, identificar um único elemento exclusivo dentro da página, geralmente usado para algo específico e não repetido." },
      { level:"dificilimo", question:"Por que o conceito de 'cascata' no CSS (de onde vem o nome Cascading Style Sheets) pode fazer com que uma regra de estilo aparentemente correta não seja aplicada visualmente na página?", options:[
      "Porque, segundo essa hipótese equivocada, a cascata do CSS se aplica apenas a cores, nunca a outras propriedades visuais ao longo de qualquer etapa do processo produtivo considerado",
      "Porque quando várias regras CSS conflitam para o mesmo elemento, a cascata determina qual delas prevalece com base em especificidade e ordem de declaração, podendo sobrepor uma regra que o desenvolvedor esperava que fosse aplicada",
      "Porque, segundo essa ideia equivocada, o CSS aplica sempre a primeira regra escrita no arquivo, ignorando completamente todas as demais em qualquer contexto da produção industrial de alimentos",
      "Porque, nessa interpretação incorreta, regras de CSS nunca podem entrar em conflito entre si dentro de uma mesma página independentemente do tipo de alimento ou processo envolvido"
    ], correct:1, resolution:"Quando múltiplas regras CSS afetam o mesmo elemento, o navegador segue regras de 'cascata' — considerando a especificidade do seletor (um ID é mais específico que uma classe, por exemplo) e a ordem em que as regras foram declaradas — para decidir qual prevalece; isso pode fazer com que uma regra que parece correta seja sobreposta por outra mais específica ou declarada depois, sem que o desenvolvedor perceba imediatamente o motivo." }
    ]
  },
  "dev-sistemas__pensamento-computacional-e-caminhos-profissionais": {
    title: "Pensamento Computacional e Caminhos Profissionais",
    emoji: "🧠",
    intro: "Pensamento computacional é a habilidade de decompor problemas complexos em partes menores e resolvê-los de forma lógica e estruturada, uma competência central para diversas áreas profissionais dentro da tecnologia.",
    analogy: "Pense no pensamento computacional como a forma de organizar uma mudança de casa: em vez de tentar carregar tudo de uma vez, você decompõe o problema (dividir por cômodo), reconhece padrões (itens semelhantes vão na mesma caixa), abstrai detalhes irrelevantes (não precisa pensar no formato de cada objeto) e cria um algoritmo (a ordem em que vai carregar as caixas no caminhão).",
    visual: {"type": "flow", "steps": ["Decomposição", "Reconhecimento de padrões", "Abstração", "Criação de algoritmo"]},
    exercises: [
      { level:"facil", question:"O que é decomposição, um dos pilares do pensamento computacional?", options:[
      "Testar um programa já finalizado para verificar se ele funciona corretamente em produção",
      "Apresentar o resultado final de um projeto de software para o cliente que o contratou",
      "Dividir um problema complexo em partes menores e mais fáceis de resolver individualmente",
      "Escrever o código de um programa diretamente em uma linguagem de programação específica"
    ], correct:2, resolution:"Decomposição é a habilidade de dividir um problema grande e complexo em partes menores e mais gerenciáveis, facilitando a compreensão e a resolução de cada parte antes de juntar as soluções no problema completo." },
      { level:"medio", question:"Por que o pensamento computacional é considerado útil mesmo para pessoas que não pretendem seguir carreira exclusivamente como programadoras?", options:[
      "Porque as habilidades de decompor problemas, reconhecer padrões e pensar de forma estruturada são úteis em diversas áreas profissionais, além da programação",
      "Porque o pensamento computacional, nessa interpretação incorreta, garante automaticamente um salário mais alto em qualquer área",
      "Porque o pensamento computacional, segundo essa ideia equivocada, é exigido por lei em qualquer profissão registrada no Brasil",
      "Porque o pensamento computacional, segundo essa hipótese equivocada, só é útil para quem trabalha exclusivamente com computadores"
    ], correct:0, resolution:"As habilidades centrais do pensamento computacional — decompor problemas, identificar padrões, abstrair o que é essencial e pensar em passos lógicos — são transferíveis para diversas áreas profissionais, como gestão, design, ciências e negócios, não sendo exclusivas de quem programa profissionalmente." },
      { level:"dificil", question:"Qual é a diferença entre reconhecimento de padrões e abstração, dois dos pilares do pensamento computacional?", options:[
      "O reconhecimento de padrões identifica semelhanças entre problemas ou dados diferentes, enquanto a abstração remove detalhes irrelevantes para focar apenas no que é essencial para resolver o problema",
      "O reconhecimento de padrões é usado apenas em problemas matemáticos, e a abstração é usada exclusivamente em problemas de programação visual em qualquer contexto da produção industrial de alimentos",
      "O reconhecimento de padrões nunca envolve nenhum tipo de comparação entre elementos, e a abstração depende inteiramente dessas comparações independentemente do tipo de alimento ou processo envolvido",
      "O reconhecimento de padrões é sempre a última etapa do processo, e a abstração é sempre obrigatoriamente a primeira etapa ao longo de qualquer etapa do processo produtivo considerado"
    ], correct:0, resolution:"O reconhecimento de padrões busca identificar semelhanças e regularidades entre diferentes problemas ou conjuntos de dados, ajudando a reutilizar soluções conhecidas; a abstração, por sua vez, remove detalhes desnecessários de um problema, mantendo apenas as informações essenciais para sua resolução — os dois pilares se complementam, mas cumprem funções diferentes no processo de raciocínio." },
      { level:"dificilimo", question:"Por que dominar os quatro pilares do pensamento computacional (decomposição, reconhecimento de padrões, abstração e algoritmo) não garante, por si só, que uma pessoa se torne uma boa programadora?", options:[
      "Porque o pensamento computacional fornece a base lógica para estruturar soluções, mas a programação também exige conhecimento técnico específico de linguagens, ferramentas e boas práticas de implementação",
      "Porque, segundo essa hipótese equivocada, dominar esses pilares é suficiente para garantir domínio automático de qualquer linguagem de programação independentemente do tipo de alimento ou processo envolvido",
      "Porque, nessa interpretação incorreta, a programação depende exclusivamente de talento inato, sem nenhuma relação com raciocínio lógico estruturado",
      "Porque, segundo essa ideia equivocada, os pilares do pensamento computacional nunca têm nenhuma relação real com a atividade de programar em qualquer contexto da produção industrial de alimentos"
    ], correct:0, resolution:"O pensamento computacional oferece a base de raciocínio lógico e estruturado necessária para abordar problemas, mas a prática de programação também exige conhecimento técnico específico — sintaxe de linguagens, ferramentas de desenvolvimento, boas práticas de código e experiência prática — que só se desenvolve com estudo e prática direcionados além do raciocínio lógico geral." }
    ]
  },
  "dev-sistemas__banco-de-dados": {
    title: "Banco de Dados",
    emoji: "🗄️",
    intro: "Banco de dados é um sistema organizado para armazenar, consultar e gerenciar grandes volumes de informação de forma estruturada, sendo essencial para praticamente qualquer sistema de software que precise guardar dados.",
    analogy: "Pense em um banco de dados como um arquivo de fichas gigante, muito bem organizado: em vez de procurar uma informação folheando papel por papel, um sistema de índices permite localizar exatamente a ficha certa em frações de segundo, mesmo entre milhões de registros.",
    visual: {"type": "labeled", "center": "Banco de Dados", "parts": ["Tabelas", "Registros (linhas)", "Colunas (campos)", "Chave primária"]},
    exercises: [
      { level:"facil", question:"O que é uma tabela em um banco de dados relacional?", options:[
      "Uma estrutura organizada em linhas e colunas que armazena dados de um mesmo tipo de entidade",
      "Um arquivo de imagem armazenado dentro do sistema para fins de identificação visual",
      "Um tipo específico de gráfico usado apenas para exibir dados de vendas mensais",
      "Um programa usado exclusivamente para criar apresentações de slides em uma empresa"
    ], correct:0, resolution:"Uma tabela em um banco de dados relacional organiza informações em linhas (registros) e colunas (campos), armazenando dados de um mesmo tipo de entidade — como uma tabela de clientes ou uma tabela de produtos — de forma estruturada e consultável." },
      { level:"medio", question:"Qual é a função de uma chave primária em uma tabela de banco de dados?", options:[
      "A chave primária, nessa interpretação incorreta, é usada exclusivamente para ordenar os registros em ordem alfabética",
      "A chave primária, segundo essa hipótese equivocada, determina o tamanho máximo de armazenamento de toda a tabela",
      "Identificar de forma única cada registro da tabela, evitando duplicidade e permitindo relacionamentos com outras tabelas",
      "A chave primária, segundo essa ideia equivocada, serve apenas para definir a cor de destaque de um registro específico"
    ], correct:2, resolution:"A chave primária é um campo (ou conjunto de campos) que identifica de forma única cada registro dentro de uma tabela, garantindo que não existam duplicatas e servindo como referência para criar relacionamentos entre diferentes tabelas do banco de dados." },
      { level:"dificil", question:"Qual é a diferença entre um banco de dados relacional e um banco de dados não relacional (NoSQL)?", options:[
      "O banco relacional é usado apenas para armazenar textos, e o não relacional é usado exclusivamente para armazenar imagens em qualquer contexto da produção industrial de alimentos",
      "O banco relacional é sempre gratuito para qualquer empresa utilizar, e o não relacional é sempre um serviço pago obrigatoriamente ao longo de qualquer etapa do processo produtivo considerado",
      "O relacional organiza dados em tabelas estruturadas com relações bem definidas entre elas, enquanto o não relacional armazena dados de forma mais flexível, sem exigir uma estrutura rígida de tabelas",
      "O banco relacional nunca pode ser consultado com nenhuma linguagem de consulta, e o não relacional depende inteiramente delas independentemente do tipo de alimento ou processo envolvido"
    ], correct:2, resolution:"Um banco de dados relacional organiza informações em tabelas com estrutura fixa e relações bem definidas entre elas, geralmente consultado com linguagem SQL; um banco não relacional (NoSQL) armazena dados de forma mais flexível — como documentos, pares chave-valor ou grafos —, sem exigir uma estrutura rígida de tabelas, o que pode ser vantajoso para certos tipos de aplicação com dados menos estruturados." },
      { level:"dificilimo", question:"Por que a normalização de um banco de dados relacional pode, em certos cenários de alta demanda de consulta, ser deliberadamente reduzida (desnormalização) mesmo sabendo que isso aumenta a redundância de dados?", options:[
      "Porque, segundo essa ideia equivocada, a normalização de um banco de dados nunca tem nenhuma relação real com a velocidade das consultas realizadas em qualquer contexto da produção industrial de alimentos",
      "Porque a desnormalização pode reduzir o número de junções entre tabelas necessárias em uma consulta, tornando-a mais rápida, ainda que ao custo de armazenar dados repetidos e exigir mais cuidado para mantê-los consistentes",
      "Porque, segundo essa hipótese equivocada, a redundância de dados é sempre um problema puramente estético, sem nenhum impacto técnico real ao longo de qualquer etapa do processo produtivo considerado",
      "Porque, nessa interpretação incorreta, bancos de dados desnormalizados são sempre tecnicamente proibidos em qualquer aplicação comercial real independentemente do tipo de alimento ou processo envolvido"
    ], correct:1, resolution:"A normalização organiza dados para minimizar redundância, mas isso geralmente exige combinar (fazer junção de) várias tabelas para responder a uma consulta, o que pode ser mais lento em sistemas com alta demanda; a desnormalização proposital reduz essa necessidade de junções, tornando consultas mais rápidas, mas exige atenção redobrada para manter os dados duplicados consistentes entre si — uma decisão de trade-off entre desempenho e organização dos dados." }
    ]
  },
  "dev-sistemas__arquitetura-de-sistemas": {
    title: "Arquitetura de Sistemas",
    emoji: "🏛️",
    intro: "Arquitetura de sistemas é o planejamento estrutural de como os diferentes componentes de um software — interface, lógica de negócio, banco de dados — se organizam e se comunicam entre si.",
    analogy: "Pense na arquitetura de sistemas como a planta de um prédio: antes de construir, um engenheiro decide onde ficam a estrutura, os encanamentos e a elétrica, de forma que tudo funcione bem junto — da mesma forma, um arquiteto de software decide como as partes de um sistema vão se conectar antes mesmo de escrever a primeira linha de código.",
    visual: {"type": "labeled", "center": "Arquitetura de Sistema", "parts": ["Interface (frontend)", "Lógica de negócio", "Banco de dados", "API de comunicação"]},
    exercises: [
      { level:"facil", question:"O que é arquitetura de sistemas, no contexto do desenvolvimento de software?", options:[
      "Um programa específico usado apenas para desenhar plantas de construção civil residencial",
      "Um tipo de teste realizado apenas depois que o sistema já foi completamente finalizado",
      "O planejamento de como os diferentes componentes de um sistema se organizam e se comunicam entre si",
      "Um documento legal exigido exclusivamente para o registro de uma empresa de tecnologia"
    ], correct:2, resolution:"Arquitetura de sistemas é o planejamento estrutural de como os diferentes componentes de um software — interface, lógica de negócio, banco de dados — se organizam e se comunicam entre si, definido geralmente antes ou durante o início do desenvolvimento." },
      { level:"medio", question:"Por que separar a interface (frontend) da lógica de negócio (backend) é considerado uma boa prática de arquitetura?", options:[
      "Porque separar frontend e backend, segundo essa ideia equivocada, é a única forma tecnicamente possível de criar qualquer sistema",
      "Porque separar frontend e backend, segundo essa hipótese equivocada, é exigido por lei em qualquer aplicação comercial",
      "Porque permite que cada parte seja desenvolvida, testada e atualizada de forma mais independente, facilitando manutenção e escalabilidade",
      "Porque separar frontend e backend, nessa interpretação incorreta, elimina totalmente a necessidade de qualquer teste do sistema"
    ], correct:2, resolution:"Separar interface e lógica de negócio permite que equipes diferentes trabalhem em paralelo, que cada parte seja testada e corrigida de forma mais isolada, e que o sistema seja escalado de forma independente — por exemplo, aumentando a capacidade do backend sem precisar alterar o frontend." },
      { level:"dificil", question:"Qual é a diferença entre uma arquitetura monolítica e uma arquitetura de microsserviços?", options:[
      "A arquitetura monolítica nunca pode ser atualizada depois de publicada, e a de microsserviços pode ser atualizada livremente independentemente do tipo de alimento ou processo envolvido",
      "A arquitetura monolítica é usada apenas em sites pequenos, e a de microsserviços é usada exclusivamente em jogos eletrônicos em qualquer contexto da produção industrial de alimentos",
      "Na arquitetura monolítica, todo o sistema roda como uma única aplicação integrada, enquanto na de microsserviços o sistema é dividido em serviços menores e independentes que se comunicam entre si",
      "A arquitetura monolítica depende sempre de múltiplos servidores físicos, e a de microsserviços roda sempre em um único servidor ao longo de qualquer etapa do processo produtivo considerado"
    ], correct:2, resolution:"Na arquitetura monolítica, todas as funcionalidades do sistema fazem parte de uma única aplicação integrada, compartilhando o mesmo código e implantação; na arquitetura de microsserviços, o sistema é dividido em serviços menores e independentes, cada um responsável por uma funcionalidade específica, que se comunicam entre si — geralmente por meio de APIs — permitindo desenvolvimento e escalabilidade mais flexíveis." },
      { level:"dificilimo", question:"Por que adotar uma arquitetura de microsserviços pode aumentar a complexidade operacional de um sistema, mesmo trazendo benefícios de escalabilidade e independência entre equipes?", options:[
      "Porque, nessa interpretação incorreta, uma arquitetura monolítica é sempre mais complexa operacionalmente do que qualquer sistema de microsserviços independentemente do tipo de alimento ou processo envolvido",
      "Porque, segundo essa hipótese equivocada, microsserviços eliminam totalmente qualquer necessidade de monitoramento do sistema ao longo de qualquer etapa do processo produtivo considerado",
      "Porque múltiplos serviços independentes precisam se comunicar de forma confiável pela rede, o que introduz desafios como latência, falhas de comunicação e necessidade de monitoramento distribuído que não existem em um sistema monolítico único",
      "Porque, segundo essa ideia equivocada, microsserviços nunca precisam se comunicar entre si de nenhuma forma dentro do sistema em qualquer contexto da produção industrial de alimentos"
    ], correct:2, resolution:"Em uma arquitetura monolítica, a comunicação entre partes do sistema ocorre dentro do mesmo processo, de forma direta e confiável; em uma arquitetura de microsserviços, cada serviço roda de forma independente e precisa se comunicar pela rede com os demais, o que introduz desafios adicionais como latência de rede, tratamento de falhas de comunicação e a necessidade de ferramentas de monitoramento distribuído para acompanhar o funcionamento de todos os serviços envolvidos." }
    ]
  },
  "dev-sistemas__conceitos-avancados-em-arquitetura-de-sistemas": {
    title: "Conceitos Avançados em Arquitetura de Sistemas",
    emoji: "🧩",
    intro: "Conceitos avançados de arquitetura de sistemas aprofundam temas como escalabilidade, tolerância a falhas e padrões de design que garantem que sistemas complexos continuem funcionando de forma confiável mesmo sob alta demanda ou falhas parciais.",
    analogy: "Pense na tolerância a falhas de um sistema como as saídas de emergência de um prédio: em condições normais, ninguém percebe sua existência, mas quando algo dá errado (um incêndio, ou no caso de um sistema, uma falha em um servidor), é essa estrutura preparada com antecedência que evita que o problema se torne uma catástrofe maior.",
    visual: {"type": "labeled", "center": "Conceitos Avançados", "parts": ["Escalabilidade", "Tolerância a falhas", "Balanceamento de carga", "Cache"]},
    exercises: [
      { level:"facil", question:"O que significa escalabilidade em um sistema de software?", options:[
      "A capacidade do sistema de suportar mais usuários ou mais dados sem perder desempenho significativamente",
      "A capacidade do sistema de funcionar corretamente mesmo sem nenhum tipo de conexão com a internet",
      "A capacidade do sistema de traduzir automaticamente sua interface para qualquer idioma do mundo",
      "A capacidade do sistema de mudar completamente de linguagem de programação sem nenhum esforço adicional"
    ], correct:0, resolution:"Escalabilidade é a capacidade de um sistema de crescer — atendendo mais usuários simultâneos ou processando mais dados — sem que isso comprometa significativamente seu desempenho, geralmente através de mais recursos de hardware ou de uma arquitetura bem planejada." },
      { level:"medio", question:"Por que o balanceamento de carga é útil em sistemas com alto volume de acessos simultâneos?", options:[
      "Porque o balanceamento de carga, segundo essa ideia equivocada, serve apenas para melhorar a aparência visual do sistema",
      "Porque distribui as requisições entre múltiplos servidores, evitando que um único servidor fique sobrecarregado",
      "Porque o balanceamento de carga, segundo essa hipótese equivocada, é exigido exclusivamente para sistemas de uso interno de empresas",
      "Porque o balanceamento de carga, nessa interpretação incorreta, elimina totalmente a necessidade de qualquer banco de dados"
    ], correct:1, resolution:"O balanceamento de carga distribui as requisições recebidas entre múltiplos servidores disponíveis, evitando que um único servidor concentre toda a demanda e fique sobrecarregado, o que ajuda a manter o sistema responsivo mesmo sob alto volume de acessos simultâneos." },
      { level:"dificil", question:"Qual é a diferença entre escalabilidade vertical e escalabilidade horizontal?", options:[
      "A escalabilidade vertical é usada apenas em sistemas móveis, e a horizontal é usada exclusivamente em sistemas de desktop em qualquer contexto da produção industrial de alimentos",
      "A escalabilidade vertical é aplicada apenas ao banco de dados, e a horizontal é aplicada exclusivamente à interface do sistema",
      "A escalabilidade vertical aumenta a capacidade de um único servidor (mais memória, processamento), enquanto a horizontal adiciona mais servidores trabalhando em conjunto",
      "A escalabilidade vertical nunca tem custo financeiro associado, e a horizontal sempre exige investimento financeiro elevado"
    ], correct:2, resolution:"A escalabilidade vertical aumenta a capacidade de um único servidor, adicionando mais memória, processamento ou armazenamento a essa mesma máquina; a escalabilidade horizontal, por sua vez, adiciona mais servidores trabalhando em conjunto para dividir a carga de trabalho — cada abordagem tem vantagens e limitações técnicas diferentes." },
      { level:"dificilimo", question:"Por que um sistema pode ser tecnicamente escalável e, ainda assim, apresentar um único ponto de falha que compromete toda a sua disponibilidade?", options:[
      "Porque, segundo essa ideia equivocada, um sistema escalável nunca pode, por definição, apresentar nenhum tipo de ponto único de falha em qualquer contexto da produção industrial de alimentos independentemente do tipo de alimento ou processo envolvido",
      "Porque, segundo essa hipótese equivocada, pontos únicos de falha só podem existir em sistemas que não possuem nenhum tipo de escalabilidade mesmo em situações consideradas tecnicamente controladas segundo essa mesma linha de raciocínio equivocada apresentada",
      "Porque, nessa interpretação incorreta, escalabilidade e disponibilidade são sempre exatamente o mesmo conceito técnico dentro da arquitetura ao longo de qualquer etapa do processo produtivo considerado",
      "Porque escalabilidade e tolerância a falhas são conceitos relacionados, mas distintos — um sistema pode ter múltiplos servidores para lidar com carga, mas ainda depender de um componente único e crítico (como um banco de dados central) que, se falhar, derruba todo o sistema"
    ], correct:3, resolution:"Escalabilidade trata da capacidade de suportar mais carga, enquanto tolerância a falhas trata da capacidade de continuar funcionando mesmo quando um componente falha — são conceitos relacionados, mas distintos; um sistema pode ter múltiplos servidores de aplicação (escalável) e, ainda assim, depender de um único banco de dados central sem redundância, que, se falhar, derruba todo o sistema mesmo com toda aquela capacidade extra de processamento disponível." }
    ]
  },
  "dev-sistemas__desenvolvimento-front-end-ii": {
    title: "Desenvolvimento Front-End II",
    emoji: "⚡",
    intro: "Desenvolvimento Front-End II avança para JavaScript e interatividade, permitindo que páginas web respondam a ações do usuário, atualizem conteúdo dinamicamente e se comuniquem com servidores sem recarregar a página inteira.",
    analogy: "Pense no JavaScript como o sistema nervoso de uma página web: se o HTML é o esqueleto e o CSS é a aparência, o JavaScript é o que permite que a página 'reaja' a estímulos — um clique, uma digitação, o carregamento de novos dados — tornando a experiência interativa em vez de estática.",
    visual: {"type": "flow", "steps": ["Evento do usuário", "JavaScript captura o evento", "Lógica processa a ação", "Página atualiza dinamicamente"]},
    exercises: [
      { level:"facil", question:"Qual é a função principal do JavaScript em uma página web?", options:[
      "Determinar unicamente as cores e o espaçamento visual aplicado aos elementos da página",
      "Definir exclusivamente a estrutura do conteúdo, como títulos e parágrafos da página",
      "Adicionar interatividade e comportamento dinâmico à página, respondendo a ações do usuário",
      "Armazenar permanentemente os dados do usuário diretamente no disco rígido do computador"
    ], correct:2, resolution:"O JavaScript adiciona comportamento dinâmico e interatividade a uma página web, permitindo que ela responda a ações do usuário — como cliques e digitação — e atualize conteúdo sem precisar recarregar a página inteira, diferente do HTML (estrutura) e do CSS (estilo)." },
      { level:"medio", question:"O que é um 'evento' em JavaScript, como um clique de botão?", options:[
      "Um evento, segundo essa ideia equivocada, é um tipo de arquivo de imagem usado apenas para ícones de botões",
      "Um evento, segundo essa hipótese equivocada, é um comando usado apenas para deletar elementos da página",
      "Um evento, nessa interpretação incorreta, é uma estrutura de dados usada exclusivamente para armazenar números",
      "Uma ação disparada pelo usuário ou pelo navegador que pode ser capturada e tratada pelo código JavaScript"
    ], correct:3, resolution:"Um evento é uma ação que ocorre na página — como um clique, uma tecla pressionada ou o carregamento completo de um elemento — que pode ser 'ouvida' e tratada por código JavaScript, permitindo que o programa reaja de forma específica a essa ação do usuário ou do navegador." },
      { level:"dificil", question:"Qual é a diferença entre manipular o DOM diretamente e usar uma biblioteca ou framework (como React) para atualizar a interface?", options:[
      "A manipulação direta do DOM é usada apenas em sites pequenos, e frameworks como React são usados exclusivamente em aplicativos móveis nativos em qualquer contexto da produção industrial de alimentos",
      "A manipulação direta do DOM depende sempre de um servidor externo, e frameworks como React funcionam sempre sem nenhuma conexão de rede ao longo de qualquer etapa do processo produtivo considerado",
      "A manipulação direta do DOM altera elementos específicos manualmente a cada mudança, enquanto frameworks como React gerenciam atualizações de forma mais eficiente através de uma representação intermediária da interface",
      "A manipulação direta do DOM nunca pode alterar o conteúdo visual da página, e frameworks como React são os únicos capazes disso independentemente do tipo de alimento ou processo envolvido"
    ], correct:2, resolution:"Manipular o DOM diretamente envolve selecionar e alterar elementos HTML manualmente a cada mudança necessária, o que pode se tornar complexo em interfaces grandes; frameworks como React usam uma representação intermediária (o DOM virtual) para calcular de forma mais eficiente quais partes da interface realmente precisam ser atualizadas, otimizando o processo e simplificando o código para interfaces mais complexas." },
      { level:"dificilimo", question:"Por que uma requisição assíncrona (como uma chamada de API usando fetch) pode causar comportamento inesperado em uma página se o código não for escrito considerando que a resposta não chega instantaneamente?", options:[
      "Porque, nessa interpretação incorreta, o JavaScript sempre pausa completamente a execução de qualquer código até a resposta chegar independentemente do tipo de alimento ou processo envolvido",
      "Porque, segundo essa hipótese equivocada, requisições assíncronas nunca podem ser usadas para buscar dados de um servidor externo ao longo de qualquer etapa do processo produtivo considerado",
      "Porque o JavaScript continua executando o código seguinte enquanto aguarda a resposta da requisição, e se essa ordem de execução não for tratada corretamente, o programa pode tentar usar dados que ainda não chegaram do servidor",
      "Porque, segundo essa ideia equivocada, requisições assíncronas sempre retornam a resposta de forma instantânea, sem nenhum tipo de espera real em qualquer contexto da produção industrial de alimentos"
    ], correct:2, resolution:"Requisições assíncronas não bloqueiam a execução do restante do código enquanto aguardam resposta — o JavaScript continua rodando as linhas seguintes normalmente; se o programador não usar recursos como 'async/await' ou callbacks para garantir que o código dependente da resposta só execute depois que ela chegar, o programa pode tentar usar dados que ainda não foram recebidos do servidor, causando erros ou comportamento inesperado na interface." }
    ]
  },
  "dev-sistemas__desenvolvimento-de-softwares": {
    title: "Desenvolvimento de Softwares",
    emoji: "💻",
    intro: "Desenvolvimento de softwares abrange o ciclo completo de criação de um sistema — desde o planejamento e codificação até testes e manutenção — seguindo metodologias que organizam esse processo de forma estruturada.",
    analogy: "Pense no desenvolvimento de software como a construção de uma casa: não se começa pelo telhado, e cada etapa (fundação, estrutura, acabamento) depende da anterior estar bem executada — metodologias de desenvolvimento existem para organizar essas etapas de forma que o resultado final seja sólido e funcional.",
    visual: {"type": "cycle", "steps": ["Planejamento", "Codificação", "Testes", "Manutenção"]},
    exercises: [
      { level:"facil", question:"O que é o ciclo de vida de um software?", options:[
      "O conjunto de etapas pelas quais um sistema passa, do planejamento inicial até a manutenção após seu lançamento",
      "Um documento legal exigido para registrar oficialmente a propriedade intelectual de um programa",
      "O tempo total que um computador leva para ligar e carregar completamente o sistema operacional",
      "A quantidade de linhas de código escritas por um programador durante um único dia de trabalho"
    ], correct:0, resolution:"O ciclo de vida de um software é o conjunto de etapas pelas quais um sistema passa — planejamento, análise de requisitos, codificação, testes, implantação e manutenção — desde sua concepção inicial até seu uso contínuo e eventual atualização ou descontinuação." },
      { level:"medio", question:"Por que testar um software antes de lançá-lo é considerado uma etapa essencial, e não apenas opcional?", options:[
      "Porque permite identificar erros e comportamentos inesperados antes que afetem os usuários finais do sistema",
      "Porque testar o software, nessa interpretação incorreta, serve apenas para calcular o preço final de venda do produto",
      "Porque testar o software, segundo essa ideia equivocada, é exigido apenas para sistemas destinados à exportação internacional",
      "Porque testar o software, segundo essa hipótese equivocada, elimina totalmente a necessidade de qualquer manutenção futura"
    ], correct:0, resolution:"Testar o software antes do lançamento permite identificar erros, comportamentos inesperados e falhas de segurança enquanto ainda é possível corrigi-los com menor custo e impacto, evitando que esses problemas cheguem até os usuários finais e prejudiquem a experiência ou a confiabilidade do sistema." },
      { level:"dificil", question:"Qual é a diferença entre a metodologia de desenvolvimento em cascata (waterfall) e uma metodologia ágil, como o Scrum?", options:[
      "A metodologia em cascata é usada apenas em jogos eletrônicos, e a ágil é usada exclusivamente em sistemas bancários em qualquer contexto da produção industrial de alimentos",
      "A metodologia em cascata é sempre mais rápida de executar do que qualquer metodologia ágil, independentemente do projeto ao longo de qualquer etapa do processo produtivo considerado",
      "Na cascata, as etapas do projeto são executadas em sequência linear e rígida, enquanto em metodologias ágeis o desenvolvimento ocorre em ciclos curtos e iterativos, com entregas e ajustes frequentes",
      "A metodologia em cascata nunca envolve nenhum tipo de teste do sistema, e a ágil depende inteiramente desses testes independentemente do tipo de alimento ou processo envolvido"
    ], correct:2, resolution:"Na metodologia em cascata, as etapas do projeto (planejamento, desenvolvimento, testes) seguem uma sequência linear e rígida, onde uma etapa só começa após a anterior estar completamente finalizada; nas metodologias ágeis, como o Scrum, o desenvolvimento ocorre em ciclos curtos e iterativos, com entregas parciais frequentes e ajustes de rumo conforme o feedback é recebido ao longo do projeto." },
      { level:"dificilimo", question:"Por que um projeto de software desenvolvido com metodologia ágil ainda pode falhar em atender às expectativas do cliente, mesmo entregando funcionalidades continuamente ao longo do desenvolvimento?", options:[
      "Porque entregas frequentes não garantem, por si só, que os requisitos foram bem compreendidos ou que a comunicação com o cliente sobre prioridades e mudanças foi eficaz ao longo de todo o processo",
      "Porque, nessa interpretação incorreta, entregas frequentes sempre eliminam totalmente qualquer possibilidade de mal-entendido sobre requisitos",
      "Porque, segundo essa hipótese equivocada, o sucesso de um projeto de software depende exclusivamente da metodologia escolhida, nunca da comunicação envolvida",
      "Porque, segundo essa ideia equivocada, metodologias ágeis garantem automaticamente a satisfação total do cliente em qualquer situação de projeto"
    ], correct:0, resolution:"Metodologias ágeis facilitam ajustes de rumo através de entregas frequentes, mas isso não substitui a necessidade de comunicação clara e contínua entre a equipe de desenvolvimento e o cliente sobre prioridades, requisitos e mudanças de escopo; se essa comunicação for falha, mesmo entregas frequentes podem seguir na direção errada, mostrando que a metodologia é uma ferramenta de apoio, não uma garantia automática de sucesso do projeto." }
    ]
  },
  "dev-sistemas__fundamentos-de-seguranca-de-softwares": {
    title: "Fundamentos de Segurança de Softwares",
    emoji: "🔒",
    intro: "Segurança de software envolve práticas e técnicas para proteger sistemas contra vulnerabilidades, ataques e acessos não autorizados, garantindo a confidencialidade, integridade e disponibilidade dos dados.",
    analogy: "Pense na segurança de software como as fechaduras e alarmes de uma casa: não é suficiente ter uma porta bonita (funcionalidade que funciona bem); é preciso pensar em quem poderia tentar entrar sem permissão e colocar barreiras específicas contra cada tipo de ameaça possível.",
    visual: {"type": "labeled", "center": "Segurança de Software", "parts": ["Autenticação", "Autorização", "Criptografia", "Validação de entrada"]},
    exercises: [
      { level:"facil", question:"Qual é a diferença básica entre autenticação e autorização em um sistema?", options:[
      "Autenticação é usada apenas em sistemas bancários, e autorização é usada exclusivamente em redes sociais",
      "Autenticação verifica quem é o usuário, enquanto autorização determina o que esse usuário tem permissão para fazer no sistema",
      "Autenticação e autorização são exatamente o mesmo processo, apenas com nomes diferentes usados por diferentes empresas",
      "Autenticação verifica apenas senhas fracas, e autorização verifica exclusivamente senhas consideradas fortes"
    ], correct:1, resolution:"A autenticação é o processo de verificar a identidade do usuário (por exemplo, através de login e senha), confirmando quem ele é; a autorização, por sua vez, determina quais ações e recursos aquele usuário já identificado tem permissão para acessar dentro do sistema — são etapas distintas e sequenciais." },
      { level:"medio", question:"Por que a validação de dados de entrada (como um formulário web) é uma prática essencial de segurança?", options:[
      "Porque a validação de entrada, segundo essa hipótese equivocada, elimina totalmente a necessidade de qualquer sistema de autenticação",
      "Porque impede que dados maliciosos ou mal formatados sejam processados pelo sistema, reduzindo o risco de ataques como injeção de código",
      "Porque a validação de entrada, segundo essa ideia equivocada, serve apenas para melhorar a aparência visual do formulário exibido",
      "Porque a validação de entrada, nessa interpretação incorreta, é exigida exclusivamente para formulários de pagamento online"
    ], correct:1, resolution:"Validar os dados enviados por um usuário — verificando formato, tamanho e conteúdo esperado — impede que dados maliciosos ou mal formatados sejam processados diretamente pelo sistema, reduzindo significativamente o risco de ataques como injeção de código (SQL injection) e outras vulnerabilidades comuns em aplicações web." },
      { level:"dificil", question:"Qual é a diferença entre criptografia simétrica e criptografia assimétrica na segurança de dados?", options:[
      "A criptografia simétrica nunca pode ser quebrada por nenhum tipo de ataque, e a assimétrica é sempre vulnerável a qualquer ataque",
      "A criptografia simétrica é aplicada apenas em sistemas móveis, e a assimétrica é aplicada exclusivamente em sistemas de desktop",
      "A criptografia simétrica usa a mesma chave para criptografar e descriptografar os dados, enquanto a assimétrica usa um par de chaves diferentes, uma pública e uma privada",
      "A criptografia simétrica é usada apenas para proteger senhas, e a assimétrica é usada exclusivamente para proteger imagens em qualquer contexto da produção industrial de alimentos"
    ], correct:2, resolution:"A criptografia simétrica utiliza a mesma chave tanto para criptografar quanto para descriptografar os dados, exigindo que essa chave seja compartilhada de forma segura entre as partes; a criptografia assimétrica utiliza um par de chaves matematicamente relacionadas — uma pública, que pode ser compartilhada livremente, e uma privada, que deve permanecer secreta — permitindo comunicação segura sem a necessidade de compartilhar uma chave secreta previamente." },
      { level:"dificilimo", question:"Por que um sistema pode ter todas as suas senhas armazenadas com criptografia forte e, ainda assim, ser vulnerável a um ataque bem-sucedido de roubo de dados de usuários?", options:[
      "Porque a segurança de um sistema depende de múltiplas camadas, e uma vulnerabilidade em outro ponto — como validação de entrada, controle de acesso ou uma falha de configuração — pode ser explorada independentemente da força da criptografia usada nas senhas",
      "Porque, nessa interpretação incorreta, ataques de roubo de dados só podem ocorrer em sistemas que não utilizam nenhum tipo de criptografia independentemente do tipo de alimento ou processo envolvido",
      "Porque, segundo essa ideia equivocada, criptografia forte de senhas garante automaticamente a segurança total de qualquer sistema em qualquer cenário em qualquer contexto da produção industrial de alimentos",
      "Porque, segundo essa hipótese equivocada, a força da criptografia das senhas é o único fator relevante para a segurança geral do sistema ao longo de qualquer etapa do processo produtivo considerado"
    ], correct:0, resolution:"A segurança de um sistema é construída em camadas — autenticação, autorização, validação de entrada, configuração de servidores, criptografia de dados — e uma criptografia forte protege apenas contra um tipo específico de ameaça (acesso direto aos dados armazenados); uma vulnerabilidade em qualquer outra camada, como uma falha de validação de entrada ou uma configuração incorreta de permissões, pode ser explorada por um atacante para obter acesso aos dados por um caminho totalmente diferente, independentemente da força da criptografia aplicada às senhas." }
    ]
  },
  "dev-sistemas__desenvolvimento-back-end": {
    title: "Desenvolvimento Back-End",
    emoji: "⚙️",
    intro: "Desenvolvimento Back-End trata da lógica de servidor que processa dados, aplica regras de negócio e se comunica com o banco de dados, funcionando nos bastidores de um sistema, sem interface visual direta para o usuário.",
    analogy: "Pense no back-end como a cozinha de um restaurante: o cliente (usuário) vê apenas o prato pronto na mesa (a interface), mas é na cozinha — invisível para quem está sentado à mesa — que o pedido é processado, os ingredientes são combinados corretamente e o prato é preparado antes de chegar até ele.",
    visual: {"type": "flow", "steps": ["Requisição do cliente", "Servidor processa a lógica", "Consulta ao banco de dados", "Resposta enviada ao cliente"]},
    exercises: [
      { level:"facil", question:"Qual é a função principal do back-end em um sistema web?", options:[
      "Armazenar unicamente arquivos de imagem utilizados na decoração visual do site",
      "Processar a lógica de negócio, gerenciar dados e responder às requisições enviadas pelo front-end",
      "Definir exclusivamente as cores e o layout visual exibidos na tela do usuário final",
      "Capturar apenas os cliques e as interações realizadas diretamente pelo usuário na página"
    ], correct:1, resolution:"O back-end é responsável por processar a lógica de negócio de um sistema, gerenciar o acesso e a manipulação de dados, e responder às requisições enviadas pelo front-end — a parte visual e interativa que o usuário vê diretamente é responsabilidade do front-end." },
      { level:"medio", question:"O que é uma API, comumente usada para comunicação entre front-end e back-end?", options:[
      "Um conjunto de regras e pontos de acesso que permite que diferentes sistemas ou partes de um sistema troquem informações entre si",
      "Uma API, segundo essa hipótese equivocada, é um dispositivo físico conectado diretamente ao servidor da empresa",
      "Uma API, nessa interpretação incorreta, é um programa usado exclusivamente para editar textos em um documento",
      "Uma API, segundo essa ideia equivocada, é um tipo específico de banco de dados usado apenas para armazenar imagens"
    ], correct:0, resolution:"Uma API (Interface de Programação de Aplicações) é um conjunto de regras e pontos de acesso padronizados que permite que diferentes sistemas, ou diferentes partes de um mesmo sistema — como o front-end e o back-end —, troquem informações entre si de forma organizada e previsível." },
      { level:"dificil", question:"Qual é a diferença entre uma requisição do tipo GET e uma requisição do tipo POST em uma API web?", options:[
      "O GET é usado apenas em aplicativos móveis, e o POST é usado exclusivamente em sites acessados por computador em qualquer contexto da produção industrial de alimentos",
      "O GET nunca pode ser usado para acessar um banco de dados, e o POST depende inteiramente do banco de dados para funcionar",
      "O GET é sempre mais lento tecnicamente do que o POST, independentemente do tamanho da requisição enviada independentemente do tipo de alimento ou processo envolvido",
      "O GET é usado principalmente para buscar dados sem alterá-los, enquanto o POST é usado para enviar dados que geralmente criam ou modificam algo no servidor"
    ], correct:3, resolution:"A requisição GET é usada principalmente para buscar (ler) dados de um servidor sem alterá-los, sendo apropriada para consultas; a requisição POST é usada para enviar dados ao servidor que geralmente resultam na criação ou modificação de algum recurso, como o cadastro de um novo usuário ou o envio de um formulário — a escolha correta entre os dois tipos segue convenções importantes de design de API." },
      { level:"dificilimo", question:"Por que um endpoint de API que funciona corretamente em testes isolados pode falhar quando o sistema é submetido a um grande número de requisições simultâneas?", options:[
      "Porque, nessa interpretação incorreta, requisições simultâneas nunca têm nenhuma relação real com o desempenho de um endpoint de API independentemente do tipo de alimento ou processo envolvido",
      "Porque, segundo essa ideia equivocada, um endpoint de API que funciona em teste isolado sempre funciona perfeitamente sob qualquer carga em qualquer contexto da produção industrial de alimentos",
      "Porque testes isolados geralmente não simulam condições de concorrência, e problemas como disputa por recursos compartilhados, conexões limitadas de banco de dados ou condições de corrida só aparecem sob carga real e simultânea",
      "Porque, segundo essa hipótese equivocada, problemas de concorrência só podem ocorrer em sistemas que não possuem nenhum tipo de banco de dados ao longo de qualquer etapa do processo produtivo considerado"
    ], correct:2, resolution:"Testes isolados, executados um de cada vez, não revelam problemas que só surgem quando múltiplas requisições ocorrem simultaneamente — como disputa por um mesmo recurso, limite de conexões simultâneas com o banco de dados, ou condições de corrida em que a ordem de execução afeta o resultado; por isso testes de carga e concorrência são etapas complementares importantes, além dos testes funcionais isolados, para garantir a confiabilidade de um endpoint sob uso real." }
    ]
  },
  "dev-sistemas__desenvolvimento-de-aplicativos": {
    title: "Desenvolvimento de Aplicativos",
    emoji: "📱",
    intro: "Desenvolvimento de aplicativos trata da criação de softwares voltados para dispositivos móveis, considerando particularidades como tamanho de tela, recursos do dispositivo (câmera, GPS) e diferentes plataformas, como Android e iOS.",
    analogy: "Pense no desenvolvimento de aplicativos como adaptar uma receita de restaurante para ser feita em uma cozinha de camping: os princípios básicos de culinária continuam os mesmos, mas é preciso considerar recursos limitados, espaço reduzido e condições específicas — assim como um app precisa considerar tela pequena, bateria limitada e recursos específicos do celular.",
    visual: {"type": "compare", "leftTitle": "App nativo", "leftItems": ["Desenvolvido para uma plataforma específica", "Melhor desempenho e acesso a recursos", "Requer código separado por plataforma"], "rightTitle": "App híbrido/multiplataforma", "rightItems": ["Um único código para várias plataformas", "Desenvolvimento geralmente mais rápido", "Pode ter limitações de desempenho"]},
    exercises: [
      { level:"facil", question:"O que caracteriza um aplicativo nativo, em oposição a um aplicativo web?", options:[
      "Ele é desenvolvido especificamente para uma plataforma (Android ou iOS), sendo instalado diretamente no dispositivo",
      "Ele é usado apenas para exibir páginas estáticas de conteúdo, sem nenhum tipo de interação",
      "Ele funciona exclusivamente dentro de um navegador de internet, sem nenhuma instalação necessária",
      "Ele depende sempre de uma conexão constante com a internet para funcionar em qualquer situação"
    ], correct:0, resolution:"Um aplicativo nativo é desenvolvido especificamente para uma plataforma — Android ou iOS —, usando as ferramentas e linguagens próprias de cada sistema, e é instalado diretamente no dispositivo do usuário, o que geralmente proporciona melhor desempenho e acesso mais direto aos recursos do aparelho." },
      { level:"medio", question:"Por que o desenvolvimento multiplataforma (como usar React Native ou Flutter) é atraente para muitas empresas ao criar um aplicativo?", options:[
      "Porque o desenvolvimento multiplataforma, segundo essa ideia equivocada, garante sempre um desempenho superior ao de qualquer app nativo",
      "Porque o desenvolvimento multiplataforma, segundo essa hipótese equivocada, elimina totalmente a necessidade de qualquer teste do aplicativo",
      "Porque permite escrever a maior parte do código uma única vez e reutilizá-lo em Android e iOS, reduzindo tempo e custo de desenvolvimento",
      "Porque o desenvolvimento multiplataforma, nessa interpretação incorreta, é a única forma tecnicamente permitida de publicar um aplicativo"
    ], correct:2, resolution:"Ferramentas de desenvolvimento multiplataforma permitem que grande parte do código seja escrita uma única vez e compartilhada entre Android e iOS, reduzindo significativamente o tempo e o custo de desenvolvimento em comparação a criar dois aplicativos nativos completamente separados, um para cada plataforma." },
      { level:"dificil", question:"Qual é a diferença entre um aplicativo híbrido e um aplicativo verdadeiramente multiplataforma como os criados com Flutter?", options:[
      "O aplicativo híbrido roda essencialmente como uma página web dentro de um contêiner nativo, enquanto ferramentas como Flutter compilam o código para componentes de interface nativos reais em cada plataforma",
      "O aplicativo híbrido nunca pode acessar recursos do dispositivo como câmera, e o Flutter depende inteiramente desses recursos independentemente do tipo de alimento ou processo envolvido",
      "O aplicativo híbrido é sempre gratuito para o usuário final, e aplicativos feitos com Flutter são sempre pagos obrigatoriamente ao longo de qualquer etapa do processo produtivo considerado",
      "O aplicativo híbrido é usado apenas em tablets, e aplicativos criados com Flutter são usados exclusivamente em smartphones em qualquer contexto da produção industrial de alimentos"
    ], correct:0, resolution:"Um aplicativo híbrido geralmente executa conteúdo web (HTML, CSS, JavaScript) dentro de um contêiner nativo que o exibe como se fosse um app, o que pode gerar desempenho inferior em animações complexas; ferramentas como Flutter, por outro lado, compilam o código para componentes de interface nativos reais em cada plataforma, buscando um desempenho e uma aparência mais próximos de um aplicativo verdadeiramente nativo." },
      { level:"dificilimo", question:"Por que um aplicativo multiplataforma bem otimizado ainda pode apresentar diferenças sutis de comportamento entre Android e iOS, mesmo compartilhando a maior parte do código entre as duas versões?", options:[
      "Porque, segundo essa ideia equivocada, aplicativos multiplataforma bem otimizados nunca podem, por definição, apresentar nenhum tipo de diferença entre plataformas em qualquer contexto da produção industrial de alimentos",
      "Porque cada sistema operacional tem convenções de interface, permissões e comportamentos próprios que a camada multiplataforma nem sempre consegue abstrair completamente, exigindo ajustes específicos para cada plataforma em certos pontos",
      "Porque, segundo essa hipótese equivocada, diferenças de comportamento entre plataformas só podem ocorrer em aplicativos totalmente nativos, nunca em multiplataforma ao longo de qualquer etapa do processo produtivo considerado",
      "Porque, nessa interpretação incorreta, Android e iOS são sistemas operacionais tecnicamente idênticos em absolutamente todos os seus aspectos independentemente do tipo de alimento ou processo envolvido"
    ], correct:1, resolution:"Mesmo compartilhando a maior parte do código, Android e iOS têm convenções de interface diferentes (como o comportamento de gestos e navegação), sistemas de permissões distintos e particularidades próprias de cada plataforma; a camada multiplataforma tenta abstrair essas diferenças, mas nem sempre consegue cobrir cada detalhe, exigindo que desenvolvedores façam ajustes específicos por plataforma em determinados pontos do aplicativo para garantir uma experiência adequada em ambos os sistemas." }
    ]
  },
  "eletroeletronica__introducao-a-informatica": {
    title: "Introdução à Informática",
    emoji: "🖥️",
    intro: "Introdução à Informática apresenta os conceitos básicos de hardware, software e sistemas operacionais, formando a base para quem vai trabalhar com equipamentos eletroeletrônicos que envolvem componentes computacionais.",
    analogy: "Pense no hardware como o corpo de um computador (peças físicas que você pode tocar) e o software como a mente (as instruções que dizem ao corpo o que fazer) — um computador sem software é como um corpo sem consciência, incapaz de realizar qualquer tarefa por conta própria.",
    visual: {"type": "compare", "leftTitle": "Hardware", "leftItems": ["Componentes físicos", "Processador, memória, disco", "Pode ser tocado e visto"], "rightTitle": "Software", "rightItems": ["Instruções e programas", "Sistema operacional, aplicativos", "Não tem forma física"]},
    exercises: [
      { level:"facil", question:"O que é hardware em um computador?", options:[
      "Os componentes físicos do computador, como processador, memória e disco de armazenamento",
      "Os programas e aplicativos instalados no computador para realizar tarefas específicas",
      "O conjunto de instruções escritas por um programador para resolver um problema",
      "O sistema operacional responsável por gerenciar os recursos do computador"
    ], correct:0, resolution:"Hardware são os componentes físicos e tangíveis de um computador — processador, memória RAM, disco de armazenamento, placa-mãe — diferente do software, que são os programas e instruções que rodam sobre esse hardware." },
      { level:"medio", question:"Qual é a função de um sistema operacional em um computador?", options:[
      "Gerenciar os recursos de hardware e permitir que outros programas sejam executados sobre ele",
      "O sistema operacional, segundo essa ideia equivocada, serve apenas para exibir imagens decorativas na tela inicial",
      "O sistema operacional, nessa interpretação incorreta, é usado exclusivamente para conectar o computador à internet",
      "O sistema operacional, segundo essa hipótese equivocada, substitui totalmente a necessidade de qualquer componente de hardware"
    ], correct:0, resolution:"O sistema operacional (como Windows, Linux ou macOS) gerencia os recursos de hardware do computador — processamento, memória, armazenamento — e fornece uma base sobre a qual outros programas e aplicativos podem ser executados de forma organizada." },
      { level:"dificil", question:"Qual é a diferença entre memória RAM e memória de armazenamento (como um HD ou SSD) em um computador?", options:[
      "A RAM é usada apenas para armazenar imagens, e o armazenamento é usado exclusivamente para armazenar textos digitados em qualquer contexto da produção industrial de alimentos",
      "A RAM é sempre mais barata do que qualquer tipo de armazenamento, independentemente da capacidade envolvida ao longo de qualquer etapa do processo produtivo considerado",
      "A RAM nunca perde os dados armazenados quando o computador é desligado, e o armazenamento sempre perde tudo independentemente do tipo de alimento ou processo envolvido",
      "A RAM armazena dados temporariamente enquanto o computador está ligado e em uso, enquanto o armazenamento guarda dados de forma permanente, mesmo com o computador desligado"
    ], correct:3, resolution:"A memória RAM armazena dados temporariamente enquanto o computador está ligado, sendo usada para processos em execução no momento, e perde essas informações quando o computador é desligado; a memória de armazenamento (HD ou SSD) guarda dados de forma permanente, preservando arquivos e programas mesmo sem energia." },
      { level:"dificilimo", question:"Por que um computador com processador rápido ainda pode apresentar desempenho ruim se tiver pouca memória RAM disponível para as tarefas em execução?", options:[
      "Porque, segundo essa ideia equivocada, a quantidade de memória RAM nunca tem nenhuma relação real com o desempenho geral do computador",
      "Porque, nessa interpretação incorreta, processadores rápidos sempre compensam automaticamente qualquer limitação de memória disponível",
      "Porque, segundo essa hipótese equivocada, o desempenho de um computador depende exclusivamente da velocidade do processador instalado",
      "Porque quando a RAM se esgota, o sistema precisa usar o disco de armazenamento como memória temporária, o que é muito mais lento, criando um gargalo mesmo com um processador veloz"
    ], correct:3, resolution:"Quando a memória RAM disponível se esgota, o sistema operacional recorre ao disco de armazenamento para simular memória adicional (memória virtual), um processo muito mais lento do que acessar a RAM diretamente; isso cria um gargalo de desempenho mesmo que o processador seja rápido, pois ele fica esperando dados que demoram mais para chegar do disco." }
    ]
  },
  "eletroeletronica__eletricidade-basica-e-manutencao-de-computadores": {
    title: "Eletricidade Básica e Manutenção de Computadores",
    emoji: "🔌",
    intro: "Eletricidade básica estuda os conceitos fundamentais de corrente, tensão e resistência elétrica, aplicados à manutenção preventiva e corretiva de computadores e seus componentes internos.",
    analogy: "Pense na eletricidade como o fluxo de água em um cano: a tensão é como a pressão da água, a corrente é o quanto de água realmente flui, e a resistência é o quanto o cano dificulta essa passagem — entender essa relação ajuda a diagnosticar problemas elétricos em um computador, como faria um encanador diagnosticando um vazamento.",
    visual: {"type": "labeled", "center": "Circuito Elétrico Básico", "parts": ["Tensão (Volts)", "Corrente (Amperes)", "Resistência (Ohms)", "Fonte de alimentação"]},
    exercises: [
      { level:"facil", question:"O que é tensão elétrica, em termos simples?", options:[
      "O peso físico de um componente eletrônico medido em uma balança de precisão",
      "A força que impulsiona a corrente elétrica através de um circuito, medida em volts",
      "A quantidade total de eletricidade armazenada permanentemente dentro de uma bateria comum",
      "O tempo total que um equipamento eletrônico consegue funcionar sem ser desligado"
    ], correct:1, resolution:"Tensão elétrica é a força que impulsiona a corrente através de um circuito, medida em volts — quanto maior a tensão, maior a 'pressão' que empurra os elétrons através do circuito, análoga à pressão da água em um cano." },
      { level:"medio", question:"Por que a fonte de alimentação é considerada um dos componentes mais críticos na manutenção de um computador?", options:[
      "Porque a fonte de alimentação, nessa interpretação incorreta, é usada exclusivamente para conectar o computador à internet",
      "Porque a fonte de alimentação, segundo essa hipótese equivocada, não tem nenhuma relação real com o funcionamento dos demais componentes",
      "Porque a fonte de alimentação, segundo essa ideia equivocada, serve apenas para armazenar arquivos temporários do sistema",
      "Porque fornece energia estabilizada para todos os demais componentes, e uma falha nela pode danificar o restante do sistema"
    ], correct:3, resolution:"A fonte de alimentação converte a energia da rede elétrica em tensões estáveis e adequadas para todos os componentes internos do computador; uma fonte com defeito pode fornecer tensão incorreta, danificando processador, placa-mãe e outros componentes conectados a ela." },
      { level:"dificil", question:"Qual é a diferença entre um curto-circuito e uma sobrecarga elétrica em um sistema de computador?", options:[
      "O curto-circuito ocorre apenas em componentes de memória, e a sobrecarga ocorre exclusivamente em componentes de processamento em qualquer contexto da produção industrial de alimentos",
      "O curto-circuito é causado apenas por umidade no ambiente, e a sobrecarga é causada exclusivamente por altas temperaturas externas ao longo de qualquer etapa do processo produtivo considerado",
      "O curto-circuito nunca pode danificar nenhum componente eletrônico, e a sobrecarga sempre danifica todos os componentes imediatamente independentemente do tipo de alimento ou processo envolvido",
      "O curto-circuito ocorre quando a corrente encontra um caminho de baixa resistência não previsto, gerando pico repentino de corrente, enquanto a sobrecarga é o excesso sustentado de corrente além da capacidade do circuito"
    ], correct:3, resolution:"O curto-circuito acontece quando a corrente elétrica encontra um caminho de resistência muito baixa que não deveria existir (como dois fios se tocando diretamente), causando um pico repentino e intenso de corrente; a sobrecarga é o fornecimento de corrente além da capacidade suportada pelo circuito de forma sustentada, geralmente por excesso de dispositivos conectados a uma mesma fonte." },
      { level:"dificilimo", question:"Por que um técnico de manutenção precisa medir tanto a tensão quanto a corrente ao diagnosticar um componente com suspeita de defeito elétrico, em vez de medir apenas uma dessas grandezas?", options:[
      "Porque tensão e corrente juntas revelam a resistência real do componente através da Lei de Ohm, e um problema pode se manifestar de forma diferente dependendo de qual grandeza está fora do padrão esperado",
      "Porque, nessa interpretação incorreta, medir apenas a corrente elétrica sempre é suficiente para diagnosticar qualquer defeito independentemente do tipo de alimento ou processo envolvido",
      "Porque, segundo essa ideia equivocada, tensão e corrente são exatamente a mesma grandeza física medida de formas diferentes em qualquer contexto da produção industrial de alimentos",
      "Porque, segundo essa hipótese equivocada, a resistência de um componente nunca pode ser calculada a partir de tensão e corrente ao longo de qualquer etapa do processo produtivo considerado"
    ], correct:0, resolution:"Pela Lei de Ohm, tensão, corrente e resistência estão matematicamente relacionadas; medir apenas uma grandeza isoladamente pode não revelar a causa real do problema — um componente pode apresentar tensão normal mas corrente anormal (indicando resistência alterada), então medir as duas grandezas juntas permite calcular a resistência real e diagnosticar com mais precisão onde está o defeito." }
    ]
  },
  "eletroeletronica__eletromagnetismo": {
    title: "Eletromagnetismo",
    emoji: "🧲",
    intro: "Eletromagnetismo estuda a relação entre eletricidade e magnetismo — como correntes elétricas geram campos magnéticos e vice-versa — princípio fundamental por trás de motores, geradores e transformadores.",
    analogy: "Pense no eletromagnetismo como uma via de mão dupla entre dois bairros vizinhos: assim como é possível ir de um bairro a outro em qualquer direção, a eletricidade pode gerar magnetismo (como em um eletroímã) e o magnetismo pode gerar eletricidade (como em um gerador) — os dois fenômenos estão profundamente conectados.",
    visual: {"type": "cycle", "steps": ["Corrente elétrica", "Campo magnético gerado", "Campo magnético variável", "Corrente elétrica induzida"]},
    exercises: [
      { level:"facil", question:"O que é um eletroímã?", options:[
      "Um ímã criado através da passagem de corrente elétrica por um fio enrolado, geralmente em torno de um núcleo de ferro",
      "Um componente utilizado unicamente para armazenar dados digitais em um computador independentemente do tipo de alimento ou processo envolvido",
      "Um dispositivo usado apenas para medir a temperatura de componentes eletrônicos em qualquer contexto da produção industrial de alimentos",
      "Um tipo específico de bateria usada exclusivamente em equipamentos de grande porte industrial"
    ], correct:0, resolution:"Um eletroímã é um tipo de ímã criado pela passagem de corrente elétrica através de um fio enrolado (geralmente em torno de um núcleo de material ferromagnético), gerando um campo magnético que existe apenas enquanto há corrente circulando — diferente de um ímã permanente." },
      { level:"medio", question:"Por que um gerador elétrico consegue produzir eletricidade a partir de movimento mecânico, como o giro de uma turbina?", options:[
      "Porque o gerador, nessa interpretação incorreta, converte diretamente calor em eletricidade, sem envolver nenhum princípio magnético",
      "Porque o gerador, segundo essa hipótese equivocada, armazena eletricidade previamente gerada por outra fonte externa",
      "Porque o gerador, segundo essa ideia equivocada, cria eletricidade do nada, sem nenhuma relação com movimento ou magnetismo",
      "Porque o movimento de um condutor dentro de um campo magnético induz uma corrente elétrica nesse condutor, fenômeno conhecido como indução eletromagnética"
    ], correct:3, resolution:"Quando um condutor se move dentro de um campo magnético (ou quando o campo magnético varia em relação a um condutor parado), uma corrente elétrica é induzida nesse condutor — esse fenômeno, chamado indução eletromagnética, é o princípio físico que permite a geradores transformarem energia mecânica (como o giro de uma turbina) em energia elétrica." },
      { level:"dificil", question:"Qual é o princípio de funcionamento de um transformador elétrico, usado para elevar ou reduzir tensão em uma rede de energia?", options:[
      "Um transformador usa a variação de corrente em uma bobina primária para induzir uma tensão diferente em uma bobina secundária, através de um campo magnético compartilhado por um núcleo comum",
      "Um transformador converte diretamente corrente elétrica em luz, sendo usado principalmente para fins de iluminação pública independentemente do tipo de alimento ou processo envolvido",
      "Um transformador funciona exclusivamente através de reações químicas internas, sem envolver nenhum princípio magnético ao longo de qualquer etapa do processo produtivo considerado",
      "Um transformador armazena energia elétrica internamente e a libera lentamente ao longo de várias horas de uso contínuo em qualquer contexto da produção industrial de alimentos"
    ], correct:0, resolution:"Um transformador possui duas bobinas (primária e secundária) enroladas em torno de um núcleo comum; a corrente alternada na bobina primária cria um campo magnético variável, que por indução gera uma tensão na bobina secundária — a relação entre o número de voltas de cada bobina determina se a tensão será elevada ou reduzida na saída." },
      { level:"dificilimo", question:"Por que um transformador funciona corretamente apenas com corrente alternada (CA), e não com corrente contínua (CC)?", options:[
      "Porque, nessa interpretação incorreta, transformadores foram projetados apenas para funcionar com tensões muito baixas de corrente contínua independentemente do tipo de alimento ou processo envolvido",
      "Porque, segundo essa ideia equivocada, corrente contínua nunca consegue gerar absolutamente nenhum tipo de campo magnético ao seu redor em qualquer contexto da produção industrial de alimentos",
      "Porque o princípio de indução eletromagnética depende de um campo magnético variável no tempo, e a corrente alternada naturalmente varia, enquanto a corrente contínua constante não gera essa variação necessária",
      "Porque, segundo essa hipótese equivocada, corrente alternada e corrente contínua produzem exatamente o mesmo efeito em qualquer transformador ao longo de qualquer etapa do processo produtivo considerado"
    ], correct:2, resolution:"A indução eletromagnética que permite ao transformador funcionar depende de um campo magnético que varia constantemente ao longo do tempo; a corrente alternada (CA) naturalmente inverte de direção periodicamente, criando essa variação necessária, enquanto a corrente contínua (CC) constante gera um campo magnético estável, sem variação, que não é capaz de induzir tensão na bobina secundária — por isso transformadores convencionais não funcionam com corrente contínua." }
    ]
  },
  "eletroeletronica__geracao-transmissao-e-distribuicao-de-energia-eletrica": {
    title: "Geração, Transmissão e Distribuição de Energia Elétrica",
    emoji: "⚡",
    intro: "Este campo estuda como a energia elétrica é produzida em usinas, transportada por longas distâncias através de linhas de transmissão em alta tensão, e distribuída até residências e indústrias em tensões mais seguras para uso cotidiano.",
    analogy: "Pense no sistema elétrico como o sistema de distribuição de água de uma cidade: a usina é como a represa que produz o recurso, as linhas de transmissão são como os grandes encanamentos principais que levam água por longas distâncias, e a rede de distribuição é como os canos menores que chegam até a torneira de cada casa.",
    visual: {"type": "flow", "steps": ["Usina geradora", "Elevação de tensão", "Linha de transmissão", "Rede de distribuição"]},
    exercises: [
      { level:"facil", question:"Por que a energia elétrica é transportada em alta tensão nas linhas de transmissão de longa distância?", options:[
      "Porque a alta tensão, nessa interpretação incorreta, é exigida apenas por questões estéticas das torres de transmissão",
      "Porque a alta tensão, segundo essa hipótese equivocada, elimina totalmente qualquer tipo de perda de energia durante o transporte",
      "Porque a alta tensão, segundo essa ideia equivocada, torna o transporte de energia mais lento e seguro para o consumidor final",
      "Porque, para uma mesma potência, tensões mais altas exigem correntes menores, o que reduz as perdas de energia por aquecimento nos cabos"
    ], correct:3, resolution:"Para transportar uma mesma quantidade de potência, usar tensões mais altas permite usar correntes elétricas menores; como as perdas de energia por aquecimento nos cabos (efeito Joule) dependem do quadrado da corrente, correntes menores resultam em perdas significativamente menores ao longo de grandes distâncias de transmissão." },
      { level:"medio", question:"Por que a tensão precisa ser reduzida em subestações antes de a energia chegar às residências?", options:[
      "Porque a redução de tensão, segundo essa ideia equivocada, serve apenas para diminuir o valor da conta de energia elétrica do consumidor",
      "Porque a alta tensão usada na transmissão é perigosa e incompatível com os equipamentos elétricos domésticos, que operam em tensões muito mais baixas",
      "Porque a redução de tensão, segundo essa hipótese equivocada, não tem nenhuma relação real com a segurança do usuário final",
      "Porque a redução de tensão, nessa interpretação incorreta, é feita exclusivamente por exigência estética das instalações residenciais"
    ], correct:1, resolution:"As linhas de transmissão operam em tensões muito altas, perigosas e incompatíveis diretamente com equipamentos domésticos; subestações reduzem progressivamente essa tensão através de transformadores até chegar a níveis seguros e padronizados para uso em residências e pequenos estabelecimentos." },
      { level:"dificil", question:"Qual é a diferença entre geração de energia centralizada (como uma grande usina hidrelétrica) e geração distribuída (como painéis solares residenciais)?", options:[
      "A geração centralizada produz energia em grande escala em um único ponto, exigindo transmissão por longas distâncias, enquanto a geração distribuída produz energia próxima ao local de consumo, reduzindo a necessidade de transporte",
      "A geração centralizada é usada apenas em países desenvolvidos, e a geração distribuída é usada exclusivamente em países em desenvolvimento em qualquer contexto da produção industrial de alimentos",
      "A geração centralizada nunca pode utilizar fontes renováveis de energia, e a geração distribuída depende inteiramente delas independentemente do tipo de alimento ou processo envolvido",
      "A geração centralizada produz sempre energia mais barata do que qualquer forma de geração distribuída, em qualquer situação ao longo de qualquer etapa do processo produtivo considerado"
    ], correct:0, resolution:"A geração centralizada concentra a produção de energia em grandes usinas (hidrelétricas, termelétricas), exigindo transmissão por longas distâncias até os consumidores; a geração distribuída produz energia em pequena escala próxima ao ponto de consumo, como painéis solares em telhados residenciais, reduzindo a dependência de transmissão de longa distância e suas perdas associadas." },
      { level:"dificilimo", question:"Por que a integração de muitas fontes de geração distribuída (como painéis solares residenciais) na rede elétrica tradicional pode criar desafios técnicos que não existiam quando a energia vinha apenas de grandes usinas centralizadas?", options:[
      "Porque, segundo essa ideia equivocada, painéis solares residenciais nunca geram energia suficiente para causar qualquer impacto real na rede em qualquer contexto da produção industrial de alimentos",
      "Porque a rede elétrica tradicional foi projetada para fluxo de energia em uma única direção (da usina ao consumidor), e múltiplas fontes distribuídas gerando energia simultaneamente podem inverter esse fluxo em certos pontos, exigindo novos sistemas de controle e proteção",
      "Porque, segundo essa hipótese equivocada, a integração de fontes distribuídas elimina totalmente a necessidade de qualquer sistema de proteção elétrica ao longo de qualquer etapa do processo produtivo considerado",
      "Porque, nessa interpretação incorreta, a rede elétrica tradicional foi originalmente projetada considerando fluxo de energia em qualquer direção possível independentemente do tipo de alimento ou processo envolvido"
    ], correct:1, resolution:"A rede elétrica tradicional foi historicamente projetada para um fluxo unidirecional de energia — da usina centralizada até o consumidor final; quando muitos consumidores passam a gerar sua própria energia (como com painéis solares) e injetam o excedente de volta na rede, o fluxo pode se inverter em certos trechos, o que exige sistemas de proteção, medição e controle adaptados a essa nova realidade, diferente do modelo unidirecional original." }
    ]
  },
  "eletroeletronica__eletronica-digital": {
    title: "Eletrônica Digital",
    emoji: "💾",
    intro: "Eletrônica digital trabalha com sinais discretos, geralmente representados por dois estados (0 e 1), usando portas lógicas para processar informação — a base de funcionamento de praticamente todos os dispositivos digitais modernos.",
    analogy: "Pense em um sinal digital como um interruptor de luz simples: ele só tem dois estados possíveis, ligado ou desligado, sem meio-termo — diferente de um dimmer (sinal analógico), que pode assumir qualquer intensidade intermediária. A eletrônica digital constrói toda a computação moderna a partir dessa simplicidade de apenas dois estados.",
    visual: {"type": "labeled", "center": "Portas Lógicas", "parts": ["AND (E)", "OR (OU)", "NOT (NÃO)", "XOR (OU exclusivo)"]},
    exercises: [
      { level:"facil", question:"O que caracteriza um sinal digital, em oposição a um sinal analógico?", options:[
      "O sinal digital pode assumir qualquer valor contínuo dentro de uma faixa determinada de intensidade",
      "O sinal digital assume apenas valores discretos, geralmente representados por dois estados (0 e 1)",
      "O sinal digital sempre tem intensidade fixa e constante, sem nenhuma variação possível ao longo do tempo",
      "O sinal digital é usado exclusivamente em equipamentos de áudio, nunca em outros dispositivos eletrônicos"
    ], correct:1, resolution:"Um sinal digital assume apenas valores discretos, tipicamente representados por dois estados (0 e 1, ou 'desligado' e 'ligado'), diferente de um sinal analógico, que pode variar de forma contínua entre qualquer valor dentro de uma faixa." },
      { level:"medio", question:"Qual é a função de uma porta lógica AND (E) em um circuito digital?", options:[
      "A porta AND, nessa interpretação incorreta, inverte o valor lógico de uma única entrada recebida pelo circuito",
      "A porta AND, segundo essa hipótese equivocada, é usada exclusivamente para amplificar o sinal elétrico recebido",
      "Produzir saída 1 (verdadeiro) apenas quando todas as suas entradas forem 1 (verdadeiras) ao mesmo tempo",
      "A porta AND, segundo essa ideia equivocada, produz saída 1 sempre que pelo menos uma das entradas for 1"
    ], correct:2, resolution:"A porta lógica AND produz saída 1 (verdadeiro) apenas quando todas as suas entradas são 1 ao mesmo tempo; se qualquer uma das entradas for 0, a saída também será 0 — o mesmo princípio do operador lógico E usado em programação." },
      { level:"dificil", question:"Qual é a diferença entre um circuito combinacional e um circuito sequencial em eletrônica digital?", options:[
      "O circuito combinacional é sempre mais lento do que qualquer circuito sequencial, independentemente da aplicação envolvida",
      "O circuito combinacional produz saída baseada apenas nas entradas atuais, enquanto o circuito sequencial também depende de estados anteriores armazenados em memória",
      "O circuito combinacional é usado apenas em calculadoras, e o circuito sequencial é usado exclusivamente em relógios digitais",
      "O circuito combinacional nunca utiliza nenhum tipo de porta lógica, e o circuito sequencial depende inteiramente delas em qualquer contexto da produção industrial de alimentos"
    ], correct:1, resolution:"Um circuito combinacional produz sua saída baseada exclusivamente nas entradas presentes naquele momento, sem memória de estados anteriores; um circuito sequencial, por outro lado, incorpora elementos de memória (como flip-flops), fazendo com que sua saída dependa também do histórico de estados anteriores, não apenas das entradas atuais." },
      { level:"dificilimo", question:"Por que a combinação de portas lógicas simples (AND, OR, NOT) é suficiente, em princípio, para construir qualquer circuito digital complexo, incluindo um processador inteiro de computador?", options:[
      "Porque, segundo essa ideia equivocada, processadores modernos não utilizam, na prática, nenhum tipo de porta lógica em seu funcionamento interno em qualquer contexto da produção industrial de alimentos",
      "Porque, segundo essa hipótese equivocada, portas lógicas simples só conseguem processar no máximo duas entradas por vez, limitando sua aplicação prática ao longo de qualquer etapa do processo produtivo considerado",
      "Porque, nessa interpretação incorreta, apenas a porta lógica AND é realmente necessária para construir qualquer circuito digital complexo independentemente do tipo de alimento ou processo envolvido",
      "Porque qualquer função lógica, por mais complexa que seja, pode ser expressa matematicamente como uma combinação dessas operações básicas, permitindo construir circuitos cada vez mais sofisticados a partir desses blocos fundamentais"
    ], correct:3, resolution:"A álgebra booleana demonstra que qualquer função lógica, por mais complexa que seja, pode ser expressa como uma combinação de operações básicas como AND, OR e NOT; a partir dessas portas fundamentais, é possível construir circuitos cada vez mais complexos — somadores, memórias, unidades de processamento — até chegar a um processador completo, todos fundamentalmente construídos a partir dessas operações lógicas elementares combinadas em grande escala." }
    ]
  },
  "eletroeletronica__desenho-tecnico-e-assistido-por-computador-cad": {
    title: "Desenho Técnico e Assistido por Computador (CAD)",
    emoji: "📐",
    intro: "Desenho técnico e CAD envolvem a representação padronizada de projetos elétricos e eletrônicos, cada vez mais realizados com o auxílio de softwares especializados que aumentam precisão e produtividade.",
    analogy: "Pense no CAD como a diferença entre escrever uma carta à mão e digitá-la em um processador de texto: o resultado final pode ser tecnicamente parecido, mas o software permite corrigir erros rapidamente, reutilizar partes do trabalho e manter uma precisão muito maior do que seria possível manualmente.",
    visual: {"type": "labeled", "center": "Desenho Técnico Elétrico", "parts": ["Escala", "Símbolos padronizados", "Cotas e medidas", "Legenda"]},
    exercises: [
      { level:"facil", question:"O que é CAD (Desenho Assistido por Computador)?", options:[
      "Um documento legal exigido para o registro de qualquer projeto elétrico junto ao governo",
      "Um tipo de componente eletrônico usado exclusivamente em circuitos de alta potência industrial",
      "O uso de softwares especializados para criar e editar desenhos técnicos com maior precisão e produtividade",
      "Um equipamento físico usado apenas para medir a tensão elétrica de um circuito"
    ], correct:2, resolution:"CAD (Computer-Aided Design, ou Desenho Assistido por Computador) é o uso de softwares especializados para criar, editar e revisar desenhos técnicos com maior precisão, produtividade e facilidade de correção do que seria possível fazendo os desenhos manualmente." },
      { level:"medio", question:"Por que o uso de símbolos padronizados em um desenho técnico elétrico é importante?", options:[
      "Porque os símbolos padronizados, segundo essa ideia equivocada, servem apenas para deixar o desenho mais bonito visualmente",
      "Porque os símbolos padronizados, segundo essa hipótese equivocada, eliminam totalmente a necessidade de qualquer legenda no desenho",
      "Porque os símbolos padronizados, nessa interpretação incorreta, são exigidos exclusivamente para projetos destinados à exportação",
      "Porque garante que qualquer técnico ou engenheiro, em qualquer lugar, interprete o desenho da mesma forma, evitando ambiguidade"
    ], correct:3, resolution:"Símbolos padronizados (definidos por normas técnicas) garantem que qualquer profissional qualificado, em qualquer lugar, interprete corretamente o significado de cada elemento do desenho — como um interruptor, uma tomada ou um disjuntor — evitando ambiguidades que poderiam levar a erros de instalação." },
      { level:"dificil", question:"Qual é a vantagem de um projeto elétrico feito em CAD com camadas (layers) organizadas por tipo de instalação, em vez de um único desenho com tudo misturado?", options:[
      "Camadas organizadas, segundo essa ideia equivocada, servem apenas para reduzir o tamanho do arquivo digital do projeto em qualquer contexto da produção industrial de alimentos",
      "Camadas organizadas, segundo essa hipótese equivocada, eliminam totalmente a necessidade de revisão do projeto antes da execução ao longo de qualquer etapa do processo produtivo considerado",
      "Permite visualizar, editar ou ocultar seletivamente diferentes sistemas (elétrico, hidráulico, estrutural) de forma independente, facilitando a análise e evitando conflitos entre eles",
      "Camadas organizadas, nessa interpretação incorreta, são exigidas exclusivamente para projetos de pequeno porte residencial independentemente do tipo de alimento ou processo envolvido"
    ], correct:2, resolution:"Organizar um projeto em camadas (layers) permite que diferentes sistemas — instalação elétrica, hidráulica, estrutural — sejam visualizados, editados ou ocultados de forma independente dentro do mesmo arquivo, o que facilita identificar possíveis conflitos entre sistemas (como um cabo elétrico cruzando uma tubulação) antes mesmo da execução física da obra." },
      { level:"dificilimo", question:"Por que um erro de escala em um desenho técnico elétrico produzido em CAD pode ser mais difícil de perceber visualmente do que um erro equivalente em um desenho manual?", options:[
      "Porque, segundo essa hipótese equivocada, erros de escala em softwares CAD são sempre corrigidos automaticamente pelo próprio programa ao longo de qualquer etapa do processo produtivo considerado",
      "Porque o software CAD ajusta automaticamente a exibição na tela conforme o zoom aplicado, o que pode mascarar visualmente um erro de escala real que só se manifesta quando o desenho é impresso ou comparado com medidas físicas reais",
      "Porque, segundo essa ideia equivocada, softwares de CAD nunca permitem que o usuário configure ou altere a escala de um desenho técnico em qualquer contexto da produção industrial de alimentos",
      "Porque, nessa interpretação incorreta, desenhos manuais são sempre tecnicamente mais precisos em termos de escala do que qualquer desenho em CAD independentemente do tipo de alimento ou processo envolvido"
    ], correct:1, resolution:"Ao trabalhar em um software CAD, o usuário pode aplicar zoom livremente na tela, o que faz um elemento aparecer no tamanho visual desejado independentemente da escala real configurada no arquivo; isso pode mascarar um erro de escala que só se torna evidente quando o desenho é impresso em um tamanho físico específico ou comparado com medidas reais no campo, diferente de um desenho manual, onde a escala geralmente é mais perceptível diretamente no papel." }
    ]
  },
  "eletroeletronica__projetos-eletricos-e-automacao-industrial": {
    title: "Projetos Elétricos e Automação Industrial",
    emoji: "🏭",
    intro: "Projetos elétricos e automação industrial envolvem o planejamento de sistemas elétricos para plantas industriais e a implementação de controles automatizados que reduzem a necessidade de intervenção manual constante nos processos.",
    analogy: "Pense na automação industrial como a diferença entre dirigir um carro manual e usar um piloto automático: o piloto automático não elimina totalmente a necessidade de supervisão, mas assume tarefas repetitivas de controle, permitindo que o operador humano foque em decisões mais estratégicas e no monitoramento geral do sistema.",
    visual: {"type": "flow", "steps": ["Sensor detecta variável", "Controlador processa dados", "Atuador executa ação", "Processo ajustado"]},
    exercises: [
      { level:"facil", question:"O que é automação industrial?", options:[
      "Um documento legal exigido para o registro de uma nova fábrica junto ao governo estadual",
      "Um imposto cobrado sobre o volume total de energia elétrica consumido pela indústria em qualquer contexto da produção industrial de alimentos",
      "O uso de sistemas de controle automatizados para executar tarefas em um processo produtivo com pouca intervenção manual",
      "Um tipo de seguro contratado exclusivamente para proteger equipamentos industriais contra roubo"
    ], correct:2, resolution:"Automação industrial é o uso de sistemas de controle — sensores, controladores, atuadores — para executar tarefas de um processo produtivo com o mínimo de intervenção manual constante, aumentando eficiência, consistência e segurança do processo." },
      { level:"medio", question:"Qual é a função de um CLP (Controlador Lógico Programável) em um sistema de automação industrial?", options:[
      "O CLP, nessa interpretação incorreta, é usado exclusivamente para calcular o salário dos operadores da linha de produção",
      "O CLP, segundo essa ideia equivocada, serve apenas para armazenar arquivos de imagem relacionados ao processo produtivo",
      "Receber sinais de sensores, processar essa informação segundo uma lógica programada e enviar comandos para atuadores controlarem o processo",
      "O CLP, segundo essa hipótese equivocada, substitui totalmente a necessidade de qualquer sensor no processo automatizado"
    ], correct:2, resolution:"O CLP (Controlador Lógico Programável) recebe sinais de sensores instalados no processo, processa essas informações de acordo com uma lógica previamente programada, e envia comandos para atuadores (como motores e válvulas) que executam ações de controle sobre o processo produtivo." },
      { level:"dificil", question:"Por que um projeto elétrico industrial precisa considerar tanto a demanda de energia atual quanto uma margem para expansão futura?", options:[
      "Porque subdimensionar o sistema elétrico pode limitar a capacidade produtiva futura da fábrica, enquanto reprojetar tudo posteriormente costuma ser muito mais caro do que planejar a margem desde o início",
      "Porque a demanda futura de energia, nessa interpretação incorreta, nunca pode ser estimada com nenhuma precisão técnica real independentemente do tipo de alimento ou processo envolvido",
      "Porque margem de expansão, segundo essa hipótese equivocada, é relevante apenas para instalações elétricas residenciais, nunca industriais ao longo de qualquer etapa do processo produtivo considerado",
      "Porque a legislação brasileira, segundo essa ideia equivocada, exige margem de expansão apenas para fábricas de grande porte em qualquer contexto da produção industrial de alimentos"
    ], correct:0, resolution:"Projetar um sistema elétrico industrial apenas para a demanda atual pode limitar seriamente a capacidade de a fábrica crescer no futuro — adicionar novas máquinas ou linhas de produção exigiria refazer boa parte da infraestrutura elétrica; planejar uma margem de expansão desde o início, mesmo com custo inicial um pouco maior, costuma ser muito mais econômico do que reprojetar todo o sistema posteriormente." },
      { level:"dificilimo", question:"Por que a integração de um sistema de automação novo com equipamentos industriais mais antigos pode representar um desafio técnico maior do que instalar automação em uma fábrica totalmente nova?", options:[
      "Porque equipamentos antigos podem não ter interfaces de comunicação compatíveis com sistemas modernos, exigindo adaptadores, conversores de protocolo ou modificações que aumentam a complexidade e o risco do projeto",
      "Porque, nessa interpretação incorreta, fábricas totalmente novas nunca enfrentam nenhum tipo de desafio técnico durante a instalação de automação em qualquer contexto da produção industrial de alimentos",
      "Porque, segundo essa hipótese equivocada, a idade de um equipamento industrial nunca tem nenhuma relação real com sua compatibilidade tecnológica independentemente do tipo de alimento ou processo envolvido",
      "Porque, segundo essa ideia equivocada, equipamentos industriais antigos nunca podem, sob nenhuma circunstância, ser integrados a qualquer sistema de automação"
    ], correct:0, resolution:"Equipamentos industriais mais antigos frequentemente utilizam protocolos de comunicação, tensões de sinal ou interfaces diferentes dos padrões usados em sistemas de automação modernos; integrar esses equipamentos legados pode exigir adaptadores, conversores de protocolo específicos ou até modificações físicas no equipamento, aumentando a complexidade, o tempo e o risco do projeto em comparação com implementar automação em uma planta industrial já projetada com tecnologia atual desde o início." }
    ]
  },
  "eletroeletronica__logica-de-programacao": {
    title: "Lógica de Programação",
    emoji: "🧮",
    intro: "Lógica de programação é a base do raciocínio usado para criar sequências de instruções que resolvem problemas — fundamental tanto para programar sistemas embarcados quanto controladores usados em automação eletroeletrônica.",
    analogy: "Pense na lógica de programação como uma receita de bolo extremamente detalhada: cada instrução precisa ser clara, sem ambiguidade, e seguir uma ordem específica — se você pular um passo ou mudar a ordem, o resultado final pode sair completamente diferente do esperado.",
    visual: {"type": "flow", "steps": ["Entrada de dados", "Processamento lógico", "Tomada de decisão", "Saída de resultado"]},
    exercises: [
      { level:"facil", question:"O que é um algoritmo, em termos de lógica de programação?", options:[
      "Um tipo específico de linguagem de programação usada apenas para desenvolvimento web moderno",
      "Uma sequência finita e ordenada de instruções para resolver um problema específico",
      "Um equipamento físico usado para medir o desempenho de um computador em tempo real",
      "Um erro comum no código que impede o programa de ser executado corretamente pelo sistema"
    ], correct:1, resolution:"Um algoritmo é uma sequência finita e ordenada de instruções bem definidas, criada para resolver um problema específico ou realizar uma tarefa — pode ser expresso em linguagem natural, fluxograma ou código de programação." },
      { level:"medio", question:"Qual é a função de uma estrutura condicional (if/else) na lógica de programação?", options:[
      "A estrutura condicional, segundo essa ideia equivocada, serve apenas para repetir uma mesma ação várias vezes seguidas",
      "A estrutura condicional, segundo essa hipótese equivocada, elimina totalmente a necessidade de qualquer variável no programa",
      "A estrutura condicional, nessa interpretação incorreta, é usada exclusivamente para armazenar valores numéricos temporariamente",
      "Permitir que o programa tome decisões diferentes dependendo se uma condição é verdadeira ou falsa"
    ], correct:3, resolution:"Uma estrutura condicional (if/else) permite que o programa avalie uma condição e execute um caminho diferente de instruções dependendo se essa condição é verdadeira ou falsa, permitindo que o programa 'decida' entre diferentes cursos de ação." },
      { level:"dificil", question:"Qual é a diferença entre um laço de repetição controlado por contador (como um for) e um laço controlado por condição (como um while)?", options:[
      "O laço controlado por contador nunca pode ser interrompido antes do fim, e o controlado por condição pode ser interrompido a qualquer momento em qualquer contexto da produção industrial de alimentos",
      "O laço controlado por contador é sempre mais rápido tecnicamente, e o controlado por condição é sempre mais lento em qualquer situação independentemente do tipo de alimento ou processo envolvido",
      "O laço controlado por contador repete uma ação um número predefinido de vezes, enquanto o controlado por condição repete enquanto uma condição específica permanecer verdadeira, sem número fixo de repetições",
      "O laço controlado por contador é usado apenas em linguagens antigas de programação, e o controlado por condição é usado exclusivamente em linguagens modernas"
    ], correct:2, resolution:"Um laço controlado por contador (como um for) repete uma ação um número predefinido de vezes, conhecido antes mesmo de o laço começar a executar; um laço controlado por condição (como um while) repete enquanto uma determinada condição permanecer verdadeira, sem que o número exato de repetições seja necessariamente conhecido de antemão, dependendo de como a condição evolui durante a execução." },
      { level:"dificilimo", question:"Por que um programa de controle embarcado, usado em um equipamento eletroeletrônico industrial, precisa ser projetado com cuidado especial para evitar laços de repetição que dependam de tempo de execução variável?", options:[
      "Porque, segundo essa ideia equivocada, sistemas embarcados nunca precisam responder a nenhum tipo de evento físico do equipamento controlado em qualquer contexto da produção industrial de alimentos",
      "Porque sistemas embarcados de controle frequentemente precisam responder em tempo real a eventos físicos, e um laço com tempo de execução imprevisível pode atrasar essa resposta, comprometendo a segurança ou o funcionamento correto do equipamento controlado",
      "Porque, segundo essa hipótese equivocada, o tempo de resposta de um sistema de controle nunca tem nenhuma relação real com a segurança do equipamento ao longo de qualquer etapa do processo produtivo considerado",
      "Porque, nessa interpretação incorreta, laços de repetição com tempo variável sempre executam exatamente na mesma velocidade em qualquer situação independentemente do tipo de alimento ou processo envolvido"
    ], correct:1, resolution:"Sistemas embarcados usados em controle industrial frequentemente precisam reagir a eventos físicos dentro de um intervalo de tempo previsível e curto (tempo real); um laço de repetição cujo tempo de execução varia de forma imprevisível pode atrasar a resposta do sistema além do tolerável para aquele processo, o que em aplicações críticas — como controle de um motor ou de um sistema de segurança — pode comprometer o funcionamento correto ou até a segurança do equipamento controlado." }
    ]
  },
  "eletroeletronica__sistemas-eletricos-de-acionamento-e-eletronica-de-potencia": {
    title: "Sistemas Elétricos de Acionamento e Eletrônica de Potência",
    emoji: "🔋",
    intro: "Sistemas de acionamento controlam o funcionamento de motores e equipamentos elétricos industriais, enquanto a eletrônica de potência trata da conversão e controle eficiente de energia elétrica em altas correntes e tensões.",
    analogy: "Pense em um sistema de acionamento como o pedal de aceleração de um carro elétrico: em vez de apenas ligar ou desligar o motor de forma abrupta, ele permite um controle fino de quanto de energia é entregue, resultando em partidas mais suaves e maior controle sobre a velocidade e o torque do motor.",
    visual: {"type": "labeled", "center": "Acionamento de Motor", "parts": ["Contator", "Relé de proteção", "Inversor de frequência", "Motor elétrico"]},
    exercises: [
      { level:"facil", question:"Qual é a função de um contator em um sistema de acionamento elétrico?", options:[
      "Ligar e desligar o circuito de alimentação de um motor ou equipamento, geralmente de forma remota ou automatizada",
      "Armazenar energia elétrica para uso posterior em caso de falta de energia da rede em qualquer contexto da produção industrial de alimentos",
      "Medir exclusivamente a temperatura interna de um motor elétrico durante seu funcionamento",
      "Converter corrente contínua em corrente alternada dentro de um sistema industrial independentemente do tipo de alimento ou processo envolvido"
    ], correct:0, resolution:"Um contator é um dispositivo eletromecânico usado para ligar e desligar o circuito de alimentação de um motor ou equipamento, geralmente acionado remotamente ou de forma automatizada por um sistema de controle, permitindo o controle seguro de cargas elétricas maiores." },
      { level:"medio", question:"Por que um inversor de frequência é usado para controlar a velocidade de um motor elétrico, em vez de simplesmente ligá-lo e desligá-lo?", options:[
      "Porque o inversor de frequência, segundo essa ideia equivocada, serve apenas para aumentar artificialmente o tamanho físico do motor",
      "Porque permite variar a velocidade do motor de forma gradual e controlada, reduzindo desgaste mecânico e consumo de energia desnecessário",
      "Porque o inversor de frequência, segundo essa hipótese equivocada, elimina totalmente a necessidade de qualquer manutenção do motor",
      "Porque o inversor de frequência, nessa interpretação incorreta, é usado exclusivamente para motores localizados em ambientes externos"
    ], correct:1, resolution:"Um inversor de frequência permite variar a velocidade de um motor de indução de forma gradual e controlada, ajustando a frequência da corrente fornecida a ele; isso reduz o desgaste mecânico causado por partidas abruptas e permite ajustar o consumo de energia à necessidade real do processo, em vez de operar sempre na velocidade máxima." },
      { level:"dificil", question:"Qual é a diferença entre uma partida direta e uma partida suave (soft-starter) de um motor elétrico industrial?", options:[
      "A partida direta é usada apenas em motores pequenos, e a partida suave é usada exclusivamente em motores de grande porte industrial em qualquer contexto da produção industrial de alimentos",
      "A partida direta é sempre mais cara de implementar, e a partida suave é sempre um investimento totalmente gratuito para a empresa ao longo de qualquer etapa do processo produtivo considerado",
      "A partida direta aplica tensão plena imediatamente, gerando um pico alto de corrente inicial, enquanto a partida suave aumenta a tensão gradualmente, reduzindo esse pico e o estresse mecânico no motor",
      "A partida direta nunca consome nenhum tipo de corrente elétrica adicional, e a partida suave sempre consome mais energia total independentemente do tipo de alimento ou processo envolvido"
    ], correct:2, resolution:"Na partida direta, o motor recebe tensão plena imediatamente ao ser ligado, o que gera um pico de corrente inicial elevado (podendo chegar a várias vezes a corrente nominal), além de estresse mecânico repentino; a partida suave (soft-starter) aumenta a tensão de forma gradual ao longo de alguns segundos, reduzindo tanto o pico de corrente quanto o impacto mecânico sobre o motor e a carga acoplada a ele." },
      { level:"dificilimo", question:"Por que a escolha entre um inversor de frequência e um soft-starter para controlar um motor depende mais da aplicação específica do que apenas do custo de cada equipamento?", options:[
      "Porque, nessa interpretação incorreta, o custo desses equipamentos nunca tem nenhuma relação real com a decisão técnica de qual utilizar independentemente do tipo de alimento ou processo envolvido ao longo de qualquer etapa do processo produtivo considerado",
      "Porque, segundo essa hipótese equivocada, soft-starters conseguem oferecer controle contínuo de velocidade durante toda a operação do motor mesmo em situações consideradas tecnicamente controladas segundo essa mesma linha de raciocínio equivocada apresentada",
      "Porque o inversor de frequência permite controle contínuo de velocidade durante toda a operação, enquanto o soft-starter atua principalmente na partida, retornando à operação em velocidade fixa depois — cada aplicação tem necessidades diferentes de controle ao longo do processo",
      "Porque, segundo essa ideia equivocada, inversores de frequência e soft-starters realizam exatamente a mesma função técnica em qualquer aplicação em qualquer contexto da produção industrial de alimentos"
    ], correct:2, resolution:"Um inversor de frequência oferece controle contínuo de velocidade ao longo de toda a operação do motor, sendo adequado para processos que exigem ajustes constantes; um soft-starter atua principalmente na fase de partida, suavizando o início do movimento, mas depois disso o motor volta a operar em velocidade fixa — a escolha entre os dois depende de qual comportamento a aplicação realmente precisa ao longo do processo, não apenas do custo de cada solução." }
    ]
  },
  "eletroeletronica__projetos": {
    title: "Projetos em Eletroeletrônica",
    emoji: "📋",
    intro: "A disciplina de Projetos integra os conhecimentos técnicos de eletroeletrônica em um trabalho prático completo, desde o planejamento inicial até a execução e documentação de um sistema elétrico ou eletrônico real.",
    analogy: "Pense em um projeto de eletroeletrônica como montar um quebra-cabeça complexo: cada disciplina estudada anteriormente — eletricidade, eletrônica, automação, desenho técnico — é uma peça, e o projeto final é onde todas essas peças precisam se encaixar corretamente para formar um resultado funcional e coerente.",
    visual: {"type": "cycle", "steps": ["Levantamento de requisitos", "Planejamento técnico", "Execução e testes", "Documentação final"]},
    exercises: [
      { level:"facil", question:"Qual é a primeira etapa importante ao iniciar um projeto de eletroeletrônica?", options:[
      "Iniciar a montagem física do circuito antes de qualquer planejamento prévio detalhado",
      "Definir apenas o preço final de venda do produto que será desenvolvido no projeto",
      "Comprar imediatamente todos os componentes eletrônicos disponíveis no mercado local",
      "Levantar os requisitos e as necessidades específicas do sistema que será projetado"
    ], correct:3, resolution:"Antes de qualquer planejamento técnico ou execução física, é fundamental levantar os requisitos e as necessidades específicas do projeto — o que o sistema precisa fazer, em quais condições vai operar, quais restrições existem — para embasar corretamente as decisões técnicas seguintes." },
      { level:"medio", question:"Por que a documentação técnica de um projeto de eletroeletrônica é importante mesmo depois que o sistema já está funcionando?", options:[
      "Porque a documentação técnica, segundo essa ideia equivocada, é exigida apenas para projetos destinados à exportação internacional",
      "Porque a documentação técnica, nessa interpretação incorreta, serve apenas para efeitos estéticos de apresentação do projeto",
      "Porque a documentação técnica, segundo essa hipótese equivocada, elimina totalmente a necessidade de qualquer manutenção futura do sistema",
      "Porque facilita futuras manutenções, expansões ou correções, permitindo que outra pessoa entenda o sistema sem precisar refazer todo o processo de investigação"
    ], correct:3, resolution:"Uma boa documentação técnica — esquemas elétricos, especificações de componentes, lógica de funcionamento — permite que qualquer técnico, mesmo que não tenha participado do projeto original, entenda como o sistema funciona e possa realizar manutenções, correções ou expansões futuras sem precisar refazer todo o processo de investigação do zero." },
      { level:"dificil", question:"Por que testes intermediários ao longo da execução de um projeto de eletroeletrônica são mais eficazes do que testar apenas o sistema completo no final?", options:[
      "Porque permitem identificar e corrigir problemas em etapas isoladas, antes que eles se acumulem ou se tornem mais difíceis de diagnosticar em um sistema totalmente integrado",
      "Porque testes intermediários, nessa interpretação incorreta, eliminam totalmente a necessidade de qualquer teste final do sistema",
      "Porque testes intermediários, segundo essa ideia equivocada, são exigidos apenas em projetos de grande porte industrial em qualquer contexto da produção industrial de alimentos",
      "Porque testes intermediários, segundo essa hipótese equivocada, servem apenas para calcular o custo total do projeto em andamento"
    ], correct:0, resolution:"Testar cada etapa ou subsistema de forma isolada durante a execução do projeto permite identificar problemas específicos logo que surgem, quando ainda são mais fáceis de diagnosticar e corrigir; deixar todos os testes apenas para o final aumenta o risco de múltiplos problemas se sobreporem, tornando muito mais difícil identificar a causa raiz de uma falha em um sistema já totalmente integrado." },
      { level:"dificilimo", question:"Por que um projeto de eletroeletrônica tecnicamente bem executado ainda pode ser considerado malsucedido se o levantamento inicial de requisitos foi feito de forma superficial?", options:[
      "Porque, segundo essa ideia equivocada, a qualidade técnica de execução é sempre o único fator relevante para o sucesso de qualquer projeto em qualquer contexto da produção industrial de alimentos",
      "Porque, nessa interpretação incorreta, requisitos mal levantados nunca têm nenhuma relação real com o resultado final entregue ao cliente independentemente do tipo de alimento ou processo envolvido",
      "Porque, segundo essa hipótese equivocada, projetos tecnicamente bem executados são sempre considerados automaticamente bem-sucedidos ao longo de qualquer etapa do processo produtivo considerado",
      "Porque a qualidade técnica da execução não compensa a entrega de um sistema que não resolve corretamente o problema real do cliente ou usuário final, caso os requisitos não tenham sido bem compreendidos desde o início"
    ], correct:3, resolution:"Um projeto pode ser executado com excelência técnica — componentes bem escolhidos, montagem impecável, código eficiente — e ainda assim ser malsucedido se resolver o problema errado, porque o levantamento inicial de requisitos não captou corretamente a real necessidade do cliente ou usuário final; a qualidade técnica da execução não compensa a entrega de uma solução que não atende ao propósito verdadeiro do projeto." }
    ]
  },
  "eletroeletronica__instalacoes-eletricas": {
    title: "Instalações Elétricas",
    emoji: "🔧",
    intro: "Instalações elétricas envolvem o planejamento e execução de sistemas de fiação, disjuntores e pontos de energia em edificações residenciais, comerciais e industriais, seguindo normas técnicas de segurança.",
    analogy: "Pense em uma instalação elétrica como o sistema circulatório de um prédio: os cabos são como veias e artérias levando energia (sangue) até cada 'órgão' (tomada, lâmpada, equipamento), e os disjuntores funcionam como válvulas de segurança que interrompem o fluxo automaticamente se algo sair do controle, protegendo todo o sistema.",
    visual: {"type": "labeled", "center": "Instalação Elétrica", "parts": ["Quadro de distribuição", "Disjuntor", "Fiação", "Aterramento"]},
    exercises: [
      { level:"facil", question:"Qual é a função de um disjuntor em uma instalação elétrica?", options:[
      "Armazenar energia elétrica para uso posterior em caso de falta de energia da rede em qualquer contexto da produção industrial de alimentos",
      "Medir exclusivamente o consumo total de energia elétrica ao longo de um mês inteiro independentemente do tipo de alimento ou processo envolvido",
      "Interromper automaticamente a passagem de corrente elétrica em caso de sobrecarga ou curto-circuito, protegendo o circuito",
      "Aumentar artificialmente a tensão elétrica disponível em um ponto específico da instalação"
    ], correct:2, resolution:"O disjuntor é um dispositivo de proteção que interrompe automaticamente a passagem de corrente elétrica quando detecta uma condição anormal, como sobrecarga ou curto-circuito, protegendo o restante do circuito e evitando danos maiores ou incêndios." },
      { level:"medio", question:"Por que o aterramento é considerado um elemento essencial de segurança em uma instalação elétrica?", options:[
      "Porque o aterramento, segundo essa ideia equivocada, serve apenas para melhorar a qualidade do sinal de internet da residência",
      "Porque o aterramento, nessa interpretação incorreta, é exigido exclusivamente para instalações elétricas de grande porte industrial",
      "Porque o aterramento, segundo essa hipótese equivocada, elimina totalmente a necessidade de qualquer disjuntor na instalação",
      "Porque oferece um caminho seguro para a corrente elétrica em caso de falha, reduzindo o risco de choque elétrico em pessoas que toquem o equipamento"
    ], correct:3, resolution:"O aterramento oferece um caminho de baixa resistência para a corrente elétrica escoar com segurança para o solo em caso de uma falha no isolamento de um equipamento, reduzindo significativamente o risco de choque elétrico em uma pessoa que venha a tocar acidentalmente esse equipamento com defeito." },
      { level:"dificil", question:"Por que o dimensionamento correto da bitola (espessura) dos fios é tão importante quanto a escolha do disjuntor em uma instalação elétrica?", options:[
      "Porque um fio subdimensionado pode superaquecer antes mesmo de o disjuntor detectar uma sobrecarga, já que disjuntor e fio precisam estar tecnicamente compatíveis entre si para que a proteção funcione corretamente",
      "Porque a bitola do fio, nessa interpretação incorreta, não tem nenhuma relação real com a capacidade de corrente suportada independentemente do tipo de alimento ou processo envolvido",
      "Porque a bitola do fio, segundo essa hipótese equivocada, é relevante apenas para instalações elétricas externas ao imóvel ao longo de qualquer etapa do processo produtivo considerado",
      "Porque a bitola do fio, segundo essa ideia equivocada, determina exclusivamente a cor da capa externa do cabo elétrico em qualquer contexto da produção industrial de alimentos"
    ], correct:0, resolution:"Cada bitola de fio suporta uma corrente máxima específica antes de superaquecer perigosamente; se o disjuntor escolhido permitir uma corrente maior do que o fio consegue suportar com segurança, o fio pode superaquecer antes mesmo de o disjuntor atuar, já que a proteção do disjuntor precisa estar tecnicamente compatível com a capacidade do fio para funcionar corretamente como sistema de segurança integrado." },
      { level:"dificilimo", question:"Por que uma instalação elétrica residencial pode passar por anos sem apresentar problemas visíveis e, ainda assim, representar um risco real de incêndio decorrente de um erro de dimensionamento cometido na instalação original?", options:[
      "Porque, nessa interpretação incorreta, instalações elétricas residenciais nunca apresentam nenhum tipo de risco real de incêndio independentemente do tipo de alimento ou processo envolvido ao longo de qualquer etapa do processo produtivo considerado",
      "Porque, segundo essa hipótese equivocada, o tempo de uso de uma instalação elétrica não tem nenhuma relação real com sua segurança mesmo em situações consideradas tecnicamente controladas segundo essa mesma linha de raciocínio equivocada apresentada",
      "Porque, segundo essa ideia equivocada, erros de dimensionamento em instalações elétricas sempre se manifestam imediatamente após a instalação em qualquer contexto da produção industrial de alimentos",
      "Porque o superaquecimento gradual de conexões ou fios subdimensionados pode ser um processo lento e cumulativo, sem sintomas visíveis imediatos, até que uma condição específica de uso — como ligar vários equipamentos simultaneamente — eleve a demanda a um ponto crítico"
    ], correct:3, resolution:"Um erro de dimensionamento, como um fio ligeiramente subdimensionado para a carga que costuma ser conectada a ele, pode não gerar problemas perceptíveis em condições normais de uso ao longo de anos; mas o superaquecimento das conexões e do próprio fio, mesmo que gradual e cumulativo, degrada a isolação elétrica ao longo do tempo, e uma condição específica — como conectar vários equipamentos de alta potência simultaneamente em um único circuito — pode elevar subitamente a demanda a um ponto crítico, revelando um risco que estava latente desde a instalação original." }
    ]
  },
  "eletronica__eletricidade-basica-e-circuitos-eletricos": {
    title: "Eletricidade Básica e Circuitos Elétricos",
    emoji: "🔋",
    intro: "Eletricidade básica e circuitos elétricos estudam os conceitos fundamentais de tensão, corrente e resistência, além de como esses elementos se combinam em circuitos série, paralelo e mistos.",
    analogy: "Pense num circuito elétrico como uma pista de corrida com pistas paralelas ou uma única pista sequencial: em um circuito série, os carros (elétrons) passam um atrás do outro pelo mesmo caminho único; em um circuito paralelo, existem várias pistas independentes que os carros podem escolher para chegar ao destino.",
    visual: {"type": "compare", "leftTitle": "Circuito Série", "leftItems": ["Um único caminho", "Mesma corrente em todos os pontos", "Se um componente falha, o circuito todo para"], "rightTitle": "Circuito Paralelo", "rightItems": ["Vários caminhos independentes", "Mesma tensão em cada ramo", "Se um componente falha, os demais continuam"]},
    exercises: [
      { level:"facil", question:"O que caracteriza um circuito elétrico em série?", options:[
      "A corrente elétrica se divide automaticamente entre vários caminhos diferentes possíveis",
      "Os componentes estão conectados em um único caminho, e a mesma corrente passa por todos eles",
      "Os componentes estão conectados em caminhos totalmente independentes uns dos outros",
      "A tensão aplicada é sempre igual em cada componente do circuito, independentemente da posição"
    ], correct:1, resolution:"Em um circuito série, os componentes estão conectados em um único caminho sequencial, e a mesma corrente elétrica passa por todos eles; se um componente falhar ou o caminho for interrompido em qualquer ponto, todo o circuito deixa de funcionar." },
      { level:"medio", question:"Por que, em um circuito paralelo, cada ramo pode continuar funcionando mesmo que outro ramo seja interrompido?", options:[
      "Porque, nessa interpretação incorreta, a corrente elétrica em um circuito paralelo nunca pode ser interrompida por nenhum motivo",
      "Porque, segundo essa hipótese equivocada, todos os ramos de um circuito paralelo compartilham obrigatoriamente o mesmo caminho físico",
      "Porque, segundo essa ideia equivocada, circuitos paralelos nunca utilizam nenhum tipo de fonte de tensão compartilhada entre os ramos",
      "Porque cada ramo tem seu próprio caminho independente conectado à mesma fonte de tensão, sem depender da continuidade dos demais ramos"
    ], correct:3, resolution:"Em um circuito paralelo, cada ramo é conectado independentemente à mesma fonte de tensão, formando caminhos distintos para a corrente elétrica; se um ramo for interrompido, os demais continuam recebendo tensão e funcionando normalmente, pois não dependem da continuidade física daquele ramo específico." },
      { level:"dificil", question:"Como a Lei de Ohm (V = R × I) se aplica para calcular a resistência equivalente de resistores associados em série?", options:[
      "A resistência equivalente em série é a soma simples das resistências individuais, já que a mesma corrente atravessa todos os resistores, e as quedas de tensão se somam",
      "A resistência equivalente em série é calculada dividindo a soma das resistências pelo número total de resistores presentes",
      "A resistência equivalente em série é sempre menor do que qualquer uma das resistências individuais presentes no circuito independentemente do tipo de alimento ou processo envolvido",
      "A resistência equivalente em série é sempre igual à menor resistência entre todos os resistores conectados no circuito em qualquer contexto da produção industrial de alimentos"
    ], correct:0, resolution:"Como a mesma corrente passa por todos os resistores em série, e cada um gera uma queda de tensão proporcional à sua resistência (pela Lei de Ohm), a resistência total equivalente do circuito é simplesmente a soma aritmética de todas as resistências individuais associadas em série." },
      { level:"dificilimo", question:"Por que a resistência equivalente de resistores associados em paralelo é sempre menor do que a menor resistência individual presente no circuito?", options:[
      "Porque cada resistor adicional em paralelo oferece um caminho extra para a corrente fluir, aumentando a condutância total do circuito, o que equivale a reduzir a resistência total abaixo de qualquer resistência isolada",
      "Porque, segundo essa hipótese equivocada, apenas o resistor de maior valor determina totalmente a resistência equivalente do circuito paralelo ao longo de qualquer etapa do processo produtivo considerado",
      "Porque, nessa interpretação incorreta, a resistência equivalente em paralelo é sempre igual à soma simples das resistências individuais independentemente do tipo de alimento ou processo envolvido",
      "Porque, segundo essa ideia equivocada, resistores em paralelo sempre cancelam completamente a resistência uns dos outros no circuito em qualquer contexto da produção industrial de alimentos"
    ], correct:0, resolution:"Cada resistor adicionado em paralelo cria um novo caminho alternativo para a corrente elétrica fluir, o que aumenta a condutância total do circuito (o inverso da resistência); matematicamente, isso significa que o inverso da resistência equivalente é a soma dos inversos de cada resistência individual, resultando sempre em uma resistência equivalente menor do que a menor resistência isolada presente no circuito." }
    ]
  },
  "eletronica__desenho-tecnico-aplicado-cad-eda": {
    title: "Desenho Técnico Aplicado (CAD/EDA)",
    emoji: "🖊️",
    intro: "Desenho técnico aplicado à eletrônica combina ferramentas CAD (desenho assistido por computador) com EDA (automação de projeto eletrônico), usadas especificamente para desenhar esquemas de circuitos e layouts de placas de circuito impresso.",
    analogy: "Pense no EDA como um CAD especializado para o mundo invisível da eletrônica: enquanto um CAD comum desenha objetos físicos visíveis, como uma peça mecânica, o software EDA desenha trilhas de cobre e componentes eletrônicos que, montados juntos, formam um circuito funcional dentro de uma placa.",
    visual: {"type": "labeled", "center": "Ferramentas EDA", "parts": ["Esquemático elétrico", "Layout de PCB", "Lista de componentes (BOM)", "Simulação de circuito"]},
    exercises: [
      { level:"facil", question:"O que é um esquemático elétrico, criado com ferramentas de desenho técnico eletrônico?", options:[
      "Uma representação gráfica que mostra como os componentes de um circuito estão conectados eletricamente entre si",
      "Um relatório financeiro que detalha o custo total de fabricação de uma placa eletrônica",
      "Um documento legal exigido para o registro de patente de um novo produto eletrônico",
      "Um manual de instruções voltado exclusivamente para o usuário final do produto eletrônico"
    ], correct:0, resolution:"Um esquemático elétrico é uma representação gráfica padronizada que mostra como os componentes de um circuito — resistores, capacitores, circuitos integrados — estão conectados eletricamente entre si, usando símbolos específicos para cada tipo de componente." },
      { level:"medio", question:"Qual é a diferença entre o esquemático de um circuito e o layout da placa de circuito impresso (PCB)?", options:[
      "O esquemático, segundo essa ideia equivocada, é usado apenas para fins decorativos, sem nenhuma função técnica real em qualquer contexto da produção industrial de alimentos",
      "O layout, nessa interpretação incorreta, é criado antes do esquemático em qualquer projeto de placa eletrônica independentemente do tipo de alimento ou processo envolvido",
      "O esquemático e o layout são, segundo essa hipótese equivocada, sempre exatamente o mesmo tipo de documento técnico ao longo de qualquer etapa do processo produtivo considerado",
      "O esquemático mostra as conexões elétricas lógicas entre os componentes, enquanto o layout define a posição física real desses componentes e das trilhas de cobre na placa"
    ], correct:3, resolution:"O esquemático representa as conexões elétricas lógicas entre os componentes de forma abstrata, sem se preocupar com posição física; já o layout de PCB traduz essas conexões lógicas em um desenho físico real, definindo onde cada componente será posicionado na placa e como as trilhas de cobre serão traçadas fisicamente para conectá-los." },
      { level:"dificil", question:"Por que o roteamento de trilhas em uma placa de circuito impresso precisa considerar não apenas a conectividade elétrica, mas também fatores como interferência eletromagnética entre trilhas próximas?", options:[
      "Porque, segundo essa hipótese equivocada, qualquer disposição física das trilhas produz exatamente o mesmo resultado elétrico final ao longo de qualquer etapa do processo produtivo considerado",
      "Porque trilhas muito próximas, especialmente em sinais de alta frequência, podem induzir interferência umas nas outras, comprometendo o funcionamento correto do circuito mesmo com todas as conexões eletricamente corretas",
      "Porque o roteamento de trilhas, segundo essa ideia equivocada, nunca tem nenhuma relação real com o desempenho elétrico do circuito em qualquer contexto da produção industrial de alimentos",
      "Porque a interferência eletromagnética, nessa interpretação incorreta, só ocorre em circuitos que não possuem nenhum tipo de trilha de cobre independentemente do tipo de alimento ou processo envolvido"
    ], correct:1, resolution:"Trilhas de cobre muito próximas, especialmente quando conduzem sinais de alta frequência, podem gerar interferência eletromagnética entre si (efeito conhecido como crosstalk), afetando a integridade dos sinais mesmo que todas as conexões estejam eletricamente corretas do ponto de vista lógico; por isso o roteamento físico precisa considerar espaçamento, comprimento e disposição das trilhas, não apenas garantir a conectividade correta entre os pontos." },
      { level:"dificilimo", question:"Por que um projeto de PCB aprovado em simulação de esquemático ainda pode apresentar mau funcionamento após a fabricação física da placa?", options:[
      "Porque a simulação de esquemático avalia principalmente a lógica das conexões elétricas, mas efeitos físicos reais — como resistência das trilhas, capacitância parasita e interferência entre componentes próximos — só se manifestam completamente na placa fabricada",
      "Porque, nessa interpretação incorreta, placas fabricadas nunca podem, sob nenhuma circunstância, funcionar de forma diferente do que foi simulado independentemente do tipo de alimento ou processo envolvido",
      "Porque, segundo essa ideia equivocada, simulações de esquemático são sempre uma garantia absoluta e infalível do funcionamento físico da placa em qualquer contexto da produção industrial de alimentos",
      "Porque, segundo essa hipótese equivocada, a fabricação física de uma PCB nunca introduz nenhum tipo de efeito elétrico não previsto ao longo de qualquer etapa do processo produtivo considerado"
    ], correct:0, resolution:"A simulação de esquemático avalia principalmente o comportamento lógico e teórico das conexões elétricas planejadas, mas não captura completamente todos os efeitos físicos reais que surgem apenas na placa fabricada — como a resistência real das trilhas de cobre, capacitâncias parasitas entre trilhas próximas e interferências eletromagnéticas específicas do layout físico — fatores que podem causar comportamento diferente do previsto na simulação puramente lógica." }
    ]
  },
  "eletronica__eletronica": {
    title: "Fundamentos de Eletrônica Analógica",
    emoji: "🔧",
    intro: "Eletrônica analógica estuda componentes que trabalham com sinais contínuos e variáveis — como diodos, transistores e amplificadores operacionais — formando a base para circuitos que processam sinais do mundo real, como som e temperatura.",
    analogy: "Pense em um sinal analógico como o volume de uma torneira que pode ser ajustado gradualmente, do fio d'água ao jato máximo, ao contrário de um interruptor de luz simples, que só tem ligado ou desligado — componentes analógicos como transistores permitem esse controle gradual e contínuo de corrente elétrica.",
    visual: {"type": "labeled", "center": "Eletrônica Analógica", "parts": ["Diodo", "Transistor", "Amplificador operacional", "Capacitor"]},
    exercises: [
      { level:"facil", question:"Qual é a função básica de um diodo em um circuito eletrônico?", options:[
      "Armazenar energia elétrica temporariamente para liberação em um momento posterior",
      "Amplificar o sinal elétrico que passa através dele, aumentando sua intensidade original",
      "Permitir a passagem de corrente elétrica em apenas uma direção, bloqueando o fluxo na direção contrária",
      "Converter diretamente energia elétrica em energia luminosa visível ao olho humano"
    ], correct:2, resolution:"Um diodo é um componente semicondutor que permite a passagem de corrente elétrica em apenas uma direção (sentido direto), bloqueando o fluxo na direção oposta (sentido reverso) — uma função fundamental para retificação de sinais e proteção de circuitos." },
      { level:"medio", question:"Por que um transistor pode funcionar tanto como amplificador quanto como chave eletrônica?", options:[
      "Porque o transistor, nessa interpretação incorreta, armazena energia elétrica internamente como se fosse uma pequena bateria independentemente do tipo de alimento ou processo envolvido",
      "Porque o transistor, segundo essa hipótese equivocada, converte diretamente corrente contínua em corrente alternada em qualquer aplicação ao longo de qualquer etapa do processo produtivo considerado",
      "Porque uma pequena variação na corrente ou tensão aplicada em um terminal do transistor pode controlar de forma proporcional ou total uma corrente muito maior circulando entre os outros dois terminais",
      "Porque o transistor, segundo essa ideia equivocada, só consegue funcionar como amplificador, nunca como chave eletrônica em qualquer contexto da produção industrial de alimentos"
    ], correct:2, resolution:"O transistor controla uma corrente maior entre dois de seus terminais a partir de uma corrente ou tensão menor aplicada em um terceiro terminal; quando essa relação é usada de forma proporcional, o transistor amplifica sinais, e quando é usada em seus extremos (totalmente ligado ou desligado), ele funciona como uma chave eletrônica controlada eletricamente." },
      { level:"dificil", question:"Qual é a diferença fundamental entre um circuito retificador de meia onda e um retificador de onda completa?", options:[
      "O retificador de meia onda aproveita apenas metade do ciclo da corrente alternada, enquanto o de onda completa aproveita ambos os semiciclos, resultando em uma saída mais estável e eficiente",
      "O retificador de meia onda nunca utiliza nenhum tipo de diodo, e o de onda completa depende inteiramente de diodos para funcionar independentemente do tipo de alimento ou processo envolvido",
      "O retificador de meia onda converte corrente contínua em alternada, e o de onda completa faz exatamente o processo inverso ao longo de qualquer etapa do processo produtivo considerado",
      "O retificador de meia onda é usado apenas em circuitos de baixa tensão, e o de onda completa é usado exclusivamente em alta tensão em qualquer contexto da produção industrial de alimentos"
    ], correct:0, resolution:"O retificador de meia onda utiliza apenas um diodo e aproveita somente metade do ciclo da corrente alternada (o semiciclo positivo, por exemplo), descartando a outra metade; o retificador de onda completa utiliza uma configuração com mais diodos que aproveita ambos os semiciclos da corrente alternada, resultando em uma saída de corrente contínua mais estável, com menos ondulação (ripple) e maior eficiência de conversão." },
      { level:"dificilimo", question:"Por que um amplificador operacional (Op-Amp) idealizado como tendo ganho infinito ainda funciona de forma estável e previsível em circuitos práticos com realimentação negativa?", options:[
      "Porque, nessa interpretação incorreta, a realimentação negativa elimina completamente qualquer ganho do circuito, resultando em saída sempre nula independentemente do tipo de alimento ou processo envolvido",
      "Porque, segundo essa hipótese equivocada, o ganho infinito teórico de um amplificador operacional se traduz diretamente em instabilidade absoluta na prática ao longo de qualquer etapa do processo produtivo considerado",
      "Porque, segundo essa ideia equivocada, amplificadores operacionais reais nunca de fato possuem nenhum tipo de ganho interno elevado em qualquer contexto da produção industrial de alimentos",
      "Porque a realimentação negativa cria um mecanismo de autocorreção que limita o ganho efetivo do circuito a um valor determinado pelos componentes externos, tornando o comportamento previsível independentemente do altíssimo ganho interno do amplificador"
    ], correct:3, resolution:"Embora um Op-Amp idealizado tenha ganho interno extremamente alto (teoricamente infinito), a realimentação negativa — parte do sinal de saída sendo redirecionada de volta à entrada — cria um mecanismo de autocorreção que limita o ganho efetivo do circuito ao valor determinado pelos resistores e outros componentes externos escolhidos pelo projetista, tornando o comportamento do circuito previsível e estável, independentemente do ganho interno bruto do amplificador." }
    ]
  },
  "eletronica__instalacao-eletrica-de-baixa-tensao": {
    title: "Instalação Elétrica de Baixa Tensão",
    emoji: "🔌",
    intro: "Instalação elétrica de baixa tensão trata do planejamento e execução de sistemas elétricos residenciais e comerciais que operam nas tensões padronizadas de uso cotidiano, seguindo normas técnicas de segurança.",
    analogy: "Pense na instalação de baixa tensão como o encanamento interno de uma casa, ajustado para a pressão de água segura para uso doméstico: assim como não se conecta diretamente um cano de alta pressão industrial a uma torneira de banheiro, instalações elétricas de baixa tensão são especificamente projetadas para lidar com as tensões seguras usadas em residências e pequenos comércios.",
    visual: {"type": "labeled", "center": "Instalação de Baixa Tensão", "parts": ["Quadro de distribuição", "Disjuntores individuais", "Tomadas e interruptores", "Fiação dimensionada"]},
    exercises: [
      { level:"facil", question:"O que caracteriza uma instalação elétrica de baixa tensão?", options:[
      "Um sistema elétrico usado exclusivamente em grandes usinas de geração de energia em qualquer contexto da produção industrial de alimentos",
      "Um sistema elétrico que opera nas tensões padronizadas de uso residencial e comercial comum, geralmente até 1000 volts",
      "Um sistema elétrico reservado exclusivamente para equipamentos médicos de uso hospitalar",
      "Um sistema elétrico que funciona apenas com corrente elétrica contínua, nunca alternada"
    ], correct:1, resolution:"A instalação elétrica de baixa tensão opera dentro das faixas padronizadas para uso residencial, comercial e de pequenas indústrias, geralmente até 1000 volts em corrente alternada, sendo o tipo de instalação mais comum encontrado em edificações do dia a dia." },
      { level:"medio", question:"Por que cada circuito de uma instalação residencial (como iluminação e tomadas) costuma ter seu próprio disjuntor separado?", options:[
      "Porque isso permite que uma falha em um circuito específico seja isolada, sem interromper o funcionamento de toda a instalação elétrica da residência",
      "Porque disjuntores separados, segundo essa ideia equivocada, servem apenas para reduzir o valor total da conta de energia",
      "Porque disjuntores separados, nessa interpretação incorreta, são exigidos exclusivamente para instalações elétricas comerciais",
      "Porque disjuntores separados, segundo essa hipótese equivocada, aumentam artificialmente a tensão disponível em cada circuito"
    ], correct:0, resolution:"Separar circuitos em disjuntores individuais permite que uma falha ou sobrecarga em um circuito específico — como o de tomadas de uma cozinha — seja isolada e desligada sem afetar o funcionamento dos demais circuitos da residência, como a iluminação de outros cômodos, facilitando também a manutenção." },
      { level:"dificil", question:"Por que o dimensionamento de uma instalação elétrica residencial precisa considerar a demanda simultânea de equipamentos, e não apenas a soma da potência de todos os aparelhos instalados?", options:[
      "Porque raramente todos os equipamentos de uma residência são usados ao mesmo tempo, então dimensionar pela soma total geralmente resultaria em um sistema superdimensionado e mais caro do que o necessário na prática",
      "Porque a demanda simultânea, segundo essa ideia equivocada, é sempre exatamente igual à soma total de potência de todos os equipamentos em qualquer contexto da produção industrial de alimentos",
      "Porque o dimensionamento por demanda simultânea, nessa interpretação incorreta, é proibido pela legislação técnica brasileira em qualquer instalação independentemente do tipo de alimento ou processo envolvido",
      "Porque considerar a demanda simultânea, segundo essa hipótese equivocada, elimina totalmente a necessidade de qualquer disjuntor na instalação ao longo de qualquer etapa do processo produtivo considerado"
    ], correct:0, resolution:"Na prática, é incomum que todos os equipamentos elétricos de uma residência estejam ligados ao mesmo tempo com potência máxima simultaneamente; por isso normas técnicas de dimensionamento consideram um fator de demanda, que estima o uso real esperado, evitando superdimensionar o sistema (e encarecê-lo desnecessariamente) sem comprometer a segurança do uso cotidiano." },
      { level:"dificilimo", question:"Por que uma instalação elétrica pode atender rigorosamente a todas as normas técnicas no momento da instalação e, anos depois, se tornar inadequada sem que nenhuma modificação tenha sido feita nela?", options:[
      "Porque o perfil de consumo elétrico de uma residência tende a mudar ao longo dos anos com a aquisição de novos equipamentos, e uma instalação dimensionada para o consumo original pode se tornar insuficiente para a demanda real posterior, mesmo sem alteração física na fiação",
      "Porque, nessa interpretação incorreta, uma instalação elétrica aprovada uma vez permanece tecnicamente adequada para sempre, independentemente do uso ao longo de qualquer etapa do processo produtivo considerado",
      "Porque, segundo essa hipótese equivocada, o consumo elétrico de uma residência é sempre exatamente constante ao longo de décadas de uso mesmo em situações consideradas tecnicamente controladas segundo essa mesma linha de raciocínio equivocada apresentada",
      "Porque, segundo essa ideia equivocada, normas técnicas de instalação elétrica nunca mudam ao longo do tempo em nenhuma circunstância em qualquer contexto da produção industrial de alimentos independentemente do tipo de alimento ou processo envolvido"
    ], correct:0, resolution:"O perfil de consumo elétrico de uma residência costuma aumentar ao longo dos anos com a aquisição de novos equipamentos — ar-condicionado, carregadores, eletrodomésticos adicionais — e uma instalação originalmente bem dimensionada para o consumo da época pode se tornar insuficiente para a demanda real anos depois, mesmo que nenhuma modificação física tenha sido feita na fiação original, exigindo reavaliação periódica da capacidade da instalação." }
    ]
  },
  "eletronica__manutencao-eletroeletronica-basica": {
    title: "Manutenção Eletroeletrônica Básica",
    emoji: "🛠️",
    intro: "Manutenção eletroeletrônica básica envolve o diagnóstico e reparo de defeitos comuns em equipamentos elétricos e eletrônicos, utilizando ferramentas de medição e um processo estruturado de identificação de falhas.",
    analogy: "Pense na manutenção de um equipamento eletrônico como o trabalho de um médico diagnosticando um paciente: em vez de tratar aleatoriamente sintomas isolados, um bom diagnóstico segue um processo lógico — observar sintomas, medir sinais vitais, formular hipóteses e testá-las — até encontrar a causa raiz real do problema.",
    visual: {"type": "flow", "steps": ["Observação do defeito", "Medição com instrumentos", "Formulação de hipótese", "Teste e confirmação"]},
    exercises: [
      { level:"facil", question:"Qual é a primeira etapa recomendada ao diagnosticar um defeito em um equipamento eletrônico?", options:[
      "Desmontar completamente o equipamento antes de verificar qualquer sintoma apresentado",
      "Comprar peças de reposição para todos os componentes possivelmente relacionados ao defeito",
      "Substituir imediatamente todos os componentes do equipamento sem nenhuma investigação prévia",
      "Observar cuidadosamente os sintomas apresentados pelo equipamento antes de qualquer intervenção física"
    ], correct:3, resolution:"Antes de qualquer intervenção física ou substituição de componentes, é fundamental observar cuidadosamente os sintomas apresentados pelo equipamento — como ele se comporta, quando o problema ocorre, que sons ou cheiros são percebidos — pois essa observação orienta as etapas seguintes do diagnóstico." },
      { level:"medio", question:"Por que o uso de um multímetro é uma ferramenta essencial na manutenção eletroeletrônica básica?", options:[
      "Porque o multímetro, segundo essa ideia equivocada, serve apenas para limpar componentes eletrônicos sujos ou enferrujados",
      "Porque o multímetro, nessa interpretação incorreta, é usado exclusivamente para soldar componentes em uma placa de circuito",
      "Porque o multímetro, segundo essa hipótese equivocada, substitui totalmente a necessidade de qualquer observação visual do equipamento",
      "Porque permite medir grandezas elétricas como tensão, corrente e resistência, fornecendo dados objetivos para confirmar ou descartar hipóteses sobre o defeito"
    ], correct:3, resolution:"O multímetro permite medir grandezas elétricas fundamentais — tensão, corrente, resistência, continuidade — fornecendo dados objetivos que ajudam a confirmar ou descartar hipóteses sobre a causa de um defeito, complementando a observação visual e sensorial inicial do técnico." },
      { level:"dificil", question:"Por que testar componentes isoladamente (fora do circuito) pode fornecer resultados diferentes de testá-los dentro do circuito em funcionamento?", options:[
      "Porque componentes com defeito, nessa interpretação incorreta, nunca podem ser detectados quando testados fora do circuito original independentemente do tipo de alimento ou processo envolvido",
      "Porque testar dentro do circuito, segundo essa hipótese equivocada, é tecnicamente impossível em qualquer situação de manutenção real ao longo de qualquer etapa do processo produtivo considerado",
      "Porque a interação entre componentes vizinhos dentro do circuito pode mascarar ou alterar o comportamento de um componente com defeito, algo que não ocorre quando ele é testado isoladamente",
      "Porque testar componentes isoladamente, segundo essa ideia equivocada, sempre produz resultados idênticos aos obtidos dentro do circuito em qualquer contexto da produção industrial de alimentos"
    ], correct:2, resolution:"Dentro de um circuito em funcionamento, um componente interage eletricamente com os componentes vizinhos, o que pode mascarar um defeito sutil ou, inversamente, revelar um comportamento anormal que só aparece sob aquelas condições específicas de operação; testar o mesmo componente isoladamente, fora desse contexto, pode não reproduzir exatamente as mesmas condições, levando a resultados diferentes entre os dois tipos de teste." },
      { level:"dificilimo", question:"Por que um defeito intermitente (que aparece e desaparece de forma inconsistente) é considerado um dos desafios mais difíceis na manutenção eletroeletrônica?", options:[
      "Porque, nessa interpretação incorreta, defeitos intermitentes sempre desaparecem permanentemente depois da primeira tentativa de diagnóstico independentemente do tipo de alimento ou processo envolvido",
      "Porque, segundo essa ideia equivocada, defeitos intermitentes nunca têm nenhuma causa física real identificável no equipamento em qualquer contexto da produção industrial de alimentos",
      "Porque a causa pode depender de condições específicas e variáveis, como temperatura, vibração ou tempo de uso, que nem sempre estão presentes durante o momento do diagnóstico, dificultando a reprodução consistente do problema",
      "Porque, segundo essa hipótese equivocada, apenas equipamentos muito antigos podem apresentar algum tipo de defeito intermitente ao longo de qualquer etapa do processo produtivo considerado"
    ], correct:2, resolution:"Defeitos intermitentes costumam depender de condições específicas e variáveis — uma solda com micro-fissura que só falha sob certa temperatura, um componente que oscila com vibração, um cabo que se solta apenas em determinadas posições — condições que nem sempre estão presentes exatamente durante o momento em que o técnico está testando o equipamento, tornando muito mais difícil reproduzir o problema de forma consistente e identificar sua causa raiz real." }
    ]
  },
  "eletronica__automacao-comercial-e-residencial": {
    title: "Automação Comercial e Residencial",
    emoji: "🏠",
    intro: "Automação comercial e residencial envolve a integração de dispositivos elétricos e eletrônicos — iluminação, segurança, climatização — controlados de forma automatizada ou remota, aumentando conforto, eficiência e segurança.",
    analogy: "Pense na automação residencial como transformar uma casa comum em uma orquestra sincronizada: em vez de cada dispositivo (luz, alarme, ar-condicionado) funcionar de forma isolada, um sistema de automação coordena todos eles para trabalharem em conjunto, respondendo automaticamente a comandos ou situações específicas.",
    visual: {"type": "labeled", "center": "Automação Residencial", "parts": ["Sensor de presença", "Controlador central", "Iluminação automatizada", "Sistema de segurança"]},
    exercises: [
      { level:"facil", question:"O que é automação residencial?", options:[
      "A integração de dispositivos elétricos de uma casa para funcionarem de forma automatizada ou controlada remotamente",
      "Um documento legal exigido para o registro de uma nova construção junto à prefeitura",
      "Um serviço de manutenção preventiva realizado apenas uma vez por ano na residência em qualquer contexto da produção industrial de alimentos",
      "Um tipo específico de seguro contratado exclusivamente para proteger equipamentos eletrônicos residenciais"
    ], correct:0, resolution:"Automação residencial é a integração de diferentes dispositivos elétricos e eletrônicos de uma casa — iluminação, climatização, segurança — permitindo que funcionem de forma automatizada, programada ou controlada remotamente, aumentando conforto e eficiência." },
      { level:"medio", question:"Por que um sensor de presença é útil em um sistema de iluminação automatizada?", options:[
      "Porque o sensor de presença, segundo essa ideia equivocada, serve apenas para medir a temperatura ambiente do cômodo",
      "Porque o sensor de presença, segundo essa hipótese equivocada, substitui totalmente a necessidade de qualquer interruptor manual instalado",
      "Porque permite que as luzes se acendam ou apaguem automaticamente conforme a presença de pessoas no ambiente, economizando energia sem exigir intervenção manual",
      "Porque o sensor de presença, nessa interpretação incorreta, é usado exclusivamente para identificar a voz de cada morador"
    ], correct:2, resolution:"Um sensor de presença detecta movimento ou presença de pessoas em um ambiente, permitindo que o sistema de automação acenda ou apague as luzes automaticamente conforme necessário, economizando energia ao evitar que luzes fiquem ligadas em ambientes vazios, sem exigir que alguém se lembre de apagar manualmente." },
      { level:"dificil", question:"Qual é a diferença entre um sistema de automação centralizado e um sistema descentralizado (baseado em dispositivos independentes conectados)?", options:[
      "No sistema centralizado, um controlador único coordena todos os dispositivos, enquanto no descentralizado cada dispositivo tem sua própria lógica e se comunica diretamente com os demais, sem um controlador central obrigatório",
      "O sistema centralizado é usado apenas em residências pequenas, e o descentralizado é usado exclusivamente em grandes edifícios comerciais em qualquer contexto da produção industrial de alimentos",
      "O sistema centralizado nunca pode ser controlado remotamente, e o descentralizado depende inteiramente de controle remoto para funcionar independentemente do tipo de alimento ou processo envolvido",
      "O sistema centralizado é sempre mais barato de instalar, e o sistema descentralizado é sempre um investimento mais caro ao longo de qualquer etapa do processo produtivo considerado"
    ], correct:0, resolution:"Em um sistema centralizado, um controlador único (um hub central) recebe informações de todos os sensores e envia comandos para todos os dispositivos, coordenando o funcionamento geral; em um sistema descentralizado, cada dispositivo tem sua própria lógica de funcionamento e pode se comunicar diretamente com outros dispositivos próximos, sem depender obrigatoriamente de um controlador central único para operar." },
      { level:"dificilimo", question:"Por que a interoperabilidade entre dispositivos de diferentes fabricantes é um desafio técnico importante no crescimento da automação residencial?", options:[
      "Porque, segundo essa ideia equivocada, todos os dispositivos de automação residencial sempre utilizam exatamente o mesmo protocolo de comunicação em qualquer contexto da produção industrial de alimentos",
      "Porque fabricantes diferentes frequentemente usam protocolos de comunicação próprios e incompatíveis entre si, dificultando a integração de dispositivos de marcas variadas em um único sistema coeso de automação",
      "Porque, segundo essa hipótese equivocada, a interoperabilidade entre dispositivos nunca representa nenhum tipo de desafio técnico real independentemente do tipo de alimento ou processo envolvido",
      "Porque, nessa interpretação incorreta, dispositivos de fabricantes diferentes nunca podem, sob nenhuma circunstância, ser conectados à mesma rede elétrica"
    ], correct:1, resolution:"Diferentes fabricantes de dispositivos de automação frequentemente desenvolvem seus próprios protocolos de comunicação proprietários, buscando manter os consumidores dentro de seu próprio ecossistema de produtos; essa fragmentação técnica dificulta que um usuário combine livremente dispositivos de marcas diferentes em um único sistema integrado, exigindo hubs específicos ou protocolos-padrão (como Zigbee ou Matter) para viabilizar essa interoperabilidade." }
    ]
  },
  "eletronica__energias-renovaveis-e-eficiencia-energetica": {
    title: "Energias Renováveis e Eficiência Energética",
    emoji: "☀️",
    intro: "Energias renováveis e eficiência energética estudam fontes de energia como solar e eólica, além de estratégias técnicas para reduzir o desperdício de energia em sistemas elétricos e eletrônicos.",
    analogy: "Pense na eficiência energética como o consumo de combustível de um carro: dois veículos podem percorrer a mesma distância, mas um consome muito menos combustível por ser mais eficiente — da mesma forma, dois sistemas elétricos podem realizar a mesma tarefa com consumos de energia bem diferentes, dependendo de quão eficientes forem seus componentes e seu projeto.",
    visual: {"type": "pie", "slices": [{"label": "Energia hidrelétrica", "value": 55}, {"label": "Energia eólica", "value": 13}, {"label": "Energia solar", "value": 11}, {"label": "Outras fontes", "value": 21}]},
    exercises: [
      { level:"facil", question:"O que caracteriza uma fonte de energia renovável, como a solar ou a eólica?", options:[
      "Uma fonte de energia que nunca pode ser convertida em eletricidade utilizável por equipamentos comuns",
      "Uma fonte de energia que é sempre mais barata do que qualquer fonte de energia não renovável existente",
      "Uma fonte de energia que só pode ser utilizada em grandes usinas de geração de grande porte industrial",
      "Uma fonte que se renova naturalmente em um período de tempo relativamente curto, sem se esgotar com o uso contínuo"
    ], correct:3, resolution:"Fontes de energia renovável, como a solar e a eólica, se renovam naturalmente em um período de tempo relativamente curto — o sol continua brilhando, o vento continua soprando — diferente de fontes não renováveis como combustíveis fósseis, que se esgotam com o uso e levam milhões de anos para se formar novamente." },
      { level:"medio", question:"Por que um painel solar fotovoltaico consegue gerar eletricidade diretamente a partir da luz do sol?", options:[
      "Porque o painel solar, segundo essa ideia equivocada, aquece a água internamente e usa esse calor para girar um pequeno motor",
      "Porque o painel solar, segundo essa hipótese equivocada, reflete a luz solar de volta para gerar eletricidade por reflexão",
      "Porque o painel solar, nessa interpretação incorreta, armazena luz solar diretamente como se fosse uma bateria comum",
      "Porque o material semicondutor do painel libera elétrons quando exposto à luz, gerando uma corrente elétrica através do chamado efeito fotovoltaico"
    ], correct:3, resolution:"Painéis solares fotovoltaicos são compostos por material semicondutor (geralmente silício) que, ao ser exposto à luz solar, libera elétrons de seus átomos, gerando uma corrente elétrica contínua através de um fenômeno físico chamado efeito fotovoltaico — um processo direto de conversão de luz em eletricidade, sem envolver calor ou reflexão." },
      { level:"dificil", question:"Por que a intermitência da geração solar e eólica (que depende de sol e vento disponíveis) representa um desafio técnico para a integração dessas fontes na rede elétrica?", options:[
      "Porque a intermitência, segundo essa ideia equivocada, torna essas fontes tecnicamente incapazes de gerar qualquer eletricidade utilizável em qualquer contexto da produção industrial de alimentos",
      "Porque a rede elétrica tradicional, nessa interpretação incorreta, nunca precisa manter nenhum tipo de equilíbrio entre geração e consumo independentemente do tipo de alimento ou processo envolvido",
      "Porque fontes intermitentes, segundo essa hipótese equivocada, são sempre proibidas por lei de serem conectadas à rede elétrica ao longo de qualquer etapa do processo produtivo considerado",
      "Porque a rede elétrica precisa manter equilíbrio constante entre geração e consumo, e fontes intermitentes exigem sistemas de armazenamento ou fontes complementares para suprir a demanda quando sol ou vento não estão disponíveis"
    ], correct:3, resolution:"Diferente de usinas que podem gerar energia de forma constante e previsível, fontes solares e eólicas dependem de condições climáticas variáveis, gerando eletricidade de forma intermitente; como a rede elétrica precisa manter um equilíbrio constante entre o que é gerado e o que é consumido, essa intermitência exige soluções complementares, como sistemas de armazenamento em baterias ou outras fontes de geração que possam compensar os períodos sem sol ou vento suficiente." },
      { level:"dificilimo", question:"Por que investir em eficiência energética (reduzir o consumo desnecessário) pode ser, em certos casos, uma estratégia mais custo-efetiva do que investir apenas em aumentar a capacidade de geração de energia renovável?", options:[
      "Porque reduzir o desperdício de energia já existente costuma ter um custo por unidade de energia economizada mais baixo do que construir nova capacidade de geração, já que evita gastos com equipamentos, instalação e manutenção de novas fontes",
      "Porque, nessa interpretação incorreta, aumentar a capacidade de geração de energia renovável nunca traz nenhum benefício real ao sistema elétrico independentemente do tipo de alimento ou processo envolvido",
      "Porque, segundo essa hipótese equivocada, o custo de gerar nova energia é sempre menor do que o custo de qualquer medida de eficiência ao longo de qualquer etapa do processo produtivo considerado",
      "Porque, segundo essa ideia equivocada, eficiência energética elimina totalmente a necessidade de qualquer fonte de geração de energia em qualquer contexto da produção industrial de alimentos"
    ], correct:0, resolution:"Reduzir o desperdício de energia em um sistema já existente — através de equipamentos mais eficientes, melhor isolamento térmico, iluminação de baixo consumo — costuma custar menos por unidade de energia economizada do que construir e instalar nova capacidade de geração renovável, que exige investimento em equipamentos, infraestrutura de conexão e manutenção contínua; por isso a eficiência energética é frequentemente considerada uma das formas mais econômicas de 'gerar' energia disponível para outros usos." }
    ]
  },
  "eletronica__sistemas-microcontrolados": {
    title: "Sistemas Microcontrolados",
    emoji: "🔬",
    intro: "Sistemas microcontrolados usam pequenos computadores integrados em um único chip — microcontroladores — para controlar equipamentos eletrônicos específicos, sendo a base de projetos embarcados como sensores inteligentes e automação simples.",
    analogy: "Pense em um microcontrolador como o cérebro de um robô simples e dedicado: diferente de um computador completo com múltiplas funções, ele é projetado para executar uma tarefa específica repetidamente — ler um sensor, acionar um motor — de forma eficiente e com baixo consumo de energia.",
    visual: {"type": "labeled", "center": "Microcontrolador", "parts": ["CPU integrada", "Memória (RAM/Flash)", "Portas de entrada/saída", "Periféricos (timers, ADC)"]},
    exercises: [
      { level:"facil", question:"O que é um microcontrolador?", options:[
      "Um pequeno computador integrado em um único chip, projetado para controlar tarefas específicas de um equipamento eletrônico",
      "Um componente usado apenas para armazenar imagens dentro de uma câmera fotográfica digital",
      "Um dispositivo usado exclusivamente para medir a temperatura ambiente de uma sala independentemente do tipo de alimento ou processo envolvido",
      "Um tipo de cabo usado exclusivamente para conectar dois computadores completos entre si em qualquer contexto da produção industrial de alimentos"
    ], correct:0, resolution:"Um microcontrolador é um pequeno computador completo integrado em um único chip — com processador, memória e portas de entrada e saída — projetado para controlar tarefas específicas de um equipamento eletrônico, como ler sensores e acionar atuadores." },
      { level:"medio", question:"O que são portas de entrada e saída (I/O) em um microcontrolador?", options:[
      "Pinos físicos que permitem ao microcontrolador ler sinais de sensores (entrada) ou controlar dispositivos externos (saída)",
      "As portas de entrada e saída, nessa interpretação incorreta, são usadas exclusivamente para carregar a bateria do dispositivo",
      "As portas de entrada e saída, segundo essa hipótese equivocada, armazenam permanentemente o programa do microcontrolador",
      "As portas de entrada e saída, segundo essa ideia equivocada, servem apenas para conectar o microcontrolador à internet"
    ], correct:0, resolution:"As portas de entrada e saída (I/O) são pinos físicos do microcontrolador que permitem a comunicação com o mundo externo: como entrada, podem ler sinais vindos de sensores (temperatura, luz, movimento); como saída, podem enviar sinais para controlar dispositivos externos, como acionar um LED ou um motor." },
      { level:"dificil", question:"Qual é a diferença entre um microcontrolador e um microprocessador usado em um computador comum?", options:[
      "O microcontrolador nunca pode executar nenhum tipo de programa, e o microprocessador depende inteiramente de programas para funcionar independentemente do tipo de alimento ou processo envolvido",
      "O microcontrolador é sempre mais rápido tecnicamente do que qualquer microprocessador, independentemente da aplicação envolvida ao longo de qualquer etapa do processo produtivo considerado",
      "O microcontrolador é usado apenas em equipamentos médicos, e o microprocessador é usado exclusivamente em consoles de videogame em qualquer contexto da produção industrial de alimentos",
      "O microcontrolador integra processador, memória e periféricos em um único chip voltado para tarefas específicas, enquanto o microprocessador depende de componentes externos adicionais e é voltado para processamento de propósito geral"
    ], correct:3, resolution:"Um microcontrolador integra em um único chip o processador, a memória e periféricos de entrada e saída, sendo otimizado para executar tarefas específicas de controle com baixo consumo de energia; um microprocessador, como o usado em um computador, é voltado para processamento de propósito geral e depende de componentes externos adicionais — memória RAM separada, controladores de dispositivos — para formar um sistema completo." },
      { level:"dificilimo", question:"Por que um projeto embarcado com microcontrolador pode falhar em produção mesmo funcionando perfeitamente em bancada durante os testes de desenvolvimento?", options:[
      "Porque, nessa interpretação incorreta, projetos embarcados nunca podem, sob nenhuma circunstância, apresentar nenhum tipo de falha em produção independentemente do tipo de alimento ou processo envolvido",
      "Porque, segundo essa hipótese equivocada, condições ambientais como temperatura nunca têm nenhuma relação real com o funcionamento de um microcontrolador ao longo de qualquer etapa do processo produtivo considerado",
      "Porque, segundo essa ideia equivocada, microcontroladores testados em bancada sempre funcionam de forma idêntica em qualquer condição de produção em qualquer contexto da produção industrial de alimentos",
      "Porque condições reais de operação — variações de temperatura, ruído elétrico do ambiente, tolerâncias de componentes em produção em massa — podem introduzir comportamentos que não aparecem no ambiente controlado de bancada durante o desenvolvimento"
    ], correct:3, resolution:"O ambiente de bancada durante o desenvolvimento costuma ser controlado — temperatura estável, pouco ruído elétrico, um único protótipo testado; em produção real, variações de temperatura ambiente, ruído elétrico de outros equipamentos próximos, e pequenas variações de tolerância entre diferentes unidades de componentes fabricados em massa podem expor comportamentos ou falhas que não se manifestaram durante os testes controlados em bancada, por isso testes de campo e de estresse são etapas importantes antes da produção em escala." }
    ]
  },
  "eletronica__redes-telecomunicacoes-e-iot": {
    title: "Redes, Telecomunicações e IoT",
    emoji: "📡",
    intro: "Redes, telecomunicações e IoT (Internet das Coisas) estudam como dispositivos eletrônicos se comunicam entre si e com a internet, permitindo o monitoramento e controle remoto de equipamentos conectados.",
    analogy: "Pense na IoT como transformar objetos comuns em participantes de uma grande conversa telefônica: uma geladeira, uma lâmpada ou um sensor de temperatura, que antes eram 'mudos' e isolados, ganham a capacidade de 'falar' com outros dispositivos e com a internet, compartilhando informações e recebendo comandos remotamente.",
    visual: {"type": "flow", "steps": ["Dispositivo IoT (sensor)", "Rede de comunicação", "Servidor/nuvem", "Aplicativo de controle"]},
    exercises: [
      { level:"facil", question:"O que é IoT (Internet das Coisas)?", options:[
      "A conexão de objetos físicos comuns à internet, permitindo que coletem e transmitam dados ou sejam controlados remotamente",
      "Um tipo específico de cabo usado exclusivamente para conectar computadores a uma impressora",
      "Um programa de computador usado apenas para editar imagens e fotografias digitais em qualquer contexto da produção industrial de alimentos",
      "Um serviço de streaming de vídeo disponível apenas para assinantes de determinada operadora"
    ], correct:0, resolution:"IoT (Internet das Coisas, do inglês Internet of Things) é a conexão de objetos físicos do dia a dia — sensores, eletrodomésticos, equipamentos industriais — à internet, permitindo que coletem, transmitam e recebam dados, possibilitando monitoramento e controle remoto desses dispositivos." },
      { level:"medio", question:"Por que protocolos de comunicação de baixo consumo de energia (como o LoRa ou o Zigbee) são frequentemente usados em dispositivos IoT alimentados por bateria?", options:[
      "Porque esses protocolos foram projetados para transmitir dados consumindo pouca energia, prolongando significativamente a vida útil da bateria do dispositivo",
      "Porque esses protocolos, segundo essa ideia equivocada, transmitem dados a uma velocidade muito maior do que o Wi-Fi tradicional",
      "Porque esses protocolos, nessa interpretação incorreta, são exigidos exclusivamente para dispositivos conectados diretamente à tomada elétrica",
      "Porque esses protocolos, segundo essa hipótese equivocada, eliminam totalmente a necessidade de qualquer tipo de bateria no dispositivo"
    ], correct:0, resolution:"Protocolos de comunicação de baixo consumo, como LoRa e Zigbee, foram especificamente projetados para transmitir pequenas quantidades de dados consumindo o mínimo possível de energia, o que é essencial para dispositivos IoT alimentados por bateria que precisam funcionar por meses ou até anos sem troca frequente de bateria, mesmo que isso signifique velocidades de transmissão mais baixas do que protocolos como Wi-Fi." },
      { level:"dificil", question:"Qual é a diferença entre um dispositivo IoT que se comunica diretamente com a internet e um que se comunica através de um gateway (concentrador) local?", options:[
      "O dispositivo com conexão direta acessa a internet de forma independente, enquanto o que usa gateway transmite dados para um dispositivo intermediário local, que então repassa essas informações para a internet",
      "O dispositivo com conexão direta transmite sempre dados em texto simples, e o que usa gateway transmite sempre dados criptografados ao longo de qualquer etapa do processo produtivo considerado",
      "O dispositivo com conexão direta nunca pode ser alimentado por bateria, e o que usa gateway depende inteiramente de bateria independentemente do tipo de alimento ou processo envolvido",
      "O dispositivo com conexão direta é usado apenas em ambientes internos, e o que usa gateway é usado exclusivamente ao ar livre em qualquer contexto da produção industrial de alimentos"
    ], correct:0, resolution:"Um dispositivo IoT com conexão direta à internet (geralmente via Wi-Fi) se comunica de forma independente com servidores remotos; um dispositivo que utiliza gateway transmite seus dados, muitas vezes por protocolos de curto alcance e baixo consumo, para um concentrador local (o gateway), que então agrega e repassa essas informações para a internet — uma arquitetura comum em redes de sensores distribuídos que precisam economizar energia." },
      { level:"dificilimo", question:"Por que a segurança de dispositivos IoT é considerada um desafio particularmente difícil em comparação à segurança de computadores tradicionais?", options:[
      "Porque, segundo essa ideia equivocada, dispositivos IoT nunca se conectam de fato a nenhuma rede de internet, tornando a segurança irrelevante em qualquer contexto da produção industrial de alimentos",
      "Porque, segundo essa hipótese equivocada, a segurança de dispositivos IoT é sempre automaticamente garantida pelo próprio fabricante ao longo de qualquer etapa do processo produtivo considerado",
      "Porque, nessa interpretação incorreta, computadores tradicionais nunca apresentam nenhum tipo de vulnerabilidade de segurança real independentemente do tipo de alimento ou processo envolvido",
      "Porque dispositivos IoT frequentemente têm recursos de processamento e memória limitados, o que restringe a capacidade de implementar mecanismos robustos de segurança, além de muitas vezes não receberem atualizações regulares após a instalação"
    ], correct:3, resolution:"Dispositivos IoT costumam ter processadores simples e pouca memória, projetados para baixo custo e consumo de energia, o que limita a capacidade de implementar criptografia robusta e outros mecanismos de segurança avançados usados em computadores tradicionais; além disso, muitos dispositivos IoT são instalados e esquecidos, sem receber atualizações de segurança regulares, deixando vulnerabilidades conhecidas sem correção por longos períodos, ao contrário de computadores que costumam receber atualizações mais frequentes." }
    ]
  },
  "eletronica__manutencao-eletroeletronica-industrial": {
    title: "Manutenção Eletroeletrônica Industrial",
    emoji: "🏗️",
    intro: "Manutenção eletroeletrônica industrial trata da conservação, diagnóstico e reparo de equipamentos elétricos e eletrônicos usados em ambientes industriais, incluindo estratégias preventivas e preditivas para evitar paradas inesperadas.",
    analogy: "Pense na manutenção preventiva industrial como uma revisão periódica de carro: em vez de esperar o motor quebrar para consertá-lo, trocas programadas de óleo e peças de desgaste evitam problemas maiores — a manutenção industrial aplica essa mesma lógica a motores, painéis elétricos e equipamentos de uma fábrica.",
    visual: {"type": "compare", "leftTitle": "Manutenção Corretiva", "leftItems": ["Realizada após a falha ocorrer", "Pode causar parada inesperada", "Custo de reparo geralmente maior"], "rightTitle": "Manutenção Preventiva", "rightItems": ["Realizada antes da falha ocorrer", "Evita paradas inesperadas", "Custo de reparo geralmente menor"]},
    exercises: [
      { level:"facil", question:"Qual é a diferença básica entre manutenção corretiva e manutenção preventiva?", options:[
      "A corretiva e a preventiva são exatamente o mesmo tipo de manutenção, apenas com nomes diferentes usados por técnicos",
      "A corretiva é usada apenas em equipamentos novos, e a preventiva é usada exclusivamente em equipamentos muito antigos",
      "A corretiva é sempre mais barata de realizar do que qualquer tipo de manutenção preventiva programada",
      "A corretiva é realizada depois que uma falha já ocorreu, enquanto a preventiva é realizada antes, buscando evitar a falha"
    ], correct:3, resolution:"A manutenção corretiva é realizada depois que uma falha já ocorreu, buscando reparar o equipamento; a manutenção preventiva é realizada antes de uma falha acontecer, em intervalos programados, buscando evitar que o problema chegue a ocorrer, geralmente com menor custo e impacto do que uma correção emergencial." },
      { level:"medio", question:"Por que uma parada não programada de um equipamento industrial costuma ser mais custosa do que uma manutenção programada?", options:[
      "Porque, além do custo do reparo em si, uma parada inesperada interrompe a produção, gerando prejuízo adicional por perda de produtividade e possível atraso na entrega de produtos",
      "Porque uma parada não programada, segundo essa ideia equivocada, sempre exige a substituição total do equipamento avariado em qualquer contexto da produção industrial de alimentos",
      "Porque uma manutenção programada, nessa interpretação incorreta, nunca envolve nenhum custo real para a empresa envolvida independentemente do tipo de alimento ou processo envolvido",
      "Porque uma parada não programada, segundo essa hipótese equivocada, é sempre causada exclusivamente por erro do operador ao longo de qualquer etapa do processo produtivo considerado"
    ], correct:0, resolution:"Uma parada não programada interrompe a produção de forma inesperada, gerando não apenas o custo direto do reparo, mas também prejuízo indireto por perda de produtividade, possíveis atrasos na entrega de produtos e, em alguns casos, danos maiores ao equipamento causados pela falha não controlada — custos que uma manutenção programada, realizada em momento planejado, geralmente evita." },
      { level:"dificil", question:"O que caracteriza a manutenção preditiva, e como ela se diferencia da manutenção preventiva tradicional?", options:[
      "A manutenção preditiva utiliza monitoramento contínuo de indicadores (como vibração ou temperatura) para prever quando uma falha provavelmente ocorrerá, enquanto a preventiva segue intervalos fixos predefinidos, independentemente da condição real do equipamento",
      "A manutenção preditiva nunca utiliza nenhum tipo de sensor, e a preventiva depende inteiramente de sensores para funcionar independentemente do tipo de alimento ou processo envolvido ao longo de qualquer etapa do processo produtivo considerado",
      "A manutenção preditiva é aplicada apenas em equipamentos de pequeno porte, e a preventiva é aplicada exclusivamente em equipamentos de grande porte em qualquer contexto da produção industrial de alimentos",
      "A manutenção preditiva é sempre mais barata de implementar do que qualquer forma de manutenção preventiva tradicional mesmo em situações consideradas tecnicamente controladas segundo essa mesma linha de raciocínio equivocada apresentada"
    ], correct:0, resolution:"A manutenção preventiva segue um cronograma fixo predefinido (por exemplo, a cada seis meses), independentemente da condição real do equipamento naquele momento; a manutenção preditiva, por sua vez, utiliza sensores e monitoramento contínuo de indicadores como vibração, temperatura ou consumo de corrente para identificar sinais de deterioração e prever quando uma falha provavelmente ocorrerá, permitindo intervenção no momento mais adequado, nem cedo nem tarde demais." },
      { level:"dificilimo", question:"Por que uma estratégia de manutenção puramente preventiva, seguindo intervalos fixos rígidos, pode gerar desperdício de recursos mesmo evitando falhas inesperadas?", options:[
      "Porque, segundo essa ideia equivocada, manutenção preventiva sempre evita completamente qualquer tipo de desperdício de recursos da empresa em qualquer contexto da produção industrial de alimentos",
      "Porque componentes podem ser substituídos ou revisados antes do necessário, mesmo estando em boas condições reais de funcionamento, apenas porque o intervalo programado chegou, desperdiçando peças, mão de obra e tempo de máquina parada desnecessariamente",
      "Porque, segundo essa hipótese equivocada, intervalos fixos de manutenção preventiva são sempre calculados de forma perfeitamente precisa para cada equipamento ao longo de qualquer etapa do processo produtivo considerado",
      "Porque, nessa interpretação incorreta, componentes substituídos preventivamente nunca estão em condições reais de continuar funcionando independentemente do tipo de alimento ou processo envolvido"
    ], correct:1, resolution:"Como a manutenção preventiva segue intervalos fixos calculados com margem de segurança (geralmente conservadores), um componente pode ser substituído ou revisado antes de realmente precisar, mesmo estando em condições ainda adequadas de funcionamento, apenas porque o prazo programado chegou; isso pode gerar desperdício de peças ainda utilizáveis, mão de obra e tempo de parada de máquina que poderiam ter sido evitados com uma abordagem mais precisa, como a manutenção preditiva baseada na condição real do equipamento." }
    ]
  },
  "eletronica__eletronica-e-automacao-industriais": {
    title: "Eletrônica e Automação Industriais",
    emoji: "⚙️",
    intro: "Eletrônica e automação industriais integram sensores, controladores e atuadores eletrônicos para monitorar e controlar processos produtivos em fábricas, reduzindo a necessidade de intervenção manual constante.",
    analogy: "Pense em um sistema de automação industrial como o sistema nervoso de uma fábrica: sensores são como terminações nervosas que percebem o ambiente, controladores são como o cérebro que processa essas informações, e atuadores são como músculos que executam a ação decidida — tudo trabalhando em conjunto de forma coordenada.",
    visual: {"type": "labeled", "center": "Automação Industrial", "parts": ["Sensor de processo", "CLP (controlador)", "Atuador (motor/válvula)", "Interface Homem-Máquina"]},
    exercises: [
      { level:"facil", question:"O que é uma Interface Homem-Máquina (IHM) em um sistema de automação industrial?", options:[
      "Um painel ou tela que permite ao operador humano visualizar e interagir com o funcionamento de um processo automatizado",
      "Um componente usado apenas para armazenar energia elétrica de reserva em caso de falta de luz",
      "Um documento técnico exigido para o registro legal de um equipamento industrial no país",
      "Um tipo específico de sensor usado exclusivamente para medir a temperatura de um processo industrial"
    ], correct:0, resolution:"A Interface Homem-Máquina (IHM) é um painel ou tela que permite ao operador humano visualizar informações sobre o processo automatizado — como status de sensores e alarmes — e interagir com o sistema, enviando comandos ou ajustando parâmetros de operação." },
      { level:"medio", question:"Por que sensores de processo são elementos essenciais em um sistema de automação industrial?", options:[
      "Porque fornecem ao sistema de controle informações reais sobre o estado do processo, permitindo decisões automatizadas baseadas em dados concretos, e não em suposições",
      "Porque os sensores de processo, segundo essa hipótese equivocada, substituem totalmente a necessidade de qualquer atuador no sistema",
      "Porque os sensores de processo, nessa interpretação incorreta, são exigidos exclusivamente para processos destinados à exportação",
      "Porque os sensores de processo, segundo essa ideia equivocada, servem apenas para decorar visualmente o painel de controle da fábrica"
    ], correct:0, resolution:"Sensores de processo (temperatura, pressão, nível, posição) fornecem ao sistema de controle informações reais e atualizadas sobre o estado do processo produtivo, permitindo que decisões automatizadas sejam tomadas com base em dados concretos medidos, em vez de suposições ou estimativas, o que é essencial para o controle preciso de um processo industrial." },
      { level:"dificil", question:"Qual é a diferença entre controle de processo em malha aberta e em malha fechada em um sistema de automação industrial?", options:[
      "O controle em malha aberta é usado apenas em processos manuais, e o controle em malha fechada é usado exclusivamente em processos totalmente robotizados",
      "No controle em malha fechada, a ação é continuamente ajustada com base na leitura de um sensor sobre o resultado real, enquanto na malha aberta a ação é executada sem considerar o resultado medido posteriormente",
      "O controle em malha aberta é sempre mais preciso tecnicamente do que o controle em malha fechada, independentemente do processo independentemente do tipo de alimento ou processo envolvido",
      "O controle em malha aberta nunca envolve nenhum tipo de atuador, e o controle em malha fechada depende inteiramente de atuadores em qualquer contexto da produção industrial de alimentos"
    ], correct:1, resolution:"No controle em malha fechada, um sensor mede continuamente o resultado real do processo, e essa informação é usada para ajustar a ação de controle de forma contínua (retroalimentação); no controle em malha aberta, a ação é executada com base em um valor predefinido, sem considerar o resultado medido posteriormente, o que geralmente resulta em menor precisão diante de perturbações inesperadas no processo." },
      { level:"dificilimo", question:"Por que a integração de sistemas de automação industrial com sistemas de gestão empresarial (como softwares de planejamento de produção) tem se tornado cada vez mais valorizada nas indústrias modernas?", options:[
      "Porque, segundo essa ideia equivocada, sistemas de automação industrial nunca geram nenhum tipo de dado útil para a gestão da empresa em qualquer contexto da produção industrial de alimentos independentemente do tipo de alimento ou processo envolvido",
      "Porque permite que dados de produção em tempo real, coletados diretamente do chão de fábrica pelos sistemas de automação, alimentem decisões estratégicas de planejamento, estoque e logística, reduzindo a defasagem entre o que acontece na produção e o que é gerenciado administrativamente",
      "Porque, segundo essa hipótese equivocada, a integração entre esses sistemas elimina totalmente a necessidade de qualquer supervisão humana segundo essa mesma linha de raciocínio equivocada apresentada em qualquer contexto da produção industrial de alimentos",
      "Porque, nessa interpretação incorreta, sistemas de gestão empresarial e sistemas de automação industrial são tecnicamente incompatíveis entre si ao longo de qualquer etapa do processo produtivo considerado mesmo em situações consideradas tecnicamente controladas"
    ], correct:1, resolution:"Sistemas de automação industrial geram, em tempo real, dados detalhados sobre a produção — quantidade produzida, tempo de ciclo, paradas de máquina; integrar esses dados diretamente a sistemas de gestão empresarial permite que decisões estratégicas sobre planejamento de produção, controle de estoque e logística sejam tomadas com base em informações atualizadas do chão de fábrica, reduzindo a defasagem que existiria se esses dados tivessem que ser coletados e inseridos manualmente, algo cada vez mais valorizado à medida que as indústrias buscam maior agilidade e precisão na tomada de decisão." }
    ]
  },
  "eletronica__pratica-profissional": {
    title: "Prática Profissional em Eletrônica",
    emoji: "🧑‍🔧",
    intro: "Prática profissional integra os conhecimentos técnicos aprendidos ao longo do curso em experiências reais de trabalho, desenvolvendo habilidades práticas, comunicação técnica e postura profissional esperadas do mercado de trabalho.",
    analogy: "Pense na prática profissional como o teste de estrada de um carro recém-montado: por mais que cada peça tenha sido projetada e testada individualmente em laboratório, é rodando de verdade nas condições reais da estrada que se descobre se tudo realmente funciona bem em conjunto, sob as pressões e imprevistos do uso real.",
    visual: {"type": "cycle", "steps": ["Aplicação do conhecimento técnico", "Resolução de problemas reais", "Comunicação com a equipe", "Reflexão e aprendizado contínuo"]},
    exercises: [
      { level:"facil", question:"Qual é o principal objetivo da prática profissional dentro de um curso técnico?", options:[
      "Servir exclusivamente como uma forma de avaliação para a nota final do aluno no curso",
      "Garantir automaticamente uma vaga de emprego fixa na empresa onde a prática foi realizada",
      "Aplicar os conhecimentos técnicos aprendidos em situações reais de trabalho, desenvolvendo experiência prática",
      "Substituir totalmente a necessidade de qualquer conteúdo teórico estudado ao longo do curso técnico"
    ], correct:2, resolution:"A prática profissional tem como objetivo principal permitir que o aluno aplique os conhecimentos técnicos aprendidos em sala de aula a situações reais de trabalho, desenvolvendo experiência prática e habilidades que complementam a formação teórica recebida durante o curso." },
      { level:"medio", question:"Por que a comunicação técnica clara com colegas e supervisores é uma habilidade tão importante no ambiente de trabalho quanto o conhecimento técnico em si?", options:[
      "Porque mesmo um bom trabalho técnico pode gerar retrabalho, erros ou atrasos se não for comunicado de forma clara e compreendida corretamente pela equipe envolvida",
      "Porque a comunicação técnica, nessa interpretação incorreta, substitui totalmente a necessidade de qualquer conhecimento técnico real",
      "Porque a comunicação técnica, segundo essa ideia equivocada, é exigida apenas em empresas de grande porte, nunca em pequenas oficinas",
      "Porque a comunicação técnica, segundo essa hipótese equivocada, é relevante apenas para cargos de gerência, nunca para técnicos de campo"
    ], correct:0, resolution:"Mesmo um trabalho tecnicamente correto pode gerar retrabalho, mal-entendidos ou atrasos se as informações sobre o que foi feito, o que ainda precisa ser feito, ou que problemas foram encontrados não forem comunicadas de forma clara para colegas e supervisores, mostrando que comunicação e conhecimento técnico são habilidades complementares, não substitutas uma da outra." },
      { level:"dificil", question:"Por que a experiência de resolver problemas reais e imprevistos durante a prática profissional costuma desenvolver habilidades que a sala de aula, isoladamente, tem mais dificuldade de proporcionar?", options:[
      "Porque situações reais frequentemente envolvem informações incompletas, prazos, recursos limitados e imprevistos que exigem adaptação, algo diferente de exercícios estruturados e bem definidos típicos do ambiente de sala de aula",
      "Porque a prática profissional, segundo essa hipótese equivocada, elimina totalmente a necessidade de qualquer conhecimento teórico prévio ao longo de qualquer etapa do processo produtivo considerado",
      "Porque problemas reais, nessa interpretação incorreta, são sempre tecnicamente mais simples do que qualquer exercício acadêmico independentemente do tipo de alimento ou processo envolvido",
      "Porque a sala de aula, segundo essa ideia equivocada, nunca aborda nenhum tipo de conteúdo tecnicamente relevante para o trabalho real em qualquer contexto da produção industrial de alimentos"
    ], correct:0, resolution:"Exercícios de sala de aula costumam ser estruturados com informações completas e objetivos bem definidos, facilitando o aprendizado de conceitos técnicos; situações reais de trabalho frequentemente envolvem informações incompletas, prazos apertados, recursos limitados e imprevistos que exigem adaptação e tomada de decisão sob incerteza, desenvolvendo habilidades práticas de resolução de problemas que complementam, mas não substituem, o conhecimento técnico de base aprendido teoricamente." },
      { level:"dificilimo", question:"Por que um profissional recém-formado tecnicamente competente ainda pode enfrentar dificuldades significativas de adaptação nos primeiros meses de trabalho, mesmo dominando o conteúdo técnico do curso?", options:[
      "Porque, nessa interpretação incorreta, profissionais recém-formados sempre apresentam dificuldades exclusivamente por falta de conhecimento técnico ao longo de qualquer etapa do processo produtivo considerado",
      "Porque, segundo essa hipótese equivocada, a adaptação ao ambiente de trabalho depende unicamente do tempo de curso já concluído pelo profissional mesmo em situações consideradas tecnicamente controladas",
      "Porque a adaptação ao ambiente profissional envolve também aspectos não puramente técnicos, como cultura organizacional, dinâmica de equipe, prioridades do negócio e expectativas implícitas do mercado, que não são plenamente ensinados apenas pelo conteúdo técnico do curso",
      "Porque, segundo essa ideia equivocada, o domínio técnico do conteúdo do curso nunca tem nenhuma relação real com o desempenho profissional em qualquer contexto da produção industrial de alimentos independentemente do tipo de alimento ou processo envolvido"
    ], correct:2, resolution:"O domínio técnico do conteúdo do curso é uma base necessária, mas a adaptação bem-sucedida ao ambiente profissional envolve também aspectos que vão além do conhecimento técnico puro — entender a cultura e as prioridades daquela empresa específica, aprender a trabalhar em equipe com pessoas de diferentes perfis, e desenvolver sensibilidade para expectativas implícitas do mercado que raramente são explicitadas formalmente durante o curso — por isso mesmo profissionais tecnicamente competentes costumam passar por um período de adaptação nos primeiros meses de trabalho." }
    ]
  }
};


