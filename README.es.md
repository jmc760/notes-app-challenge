# Aplicación de Notas de Juan Manuel Cerdeira

**[English version of this README: README.md]**

Este proyecto presenta una aplicación full-stack diseñada para gestionar notas, demostrando dominio en tecnologías modernas de desarrollo web. Incluye un frontend basado en React, un backend en Spring Boot, una base de datos MySQL y phpMyAdmin para la gestión de la base de datos, todo orquestado usando Docker Compose.

## Características

* **Gestión de Notas (Fase 1):**
  * Crear nuevas notas.
  * Ver notas activas.
  * Ver notas archivadas.
  * Editar notas existentes.
  * Archivar y desarchivar notas.
  * Eliminar notas.

* **Gestión de Categorías/Etiquetas (Fase 2 - *Desarrollo Futuro*):**
    Esta característica está planificada para un desarrollo futuro y puede ser completada con gusto si los evaluadores lo solicitan. Incluiría:
  * Crear y gestionar categorías/etiquetas.
  * Asignar categorías a las notas.
  * Filtrar notas por categoría.

## Arquitectura

La aplicación sigue una arquitectura estándar tipo microservicios, con componentes distintos que se comunican a través de APIs REST:

* **Frontend:** Construido con React, servido por Nginx.
* **Backend:** Desarrollado usando Spring Boot (Java) para los endpoints de la API REST.
* **Base de Datos:** MySQL para el almacenamiento de datos persistente.
* **Gestión de Base de Datos:** phpMyAdmin para una interfaz web de la base de datos MySQL.
* **Orquestación:** Docker Compose para gestionar y ejecutar todos los servicios en contenedores aislados.

## Prerrequisitos

Asegúrate de tener lo siguiente instalado en tu sistema:

* **Git:** Para clonar el repositorio.
* **Docker Desktop** (o Docker Engine y Docker Compose CLI):
  * **Docker Engine:** Versión `20.10.0` o superior (ej. `20.10.25`).
  * **Docker Compose:** Versión `v2.0.0` o superior (ej. `v2.24.5`).

## Tiempos de Ejecución, Motores, Herramientas y Versiones Concretas

Las siguientes herramientas y tiempos de ejecución se utilizan dentro de los contenedores Docker:

* **Java Development Kit (JDK):** `OpenJDK 21` (utilizado en el Dockerfile del backend).
* **Maven:** Versión `3.9.11` (utilizado a través de Maven Wrapper, especificado en `.mvn/wrapper/maven-wrapper.properties`).
* **Spring Boot:** Versión `3.3.1` (**Actualizado a 3.3.1 para estabilidad** - especificado en `pom.xml`).
* **Base de Datos MySQL:** Versión `8.0` (utilizada en `docker-compose.yml`).
* **phpMyAdmin:** `latest` (utilizada en `docker-compose.yml`).
* **Node.js:** Versión `22-alpine` (utilizada en el Dockerfile del frontend).
* **npm:** Versión `10.9.2` (viene con Node.js 22, utilizada para la gestión de dependencias).
* **React:** Versión `19.1.0` (especificada en `frontend/package.json`).
* **Vite:** Versión `7.0.4` (especificada en `frontend/package.json`, utilizada para la construcción de React).
* **TypeScript:** Versión `5.8.3` (especificada en `frontend/package.json`, utilizada para la verificación y compilación de tipos).
* **ESLint:** Versión `9.30.1` (especificada en `frontend/package.json`, utilizada para el linting de código).
* **React Router DOM:** Versión `7.7.1` (especificada en `frontend/package.json`, utilizada para el enrutamiento del lado del cliente).
* **Nginx:** Imagen `alpine` (utilizada en el Dockerfile del frontend para servir la aplicación React).

## Cómo Ejecutar la Aplicación

Sigue estos pasos para poner la aplicación en funcionamiento:

1. **Clona el repositorio:**

    ```bash
    git clone [https://github.com/hirelens-challenges/Cerdeira-eb9bc4.git](https://github.com/hirelens-challenges/Cerdeira-eb9bc4.git)
    ```

2. **Navega al directorio raíz del proyecto:**

    ```bash
    cd Cerdeira-eb9bc4
    ```

3. **Otorga permisos de ejecución al script de inicio:**

    ```bash
    chmod +x run.sh
    ```

    *Este paso es necesario solo una vez después de clonar el repositorio.*

4. **Inicia la aplicación:**

    ```bash
    ./run.sh
    ```

    Este comando construirá las imágenes de Docker (si es necesario) y levantará todos los servicios definidos en `docker-compose.yml` en modo "detached" (segundo plano), **esperando a que estén saludables** antes de completarse.

    **Nota Importante para la Primera Ejecución:**
    La primera vez que ejecutes `./run.sh`, el proceso puede tardar varios minutos (normalmente de 5 a 15 minutos, dependiendo de tu conexión a internet y las especificaciones de tu máquina). Esto se debe a que Docker necesita descargar imágenes base, instalar dependencias del proyecto (Node.js y Maven) y construir las aplicaciones desde cero. Las ejecuciones posteriores serán significativamente más rápidas debido a la caché de construcción de Docker.

## Acceso a la Aplicación

Una vez que los contenedores estén en funcionamiento, puedes acceder a las diferentes partes de la aplicación:

* **Frontend (Aplicación React):** `http://localhost`
  * Aquí es donde interactuarás con la aplicación de Notas.
* **API del Backend (Spring Boot):** `http://localhost:8080/api`
  * La URL base para todos tus endpoints de la API REST del backend. (ej. `http://localhost:8080/api/notes`).
* **phpMyAdmin:** `http://localhost:8081`
  * **Credenciales por Defecto:**
    * **Usuario:** `root`
    * **Contraseña:** `root_password`
    * (Alternativamente, puedes usar `user` / `password` para la base de datos `notes_app_db`).

## Cómo Detener la Aplicación

Para detener y eliminar todos los contenedores, redes y volúmenes creados por Docker Compose, ejecuta el siguiente comando desde el directorio raíz del proyecto:

```bash
docker compose down -v
