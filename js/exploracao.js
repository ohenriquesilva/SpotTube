// js/exploracao.js
// Estratégia anti-bolha: procura a dimensão menos representada
// e escolhe, dentro dela, a música mais compatível com o perfil atual.

function identificarDimensaoMenosRepresentada(perfil) {
    let indiceMenor = 0;

    for (let i = 1; i < perfil.length; i++) {
        if (perfil[i] < perfil[indiceMenor]) {
            indiceMenor = i;
        }
    }

    return {
        indice: indiceMenor,
        genero: GENEROS[indiceMenor],
        valor: perfil[indiceMenor]
    };
}

function selecionarMusicaExploracao(perfil, catalogo, idsAvaliados) {
    const alvo = identificarDimensaoMenosRepresentada(perfil);

    const candidatos = catalogo
        .filter(musica =>
            musica.genero === alvo.genero &&
            !idsAvaliados.has(musica.id)
        )
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

    return {
        alvo,
        musica: candidatos[0] || null
    };
}

function gerarFeed(perfil, catalogo, idsAvaliados) {
    const ranking = calcularRanking(perfil, catalogo, idsAvaliados);
    const recomendacoes = selecionarTopRecomendacoes(ranking);
    const exploracao = selecionarMusicaExploracao(perfil, catalogo, idsAvaliados);

    const idsRecomendadas = new Set(recomendacoes.map(m => m.id));
    let musicaExploracao = exploracao.musica;

    // Garante que a exploração não duplique uma recomendação do TOP 9.
    if (musicaExploracao && idsRecomendadas.has(musicaExploracao.id)) {
        musicaExploracao = ranking.find(m =>
            m.genero === exploracao.alvo.genero &&
            !idsRecomendadas.has(m.id)
        ) || null;
    }

    return {
        ranking,
        recomendacoes,
        exploracao: {
            ...exploracao,
            musica: musicaExploracao
        },
        feed: musicaExploracao
            ? [...recomendacoes, { ...musicaExploracao, exploracao: true }]
            : recomendacoes
    };
}
