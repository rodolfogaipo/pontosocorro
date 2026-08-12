/* =========================================================
   PONTO SOCORRO — app.js (v2)
   SPA simples, sem frameworks, tudo salvo no localStorage.
   Agora com 3 trilhas: Regular, Tempo Integral (EMTI) e
   Ensino Técnico.
   ========================================================= */

const view = document.getElementById('view');
const btnBack = document.getElementById('btnBack');
const btnMenu = document.getElementById('btnMenu');
const brandHome = document.getElementById('brandHome');
const toastEl = document.getElementById('toast');

const STORAGE_KEY = 'pontoSocorro_progress_v1';

let historyStack = [{ route:'trackHome' }];

/* ---------------- Registro mestre de tópicos ----------------
   Uma única fonte de verdade: todo conteúdo (matérias comuns,
   itinerário, EMTI, técnico) é registrado aqui com uma chave
   única, para que navegação, exercícios e progresso funcionem
   de forma genérica em qualquer trilha. */
const MASTER_TOPICS = {};
const KEY_META = {}; // key -> {crumb, title, icon}

function reg(key, topicObj, meta){
  if (topicObj) MASTER_TOPICS[key] = topicObj;
  KEY_META[key] = meta;
}

function buildRegistry(){
  // 1) Regular — Formação Geral Básica (cada matéria é uma LISTA de aulas)
  MODULES.forEach(mod=>{
    SUBJECTS.forEach(sub=>{
      const key = `${mod.id}_${sub.id}`;
      const val = TOPICS[key];
      if (Array.isArray(val)){
        val.forEach((t, idx)=>{
          const fullKey = `${key}::${idx}`;
          reg(fullKey, t, { crumb:`${mod.name} · ${sub.name} · ${t.title}`, title: t.title, icon: sub.icon });
        });
      } else {
        reg(key, val, { crumb:`${mod.name} · ${sub.name}`, title: sub.name, icon: sub.icon });
      }
    });
  });

  // 2) Itinerário Formativo
  ITINERARY_ITEMS.forEach(item=>{
    item.modules.forEach(modId=>{
      const key = `itin_${modId}_${item.id}`;
      const modName = MODULES.find(m=>m.id===modId).name;
      let topic = ITIN_TOPICS[key];
      if (!topic && ITIN_ALIASES[key]){
        const target = TOPICS[ITIN_ALIASES[key]];
        topic = Array.isArray(target) ? target[0] : target;
      }
      reg(key, topic, { crumb:`Itinerário · ${modName} · ${item.name}`, title:item.name, icon:item.icon });
    });
  });

  // 3) EMTI — Atividades Integradoras (reaproveita o mesmo tópico nos 3 anos)
  ['1ano','2ano','3ano'].forEach(modId=>{
    const modName = MODULES.find(m=>m.id===modId).name;
    EMTI_ITEMS.forEach(item=>{
      const key = `emti_${modId}_${item.id}`;
      const topic = EMTI_TOPICS[item.id] || null;
      reg(key, topic, { crumb:`Tempo Integral · ${modName} · ${item.name}`, title:item.name, icon:item.icon });
    });
  });

  // 4) Técnico — Formação Técnica Específica
  TECH_COURSES.forEach(course=>{
    course.subjects.forEach(subjName=>{
      const slug = slugify(subjName);
      const key = `tec_${course.id}__${slug}`;
      const topic = TECH_TOPICS[`${course.id}__${slug}`] || null;
      reg(key, topic, { crumb:`${course.name} · ${subjName}`, title: subjName, icon: course.icon });
    });
  });
}
buildRegistry();

