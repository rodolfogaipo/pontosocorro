/* =========================================================
   PONTO SOCORRO — glossary.js
   Palavras difíceis usadas no conteúdo, com definição bem
   simples. O app.js destaca essas palavras no texto e mostra
   a definição quando a pessoa toca nelas.
   ========================================================= */

const GLOSSARY = [
  // Português / linguagem
  { term:'interpretar',        def:'Entender o que um texto realmente quer dizer, não só ler as palavras.' },
  { term:'protagonismo',       def:'Ser o "personagem principal" da própria vida, tomando decisões por conta própria.' },
  { term:'entrelinhas',        def:'O que o texto sugere sem dizer diretamente — você precisa "adivinhar" pela pista.' },
  { term:'metáfora',           def:'Comparar duas coisas sem usar "como" (ex: "seus olhos são estrelas").' },
  { term:'comparação',         def:'Relacionar duas coisas parecidas, geralmente usando a palavra "como".' },
  { term:'hipérbole',          def:'Um exagero de propósito para dar mais força à frase (ex: "já te falei mil vezes").' },
  { term:'paradoxo',           def:'Juntar duas ideias que parecem opostas, para causar um efeito forte (ex: "um silêncio ensurdecedor").' },
  { term:'oxímoro',            def:'O mesmo que paradoxo: unir duas palavras de sentido contrário de propósito.' },
  { term:'conectivo',          def:'Palavrinha que liga duas ideias numa frase (tipo "mas", "porque", "embora").' },
  { term:'figura de linguagem',def:'Um "truque" de escrita para deixar o texto mais bonito ou mais forte.' },
  { term:'argumento',          def:'Uma razão lógica que você dá para defender uma ideia.' },
  { term:'dissertativa',       def:'Tipo de texto onde você defende uma opinião com argumentos organizados.' },
  { term:'intervenção',        def:'Uma sugestão prática de como resolver um problema.' },

  // Matemática
  { term:'aceleração',         def:'O quanto a velocidade de algo muda a cada segundo.' },
  { term:'juros compostos',    def:'Quando o "extra" que você ganha (ou paga) também passa a render juros no período seguinte.' },
  { term:'mediana',            def:'O valor bem no meio de uma lista de números organizados do menor pro maior.' },
  { term:'moda',               def:'O número que mais se repete numa lista.' },
  { term:'função',             def:'Uma "máquina" matemática: você coloca um número e ela devolve outro, seguindo uma regra fixa.' },
  { term:'regra de três',      def:'Uma forma de descobrir um valor desconhecido quando duas coisas crescem juntas (ex: preço e quantidade).' },
  { term:'proporção',          def:'Quando duas grandezas crescem ou diminuem sempre na mesma "medida" uma da outra.' },

  // Física / Química
  { term:'inércia',            def:'A "preguiça natural" das coisas: um objeto parado tende a continuar parado, e um em movimento tende a continuar se movendo.' },
  { term:'átomo',              def:'A menor partícula que forma tudo que existe — tão pequena que não dá pra ver.' },
  { term:'prótons',            def:'Partículas com carga positiva que ficam no núcleo do átomo.' },
  { term:'elétrons',           def:'Partículas com carga negativa que ficam "girando" ao redor do núcleo do átomo.' },
  { term:'íons',               def:'Átomos que ganharam ou perderam elétrons, ficando com carga elétrica.' },
  { term:'isômeros',           def:'Moléculas feitas dos mesmos átomos, mas montadas de um jeito diferente — como duas casas com os mesmos tijolos, montadas diferente.' },
  { term:'reatividade',        def:'O quanto um elemento "gosta" de reagir (se combinar) com outros.' },
  { term:'ligação covalente',  def:'Quando dois átomos "dividem" elétrons para ficarem grudados um no outro.' },

  // Biologia
  { term:'mitocôndria',        def:'A parte da célula que produz energia — por isso é chamada de "usina de energia" da célula.' },
  { term:'cloroplastos',       def:'Parte da célula das plantas que faz a fotossíntese (transforma luz do sol em energia).' },
  { term:'gene dominante',     def:'Uma característica que aparece mesmo se você herdar só uma cópia dela.' },
  { term:'gene recessivo',     def:'Uma característica que só aparece se você herdar as duas cópias dela (do pai E da mãe).' },
  { term:'poligênica',         def:'Uma característica controlada por vários genes juntos, não só um (por isso tem tanta variação, como a altura).' },

  // Geografia / História
  { term:'hemisfério',         def:'Cada uma das duas "metades" da Terra, divididas pela Linha do Equador.' },
  { term:'êxodo rural',        def:'Quando muita gente sai do campo e vai morar na cidade.' },
  { term:'multinacional',      def:'Uma empresa grande que tem operações em vários países ao mesmo tempo.' },
  { term:'globalização',       def:'O processo de países ficarem cada vez mais conectados pela economia, tecnologia e cultura.' },
  { term:'glocalização',       def:'Quando uma marca global adapta seu produto ao gosto de cada país/região.' },
  { term:'economia circular',  def:'Um jeito de produzir que tenta reduzir, reusar e reciclar, em vez de simplesmente jogar tudo fora.' },
  { term:'geoprocessamento',   def:'Usar mapas e computador para estudar e organizar informações sobre um lugar.' },

  // Sociologia / Filosofia
  { term:'instituição social', def:'Um grupo organizado que existe para cumprir uma função importante na sociedade, como a escola ou a família.' },
  { term:'papel social',       def:'O comportamento que se espera de alguém, dependendo da posição que ocupa (ex: professor, filho).' },
  { term:'coercitivo',         def:'Que pressiona ou "obriga" alguém a seguir uma regra, mesmo sem perceber.' },
  { term:'falácia',            def:'Um erro no raciocínio que parece lógico, mas na verdade não prova nada.' },

  // Educação Digital / Técnico
  { term:'algoritmo',          def:'Uma sequência de passos, em ordem, para resolver um problema — como uma receita de bolo.' },
  { term:'estrutura de dados', def:'Um jeito organizado de guardar informação no computador para achar e usar mais rápido.' },
  { term:'variável',           def:'Uma "caixinha" na programação que guarda um valor, e esse valor pode mudar.' },
  { term:'laço de repetição',  def:'Um comando que repete uma ação várias vezes sem precisar copiar e colar o código.' },
  { term:'busca binária',      def:'Um jeito rápido de achar algo numa lista ORDENADA, descartando metade das opções a cada tentativa.' },
  { term:'resistor',           def:'Peça eletrônica que controla (limita) a quantidade de corrente elétrica que passa.' },
  { term:'capacitor',          def:'Peça eletrônica que guarda um pouquinho de energia elétrica e libera quando precisa.' },
  { term:'transistor',         def:'Peça eletrônica que funciona como uma "chavinha" que liga, desliga ou amplifica sinais elétricos.' },
  { term:'zootecnia',          def:'A ciência que estuda como cuidar bem de animais criados para produção (gado, aves, etc).' },
];

// pré-ordena por tamanho do termo (maior primeiro) pra não quebrar termos compostos
GLOSSARY.sort((a,b)=> b.term.length - a.term.length);
