// js/perfil.js
// Formação e atualização do vetor de preferências do usuário.

function calcularPerfilInicial(avaliacoes) {
    if (!avaliacoes.length) return Array(DIMENSOES).fill(0);

    const perfil = Array(DIMENSOES).fill(0);

    avaliacoes.forEach(avaliacao => {
        const peso = normalizarNota(avaliacao.nota);
        for (let i = 0; i < DIMENSOES; i++) {
            perfil[i] += peso * avaliacao.vetor[i];
        }
    });

    return perfil.map(valor => valor / avaliacoes.length);
}

function registrarAvaliacao(estado, musica, nota) {
    // Proteção: cada música só pode ser avaliada uma vez (retorna null se já foi).
    if (estado.musicasAvaliadas.has(musica.id)) return null;

    const notaNormalizada = normalizarNota(nota);
    const previsao = preverNota(estado.perfil, musica.vetor);
    const erro = calcularErro(notaNormalizada, previsao);
    const gradiente = calcularGradiente(estado.perfil, musica.vetor, notaNormalizada);
    const magnitudeGradiente = calcularMagnitudeGradiente(gradiente);

    const resultadoAtualizacao = atualizarPerfil(
        estado.perfil,
        gradiente,
        estado.velocidade
    );

    const perfilAnterior = [...estado.perfil];
    estado.perfil = resultadoAtualizacao.perfil;
    estado.velocidade = resultadoAtualizacao.velocidade;
    estado.avaliacoes.push({
        musicaId: musica.id,
        titulo: musica.titulo,
        nota: Number(nota),
        notaNormalizada,
        vetor: [...musica.vetor]
    });
    estado.musicasAvaliadas.add(musica.id);
    estado.ultimaAvaliacao = {
        musicaId: musica.id,
        titulo: musica.titulo,
        nota: Number(nota),
        notaNormalizada,
        previsao,
        erro,
        gradiente,
        magnitudeGradiente,
        perfilAnterior,
        perfilNovo: [...estado.perfil]
    };

    return estado.ultimaAvaliacao;
}
