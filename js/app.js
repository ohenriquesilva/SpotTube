// js/app.js
// Orquestra o sistema: inicialização, eventos e integração entre os módulos.

// Notas do Cold Start: Map(idMusica -> nota 1–5).
const avaliacoesColdStart = new Map();

function buscarMusica(id) {
    return CATALOGO.find(musica => musica.id === Number(id)) || null;
}

function iniciarAplicacao() {
    validarCatalogo();
    renderColdStart();
    configurarEventos();
    mostrarStatus(`Avalie as ${TOTAL_COLD_START} músicas iniciais para criar seu perfil.`);
}

// ---------- Cold Start ----------

function finalizarColdStart() {
    // O Cold Start usa IDS_COLD_START (config.js): uma música por eixo.
    // NÃO usar CATALOGO.slice(0, 10): isso pegaria só músicas de Rock (bug antigo).
    const avaliacoes = IDS_COLD_START
        .map(buscarMusica)
        .filter(Boolean)
        .map(musica => ({
            nota: avaliacoesColdStart.get(musica.id),
            vetor: musica.vetor,
            musicaId: musica.id
        }));

    if (
        avaliacoes.length !== TOTAL_COLD_START ||
        avaliacoes.some(avaliacao => !Number.isFinite(avaliacao.nota))
    ) {
        mostrarStatus(`Complete a avaliação das ${TOTAL_COLD_START} músicas antes de gerar o perfil.`);
        return;
    }

    estadoUsuario.avaliacoes = avaliacoes.map(a => ({
        musicaId: a.musicaId,
        nota: a.nota,
        notaNormalizada: normalizarNota(a.nota),
        vetor: [...a.vetor]
    }));

    estadoUsuario.musicasAvaliadas = new Set(avaliacoes.map(a => a.musicaId));
    estadoUsuario.perfil = calcularPerfilInicial(avaliacoes);
    estadoUsuario.velocidade = Array(DIMENSOES).fill(0);
    estadoUsuario.etapa = "recommendation";

    atualizarRecomendacoes();
    mostrarFeed();
    mostrarStatus("Perfil criado. O feed foi personalizado com base no vetor Vᵤ.");
}

// ---------- Recomendação e feedback ----------

function atualizarRecomendacoes() {
    const resultado = gerarFeed(
        estadoUsuario.perfil,
        CATALOGO,
        estadoUsuario.musicasAvaliadas
    );

    estadoUsuario.ranking = resultado.ranking;
    estadoUsuario.recomendacoes = resultado.recomendacoes;
    estadoUsuario.exploracao = resultado.exploracao;
    estadoUsuario.feed = resultado.feed;

    renderFeed(estadoUsuario.feed);
    renderHUD(estadoUsuario);
}

function processarAvaliacao(musicaId, nota) {
    const musica = buscarMusica(musicaId);
    if (!musica) return;

    const resultado = registrarAvaliacao(estadoUsuario, musica, nota);
    estadoUsuario.etapa = "recommendation";

    atualizarRecomendacoes();

    mostrarStatus(
        `Avaliação processada. Previsão: ${formatarNumero(resultado.previsao)} | ` +
        `Nota normalizada: ${formatarNumero(resultado.notaNormalizada)} | ` +
        `Erro: ${formatarNumero(resultado.erro)}`
    );
}

// ---------- Eventos ----------

// Retorna true se o clique foi de uma estrela do Cold Start.
function tratarCliqueColdStart(event) {
    const botao = event.target.closest("#cold-start-list button[data-rating]");
    if (!botao) return false;

    avaliacoesColdStart.set(Number(botao.dataset.id), Number(botao.dataset.rating));

    const card = botao.closest(".rating-card");
    card?.querySelectorAll("button").forEach(btn => btn.classList.remove("selected"));
    botao.classList.add("selected");

    const total = avaliacoesColdStart.size;
    mostrarStatus(`Cold Start: ${total}/${TOTAL_COLD_START} músicas avaliadas.`);

    if (total === TOTAL_COLD_START) {
        const finalizar = document.querySelector("#finish-cold-start");
        if (finalizar) finalizar.disabled = false;
    }
    return true;
}

function tratarCliqueFeed(event) {
    const botao = event.target.closest(".rate-feed");
    if (botao) abrirModalAvaliacao(Number(botao.dataset.id));
}

function configurarModal() {
    const modal = document.querySelector("#rating-modal");

    document.querySelector("#modal-close")?.addEventListener("click", fecharModal);

    // Fecha ao clicar no fundo escuro (fora do cartão) ou com a tecla Esc.
    modal?.addEventListener("click", event => {
        if (event.target === modal) fecharModal();
    });
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") fecharModal();
    });

    document.querySelector("#modal-submit")?.addEventListener("click", () => {
        const id = document.querySelector("#modal-song-id")?.value;
        const nota = document.querySelector("#modal-rating")?.value;
        if (id && nota) {
            processarAvaliacao(id, Number(nota));
            fecharModal();
        }
    });
}

function configurarEventos() {
    document.addEventListener("click", event => {
        if (tratarCliqueColdStart(event)) return;
        tratarCliqueFeed(event);
    });

    document.querySelector("#finish-cold-start")?.addEventListener("click", () => {
        if (avaliacoesColdStart.size === TOTAL_COLD_START) finalizarColdStart();
    });

    configurarModal();
}

function abrirModalAvaliacao(musicaId) {
    const musica = buscarMusica(musicaId);
    if (!musica) return;

    document.querySelector("#modal-song-id").value = musica.id;
    document.querySelector("#modal-song-title").textContent = musica.titulo;
    document.querySelector("#modal-song-artist").textContent = musica.artista;
    document.querySelector("#modal-rating").value = "5";
    document.querySelector("#rating-modal")?.classList.remove("hidden");
}

function fecharModal() {
    document.querySelector("#rating-modal")?.classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", iniciarAplicacao);
