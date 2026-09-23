# Arquitectura y sitemap propuesto — Paso 2

## Decisiones ya tomadas (respuestas al inventario)

| Tema | Decisión |
|---|---|
| Inglés | Se deja para después. La estructura bilingüe queda armada (`/es` y `/en`), pero por ahora solo se genera `/es`. El selector de idioma aparece solo en las páginas que tengan traducción, así no hay enlaces a páginas vacías. |
| Fotos | Autoridades y Miembros llevan un campo `foto` opcional. Mientras esté vacío se muestran las iniciales sobre un fondo neutro. Para agregar una foto se copia el archivo y se completa una línea (ver README al final). |
| Logo | No hay versión vectorial. En la etapa de diseño lo redibujo en SVG a partir del PNG de 512 px (círculo, 6 figuras y "IPDC") para que se vea nítido. Si aparece el original, se reemplaza. |
| Errores de tipeo | Se corrigen (lista abajo). `migration/` queda como archivo textual del original. |
| Eventos 2024 | Quedan en el Blog, en la categoría *Noticias y eventos*. La página Eventos muestra el I Congreso 2021 y las últimas entradas de esa categoría. |
| Categorías del blog | Se simplifican a 2: **Opinión** y **Noticias y eventos**. |
| Newsletter | Se mantiene Mailchimp. |
| Deploy | Netlify. Las redirecciones van en `public/_redirects`. |
| Paleta | Rojo y azul del logo. Se define en el Paso 3. |
| Reglamento de 1813 | Pendiente: lo pide el cliente. Mientras tanto, la tarjeta se muestra como "Documento no disponible temporalmente", sin enlace roto. |
| PDFs pesados | Recomprimidos (detalle abajo). |

### Ya hecho en esta etapa
- **PDFs recomprimidos.** Los originales se guardaron fuera del repo.
  - `constitucion.pdf`: de 18,6 a 8,2 MB. Es el escaneo del original firmado; lo pasé a escala de grises a 120 dpi. Revisé una página y se lee bien, incluidas las firmas.
  - `ANUARIO-PARAGUAYO.pdf`: de 20,2 a 1,3 MB.
  - `CONVERSATORIO-CIUDADANO-1-1.pdf`: de 803 a 172 KB.
- **HEIC convertidas a JPG.** Son la invitación a la presentación del libro de Melgarejo y la tapa de *Constitutional Reasoning in Latin America and the Caribbean*. Ahora se ven en todos los navegadores.

---

## 1. Navegación: qué cambia y por qué

### Antes (7 entradas y 2 submenús que se superponen)
```
Inicio · Más sobre el IPDC ▾ · QUIENES SOMOS ▾ · Publicaciones · Conoce la Constitución ▾ · Eventos · Blog · ESP|ENG
         ├ El Instituto        ├ Autoridades                   ├ Constitución de 1992
         ├ Reseña histórica    ├ Miembros                      └ Constituciones anteriores
         └ Qué hacemos         └ Requisitos para ser Miembro
```

### Propuesta (6 entradas y 2 submenús)
```
[Logo IPDC → Inicio]   El Instituto ▾ · Publicaciones · Constitución ▾ · Eventos · Blog · Contacto   [ES|EN]*
                       ├ Quiénes somos                   ├ Constitución de 1992
                       ├ Qué hacemos                     └ Constituciones históricas
                       ├ Autoridades
                       └ Miembros
```
\* El selector ES|EN aparece cuando exista la versión en inglés.

