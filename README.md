# HabitTrack - Frontend

Este es el frontend de la aplicación web **HabitTrack**. La interfaz ha sido desarrollada para ser moderna, rápida, responsiva y ofrecer la mejor experiencia de usuario en el seguimiento y análisis de sus hábitos.

## 🛠️ Tecnologías y Herramientas

- **Framework Principal:** Angular 19.2
- **Lenguaje:** TypeScript / HTML / CSS
- **Estilos y UI:** Bootstrap 5.3 y Bootstrap Icons
- **Server Side Rendering (SSR):** Angular SSR (`@angular/ssr`) está en uso para mejorar el rendimiento inicial y el SEO.
- **Herramientas Reactivas:** RxJS
- **Gestión de Paquetes:** npm

## 🚀 Requisitos Previos

Para ejecutar y seguir desarrollando este proyecto, necesitas disponer de:

- **Node.js** (versión recomendada 18.x o superior)
- **npm** (viene incorporado por defecto al instalar Node.js)
- **Angular CLI** instalado globalmente (`npm install -g @angular/cli`)

## 📦 Instalación

Abre tu consola de comandos (terminal), ubícate en la carpeta raíz del proyecto frontend (`HabitTrackFront`) e instala las dependencias:

```bash
npm install
```

## 🏃 Servidor de Desarrollo Local

Para lanzar la aplicación web en tu entorno de desarrollo y poder ver los cambios en directo:

```bash
ng serve
```

Una vez finalizada la compilación, abre tu navegador de preferencia y ve a `http://localhost:4200/`. 
La aplicación aprovechará la recarga automática (Live Reloading) cada vez que realices cambios físicos en los archivos fuente para mostrarlos de forma inmediata.

## 🏗️ Arquitectura y Estructuración

- **Componentación:** El código se encuentra muy estructurado en componentes que promueven la mantenibilidad (ejemplo: un `ChatbotComponent` dedicado bajo `src/app/shared/components/chatbot`).
- **Layouts y Vistas Diferenciadas:** Se separan de manera clara las vistas que no demandan menú lateral o un layout de navegación, como las páginas de *Sign-In* o de *Create Account*.
- **Integración Backend:** Todos los flujos se comunican en tiempo real mediante el módulo `HttpClient` de Angular con la API Rest de nuestro entorno `HabitTrackBack` (Spring).
- **Asistente Inteligente:** Se implementa un Chat Inteligente conectado a los modelos de Gemini de Google para brindar soporte o ayuda dentro de la web.

## 🔨 Scaffolding (Generación Rápida)

Angular CLI contiene comandos que te van a ahorrar tiempo desarrollando componentes o módulos:

```bash
# Para crear un nuevo componente:
ng generate component mi-nuevo-componente

# Para crear un servicio:
ng generate service mi-nuevo-servicio
```

## 🚀 Construcción para Producción

Para compilar el proyecto de cara a un servidor o entorno de producción, utiliza:

```bash
ng build
```

Angular creará todos los bundles y archivos dentro de una carpeta llamada `dist/`. La app ya se encuentra optimizada para la carga en servidores. Si deseas aprovechar el *Server Side Rendering (SSR)*, tendrás que iniciar el servicio Express/Node generado en dicha ruta.
