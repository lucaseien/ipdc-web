# idsp-web

Sitio web del **Instituto de Derecho de Seguros del Paraguay (IDSP)**: [idsp.com.py](https://idsp.com.py).

Hecho con [Next.js](https://nextjs.org) (App Router), React y [Tailwind CSS](https://tailwindcss.com). Todo el contenido vive en archivos Markdown/MDX y YAML dentro del repositorio; no hay base de datos. Se publica en [Netlify](https://www.netlify.com).

---

## Índice

- [Mapa: dónde está cada cosa](#mapa-dónde-está-cada-cosa)
- [Puesta en marcha](#puesta-en-marcha)
- [Agregar y editar contenido](#agregar-y-editar-contenido)
- [Imágenes](#imágenes)
- [Configuración del sitio](#configuración-del-sitio)
- [Sistema de diseño](#sistema-de-diseño)
- [Idiomas](#idiomas)
- [Deploy en Netlify](#deploy-en-netlify)
- [Redirecciones](#redirecciones)

---

## Mapa: dónde está cada cosa

**Regla general:** cada página tiene dos partes, y casi siempre están en dos archivos distintos.

- **Cómo se ve** (secciones, botones, imágenes, orden): en `src/app/`. **La carpeta es la URL** y el archivo siempre se llama `page.tsx`: `src/app/es/instituto/miembros/page.tsx` → `/es/instituto/miembros/`.
- **Qué dice** (títulos y párrafos): en `src/content/paginas/es/*.mdx`. Cuando en una página veas `page.data.title`, `page.data.lead` o `<Markdown entry={page} />`, el texto viene de ese `.mdx`.

```
src/
├─ app/                 PÁGINAS (la carpeta es la URL)
│  ├─ layout.tsx        Estructura común: <head>, encabezado y footer
│  ├─ not-found.tsx     Página 404
│  ├─ sitemap.ts        /sitemap.xml
│  ├─ robots.ts         /robots.txt
│  └─ es/               Todas las páginas en español
├─ components/          Piezas reutilizables (botones, tarjetas, header, footer…)
├─ content/             TEXTOS Y DATOS EDITABLES
├─ config/site.ts       Email, redes, Mailchimp, enlaces de interés
├─ i18n/                Menú (nav.ts) y textos chicos de interfaz (ui.ts)
├─ lib/                 Lectura de contenido, fechas, SEO, redirecciones
├─ assets/              Logo y fotos de cabecera
└─ styles/global.css    Colores, tipografía y estilos base
```

Lo que se repite en todas las páginas:

| Qué | Archivo |
|---|---|
| Encabezado y menú (escritorio y celular) | `src/components/Header.tsx` |
| Ítems del menú y del footer | `src/i18n/nav.ts` |
| Footer | `src/components/Footer.tsx` |
| Formulario de newsletter (en el footer) | `src/components/Newsletter.tsx` |
| Logo | `src/components/Logo.tsx` (imagen: `src/assets/brand/logo-idsp.png`) |
| Estructura general, favicon | `src/app/layout.tsx` |
| Título, descripción y datos para redes de cada página | `src/lib/seo.ts` (cada página llama a `pageMeta`) |
| Cabecera de las páginas internas (título, migas de pan, foto de fondo) | `src/components/PageHeader.tsx` |
| Email, redes, enlace "Quiero ser miembro", enlaces de interés | `src/config/site.ts` |
| Textos chicos de interfaz ("Menú", "Anterior", etc.) | `src/i18n/ui.ts` |
| Colores, tipografía, clases propias | `src/styles/global.css` |

### Inicio — `src/app/es/page.tsx`

Cada sección empieza con un comentario `{/* ─── … ─── */}`. Buscalo con Ctrl+F.

| Sección (comentario) | Qué tiene | Textos |
|---|---|---|
| `Portada (hero)` | Foto del Cabildo, título, bajada y botón "Conocer más" | Título y bajada: `title` y `lead` de `paginas/es/inicio.mdx`. Foto: `src/assets/fotos/cabildo.jpg` |
| `Presentación` | "¿Quiénes somos?" y botón "Conocer más" | Cuerpo de `inicio.mdx` |
| `Accesos` | Las 3 tarjetas: Capacitación, Charlas, Dictámenes | Lista `highlights`, arriba en el mismo archivo |
| `Ser miembro` | Requisitos y botón "Quiero ser miembro" | `requisitos-miembro.mdx` |
| `Blog (solo si hay entradas)` | Últimas 3 entradas | Entradas de `src/content/blog/es/` |
| `Eventos (solo si hay)` | Próximos eventos, o el último realizado | Eventos de `src/content/eventos/es/` |
| `Enlaces de interés` | Banco Central, Corte Suprema, AIDA | `usefulLinks` en `src/config/site.ts` |

### Resto de las páginas

| URL | Diseño | Textos |
|---|---|---|
| `/es/instituto/` (Quiénes somos) | `src/app/es/instituto/page.tsx` | `quienes-somos.mdx` |
| `/es/instituto/que-hacemos/` | `src/app/es/instituto/que-hacemos/page.tsx` | `que-hacemos.mdx` |
| `/es/instituto/autoridades/` (Consejo Directivo) | `src/app/es/instituto/autoridades/page.tsx` | `autoridades.mdx`. Personas y cargos: `src/content/personas.yaml` y `src/content/comisiones.yaml` |
| `/es/instituto/miembros/` | `src/app/es/instituto/miembros/page.tsx` | `miembros.mdx` y `requisitos-miembro.mdx` |
| `/es/eventos/` | `src/app/es/eventos/page.tsx` | `eventos.mdx` |
| `/es/eventos/<evento>/` | `src/app/es/eventos/[slug]/page.tsx` (la misma plantilla para todos) | Un `.mdx` por evento en `src/content/eventos/es/` |
| `/es/blog/` y categorías | Plantilla compartida: `src/components/BlogIndex.tsx` | `blog.mdx`, `blog-descargo.mdx`, `blog-colaborar.mdx` |
| `/es/blog/<entrada>/` | `src/app/es/blog/[slug]/page.tsx` (la misma plantilla para todas) | Un `.md` por entrada en `src/content/blog/es/` |
| `/es/contacto/` | `src/app/es/contacto/page.tsx` | `contacto.mdx`. Email y redes: `src/config/site.ts` |
| `/es/guia-de-estilo/` (interna) | `src/app/es/guia-de-estilo/page.tsx` | En el mismo archivo |
| Página 404 | `src/app/not-found.tsx` | En el mismo archivo |

Las carpetas con `[corchetes]` son **plantillas**: un solo archivo genera todas las páginas de ese tipo. Si cambiás uno, cambian todos los eventos o todas las entradas.

### Ejemplos rápidos

- **Sacar o cambiar un botón del hero:** `src/app/es/page.tsx`, sección `Portada (hero)`.
- **Cambiar el título grande del inicio:** `src/content/paginas/es/inicio.mdx`, campo `title:`.
- **Cambiar la foto del hero:** reemplazá `src/assets/fotos/cabildo.jpg`, o cambiá el `import cabildo from …` al principio de `src/app/es/page.tsx`.
- **Agregar o quitar un ítem del menú:** `src/i18n/nav.ts`.
- **Cambiar un color en todo el sitio:** `src/styles/global.css`, bloque `@theme`.

---

## Puesta en marcha

Requisitos: **Node.js 22.12 o superior** (el repo incluye `.nvmrc`: con nvm, `nvm use`) y npm.

```bash
npm install
npm run dev
```

Abrí <http://localhost:3000/es/>. La raíz `/` redirige a `/es/`.

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga en vivo. Los cambios en `src/content/` se ven al recargar la página. |
| `npm run build` | Genera el sitio de producción. Falla si algún archivo de contenido tiene un error. **Correlo antes de cada commit.** |
| `npm run start` | Sirve el build de producción en local (correr `npm run build` antes). |
| `npm run check` | Verifica tipos de TypeScript. |

---

## Agregar y editar contenido

Todo se hace editando archivos de texto, en un editor local o en GitHub (abrir el archivo → lápiz → *Commit changes*). **Cada commit a `main` publica el sitio automáticamente.**

Si un archivo tiene un error (falta un campo obligatorio, una fecha mal escrita, una imagen que no existe), el build falla indicando el archivo y el campo, y Netlify **mantiene la versión anterior en línea**. Los campos permitidos de cada tipo de contenido están definidos en `src/lib/content.ts`.

El encabezado de cada archivo (entre las líneas `---`) usa YAML:
- Si un texto contiene `:` o empieza con comillas, encerralo entre comillas dobles: `title: "Congreso: día 1"`.
- Las fechas van como `AAAA-MM-DD`.

### Publicar una entrada de blog

Creá un archivo en `src/content/blog/es/`. **El nombre del archivo es la URL**: `mi-articulo.md` se publica en `/es/blog/mi-articulo/`. Minúsculas, sin acentos ni espacios, con guiones.

```markdown
---
title: "Título del artículo"
description: "Resumen de una o dos oraciones (hasta 160 caracteres). Aparece en Google, en redes y en el listado."
date: 2026-10-01
category: opinion              # opinion  |  noticias-y-eventos
authors: ["Nombre Apellido"]   # uno o varios; [] si no tiene firma
authorPhoto: /imagenes/autores/nombre-apellido.jpg   # opcional
draft: false                   # true = no se publica todavía
---

Primer párrafo del artículo.

## Un subtítulo

Texto con **negrita**, _cursiva_ y [un enlace](https://ejemplo.com).

![Descripción de la imagen](/imagenes/blog/mi-imagen.jpg)

Texto con una nota al pie.[^1]

[^1]: Texto de la nota al pie.
```

- **Categorías:** están en `src/lib/content.ts` (`categories` y el `z.enum` de `category`). Si agregás una, cambiá los dos.
- **Descargo de responsabilidad:** se agrega solo al pie de cada entrada.

### Agregar un evento

Creá `src/content/eventos/es/nombre-del-evento.mdx`. Se publica en `/es/eventos/nombre-del-evento/`.

```markdown
---
title: "Diplomado en Derecho de Seguros"
description: "Resumen breve para buscadores y redes (hasta 200 caracteres)."
startDate: 2027-03-01
endDate: 2027-03-02                 # opcional
location: Asunción                  # opcional
address: "Dirección exacta"         # opcional
modality: Presencial                # opcional
registrationUrl: https://forms.gle/…   # opcional; el botón se oculta cuando el evento terminó
cover: /imagenes/eventos/placa.jpg  # opcional
coverAlt: "Descripción de la imagen"
videos:                             # opcional
  - youtubeId: eUGaK0uTATo          # lo que va después de watch?v= en la URL de YouTube
    title: Resumen del evento
partners:                           # opcional; se agrupan por "group"
  - { group: "Organizadores", name: "IDSP", logo: /imagenes/eventos/logo-idsp.png, url: "https://idsp.com.py/" }
---

Descripción del evento en Markdown.
```

El sitio separa solo los **próximos eventos** de los **anteriores** según la fecha. La portada muestra los próximos; si no hay, muestra el último realizado.

### Consejo Directivo y personas

**Personas:** `src/content/personas.yaml`. Cada persona se carga una sola vez.

```yaml
- id: nombre-apellido            # único; se usa en comisiones.yaml
  name: Abg. Nombre Apellido     # como se muestra en la tarjeta
  listName: Apellido, Nombre     # define el orden alfabético
  photo: nombre-apellido.jpg     # opcional: archivo en public/personas/
  memoriam: false                # true para miembros fallecidos
```

Sin foto, la tarjeta muestra las iniciales. Foto recomendada: vertical 4:5 o cuadrada, de al menos 600 px de ancho.

**Consejo Directivo:** `src/content/comisiones.yaml`. Para un nuevo consejo, agregá un bloque arriba con `current: true` y sacáselo al anterior, que pasa solo a *"Consejos anteriores"*.

```yaml
- id: "2026-2028"
  period: "2026-2028"
  current: true
  members:
    - { persona: nombre-apellido, role: Presidente }
```

### Textos institucionales

En `src/content/paginas/es/`, un archivo por texto. `title`, `description` (para buscadores) y `lead` (bajada debajo del título) van en el encabezado; el resto es Markdown. Dentro de los `.mdx` también se pueden usar `<Accordion title="…">…</Accordion>`, `<Callout>…</Callout>` y `<YouTube id="…" title="…" />`.

---

## Imágenes

| Qué | Dónde | Cómo se usa |
|---|---|---|
| Fotos de cabecera y logo | `src/assets/fotos/`, `src/assets/brand/` | Con `import` en la página (ver `src/app/es/page.tsx`) |
| Imágenes del blog y eventos | `public/imagenes/…` | Ruta desde `public`: `/imagenes/blog/foto.jpg` |
| Fotos de personas | `public/personas/` | Solo el nombre del archivo en `personas.yaml` |
| Favicons e imagen para redes | `public/` | Ya configurados |

Next convierte las imágenes a AVIF/WebP y genera los tamaños necesarios. Toda imagen con información necesita texto alternativo; las decorativas llevan `alt=""`. **No uses HEIC** (fotos de iPhone). Tamaño máximo recomendado: 2560 px de ancho.

## Configuración del sitio

Los datos institucionales están en **`src/config/site.ts`**: nombre, email, ubicación, redes sociales y el enlace del formulario de inscripción. Los campos vacíos no se muestran.

**Newsletter (Mailchimp):** el formulario está desactivado hasta completar `mailchimpAction` con la URL del formulario embebido (Mailchimp → *Audience* → *Signup forms* → *Embedded forms* → atributo `action` del código).

## Sistema de diseño

La referencia visual es `/es/guia-de-estilo/` (interna: no se indexa). Los colores están en `src/styles/global.css`, bloque `@theme`, y se usan como clases de Tailwind (`text-azul-700`, `bg-papel`…):

| Token | Valor | Uso |
|---|---|---|
| `azul-700` | `#004890` | Azul del logo: enlaces, botones |
| `azul-900` / `azul-950` | `#00254D` / `#001A38` | Títulos / footer y fondos oscuros |
| `celeste-600` | `#1A9CC8` | Celeste del logo: solo acentos (filetes, íconos) |
| `celeste-700` | `#0A6D93` | Rótulos pequeños |
| `papel` / `tinta` | `#FAF8F4` / `#1C1E26` | Fondo y texto principal |
| `font-display` / `font-sans` / `font-serif` | Geist / Geist / Newsreader itálica | Títulos / texto / palabras de acento (`.acento`) |

**Clases propias:** `container-page` (ancho de página), `label` (rótulo en versalitas), `filete` (línea bicolor), `prose-site` (texto largo).

## Idiomas

Por ahora solo existe español (`/es/…`). Para agregar inglés: completar `ui.en` (`src/i18n/ui.ts`) y `mainNav.en` (`src/i18n/nav.ts`), crear el contenido en carpetas `en/` dentro de `src/content/` y las páginas en `src/app/en/`.

## Deploy en Netlify

`netlify.toml` ya tiene la configuración: Netlify detecta Next.js solo y usa su adaptador oficial (páginas, imágenes optimizadas y redirecciones).

- Cada push a `main` publica automáticamente; cada pull request genera una vista previa con URL propia.
- Si un deploy falla, sigue en línea la versión anterior.
- Para volver atrás: *Deploys* → elegir uno anterior → *Publish deploy*.

## Redirecciones

Están en `src/lib/redirects.ts` y se aplican con un 301:
- `/` → `/es/`;
- reglas fijas del sitio anterior (`STATIC_RULES`), p. ej. `/consejo-directivo/` → `/es/instituto/autoridades/`;
- una regla por cada entrada del blog con `legacyUrl` en su encabezado.
