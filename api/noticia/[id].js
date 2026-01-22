import axios from "axios";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const response = await axios.get(
      `https://matilha-api.onrender.com/api/noticias/${id}`
    );

    const noticia = response.data;

    const descricao =
      noticia.resumo ||
      (Array.isArray(noticia.textoCompleto)
        ? noticia.textoCompleto[0]
        : "");

    res.setHeader("Content-Type", "text/html; charset=utf-8");

    res.status(200).send(`
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
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:url" content="https://matilhanews.vercel.app/noticia/${id}" />

          <!-- Twitter -->
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="${noticia.titulo}" />
          <meta name="twitter:description" content="${descricao}" />
          <meta name="twitter:image" content="${noticia.imagem}" />
          <meta name="twitter:image:alt" content="${noticia.titulo}" />

          <style>
            html, body {
              margin: 0;
              padding: 0;
              width: 100%;
              height: 100%;
              background: #000;
            }
          </style>
        </head>
        <body>
          <script>
            setTimeout(() => {
              window.location.replace(
                "https://matilha-news.vercel.app/noticia/${id}"
              );
            }, 120);
          </script>
        </body>
      </html>
    `);
  } catch (error) {
    res.status(404).send("Notícia não encontrada");
  }
}
