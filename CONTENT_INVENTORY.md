# Inventario de contenido — ipdc.org.py

Relevamiento del sitio actual (WordPress + tema "Zeko"/Liberlite + Elementor) realizado el **2026-09-23**.

- **Fuente:** los sitemaps de Yoast (`/sitemap_index.xml`: `page`, `post`, `category`, `helpie_faq`). Se descargaron las 50 URLs listadas y respondieron todas **HTTP 200**.
- **Texto:** se extrajo tal cual desde el HTML, sin resumir ni reescribir, a Markdown en [`migration/`](migration/):
  - `migration/pages/*.md` — 15 páginas, con la URL vieja, el title SEO, la meta description y la imagen OG en el frontmatter.
  - `migration/posts/*.md` — 21 entradas.
  - `migration/faq/*.md` — 9 fichas del plugin Helpie FAQ, duplicadas de "Qué hacemos".
- **Archivos:** los PDFs e imágenes alojados en ipdc.org.py se descargaron a `public/wp-content/uploads/…` con la misma ruta que tenían. Así las URLs viejas de los PDFs, que pueden estar enlazadas desde afuera o indexadas, siguen funcionando sin redirección.

---

## 1. Idiomas: no existe una versión en inglés

El selector "ESP / ENG" del sitio actual es **GTranslate**, que hace traducción automática en el navegador. **No hay ningún texto en inglés redactado por el IPDC.** `<html lang="es-AR">` en todas las páginas.

➡️ Para `/en` hace falta una traducción, que hoy no existe (ver preguntas al final).

---

## 2. Menú actual

```
Inicio                                  /
Más sobre el IPDC                       /about/            ← el ítem padre apunta a Reseña histórica
  ├ El Instituto                        /institute/
  ├ Reseña histórica                    /about/
  └ Qué hacemos                         /activities/
QUIENES SOMOS                           /autorities/       ← el ítem padre apunta a Autoridades
  ├ Autoridades                         /autorities/
  ├ Miembros                            /members/
  └ Conoce los requisitos para ser Miembro del IPDC   /member_requirements/
Publicaciones                           /publications/
Conoce la Constitución                  /constitution/
  ├ Constitución de 1992                /constitution/
  └ Constituciones y documentos políticos anteriores del Paraguay   /others_constitutions/
Eventos                                 /eventos/
Blog                                    /blog/
ESP | ENG                               (GTranslate)
```

---

## 3. Todas las URLs del sitio actual

### Páginas (15)

| URL vieja | Título | Archivo con el texto | Estado |
|---|---|---|---|
| `/` | Instituto Paraguayo de Derecho Constitucional | `pages/inicio.md` | OK |
| `/institute/` | El Instituto | `pages/el-instituto.md` | OK. El contenido está en un "panel" del tema, fuera de `<main>`. Quedó el rótulo interno "Panel 1" visible en el HTML. |
| `/about/` | Reseña histórica | `pages/resena-historica.md` | OK |
| `/activities/` | Qué hacemos | `pages/que-hacemos.md` | OK. Acordeón de 8 ítems más un formulario Mailchimp. |
| `/autorities/` | Autoridades | `pages/autoridades.md` | OK. **Sin fotos**, solo nombre y cargo. |
| `/members/` | Miembros | `pages/miembros.md` | OK. **Lista de texto sin fotos ni cargos.** |
| `/member_requirements/` | Conoce los requisitos para ser Miembro del IPDC | `pages/requisitos-miembro.md` | OK |
| `/publications/` | Publicaciones | `pages/publicaciones.md` | OK |
| `/constitution/` | Constitución de 1992 | `pages/constitucion-1992.md` | OK |
| `/others_constitutions/` | Constituciones y documentos políticos anteriores del Paraguay | `pages/constituciones-anteriores.md` | Solo una lista de enlaces, sin texto introductorio. **1 enlace roto** (ver §6). |
| `/eventos/` | Eventos | `pages/eventos.md` | Una sola landing: el **I Congreso Paraguayo de Derecho Constitucional (24 y 25 de noviembre de 2021)**. **2 enlaces rotos o vencidos.** |
| `/blog/` | Blog | `pages/blog.md` | Intro, descargo de responsabilidad, listado y texto para colaborar. |
| `/contact/` | Contacto | `pages/contacto.md` | **Casi vacía:** solo el titular "DEJE SU CORREO Y ENTÉRESE DE LAS ACTIVIDADES DEL IPDC" y el formulario Mailchimp (mc4wp). No figura en el menú. |
| `/lopez-palace-in-window/` | PROMOCIÓN Y DIFUSIÓN DEL CONOCIMIENTO… | `pages/huerfana-lopez-palace-in-window.md` | **Huérfana:** no está en el menú. Es una versión anterior del bloque de la home ("es **la** entidad líder" en vez de "aspira a ser líder"). |
| `/home/3980-2/` | (sin título) | `pages/huerfana-home-3980-2.md` | **Huérfana**, sin título. Duplica el bloque de la home. |

### Entradas del blog (21)

La fecha es la de WordPress; el autor real figura en la primera línea del texto (WordPress muestra casi siempre "Editor Blog IPDC"). Categorías según los archivos `/category/*`.

