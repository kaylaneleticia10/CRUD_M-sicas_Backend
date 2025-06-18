const express = require("express");
const cors = require("cors");
const app = express();
const musicasRoutes = require("./routes/musicas");

app.use(cors());
app.use(express.json());

app.use("/musicas", musicasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
