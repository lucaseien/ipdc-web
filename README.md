# ipdc-web

Sitio web del **Instituto Paraguayo de Derecho Constitucional (IPDC)**: [ipdc.org.py](https://ipdc.org.py).

Reemplaza al sitio anterior (WordPress + Elementor, 2021). Es un sitio estático hecho con [Astro](https://astro.build) y [Tailwind CSS](https://tailwindcss.com). Todo el contenido vive en archivos Markdown/MDX y YAML dentro del repositorio, y el sitio se publica en [Netlify](https://www.netlify.com).

---

## Índice

- [Requisitos](#requisitos)
- [Puesta en marcha](#puesta-en-marcha)
- [Comandos](#comandos)
- [Estructura del repositorio](#estructura-del-repositorio)
- [Agregar y editar contenido](#agregar-y-editar-contenido)
  - [Publicar una entrada de blog](#publicar-una-entrada-de-blog)
  - [Agregar un evento](#agregar-un-evento)
  - [Agregar una edición del Anuario](#agregar-una-edición-del-anuario)
  - [Agregar o actualizar un documento](#agregar-o-actualizar-un-documento)
  - [Autoridades, miembros y fotos](#autoridades-miembros-y-fotos)
  - [Textos institucionales](#textos-institucionales)
  - [Menú](#menú)
- [Archivos, imágenes y PDFs](#archivos-imágenes-y-pdfs)
- [Configuración del sitio](#configuración-del-sitio)
- [Sistema de diseño](#sistema-de-diseño)
- [Idiomas](#idiomas)
- [Deploy en Netlify](#deploy-en-netlify)
- [Redirecciones desde el sitio anterior](#redirecciones-desde-el-sitio-anterior)
- [Calidad: accesibilidad, SEO y rendimiento](#calidad-accesibilidad-seo-y-rendimiento)
- [Documentación del proyecto](#documentación-del-proyecto)
- [Pendientes del cliente](#pendientes-del-cliente)

---

## Requisitos

- **Node.js 22.12 o superior.** Astro 7 lo exige. El repo incluye `.nvmrc`: con [nvm](https://github.com/nvm-sh/nvm), `nvm use` selecciona la versión correcta.
- **npm 9.6.5 o superior** (viene con Node).
- Git.

No hace falta base de datos, PHP ni ningún servicio externo.

## Puesta en marcha

```bash
git clone https://github.com/renzoeientech/ipdc-web.git
cd ipdc-web
nvm use          # opcional, si usás nvm
npm install
npm run dev
```

Abrí la URL que muestra la terminal, normalmente <http://localhost:4321/es/>. La raíz `/` redirige a `/es/`.

> **Si ves errores 404 o 500 en desarrollo después de agregar archivos de contenido o cambiar `src/content.config.ts`:** cortá el servidor (Ctrl+C) y volvé a correr `npm run dev`. El servidor de desarrollo no siempre detecta colecciones nuevas.
>
> Astro 7 permite **un solo** servidor por proyecto. Si al iniciar dice *"already running at http://localhost:XXXX"*, ya hay uno abierto: usá esa URL o cerralo con `npx astro dev stop` / `npx astro preview stop`.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm install` | Instala las dependencias. |
| `npm run dev` | Servidor de desarrollo con recarga en vivo. |
| `npm run build` | Genera el sitio estático en `dist/`: optimiza imágenes, calcula peso y páginas de los PDFs y genera sitemap, RSS y redirecciones. |
| `npm run preview` | Sirve `dist/` en local para revisar el build final. Hay que correr `npm run build` antes. |
| `npm run check` | Verifica tipos y errores en archivos `.astro` y en el contenido. **Correlo antes de cada commit.** |
| `npm run check:redirects` | Verifica que todas las URLs del sitio anterior tengan destino. Hay que correr `npm run build` antes. |

## Estructura del repositorio

```
ipdc-web/
├─ astro.config.mjs          Dominio, idiomas, sitemap, Tailwind, integración de redirecciones
├─ netlify.toml              Build, versión de Node y headers (caché y seguridad)
├─ src/
│  ├─ content/               ← TODO EL CONTENIDO EDITABLE
│  │  ├─ blog/es/            Entradas del blog (.md)
│  │  ├─ eventos/es/         Eventos (.mdx)
│  │  ├─ paginas/es/         Textos institucionales (.mdx)
│  │  ├─ personas.yaml       Autoridades y miembros
│  │  ├─ comisiones.yaml     Comisiones Directivas
│  │  ├─ anuarios.yaml       Ediciones del Anuario
│  │  └─ documentos.yaml     Constituciones y documentos descargables
│  ├─ content.config.ts      Campos permitidos y obligatorios de cada tipo de contenido
│  ├─ assets/                Imágenes que Astro optimiza (fotos, retratos, logos)
│  ├─ components/            Componentes de interfaz
│  ├─ config/site.ts         Email, redes, Mailchimp
│  ├─ i18n/                  Textos de interfaz (ui.ts) y menú (nav.ts)
│  ├─ integrations/          Generador de public/_redirects para Netlify
│  ├─ layouts/               Estructura común (<head>, SEO, header, footer)
│  ├─ lib/                   Utilidades (lectura de contenido, fechas, PDFs)
│  ├─ pages/                 Rutas: cada archivo es una URL
│  └─ styles/global.css      Colores, tipografía y estilos base
├─ public/                   Se publica tal cual: PDFs, favicons, imagen para redes
│  └─ wp-content/uploads/    PDFs e imágenes del sitio anterior, con las mismas URLs
├─ scripts/                  Verificación de redirecciones y script de migración (histórico)
├─ migration/                Texto original del sitio anterior (archivo, no se publica)
├─ CONTENT_INVENTORY.md      Inventario del sitio anterior
└─ ARCHITECTURE.md           Arquitectura, sitemap y decisiones
```

---

## Agregar y editar contenido

Todo se hace editando archivos de texto, desde un editor local o directamente en GitHub (abrir el archivo → ícono de lápiz → *Commit changes*). **Cada commit a `main` publica el sitio automáticamente** en uno o dos minutos.

Si un archivo tiene un error (por ejemplo, falta un campo obligatorio o una fecha está mal escrita), el build falla, Netlify **mantiene la versión anterior en línea** y el log indica el archivo y el campo. Para probar antes de publicar, trabajá en una rama y abrí un *pull request*: Netlify genera una vista previa con URL propia.

Los datos del encabezado de cada archivo (entre las líneas `---`) se llaman *frontmatter* y usan el formato YAML:
- Si un texto contiene `:` o empieza con comillas, encerralo entre comillas dobles: `title: "Congreso: día 1"`.
- Las fechas van como `AAAA-MM-DD`.

### Publicar una entrada de blog

1. Creá un archivo en `src/content/blog/es/`. **El nombre del archivo es la URL**: `mi-articulo.md` se publica en `/es/blog/mi-articulo/`. Usá minúsculas, sin acentos ni espacios, con guiones.
2. Copiá esta plantilla:

```markdown
---
title: "Título del artículo"
description: "Resumen de una o dos oraciones (hasta 160 caracteres). Aparece en Google, en redes y en el listado."
date: 2026-10-01
category: opinion              # opinion  |  noticias-y-eventos
authors: ["Nombre Apellido"]   # uno o varios; [] si no tiene firma
authorPhoto: ../../../assets/autores/nombre-apellido.jpg   # opcional
draft: false                   # true = no se publica todavía
---

Primer párrafo del artículo.

## Un subtítulo

Texto con **negrita**, _cursiva_ y [un enlace](https://ejemplo.com).

> Una cita destacada.

![Descripción de la imagen para personas que no la ven](../../../assets/blog/mi-imagen.jpg)

Texto con una nota al pie.[^1]

[^1]: Texto de la nota al pie.
```

- **Imágenes:** copialas en `src/assets/blog/` y enlazalas con la ruta relativa como en el ejemplo. La descripción entre corchetes es obligatoria para accesibilidad.
- **Foto del autor:** va en `src/assets/autores/`. Conviene cuadrada y centrada en la cara.
- **Descargo de responsabilidad:** se agrega solo al pie de cada entrada.
- **Categorías:** en `src/lib/content.ts` (`categories`). Si agregás una, sumala también al `enum` de `category` en `src/content.config.ts`.

### Agregar un evento

1. Creá `src/content/eventos/es/nombre-del-evento.mdx`. Se publica en `/es/eventos/nombre-del-evento/`.
2. Plantilla, con todos los campos opcionales indicados:

```markdown
---
title: "II Congreso Paraguayo de Derecho Constitucional"
description: "Resumen breve para buscadores y redes (hasta 200 caracteres)."
startDate: 2026-11-20
endDate: 2026-11-21                 # opcional
location: Asunción                  # opcional
address: "Dirección exacta"         # opcional
modality: Presencial                # opcional
registrationUrl: https://forms.gle/…   # opcional; el botón se oculta cuando el evento terminó
cover: ../../../assets/eventos/placa.jpg       # opcional
coverAlt: "Descripción de la imagen"
videos:                             # opcional
  - youtubeId: eUGaK0uTATo          # lo que va después de watch?v= en la URL de YouTube
    title: Resumen del evento
partners:                           # opcional; se agrupan por "group"
  - { group: "Organizadores", name: "Instituto Paraguayo de Derecho Constitucional", logo: ../../../assets/brand/logo-ipdc.svg, url: "https://ipdc.org.py/" }
---

Descripción del evento en Markdown.
```

El sitio separa solo los **próximos eventos** de los **anteriores** según la fecha (`endDate`, o `startDate` si no hay fin). La home muestra los próximos; si no hay ninguno, muestra el último realizado. Para anunciar una actividad sin página propia, también se puede publicar una entrada de blog en la categoría `noticias-y-eventos`.

### Agregar una edición del Anuario

1. Subí el PDF del índice a `public/documentos/` (comprimilo antes, ver [PDFs](#archivos-imágenes-y-pdfs)).
2. Agregá un bloque **al principio** de `src/content/anuarios.yaml`:

```yaml
- id: "2025"
  year: 2025
  title: Anuario 2025
  indexPdf: /documentos/indice-anuario-2025.pdf
```

El peso y la cantidad de páginas se calculan solos.

### Agregar o actualizar un documento

En `src/content/documentos.yaml`:

```yaml
- id: reglamento-1813          # identificador único
  group: historicas            # constitucion-1992  |  historicas
  order: 5                     # orden dentro del grupo
  year: 1813                   # opcional
  title: Reglamento de Gobierno de 1813
  lang: es                     # es | gn | en
  file: /documentos/reglamento-1813.pdf   # archivo en public/ …
  # url: https://…                        # … o un enlace externo (no ambos)
```

Sin `file` ni `url`, la tarjeta se muestra como *"Documento no disponible temporalmente"*. Así está hoy el Reglamento de 1813: cuando llegue el PDF, subilo a `public/documentos/` y agregá la línea `file:`.

### Autoridades, miembros y fotos

**Personas:** `src/content/personas.yaml`. Cada persona se carga **una sola vez** y se usa tanto en Miembros como en Autoridades.

```yaml
- id: nombre-apellido            # único; se usa en comisiones.yaml
  name: Nombre Apellido          # como se muestra en la tarjeta
  listName: Apellido, Nombre     # define el orden alfabético
  photo: nombre-apellido.jpg     # opcional
  member: true                   # false si no integra la lista de miembros
  memoriam: false                # true → sección "In Memoriam"
```

**Fotos:**
1. Copiá la foto a `src/assets/personas/`, por ejemplo `nombre-apellido.jpg`.
2. Agregá `photo: nombre-apellido.jpg` a la persona.
3. Recomendado: retrato vertical 4:5 o cuadrado, centrado en la cara, de al menos 600 px de ancho, JPG o WebP y fondo homogéneo entre todas las fotos. Sin foto, la tarjeta muestra las iniciales.

**Comisión Directiva:** `src/content/comisiones.yaml`. Para una nueva comisión, agregá un bloque arriba con `current: true` y sacale `current: true` a la anterior, que pasa sola a *"Comisiones anteriores"*.

```yaml
- id: "2028-2031"
  period: "2028-2031"
  current: true
  members:
    - { persona: nombre-apellido, role: Presidente }
```

### Textos institucionales

Están en `src/content/paginas/es/`, un archivo por texto. Se editan como Markdown; los campos `title`, `description` (para buscadores) y `lead` (bajada debajo del título) están en el encabezado.

| Archivo | Dónde aparece |
|---|---|
| `inicio.mdx` | Inicio: título, bajada y texto de presentación |
| `quienes-somos.mdx` | El Instituto → Quiénes somos (incluye la Reseña histórica) |
| `que-hacemos.mdx` | Qué hacemos. Cada área es un bloque `<Accordion title="…">…</Accordion>` |
| `autoridades.mdx`, `miembros.mdx`, `requisitos-miembro.mdx` | Autoridades y Miembros |
| `publicaciones.mdx`, `publicaciones-compra.mdx` | Publicaciones |
| `constitucion-1992.mdx`, `constituciones-historicas.mdx` | Constitución |
| `blog.mdx`, `blog-descargo.mdx`, `blog-colaborar.mdx` | Introducción, descargo y texto para colaborar del blog |
| `eventos.mdx`, `contacto.mdx` | Título y descripción de esas páginas |

### Menú

Se edita en `src/i18n/nav.ts`. El footer toma los mismos enlaces.

---

## Archivos, imágenes y PDFs

**PDFs y descargables:** van en `public/`. Los del sitio anterior siguen en `public/wp-content/uploads/…`, con la **misma URL que tenían**, para no romper enlaces externos ni el posicionamiento en Google. **Para archivos nuevos usá `public/documentos/`.**
- No hace falta anotar el peso ni las páginas: se calculan solos.
- Comprimí los PDFs pesados antes de subirlos. Con [Ghostscript](https://www.ghostscript.com):
  ```bash
  gs -sDEVICE=pdfwrite -dPDFSETTINGS=/ebook -dNOPAUSE -dBATCH -dQUIET -sOutputFile=salida.pdf entrada.pdf
  ```

**Imágenes:** van en `src/assets/`, no en `public/`, porque así Astro las convierte a WebP, genera varios tamaños y las carga de forma diferida.
- Toda imagen con información necesita texto alternativo. Las decorativas llevan `alt=""`.
- Formatos: JPG, PNG, WebP o SVG. **No uses HEIC** (fotos de iPhone): la mayoría de los navegadores no lo muestra.
- Tamaño máximo recomendado: 2560 px de ancho.

| Carpeta | Contenido |
|---|---|
| `src/assets/fotos/` | Fotos de cabecera (monumentos de Asunción) |
| `src/assets/personas/` | Retratos de autoridades y miembros |
| `src/assets/autores/` | Fotos de autores del blog |
| `src/assets/blog/`, `src/assets/eventos/`, `src/assets/publicaciones/` | Imágenes de cada sección |
| `src/assets/brand/` | Logo en SVG |

## Configuración del sitio

Los datos institucionales están en **`src/config/site.ts`**: nombre, email (`ipdc.py@gmail.com`), ubicación y redes (Facebook, X, YouTube).

**Newsletter (Mailchimp):** el formulario está desactivado hasta completar `mailchimpAction` con la URL del formulario embebido. Se obtiene en Mailchimp → *Audience* → *Signup forms* → *Embedded forms*: es el atributo `action="https://….list-manage.com/subscribe/post?u=…&id=…"` del código. Con ese valor, el formulario se activa solo en el footer y en Contacto.

## Sistema de diseño

La referencia visual es la **guía de estilo** en `/es/guia-de-estilo/` (`src/pages/es/guia-de-estilo.astro`). Es interna: tiene `noindex`, no aparece en el sitemap y está excluida en `robots.txt`.

**Tokens** (en `src/styles/global.css`, bloque `@theme`). Se usan como clases de Tailwind, p. ej. `text-azul-700` o `bg-papel`:

| Token | Valor | Uso |
|---|---|---|
| `azul-700` | `#193389` | Azul del logo: enlaces, botones |
| `azul-900` / `azul-950` | `#10204F` / `#0C1636` | Títulos / footer y fondos oscuros |
| `rojo-600` | `#C71B2E` | Rojo del logo: solo acentos (filetes, viñetas) |
| `rojo-700` | `#A8172A` | Rótulos pequeños |
| `papel` / `tinta` | `#FAF8F4` / `#1C1E26` | Fondo y texto principal |
| `font-serif` | Newsreader | Títulos |
| `font-sans` | Source Sans 3 | Texto |

Todas las combinaciones de texto cumplen **WCAG 2.1 AA**. Si agregás un color, verificá su contraste antes de usarlo para texto.

**Clases propias:** `container-page` (ancho de página), `label` (rótulo en versalitas), `filete` (línea bicolor), `prose-ipdc` (texto largo).

**Componentes** (`src/components/`): `Header`, `Footer`, `Logo`, `PageHeader`, `SectionHeading`, `Breadcrumbs`, `Button`, `Icon`, `DocumentCard`, `PersonCard`, `PostCard`, `EventCard`, `BlogIndex`, `Pagination`, `Accordion`, `Callout`, `Newsletter`, `YouTube` (carga el reproductor solo al hacer clic) y `OrganizationSchema`.

**Logo:** `src/assets/brand/logo-ipdc.svg` es un redibujo vectorial del PNG original. Si aparece el archivo oficial, reemplazalo junto con `public/favicon.svg`, `public/logo-ipdc.png` y los PNG de favicon.

## Idiomas

- Rutas con prefijo: `/es/…` (por defecto) y `/en/…`, configuradas en `astro.config.mjs`.
- **Por ahora solo existe español.** No se genera ninguna página `/en/` y el selector de idioma se oculta solo.
- Para agregar el inglés:
  1. Completar `ui.en` (`src/i18n/ui.ts`) y `mainNav.en` (`src/i18n/nav.ts`).
  2. Crear el contenido en carpetas `en/` (`src/content/blog/en/`, `paginas/en/`, …).
  3. Crear las páginas en `src/pages/en/`.
  4. Pasar `alternates={{ es: '/es/…', en: '/en/…' }}` a `BaseLayout` en cada página traducida. Así aparece el selector y se generan las etiquetas `hreflang`.

## Deploy en Netlify

La configuración está en `netlify.toml`: comando `npm run build`, carpeta `dist`, Node 22 y headers de caché y de seguridad.

**Primera vez:**
1. En Netlify: *Add new site* → *Import an existing project* → GitHub → `renzoeientech/ipdc-web`.
2. Netlify toma la configuración de `netlify.toml`; no hay que cambiar nada en la pantalla de build.
3. *Deploy*. Queda publicado en una URL `*.netlify.app` para revisar.
4. **Dominio:** *Domain management* → *Add a domain* → `ipdc.org.py`. En el proveedor DNS del dominio, apuntar los registros según las instrucciones de Netlify. Netlify emite el certificado HTTPS solo.
5. Activar *Force HTTPS*.

**Día a día:**
- Cada push a `main` publica automáticamente.
- Cada pull request genera una **vista previa** con URL propia.
- Si un deploy falla, sigue en línea la versión anterior.
- Para volver atrás: *Deploys* → elegir un deploy anterior → *Publish deploy*.

**Cambio de dominio (del WordPress a Netlify):** apuntar el DNS recién cuando el sitio esté aprobado. Conviene guardar antes una copia completa del WordPress (archivos y base de datos).

## Redirecciones desde el sitio anterior

`dist/_redirects` se **genera en cada build** (`src/integrations/netlify-redirects.ts`):
- reglas fijas para las páginas, categorías, feeds y fichas del WordPress (`/constitution/` → `/es/constitucion/`, `/autorities/` → `/es/instituto/autoridades/`, etc.);
- una regla 301 por cada entrada del blog con `legacyUrl` en su frontmatter.

`migration/old-urls.txt` lista las URLs del sitio anterior. `npm run build && npm run check:redirects` verifica que todas tengan una regla y que el destino exista: hoy resuelven **55 de 55**. Si cambiás el nombre de archivo de una entrada, la redirección se actualiza sola. Si movés una página, agregá una regla en `STATIC_RULES`.

## Calidad: accesibilidad, SEO y rendimiento

Objetivos: **WCAG 2.1 AA** y **Lighthouse 90+** en todas las categorías.

**Qué incluye el código:**
- **Accesibilidad:** HTML semántico; enlace para saltar al contenido; foco visible; menús operables con teclado (Enter para abrir, Escape para cerrar); contraste AA; áreas táctiles de 44 px o más; `prefers-reduced-motion`; texto alternativo en todas las imágenes; acordeones nativos (`<details>`).
- **SEO:** `title` y `meta description` por página; URL canónica; Open Graph y Twitter Card (con imagen por defecto `public/og-default.jpg`); `sitemap-index.xml`; `robots.txt`; datos estructurados de **Organization** (inicio), **BlogPosting** (entradas) y **Event** (eventos); RSS en `/es/blog/rss.xml`.
- **Rendimiento:** imágenes WebP responsivas con carga diferida; fuentes propias precargadas; CSS dentro del HTML; videos de YouTube que se cargan solo al hacer clic; casi nada de JavaScript.

**Resultados actuales** (Lighthouse, modo celular):

| Página | Rendimiento | Accesibilidad | Buenas prácticas | SEO |
|---|---|---|---|---|
| Inicio | 99 | 100 | 100 | 100 |
| Constitución de 1992 | 99 | 100 | 100 | 100 |
| Entrada de blog | 99 | 100 | 100 | 100 |
| Miembros, Blog | 98 | 100 | 100 | 100 |
| Evento | 100 | 100 | 100 | 100 |

axe (accesibilidad automática): 0 problemas en las 37 páginas, a 390 px y 1280 px de ancho.

**Antes de publicar cambios grandes:**
1. `npm run check`: sin errores.
2. `npm run build && npm run check:redirects`.
3. `npm run preview` y, en Chrome, DevTools → **Lighthouse** → modo *Mobile* sobre las páginas cambiadas.
4. Accesibilidad: extensión [axe DevTools](https://www.deque.com/axe/devtools/) y una pasada con la tecla Tab.
5. Probar en un celular real o en el modo responsive de DevTools (390 px).

## Documentación del proyecto

| Archivo | Contenido |
|---|---|
| [`CONTENT_INVENTORY.md`](CONTENT_INVENTORY.md) | Relevamiento del sitio anterior: páginas, entradas, archivos, enlaces rotos y problemas encontrados. |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | Navegación nueva y su porqué, sitemap, modelo de contenido, idiomas, redirecciones y correcciones aplicadas. |
| [`migration/`](migration/) | Texto original de cada página y entrada del sitio anterior (archivo de referencia; el sitio usa `src/content/`). |
| [`scripts/migrate-posts.py`](scripts/migrate-posts.py) | Registro de cómo se convirtieron las entradas del WordPress. Ya se ejecutó; no hace falta volver a correrlo. |

## Pendientes del cliente

- URL del formulario embebido de **Mailchimp** (ver [Configuración del sitio](#configuración-del-sitio)).
- PDF del **Reglamento de Gobierno de 1813**: el enlace del sitio anterior (mre.gov.py) está caído.
- **Logo vectorial** original, si existe.
- **Fotos** de autoridades y miembros (opcionales).
- **Traducción al inglés** (más adelante).
