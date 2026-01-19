# FUNINTEC - Sitio Web

## Estructura del Proyecto

Este proyecto utiliza **SCSS** para los estilos, que se compilan a CSS para producción.

## Instalación

1. Instalar las dependencias:
```bash
npm install
```

## Compilación de Estilos

### Compilar SCSS a CSS (una vez)
```bash
npm run build-css
```

### Compilar y observar cambios (modo desarrollo)
```bash
npm run watch-css
```

Este comando observa los cambios en `styles/main.scss` y compila automáticamente a `styles/main.css`.

### Build completo
```bash
npm run build
```

## Estructura de Archivos

- `styles/main.scss` - Archivo fuente SCSS (edita este archivo)
- `styles/main.css` - Archivo CSS compilado (generado automáticamente, no editar directamente)
- `styles/main.css.map` - Source map para debugging (generado automáticamente)

## Notas Importantes

- **Siempre edita `main.scss`**, nunca edites `main.css` directamente ya que se sobrescribirá al compilar.
- Antes de hacer deploy, ejecuta `npm run build-css` para generar el CSS actualizado.
- El archivo `main.css` debe estar incluido en el repositorio para que funcione en producción.

## Para Producción

Antes de subir cambios a la página oficial:

1. Asegúrate de tener los cambios en `styles/main.scss`
2. Ejecuta `npm run build-css` para compilar
3. Sube tanto `main.scss` como `main.css` al servidor