| Fecha WP | Título | Autor (según el texto) | Categorías WP | Observaciones |
|---|---|---|---|---|
| 2016-12-07 | Congresos, seminarios y charlas (`/2016/12/07/make-me-happy/`) | — | Sin categoría | **Resto del tema demo.** El slug es "make-me-happy" y el texto duplica el ítem de "Qué hacemos". Propongo no migrarla y redirigirla. |
| 2021-08-16 | LA INDOLENCIA DEL BURÓCRATA | Robert Marcial González | Sin categoría | **La URL dice 2021, pero el texto dice "15 de agosto de 2024".** |
| 2024-07-09 | SERVILES AL PODER -o mejor- SERES – VILES AL SERVICIO DEL PODER | Robert Marcial González | Sin categoría | El slug (`autoritarismo-paraguay-derecho-constitucional`) no coincide con el título. |
| 2024-08-17 | LA PAJA EN EL OJO AJENO | Robert Marcial González | Sin categoría | El slug (`reflexiones-y-analisis-…-un-enfoque-accesible`) no coincide. El texto dice "21 de agosto de 2024". |
| 2024-08-26 | DEMÓCRATAS POR FUERA, COLONIALISTAS POR DENTRO | Robert Marcial González | Sin categoría | El texto dice "26 de **junio** de 2024". |
| 2024-09-10 | Blog del IPDC – Objetivo del Blog: | (César Núñez, usuario WP) | Generales | El texto coincide casi por completo con la intro de `/blog/`. |
| 2024-09-14 | "LA DESTITUCIÓN DEL PRESIDENTE" (Y OTRAS ALTAS AUTORIDADES) DE JORGE MELGAREJO RAGGINI | — (anuncio) | Eventos, Generales | Presentación de libro, 26/09/2024. **La imagen es un .heic** y la mayoría de los navegadores no la muestran. |
| 2024-09-14 | #conversatorio Las fronteras entre el orden jurídico local y el orden supranacional | — (anuncio) | Eventos, Generales | Conversatorio, 26/09/2024. **Hay un PDF insertado como `<img>`**, que no se ve. |
| 2024-09-21 | EL SUFRIMIENTO DE BETO RIART | Emilio Camacho | Generales, Opiniones | |
| 2024-10-01 | CAMINOS HACIA LA DEMOCRACIA: LECCIONES DE LA UNIÓN EUROPEA Y LATINOAMÉRICA | — (anuncio) | Eventos, Generales | VIII Seminario Jean Monnet, 14 al 16/10/2024. |
| 2024-10-04 | Paraguay: Sistema de partidos y democracia en perspectiva | Camilo Filártiga | Sin categoría | |
| 2024-10-10 | POLíTICAMENTE PERVERSO Y CONSTITUCIONALMENTE ILEGíTIMO | Robert Marcial González | Artículos, Opiniones | La "í" minúscula dentro de un título en mayúsculas viene del original. |
| 2024-11-05 | El cantar de un Ruiseñor (Homenaje al Maestro Diego Valadés) | Robert Marcial González | Artículos, Opiniones | |
| 2024-11-09 | Ejercitar la esperanza ante la indolencia del burócrata | Robert Marcial González | Artículos, Opiniones | |
| 2024-11-20 | Roberto Gargarella en Paraguay: Jornadas de Debate sobre Derecho Constitucional | — (anuncio) | Eventos, Generales | Jornadas del 27 y 28/11/2024. |
| 2024-11-20 | Breve reseña sobre el capítulo de Paraguay en el volumen "Constitutional Reasoning in Latin America and the Caribbean" editado por Johanna Fröhlich | María José García Ascolani y Juan Pablo Irrazabal | Artículos, Opiniones | **Las notas al pie apuntan a `applewebdata://`** (se pegó desde Apple Notes/Pages), así que están rotas. Tiene además 1 imagen .heic. |
| 2025-04-29 | PECADO DE VANIDAD | Robert Marcial González | Todas | |
| 2025-06-07 | RÉQUIEM PARA UN DEMÓCRATA | Robert Marcial González | Todas | |
| 2025-06-07 | AUTORES MATERIALES, AUTORES MORALES Y CÓMPLICES | Robert Marcial González | Todas | |
| 2025-06-07 | ¿La hará cumplir? | Manuel Riera D. | Todas | |
| 2025-08-10 | UN APLAUSO PARA EL CIRUJANO DEL CARTISMO | Robert Marcial González | Todas | La entrada más reciente. |

"Todas" = Artículos, Eventos, Generales, Opiniones y Sin categoría a la vez. **Las categorías de WordPress se aplicaron de forma inconsistente**: hay artículos de opinión marcados como "Eventos".

### Otras URLs

- `/category/{articulos,eventos,generales,opiniones,sin-categoria}/`: archivos de categoría.
- `/helpie_faq/` y `/helpie_faq/{8 slugs}/`: fichas individuales del acordeón de "Qué hacemos", con el sidebar del blog. Duplican contenido.
- `/author/eipdc/`: archivo del autor "Editor Blog IPDC".

---

## 4. Archivos descargados a `/public`

Las variantes de tamaño de WordPress (`-300x200`, `-1024x683`, etc.) se descartaron: Astro genera sus propios tamaños y formatos. Tampoco se guardaron los originales sin escalar de 6 a 26 MB de las fotos de cabecera; se conservan las versiones `-scaled` de 2560 px que usaba el sitio. Total en `/public`: ~50 MB.

### PDFs (12)

| Archivo | Uso | Páginas | Peso |
|---|---|---|---|
| `2021/04/constitucion.pdf` | Constitución de 1992 (español) | 128 | **18,6 MB** |
| `2021/04/Leiguasu_edicion_Decidamos.pdf` | Constitución de 1992 (guaraní), edición Decidamos | 143 | 543 KB |
| `2021/04/CN_1967-.pdf` | Constitución de 1967 | 32 | 229 KB |
| `2021/04/CN_1940-.pdf` | Constitución de 1940 | 12 | 129 KB |
| `2021/04/CN_1870-.pdf` | Constitución de 1870 | 20 | 143 KB |
| `2021/04/CN_1844.pdf` | Ley que establece la Administración Política de la República del Paraguay de 1844 | 8 | 109 KB |
| `2025/05/anuario-indice-2020.pdf` | Índice del Anuario 2020 | 9 | 42 KB |
| `2025/05/Indice-Anuario-IPDC-2021.pdf` | Índice del Anuario 2021 | 3 | 1,6 MB |
| `2025/05/Anuario-IPDC-Indice-2022.pdf` | Índice del Anuario 2022 | 7 | 43 KB |
| `2025/05/Indice-Anuario-IPDC-2023.pdf` | Índice del Anuario 2023 | 3 | 1,2 MB |
| `2025/06/ANUARIO-PARAGUAYO.pdf` | "Anuario 2024" (índice) | 3 | **20,2 MB** para 3 páginas |
| `2024/09/CONVERSATORIO-CIUDADANO-1-1.pdf` | Flyer del conversatorio (entrada del blog) | 1 | 803 KB |

Los dos PDFs de ~20 MB son muy pesados para celular. Se pueden recomprimir sin pérdida visible, pero no lo hago sin tu OK porque altera el archivo original.

### Imágenes

