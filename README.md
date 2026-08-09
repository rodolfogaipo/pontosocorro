# 🛟 Ponto Socorro

App (PWA) para estudar o conteúdo do Ensino Médio da rede estadual de Minas Gerais,
explicado de forma fácil, ilustrada e com exercícios de 4 níveis de dificuldade.

## Como publicar no GitHub Pages (sem usar terminal)

1. Acesse [github.com](https://github.com) e clique em **New repository**.
2. Nomeie como `ponto-socorro` (pode ser outro nome), marque como **Public**, e clique em **Create repository**.
3. Na página do repositório recém-criado, clique em **uploading an existing file** (ou "Add file" → "Upload files").
4. Arraste **todos os arquivos e pastas** desta pasta (`index.html`, `manifest.json`, `service-worker.js`, `README.md`, e as pastas `css/`, `js/`, `icons/`) para a área de upload.
   - Importante: arraste o **conteúdo** da pasta, não a pasta zipada em si.
5. Clique em **Commit changes**.
6. Vá em **Settings** (do repositório) → **Pages** (menu lateral esquerdo).
7. Em "Build and deployment" → "Branch", selecione `main` e a pasta `/ (root)`, depois clique em **Save**.
8. Aguarde 1–2 minutos. O GitHub vai mostrar o link do site, algo como:
   `https://SEU-USUARIO.github.io/ponto-socorro/`
9. Abra esse link no celular e, no navegador, use a opção **"Adicionar à tela inicial"** (Chrome/Safari) para instalar como app.

## Estrutura do projeto

```
ponto-socorro/
├── index.html            → estrutura da página
├── manifest.json         → configuração do PWA (nome, ícone, cor)
├── service-worker.js     → funcionamento offline
├── css/style.css         → visual do app
├── js/content.js         → conteúdo da Formação Geral Básica (Regular/EJA)
├── js/content-extra.js   → Itinerário Formativo, EMTI e os 17 Cursos Técnicos
├── js/app.js             → lógica do app (navegação, salvar respostas, gerar PDF)
└── icons/                → ícones e logo do app
```

## As 3 trilhas do app

1. **Ensino Médio Regular** — 1º, 2º, 3º ano e EJA, com Formação Geral Básica (13 matérias) + Itinerário Formativo (Leitura e Protagonismo, Conexões Matemáticas, Projetos Integradores...)
2. **Tempo Integral (EMTI)** — mesma Formação Geral Básica + Atividades Integradoras (Projeto de Vida, Estudos Orientados, Práticas Experimentais, Nivelamento)
3. **Ensino Técnico** — os 17 cursos técnicos oferecidos pela rede estadual, cada um com sua grade real de matérias técnicas (Resolução SEE nº 5.212/2025)

## Como adicionar mais conteúdo depois

Todo o conteúdo fica em **`js/content.js`**, dentro do objeto `TOPICS`.
Cada tópico segue este formato — copie um bloco existente e ajuste:

```js
'2ano_geografia': {
  title: 'Título do tópico',
  emoji: '🌍',
  intro: 'Explicação bem simples, para uma criança de 9 anos entender.',
  analogy: 'Uma comparação com o dia a dia.',
  steps: ['Passo 1', 'Passo 2'],   // opcional
  exercises: [
    { level:'facil', question:'...', options:['a','b','c','d'], correct:0, resolution:'...' },
    { level:'medio', question:'...', options:['a','b','c','d'], correct:1, resolution:'...' },
    { level:'dificil', question:'...', options:['a','b','c','d'], correct:2, resolution:'...' },
    { level:'dificilimo', question:'...', options:['a','b','c','d'], correct:3, resolution:'...' },
  ]
}
```

A chave do objeto segue o padrão `MODULO_MATERIA` (ex: `1ano_matematica`, `eja_portugues`).
Os IDs de módulo são: `1ano`, `2ano`, `3ano`, `eja`.
Os IDs de matéria estão listados no início do arquivo, no array `SUBJECTS`.

Assim que você adicionar um tópico novo em `content.js`, ele aparece automaticamente
no app (o menu de matérias detecta sozinho o que já existe).

## O que já está pronto nesta versão

**Formação Geral Básica: 100% COMPLETO nos 4 módulos** (js/content.js)
Todas as 13 matérias, em todos os 4 módulos (1º ano, 2º ano, 3º ano e EJA):
Português, Matemática, Física, Química, Biologia, Geografia, História,
Sociologia, Filosofia, Arte, Inglês, Educação Física e Educação Digital.
**267 aulas, 1.068 exercícios no total do app.**

**Itinerário Formativo (js/content-extra.js):** os 6 componentes oficiais da matriz —
4 deles reaproveitam tópicos já escritos (mesma habilidade trabalhada), e 2 são
conteúdo novo: Inovação e Saberes em Sustentabilidade, Intervenção Cidadã.

**EMTI (js/content-extra.js):** as 5 atividades integradoras completas — Projeto
de Vida, Estudos Orientados, Práticas Experimentais, Nivelamento Português e
Nivelamento Matemática.

**Ensino Técnico (js/content-extra.js):** a grade completa e real dos **17 cursos**
já está na estrutura do app (nomes das matérias exatamente como na Resolução SEE),
com conteúdo-piloto completo em 4 matérias, uma de cada eixo, para servir de
modelo: Desenvolvimento de Sistemas → Algoritmos e Estrutura de Dados · Informática
→ Fundamentos de Programação · Agronegócio → Zootecnia · Eletroeletrônica → Eletrônica.

**Viés de tamanho: ZERO** em todo o app — todos os 1.068 exercícios têm as 4
alternativas balanceadas, sem a resposta certa se destacar por ser mais longa
que as erradas. Script de validação conferiu gabarito, 4 alternativas, resolução
e ausência de texto cortado em 100% dos exercícios. Cada matéria com mais de 1
aula abre numa tela de "lista de aulas" antes da explicação — a mesma estrutura
de navegação de um curso real.

**O que resta no backlog:** só o Ensino Técnico (186 das 190 matérias, ainda
"Em breve" na estrutura já pronta) — próximo bloco de trabalho.

## Recursos do app

- ✅ Explicação de cada tópico em linguagem muito simples, com analogias do dia a dia
- ✅ Exercícios em 4 níveis: Fácil, Médio, Difícil e Dificílimo 🔥
- ✅ Ao responder, mostra na hora se acertou ou errou, e a resolução comentada
- ✅ Progresso salvo 100% no celular (localStorage) — nada vai para nenhum servidor
- ✅ Botão para exportar os exercícios em PDF e resolver no papel
- ✅ Funciona offline depois da primeira visita (PWA com service worker)
- ✅ Instalável na tela inicial do celular, como um app nativo
