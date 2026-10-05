// js/estado.js
// Estado único da sessão atual do usuário.

function criarEstadoInicial() {
    return {
        etapa: "cold-start",
        perfil: Array(DIMENSOES).fill(0),
        velocidade: Array(DIMENSOES).fill(0),
        avaliacoes: [],
        musicasAvaliadas: new Set(),
        recomendacoes: [],
        ranking: [],
        feed: [],
        exploracao: null,
        ultimaAvaliacao: null
    };
}

const estadoUsuario = criarEstadoInicial();
