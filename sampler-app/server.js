/**
 * Servidor Express mínimo: sirve la interfaz y un endpoint /api/health para demos Docker/CI.
 */
const express = require("express");
const path = require("path");

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const startTime = Date.now();

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "sampler-devops-demo",
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor((Date.now() - startTime) / 1000),
    node: process.version,
    env: process.env.NODE_ENV || "development",
  });
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Sampler demo listening on http://0.0.0.0:${PORT}`);
});
