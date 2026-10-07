// tests/regressao.js
// Teste de regressão do motor matemático (sem navegador, sem dependências).
// Uso:  node tests/regressao.js     (a partir da pasta SpotTube/)
//
// Carrega os módulos do motor na mesma ordem do index.html e verifica as
// invariantes da seção "Validação matemática" do projeto.

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ordem = ["config", "catalogo", "matematica", "perfil", "recomendacao", "exploracao", "estado"];
const codigo = ordem
    .map(nome => fs.readFileSync(path.join(__dirname, "..", "js", nome + ".js"), "utf8"))
    .join("\n");

// Executa tudo em um único escopo e expõe o que o teste precisa.
const ctx = vm.createContext({ console, Math, Number, Set, Map, Array, Object, Error });
vm.runInContext(codigo + `
this.api = { DIMENSOES, ALPHA, MOMENTUM, GENEROS, IDS_COLD_START, CATALOGO, norma,
  validarCatalogo, normalizarNota, calcularPerfilInicial, gerarFeed, registrarAvaliacao,
  identificarDimensaoMenosRepresentada, criarEstadoInicial, preverNota };`, ctx);
const A = ctx.api;

let falhas = 0;
function checar(descricao, condicao, detalhe = "") {
    console.log(`${condicao ? "OK   " : "FALHA"}  ${descricao}${detalhe ? " — " + detalhe : ""}`);
    if (!condicao) falhas++;
}
const perto = (a, b, tol = 1e-4) => Math.abs(a - b) <= tol;

// --- Parâmetros e catálogo ---
checar("ALPHA = 0.1", A.ALPHA === 0.1);
checar("MOMENTUM = 0.8", A.MOMENTUM === 0.8);
let catalogoOk = true;
try { A.validarCatalogo(); } catch (e) { catalogoOk = false; console.log(e.message); }
checar("Catálogo: 100 músicas, dim 10, norma ≈ 1, sem NaN, 10 por gênero", catalogoOk);
checar("Notas 1..5 → 0.2..1.0",
    [1, 2, 3, 4, 5].every(n => perto(A.normalizarNota(n), n / 5, 1e-12)));

// --- Cenário de regressão do Cold Start ---
const notas = [5, 4, 3, 2, 5, 2, 4, 5, 4, 5];
const avaliacoes = A.IDS_COLD_START.map((id, i) => ({
    nota: notas[i],
    vetor: A.CATALOGO.find(m => m.id === id).vetor
}));
const perfil = A.calcularPerfilInicial(avaliacoes);
const esperado = [0.1543, 0.2442, 0.1208, 0.0383, 0.0830, 0.0332, 0.0736, 0.0958, 0.0686, 0.1378];
checar("Perfil inicial igual à simulação validada", perfil.every((v, i) => perto(v, esperado[i])),
    perfil.map(v => v.toFixed(4)).join(", "));
checar("Menor eixo = Samba", A.identificarDimensaoMenosRepresentada(perfil).genero === "Samba");

// --- Feed ---
const avaliados = new Set(A.IDS_COLD_START);
const f = A.gerarFeed(perfil, A.CATALOGO, avaliados);
checar("Feed com 10 músicas", f.feed.length === 10);
checar("8 por ranking + 2 explorações",
    f.recomendacoes.length === 8 && f.feed.filter(m => m.exploracao).length === 2);
checar("Nenhuma música já avaliada no feed", f.feed.every(m => !avaliados.has(m.id)));
checar("Sem duplicatas no feed", new Set(f.feed.map(m => m.id)).size === f.feed.length);
const expl = f.feed.filter(m => m.exploracao);
checar("Explorações de gêneros diferentes: os 2 eixos menos representados (Samba e Clássica)",
    expl.length === 2 && expl[0].genero === "Samba" && expl[1].genero === "Clássica");
checar("Ranking ordenado por similaridade decrescente",
    f.ranking.every((m, i) => i === 0 || f.ranking[i - 1].similaridade >= m.similaridade));

// --- Atualização (gradiente + momentum) ---
const estado = A.criarEstadoInicial();
estado.perfil = [...perfil];
estado.musicasAvaliadas = new Set(avaliados);
const musica = f.feed.find(m => m.exploracao);
const prev0 = A.preverNota(estado.perfil, musica.vetor);
const r1 = A.registrarAvaliacao(estado, musica, 5);
checar("Erro = nota/5 − previsão", perto(r1.erro, 1 - prev0, 1e-12));
checar("|∇E| = |erro| (vetor da música tem norma 1)", perto(r1.magnitudeGradiente, Math.abs(r1.erro), 1e-9));
checar("1ª atualização = gradiente simples (v₀ = 0)",
    estado.perfil.every((v, i) => perto(v, Math.max(0, perfil[i] + A.ALPHA * r1.erro * musica.vetor[i]), 1e-12)));
checar("Perfil sem NaN e sem componentes negativas",
    estado.perfil.every(v => Number.isFinite(v) && v >= 0));

const musica2 = A.gerarFeed(estado.perfil, A.CATALOGO, estado.musicasAvaliadas).feed[0];
const vAnterior = [...estado.velocidade];
const r2 = A.registrarAvaliacao(estado, musica2, 2);
checar("Momentum: v₂ = 0.8·v₁ + ∇E₂",
    estado.velocidade.every((v, i) => perto(v, A.MOMENTUM * vAnterior[i] + r2.gradiente[i], 1e-12)));
checar("Música avaliada sai do ranking",
    !A.gerarFeed(estado.perfil, A.CATALOGO, estado.musicasAvaliadas).ranking.some(m => m.id === musica2.id));

const perfilAntes = JSON.stringify(estado.perfil);
checar("Música já avaliada não é registrada de novo (retorna null, perfil intacto)",
    A.registrarAvaliacao(estado, musica2, 5) === null && JSON.stringify(estado.perfil) === perfilAntes);

console.log(falhas === 0 ? "\nTodos os testes passaram." : `\n${falhas} teste(s) falharam.`);
process.exit(falhas === 0 ? 0 : 1);