/* ---------------- Persistência local ---------------- */
function loadProgress(){
  try{ return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }catch(e){ return {}; }
}
function saveProgress(data){ localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
function getTopicProgress(key){ return loadProgress()[key] || {}; }
function saveAnswer(key, exIndex, selectedIndex, isCorrect){
  const all = loadProgress();
  if (!all[key]) all[key] = {};
  all[key][exIndex] = { selected:selectedIndex, correct:isCorrect, ts:Date.now() };
  saveProgress(all);
}
function resetProgress(){ localStorage.removeItem(STORAGE_KEY); }

/* ---------------- Navegação ---------------- */
function go(route, params={}){
  historyStack.push({ route, params });
  render(historyStack[historyStack.length-1]);
  window.scrollTo(0,0);
}
function goBack(){
  if (historyStack.length > 1){ historyStack.pop(); render(historyStack[historyStack.length-1]); }
  else render(historyStack[0]);
  window.scrollTo(0,0);
}
function goRoot(route){
  historyStack = [{ route, params:{} }];
  render(historyStack[0]);
  window.scrollTo(0,0);
}
btnBack.addEventListener('click', goBack);
brandHome.addEventListener('click', () => goRoot('trackHome'));

document.querySelectorAll('.navbtn').forEach(b=>{
  b.addEventListener('click', () => {
    document.querySelectorAll('.navbtn').forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    goRoot(b.dataset.nav === 'home' ? 'trackHome' : b.dataset.nav);
  });
});
btnMenu.addEventListener('click', () => {
  document.querySelectorAll('.navbtn').forEach(x=>x.classList.remove('active'));
  document.querySelector('[data-nav="progress"]').classList.add('active');
  goRoot('progress');
});

function toast(msg){
  toastEl.textContent = msg;
  toastEl.hidden = false;
  clearTimeout(toast._t);
  toast._t = setTimeout(()=>{ toastEl.hidden = true; }, 2200);
}

/* ---------------- Glossário ---------------- */
let _glossRegex = null;
function buildGlossRegex(){
  const escaped = GLOSSARY.map(g => g.term.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'));
  _glossRegex = new RegExp('(?<![\\p{L}\\p{N}])(' + escaped.join('|') + ')(?![\\p{L}\\p{N}])', 'giu');
}
function glossify(text){
  if (!text) return text;
  if (!_glossRegex) buildGlossRegex();
  return text.replace(_glossRegex, (match) => `<span class="gloss-term" data-term="${match.toLowerCase()}">${match}</span>`);
}
const glossOverlay = document.getElementById('glossOverlay');
const glossSheet = document.getElementById('glossSheet');
const glossWordEl = document.getElementById('glossWord');
const glossDefEl = document.getElementById('glossDef');

function showGlossary(termKey){
  const entry = GLOSSARY.find(g => g.term.toLowerCase() === termKey.toLowerCase());
  if (!entry) return;
  glossWordEl.textContent = entry.term.charAt(0).toUpperCase() + entry.term.slice(1);
  glossDefEl.textContent = entry.def;
  glossOverlay.hidden = false;
  glossSheet.hidden = false;
}
function hideGlossary(){ glossOverlay.hidden = true; glossSheet.hidden = true; }
glossOverlay.addEventListener('click', hideGlossary);
document.getElementById('glossClose').addEventListener('click', hideGlossary);
document.addEventListener('click', (e)=>{
  const el = e.target.closest('.gloss-term');
  if (el) showGlossary(el.dataset.term);
});

/* ---------------- Render principal ---------------- */
function render(entry){
  btnBack.hidden = entry.route === 'trackHome';
  const p = entry.params || {};
  if (entry.route === 'trackHome') renderTrackHome();
  else if (entry.route === 'regularModuleList') renderModulePicker('regular');
  else if (entry.route === 'emtiModuleList') renderModulePicker('emti');
  else if (entry.route === 'regularModule') renderRegularModule(p.moduleId);
  else if (entry.route === 'emtiModule') renderEmtiModule(p.moduleId);
  else if (entry.route === 'tecnicoList') renderTecnicoList();
  else if (entry.route === 'tecnicoCourse') renderTecnicoCourse(p.courseId);
  else if (entry.route === 'subjectTopicList') renderSubjectTopicList(p.moduleId, p.subjectId);
  else if (entry.route === 'topic') renderTopic(p.key);
  else if (entry.route === 'topicExercises') renderTopicExercises(p.key);
  else if (entry.route === 'progress') renderProgress();
  else if (entry.route === 'about') renderAbout();
}

/* ---------------- Helper: grid de cards genérico ---------------- */
function cardGridHtml(items){
  return items.map(it=>{
    const has = !!MASTER_TOPICS[it.key];
    return `
      <button class="subject-card" data-key="${it.key}">
        ${has ? '' : '<span class="badge-soon">Em breve</span>'}
        <span class="s-icon" style="background:${(it.color||'#FF7A29')}22;color:${it.color||'#FF7A29'}">${it.icon}</span>
        <span class="s-name">${it.name}</span>
      </button>
    `;
  }).join('');
}
function bindCardGrid(container){
  container.querySelectorAll('.subject-card').forEach(el=>{
    el.addEventListener('click', ()=> go('topic', { key: el.dataset.key }));
  });
}

/* ---------------- TRACK HOME (nova tela inicial) ---------------- */
function renderTrackHome(){
  view.innerHTML = `
    <div class="hero">
      <h1>Bora estudar? 🛟</h1>
      <p>Escolha sua trilha: Ensino Médio Regular, Tempo Integral ou um Curso Técnico.</p>
    </div>
    <div class="eyebrow">Escolha a trilha</div>
    <div class="module-grid" style="grid-template-columns:1fr;">
      ${TRACKS.map(t => {
        const isTecnico = t.id === 'tecnico';
        return `
        <button class="module-card" data-track="${t.id}" ${isTecnico ? 'disabled' : ''} style="text-align:left; display:flex; align-items:center; gap:14px; ${isTecnico ? 'opacity:0.55; cursor:not-allowed;' : ''}">
          <span style="font-size:32px">${t.icon}</span>
          <span>
            <span class="m-name" style="display:block">${t.name}</span>
            <span class="m-sub">${t.subtitle}</span>
            ${isTecnico ? '<span class="badge-soon" style="display:inline-block; margin-top:6px;">EM BREVE</span>' : ''}
          </span>
        </button>
      `;}).join('')}
    </div>
  `;
  view.querySelectorAll('[data-track]').forEach(el=>{
    el.addEventListener('click', ()=>{
      const t = el.dataset.track;
      if (t === 'tecnico') return; // ainda não disponível
      if (t === 'regular') go('regularModuleList');
      if (t === 'emti') go('emtiModuleList');
    });
  });
}

function renderModulePicker(track){
  const mods = track === 'emti' ? MODULES.filter(m=>m.id!=='eja') : MODULES;
  const title = track === 'emti' ? 'Tempo Integral (EMTI)' : 'Ensino Médio Regular';
  view.innerHTML = `
    <div class="topic-header">
      <h2>${title}</h2>
      <div class="breadcrumb">Escolha o módulo</div>
    </div>
    <div class="module-grid">
      ${mods.map(m => `
        <button class="module-card" data-mod="${m.id}">
          <span class="m-name">${m.name}</span>
          <span class="m-sub">${m.subtitle}</span>
        </button>
      `).join('')}
    </div>
  `;
  view.querySelectorAll('.module-card').forEach(el=>{
    el.addEventListener('click', ()=> go(track==='emti' ? 'emtiModule' : 'regularModule', { moduleId: el.dataset.mod }));
  });
}

/* ---------------- REGULAR: matérias + itinerário ---------------- */
function fgbGridHtml(moduleId){
  return SUBJECTS.map(s=>{
    const key = `${moduleId}_${s.id}`;
    const val = TOPICS[key];
    const isMulti = Array.isArray(val);
    const has = isMulti ? val.length>0 : !!val;
    const badge = isMulti && val.length>0
      ? `<span class="badge-count">${val.length}</span>`
      : (has ? '' : '<span class="badge-soon">Em breve</span>');
    return `
      <button class="subject-card" data-key="${key}" data-multi="${isMulti}">
        ${badge}
        <span class="s-icon" style="background:${s.color}22;color:${s.color}">${s.icon}</span>
        <span class="s-name">${s.name}</span>
      </button>
    `;
  }).join('');
}
function bindFgbGrid(container, moduleId){
  container.querySelectorAll('.subject-card').forEach(el=>{
    el.addEventListener('click', ()=>{
      const key = el.dataset.key;
      if (el.dataset.multi === 'true'){
        go('subjectTopicList', { moduleId, subjectId: key.slice(moduleId.length+1) });
      } else {
        go('topic', { key });
      }
    });
  });
}

function renderRegularModule(moduleId){
  const mod = MODULES.find(m=>m.id===moduleId);
  const itinItems = ITINERARY_ITEMS.filter(it=>it.modules.includes(moduleId))
    .map(it=>({ key:`itin_${moduleId}_${it.id}`, name:it.name, icon:it.icon, color:it.color }));

  view.innerHTML = `
    <div class="topic-header">
      <div class="breadcrumb">Ensino Médio Regular</div>
      <h2>${mod.name} — ${mod.subtitle}</h2>
    </div>
    <div class="eyebrow">Formação Geral Básica</div>
    <div class="subject-grid" id="fgbGrid"></div>

    ${itinItems.length ? `
    <div class="eyebrow" style="margin-top:22px">Itinerário Formativo</div>
    <div class="subject-grid" id="itinGrid"></div>` : ''}
  `;
  const fgbGrid = document.getElementById('fgbGrid');
  fgbGrid.innerHTML = fgbGridHtml(moduleId);
  bindFgbGrid(fgbGrid, moduleId);

  const itinGrid = document.getElementById('itinGrid');
  if (itinGrid){
    itinGrid.innerHTML = cardGridHtml(itinItems);
    bindCardGrid(itinGrid);
  }
}

/* ---------------- Lista de aulas de uma matéria (quando tem mais de 1) ---------------- */
function renderSubjectTopicList(moduleId, subjectId){
  const mod = MODULES.find(m=>m.id===moduleId);
  const sub = SUBJECTS.find(s=>s.id===subjectId);
  const key = `${moduleId}_${subjectId}`;
  const topics = TOPICS[key] || [];

  view.innerHTML = `
    <div class="topic-header">
      <div class="topic-emoji">${sub.icon}</div>
      <div class="breadcrumb">${mod.name}</div>
      <h2>${sub.name}</h2>
    </div>
    <div class="eyebrow">${topics.length} aulas disponíveis</div>
    <div id="topicListGrid"></div>
  `;
  const grid = document.getElementById('topicListGrid');
  topics.forEach((t, idx)=>{
    const fullKey = `${key}::${idx}`;
    const prog = getTopicProgress(fullKey);
    const done = Object.keys(prog).length;
    const total = t.exercises.length;
    const item = document.createElement('div');
    item.className = 'progress-item';
    item.style.cursor = 'pointer';
    item.innerHTML = `
      <span class="p-icon">${t.emoji}</span>
      <div class="p-info">
        <div class="p-title">${t.title}</div>
        <div class="p-sub">${done}/${total} exercícios feitos</div>
        <div class="progress-bar-track"><div class="progress-bar-fill" style="width:${(done/total)*100}%"></div></div>
      </div>
    `;
    item.addEventListener('click', ()=> go('topic', { key: fullKey }));
    grid.appendChild(item);
  });
}

/* ---------------- EMTI: FGB + Atividades Integradoras ---------------- */
function renderEmtiModule(moduleId){
  const mod = MODULES.find(m=>m.id===moduleId);
  const emtiItems = EMTI_ITEMS.map(it=>({ key:`emti_${moduleId}_${it.id}`, name:it.name, icon:it.icon, color:it.color }));

  view.innerHTML = `
    <div class="topic-header">
      <div class="breadcrumb">Tempo Integral (EMTI)</div>
      <h2>${mod.name} — Formação completa</h2>
    </div>
    <div class="card" style="margin-bottom:18px">
      <p>No Tempo Integral, além das matérias normais, você tem mais tempo de aula e atividades extras como Projeto de Vida e Estudos Orientados.</p>
    </div>
    <div class="eyebrow">Formação Geral Básica</div>
    <div class="subject-grid" id="fgbGrid"></div>

    <div class="eyebrow" style="margin-top:22px">Atividades Integradoras</div>
    <div class="subject-grid" id="emtiGrid"></div>
  `;
  const fgbGrid = document.getElementById('fgbGrid');
  fgbGrid.innerHTML = fgbGridHtml(moduleId);
  bindFgbGrid(fgbGrid, moduleId);

  const emtiGrid = document.getElementById('emtiGrid');
  emtiGrid.innerHTML = cardGridHtml(emtiItems);
  bindCardGrid(emtiGrid);
}

/* ---------------- TÉCNICO: lista de cursos ---------------- */
function renderTecnicoList(){
  view.innerHTML = `
    <div class="topic-header">
      <h2>🛠️ Ensino Técnico</h2>
      <div class="breadcrumb">17 cursos oferecidos pela rede estadual — escolha o seu</div>
    </div>
    <div class="subject-grid" id="courseGrid"></div>
  `;
  const grid = document.getElementById('courseGrid');
  grid.innerHTML = TECH_COURSES.map(c => `
    <button class="subject-card" data-course="${c.id}">
      <span class="s-icon" style="background:#FF7A2922;color:#FF7A29">${c.icon}</span>
      <span class="s-name">${c.name.replace('Técnico em ','')}</span>
    </button>
  `).join('');
  grid.querySelectorAll('.subject-card').forEach(el=>{
    el.addEventListener('click', ()=> go('tecnicoCourse', { courseId: el.dataset.course }));
  });
}

function renderTecnicoCourse(courseId){
  const course = TECH_COURSES.find(c=>c.id===courseId);
  const items = course.subjects.map(subjName=>{
    const slug = slugify(subjName);
    return { key:`tec_${course.id}__${slug}`, name: subjName, icon: course.icon, color:'#FF7A29' };
  });

  view.innerHTML = `
    <div class="topic-header">
      <div class="topic-emoji">${course.icon}</div>
      <div class="breadcrumb">Ensino Técnico · Eixo: ${course.eixo}</div>
      <h2>${course.name}</h2>
    </div>
    <div class="card" style="margin-bottom:18px">
      <p>Além dessas matérias técnicas, o curso também inclui a Formação Geral Básica (Português, Matemática, Física, Química, Biologia, Geografia, História, Sociologia, Filosofia, Arte, Inglês e Educação Digital) — mesmo conteúdo do Ensino Médio Regular.</p>
    </div>
    <div class="eyebrow">Formação Técnica Específica</div>
    <div class="subject-grid" id="techGrid"></div>
  `;
  const grid = document.getElementById('techGrid');
  grid.innerHTML = cardGridHtml(items);
  bindCardGrid(grid);
}

/* ---------------- TOPIC (explicação, genérico p/ todas as trilhas) ---------------- */
function renderTopic(key){
  const topic = MASTER_TOPICS[key];
  const meta = KEY_META[key] || {};

  if (!topic){
    view.innerHTML = `
      <div class="topic-header">
        <div class="topic-emoji">🚧</div>
        <div class="breadcrumb">${meta.crumb || ''}</div>
        <h2>${meta.title || 'Em construção'}</h2>
      </div>
      <div class="empty-state">
        <span class="e-emoji">🧰</span>
        <p>Esse conteúdo ainda está sendo preparado, mas já reservamos o lugar certo dele na grade — em breve chega por aqui!</p>
      </div>`;
    return;
  }

  const prog = getTopicProgress(key);
  const answered = Object.keys(prog).length;
  const total = topic.exercises.length;

  view.innerHTML = `
    <div class="topic-header">
      <div class="topic-emoji">${topic.emoji}</div>
      <div class="breadcrumb">${meta.crumb || ''}</div>
      <h2>${topic.title}</h2>
    </div>

    <div class="card">
      <h3>💡 Explicando de um jeito fácil</h3>
      <p>${glossify(topic.intro)}</p>
    </div>

    ${topic.visual ? renderVisual(topic.visual) : ''}

    <div class="card analogy-card">
      <h3>🌟 Pensa assim...</h3>
      <p>${glossify(topic.analogy)}</p>
    </div>

    ${topic.steps ? `
    <div class="card steps-card">
      <h3>🪜 Passo a passo</h3>
      <ol>${topic.steps.map(s=>`<li>${glossify(s)}</li>`).join('')}</ol>
    </div>` : ''}

    <div class="cta-row">
      <button class="btn btn-primary btn-full" id="btnGoExercises">✏️ Fazer exercícios (${answered}/${total})</button>
    </div>
  `;
  document.getElementById('btnGoExercises').addEventListener('click', ()=> go('topicExercises', { key }));
}

/* ---------------- EXERCISES (genérico) ---------------- */
function renderTopicExercises(key){
  const topic = MASTER_TOPICS[key];
  const meta = KEY_META[key] || {};
  if (!topic){ renderTopic(key); return; }
  const prog = getTopicProgress(key);

  view.innerHTML = `
    <div class="topic-header">
      <div class="breadcrumb">${meta.crumb || ''}</div>
      <h2>${topic.emoji} Exercícios: ${topic.title}</h2>
    </div>

    <details class="card summary-card" id="studyRecap" open>
      <summary>📚 Antes de responder: revise a matéria</summary>
      <div class="summary-body">
        <p><strong>💡 Resumo:</strong> ${glossify(topic.intro)}</p>
        ${topic.steps ? `
        <p style="margin-top:12px"><strong>🪜 Passo a passo / fórmulas:</strong></p>
        <ol>${topic.steps.map(s=>`<li>${glossify(s)}</li>`).join('')}</ol>` : ''}
      </div>
    </details>

    <div class="ex-toolbar">
      <button class="btn btn-outline" id="btnPdf">📄 Salvar em PDF</button>
      <button class="btn btn-ghost" id="btnRedo">🔄 Refazer</button>
    </div>

    <div id="exList"></div>
  `;

  const list = document.getElementById('exList');
  topic.exercises.forEach((ex, idx)=>{
    const lvl = LEVELS.find(l=>l.id===ex.level);
    const saved = prog[idx];
    const card = document.createElement('div');
    card.className = 'exercise';
    card.innerHTML = `
      <div class="ex-head">
        <span class="level-badge" style="background:${lvl.color}">${lvl.label}</span>
        <span class="ex-status">${saved ? (saved.correct ? '✅' : '❌') : ''}</span>
      </div>
      <p class="ex-question">${idx+1}. ${glossify(ex.question)}</p>
      <div class="options">
        ${ex.options.map((opt,i)=>`
          <button class="option ${saved && i===saved.selected ? 'selected':''} ${saved && i===ex.correct ? 'correct' : (saved && i===saved.selected && i!==ex.correct ? 'wrong':'')}"
                  data-idx="${i}" ${saved ? 'disabled':''}>
            <span class="opt-letter">${String.fromCharCode(65+i)}</span>
            <span>${glossify(opt)}</span>
          </button>
        `).join('')}
      </div>
      <div class="resolution" ${saved ? '' : 'hidden'}>
        <strong>Resposta certa: ${String.fromCharCode(65+ex.correct)}) ${glossify(ex.options[ex.correct])}</strong><br><br>
        ${glossify(ex.resolution)}
      </div>
    `;
    list.appendChild(card);

    if (!saved){
      card.querySelectorAll('.option').forEach(btn=>{
        btn.addEventListener('click', ()=>{
          const chosen = parseInt(btn.dataset.idx);
          const isCorrect = chosen === ex.correct;
          saveAnswer(key, idx, chosen, isCorrect);
          card.querySelectorAll('.option').forEach((b,i)=>{
            b.disabled = true;
            if (i===ex.correct) b.classList.add('correct');
            if (i===chosen && !isCorrect) b.classList.add('wrong');
            if (i===chosen) b.classList.add('selected');
          });
          card.querySelector('.resolution').hidden = false;
          card.querySelector('.ex-status').textContent = isCorrect ? '✅' : '❌';
          toast(isCorrect ? 'Boa! Resposta certa 🎉' : 'Não foi dessa vez, mas olha a explicação 👇');
        });
      });
    }
  });

  document.getElementById('btnRedo').addEventListener('click', ()=>{
    const all = loadProgress();
    delete all[key];
    saveProgress(all);
    renderTopicExercises(key);
    toast('Exercícios reiniciados!');
  });

  document.getElementById('btnPdf').addEventListener('click', ()=> exportPdf(topic, meta));
}

/* ---------------- PDF EXPORT ---------------- */
function exportPdf(topic, meta){
  if (!window.jspdf){ toast('PDF ainda carregando, tenta de novo em 1s'); return; }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit:'pt', format:'a4' });
  const marginX = 48;
  let y = 56;
  const pageH = 842;

  doc.setFont('helvetica','bold');
  doc.setFontSize(18);
  doc.setTextColor(20,30,60);
  doc.text('Ponto Socorro', marginX, y);
  y += 22;
  doc.setFontSize(12.5);
  doc.setTextColor(90,90,90);
  const crumbLines = doc.splitTextToSize(`${meta.crumb || ''} — ${topic.title}`, 500);
  doc.text(crumbLines, marginX, y);
  y += crumbLines.length * 14 + 6;
  doc.setDrawColor(230,90,40);
  doc.setLineWidth(1.2);
  doc.line(marginX, y, 548, y);
  y += 26;

  topic.exercises.forEach((ex, idx)=>{
    if (y > pageH - 140){ doc.addPage(); y = 56; }
    doc.setFont('helvetica','bold');
    doc.setFontSize(11);
    doc.setTextColor(230,90,40);
    doc.text(`Nível: ${LEVELS.find(l=>l.id===ex.level).label}`, marginX, y);
    y += 16;

    doc.setFont('helvetica','bold');
    doc.setFontSize(12.5);
    doc.setTextColor(20,20,20);
    const qLines = doc.splitTextToSize(`${idx+1}. ${ex.question}`, 500);
    doc.text(qLines, marginX, y);
    y += qLines.length * 16 + 6;

    doc.setFont('helvetica','normal');
    doc.setFontSize(11.5);
    ex.options.forEach((opt,i)=>{
      const optLines = doc.splitTextToSize(`${String.fromCharCode(65+i)}) ${opt}`, 480);
      if (y > pageH - 80){ doc.addPage(); y = 56; }
      doc.text(optLines, marginX+14, y);
      y += optLines.length * 15;
    });

    y += 14;
    doc.setDrawColor(210,210,210);
    doc.text('Resposta: _____   Resolução:', marginX, y);
    y += 6;
    for (let i=0;i<2;i++){
      y += 18;
      if (y > pageH - 60){ doc.addPage(); y = 56; }
      doc.line(marginX, y, 548, y);
    }
    y += 26;
  });

  doc.setFont('helvetica','italic');
  doc.setFontSize(9);
  doc.setTextColor(140,140,140);
  doc.text('Gerado pelo app Ponto Socorro — resolva no papel e confira depois no app.', marginX, pageH-30);

  const filename = `PontoSocorro_${topic.title.replace(/[^a-zA-Z0-9]+/g,'')}.pdf`;
  doc.save(filename);
  toast('PDF baixado! 📄');
}

