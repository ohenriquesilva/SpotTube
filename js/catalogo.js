// js/catalogo.js
// Catálogo validado a partir da planilha SpotTube_Matriz_Vetorizacao_v1.xlsx.
// Os vetores abaixo já estão normalizados: ||Vf||₂ ≈ 1.
// Ordem dos eixos: ver GENEROS em config.js.
const CATALOGO = [
    {
        "id": 1,
        "titulo": "Johnny B. Goode",
        "artista": "Chuck Berry",
        "genero": "Rock",
        "vetor": [
            0.9578262852211513,
            0.0,
            0.2873478855663454,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
        ]
    },
    {
        "id": 2,
        "titulo": "(I Can't Get No) Satisfaction",
        "artista": "The Rolling Stones",
        "genero": "Rock",
        "vetor": [
            0.9578262852211513,
            0.2873478855663454,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
        ]
    },
    {
        "id": 3,
        "titulo": "Stairway to Heaven",
        "artista": "Led Zeppelin",
        "genero": "Rock",
        "vetor": [
            0.9205746178983233,
            0.0,
            0.276172385369497,
            0.276172385369497,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
        ]
    },
    {
        "id": 4,
        "titulo": "Hotel California",
        "artista": "Eagles",
        "genero": "Rock",
        "vetor": [
            0.9205746178983233,
            0.276172385369497,
            0.276172385369497,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
        ]
    },
    {
        "id": 5,
        "titulo": "Another One Bites the Dust",
        "artista": "Queen",
        "genero": "Rock",
        "vetor": [
            0.8304547985373997,
            0.4982728791224398,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.2491364395612199,
            0.0
        ]
    },
    {
        "id": 6,
        "titulo": "Back in Black",
        "artista": "AC/DC",
        "genero": "Rock",
        "vetor": [
            0.9578262852211513,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.2873478855663454,
            0.0
        ]
    },
    {
        "id": 7,
        "titulo": "Smells Like Teen Spirit",
        "artista": "Nirvana",
        "genero": "Rock",
        "vetor": [
            0.9205746178983233,
            0.276172385369497,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.276172385369497,
            0.0
        ]
    },
    {
        "id": 8,
        "titulo": "Sweet Child o' Mine",
        "artista": "Guns N' Roses",
        "genero": "Rock",
        "vetor": [
            0.9205746178983233,
            0.276172385369497,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.276172385369497,
            0.0
        ]
    },
    {
        "id": 9,
        "titulo": "Livin' on a Prayer",
        "artista": "Bon Jovi",
        "genero": "Rock",
        "vetor": [
            0.8304547985373997,
            0.4982728791224398,
            0.0,
            0.0,
            0.0,
            0.0,
            0.2491364395612199,
            0.0,
            0.0,
            0.0
        ]
    },
    {
        "id": 10,
        "titulo": "We Will Rock You",
        "artista": "Queen",
        "genero": "Rock",
        "vetor": [
            0.9578262852211513,
            0.2873478855663454,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
        ]
    },
    {
        "id": 11,
        "titulo": "Billie Jean",
        "artista": "Michael Jackson",
        "genero": "Pop",
        "vetor": [
            0.276172385369497,
            0.9205746178983233,
            0.276172385369497,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
        ]
    },
    {
        "id": 12,
        "titulo": "Like a Prayer",
        "artista": "Madonna",
        "genero": "Pop",
        "vetor": [
            0.276172385369497,
            0.9205746178983233,
            0.276172385369497,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
        ]
    },
    {
        "id": 13,
        "titulo": "...Baby One More Time",
        "artista": "Britney Spears",
        "genero": "Pop",
        "vetor": [
            0.0,
            0.9578262852211513,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.2873478855663454,
            0.0
        ]
    },
    {
        "id": 14,
        "titulo": "Toxic",
        "artista": "Britney Spears",
        "genero": "Pop",
        "vetor": [
            0.0,
            0.9578262852211513,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.2873478855663454,
            0.0
        ]
    },
    {
        "id": 15,
        "titulo": "Poker Face",
        "artista": "Lady Gaga",
        "genero": "Pop",
        "vetor": [
            0.0,
            0.8574929257125443,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.5144957554275266,
            0.0
        ]
    },
    {
        "id": 16,
        "titulo": "Bad Romance",
        "artista": "Lady Gaga",
        "genero": "Pop",
        "vetor": [
            0.0,
            0.8574929257125443,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.5144957554275266,
            0.0
        ]
    },
    {
        "id": 17,
        "titulo": "Rolling in the Deep",
        "artista": "Adele",
        "genero": "Pop",
        "vetor": [
            0.276172385369497,
            0.9205746178983233,
            0.276172385369497,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
        ]
    },
    {
        "id": 18,
        "titulo": "Shape of You",
        "artista": "Ed Sheeran",
        "genero": "Pop",
        "vetor": [
            0.0,
            0.9578262852211513,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.2873478855663454,
            0.0
        ]
    },
    {
        "id": 19,
        "titulo": "Blinding Lights",
        "artista": "The Weeknd",
        "genero": "Pop",
        "vetor": [
            0.0,
            0.8574929257125443,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.5144957554275266,
            0.0
        ]
    },
    {
        "id": 20,
        "titulo": "As It Was",
        "artista": "Harry Styles",
        "genero": "Pop",
        "vetor": [
            0.0,
            0.9578262852211513,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.2873478855663454,
            0.0
        ]
    },
    {
        "id": 21,
        "titulo": "What a Wonderful World",
        "artista": "Louis Armstrong",
        "genero": "Jazz",
        "vetor": [
            0.0,
            0.276172385369497,
            0.9205746178983233,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.276172385369497
        ]
    },
    {
        "id": 22,
        "titulo": "Take Five",
        "artista": "Dave Brubeck",
        "genero": "Jazz",
        "vetor": [
            0.0,
            0.0,
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
        ]
    },
    {
        "id": 23,
        "titulo": "So What",
        "artista": "Miles Davis",
        "genero": "Jazz",
        "vetor": [
            0.0,
            0.0,
            0.9578262852211513,
            0.2873478855663454,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
        ]
    },
    {
        "id": 24,
        "titulo": "Feeling Good",
        "artista": "Nina Simone",
        "genero": "Jazz",
        "vetor": [
            0.2417468892076141,
            0.4834937784152281,
            0.8058229640253802,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.2417468892076141
        ]
    },
    {
        "id": 25,
        "titulo": "My Funny Valentine",
        "artista": "Chet Baker",
        "genero": "Jazz",
        "vetor": [
            0.0,
            0.276172385369497,
            0.9205746178983233,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.276172385369497
        ]
    },
    {
        "id": 26,
        "titulo": "Fly Me to the Moon",
        "artista": "Frank Sinatra",
        "genero": "Jazz",
        "vetor": [
            0.0,
            0.4982728791224398,
            0.8304547985373997,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.2491364395612199
        ]
    },
    {
        "id": 27,
        "titulo": "Summertime",
        "artista": "Ella Fitzgerald & Louis Armstrong",
        "genero": "Jazz",
        "vetor": [
            0.0,
            0.2662069528248341,
            0.8873565094161139,
            0.0,
            0.0,
            0.2662069528248341,
            0.0,
            0.0,
            0.0,
            0.2662069528248341
        ]
    },
    {
        "id": 28,
        "titulo": "Autumn Leaves",
        "artista": "Cannonball Adderley",
        "genero": "Jazz",
        "vetor": [
            0.0,
            0.0,
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
        ]
    },
    {
        "id": 29,
        "titulo": "Sing, Sing, Sing",
        "artista": "Benny Goodman",
        "genero": "Jazz",
        "vetor": [
            0.0,
            0.2873478855663454,
            0.9578262852211513,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
        ]
    },
    {
        "id": 30,
        "titulo": "Moanin'",
        "artista": "Art Blakey & The Jazz Messengers",
        "genero": "Jazz",
        "vetor": [
            0.0,
            0.0,
            0.9578262852211513,
            0.0,
            0.0,
            0.2873478855663454,
            0.0,
            0.0,
            0.0,
            0.0
        ]
    },
    {
        "id": 31,
        "titulo": "Symphony No. 5",
        "artista": "Ludwig van Beethoven",
        "genero": "Clássica",
        "vetor": [
            0.2873478855663454,
            0.0,
            0.0,
            0.9578262852211513,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
        ]
    },
    {
        "id": 32,
        "titulo": "Für Elise",
        "artista": "Ludwig van Beethoven",
        "genero": "Clássica",
        "vetor": [
            0.0,
            0.2873478855663454,
            0.0,
            0.9578262852211513,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
        ]
    },
    {
        "id": 33,
        "titulo": "Eine kleine Nachtmusik",
        "artista": "Wolfgang Amadeus Mozart",
        "genero": "Clássica",
        "vetor": [
            0.0,
            0.0,
            0.2873478855663454,
            0.9578262852211513,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
        ]
    },
    {
        "id": 34,
        "titulo": "Symphony No. 40",
        "artista": "Wolfgang Amadeus Mozart",
        "genero": "Clássica",
        "vetor": [
            0.0,
            0.0,
            0.2873478855663454,
            0.9578262852211513,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
        ]
    },
    {
        "id": 35,
        "titulo": "Moonlight Sonata",
        "artista": "Ludwig van Beethoven",
        "genero": "Clássica",
        "vetor": [
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
        ]
    },
    {
        "id": 36,
        "titulo": "The Four Seasons: Spring",
        "artista": "Antonio Vivaldi",
        "genero": "Clássica",
        "vetor": [
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
        ]
    },
    {
        "id": 37,
        "titulo": "Canon in D",
        "artista": "Johann Pachelbel",
        "genero": "Clássica",
        "vetor": [
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
        ]
    },
    {
        "id": 38,
        "titulo": "Air on the G String",
        "artista": "Johann Sebastian Bach",
        "genero": "Clássica",
        "vetor": [
            0.0,
            0.0,
            0.0,
            0.9578262852211513,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.2873478855663454
        ]
    },
    {
        "id": 39,
        "titulo": "Nocturne Op. 9 No. 2",
        "artista": "Frédéric Chopin",
        "genero": "Clássica",
        "vetor": [
            0.0,
            0.2873478855663454,
            0.0,
            0.9578262852211513,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
        ]
    },
    {
        "id": 40,
        "titulo": "Ride of the Valkyries",
        "artista": "Richard Wagner",
        "genero": "Clássica",
        "vetor": [
            0.5144957554275266,
            0.0,
            0.0,
            0.8574929257125443,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
        ]
    },
    {
        "id": 41,
        "titulo": "Lose Yourself",
        "artista": "Eminem",
        "genero": "Hip-Hop/Rap",
        "vetor": [
            0.2491364395612199,
            0.4982728791224398,
            0.0,
            0.0,
            0.8304547985373997,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
        ]
    },
    {
        "id": 42,
        "titulo": "Juicy",
        "artista": "The Notorious B.I.G.",
        "genero": "Hip-Hop/Rap",
        "vetor": [
            0.0,
            0.276172385369497,
            0.276172385369497,
            0.0,
            0.9205746178983235,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
        ]
    },
    {
        "id": 43,
        "titulo": "California Love",
        "artista": "2Pac feat. Dr. Dre",
        "genero": "Hip-Hop/Rap",
        "vetor": [
            0.276172385369497,
            0.276172385369497,
            0.0,
            0.0,
            0.9205746178983235,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
        ]
    },
    {
        "id": 44,
        "titulo": "Changes",
        "artista": "2Pac",
        "genero": "Hip-Hop/Rap",
        "vetor": [
            0.0,
            0.276172385369497,
            0.0,
            0.0,
            0.9205746178983233,
            0.0,
            0.0,
            0.0,
            0.0,
            0.276172385369497
        ]
    },
    {
        "id": 45,
        "titulo": "Still D.R.E.",
        "artista": "Dr. Dre feat. Snoop Dogg",
        "genero": "Hip-Hop/Rap",
        "vetor": [
            0.276172385369497,
            0.276172385369497,
            0.0,
            0.0,
            0.9205746178983235,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
        ]
    },
    {
        "id": 46,
        "titulo": "Without Me",
        "artista": "Eminem",
        "genero": "Hip-Hop/Rap",
        "vetor": [
            0.2491364395612199,
            0.4982728791224398,
            0.0,
            0.0,
            0.8304547985373997,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
        ]
    },
    {
        "id": 47,
        "titulo": "N.Y. State of Mind",
        "artista": "Nas",
        "genero": "Hip-Hop/Rap",
        "vetor": [
            0.0,
            0.276172385369497,
            0.276172385369497,
            0.0,
            0.9205746178983235,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
        ]
    },
    {
        "id": 48,
        "titulo": "The Real Slim Shady",
        "artista": "Eminem",
        "genero": "Hip-Hop/Rap",
        "vetor": [
            0.0,
            0.2873478855663454,
            0.0,
            0.0,
            0.9578262852211513,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
        ]
    },
    {
        "id": 49,
        "titulo": "HUMBLE.",
        "artista": "Kendrick Lamar",
        "genero": "Hip-Hop/Rap",
        "vetor": [
            0.0,
            0.2873478855663454,
            0.0,
            0.0,
            0.9578262852211513,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
        ]
    },
    {
        "id": 50,
        "titulo": "In Da Club",
        "artista": "50 Cent",
        "genero": "Hip-Hop/Rap",
        "vetor": [
            0.2491364395612199,
            0.4982728791224398,
            0.0,
            0.0,
            0.8304547985373997,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
        ]
    },
    {
        "id": 51,
        "titulo": "O Mundo é um Moinho",
        "artista": "Cartola",
        "genero": "Samba",
        "vetor": [
            0.0,
            0.0,
            0.2491364395612199,
            0.0,
            0.0,
            0.8304547985373997,
            0.0,
            0.0,
            0.0,
            0.4982728791224398
        ]
    },
    {
        "id": 52,
        "titulo": "As Rosas Não Falam",
        "artista": "Cartola",
        "genero": "Samba",
        "vetor": [
            0.0,
            0.0,
            0.2491364395612199,
            0.0,
            0.0,
            0.8304547985373997,
            0.0,
            0.0,
            0.0,
            0.4982728791224398
        ]
    },
    {
        "id": 53,
        "titulo": "Aquarela Brasileira",
        "artista": "Martinho da Vila",
        "genero": "Samba",
        "vetor": [
            0.0,
            0.2491364395612199,
            0.0,
            0.0,
            0.0,
            0.8304547985373997,
            0.0,
            0.0,
            0.0,
            0.4982728791224398
        ]
    },
    {
        "id": 54,
        "titulo": "Canto das Três Raças",
        "artista": "Clara Nunes",
        "genero": "Samba",
        "vetor": [
            0.0,
            0.0,
            0.2491364395612199,
            0.0,
            0.0,
            0.8304547985373997,
            0.0,
            0.0,
            0.0,
            0.4982728791224398
        ]
    },
    {
        "id": 55,
        "titulo": "Não Deixe o Samba Morrer",
        "artista": "Alcione",
        "genero": "Samba",
        "vetor": [
            0.0,
            0.2662069528248341,
            0.2662069528248341,
            0.0,
            0.0,
            0.8873565094161139,
            0.0,
            0.0,
            0.0,
            0.2662069528248341
        ]
    },
    {
        "id": 56,
        "titulo": "Trem das Onze",
        "artista": "Adoniran Barbosa",
        "genero": "Samba",
        "vetor": [
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.8574929257125443,
            0.0,
            0.0,
            0.0,
            0.5144957554275266
        ]
    },
    {
        "id": 57,
        "titulo": "O Que É, O Que É?",
        "artista": "Gonzaguinha",
        "genero": "Samba",
        "vetor": [
            0.2349781349963872,
            0.4699562699927744,
            0.2349781349963872,
            0.0,
            0.0,
            0.7832604499879573,
            0.0,
            0.0,
            0.0,
            0.2349781349963872
        ]
    },
    {
        "id": 58,
        "titulo": "Coisa de Pele",
        "artista": "Jorge Aragão",
        "genero": "Samba",
        "vetor": [
            0.0,
            0.0,
            0.2491364395612199,
            0.0,
            0.0,
            0.8304547985373997,
            0.0,
            0.0,
            0.0,
            0.4982728791224398
        ]
    },
    {
        "id": 59,
        "titulo": "Coração em Desalinho",
        "artista": "Zeca Pagodinho",
        "genero": "Samba",
        "vetor": [
            0.0,
            0.0,
            0.276172385369497,
            0.0,
            0.0,
            0.9205746178983233,
            0.0,
            0.0,
            0.0,
            0.276172385369497
        ]
    },
    {
        "id": 60,
        "titulo": "Vou Festejar",
        "artista": "Beth Carvalho",
        "genero": "Samba",
        "vetor": [
            0.0,
            0.2662069528248341,
            0.2662069528248341,
            0.0,
            0.0,
            0.8873565094161139,
            0.0,
            0.0,
            0.0,
            0.2662069528248341
        ]
    },
    {
        "id": 61,
        "titulo": "Evidências",
        "artista": "Chitãozinho & Xororó",
        "genero": "Sertanejo",
        "vetor": [
            0.0,
            0.276172385369497,
            0.0,
            0.0,
            0.0,
            0.0,
            0.9205746178983233,
            0.0,
            0.0,
            0.276172385369497
        ]
    },
    {
        "id": 62,
        "titulo": "Fio de Cabelo",
        "artista": "Chitãozinho & Xororó",
        "genero": "Sertanejo",
        "vetor": [
            0.0,
            0.276172385369497,
            0.0,
            0.0,
            0.0,
            0.0,
            0.9205746178983233,
            0.0,
            0.0,
            0.276172385369497
        ]
    },
    {
        "id": 63,
        "titulo": "Pense em Mim",
        "artista": "Leandro & Leonardo",
        "genero": "Sertanejo",
        "vetor": [
            0.0,
            0.276172385369497,
            0.0,
            0.0,
            0.0,
            0.0,
            0.9205746178983233,
            0.0,
            0.0,
            0.276172385369497
        ]
    },
    {
        "id": 64,
        "titulo": "É o Amor",
        "artista": "Zezé Di Camargo & Luciano",
        "genero": "Sertanejo",
        "vetor": [
            0.0,
            0.4982728791224398,
            0.0,
            0.0,
            0.0,
            0.0,
            0.8304547985373997,
            0.0,
            0.0,
            0.2491364395612199
        ]
    },
    {
        "id": 65,
        "titulo": "Boate Azul",
        "artista": "Bruno & Marrone",
        "genero": "Sertanejo",
        "vetor": [
            0.0,
            0.2873478855663454,
            0.0,
            0.0,
            0.0,
            0.0,
            0.9578262852211513,
            0.0,
            0.0,
            0.0
        ]
    },
    {
        "id": 66,
        "titulo": "Dormi na Praça",
        "artista": "Bruno & Marrone",
        "genero": "Sertanejo",
        "vetor": [
            0.0,
            0.2873478855663454,
            0.0,
            0.0,
            0.0,
            0.0,
            0.9578262852211513,
            0.0,
            0.0,
            0.0
        ]
    },
    {
        "id": 67,
        "titulo": "Ai Se Eu Te Pego",
        "artista": "Michel Teló",
        "genero": "Sertanejo",
        "vetor": [
            0.2223747949983303,
            0.5929994533288809,
            0.0,
            0.0,
            0.0,
            0.0,
            0.7412493166611012,
            0.0,
            0.2223747949983303,
            0.0
        ]
    },
    {
        "id": 68,
        "titulo": "Chora, Me Liga",
        "artista": "João Bosco & Vinícius",
        "genero": "Sertanejo",
        "vetor": [
            0.0,
            0.5144957554275266,
            0.0,
            0.0,
            0.0,
            0.0,
            0.8574929257125443,
            0.0,
            0.0,
            0.0
        ]
    },
    {
        "id": 69,
        "titulo": "Aquele 1%",
        "artista": "Marcos & Belutti feat. Wesley Safadão",
        "genero": "Sertanejo",
        "vetor": [
            0.0,
            0.4982728791224398,
            0.0,
            0.0,
            0.0,
            0.0,
            0.8304547985373997,
            0.0,
            0.2491364395612199,
            0.0
        ]
    },
    {
        "id": 70,
        "titulo": "Infiel",
        "artista": "Marília Mendonça",
        "genero": "Sertanejo",
        "vetor": [
            0.0,
            0.4982728791224398,
            0.0,
            0.0,
            0.0,
            0.0,
            0.8304547985373997,
            0.0,
            0.0,
            0.2491364395612199
        ]
    },
    {
        "id": 71,
        "titulo": "Three Little Birds",
        "artista": "Bob Marley & The Wailers",
        "genero": "Reggae",
        "vetor": [
            0.0,
            0.2873478855663454,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.9578262852211513,
            0.0,
            0.0
        ]
    },
    {
        "id": 72,
        "titulo": "Is This Love",
        "artista": "Bob Marley & The Wailers",
        "genero": "Reggae",
        "vetor": [
            0.0,
            0.2873478855663454,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.9578262852211513,
            0.0,
            0.0
        ]
    },
    {
        "id": 73,
        "titulo": "One Love",
        "artista": "Bob Marley & The Wailers",
        "genero": "Reggae",
        "vetor": [
            0.0,
            0.2873478855663454,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.9578262852211513,
            0.0,
            0.0
        ]
    },
    {
        "id": 74,
        "titulo": "Redemption Song",
        "artista": "Bob Marley & The Wailers",
        "genero": "Reggae",
        "vetor": [
            0.0,
            0.2662069528248341,
            0.2662069528248341,
            0.0,
            0.0,
            0.0,
            0.0,
            0.8873565094161139,
            0.0,
            0.2662069528248341
        ]
    },
    {
        "id": 75,
        "titulo": "Could You Be Loved",
        "artista": "Bob Marley & The Wailers",
        "genero": "Reggae",
        "vetor": [
            0.0,
            0.276172385369497,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.9205746178983233,
            0.276172385369497,
            0.0
        ]
    },
    {
        "id": 76,
        "titulo": "No Woman, No Cry",
        "artista": "Bob Marley & The Wailers",
        "genero": "Reggae",
        "vetor": [
            0.0,
            0.276172385369497,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.9205746178983233,
            0.0,
            0.276172385369497
        ]
    },
    {
        "id": 77,
        "titulo": "You Can Get It If You Really Want",
        "artista": "Jimmy Cliff",
        "genero": "Reggae",
        "vetor": [
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            0.0
        ]
    },
    {
        "id": 78,
        "titulo": "Many Rivers to Cross",
        "artista": "Jimmy Cliff",
        "genero": "Reggae",
        "vetor": [
            0.0,
            0.0,
            0.276172385369497,
            0.0,
            0.0,
            0.0,
            0.0,
            0.9205746178983233,
            0.0,
            0.276172385369497
        ]
    },
    {
        "id": 79,
        "titulo": "Police and Thieves",
        "artista": "Junior Murvin",
        "genero": "Reggae",
        "vetor": [
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            0.0
        ]
    },
    {
        "id": 80,
        "titulo": "Don't Worry Be Happy",
        "artista": "Bobby McFerrin",
        "genero": "Reggae",
        "vetor": [
            0.2491364395612199,
            0.4982728791224398,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.8304547985373997,
            0.0,
            0.0
        ]
    },
    {
        "id": 81,
        "titulo": "One More Time",
        "artista": "Daft Punk",
        "genero": "Eletrônica",
        "vetor": [
            0.0,
            0.5144957554275266,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.8574929257125443,
            0.0
        ]
    },
    {
        "id": 82,
        "titulo": "Around the World",
        "artista": "Daft Punk",
        "genero": "Eletrônica",
        "vetor": [
            0.0,
            0.2873478855663454,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.9578262852211513,
            0.0
        ]
    },
    {
        "id": 83,
        "titulo": "Harder, Better, Faster, Stronger",
        "artista": "Daft Punk",
        "genero": "Eletrônica",
        "vetor": [
            0.0,
            0.2873478855663454,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.9578262852211513,
            0.0
        ]
    },
    {
        "id": 84,
        "titulo": "Levels",
        "artista": "Avicii",
        "genero": "Eletrônica",
        "vetor": [
            0.0,
            0.5144957554275266,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.8574929257125443,
            0.0
        ]
    },
    {
        "id": 85,
        "titulo": "Wake Me Up",
        "artista": "Avicii",
        "genero": "Eletrônica",
        "vetor": [
            0.2491364395612199,
            0.4982728791224398,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.8304547985373997,
            0.0
        ]
    },
    {
        "id": 86,
        "titulo": "Animals",
        "artista": "Martin Garrix",
        "genero": "Eletrônica",
        "vetor": [
            0.2491364395612199,
            0.4982728791224398,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.8304547985373997,
            0.0
        ]
    },
    {
        "id": 87,
        "titulo": "Titanium",
        "artista": "David Guetta feat. Sia",
        "genero": "Eletrônica",
        "vetor": [
            0.0,
            0.5144957554275266,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.8574929257125443,
            0.0
        ]
    },
    {
        "id": 88,
        "titulo": "Don't You Worry Child",
        "artista": "Swedish House Mafia",
        "genero": "Eletrônica",
        "vetor": [
            0.0,
            0.5144957554275266,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.8574929257125443,
            0.0
        ]
    },
    {
        "id": 89,
        "titulo": "Strobe",
        "artista": "deadmau5",
        "genero": "Eletrônica",
        "vetor": [
            0.0,
            0.2873478855663454,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.9578262852211513,
            0.0
        ]
    },
    {
        "id": 90,
        "titulo": "Clarity",
        "artista": "Zedd feat. Foxes",
        "genero": "Eletrônica",
        "vetor": [
            0.0,
            0.5144957554275266,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.8574929257125443,
            0.0
        ]
    },
    {
        "id": 91,
        "titulo": "Construção",
        "artista": "Chico Buarque",
        "genero": "MPB",
        "vetor": [
            0.0,
            0.2873478855663454,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.9578262852211513
        ]
    },
    {
        "id": 92,
        "titulo": "Águas de Março",
        "artista": "Elis Regina & Tom Jobim",
        "genero": "MPB",
        "vetor": [
            0.0,
            0.2417468892076141,
            0.4834937784152281,
            0.0,
            0.0,
            0.2417468892076141,
            0.0,
            0.0,
            0.0,
            0.8058229640253802
        ]
    },
    {
        "id": 93,
        "titulo": "O Bêbado e a Equilibrista",
        "artista": "João Bosco",
        "genero": "MPB",
        "vetor": [
            0.0,
            0.2873478855663454,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.9578262852211513
        ]
    },
    {
        "id": 94,
        "titulo": "Como Nossos Pais",
        "artista": "Belchior",
        "genero": "MPB",
        "vetor": [
            0.0,
            0.2873478855663454,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.9578262852211513
        ]
    },
    {
        "id": 95,
        "titulo": "Alegria, Alegria",
        "artista": "Caetano Veloso",
        "genero": "MPB",
        "vetor": [
            0.2417468892076141,
            0.4834937784152281,
            0.2417468892076141,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.8058229640253802
        ]
    },
    {
        "id": 96,
        "titulo": "Aquarela",
        "artista": "Toquinho",
        "genero": "MPB",
        "vetor": [
            0.0,
            0.2873478855663454,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.9578262852211513
        ]
    },
    {
        "id": 97,
        "titulo": "Palco",
        "artista": "Gilberto Gil",
        "genero": "MPB",
        "vetor": [
            0.0,
            0.2662069528248341,
            0.0,
            0.0,
            0.2662069528248341,
            0.2662069528248341,
            0.0,
            0.0,
            0.0,
            0.8873565094161139
        ]
    },
    {
        "id": 98,
        "titulo": "Sina",
        "artista": "Djavan",
        "genero": "MPB",
        "vetor": [
            0.0,
            0.276172385369497,
            0.276172385369497,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.9205746178983235
        ]
    },
    {
        "id": 99,
        "titulo": "Paciência",
        "artista": "Lenine",
        "genero": "MPB",
        "vetor": [
            0.0,
            0.2873478855663454,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.9578262852211513
        ]
    },
    {
        "id": 100,
        "titulo": "Pra Você Guardei o Amor",
        "artista": "Nando Reis & Ana Cañas",
        "genero": "MPB",
        "vetor": [
            0.0,
            0.5144957554275266,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.8574929257125443
        ]
    }
];

