// js/config.js
// Configurações centrais do SpotTube.
// Este é o primeiro arquivo carregado: não depende de nenhum outro.

const DIMENSOES = 10;          // dimensão do espaço de preferências (R¹⁰)
const ALPHA = 0.1;             // taxa de aprendizado (α)
const MOMENTUM = 0.8;          // coeficiente de inércia (β)
const TOP_RECOMENDACOES = 8;   // músicas escolhidas por ranking
const TOTAL_EXPLORACAO = 2;    // músicas de exploração (gêneros diferentes)
const ESCALA_NOTA = 5;         // a interface usa 1–5 estrelas

// ORDEM FIXA dos eixos. Não alterar: todos os vetores dependem dela.
const GENEROS = [
    "Rock", "Pop", "Jazz", "Clássica", "Hip-Hop/Rap",
    "Samba", "Sertanejo", "Reggae", "Eletrônica", "MPB"
];

const INDICE_GENERO = Object.fromEntries(
    GENEROS.map((genero, indice) => [genero, indice])
);

// Cold Start: uma música por gênero, na ordem dos eixos.
// Padrão: indice * 10 + 1 (primeira música de cada bloco), EXCETO o Jazz:
// usa Take Five (ID 22) em vez de What a Wonderful World (ID 21), pois Take Five
// tem vetor puro de Jazz e é a música da simulação validada pelo grupo.
const IDS_COLD_START = [1, 11, 22, 31, 41, 51, 61, 71, 81, 91];
const TOTAL_COLD_START = IDS_COLD_START.length;
