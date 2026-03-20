# GitHub desde cero

Repositorio de apoyo para aprender **DevOps** y **CI/CD** en un proyecto real.

---

## ¿Qué es DevOps?

DevOps es una forma de trabajar que une **desarrollo** (Dev) y **operaciones** (Ops). El objetivo es entregar software de forma más rápida, segura y con menos errores.

### Principios que verás en un proyecto

| Principio | Qué significa en la práctica |
| --------- | ---------------------------- |
| **Automatización** | Las tareas repetitivas (compilar, probar, desplegar) se hacen solas con pipelines. |
| **Integración continua (CI)** | El código se integra y se prueba de forma automática cada vez que alguien hace push. |
| **Entrega/Despliegue continuo (CD)** | Cuando las pruebas pasan, el software puede desplegarse automáticamente a un entorno. |
| **Colaboración** | Dev y Ops usan las mismas herramientas y flujos (repositorio, pipeline, entornos). |
| **Feedback rápido** | Sabes enseguida si algo falla gracias a los pipelines y los tests. |

En un proyecto típico verás: **repositorio de código**, **pipeline CI/CD** (build → test → deploy) y **entorno de ejecución** (servidor, contenedores, etc.).

---

## Configuración del proyecto: .env y .gitignore

Dos archivos muy habituales que debes conocer desde el primer día.

### Uso de archivos .env

Los archivos **.env** guardan **variables de entorno** (claves, URLs de base de datos, puertos, etc.) que cambian según el entorno o la persona, y que **no deben subirse al repositorio** porque pueden contener secretos.

- **.env** — Lo creas tú en tu máquina con los valores reales. **Nunca se sube a Git.**
- **.env.example** — Plantilla con las variables necesarias y valores de ejemplo o vacíos. **Sí se sube al repositorio** para que quien clone el proyecto sepa qué configurar.

**Cómo usarlo:**

1. Copia `.env.example` a `.env`: `cp .env.example .env`
2. Edita `.env` y rellena los valores reales (API keys, contraseñas, IPs, etc.).
3. La aplicación lee las variables desde `.env` en tiempo de ejecución.

En este repositorio tienes un **.env.example** de ejemplo con variables típicas (entorno, base de datos, API keys, JWT, AWS, puerto). Úsalo como referencia para tus proyectos.

### Importancia de .gitignore

El archivo **.gitignore** le dice a Git **qué archivos o carpetas no debe versionar**. Es importante por:

| Motivo | Ejemplo |
| ------ | ------- |
| **Seguridad** | No subir `.env`, claves, certificados (`.pem`, `.key`). |
| **Evitar ruido** | No versionar `node_modules/`, `__pycache__/`, carpetas de build (`dist/`, `build/`). |
| **Entorno** | Cada desarrollador tiene su IDE (`.idea/`, `.vscode/`) y el sistema genera archivos (`.DS_Store`). |
| **Reproducibilidad** | Lo que está en el repositorio debe ser suficiente para construir el proyecto; lo generado se ignora. |

Si no usas `.gitignore`, puedes subir por error secretos o miles de archivos innecesarios. En este repositorio el **.gitignore** incluye entradas habituales: `.env`, dependencias, builds, logs, IDE, cobertura de tests, etc. Revísalo y adáptalo a tu stack (Node, Python, etc.).

---

## Git y GitHub desde consola

Pasos para **importar**, **administrar** y **controlar** un repositorio desde la terminal. Todo se hace con Git en tu máquina; GitHub es el sitio donde se guarda una copia remota.

### Antes de empezar

- **Git** instalado: `git --version`
- **Cuenta en GitHub** y autenticación configurada:
  - **HTTPS:** al hacer `push`/`pull` te pedirá usuario y contraseña (usa un *Personal Access Token* en lugar de la contraseña de la cuenta).
  - **SSH:** genera una clave y añádela en GitHub → Settings → SSH and GPG keys. Luego usa URLs como `git@github.com:usuario/repo.git`.

### 1. Importar un repositorio

#### Opción A — Clonar un repo que ya está en GitHub

```bash
git clone https://github.com/usuario/nombre-repo.git
cd nombre-repo
```

Con SSH:

```bash
git clone git@github.com:usuario/nombre-repo.git
cd nombre-repo
```

#### Opción B — Subir un proyecto local nuevo a GitHub

1. Crea el repositorio en GitHub (web: New repository, sin inicializar con README si ya tienes código local).
2. En la carpeta de tu proyecto:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/usuario/nombre-repo.git
git push -u origin main
```

Sustituye `usuario/nombre-repo` por tu usuario y nombre del repo. Si usas SSH, cambia la URL por `git@github.com:usuario/nombre-repo.git`.

### 2. Administrar el repositorio (remotes y ramas)

| Acción | Comando |
| ------ | ------- |
| Ver remotes | `git remote -v` |
| Añadir otro remoto | `git remote add otroNombre https://github.com/...` |
| Cambiar URL del origin | `git remote set-url origin NUEVA_URL` |
| Ver ramas | `git branch -a` |
| Crear y cambiar a una rama | `git switch -c nombre-rama` |
| Cambiar de rama | `git switch main` |
| Eliminar rama local | `git branch -d nombre-rama` |
| Traer ramas remotas actualizadas | `git fetch origin` |

### 3. Control del flujo de trabajo (diario)

| Acción | Comando |
| ------ | ------- |
| Ver estado (archivos modificados, staged, etc.) | `git status` |
| Añadir archivos al área de preparación | `git add .` o `git add archivo.txt` |
| Hacer commit | `git commit -m "Descripción del cambio"` |
| Enviar commits al remoto | `git push origin main` (o la rama en la que estés) |
| Traer y fusionar cambios del remoto | `git pull origin main` |
| Ver historial de commits | `git log --oneline` |
| Ver diferencias antes de commit | `git diff` |