// Verifica as invariantes do catálogo. Lança erro se alguma for violada.
function validarCatalogo() {
    if (CATALOGO.length !== 100) {
        throw new Error(`Catálogo inválido: esperado 100 itens, encontrado ${CATALOGO.length}.`);
    }

    CATALOGO.forEach((musica, indice) => {
        if (musica.id !== indice + 1) {
            throw new Error(`ID fora de sequência na posição ${indice}.`);
        }
        if (musica.vetor.length !== DIMENSOES) {
            throw new Error(`Vetor inválido na música ${musica.id}.`);
        }
        if (!musica.vetor.every(Number.isFinite)) {
            throw new Error(`Vetor com NaN/undefined na música ${musica.id}.`);
        }
        if (Math.abs(norma(musica.vetor) - 1) > 1e-6) {
            throw new Error(`Vetor não normalizado na música ${musica.id}.`);
        }
        if (musica.genero !== GENEROS[Math.floor(indice / 10)]) {
            throw new Error(`Gênero inconsistente na música ${musica.id}.`);
        }
    });

    // O Cold Start deve ter uma música por eixo, na ordem dos eixos.
    IDS_COLD_START.forEach((id, eixo) => {
        const musica = CATALOGO.find(item => item.id === id);
        if (!musica || musica.genero !== GENEROS[eixo]) {
            throw new Error(`Cold Start inválido no eixo ${eixo} (ID ${id}).`);
        }
    });

    return true;
}
