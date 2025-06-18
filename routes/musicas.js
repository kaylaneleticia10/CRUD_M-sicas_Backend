const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const DB_PATH = path.join(__dirname, "../data/db.json");

// 🟢 Listar todas as músicas
router.get("/", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_PATH));
  res.json(data);
});

// 🔵 Buscar uma música por ID
router.get("/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_PATH));
  const musica = data.find(m => m.id == req.params.id);
  if (!musica) {
    return res.status(404).json({ erro: "Música não encontrada" });
  }
  res.json(musica);
});

// 🟡 Criar nova música
router.post("/", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_PATH));
  const novaMusica = {
    id: Date.now(),
    titulo: req.body.titulo,
    artista: req.body.artista,
    genero: req.body.genero,
    nota: req.body.nota
  };
  data.push(novaMusica);
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  res.status(201).json(novaMusica);
});

// 🟠 Atualizar uma música
router.put("/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_PATH));
  const index = data.findIndex(m => m.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ erro: "Música não encontrada" });
  }

  data[index] = {
    id: Number(req.params.id),
    titulo: req.body.titulo,
    artista: req.body.artista,
    genero: req.body.genero,
    nota: req.body.nota
  };

  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  res.json(data[index]);
});

// 🔴 Excluir uma música
router.delete("/:id", (req, res) => {
  let data = JSON.parse(fs.readFileSync(DB_PATH));
  const novaLista = data.filter(m => m.id != req.params.id);

  if (data.length === novaLista.length) {
    return res.status(404).json({ erro: "Música não encontrada" });
  }

  fs.writeFileSync(DB_PATH, JSON.stringify(novaLista, null, 2));
  res.status(204).end();
});

module.exports = router;
