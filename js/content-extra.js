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
};;;;;;;;



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
};;;;;;



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
    steps: [
      "Lista/Array: guarda itens em sequência, acessados por posição (índice).",
      "Pilha (Stack): o último que entra é o primeiro que sai (tipo pilha de pratos).",
      "Fila (Queue): o primeiro que entra é o primeiro que sai (tipo fila de banco)."
    ],
    exercises: [
      { level:"facil", question:"Em uma lista (array), como você acessa o primeiro elemento, na maioria das linguagens de programação?", options:["Índice 0","Índice -1","Índice 1","Índice 100"], correct:0, resolution:"A maioria das linguagens de programação (JavaScript, Python, C, Java) usa indexação começando em 0, então o primeiro elemento está no índice 0." },
      { level:"medio", question:"Qual estrutura de dados segue a lógica \"o último que entra é o primeiro que sai\"?", options:["Árvore","Lista simples","Fila (Queue)","Pilha (Stack)"], correct:3, resolution:"A pilha (Stack) segue a lógica LIFO (Last In, First Out) — como uma pilha de pratos: o último prato colocado é o primeiro a ser retirado." },
      { level:"dificil", question:"Por que buscar um item em uma lista NÃO ordenada geralmente é mais lento do que buscar em uma lista ordenada usando busca binária?", options:["Listas ordenadas, segundo essa hipótese equivocada, não podem ser buscadas por nenhum método de forma alguma","Não existe, nessa interpretação incorreta, nenhuma diferença real de velocidade entre buscar em listas ordenadas ou não","Numa lista não ordenada, é preciso checar item por item, e numa lista ordenada, a busca binária descarta metade das opções a cada passo, sendo muito mais rápida","Busca binária é, segundo essa ideia equivocada, sempre mais lenta do que percorrer a lista item por item sequencialmente"], correct:2, resolution:"Numa lista desordenada, no pior caso, é necessário verificar todos os N elementos um por um. Já a busca binária, aplicada a listas ordenadas, elimina metade das possibilidades a cada comparação, chegando ao resultado muito mais rápido (log₂N passos, ao invés de N)." },
      { level:"dificilimo", question:"Por que, ao escolher entre um Array e uma Lista Ligada (Linked List) para um programa que faz MUITAS inserções no meio da coleção, a Lista Ligada costuma ser mais eficiente?", options:["Arrays são, nessa interpretação incorreta, sempre mais rápidos do que listas ligadas em absolutamente qualquer situação de uso","Não existe, segundo essa ideia equivocada, diferença real de desempenho entre as duas estruturas de dados nesse cenário","Porque inserir no meio de um array exige deslocar todos os elementos seguintes uma posição, enquanto numa lista ligada basta reconectar dois ponteiros","Listas ligadas, segundo essa hipótese equivocada, na verdade não permitem inserção de novos elementos no meio da estrutura"], correct:2, resolution:"Num array, os elementos ficam em posições de memória contíguas — inserir um item no meio exige \"empurrar\" todos os elementos seguintes uma posição para abrir espaço, o que é custoso para listas grandes. Já numa lista ligada, cada elemento aponta para o próximo; inserir no meio é só reconectar dois ponteiros, uma operação muito mais rápida, independente do tamanho da lista." }
    ]
  },
  "informatica__fundamentos-de-programacao": {
    title: "Fundamentos de Programação",
    emoji: "👨‍💻",
    intro: "Programar é dar instruções, passo a passo, para o computador executar. Toda linguagem de programação (Python, JavaScript, C...) serve para isso.",
    analogy: "É como ensinar um robô muito literal a fazer um sanduíche: se você não disser exatamente \"pegue o pão, passe a manteiga, feche o sanduíche\", ele não sabe fazer sozinho — ele só faz exatamente o que você mandar, na ordem certa.",
    steps: [
      "Variável: uma \"caixinha\" que guarda um valor (número, texto...).",
      "Condicional (if/else): permite o programa \"decidir\" entre caminhos diferentes.",
      "Laço de repetição (for/while): repete uma ação várias vezes sem copiar e colar o código."
    ],
    exercises: [
      { level:"facil", question:"O que é uma \"variável\" em programação?", options:["Um tipo de vírus de computador criado para prejudicar arquivos do sistema","Uma linguagem específica de programação usada exclusivamente para desenvolvimento web moderno","Um erro comum no código que impede o programa de funcionar corretamente","Um espaço na memória que guarda um valor, que pode mudar"], correct:3, resolution:"Uma variável é como uma caixinha rotulada que guarda um valor (número, texto, etc.), e esse valor pode ser alterado ao longo do programa." },
      { level:"medio", question:"Qual estrutura você usaria para repetir uma ação exatamente 10 vezes?", options:["Comentário no código","if/else","Laço de repetição (for/while)","Variável simples"], correct:2, resolution:"Laços de repetição (for ou while) servem exatamente para repetir um bloco de código um número determinado de vezes, sem precisar copiar e colar o mesmo código 10 vezes." },
      { level:"dificil", question:"No trecho: `if (idade >= 18) { print(\"Maior de idade\") } else { print(\"Menor de idade\") }`, o que acontece se idade = 17?", options:["Imprime \"Menor de idade\"","Não imprime nada","Dá erro no programa","Imprime \"Maior de idade\""], correct:0, resolution:"Como 17 não é maior ou igual a 18, a condição do \"if\" é falsa, então o programa executa o bloco do \"else\", imprimindo \"Menor de idade\"." },
      { level:"dificilimo", question:"Por que um laço de repetição mal escrito (por exemplo, uma condição de parada que nunca se torna verdadeira) pode travar completamente um programa ou aplicativo?", options:["Laços de repetição, segundo essa hipótese equivocada, sempre param automaticamente sozinhos depois de um curto período de tempo","Programas, nessa interpretação incorreta, nunca travam de fato por causa de erros de lógica presentes no próprio código-fonte","Porque o programa entra em \"loop infinito\", executando a mesma instrução repetidamente sem nunca parar, travando o sistema","Isso, segundo essa ideia equivocada, simplesmente nunca acontece de verdade na prática real da programação de computadores"], correct:2, resolution:"Se a condição que deveria parar o laço (por exemplo, \"enquanto x for menor que 10\") nunca é alcançada — porque o valor de x nunca é atualizado corretamente dentro do laço, por exemplo —, o programa fica preso repetindo a mesma ação para sempre, consumindo processamento e travando o app. É um dos erros mais clássicos (e frustrantes) de quem está aprendendo a programar." }
    ]
  },
  "agronegocio__zootecnia": {
    title: "Zootecnia: cuidando bem dos animais de produção",
    emoji: "🐮",
    intro: "Zootecnia é a ciência que estuda como criar animais (gado, aves, porcos...) de forma saudável e produtiva, cuidando da alimentação, reprodução e bem-estar deles.",
    analogy: "É parecido com cuidar de um time de futebol: cada \"jogador\" (animal) precisa de alimentação adequada, descanso e cuidado médico para render o seu melhor.",
    steps: [
      "Nutrição animal: cada espécie precisa de uma dieta balanceada específica.",
      "Manejo reprodutivo: planejar a reprodução para melhorar a genética do rebanho.",
      "Sanidade animal: prevenir doenças com vacinação e boas práticas."
    ],
    exercises: [
      { level:"facil", question:"O que estuda a Zootecnia?", options:["Apenas o estudo de doenças humanas relacionadas ao consumo de carne e derivados","A criação e o manejo de animais de produção","Apenas a construção e manutenção de máquinas usadas na agricultura moderna","Apenas o cultivo de plantas e técnicas de agricultura tradicional no campo"], correct:1, resolution:"Zootecnia é a área que estuda a criação, nutrição, reprodução e manejo de animais destinados à produção (gado, aves, suínos, etc.)." },
      { level:"medio", question:"Por que a nutrição animal precisa ser específica para cada espécie (por exemplo, boi não come a mesma coisa que galinha)?", options:["Porque cada espécie tem um sistema digestivo e necessidades nutricionais diferentes, adaptados à sua fisiologia","É apenas, segundo essa ideia equivocada, uma questão de gosto e preferência pessoal de cada animal","Não precisa ser específica, segundo essa hipótese equivocada, pois todos os animais comem exatamente igual","Animais de produção, nessa interpretação incorreta, não precisam de nenhum tipo de dieta balanceada real"], correct:0, resolution:"Cada espécie evoluiu com um sistema digestivo próprio (o boi, por exemplo, é ruminante e digere fibras de forma diferente da galinha) — por isso a dieta precisa ser adaptada às necessidades nutricionais específicas de cada tipo de animal." },
      { level:"dificil", question:"Por que o manejo reprodutivo (escolher quais animais cruzam com quais) é importante para a produtividade de um rebanho?", options:["Isso, segundo essa ideia equivocada, só importa realmente para animais de estimação, nunca para produção","Não influencia em nada, nessa interpretação incorreta, a produtividade final de um rebanho de produção","Porque selecionar características desejadas (mais leite, mais carne, resistência a doenças) ao longo de gerações melhora geneticamente o rebanho todo","Reprodução é, segundo essa hipótese equivocada, apenas um evento natural sem nenhum tipo de controle possível"], correct:2, resolution:"Ao selecionar cuidadosamente quais animais se reproduzem (com base em características desejáveis, como produção de leite ou resistência a doenças), o produtor melhora geneticamente as próximas gerações do rebanho, aumentando a produtividade ao longo do tempo — é o princípio do melhoramento genético animal." },
      { level:"dificilimo", question:"Por que o bem-estar animal (espaço adequado, baixo estresse, boas condições sanitárias) é considerado hoje um fator ECONÔMICO, e não apenas ético, na pecuária moderna?", options:["Isso é apenas uma tendência de marketing recente, segundo essa hipótese equivocada, sem nenhuma base científica real por trás","Bem-estar animal, nessa interpretação incorreta, só importa comercialmente quando o produto final é destinado à exportação internacional","Porque animais estressados ou mal cuidados produzem menos leite, menos ganho de peso, e ficam mais suscetíveis a doenças, reduzindo a produtividade geral do rebanho","Bem-estar animal, segundo essa ideia equivocada, não tem relação nenhuma com produtividade ou resultados econômicos da produção"], correct:2, resolution:"Estudos em zootecnia mostram que animais estressados liberam hormônios (como cortisol) que prejudicam o ganho de peso, a produção de leite e a fertilidade, além de ficarem mais suscetíveis a doenças. Por isso, investir em bem-estar animal (espaço, conforto térmico, manejo de baixo estresse) não é só uma questão ética — reflete diretamente em melhores resultados produtivos e econômicos para o produtor." }
    ]
  },
  "eletroeletronica__eletronica": {
    title: "Eletrônica: os componentes por trás dos aparelhos",
    emoji: "🔧",
    intro: "Eletrônica é a área que estuda como controlar o fluxo de corrente elétrica usando componentes como resistores, capacitores e transistores, para fazer aparelhos funcionarem.",
    analogy: "Pense num circuito elétrico como um sistema de encanamento: a corrente elétrica é a água, os fios são os canos, e componentes como resistores são \"torneiras\" que controlam o quanto de \"água\" passa.",
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
  }
};;;;;;


