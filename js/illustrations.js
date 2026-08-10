/* =========================================================
   PONTO SOCORRO — illustrations.js
   Motor de ilustrações SVG reutilizáveis, geradas por código
   (funcionam 100% offline, sem depender de imagens externas).
   Cada aula pode declarar um campo `visual` com um tipo e
   parâmetros; essas funções desenham o diagrama correspondente.
   ========================================================= */

const VIZ_COLORS = ['#2E86AB','#E63946','#2A9D8F','#F4A261','#457B9D','#8E44AD','#E76F51'];

function vizEsc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function vizWrap(inner, height, viewBoxW){
  const w = viewBoxW || 340;
  return `<div class="topic-visual"><svg viewBox="0 0 ${w} ${height}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustração da aula">${inner}</svg></div>`;
}

/* Quebra um texto em linhas de até ~maxChars, para caber em uma caixa. */
function vizWrapText(text, maxChars){
  const words = String(text).split(/\s+/);
  const lines = [];
  let cur = '';
  words.forEach(w=>{
    if ((cur + ' ' + w).trim().length > maxChars){ lines.push(cur.trim()); cur = w; }
    else cur = (cur + ' ' + w).trim();
  });
  if (cur) lines.push(cur.trim());
  return lines;
}

function vizMultilineText(x, yCenter, text, maxChars, opts){
  opts = opts || {};
  const lines = vizWrapText(text, maxChars);
  const lh = opts.lineHeight || 13;
  const startY = yCenter - ((lines.length-1)*lh)/2;
  return lines.map((l,i)=>`<text x="${x}" y="${startY + i*lh}" text-anchor="${opts.anchor||'middle'}" font-size="${opts.size||11}" fill="${opts.fill||'#1d2530'}" font-weight="${opts.weight||'400'}">${vizEsc(l)}</text>`).join('');
}

/* ---------- 1. CICLO (processo circular, ex: ciclo da água, ciclo celular) ---------- */
function vizCycle(steps){
  const n = steps.length;
  const cx = 170, cy = 130, r = 78;
  const boxes = steps.map((s, i)=>{
    const angle = (Math.PI*2 * i / n) - Math.PI/2;
    const x = cx + r*Math.cos(angle);
    const y = cy + r*Math.sin(angle);
    const color = VIZ_COLORS[i % VIZ_COLORS.length];
    return { x, y, color, label: s };
  });
  let arrows = '';
  for (let i=0;i<n;i++){
    const a = boxes[i], b = boxes[(i+1)%n];
    const dx = b.x-a.x, dy = b.y-a.y;
    const dist = Math.sqrt(dx*dx+dy*dy) || 1;
    const ux = dx/dist, uy = dy/dist;
    const sx = a.x + ux*34, sy = a.y + uy*34;
    const ex = b.x - ux*34, ey = b.y - uy*34;
    arrows += `<line x1="${sx.toFixed(1)}" y1="${sy.toFixed(1)}" x2="${ex.toFixed(1)}" y2="${ey.toFixed(1)}" stroke="#9aa5b1" stroke-width="2" marker-end="url(#vizArrow)"/>`;
  }
  const nodes = boxes.map((b)=>`
    <circle cx="${b.x.toFixed(1)}" cy="${b.y.toFixed(1)}" r="30" fill="${b.color}22" stroke="${b.color}" stroke-width="2"/>
    ${vizMultilineText(b.x, b.y, b.label, 13, {size:10, fill:'#1d2530'})}
  `).join('');
  const inner = `
    <defs><marker id="vizArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#9aa5b1"/></marker></defs>
    ${arrows}${nodes}`;
  return vizWrap(inner, 260, 340);
}

/* ---------- 2. LINHA DO TEMPO (eventos em sequência, ex: história, evolução) ---------- */
function vizTimeline(events){
  const n = events.length;
  const startX = 40, endX = 300, y = 70;
  const step = (endX-startX)/Math.max(n-1,1);
  const nodes = events.map((e,i)=>{
    const x = startX + step*i;
    const color = VIZ_COLORS[i % VIZ_COLORS.length];
    const above = i % 2 === 0;
    const labelY = above ? y - 26 : y + 40;
    return `
      <circle cx="${x}" cy="${y}" r="8" fill="${color}"/>
      <line x1="${x}" y1="${y}" x2="${x}" y2="${above ? labelY+10 : labelY-10}" stroke="${color}" stroke-width="1.5"/>
      ${e.date ? `<text x="${x}" y="${above ? labelY-14 : labelY+22}" text-anchor="middle" font-size="10" font-weight="700" fill="${color}">${vizEsc(e.date)}</text>` : ''}
      ${vizMultilineText(x, above ? labelY : labelY+10, e.label, 14, {size:10})}
    `;
  }).join('');
  const inner = `
    <line x1="${startX}" y1="${y}" x2="${endX}" y2="${y}" stroke="#c8cfd8" stroke-width="3"/>
    ${nodes}`;
  return vizWrap(inner, 150, 340);
}