| Archivo | Uso |
|---|---|
| `2021/03/cropped-Captura-de-Pantalla-2021-03-10-a-las-17.34.45.png` (512×512) | **Logo**, recorte cuadrado; de ahí salen los favicons |
| `2021/03/Captura-de-Pantalla-2021-03-10-a-las-17.34.45.png` (118×125) | Logo del header y del footer, **muy chico**: una captura de pantalla |
| `2021/11/Captura-de-…-removebg-preview.png` | Logo sin fondo (sidebar y "Organizadores") |
| `2021/03/Cabildo-scaled.jpg` | Portada de la home |
| `2021/04/Palacio-Rf.jpg` | Fondo del segundo bloque de la home |
| `2021/03/BNF.jpg` | El Instituto (fondo) |
| `2021/03/banner-.png` | Banner "IDPC es el Capítulo Paraguayo del IIDC" (El Instituto) y OG por defecto. **La imagen dice "IDPC"**, un error de tipeo. |
| `2021/03/Cabildo-R-scaled.jpg` | Reseña histórica |
| `2021/03/Puerto-scaled.jpg` | Qué hacemos |
| `2021/03/Centro-historico-scaled.jpg` | Autoridades |
| `2021/03/Panteon-scaled.jpg` | Constitución de 1992 |
| `2021/04/Catedral-R-1-scaled-….jpg` | Constituciones anteriores |
| `2021/03/Palacio-R-scaled-….jpg` | Página huérfana `/lopez-palace-in-window/` |
| `2021/04/La-Ley_Anuario-de-Derecho_TW.jpg` | Tapa/banner del Anuario (Publicaciones) |
| `2021/11/evento-IPDC.png`, `2021/11/dia-1.png` | Carátulas de video del I Congreso |
| `2021/11/logo-1.png` (IIDC), `logo_v1.png` (La Ley), `logo-csj.png`, `senadores.png`, `presidencia-logo-….png`, `camara_diputados.png`, `mdp-2019._WEBpng.png` | Logos de organizadores, auspiciantes y declaraciones de interés del I Congreso |
| `2021/08/Robert-Gonzalez-foto-….png`, `2024/09/Emilio_Camacho-….png`, `2024/10/WhatsApp_Image_…-2.png`, `2024/11/Foto_mjga-….png`, `2024/11/IMG_8550-….png`, `2025/06/Mane-Riera.png` | Fotos de autores del blog |
| `2024/11/ROBERTO-GARGARELLA-1.jpg` | Entrada sobre Gargarella |
| `2025/06/Captura-de-pantalla-2025-06-07-….png` | Captura dentro de "¿La hará cumplir?" |
| `2024/09/PHOTO-…heic`, `2024/11/tempImageMX1ek0.heic` | **HEIC, que no se ve en Chrome ni Firefox.** Hay que convertirlas a JPG/WebP en la migración. |

Ninguna imagen del sitio tiene texto alternativo (`alt=""` en todas).

### No descargados (externos, se mantienen como enlaces)

`bacn.gov.py` (Enmienda y debates de la Convención), `mre.gov.py` (Reglamento de 1813), Google Drive (programa del Congreso), Google Forms (inscripción), YouTube, `iidc.juridicas.unam.mx`, `law.yale.edu` (SELA), `laley.com.py`, `bloomsbury.com`. Hay también una imagen del tema demo `anarieldesign.com/…/logo10-1.jpg` en el sidebar del blog, que no corresponde al IPDC y no se migra.

---

## 5. Footer y redes

Footer actual, textual: `Email: ipdc.py@gmail.com · IPDC, ASUNCIÓN - PARAGUAY · REDES SOCIALES · © IPDC 2021 DERECHOS RESERVADOS © by CÓMO ESTRATEGIA DIGITAL`

| Red | URL | Estado |
|---|---|---|
| Facebook | https://www.facebook.com/InstitutoParaguayoDeDerechoConstitucional/ | 200 |
| X/Twitter | https://twitter.com/ipdcpy → se usará `https://x.com/ipdcpy` | 200 |
| YouTube | https://www.youtube.com/channel/UCGSwBb9-8_au04jRklabU9w | 200 |
| Instagram | https://www.instagram.com/comodigitalpy/ | **No es del IPDC**: es el crédito de la agencia "Cómo Estrategia Digital". No se incluye como red del IPDC. |

Videos de YouTube en `/eventos/`: `eUGaK0uTATo` (flashes / resumen del Congreso), `wlUnbaEiJIU` (palabras del Presidente y del miembro fundador), `xt2slveo5Eg` (día 1), `sH8JqMN61UA` (día 2).

---

## 6. Problemas encontrados en el sitio actual

**Enlaces rotos**
- `mre.gov.py/…/Reglamento Gobierno del 12 de Octubre de 1813.pdf` → **404**. Hay que conseguir otra fuente o el PDF.
- Programa del I Congreso en Google Drive → **404**.
- Formulario de inscripción al I Congreso (Google Forms): el evento ya pasó.
- `laley.com.py` (406) y `bloomsbury.com` (403) bloquean bots; en el navegador probablemente funcionan.
- Las notas al pie `applewebdata://` de la reseña de Fröhlich y de "El sufrimiento de Beto Riart" están rotas.

**Errores de tipeo en el original.** Se migran tal cual salvo que indiques corregirlos:
- "IDPC" en lugar de "IPDC": dos veces en "Qué hacemos" (Congresos…, Fomentar el interés…) y en la imagen `banner-.png`.
- "Seall-Sasiain" (Reseña histórica) vs. "Seall-Sasain" (Miembros, In Memoriam).
- "Whittinglsow" (página Blog) vs. "Whittingslow" (Autoridades y Miembros).
- Comisión Directiva 2025-2028 con nombres en minúscula: "manuel riera", "adriana marecos", "giovanna parini", "jorge melgarejo".
- "José Torales" (Autoridades) vs. "Torales, Jose Luis" (Miembros).
- Faltan espacios después del punto en varios ítems de "Qué hacemos" ("internacional.Entre éstos", "comparado.Para dicho fin", etc.). Son párrafos que el acordeón unió.

**Contenido duplicado u obsoleto**
- `/lopez-palace-in-window/`, `/home/3980-2/`, `/helpie_faq/*` y el post `make-me-happy`: duplicados. Propuesta: no migrarlos y redirigir con 301.
- La entrada "Blog del IPDC – Objetivo del Blog" repite la intro de `/blog/`.
- `/contact/` solo tiene el formulario de newsletter de Mailchimp.
- `/eventos/` presenta un evento de 2021 como si fuera vigente. Los eventos posteriores (2024) se publicaron como entradas del blog.

