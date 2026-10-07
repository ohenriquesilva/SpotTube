// js/interface.js
// Camada visual: recebe dados do motor e atualiza o DOM.

function formatarNumero(valor) {
    return Number(valor).toFixed(4);
}

function renderColdStart() {
    const container = document.querySelector("#cold-start-list");
    if (!container) return;

    const musicas = IDS_COLD_START.map(buscarMusica).filter(Boolean);
    container.innerHTML = musicas.map(musica => `
        <article class="rating-card" data-id="${musica.id}">
            <div>
                <span class="genre">${musica.genero}</span>
                <h3>${musica.titulo}</h3>
                <p>${musica.artista}</p>
            </div>
            <div class="stars" role="group" aria-label="Avaliar ${musica.titulo}">
                ${[1,2,3,4,5].map(n => `<button type="button" data-rating="${n}" data-id="${musica.id}">${n}★</button>`).join("")}
            </div>
        </article>
    `).join("");
}

function renderFeed(feed) {
    const container = document.querySelector("#feed-list");
    if (!container) return;

    container.innerHTML = feed.map((musica, index) => `
        <article class="music-card ${musica.exploracao ? "exploration" : ""}">
            <div class="rank">${index + 1}</div>
            <div class="music-info">
                <span class="genre">${musica.genero}</span>
                <h3>${musica.titulo}</h3>
                <p>${musica.artista}</p>
                <small>Similaridade: ${formatarNumero(musica.similaridade)}</small>
            </div>
            ${musica.exploracao ? `<span class="explore-badge">EXPLORAÇÃO</span>` : ""}
            <button class="rate-feed" data-id="${musica.id}">Avaliar</button>
        </article>
    `).join("");
}

function renderHUD(estado) {
    const perfil = estado.perfil;
    const ultima = estado.ultimaAvaliacao;
    const generos = (estado.exploracao || []).map(e => e.alvo.genero).join(" · ");

    const setText = (id, value) => {
        const el = document.querySelector(`#${id}`);
        if (el) el.textContent = value;
    };

    setText("hud-norm", formatarNumero(norma(perfil)));
    setText("hud-gradient", formatarNumero(ultima?.magnitudeGradiente || 0));
    setText("hud-prediction", formatarNumero(ultima?.previsao || 0));
    setText("hud-rating", ultima ? `${ultima.nota}/5` : "—");
    setText("hud-error", formatarNumero(ultima?.erro || 0));
    setText("hud-alpha", ALPHA);
    setText("hud-momentum", MOMENTUM);
    setText("hud-exploration", generos || "—");

    const vector = document.querySelector("#hud-vector");
    if (vector) {
        const maximo = Math.max(...perfil, 1e-9);
        vector.innerHTML = perfil.map((valor, i) => `
            <div class="vector-row">
                <span>${GENEROS[i]}</span>
                <div class="bar"><i style="width:${(valor / maximo * 100).toFixed(1)}%"></i></div>
                <strong>${formatarNumero(valor)}</strong>
            </div>
        `).join("");
    }
}

// Telas: "home" (apresentação) e "app" (HUD + músicas + dashboard).
function mostrarTela(tela) {
    document.querySelector("#view-home")?.classList.toggle("hidden", tela !== "home");
    document.querySelector("#view-app")?.classList.toggle("hidden", tela !== "app");
    window.scrollTo(0, 0);
}

// Abas da tela do app: "musicas" (Cold Start ou feed, conforme a etapa) e "dashboard".
function mostrarAba(aba) {
    const dash = aba === "dashboard";
    const cold = estadoUsuario.etapa === "cold-start";
    document.querySelector("#cold-start")?.classList.toggle("hidden", dash || !cold);
    document.querySelector("#recommendations")?.classList.toggle("hidden", dash || cold);
    document.querySelector("#dashboard")?.classList.toggle("hidden", !dash);
    document.querySelector("#tab-musicas")?.classList.toggle("active", !dash);
    document.querySelector("#tab-dashboard")?.classList.toggle("active", dash);
}

function mostrarFeed() {
    document.querySelector("#tab-dashboard").disabled = false;
    mostrarAba("musicas");
}

function mostrarColdStart() {
    document.querySelector("#tab-dashboard").disabled = true;
    mostrarAba("musicas");
}

function mostrarStatus(mensagem) {
    const el = document.querySelector("#status");
    if (el) el.textContent = mensagem;
}