/* ---------- 3. COMPARAÇÃO (dois lados, ex: X vs Y) ---------- */
function vizCompare(leftTitle, leftItems, rightTitle, rightItems){
  const boxW = 150, boxH = 20 + Math.max(leftItems.length, rightItems.length)*24 + 14;
  const leftX = 15, rightX = 175;
  function side(x, title, items, color){
    let out = `<rect x="${x}" y="6" width="${boxW}" height="${boxH}" rx="10" fill="${color}0f" stroke="${color}" stroke-width="1.5"/>`;
    out += `<text x="${x+boxW/2}" y="26" text-anchor="middle" font-size="12" font-weight="700" fill="${color}">${vizEsc(title)}</text>`;
    items.forEach((it,i)=>{
      out += vizMultilineText(x+boxW/2, 48 + i*24, it, 20, {size:10});
    });
    return out;
  }
  const inner = side(leftX, leftTitle, leftItems, VIZ_COLORS[0]) + side(rightX, rightTitle, rightItems, VIZ_COLORS[1])
    + `<text x="170" y="${boxH/2+16}" text-anchor="middle" font-size="16" font-weight="700" fill="#9aa5b1">VS</text>`;
  return vizWrap(inner, boxH+20, 340);
}

/* ---------- 4. GRÁFICO DE BARRAS (dados numéricos simples) ---------- */
function vizBarChart(data, unit){
  const n = data.length;
  const chartW = 300, chartH = 130, baseY = 165, leftX = 25;
  const maxVal = Math.max(...data.map(d=>d.value)) || 1;
  const barW = Math.min(50, (chartW-20)/n - 12);
  const gap = (chartW-20 - barW*n)/(n+1);
  const bars = data.map((d,i)=>{
    const h = (d.value/maxVal) * chartH;
    const x = leftX + gap + i*(barW+gap);
    const y = baseY - h;
    const color = VIZ_COLORS[i % VIZ_COLORS.length];
    return `
      <rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW}" height="${h.toFixed(1)}" rx="4" fill="${color}"/>
      <text x="${(x+barW/2).toFixed(1)}" y="${(y-6).toFixed(1)}" text-anchor="middle" font-size="10" font-weight="700" fill="${color}">${vizEsc(d.value)}${unit?vizEsc(unit):''}</text>
      ${vizMultilineText(x+barW/2, baseY+16, d.label, 12, {size:9.5})}
    `;
  }).join('');
  const inner = `<line x1="${leftX}" y1="${baseY}" x2="${chartW+5}" y2="${baseY}" stroke="#c8cfd8" stroke-width="2"/>${bars}`;
  return vizWrap(inner, 200, 340);
}

/* ---------- 5. FLUXO / PASSOS (sequência linear com setas, ex: processo, algoritmo) ---------- */
function vizFlow(steps){
  const n = steps.length;
  const boxW = 92, boxH = 60, gap = 14;
  const totalW = n*boxW + (n-1)*gap;
  const startX = Math.max(10, (340-totalW)/2);
  const y = 20;
  let out = '';
  steps.forEach((s,i)=>{
    const x = startX + i*(boxW+gap);
    const color = VIZ_COLORS[i % VIZ_COLORS.length];
    out += `<rect x="${x}" y="${y}" width="${boxW}" height="${boxH}" rx="10" fill="${color}18" stroke="${color}" stroke-width="1.7"/>`;
    out += `<text x="${x+boxW/2}" y="${y+16}" text-anchor="middle" font-size="10" font-weight="700" fill="${color}">${i+1}</text>`;
    out += vizMultilineText(x+boxW/2, y+38, s, 15, {size:9.5});
    if (i < n-1){
      const ax = x+boxW+2, ay = y+boxH/2;
      out += `<line x1="${ax}" y1="${ay}" x2="${ax+gap-4}" y2="${ay}" stroke="#9aa5b1" stroke-width="2" marker-end="url(#vizArrowFlow)"/>`;
    }
  });
  const inner = `<defs><marker id="vizArrowFlow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#9aa5b1"/></marker></defs>${out}`;
  return vizWrap(inner, boxH+40, Math.max(340, totalW+20));
}

/* ---------- 6. DIAGRAMA ROTULADO (partes de algo, ex: célula, paisagem, corpo) ---------- */
function vizLabeledDiagram(centerLabel, parts){
  const cx = 170, cy = 120, r = 45;
  const n = parts.length;
  let out = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#2E86AB18" stroke="#2E86AB" stroke-width="2"/>`;
  out += vizMultilineText(cx, cy, centerLabel, 12, {size:11, weight:'700', fill:'#2E86AB'});
  parts.forEach((p,i)=>{
    const angle = (Math.PI*2*i/n) - Math.PI/2;
    const lx = cx + 140*Math.cos(angle);
    const ly = cy + 90*Math.sin(angle);
    const px = cx + r*1.05*Math.cos(angle);
    const py = cy + r*1.05*Math.sin(angle);
    const color = VIZ_COLORS[(i+2) % VIZ_COLORS.length];
    out += `<line x1="${px.toFixed(1)}" y1="${py.toFixed(1)}" x2="${lx.toFixed(1)}" y2="${ly.toFixed(1)}" stroke="${color}" stroke-width="1.3" stroke-dasharray="3,2"/>`;
    out += `<circle cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" r="26" fill="${color}18" stroke="${color}" stroke-width="1.5"/>`;
    out += vizMultilineText(lx, ly, p, 11, {size:9, fill:'#1d2530'});
  });
  return vizWrap(out, 240, 340);
}

