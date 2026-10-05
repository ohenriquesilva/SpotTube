// js/matematica.js
// Todas as operações matemáticas do recomendador ficam centralizadas aqui.

function norma(vetor) {
    return Math.sqrt(
        vetor.reduce((soma, valor) => soma + valor ** 2, 0)
    );
}

function normalizarVetor(vetor) {
    const n = norma(vetor);
    if (n === 0) return vetor.map(() => 0);
    return vetor.map(valor => valor / n);
}

function produtoEscalar(a, b) {
    if (a.length !== b.length) {
        throw new Error("Vetores incompatíveis para produto escalar.");
    }
    return a.reduce((soma, valor, i) => soma + valor * b[i], 0);
}

function similaridadeCosseno(a, b) {
    const normaA = norma(a);
    const normaB = norma(b);
    if (normaA === 0 || normaB === 0) return 0;
    return produtoEscalar(a, b) / (normaA * normaB);
}

// Adaptação de implementação: interface usa 1–5 estrelas,
// enquanto o cálculo trabalha com uma escala compatível [0,1].
function normalizarNota(nota) {
    const valor = Number(nota);
    if (!Number.isFinite(valor)) throw new Error("Nota inválida.");
    return Math.min(ESCALA_NOTA, Math.max(1, valor)) / ESCALA_NOTA;
}

function preverNota(perfil, vetorMusica) {
    return produtoEscalar(perfil, vetorMusica);
}

function calcularErro(notaNormalizada, previsao) {
    return notaNormalizada - previsao;
}

function calcularGradiente(perfil, vetorMusica, notaNormalizada) {
    const previsao = preverNota(perfil, vetorMusica);
    const erro = calcularErro(notaNormalizada, previsao);
    return vetorMusica.map(valor => -erro * valor);
}

function calcularMagnitudeGradiente(gradiente) {
    return norma(gradiente);
}

// Gradient Descent + Momentum (inércia).
//   v_{t+1}  = β · v_t + ∇E        (β = MOMENTUM)
//   Vᵤ_{t+1} = max(0, Vᵤ_t − α · v_{t+1})
// Com v_t = 0 (primeira atualização) isto equivale ao gradiente descendente simples.
// O max(0, ·) impede componentes negativas. O vetor do usuário NÃO é renormalizado.
function atualizarPerfil(perfil, gradiente, velocidadeAnterior = Array(DIMENSOES).fill(0)) {
    const novaVelocidade = gradiente.map((g, i) =>
        MOMENTUM * velocidadeAnterior[i] + g
    );

    const novoPerfil = perfil.map((valor, i) =>
        Math.max(0, valor - ALPHA * novaVelocidade[i])
    );

    return {
        perfil: novoPerfil,
        velocidade: novaVelocidade
    };
}