**Flujo típico:** `git status` → `git add .` → `git commit -m "mensaje"` → `git push`.

### 4. Resolver situaciones habituales

- **Te pide usuario/contraseña:** con HTTPS, usa un *Personal Access Token* (GitHub → Settings → Developer settings → Personal access tokens) como contraseña.
- **"Updates were rejected" (push rechazado):** alguien subió cambios antes. Haz `git pull origin main` (o tu rama), resuelve conflictos si los hay, y luego `git push`.
- **Quieres deshacer el último commit (manteniendo cambios):** `git reset --soft HEAD~1`.
- **Archivo ya en .gitignore pero sigue en Git:** `git rm --cached nombre-archivo` y luego commit.

Con estos pasos puedes **importar** (clonar o subir), **administrar** (remotes, ramas) y **controlar** (add, commit, push, pull) un repositorio desde consola en GitHub.

---

## Demo: aplicación web en Docker (`sampler-app`)

En la carpeta **`sampler-app`** hay una **interfaz web** de ejemplo (HTML/CSS/JS) servida por **Node + Express**, con un endpoint **`GET /api/health`** para comprobar que el contenedor responde. Sirve para enseñar **build de imagen**, **mapeo de puertos** y el flujo **Build → Test → Deploy** en pantalla.

### Cómo ejecutarla (Docker)

```bash
cd sampler-app
docker build -t sampler-demo .
docker run --rm -p 3000:3000 sampler-demo
```

Abre el navegador en `http://localhost:3000`.

Con **Docker Compose**:

```bash
cd sampler-app
docker compose up --build
```

### Sin Docker (solo Node)

```bash
cd sampler-app
npm install
npm start
```

Detalles y tabla de archivos (`Dockerfile`, `server.js`, `public/`) en **`sampler-app/README.md`**.

---

## Partes de un pipeline CI/CD

Casi todos los pipelines siguen estas fases:

1. **Build** — Compilar o empaquetar la aplicación (ej. imagen Docker, artefacto).
2. **Test** — Ejecutar pruebas automáticas (unitarias, integración, etc.).
3. **Deploy** — Llevar la aplicación al entorno correspondiente (desarrollo, staging, producción).

A continuación tienes **el mismo flujo** (build, test, deploy) implementado con tres herramientas distintas.

---

## Ejemplo 1: GitHub Actions

Pipeline que se ejecuta en cada `push`. Hace checkout, construye una imagen Docker, se conecta a ECR y despliega en EC2.

```yaml
name: CI/CD Pipeline
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      - name: Build Docker image
        run: docker build -t myapp:latest .
      - name: Login to ECR and push
        uses: aws-actions/amazon-ecr-login@v2
      - name: Deploy to EC2
        run: ssh ec2-user@${{ secrets.EC2_IP }} "docker run -d myapp:latest"
```

**Dónde lo ves:** archivo `.github/workflows/*.yml` en el repositorio.

---

## Ejemplo 2: Azure DevOps

Pipeline que se dispara en la rama `main`. Usa Node, ejecuta `npm install` y `npm test`, y despliega en una Azure Web App.

```yaml
trigger:
- main
pool:
  vmImage: ubuntu-latest
steps:
- task: NodeTool@0
  inputs:
    versionSpec: '18.x'
- script: |
    npm install
    npm test
  displayName: 'Build and Test'
- task: AzureWebApp@1
  inputs:
    appName: 'myapp-devops'
    package: '$(System.DefaultWorkingDirectory)'
```

**Dónde lo ves:** definido en Azure DevOps (YAML en el repositorio o en la interfaz de Pipelines).

---

## Ejemplo 3: Jenkins

Pipeline declarativo con tres etapas: construir imagen Docker, ejecutar tests dentro del contenedor y desplegar por SSH en EC2.

```groovy
pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'docker build -t myapp:latest .'
      }
    }
    stage('Test') {
      steps {
        sh 'docker run myapp:latest npm test'
      }
    }
    stage('Deploy') {
      steps {
        sshagent(['ec2-credentials']) {
          sh 'ssh ec2-user@IP "docker pull myapp:latest && docker run -d myapp:latest"'
        }
      }
    }
  }
}
```

**Dónde lo ves:** en Jenkins, en un *Pipeline* (Jenkinsfile en el repositorio o definido en la UI).

---

## Resumen para tus alumnos

- **DevOps** en un proyecto = cultura + automatización (repositorio, pipeline, entornos).
- **CI/CD** es la parte automatizada: cada cambio pasa por **Build → Test → Deploy**.
- Las **herramientas** (GitHub Actions, Azure DevOps, Jenkins) hacen lo mismo con distinta sintaxis y entorno.
- En cualquier proyecto, buscar: **dónde está el código**, **dónde está el pipeline** y **a dónde se despliega**.
- Usar **.env.example** como plantilla y **nunca** subir `.env`; revisar **.gitignore** para no versionar secretos ni archivos generados.
- Para **importar, administrar y controlar** el repo desde consola: ver la sección **Git y GitHub desde consola** (clonar, subir proyecto nuevo, remotes, ramas, add/commit/push/pull).
- La carpeta **`sampler-app`** contiene una **demo web en Docker** (interfaz + API) para mostrar en clase cómo se construye y ejecuta un contenedor.

Los ejemplos completos están en la carpeta **Ejemplos CICD**. La plantilla de variables de entorno está en **.env.example** y la lista de exclusiones de Git en **.gitignore**.
