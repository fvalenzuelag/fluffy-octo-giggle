# Sampler — demo web + Docker

Aplicación mínima con **interfaz web** y **API** (`GET /api/health`) para enseñar cómo se construye y ejecuta un contenedor.

## Requisitos

- [Docker](https://docs.docker.com/get-docker/) (y opcionalmente Docker Compose)

## Ejecutar con Docker

```bash
cd sampler-app
docker build -t sampler-demo .
docker run --rm -p 3000:3000 sampler-demo
```

Abre el navegador en **http://localhost:3000**.

## Con Docker Compose

```bash
cd sampler-app
docker compose up --build
```

## Sin Docker (desarrollo local)

```bash
cd sampler-app
npm install
npm start
```

## Qué ver en clase

| Elemento | Descripción |
| -------- | ----------- |
| `Dockerfile` | Cómo se copia el código y se expone el puerto `3000`. |
| `server.js` | Servidor Express que sirve `public/` y la API `/api/health`. |
| `public/` | HTML, CSS y JS de la interfaz. |
| `docker-compose.yml` | Orquestación rápida para mapear `3000:3000`. |

La página muestra un flujo **Build → Test → Deploy** y el JSON de salud del servicio para comprobar que el contenedor responde.
