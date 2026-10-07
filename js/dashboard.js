// js/dashboard.js
// Dashboard: gráficos SVG/HTML (JavaScript puro) que mostram a Álgebra Linear com os
// valores reais do usuário. Só LÊ o estado; não altera nenhum cálculo.
//
// De onde vem cada coisa:
//   Vᵤ  → comportamento do usuário (muda a cada avaliação)
//   V_f → pesos fixos da música no catálogo (nunca mudam)
//   Escolher uma música no dashboard NÃO altera Vᵤ; só avaliar altera.

const GENEROS_CURTOS = ["Rock", "Pop", "Jazz", "Clás.", "Rap", "Samba", "Sert.", "Reggae", "Eletr.", "MPB"];
const dashSel = { auto: true, x: 1, y: 0, musicaId: null };
const COR_MUSICA = "#6cb6ff";
const COR_UPDATE = "#ffb454";
const fmt = (v, c = 3) => Number(v).toFixed(c);

function musicaDoDashboard() {
    return CATALOGO.find(m => m.id === dashSel.musicaId) || CATALOGO[0];
}

// Os 2 eixos que mais contribuem para Vᵤ·V_f (maiores parcelas uᵢ·fᵢ).
function eixosAutomaticos(u, f) {
    const ordem = u.map((v, i) => ({ i, c: v * f[i] })).sort((a, b) => b.c - a.c || a.i - b.i);
    return ordem[0].c > 0 ? [ordem[0].i, ordem[1].i] : [1, 0];
}

