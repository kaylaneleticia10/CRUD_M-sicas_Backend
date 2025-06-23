const express = require("express");
const cors = require("cors");

const app = express();

const allowedOrigins = [
  "https://crud-musicas-frontend-git-main-kaylane-leticias-projects.vercel.app"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `Acesso CORS negado para esta origem: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

let musicas = [];
let nextId = 1;

// GET /musicas - retorna todas as músicas
app.get("/musicas", (req, res) => {
  res.json(musicas);
});

// GET /musicas/:id - retorna música pelo id
app.get("/musicas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const musica = musicas.find(m => m.id === id);
  if (!musica) {
    return res.status(404).json({ error: "Música não encontrada" });
  }
  res.json(musica);
});

// POST /musicas - cria uma nova música
app.post("/musicas", (req, res) => {
  const { titulo, artista, genero, nota } = req.body;
  if (!titulo) return res.status(400).json({ error: "Título é obrigatório" });

  const novaMusica = {
    id: nextId++,
    titulo,
    artista: artista || "",
    genero: genero || "",
    nota: nota || 0
  };
  musicas.push(novaMusica);
  res.status(201).json(novaMusica);
});

// PUT /musicas/:id - atualiza uma música
app.put("/musicas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = musicas.findIndex(m => m.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Música não encontrada" });
  }

  const { titulo, artista, genero, nota } = req.body;

  musicas[index] = {
    id,
    titulo: titulo || musicas[index].titulo,
    artista: artista || musicas[index].artista,
    genero: genero || musicas[index].genero,
    nota: nota || musicas[index].nota
  };

  res.json(musicas[index]);
});

// DELETE /musicas/:id - deleta uma música
app.delete("/musicas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = musicas.findIndex(m => m.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Música não encontrada" });
  }
  musicas.splice(index, 1);
  res.status(204).send();
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