/* ---------------- PROGRESS ---------------- */
function renderProgress(){
  const all = loadProgress();
  const topicKeys = Object.keys(all).filter(k => MASTER_TOPICS[k]);

  let totalAnswered = 0, totalCorrect = 0;
  topicKeys.forEach(k=>{
    Object.values(all[k]).forEach(e=>{
      totalAnswered++;
      if (e.correct) totalCorrect++;
    });
  });
  const pct = totalAnswered ? Math.round((totalCorrect/totalAnswered)*100) : 0;

  view.innerHTML = `
    <div class="topic-header">
      <h2>📊 Seu progresso</h2>
      <div class="breadcrumb">Tudo salvo só no seu celular</div>
    </div>
    <div class="progress-summary">
      <div class="stat"><span class="num">${totalAnswered}</span><span class="lab">Exercícios feitos</span></div>
      <div class="stat"><span class="num">${totalCorrect}</span><span class="lab">Acertos</span></div>
      <div class="stat"><span class="num">${pct}%</span><span class="lab">Aproveitamento</span></div>
    </div>
    <div class="eyebrow">Por tópico</div>
    <div id="progList"></div>
    ${topicKeys.length ? `<button class="btn btn-ghost btn-full" id="btnReset" style="margin-top:16px">🗑️ Apagar todo o progresso</button>` : ''}
  `;

  const listEl = document.getElementById('progList');
  if (!topicKeys.length){
    listEl.innerHTML = `<div class="empty-state"><span class="e-emoji">🛟</span><p>Você ainda não fez nenhum exercício. Bora começar?</p></div>`;
  } else {
    topicKeys.forEach(k=>{
      const topic = MASTER_TOPICS[k];
      const meta = KEY_META[k] || {};
      const exs = all[k];
      const done = Object.keys(exs).length;
      const correct = Object.values(exs).filter(e=>e.correct).length;
      const total = topic.exercises.length;
      const item = document.createElement('div');
      item.className = 'progress-item';
      item.innerHTML = `
        <span class="p-icon">${meta.icon || '📘'}</span>
        <div class="p-info">
          <div class="p-title">${topic.title}</div>
          <div class="p-sub">${meta.crumb || ''} · ${correct}/${done} certas</div>
          <div class="progress-bar-track"><div class="progress-bar-fill" style="width:${(done/total)*100}%"></div></div>
        </div>
      `;
      item.style.cursor='pointer';
      item.addEventListener('click', ()=> go('topicExercises', { key:k }));
      listEl.appendChild(item);
    });
  }

  const resetBtn = document.getElementById('btnReset');
  if (resetBtn) resetBtn.addEventListener('click', ()=>{
    if (confirm('Tem certeza que quer apagar TODO o seu progresso salvo neste celular?')){
      resetProgress();
      renderProgress();
      toast('Progresso apagado.');
    }
  });
}

