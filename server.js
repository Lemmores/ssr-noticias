const express = require("express");
const axios = require("axios");

const app = express();

const API_URL = "https://matilha-api.onrender.com"; // 🔥 SUA API REAL

app.get("/noticia/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(
      `${API_URL}/api/noticias/${id}` // ✅ ROTA CORRETA
    );

    const noticia = response.data;

    const descricao =
      noticia.resumo ||
      (Array.isArray(noticia.textoCompleto)
        ? noticia.textoCompleto[0]
        : "");

    res.send(`
      <!DOCTYPE html>
      <html lang="pt-BR">
        <head>
          <meta charset="UTF-8" />
          <title>${noticia.titulo}</title>

          <!-- Open Graph -->
          <meta property="og:type" content="article" />
          <meta property="og:title" content="${noticia.titulo}" />
          <meta property="og:description" content="${descricao}" />
          <meta property="og:image" content="${noticia.imagem}" />
          <meta property="og:url" content="https://ssr-noticias-matilha.vercel.app/noticia/${id}" />

          <!-- Twitter -->
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="${noticia.titulo}" />
          <meta name="twitter:description" content="${descricao}" />
          <meta name="twitter:image" content="${noticia.imagem}" />
        </head>
        <body>
          <script>
            window.location.href = "https://matilha-news.vercel.app/noticia/${id}";
          </script>
        </body>
      </html>
    `);
  } catch (err) {
    console.error(err.message);
    res.status(404).send("Notícia não encontrada");
  }
});

app.listen(3000, () => {
  console.log("SSR rodando na porta 3000");
});