---

## 7. Texto completo de las páginas

Transcripción literal. El mismo texto, con frontmatter, está en `migration/pages/`. Los rótulos internos del tema ("Panel 1") y el markup del acordeón se limpiaron; las palabras no se tocaron.


### `/` — Instituto Paraguayo de Derecho Constitucional


![](https://ipdc.org.py/wp-content/uploads/2021/03/Cabildo-scaled.jpg)

#### Instituto Paraguayo de Derecho Constitucional

Trabajamos para promover el conocimiento y el intercambio de ideas sobre el derecho constitucional como una manera de contribuir al fortalecimiento de la democracia en Paraguay


##### promoción y difusión del conocimiento del derecho constitucional

El Instituto Paraguayo de Derecho Constitucional (IPDC) es una entidad académica que aspira a ser líder en Paraguay en materia de promoción y difusión del conocimiento del derecho constitucional.

Su objetivo es generar espacios para el intercambio de ideas y el desarrollo del derecho constitucional en el país, de manera a robustecer el debate público en torno a la Constitución.

De esta forma, el IPDC pretende contribuir a consolidar la democracia constitucional y la vigencia de los derechos fundamentales en Paraguay.

[CONOCER MAS ➔](https://ipdc.org.py/institute/)

---

### `/institute/` — El Instituto



##### El Instituto

El Instituto Paraguayo de Derecho Constitucional (IPDC) es una entidad académica, de carácter privada, independiente y apartidaria, sin fines de lucro, que tiene por objeto promover el debate y la reflexión al más alto nivel en torno a temas vinculados al derecho constitucional.

Para dicho fin, el IPDC organiza charlas y encuentros de carácter académico, así como publicaciones científicas en materia de derecho constitucional, entre otras actividades afines. Además, promueve la educación ciudadana y la participación de jóvenes estudiantes en temas de impronta constitucional.

El IPDC se halla comprometido con la plena vigencia de la democracia, los derechos fundamentales y el Estado de derecho.

Fundado en 1999, el IPDC es el capítulo paraguayo del Instituto Iberoamericano de Derecho Constitucional.

[![](https://ipdc.org.py/wp-content/uploads/2021/03/banner--1024x412.png)](https://iidc.juridicas.unam.mx/index.php)

---

### `/about/` — Reseña histórica


![](https://ipdc.org.py/wp-content/uploads/2021/03/Cabildo-R-scaled.jpg)

#### Reseña histórica

El Instituto Paraguayo de Derecho Constitucional (IPDC) fue fundado el 11 de mayo de 1999, por un grupo de juristas paraguayos con especial interés en el derecho constitucional, y comprometidos con la vigencia de la Constitución, el Estado de derecho y la consolidación de la democracia.

De esta forma, constituyeron una asociación con el fin de aglutinar a juristas, catedráticos y abogados con idéntico compromiso y que tuviesen interés en promover el estudio, la investigación y la divulgación del derecho constitucional general, nacional y comparado.

En el año 2003, el IPDC se afilió al Instituto Iberoamericano de Derecho Constitucional (IIDC), participando así en los diversos congresos internacionales que reúne al constitucionalismo iberoamericano bajo los auspicios del IIDC.

A lo largo de los años y a través de su presencia en foros nacionales e internacionales, el IPDC fue consolidándose como un espacio académico de prestigio para la discusión rigurosa y científica de temas relativos al derecho constitucional en Paraguay.

El IPDC fue presidido desde su fundación por el Dr. Jorge Seall-Sasiain, destacado constitucionalista paraguayo, hasta su fallecimiento, acaecido en el 2019.

A partir de entonces, asumió una nueva Comisión Directiva, que se encuentra impulsando un proceso de renovación institucional del IPDC.

---

### `/activities/` — Qué hacemos


![](https://ipdc.org.py/wp-content/uploads/2021/03/Puerto-scaled.jpg)

#### Qué hacemos

El IPDC es una entidad de carácter académica, independiente y apartidaria. Todas sus actividades son presididas por estos principios, además del pluralismo, el rigor científico y la integridad académica, entre otros.

Algunas de las actividades que el IPDC lleva a cabo a fin de promover el conocimiento y el estudio del derecho constitucional son las siguientes:

###### Qué hacemos FAQ

-   ##### Congresos, seminarios y charlas
    
    El IPDC organiza y apoya la realización de congresos, seminarios, conferencias y charlas sobre temas variados del derecho constitucional, ya sean de derecho constitucional paraguayo, extranjero o comparado.Para dicho fin, el IPDC forja alianzas con distintos actores estratégicos, a nivel local e internacional. El IDPC también genera espacios para discutir, entre sus Miembros o de manera abierta al público general, obras o trabajos de investigación relevantes dedicados al derecho constitucional.
    
-   ##### Cursos
    
    El IPDC apoya la organización de cursos con universidades y distintos centros de formación y educación continua, tanto a nivel nacional como internacional.Entre éstos, destacan la Especialización en Justicia Constitucional y Derechos Humanos, organizado por la Universidad de Bolonia y el Instituto para el Desarrollo Constitucional, además de varios otros eventos de alto nivel académico.
    
-   ##### Análisis de la realidad constitucional y fomento de la deliberación pública
    
    El IPDC organiza encuentros para analizar la situación constitucional del país, abiertos al público en general, con miras a robustecer el debate y la deliberación pública sobre temas relevantes desde un punto de vista constitucional.
    
-   ##### Publicaciones e investigación
    
    Desde el año 2020, el IPDC publica anualmente el Anuario Paraguayo de Derecho Constitucional.Se trata de la primera publicación periódica sobre la materia del país, en la cual participan algunos de los más renombrados juristas nacionales, además de autores extranjeros. Para conocer más sobre el Anuario Paraguayo de Derecho Constitucional, [haga click aquí](http://ipdc.org.py/publications/).
    
-   ##### Concursos de investigación
    
    El IPDC organiza concursos de monografías sobre derecho constitucional con el fin de fomentar la investigación entre jóvenes estudiantes y abogados, y despertar en ellos una vocación de estudio hacia esta rama del derecho.
    
-   ##### Capítulo paraguayo del IIDC
    
    El IPDC es el capítulo paraguayo del Instituto Iberoamericano de Derecho Constitucional, la entidad de su género más importante a nivel iberoamericano en materia de derecho constitucional, presidida actualmente por el Prof. Dr. Diego Valadés.El IIDC cuenta con más de 20 capítulos nacionales.
    
    [Conoce más sobre el IIDC.](https://iidc.juridicas.unam.mx/)
    
-   ##### Punto focal del Seminario en Latinoamérica de Teoría Constitucional y Política
    
    El IPDC constituye en Paraguay el punto focal del Seminario en Latinoamérica de Teoría Constitucional y Política (SELA) de la prestigiosa Universidad de Yale.  Cada año, Miembros del IPDC participan del encuentro anual del SELA.
    
    [Conocer más sobre el SELA.](https://law.yale.edu/centers-workshops/yale-law-school-latin-american-legal-studies/sela/program-overview)
    
-   ##### Fomentar el interés de los jóvenes por el estudio del derecho constitucional
    
    A través de su programa de reclutamiento, el IDPC fomenta la inclusión de jóvenes paraguayos como Miembros o invitados, a fin de incentivar un mayor interés por el estudio del derecho constitucional en el país.De esta forma, buscamos aprovechar el enorme talento de una nueva generación de paraguayos que tienen nuevas ideas y perspectivas que aportar al derecho constitucional.
    

##### DEJE SU CORREO Y ENTÉRESE

###### DE LAS ACTIVIDADES DEL IPDC

---

### `/autorities/` — Autoridades


![](https://ipdc.org.py/wp-content/uploads/2021/03/Centro-historico-scaled.jpg)

#### Autoridades

La Asamblea, integrada por todos los Miembros, es la máxima autoridad del IPDC.  El órgano ejecutivo es la Comisión Directiva, compuesta de la siguiente forma:

##### Comisión Directiva (2025-2028)

###### Robert Marcial González

Presidente

###### Elodia Almirón

Vice-Presidenta

###### José Torales

Vocal Titular

###### manuel riera

Secretario General

###### adriana marecos

Vocal Titular

###### Juan Carlos Mendonca Bonnet

Vocal Suplente

###### giovanna parini

Vocal Suplente

###### jorge melgarejo

Síndico

###### Laura Whittingslow

Tesorera

##### Comisión Directiva (2022-2025)

###### Robert Marcial González

Presidente

###### Elodia Almirón

Vice-Presidenta

###### Lourdes Peroni

Vocal Titular

###### José Torales

Vocal Titular

###### Giovanna Parini

Vocal Titular

###### Juan Carlos Mendonca Bonnet

Vocal Suplente

###### Emilio Camacho

Vocal Suplente

###### Alberto Poletti

Síndico

###### Laura Whittingslow

Tesorera

##### Comisión Directiva (2019-2022)

###### Diego Moreno Rodríguez-Alcalá

Presidente

###### Fátima Andrada Pasmor

Vice-Presidenta

###### Enrique Marín Fontclara

Vocal Titular

###### Adriana Marecos

Vocal Titular

###### Raúl Sapena Brugada (+)

Vocal Titular

###### Juan Carlos Mendonca Bonnet

Vocal Titular

###### María Inés Ramírez

Vocal Suplente

###### Robert Marcial González

Síndico

###### Giovanna Parini

Tesorera

---

### `/members/` — Miembros


#### Miembros

El IPDC se halla integrado por algunos de los más renombrados estudiosos e investigadores del derecho constitucional del país.

Entre sus miembros se encuentran académicos, convencionales de la constituyente de 1992, magistrados, ex Ministros de la Corte Suprema de Justicia, ex congresistas e investigadores.

###### Lista de miembros

-   Alonso, Gonzalo
-   Andrada, Fátima
-   Almirón, Elodia
-   Apud, Habib
-   Ayala, Eusebio Ramón
-   Bóveda, Gustavo
-   Cabral, José María
-   Camacho, Emilio
-   Campos Cervera, Rodrigo
-   Canteros, Fermín
-   Cristaldo, Renzo
-   Escobar, Ariana 
-   Filártiga, Camilo
-   Filizzola, Rafael
-   Franco, Shirley
-   Fretes Carreras, Luis
-   Gamarra, Paula
-   Gaona Irún, Nicolás
-   González, Robert Marcial
-   Laterza, Gustavo
-   Lezcano Claude, Luis
-   Marecos, Adriana
-   Marín Fontclara, Enrique
-   Melgarejo, Jorge 

-   Mendonca, Daniel
-   Mendonca, Juan Carlos
-   Moreno, Diego
-   Palacios, Juan Martín
-   Parini, Giovanna
-   Paz Castaing, Mario
-   Peroni, Lourdes
-   Poletti, Alberto
-   Ramos Reyes, Mario
-   Ramírez, María Inés
-   Riera Domínguez, Manuel
-   Rodriguez Servín, Omar
-   Rojas, Gustavo
-   Ruíz, Verónica
-   Ruíz Díaz Labrano, Roberto
-   Sandoval, Alberto
-   Sapena, Josefina
-   Silvero, Jorge
-   Torales, Jose Luis
-   Villalba Bernié, Pablo
-   Whittingslow, Laura
-   Zavala, Diego

###### In Memoriam (+)

-   Becker, Gustavo
-   Callizo Nicora, Federico
-   Seall-Sasain, Jorge
-   Sapena Brugada, Raúl

[REQUISITOS PARA SER MIEMBRO](https://ipdc.org.py/member_requirements/)

---

### `/member_requirements/` — Conoce los requisitos para ser Miembro del IPDC


#### Conoce los requisitos para ser Miembro del IPDC

Toda persona que desee incorporarse como miembro activo del IPDC debe ser propuesta por dos miembros, y luego debe presentar una solicitud de ingreso, indicando sus datos personales junto con una copia autenticada de su documento de identidad personal.

El postulante debe gozar de buena reputación y no tener intereses contrarios a la entidad. Además, debe acreditar de manera documentada el cumplimiento de los siguientes requisitos:

1.  #### Ser propuesto por al menos dos miembros activos del IPDC.
    
2.  #### Ser egresado de la carrera de abogacía, con al menos 5 años de antigüedad.
    
3.  #### Justificar versación en la disciplina constitucional con:
    

-   **a)** Al menos 2 publicaciones de jerarquía en materia de Derecho Constitucional.
-   **b)** Cursos de post grado relacionados con el Derecho Constitucional, que consistan en Doctorado, Maestría, Especialización o Diplomados.
-   **c)** El ejercicio de la cátedra universitaria en materia de Derecho Constitucional por al menos cinco años.

El candidato es posteriormente sometido a un proceso de admisión según el Reglamento del IPDC.

Para más información, escríbenos al [email](<mailto:ipdc.py@gmail.com?subject = Feedback&body = Requisitos para ser miembro del IPDC>) .

---

### `/publications/` — Publicaciones


#### Publicaciones

###### Anuario Paraguayo de Derecho Constitucional

![](https://ipdc.org.py/wp-content/uploads/2021/04/La-Ley_Anuario-de-Derecho_TW.jpg)

Desde el año 2020, el Instituto Paraguayo de Derecho Constitucional publica anualmente el _Anuario Paraguayo de Derecho Constitucional_, en colaboración con la editorial La Ley y el Instituto Iberoamericano de Derecho Constitucional. Esta serie —única en el país— reúne capítulos de excelencia sobre temas clave del derecho constitucional paraguayo, con el aporte de reconocidos especialistas nacionales y autores extranjeros.

El _Anuario_ constituye el principal aporte del IPDC a la construcción y promoción de  una doctrina constitucional rigurosa, plural y comprometida con los principios democráticos, los derechos fundamentales y el Estado de derecho. Cada volumen busca trascender los modelos tradicionales del derecho constitucional en Paraguay, privilegiando el análisis crítico, el diálogo entre pares y la producción académica independiente.

Por su calidad académica y la relevancia de los temas abordados, el _Anuario_ se ha consolidado como una referencia indispensable para estudiantes, docentes, magistrados y profesionales del derecho constitucional en Paraguay.

A continuación, se pueden consultar los índices completos de las ediciones publicadas:

-   [**Anuario 2020**](https://ipdc.org.py/wp-content/uploads/2025/05/anuario-indice-2020.pdf)
-   [**Anuario 2021**](https://ipdc.org.py/wp-content/uploads/2025/05/Indice-Anuario-IPDC-2021.pdf)
-   [**Anuario 2022**](https://ipdc.org.py/wp-content/uploads/2025/05/Anuario-IPDC-Indice-2022.pdf)
-   [**Anuario 2023**](https://ipdc.org.py/wp-content/uploads/2025/05/Indice-Anuario-IPDC-2023.pdf)
-   [**Anuario 2024**](https://ipdc.org.py/wp-content/uploads/2025/06/ANUARIO-PARAGUAYO.pdf)

Para adquirir un ejemplar, ingresá a [www.laley.com.py](http://laley.com.py) o escribí a [contacto@laley.com.py](mailto:contacto@laley.com.py).

##### Entradas recientes

-   [UN APLAUSO PARA EL CIRUJANO DEL CARTISMO](https://ipdc.org.py/2025/08/10/un-aplauso-para-el-cirujano-del-cartismo/) 10 agosto, 2025
-   [¿La hará cumplir?](https://ipdc.org.py/2025/06/07/la-hara-cumplir/) 7 junio, 2025
-   [AUTORES MATERIALES, AUTORES MORALES Y CÓMPLICES](https://ipdc.org.py/2025/06/07/autores-materiales-autores-morales-y-complices/) 7 junio, 2025
-   [RÉQUIEM PARA UN DEMÓCRATA](https://ipdc.org.py/2025/06/07/requiem-para-un-democrata/) 7 junio, 2025
-   [PECADO DE VANIDAD](https://ipdc.org.py/2025/04/29/pecado-de-vanidad/) 29 abril, 2025

##### Sobre el IPDC

![](https://ipdc.org.py/wp-content/uploads/2021/11/Captura-de-Pantalla-2021-03-10-a-las-17.34.45-removebg-preview.png)

Trabajamos para promover el conocimiento y el intercambio de ideas sobre el Derecho Constitucional como una manera de contribuir al fortalecimiento de la democracia en Paraguay.

![](http://www.anarieldesign.com/themedemos/liberlite/wp-content/uploads/2017/06/logo10-1.jpg)

##### Resumen del I Congreso Paraguayo de Derecho Constitucional

[https://www.youtube.com/watch?v=eUGaK0uTATo](https://www.youtube.com/watch?v=eUGaK0uTATo)

---

### `/constitution/` — Constitución de 1992


![](https://ipdc.org.py/wp-content/uploads/2021/03/Panteon-scaled.jpg)

#### Constitución de 1992

La Constitución de la República del Paraguay de 1992 es generalmente reconocida como la más democrática en la historia del país. La Constitución contribuyó a fortalecer la transición a la democracia y a instaurar un régimen de libertades públicas en el Paraguay, proceso que se había iniciado en 1989 con la caída de la dictadura militar.

La Constitución dispone que el Paraguay se constituye en un Estado social de derecho y que adopta para su gobierno la democracia representativa, participativa y pluralista. Reconoce a la dignidad humana como el fundamento del orden constitucional.

El Paraguay es un Estado unitario que, conforme al principio de división de poderes, cuenta con un Poder Legislativo dividido en una Cámara de Senadores y una Cámara de Diputados, un Poder Ejecutivo ejercido por el Presidente de la República y un Poder Judicial a cuya cabeza se encuentra la Corte Suprema de Justicia. En Paraguay rige un sistema presidencial de gobierno.

La Constitución se halla dividida en dos partes. La primera de ellas consagra un amplio catálogo de derechos fundamentales que abarcan no solo los tradicionales derechos políticos y civiles, sino también los derechos sociales, económicos, culturales y ambientales. Además, se reconocen derechos de determinados grupos históricamente discriminados, como los pueblos indígenas y se establecen protecciones especiales para sectores vulnerables. A la declaración de derechos se le suma un sistema de garantías judiciales.

La segunda parte de la Constitución establece la estructuración del Estado y su organización territorial. A la tradicional división tripartita del poder, se añaden algunos órganos extra poder, así como una estructura de descentralización política y territorial. Se establece, asimismo, que el Paraguay admite un orden jurídico supranacional acorde a la vigencia de los derechos humanos.

La Constitución fue enmendada en el año 2011 para permitir el voto de los paraguayos residentes en el extranjero.

[Para acceder a la Constitución de 1992.](https://ipdc.org.py/wp-content/uploads/2021/04/constitucion.pdf)

[Para acceder a la Constitución de 1992 (Guaraní).](https://ipdc.org.py/wp-content/uploads/2021/04/Leiguasu_edicion_Decidamos.pdf)

[Enmienda a la Constitución de 1992.](https://www.bacn.gov.py/ENMIENDA_CONSTITUCIONAL_N_1.pdf)

[Conoce más sobre los debates que llevaron a la adopción de la Constitución de 1992.](https://www.bacn.gov.py/constitucion/indicegral.html)

---

### `/others_constitutions/` — Constituciones y documentos políticos anteriores del Paraguay


![](https://ipdc.org.py/wp-content/uploads/2021/04/Catedral-R-1-scaled-e1618405183925.jpg)

#### Constituciones y documentos políticos anteriores del Paraguay

[Constitución de 1967](https://ipdc.org.py/wp-content/uploads/2021/04/CN_1967-.pdf)

[Constitución de 1940](https://ipdc.org.py/wp-content/uploads/2021/04/CN_1940-.pdf)

[Constitución de 1870](https://ipdc.org.py/wp-content/uploads/2021/04/CN_1870-.pdf)

[Ley Que Establece la Administración Política de la República del Paraguay de 1844](https://ipdc.org.py/wp-content/uploads/2021/04/CN_1844.pdf)

[Reglamento de Gobierno de 1813](https://www.mre.gov.py/v2/Adjuntos/Bicentenario18132013/Biblioteca%20Virtual/Reglamento%20Gobierno%20del%2012%20de%20Octubre%20de%201813.pdf)

---

### `/eventos/` — Eventos


#### Eventos

##### I CONGRESO PARAGUAYO DE DERECHO CONSTITUCIONAL

[](https://drive.google.com/file/d/1i1KxPwa4MuHjy1i_JsNJsl0X0-JHklPJ/view?usp=sharing)

###### [Descarga el programa](https://drive.google.com/file/d/1i1KxPwa4MuHjy1i_JsNJsl0X0-JHklPJ/view?usp=sharing)

[Facebook](https://www.facebook.com/InstitutoParaguayoDeDerechoConstitucional/) [Twitter](https://twitter.com/ipdcpy) [Youtube](https://www.youtube.com/channel/UCGSwBb9-8_au04jRklabU9w)

###### Flashes del evento

###### Asunción

César López Moreira 850 c/ Papa Juan XXIII. Detrás del Shopping del Sol.

###### 24 Y 25

De noviembre del 2021.

###### Modalidad

Virtual y Presencial (**aforo limitado**).

De qué se trata

##### 29 años despues de la Constitución de 1992

29 años después, ¿qué avances y estancamientos presenta dicha estructura normativa de principios y derechos? Para algunos, la Constitución presenta déficits de origen, en la forma en cómo quedaron organizados los principios y sus componentes, lo cual repercutió en el proceso político de implementación constitucional. Para otros, la interpretación y aplicación de las normas constitucionales es más un problema de la escasa cultura política democrática y de la real politik, que frenan un armónico y eficiente desarrollo normativo constitucional.

Pero ambas posiciones estarían probablemente evidenciando, de una u otra manera, aquello que caracteriza al constitucionalismo latinoamericano, la existencia de una brecha entre la norma y la realidad. El I Congreso de Derecho Constitucional organizado por el Instituto Paraguayo de Derecho Constitucional (IPDC) deliberará sobre dichas problemáticas.

###### Palabras del Presidente del IPDC, el Dr. Diego Moreno y del miembro fundador, Dr. Gustavo Laterza.

[INSCRIBIRME](https://forms.gle/mV4mx36zzWbK858M6)

##### el evento

##### día 1

##### día 2

Nuestros Aliados

##### Organizan y apoyan

##### Organizadores:

[![](https://ipdc.org.py/wp-content/uploads/2021/11/Captura-de-Pantalla-2021-03-10-a-las-17.34.45-removebg-preview.png)](https://ipdc.org.py/)

[![](https://ipdc.org.py/wp-content/uploads/2021/11/logo-1.png)](https://iidc.juridicas.unam.mx/)

##### Auspiciante y sede:

[![](https://ipdc.org.py/wp-content/uploads/2021/11/logo_v1-300x99.png)](https://www.laley.com.py/)

Declaraciones

##### DECLARADO DE Interés INSTITUCIONAL POR:

![](https://ipdc.org.py/wp-content/uploads/2021/11/logo-csj.png)

![](https://ipdc.org.py/wp-content/uploads/2021/11/senadores.png)

![](https://ipdc.org.py/wp-content/uploads/2021/11/presidencia-logo-header-b2692a4e38c3e2c58129694ab95d6c18.png)

![](https://ipdc.org.py/wp-content/uploads/2021/11/camara_diputados.png)

![](https://ipdc.org.py/wp-content/uploads/2021/11/mdp-2019._WEBpng.png)

---

### `/blog/` — Blog


#### Blog

##### El Blog del IPDC

El Blog del Instituto Paraguayo de Derecho Constitucional tiene como objetivo principal iniciar y fomentar un diálogo plural, crítico, abierto y respetuoso sobre el derecho constitucional. Este espacio se ha establecido como un foro donde los miembros y otros juristas invitados pueden compartir libremente sus opiniones, reflexiones y análisis sobre temas de derecho constitucional, manteniendo el rigor analítico que caracteriza a nuestra institución pero en un formato más accesible.

**Las opiniones y puntos de vista expresados en este blog son exclusivamente responsabilidad de los autores y no representan de ninguna manera la posición oficial del Instituto Paraguayo de Derecho Constitucional, ni la de su Comisión Directiva.**

##### [UN APLAUSO PARA EL CIRUJANO DEL CARTISMO](https://ipdc.org.py/2025/08/10/un-aplauso-para-el-cirujano-del-cartismo/)

[Editor Blog IPDC](https://ipdc.org.py/author/eipdc/)

•

10 agosto, 2025

por Robert Marcial González. 10 de agosto de 2025 El revuelo suscitado por la valiente investigación periodística que puso al descubierto que una …

##### [¿La hará cumplir?](https://ipdc.org.py/2025/06/07/la-hara-cumplir/)

[Editor Blog IPDC](https://ipdc.org.py/author/eipdc/)

•

7 junio, 2025

por Manuel Riera D.  7 de junio de 2025 El 14 de febrero de 2024, la senadora Kattya Mabel González Villanuevaperdió su investidura. …

##### [AUTORES MATERIALES, AUTORES MORALES Y CÓMPLICES](https://ipdc.org.py/2025/06/07/autores-materiales-autores-morales-y-complices/)

[Editor Blog IPDC](https://ipdc.org.py/author/eipdc/)

•

7 junio, 2025

por Robert Marcial González. 6 de junio de 2025 En memoria de Fernanda Benítez (+) y Fernando Báez Sosa (+) El atroz crimen …

##### [RÉQUIEM PARA UN DEMÓCRATA](https://ipdc.org.py/2025/06/07/requiem-para-un-democrata/)

[Editor Blog IPDC](https://ipdc.org.py/author/eipdc/)

•

7 junio, 2025

por Robert Marcial González. 26 de mayo de 2025 – En memoria de Don Guillermo Caballero Vargas – Condicionada por su convulsa historia signada por …

##### [PECADO DE VANIDAD](https://ipdc.org.py/2025/04/29/pecado-de-vanidad/)

[Editor Blog IPDC](https://ipdc.org.py/author/eipdc/)

•

29 abril, 2025

por Robert Marcial González. 27 de abril de 2025 El fortalecimiento de la Democracia Constitucional depende, en gran medida, de la capacidad que …

##### [Breve reseña sobre el capítulo de Paraguay en el volumen “Constitutional Reasoning in Latin America and the Caribbean” editado por Johanna Fröhlich](https://ipdc.org.py/2024/11/20/breve-resena-sobre-el-capitulo-de-paraguay-en-el-volumen-constitutional-reasoning-in-latin-america-and-the-caribbean-editado-por-johanna-frohlich/)

[Editor Blog IPDC](https://ipdc.org.py/author/eipdc/)

•

20 noviembre, 2024

Por María José García Ascolani\* y Juan Pablo Irrazabal\* \* Nociones preliminares El capítulo sobre la jurisprudencia de la Corte Suprema de Justicia del …

##### [Roberto Gargarella en Paraguay: Jornadas de Debate sobre Derecho Constitucional](https://ipdc.org.py/2024/11/20/roberto-gargarella-en-paraguay-jornadas-de-debate-sobre-derecho-constitucional/)

[Editor Blog IPDC](https://ipdc.org.py/author/eipdc/)

•

20 noviembre, 2024

¡No te pierdas las Jornadas de Debate de Derecho Constitucional con Roberto Gargarella! Únete a una experiencia única con uno de los …

##### [Ejercitar la esperanza ante la indolencia del burócrata](https://ipdc.org.py/2024/11/09/ejercitar-la-esperanza-ante-la-indolencia-del-burocrata/)

[Editor Blog IPDC](https://ipdc.org.py/author/eipdc/)

•

9 noviembre, 2024

por Robert Marcial González. 6 de noviembre de 2024. En un artículo anterior titulado “La indolencia del burócrata”, centramos la aproximación reflexiva y la mirada …

##### [El cantar de un Ruiseñor (Homenaje al Maestro Diego Valadés)](https://ipdc.org.py/2024/11/05/el-cantar-de-un-ruisenor-homenaje-al-maestro-diego-valades/)

[Editor Blog IPDC](https://ipdc.org.py/author/eipdc/)

•

5 noviembre, 2024

por Robert Marcial González. 2 de noviembre de 2024. En medio de la desesperanza que se instala cíclicamente en determinados tramos de la …

##### [POLíTICAMENTE PERVERSO Y CONSTITUCIONALMENTE ILEGíTIMO](https://ipdc.org.py/2024/10/10/politicamente-perverso-y-constitucionalmente-ilegitimo/)

[Editor Blog IPDC](https://ipdc.org.py/author/eipdc/)

•

10 octubre, 2024

por Robert Marcial González. 10 de octubre de 2024. Las devaluadas democracias del tercer mundo comparten muchos lugares comunes: fragilidad institucional, violencia estructural, …

Para más información sobre cómo colaborar con nuestro blog, podés escribirnos al correo [ipdc.py@gmail.com](mailto:ipdc.py@gmail.com) o ponerte en contacto directamente con los Editores: Giovanna Parini, José Luis Torales, o Laura Whittinglsow.

---

### `/contact/` — Contacto


#### Contacto

##### DEJE SU CORREO Y ENTÉRESE

###### DE LAS ACTIVIDADES DEL IPDC

---

## 8. Qué necesito que me confirmes antes de la arquitectura

1. **Inglés:** ¿quién provee la traducción al inglés? Opciones: (a) la traduzco yo como borrador para que el IPDC la revise; (b) el IPDC entrega los textos; (c) `/en` arranca solo con las páginas institucionales y el blog queda en español.
2. **Fotos:** el sitio actual no tiene fotos de Autoridades ni de Miembros. ¿El IPDC las puede enviar? Si no, uso un placeholder sobrio con iniciales.
3. **Logo:** solo existe como captura PNG de 118 px (o 512 px recortado). ¿Hay versión vectorial (SVG/AI/PDF)? Sin eso el header se va a ver borroso en pantallas retina.
4. **Errores de tipeo (§6):** ¿los corrijo o migro todo 100% textual?
5. **Entradas "evento" del blog:** ¿las paso a la colección de Eventos (y dejo el I Congreso 2021 como evento pasado), o las dejo en el blog?
6. **Categorías del blog:** propongo simplificarlas a *Opinión* y *Noticias/Eventos*. ¿OK?
7. **Newsletter:** ¿la cuenta de Mailchimp sigue activa? ¿La mantenemos?
8. **Hosting:** ¿Vercel, Netlify o el hosting del cliente? (Cambia cómo se escriben las redirecciones 301.)
9. **Paleta:** ¿la baso en el logo (rojo ≈ #D7263D y azul ≈ #2E4C9E, los colores de la bandera) o el cliente tiene colores definidos?
10. **Reglamento de 1813:** el enlace del MRE está caído. ¿Tienen el PDF o busco otra fuente oficial?
11. **PDFs de 20 MB:** ¿autorizás recomprimirlos?

> **Actualización (Paso 2):** las preguntas 1-9 y 11 ya tienen respuesta; ver `ARCHITECTURE.md`. Los PDFs pesados fueron recomprimidos y las imágenes HEIC convertidas a JPG, así que los pesos de la tabla de la §4 corresponden a los originales.