/* ---------- 7. PROPORÇÃO / PIZZA (percentuais, ex: composição, distribuição) ---------- */
function vizPie(slices){
  const cx = 100, cy = 100, r = 75;
  const total = slices.reduce((a,s)=>a+s.value,0) || 1;
  let angleStart = -Math.PI/2;
  let paths = '';
  let legend = '';
  slices.forEach((s,i)=>{
    const frac = s.value/total;
    const angleEnd = angleStart + frac*Math.PI*2;
    const x1 = cx + r*Math.cos(angleStart), y1 = cy + r*Math.sin(angleStart);
    const x2 = cx + r*Math.cos(angleEnd), y2 = cy + r*Math.sin(angleEnd);
    const large = (angleEnd-angleStart) > Math.PI ? 1 : 0;
    const color = VIZ_COLORS[i % VIZ_COLORS.length];
    paths += `<path d="M${cx},${cy} L${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 ${large} 1 ${x2.toFixed(1)},${y2.toFixed(1)} Z" fill="${color}" opacity="0.85"/>`;
    legend += `<rect x="205" y="${20+i*26}" width="12" height="12" fill="${color}"/><text x="222" y="${30+i*26}" font-size="10" fill="#1d2530">${vizEsc(s.label)} (${Math.round(frac*100)}%)</text>`;
    angleStart = angleEnd;
  });
  const inner = paths + legend;
  return vizWrap(inner, Math.max(200, 20+slices.length*26+10), 340);
}

/* ---------- 8. LINHA/CRESCIMENTO (evolução ao longo do tempo, ex: gráfico de função) ---------- */
function vizLineGraph(points, xLabel, yLabel){
  const chartW = 280, chartH = 130, leftX = 40, baseY = 160, topY = 20;
  const maxY = Math.max(...points.map(p=>p.y), 1);
  const minY = Math.min(...points.map(p=>p.y), 0);
  const rangeY = (maxY-minY) || 1;
  const stepX = chartW/Math.max(points.length-1,1);
  const coords = points.map((p,i)=>{
    const x = leftX + i*stepX;
    const y = baseY - ((p.y-minY)/rangeY)*chartH;
    return {x, y, label: p.label};
  });
  const path = coords.map((c,i)=>`${i===0?'M':'L'}${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' ');
  const dots = coords.map(c=>`<circle cx="${c.x.toFixed(1)}" cy="${c.y.toFixed(1)}" r="4" fill="#2E86AB"/>`).join('');
  const labels = coords.map(c=>c.label ? `<text x="${c.x.toFixed(1)}" y="${baseY+16}" text-anchor="middle" font-size="9" fill="#5b6470">${vizEsc(c.label)}</text>` : '').join('');
  const inner = `
    <line x1="${leftX}" y1="${topY}" x2="${leftX}" y2="${baseY}" stroke="#c8cfd8" stroke-width="1.5"/>
    <line x1="${leftX}" y1="${baseY}" x2="${leftX+chartW}" y2="${baseY}" stroke="#c8cfd8" stroke-width="1.5"/>
    <path d="${path}" fill="none" stroke="#2E86AB" stroke-width="2.5"/>
    ${dots}${labels}
    ${yLabel ? `<text x="${leftX-8}" y="${topY-4}" font-size="9" fill="#5b6470" text-anchor="end">${vizEsc(yLabel)}</text>` : ''}
    ${xLabel ? `<text x="${leftX+chartW}" y="${baseY+30}" font-size="9" fill="#5b6470" text-anchor="end">${vizEsc(xLabel)}</text>` : ''}
  `;
  return vizWrap(inner, 200, 340);
}

/* ---------- Roteador: escolhe a função certa a partir de topic.visual ---------- */
function renderVisual(visual){
  if (!visual || !visual.type) return '';
  try {
    switch(visual.type){
      case 'cycle': return vizCycle(visual.steps);
      case 'timeline': return vizTimeline(visual.events);
      case 'compare': return vizCompare(visual.leftTitle, visual.leftItems, visual.rightTitle, visual.rightItems);
      case 'bars': return vizBarChart(visual.data, visual.unit);
      case 'flow': return vizFlow(visual.steps);
      case 'labeled': return vizLabeledDiagram(visual.center, visual.parts);
      case 'pie': return vizPie(visual.slices);
      case 'line': return vizLineGraph(visual.points, visual.xLabel, visual.yLabel);
      default: return '';
    }
  } catch(e){
    console.warn('Erro ao renderizar ilustração:', e);
    return '';
  }
}
