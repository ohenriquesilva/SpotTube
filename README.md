# SpotTube — Vector Recommender & Optimization of Feedback

Projeto A3 de **Cálculo e Álgebra Linear** (Engenharia de Software, Universidade Anhembi Morumbi).
Grupo: Otávio, Paulo, João e Kauã.

## 1. Objetivo

Sistema web de recomendação musical que aprende o gosto do usuário por meio de **vetores em R¹⁰**, **similaridade por cosseno**, **gradiente descendente com momentum** e **exploração dirigida** (anti-bolha). A identidade visual e a implementação são próprias; a inspiração em plataformas de streaming é apenas conceitual.

## 2. Como executar

1. Abra a pasta `SpotTube/` no VS Code.
2. Abra `index.html` com Live Server (ou qualquer servidor estático). Também funciona abrindo o arquivo direto no navegador.
3. Avalie as 10 músicas do Cold Start e clique em **Gerar meu perfil**.
4. Avalie músicas do feed e acompanhe o **HUD matemático**.

Teste do motor (opcional, requer Node.js): `node tests/regressao.js`

## 3. Funcionamento (visão geral)

```
Cold Start (10 avaliações) → perfil inicial Vᵤ⁰
      ↓
ranking por cosseno → 8 recomendações  +  2 explorações  =  feed (10 músicas)
      ↓
usuário avalia uma música → erro → gradiente → momentum → novo Vᵤ
      ↓
recalcula ranking, exploração, feed e HUD   (o ciclo se repete)
```

## 4. Estrutura do projeto

```
SpotTube/
├── index.html
├── README.md
├── css/style.css
├── js/
│   ├── config.js        constantes: gêneros, α, β, IDs do Cold Start
│   ├── catalogo.js      100 músicas, vetores normalizados e validação
│   ├── matematica.js    norma, produto escalar, cosseno, erro, gradiente, momentum
│   ├── perfil.js        perfil inicial e registro de avaliações
│   ├── recomendacao.js  ranking e top-8
│   ├── exploracao.js    menor eixo, música de exploração e montagem do feed
│   ├── estado.js        estado único da sessão
│   ├── interface.js     renderização (Cold Start, feed, HUD, telas, abas)
│   ├── dashboard.js     gráficos SVG: barras de Vᵤ e plano X × Y
│   └── app.js           orquestração e eventos
└── tests/regressao.js   teste do motor (extra, fora da estrutura oficial)
```

Ordem de carregamento (importa, pois os arquivos usam variáveis globais):
`config → catalogo → matematica → perfil → recomendacao → exploracao → estado → interface → dashboard → app`

## 5. Vetores e eixos

Cada música e o usuário são vetores em R¹⁰. A ordem dos eixos é **fixa** em todo o projeto:

| Índice | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|---|
| Gênero | Rock | Pop | Jazz | Clássica | Hip-Hop/Rap | Samba | Sertanejo | Reggae | Eletrônica | MPB |

## 6. Catálogo e normalização

O catálogo tem **100 músicas, 10 por gênero** (IDs 1–100, em blocos de 10 por gênero, na ordem dos eixos). Os pesos brutos usados na vetorização são `1.0, 0.8, 0.6, 0.3, 0`, e os vetores são **híbridos**: uma música tem um gênero principal e influências secundárias.
Exemplo (bruto): *Johnny B. Goode* = `[1, 0, 0.3, 0, 0, 0, 0, 0, 0, 0]`.

Os vetores do catálogo são normalizados para norma 1:

$$\|V\| = \sqrt{\sum_i v_i^2} \qquad \hat V = \frac{V}{\|V\|}$$

Se `‖V‖ = 0`, não há divisão. A função `validarCatalogo()` confere, ao iniciar, que há 100 músicas, vetores de dimensão 10, sem NaN, com norma ≈ 1 e com gêneros consistentes.
**O vetor do usuário não é normalizado** após as atualizações: isso não é requisito e alteraria o comportamento da descida do gradiente.

## 7. Cold Start

O sistema começa sem conhecer o usuário. Por isso apresenta 10 músicas, **uma por gênero**, avaliadas de 1 a 5 estrelas:

`IDs 1, 11, 22, 31, 41, 51, 61, 71, 81, 91`

*Decisão de implementação:* no Jazz foi usada *Take Five* (ID 22) em vez de *What a Wonderful World* (ID 21). *Take Five* tem vetor puro de Jazz (`[0,0,1,0,…]`) e é a música da simulação validada pelo grupo; assim o Cold Start mede o eixo de Jazz sem contaminar Pop e MPB.

**Nota normalizada** (decisão de implementação, não exigência literal do enunciado): a interface usa 1–5 estrelas, e o modelo usa uma variável de feedback numa escala compatível com os vetores:

$$r = \frac{\text{nota}}{5} \quad\Rightarrow\quad 1★=0.2,\ 2★=0.4,\ 3★=0.6,\ 4★=0.8,\ 5★=1.0$$

**Perfil inicial** (média das músicas ponderadas pela nota):

$$V_u^0 = \frac{1}{k}\sum_{j=1}^{k} r_j\, V_{f,j} \qquad (k = 10)$$

## 8. Similaridade e ranking

Produto escalar e cosseno:

$$a\cdot b=\sum_i a_i b_i \qquad \cos\theta=\frac{A\cdot B}{\|A\|\,\|B\|}$$

O ranking exclui as músicas já avaliadas, calcula o cosseno entre `Vᵤ` e cada música e ordena da maior para a menor similaridade (desempate pelo menor ID). As 8 primeiras formam as recomendações.