/* ---------------- ABOUT ---------------- */
function renderAbout(){
  view.innerHTML = `
    <div class="topic-header">
      <div class="topic-emoji">🛟</div>
      <h2>Sobre o Ponto Socorro</h2>
    </div>
    <div class="about-block card">
      <h3>O que é</h3>
      <p>Um app para estudar o conteúdo do Ensino Médio da rede estadual de Minas Gerais — Regular, Tempo Integral e Técnico — explicado de um jeito bem fácil de entender.</p>
    </div>
    <div class="about-block card">
      <h3>Seus dados</h3>
      <p>Tudo o que você responde fica guardado 100% no seu celular (localStorage). Nada é enviado para nenhum servidor.</p>
    </div>
    <div class="about-block card">
      <h3>Exercícios no papel</h3>
      <p>Em cada tópico, use o botão "Salvar em PDF" para baixar os exercícios e resolver com papel e caneta.</p>
    </div>
    <div class="about-block card">
      <h3>Conteúdo em construção</h3>
      <p>A grade de matérias já está completa (Regular, EMTI e os 17 cursos técnicos), mas o conteúdo explicativo vai sendo adicionado aos poucos. Onde estiver "Em breve", é porque ainda está sendo preparado.</p>
    </div>
  `;
}

/* ---------------- Boot ---------------- */
render(historyStack[0]);

if ('serviceWorker' in navigator){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('service-worker.js').catch(()=>{});
  });
}