function seta(x1, y1, x2, y2, cor, tracejada = false) {
    const ang = Math.atan2(y2 - y1, x2 - x1);
    const ponta = d => `${x2 - 9 * Math.cos(ang + d)},${y2 - 9 * Math.sin(ang + d)}`;
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${cor}" stroke-width="2.5"
        ${tracejada ? 'stroke-dasharray="5 4"' : ""}/>` +
        (tracejada ? "" : `<polygon points="${x2},${y2} ${ponta(0.4)} ${ponta(-0.4)}" fill="${cor}"/>`);
}

// 1) Barras: componentes de Vᵤ (e marca do valor anterior).
function graficoBarras(estado) {
    const anterior = estado.ultimaAvaliacao?.perfilAnterior;
    const maximo = Math.max(1e-6, ...estado.perfil, ...(anterior || []));
    const alvos = new Set((estado.exploracao || []).map(e => e.alvo.indice));
    const base = 190, topo = 24, alt = v => v / maximo * (base - topo);

    const barras = estado.perfil.map((valor, i) => {
        const x = 14 + i * 50;
        const marca = anterior
            ? `<line x1="${x - 3}" x2="${x + 33}" y1="${base - alt(anterior[i])}" y2="${base - alt(anterior[i])}" stroke="#fff" stroke-width="2"/>` : "";
        return `<rect x="${x}" y="${base - alt(valor)}" width="30" height="${alt(valor)}" rx="4"
                    fill="${alvos.has(i) ? COR_UPDATE : "var(--accent)"}" opacity=".85"/>${marca}
                <text x="${x + 15}" y="${base - alt(valor) - 6}" text-anchor="middle" font-size="10" fill="var(--text)">${fmt(valor, 2)}</text>
                <text x="${x + 15}" y="${base + 16}" text-anchor="middle" font-size="10" fill="var(--muted)">${GENEROS_CURTOS[i]}</text>`;
    }).join("");

    return `<svg viewBox="0 0 520 214" class="chart" role="img" aria-label="Componentes do vetor Vu">
        <line x1="8" x2="512" y1="${base}" y2="${base}" stroke="var(--line)"/>${barras}</svg>`;
}

// 2) Plano X × Y: Vᵤ, música em análise e efeito da última avaliação.
function graficoPlano(estado, musica, ix, iy) {
    const S = 360, M = 44;
    const u = [estado.perfil[ix], estado.perfil[iy]], f = [musica.vetor[ix], musica.vetor[iy]];
    const ant = estado.ultimaAvaliacao?.perfilAnterior;
    const a = ant ? [ant[ix], ant[iy]] : null;
    const max = Math.max(1, u[0], u[1]), esc = (S - 2 * M) / max;
    const px = x => M + x * esc, py = y => S - M - y * esc, nu = Math.hypot(...u);

    let svg = `<svg viewBox="0 0 ${S} ${S}" class="chart" role="img" aria-label="Plano ${GENEROS[ix]} por ${GENEROS[iy]}">
        <line x1="${M}" y1="${S - M}" x2="${S - 12}" y2="${S - M}" stroke="var(--muted)"/>
        <line x1="${M}" y1="${S - M}" x2="${M}" y2="12" stroke="var(--muted)"/>
        <path d="M ${px(1)} ${py(0)} A ${esc} ${esc} 0 0 0 ${px(0)} ${py(1)}" fill="none" stroke="var(--line)" stroke-dasharray="4 4"/>
        <text x="${px(1)}" y="${S - M + 16}" font-size="10" text-anchor="middle" fill="var(--muted)">1</text>
        <text x="${M - 8}" y="${py(1) + 4}" font-size="10" text-anchor="end" fill="var(--muted)">1</text>
        <text x="${S / 2}" y="${S - 8}" font-size="11" text-anchor="middle" fill="var(--text)">${GENEROS[ix]} →</text>
        <text x="12" y="${S / 2}" font-size="11" fill="var(--text)" transform="rotate(-90 12 ${S / 2})" text-anchor="middle">${GENEROS[iy]} →</text>`;

    if (nu > 0) svg += seta(px(0), py(0), px(u[0] / nu), py(u[1] / nu), "var(--muted)", true);
    svg += seta(px(0), py(0), px(f[0]), py(f[1]), COR_MUSICA);
    svg += seta(px(0), py(0), px(u[0]), py(u[1]), "var(--accent)");
    svg += `<text x="${px(f[0]) + 6}" y="${py(f[1]) - 6}" font-size="11" fill="${COR_MUSICA}">V_f</text>
            <text x="${px(u[0]) + 6}" y="${py(u[1]) - 6}" font-size="11" fill="var(--accent)">Vᵤ</text>`;
    if (a) svg += `<circle cx="${px(a[0])}" cy="${py(a[1])}" r="3.5" fill="${COR_UPDATE}"/>` +
                  seta(px(a[0]), py(a[1]), px(u[0]), py(u[1]), COR_UPDATE);
    return svg + "</svg>";
}

// 3) Parcelas do produto escalar: uᵢ·fᵢ por eixo.
function graficoContribuicao(estado, musica, ix, iy) {
    const c = estado.perfil.map((v, i) => v * musica.vetor[i]);
    const maximo = Math.max(...c, 1e-9);
    const linhas = c.map((v, i) => `
        <div class="vector-row ${i === ix || i === iy ? "destaque" : ""}">
            <span>${GENEROS[i]}</span>
            <div class="bar"><i style="width:${(v / maximo * 100).toFixed(1)}%"></i></div>
            <strong>${fmt(v, 4)}</strong>
        </div>`).join("");
    const soma = c.reduce((s, v) => s + v, 0), nu = norma(estado.perfil);
    const resumo = `<p>Σ uᵢ·fᵢ = Vᵤ·V_f = <b>${fmt(soma)}</b> (previsão r̂). Como ‖V_f‖ = 1:
        cosseno real = r̂ / ‖Vᵤ‖ = ${fmt(soma)} / ${fmt(nu)} = <b>${fmt(nu > 0 ? soma / nu : 0)}</b>.</p>`;
    return { linhas, resumo, soma };
}

function textoDashboard(estado, musica, ix, iy, soma) {
    const u = [estado.perfil[ix], estado.perfil[iy]], f = [musica.vetor[ix], musica.vetor[iy]];
    const nu = Math.hypot(...u), nf = Math.hypot(...f), ult = estado.ultimaAvaliacao;
    const cosProj = nu > 0 && nf > 0 ? Math.min(1, (u[0] * f[0] + u[1] * f[1]) / (nu * nf)) : null;
    const dada = estado.avaliacoes.find(a => a.musicaId === musica.id);

    const situacao = dada
        ? `<p class="nota">✓ <b>Já avaliada</b>: você deu ${dada.nota}/5. Essa nota já foi incorporada a Vᵤ.</p>`
        : `<p class="nota"><b>Ainda não avaliada</b>: não influencia Vᵤ. Previsão r̂ = ${fmt(soma)} (≈ ${fmt(soma * ESCALA_NOTA, 1)}★ esperadas).</p>`;

    return `<p><b>${musica.titulo}</b> — ${musica.artista} (${musica.genero})</p>${situacao}
        <p>Plano ${GENEROS[ix]} × ${GENEROS[iy]}: Vᵤ = (${fmt(u[0])}, ${fmt(u[1])}), V_f = (${fmt(f[0])}, ${fmt(f[1])}).</p>
        <p>${cosProj === null ? "Algum vetor projetado é nulo neste plano (ângulo indefinido)." :
            `Ângulo projetado ≈ ${fmt(Math.acos(cosProj) * 180 / Math.PI, 1)}° → cosseno projetado = ${fmt(cosProj)}.`}</p>
        <p><b>Cosseno real em R¹⁰ = ${fmt(similaridadeCosseno(estado.perfil, musica.vetor))}</b> (10 eixos; é o valor do ranking). O plano é só uma "foto" em 2 dimensões.</p>
        ${ult ? `<p>A seta laranja é o efeito da <b>última avaliação</b> (${ult.titulo}, ${ult.nota}/5, erro ${fmt(ult.erro)}), não da música em análise.</p>` : ""}`;
}

function preencherMusicas(estado) {
    const avaliadas = estado.musicasAvaliadas;
    document.querySelector("#dash-song").innerHTML = GENEROS.map(g => `<optgroup label="${g}">` +
        CATALOGO.filter(m => m.genero === g).map(m => {
            const ok = avaliadas.has(m.id);
            return `<option value="${m.id}" ${m.id === dashSel.musicaId ? "selected" : ""}>${ok ? "✓ " : ""}${m.titulo} — ${m.artista}${ok ? " (já avaliada)" : ""}</option>`;
        }).join("") + "</optgroup>").join("");
}

function renderDashboard(estado) {
    if (!estado.feed.length) return;
    if (!dashSel.musicaId) dashSel.musicaId = estado.feed[0].id;
    preencherMusicas(estado);

    const musica = musicaDoDashboard();
    const [ix, iy] = dashSel.auto ? eixosAutomaticos(estado.perfil, musica.vetor) : [dashSel.x, dashSel.y];
    const x = document.querySelector("#dash-x"), y = document.querySelector("#dash-y");
    x.value = ix; y.value = iy;
    x.disabled = y.disabled = dashSel.auto;
    document.querySelector("#dash-auto").checked = dashSel.auto;

    const contrib = graficoContribuicao(estado, musica, ix, iy);
    document.querySelector("#dash-bars").innerHTML = graficoBarras(estado);
    document.querySelector("#dash-plane").innerHTML = graficoPlano(estado, musica, ix, iy);
    document.querySelector("#dash-info").innerHTML = textoDashboard(estado, musica, ix, iy, contrib.soma);
    document.querySelector("#dash-contrib").innerHTML = contrib.linhas;
    document.querySelector("#dash-contrib-sum").innerHTML = contrib.resumo;

    const botao = document.querySelector("#dash-rate");
    const jaAvaliada = estado.musicasAvaliadas.has(musica.id);
    botao.disabled = jaAvaliada;
    botao.textContent = jaAvaliada ? "Música já avaliada" : "Avaliar esta música";
}

function configurarDashboard() {
    const opcoes = GENEROS.map((g, i) => `<option value="${i}">${g}</option>`).join("");
    const x = document.querySelector("#dash-x"), y = document.querySelector("#dash-y");
    x.innerHTML = y.innerHTML = opcoes;

    const atualizar = () => {
        dashSel.auto = document.querySelector("#dash-auto").checked;
        dashSel.x = Number(x.value);
        dashSel.y = Number(y.value);
        dashSel.musicaId = Number(document.querySelector("#dash-song").value);
        renderDashboard(estadoUsuario);
    };
    [x, y, document.querySelector("#dash-song"), document.querySelector("#dash-auto")]
        .forEach(el => el.addEventListener("change", atualizar));

    document.querySelector("#dash-rate").addEventListener("click", () => abrirModalAvaliacao(dashSel.musicaId));
}
