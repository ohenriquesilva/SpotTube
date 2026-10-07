// js/exploracao.js
// Estratégia anti-bolha: usa os eixos MENOS representados no perfil e, em cada um,
// escolhe a música mais compatível (maior cosseno) ainda não avaliada.
// São TOTAL_EXPLORACAO (2) músicas, sempre de gêneros diferentes.

function ordenarEixosPorRepresentacao(perfil) {
    return perfil
        .map((valor, indice) => ({ indice, genero: GENEROS[indice], valor }))
        .sort((a, b) => a.valor - b.valor || a.indice - b.indice);
}

function identificarDimensaoMenosRepresentada(perfil) {
    return ordenarEixosPorRepresentacao(perfil)[0];
}

// Retorna [{ alvo: {indice, genero, valor}, musica }, ...] com gêneros distintos.
// idsExcluidos evita repetir músicas que já estão nas recomendações por ranking.
function selecionarMusicasExploracao(perfil, catalogo, idsAvaliados, idsExcluidos = new Set(), quantidade = TOTAL_EXPLORACAO) {
    const resultado = [];

    for (const alvo of ordenarEixosPorRepresentacao(perfil)) {
        if (resultado.length >= quantidade) break;

        const melhor = catalogo
            .filter(m => m.genero === alvo.genero && !idsAvaliados.has(m.id) && !idsExcluidos.has(m.id))
            .map(m => ({ ...m, similaridade: similaridadeCosseno(perfil, m.vetor) }))
            .sort((a, b) => b.similaridade - a.similaridade || a.id - b.id)[0];

        if (melhor) resultado.push({ alvo, musica: melhor });
    }
    return resultado;
}

function gerarFeed(perfil, catalogo, idsAvaliados) {
    const ranking = calcularRanking(perfil, catalogo, idsAvaliados);
    const recomendacoes = selecionarTopRecomendacoes(ranking);
    const exploracao = selecionarMusicasExploracao(
        perfil, catalogo, idsAvaliados, new Set(recomendacoes.map(m => m.id))
    );

    return {
        ranking,
        recomendacoes,
        exploracao,
        feed: [...recomendacoes, ...exploracao.map(e => ({ ...e.musica, exploracao: true }))]
    };
}