**Por qué:**
1. **"Más sobre el IPDC" y "Quiénes somos" se unen en "El Instituto".** Hoy dos menús responden a la misma pregunta ("¿qué es el IPDC y quién lo integra?"). Encima, ninguno de los dos ítems padre lleva a una página propia: uno abre Reseña histórica y el otro Autoridades. Un solo menú con 4 ítems es más fácil de recorrer, sobre todo en el menú del celular.
2. **"El Instituto" y "Reseña histórica" se unen en "Quiénes somos".** Son dos textos cortos (4 y 6 párrafos) sobre lo mismo. Juntos forman una página completa: qué es el IPDC y luego su historia. El texto no cambia, se muestra en dos secciones.
3. **"Requisitos para ser miembro" pasa a ser una sección de Miembros** (`#requisitos`), con un botón destacado. Es una sola lista corta. Tiene más sentido al pie del listado de miembros, que es donde alguien se pregunta cómo sumarse, y así el menú pierde una entrada con un nombre de 8 palabras.
4. **"Inicio" sale del menú y el logo lleva al inicio.** Es la convención actual y deja lugar en la barra.
5. **"Contacto" entra al menú.** Hoy `/contact/` existe pero no está en el menú y solo tiene el formulario de newsletter. La nueva página reúne email, ubicación, redes y newsletter. Es contenido que ya existe, no texto nuevo.
6. **"Conoce la Constitución" pasa a "Constitución"**, un rótulo más corto. Las dos páginas se mantienen: la de 1992 es de lectura larga y la de constituciones históricas es un catálogo de documentos.

---

## 2. Sitemap y rutas nuevas

```
/                                     → 301 a /es/
/es/                                  Inicio
/es/instituto/                        Quiénes somos (El Instituto + Reseña histórica)
/es/instituto/que-hacemos/            Qué hacemos (8 áreas, en acordeón accesible <details>)
/es/instituto/autoridades/            Comisión Directiva 2025-2028 en grilla; las comisiones 2022-2025 y 2019-2022 como "Comisiones anteriores"
/es/instituto/miembros/               Grilla de miembros + In Memoriam + #requisitos
/es/publicaciones/                    Anuario Paraguayo de Derecho Constitucional, una tarjeta por edición (2020-2024)
/es/constitucion/                     Constitución de 1992: texto + tarjetas de documentos
/es/constitucion/historicas/          Constituciones y documentos políticos anteriores (1967, 1940, 1870, 1844, 1813)
/es/eventos/                          Próximos eventos (vacío por ahora) · Eventos anteriores · Últimas "Noticias y eventos" del blog
/es/eventos/i-congreso-2021/          I Congreso Paraguayo de Derecho Constitucional (videos, organizadores, declaraciones)
/es/blog/                             Intro + descargo + listado paginado (10 por página)
/es/blog/pagina/2/ …
/es/blog/categoria/opinion/
/es/blog/categoria/noticias-y-eventos/
/es/blog/<slug>/                      Entrada individual
/es/blog/rss.xml                      Feed RSS (reemplaza /feed/ de WordPress)
/es/contacto/                         Email, ubicación, redes, newsletter
/404                                  Página no encontrada (con enlaces útiles)
/sitemap-index.xml, /robots.txt
/wp-content/uploads/…                 PDFs e imágenes en la misma ruta que antes (sin redirección)

/en/…                                 La misma estructura con slugs en inglés (/en/institute/, /en/constitution/…), cuando haya traducción
```

### Slugs del blog
Se quita la fecha de la URL (`/2024/09/14/…`), porque ya se muestra en la página. Mantengo el slug original salvo en 4 casos donde no coincide con el título o es excesivamente largo:

| Slug viejo | Slug nuevo |
|---|---|
| `indolencia-burocrata-justicia-paraguay` | `la-indolencia-del-burocrata` |
| `autoritarismo-paraguay-derecho-constitucional` | `serviles-al-poder` |
| `reflexiones-y-analisis-sobre-temas-de-derecho-constitucional-un-enfoque-accesible` | `la-paja-en-el-ojo-ajeno` |
| `breve-resena-sobre-el-capitulo-de-paraguay-en-el-volumen-constitutional-reasoning-in-latin-america-and-the-caribbean-editado-por-johanna-frohlich` | `resena-constitutional-reasoning-in-latin-america` |

### Categorías del blog
- **Opinión** (15): todas las columnas firmadas (Robert Marcial González, Emilio Camacho, Camilo Filártiga, Manuel Riera D., García Ascolani e Irrazabal).
- **Noticias y eventos** (5): "Blog del IPDC – Objetivo del Blog", "La destitución del Presidente…" (presentación del libro), "#conversatorio Las fronteras…", "Caminos hacia la democracia…" (Seminario Jean Monnet) y "Roberto Gargarella en Paraguay…".
- El post demo `make-me-happy` no se migra.

