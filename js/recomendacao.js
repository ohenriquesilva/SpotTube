// js/recomendacao.js
// Ranking por similaridade do cosseno.

function calcularRanking(perfil, catalogo, idsAvaliados) {
    return catalogo
        .filter(musica => !idsAvaliados.has(musica.id))
        .map(musica => ({
            ...musica,
            similaridade: similaridadeCosseno(perfil, musica.vetor)
        }))
        .sort((a, b) => {
            if (b.similaridade !== a.similaridade) {
                return b.similaridade - a.similaridade;
            }
            return a.id - b.id;
        });
}

function selecionarTopRecomendacoes(ranking, quantidade = TOP_RECOMENDACOES) {
    return ranking.slice(0, quantidade);
}
