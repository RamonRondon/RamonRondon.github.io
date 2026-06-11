# Mi Portfolio Personal

Bienvenido a mi portfolio personal hosteado en GitHub Pages.

## 📋 Descripción

Este es un sitio estático hosteado en GitHub Pages. La aplicación es completamente clientside, sin backend.

## 🚀 Configuración

### Estructura del Proyecto

La estructura básica de tu proyecto debe ser:

```
RamonRondon.github.io/
├── index.html          # Página principal
├── css/
│   └── style.css       # Estilos
├── js/
│   └── script.js       # Scripts
├── assets/             # Imágenes, iconos, etc.
├── README.md           # Este archivo
└── .gitignore          # Archivos a ignorar
```

### Requisitos

- **HTML**: Archivo `index.html` en la raíz del repositorio
- **CSS**: Opcional, puedes usar estilos inline o un framework
- **JavaScript**: Opcional, para interactividad clientside
- **Assets**: Imágenes, fuentes, iconos, etc.

### Deployment Automático

GitHub Pages deployará automáticamente tu sitio cuando hagas push a la rama `main`. No requiere configuración adicional.

Tu sitio estará disponible en: `https://RamonRondon.github.io`

## 🛠️ Desarrollo Local

Para probar tu sitio localmente antes de hacer push:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/RamonRondon/RamonRondon.github.io.git
   cd RamonRondon.github.io
   ```

2. Abre `index.html` en tu navegador o usa un servidor local:
   ```bash
   # Con Python 3
   python -m http.server 8000
   
   # O con Node.js (http-server)
   npx http-server
   ```

3. Visita `http://localhost:8000`

## 📝 Notas Importantes

- El sitio es **completamente estático**, todo corre en el cliente (navegador)
- No hay backend ni base de datos
- Los cambios se reflejan automáticamente al hacer push a `main`
- Puede tomar unos segundos en actualizar después del push

## 📚 Recursos Útiles

- [GitHub Pages Documentation](https://pages.github.com/)
- [HTML Basics](https://developer.mozilla.org/en-US/docs/Learn/HTML)
- [CSS Basics](https://developer.mozilla.org/en-US/docs/Learn/CSS)
- [JavaScript Basics](https://developer.mozilla.org/en-US/docs/Learn/JavaScript)

---

¡Happy coding! 🎉