---

## 3. Modelo de contenido (Astro Content Collections)

Todo el contenido editable vive en `src/content/` como Markdown/MDX o YAML. Cada colección valida sus campos con un schema (Zod), así que si falta un campo obligatorio el build falla con un mensaje claro en lugar de publicar una página rota.

```
src/content/
├─ paginas/es/*.mdx          Textos institucionales (Quiénes somos, Qué hacemos, Constitución 1992, intro de Miembros/Blog…)
├─ blog/es/<slug>.md         Entradas del blog
├─ eventos/es/<slug>.mdx     Eventos
├─ personas.yaml             Todas las personas: nombre, orden alfabético, foto opcional, in memoriam
├─ comisiones.yaml           Comisiones Directivas: período + [persona, cargo]
├─ anuarios.yaml             Ediciones del Anuario: año, PDF del índice, tapa opcional
└─ documentos.yaml           Documentos descargables: título, año, idioma, archivo local o URL externa
```

**Campos principales**

| Colección | Campos |
|---|---|
| `blog` | `title`, `description` (SEO), `date`, `authors[]`, `authorPhoto?`, `category: opinion \| noticias-y-eventos`, `cover?`, `legacyUrl?`, `draft?` |
| `eventos` | `title`, `description`, `startDate`, `endDate?`, `location?`, `modality?`, `cover?`, `videos[]` (YouTube ID + título), `documents[]`, `registrationUrl?`, `partners[]` (logo, nombre, URL, rol) |
| `personas` | `id`, `name`, `sortName`, `photo?`, `memoriam?`. Una persona se carga una sola vez; Autoridades y Miembros la referencian, así la foto se agrega en un solo lugar. |
| `comisiones` | `period` (ej. "2025-2028"), `current: true/false`, `members: [{ persona, cargo }]` |
| `documentos` | `title`, `year?`, `lang: es \| gn \| en`, `file` (en `/public`) **o** `url` (externo), `group: constitucion-1992 \| historicas`, `available?`. El **peso** y la **cantidad de páginas** se calculan solos en el build para los archivos locales; en las tarjetas externas se indica el sitio de origen (ej. "bacn.gov.py"). |

**Imágenes:** las imágenes del contenido van a `src/assets/`, para que Astro las convierta a AVIF/WebP con `srcset` y lazy loading. Los PDFs quedan en `public/wp-content/uploads/` para mantener sus URLs.

---

## 4. Idiomas

- Uso el i18n nativo de Astro: `locales: ['es', 'en']`, `defaultLocale: 'es'`, `prefixDefaultLocale: true`. Todas las rutas llevan `/es` o `/en`.
- Los textos de la interfaz (menú, botones, rótulos) van en `src/i18n/es.ts` y `en.ts`. El contenido va en carpetas por idioma (`blog/es/`, `blog/en/`).
- Cada página declara su equivalente en el otro idioma (`translationKey`). El selector y las etiquetas `hreflang` solo aparecen cuando esa traducción existe.
- Hasta que haya contenido en inglés, **no se genera ninguna página `/en`**. Así no se publican páginas vacías ni duplicadas que perjudiquen el SEO.

---

## 5. Redirecciones 301 (`public/_redirects` de Netlify)

Netlify toma igual las rutas con y sin barra final.

