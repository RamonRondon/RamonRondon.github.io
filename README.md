# Portafolio Personal — Ramón Rondón

Bienvenido al repositorio de mi portafolio personal, disponible públicamente en **[ramonrondon.com](https://ramonrondon.com)**. 

Este sitio destaca mi trayectoria profesional como matemático y empresario, y está diseñado bajo una estética editorial premium inspirada en el sistema de diseño de Mastercard (detallado en `DESIGN.md`).

## 🚀 Tecnologías y Herramientas

- **Constructor**: [Vite](https://vite.dev/) (HTML, CSS y Javascript Vanilla).
- **Gestor de Paquetes**: [pnpm](https://pnpm.io/).
- **Estilos**: Vanilla CSS puro, sin frameworks externos, logrando un control completo y máxima velocidad de carga.
- **Despliegue**: Integración continua con [GitHub Actions](https://github.com/features/actions) para compilación automática y publicación directa en GitHub Pages.

---

## 📁 Estructura del Proyecto

```text
RamonRondon.github.io/
├── .github/workflows/deploy.yml   # CI/CD de GitHub Pages
├── openspec/                     # Especificaciones técnicas de diseño y tareas (OpenSpec)
├── public/                       # Archivos públicos estáticos de Vite
│   └── favicon.ico
├── src/
│   ├── assets/                   # Recursos compilados por Vite (imágenes, logos)
│   │   ├── logo_1.png
│   │   ├── logo_2.png
│   │   ├── profile.jpeg          # Foto estilo Studio Ghibli
│   │   └── crop_conexion_educativa.png
│   ├── main.js                   # Lógica y animaciones
│   └── style.css                 # Tokens de diseño y hojas de estilos globales
├── CNAME                         # Dominio personalizado (ramonrondon.com)
├── DESIGN.md                     # Directivas del sistema de diseño (Mastercard inspired)
├── index.html                    # Estructura HTML principal
├── package.json                  # Scripts y dependencias de npm
├── vite.config.js                # Configuración de compilación de Vite
└── pnpm-lock.yaml                # Lockfile de dependencias
```

> [!NOTE]
> **Ubicación de los Assets**: Todos los logos e imágenes se encuentran dentro de `src/assets/`. Esto permite a Vite procesar las imágenes, optimizar su peso y añadirles un hash único de caché (por ejemplo, `logo_1-DfxZ5AKM.png`) al compilar el proyecto a la carpeta `/dist/`, evitando errores 404 de recursos no encontrados.

---

## 🛠️ Desarrollo Local

Para correr, editar y previsualizar el sitio localmente:

1. **Instalar Dependencias**:
   ```bash
   pnpm install
   ```

2. **Aprobar Scripts de Compilación** (Requerido por pnpm para la compilación de `esbuild`):
   ```bash
   pnpm approve-builds --all
   ```

3. **Iniciar Servidor de Desarrollo**:
   ```bash
   pnpm dev
   ```
   Abre [http://localhost:5173](http://localhost:5173) en tu navegador para ver los cambios en tiempo real.

4. **Compilar para Producción**:
   ```bash
   pnpm build
   ```
   Esto compilará el proyecto en la carpeta `/dist/` con código minimizado y optimizado.

---

## 🌐 Despliegue Automático

El portafolio se despliega automáticamente en **https://ramonrondon.com** cada vez que haces `push` a la rama `main`:
1. El workflow de GitHub Actions se dispara.
2. Compila la aplicación con Node 22 y `pnpm build`.
3. Sube la carpeta `/dist/` resultante.
4. GitHub Pages sirve el contenido compilado directamente en tu dominio.

---

## 🎨 Principios de Diseño
- **Fondo Canvas Cream (`#F3F0EE`)**: Una superficie cálida y editorial que reemplaza al blanco frío.
- **Rigor Tipográfico**: Fuente Sofia Sans con pesos 450 (lectura suave de párrafos) y 500 (negritas y títulos con letter-spacing de `-2%`).
- **Máscaras Circulares**: Las imágenes principales se recortan en círculos perfectos con botones satélite `→` o `↗` acoplados.
- **Líneas Orbitales**: Un trazo orbital animado conecta visualmente tus facetas para guiar al usuario por la narrativa.
