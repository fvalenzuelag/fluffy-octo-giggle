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

Los ejemplos completos están en la carpeta **Ejemplos CICD**. La plantilla de variables de entorno está en **.env.example** y la lista de exclusiones de Git en **.gitignore**.
