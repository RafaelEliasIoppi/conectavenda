// netlify/functions/pixel.js

import { writeFileSync, readFileSync } from "fs";
import path from "path";

export async function handler(event) {
  // Pega a hora e o IP do visitante
  const visit = {
    timestamp: new Date().toISOString(),
    ip: event.headers['x-forwarded-for'] || 'unknown',
    userAgent: event.headers['user-agent'] || 'unknown',
    page: event.queryStringParameters.page || 'unknown'
  };

  // Caminho do arquivo JSON (vai salvar na pasta tmp, depois você pode mover)
  const filePath = path.join('/tmp', 'visitas.json');

  let visitas = [];
  try {
    visitas = JSON.parse(readFileSync(filePath, 'utf8'));
  } catch (e) {
    // arquivo não existe ainda
  }

  visitas.push(visit);

  // Salva novamente
  writeFileSync(filePath, JSON.stringify(visitas, null, 2));

  // Retorna uma imagem 1x1 transparente
  const pixel = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAr8B9f7F61AAAAAASUVORK5CYII=",
    "base64"
  );

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "no-cache, no-store, must-revalidate"
    },
    body: pixel.toString("base64"),
    isBase64Encoded: true
  };
}