```
# Raíz
/                                   /es/                                  301

# Páginas
/institute/                         /es/instituto/                        301
/about/                             /es/instituto/#historia               301
/activities/                        /es/instituto/que-hacemos/            301
/autorities/                        /es/instituto/autoridades/            301
/members/                           /es/instituto/miembros/               301
/member_requirements/               /es/instituto/miembros/#requisitos    301
/publications/                      /es/publicaciones/                    301
/constitution/                      /es/constitucion/                     301
/others_constitutions/              /es/constitucion/historicas/          301
/eventos/                           /es/eventos/                          301
/blog/                              /es/blog/                             301
/blog/page/*                        /es/blog/                             301
/contact/                           /es/contacto/                         301
/lopez-palace-in-window/            /es/                                  301
/home/3980-2/                       /es/                                  301

# Qué hacemos (fichas Helpie FAQ)
/helpie_faq/*                       /es/instituto/que-hacemos/            301

# Blog: 20 entradas, una línea por entrada, por ejemplo:
/2025/08/10/un-aplauso-para-el-cirujano-del-cartismo/   /es/blog/un-aplauso-para-el-cirujano-del-cartismo/   301
/2021/08/15/indolencia-burocrata-justicia-paraguay/     /es/blog/la-indolencia-del-burocrata/                301
…
/2016/12/07/make-me-happy/          /es/instituto/que-hacemos/            301

# Archivos de WordPress
/category/eventos/                  /es/blog/categoria/noticias-y-eventos/   301
/category/*                         /es/blog/categoria/opinion/              301
/author/*                           /es/blog/                                301
/feed/                              /es/blog/rss.xml                         301
/*/feed/                            /es/blog/rss.xml                         301
/wp-content/uploads/2024/09/PHOTO-2024-09-14-11-24-11-1.heic   /wp-content/uploads/2024/09/PHOTO-2024-09-14-11-24-11-1.jpg   301
/wp-content/uploads/2024/11/tempImageMX1ek0.heic               /wp-content/uploads/2024/11/tempImageMX1ek0.jpg               301
```

El archivo se genera en el build a partir del campo `legacyUrl` de cada entrada, para que no haya que mantener dos listas a mano. Agrego un test que verifica que las 50 URLs del sitemap viejo tengan destino.

---

## 6. Correcciones de tipeo que se aplican

| Dónde | Original | Corregido |
|---|---|---|
| Qué hacemos (Congresos…, Fomentar…) | IDPC | IPDC |
| Qué hacemos (varios ítems) | 5 frases pegadas al punto anterior: "comparado.Para dicho fin", "internacional.Entre éstos", "Valadés.El IIDC", "anual.Se trata", "país.De esta forma" | Párrafos separados |
| Miembros, In Memoriam | Seall-Sasain | Seall-Sasiain (como en la Reseña histórica) |
| Blog, texto final | Whittinglsow | Whittingslow |
| Autoridades 2025-2028 | manuel riera, adriana marecos, giovanna parini, jorge melgarejo | Manuel Riera, Adriana Marecos, Giovanna Parini, Jorge Melgarejo |
| Autoridades vs. Miembros | José Torales / Torales, Jose Luis | José Luis Torales en ambos |
| Blog, títulos | POLíTICAMENTE PERVERSO Y CONSTITUCIONALMENTE ILEGíTIMO | POLÍTICAMENTE PERVERSO Y CONSTITUCIONALMENTE ILEGÍTIMO |
| Inicio, botón | CONOCER MAS | Conocer más |
| Reseña Fröhlich y Beto Riart | Notas al pie `applewebdata://` rotas | Notas al pie funcionales (enlace de ida y vuelta) |
| ¿La hará cumplir? | "Villanuevaperdió" | "Villanueva perdió" |

**Nota:** la imagen `banner-.png` dice "IDPC" dentro de la imagen, así que no se puede corregir como texto. En la página Quiénes somos la reemplazo por un bloque HTML con el mismo mensaje ("El IPDC es el Capítulo Paraguayo del Instituto Iberoamericano de Derecho Constitucional"). Así queda corregido, se puede leer con lector de pantalla y se traduce.

---

## 7. Estructura del proyecto

```
ipdc-web/
├─ astro.config.mjs          i18n, sitemap, trailingSlash: 'always'
├─ netlify.toml              build y headers de caché/seguridad
├─ public/
│  ├─ _redirects             (generado en el build)
│  ├─ robots.txt
│  └─ wp-content/uploads/…   PDFs
├─ src/
│  ├─ assets/                imágenes optimizables (fotos de cabecera, retratos, logos)
│  ├─ components/            Header, Nav, LanguageSwitcher, Footer, DocumentCard, PersonCard, PostCard, Newsletter, Prose, SEO…
│  ├─ content/               (ver §3)
│  ├─ content.config.ts      schemas
│  ├─ i18n/                  textos de interfaz + helpers de rutas
│  ├─ layouts/               Base, Page, Article
│  ├─ pages/es/…             rutas
│  └─ styles/                tokens y tipografía
├─ migration/                archivo del contenido original (no se publica)
├─ CONTENT_INVENTORY.md
├─ ARCHITECTURE.md
└─ README.md
```