## 9. Previsão, erro e gradiente

Ao avaliar uma música `V_f` com nota normalizada `r`:

$$\hat r = V_u\cdot V_f \qquad e = r-\hat r \qquad \nabla E = -(r-\hat r)\,V_f=-e\,V_f$$

O HUD mostra `‖∇E‖`. Como `‖V_f‖ = 1`, vale `‖∇E‖ = |e|`.

## 10. Atualização com momentum

Parâmetros: `α = 0.1` (taxa de aprendizado) e `β = 0.8` (momentum). O estado guarda o vetor de velocidade `v`, inicializado com zeros:

$$v_{t+1}=\beta\,v_t+\nabla E \qquad V_u^{t+1}=\max\bigl(0,\;V_u^t-\alpha\,v_{t+1}\bigr)$$

- Na primeira atualização `v₀ = 0`, então ela coincide com o gradiente descendente simples.
- Nas seguintes, a velocidade acumula avaliações anteriores (inércia): o perfil suaviza oscilações e continua na direção em que vinha mudando.
- O `max(0, ·)` impede componentes negativas.

> Valores pós-atualização com momentum **não** são iguais aos de uma descida do gradiente simples, a partir da segunda avaliação.

## 11. Exploração (anti-bolha)

A exploração **não é aleatória**. São **2 músicas de gêneros diferentes**:

1. ordena os eixos de `Vᵤ` do **menor para o maior componente** e pega os dois menores;
2. em cada um, considera as músicas do gênero ainda não avaliadas e fora do top 8;
3. escolhe a de **maior similaridade** com o perfil atual.

Assim o sistema empurra o usuário para um gênero pouco representado, mas ainda respeitando a proximidade matemática dentro dele (diversificação controlada). Se um gênero não tiver mais músicas disponíveis, passa-se ao próximo eixo menos representado.

## 12. Feed

`8 recomendações por ranking + 2 explorações = 10 músicas` (exibidas em 2 colunas de 5). As músicas de exploração aparecem com o selo **EXPLORAÇÃO**.

## 13. HUD matemático

Mostra: vetor atual `Vᵤ`, norma `‖Vᵤ‖₂`, magnitude do último gradiente, previsão `r̂`, última nota, erro `e`, `α`, `β` e o gênero explorado.

## 14. Exemplo reproduzível (teste de regressão)

Notas do Cold Start (na ordem dos IDs): `5, 4, 3, 2, 5, 2, 4, 5, 4, 5`.
Perfil inicial obtido:

```
[0.1543, 0.2442, 0.1208, 0.0383, 0.0830, 0.0332, 0.0736, 0.0958, 0.0686, 0.1378]
```

Os dois menores eixos são **Samba (0.0332)** e **Clássica (0.0383)**, então as explorações vêm desses gêneros. Feed gerado pelo código nesse cenário (8 por ranking + 2 por exploração):

| # | Música | Gênero | Similaridade |
|---|---|---|---|
| 1 | Like a Prayer | Pop | 0.7877 |
| 2 | Rolling in the Deep | Pop | 0.7877 |
| 3 | Alegria, Alegria | MPB | 0.7742 |
| 4 | Feeling Good | Jazz | 0.7491 |
| 5 | Livin' on a Prayer | Rock | 0.7023 |
| 6 | Another One Bites the Dust | Rock | 0.6990 |
| 7 | Fly Me to the Moon | Jazz | 0.6713 |
| 8 | ...Baby One More Time | Pop | 0.6642 |
| 9 | O Que É, O Que É? (exploração) | Samba | 0.6228 |
| 10 | Ride of the Valkyries (exploração) | Clássica | 0.2939 |

`node tests/regressao.js` valida esse cenário e as invariantes do motor (catálogo, notas, feed, momentum).

## 15. Arquitetura

Camadas: **dados** (`config`, `catalogo`) → **matemática** (`matematica`) → **domínio** (`perfil`, `recomendacao`, `exploracao`) → **estado** (`estado`) → **apresentação** (`interface`) → **orquestração** (`app`). O motor (matemática e domínio) não acessa o DOM; só `interface.js` e `app.js` o fazem.

## 16. Decisões de implementação

- Nota 1–5 convertida por `nota / 5`.
- `α = 0.1` e `β = 0.8` (valores definidos pelo grupo).
- Vetores do catálogo normalizados; vetor do usuário **não** normalizado.
- Cold Start com *Take Five* (ID 22) no Jazz.
- Exploração dirigida aos 2 eixos menos representados (gêneros diferentes), não aleatória.
- Feed: 8 por ranking + 2 por exploração (antes eram 9 + 1), em 2 colunas de 5.
- Telas: apresentação (Iniciar/Resetar) → app (explicação, HUD, abas Músicas/Dashboard); botão Voltar.
- O Dashboard só lê o estado (não altera cálculos): barras de Vᵤ, plano X × Y com projeções (o cosseno real usa os 10 eixos) e a decomposição do produto escalar em 10 parcelas (uᵢ·fᵢ).
- No Dashboard dá para analisar **qualquer das 100 músicas**. Vᵤ vem do comportamento do usuário (muda com as notas); V_f são pesos fixos do catálogo. Escolher uma música **não altera** Vᵤ. Os eixos do plano são automáticos (os 2 de maior parcela uᵢ·fᵢ), com opção manual.
- Cada música só pode ser avaliada **uma vez**: o botão mostra "Música já avaliada" e o motor (`registrarAvaliacao`) recusa reavaliações.
- JavaScript puro, sem frameworks; sem armazenamento persistente (o estado vive na sessão).