**Dependencias:** `astro`, `@astrojs/mdx`, `@astrojs/sitemap`, `@astrojs/rss`, `tailwindcss` + `@tailwindcss/vite` + `@tailwindcss/typography`, fuentes auto-hospedadas con `@fontsource`, y un parser liviano de PDF para contar páginas en el build. Nada más: no uso frameworks de JS en el cliente. El menú móvil y el acordeón funcionan con HTML nativo (`<details>`) y unas pocas líneas de JS.

---

## 8. Decisiones sobre fechas (resueltas)

- **"La indolencia del burócrata":** fecha 15/08/2021. En el texto se corrige "15 de agosto de 2024" por "15 de agosto de 2021".
- **"Demócratas por fuera, colonialistas por dentro":** fecha 26/08/2024. En el texto se corrige "26 de junio de 2024" por "26 de agosto de 2024".

## 9. Pendiente del cliente

- **Mailchimp:** la URL del formulario embebido (*Audience → Signup forms → Embedded forms*, el `action="https://….list-manage.com/subscribe/post?u=…&id=…"`). Hasta tenerla, el formulario queda desactivado.
- PDF del Reglamento de Gobierno de 1813.
- Logo vectorial original, si existe.

---

## 10. Notas de implementación (Paso 4)

Decisiones tomadas al construir las páginas. Ninguna cambia el contenido institucional.

**Blog**
- La línea de firma con la que empezaba cada artículo ("por Robert Marcial González. 10 de agosto de 2025") y la foto del autor pasaron a los metadatos: se muestran en la cabecera del artículo y en las tarjetas.
- La **fecha** de cada artículo es la de su firma, la fecha que escribió el autor, no la de carga en WordPress. En varios casos difieren en uno a cuatro días. Las dos fechas acordadas (§8) quedaron corregidas.
- Notas al pie rotas (`applewebdata://`) → notas al pie funcionales. En la reseña de Fröhlich, las biografías de los autores quedan al pie como texto.
- El flyer del conversatorio (un PDF insertado como imagen, que no se veía) ahora es una imagen que enlaza al PDF.
- Todas las imágenes tienen texto alternativo descriptivo.
- El registro de las transformaciones está en `scripts/migrate-posts.py`.

**Autoridades y miembros**
- Cada comisión se ordena por cargo: Presidente, Vice, Secretario, Tesorera, Vocales, Síndico. En el sitio anterior el orden era irregular.
- Nombres: se usa la forma más completa que figuraba en el sitio (por ejemplo, "Juan Carlos Mendonca Bonnet", "Diego Moreno Rodríguez-Alcalá", "Manuel Riera Domínguez"). El orden alfabético sigue el listado original "Apellido, Nombre".
- Las fotos de autores del blog (Robert Marcial González, Emilio Camacho, Camilo Filártiga, Manuel Riera) **no** se usan en la grilla de miembros: cuatro fotos de estilos distintos entre 46 tarjetas quedaban despareja. Se agregan cuando el IPDC envíe un set homogéneo.

**Eventos**
- El texto del I Congreso se conserva literal, incluido el futuro "deliberará sobre dichas problemáticas". Si el IPDC prefiere el pasado para un evento ya realizado, es un cambio de una palabra en `src/content/eventos/es/i-congreso-2021.mdx`.
- No se migraron el enlace al programa (Google Drive, 404) ni el formulario de inscripción (evento terminado).
- Los videos de YouTube cargan el reproductor recién al hacer clic (mejor rendimiento y sin cookies de YouTube hasta entonces).

**Textos de interfaz nuevos** (no son contenido institucional): rótulos de secciones ("Últimas entradas", "Ediciones publicadas", "Comisiones anteriores"), botones, la frase para "Qué hacemos" en la home, que enumera las áreas de esa página, y el mensaje de Eventos cuando no hay próximos eventos.
