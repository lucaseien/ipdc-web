#!/usr/bin/env python3
"""
Migración única: convierte migration/posts/*.md (texto extraído del WordPress)
en entradas de la colección src/content/blog/es/.

Se deja en el repo como registro de las transformaciones aplicadas al contenido
original. No hace falta volver a ejecutarlo; si se ejecuta, sobrescribe las entradas.

Transformaciones:
- La línea de firma inicial ("por Autor. fecha") y la foto del autor pasan a los
  metadatos (authors, date, authorPhoto); el artículo las muestra en su cabecera.
- Notas al pie rotas (applewebdata://) → notas al pie Markdown [^n].
- Imágenes → archivos locales en src/assets/ (optimizadas por Astro) con texto alternativo.
- Correcciones de tipeo y de fecha acordadas (ARCHITECTURE.md §6 y §8).
"""
import json, re, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / 'migration' / 'posts'
OUT = ROOT / 'src' / 'content' / 'blog' / 'es'
A = '../../../assets'  # ruta relativa desde src/content/blog/es/ a src/assets/

AUTHORS = {
    'Robert Marcial González': f'{A}/autores/robert-marcial-gonzalez.png',
    'Emilio Camacho': f'{A}/autores/emilio-camacho.png',
    'Camilo Filártiga': f'{A}/autores/camilo-filartiga.png',
    'Manuel Riera D.': f'{A}/autores/manuel-riera.png',
}

# slug viejo → (slug nuevo, categoría, autores, fecha del artículo según su firma o corregida; None = fecha de WordPress)
POSTS = {
    'indolencia-burocrata-justicia-paraguay': ('la-indolencia-del-burocrata', 'opinion', ['Robert Marcial González'], '2021-08-15'),
    'autoritarismo-paraguay-derecho-constitucional': ('serviles-al-poder', 'opinion', ['Robert Marcial González'], '2024-07-09'),
    'reflexiones-y-analisis-sobre-temas-de-derecho-constitucional-un-enfoque-accesible': ('la-paja-en-el-ojo-ajeno', 'opinion', ['Robert Marcial González'], '2024-08-21'),
    'democratas-por-fuera-colonialistas-por-dentro': (None, 'opinion', ['Robert Marcial González'], '2024-08-26'),
    'blog-del-ipdc-objetivo-del-blog': (None, 'noticias-y-eventos', [], None),
    'conversatorio-las-fronteras-entre-el-orden-juridico-local-y-el-orden-supranacional': (None, 'noticias-y-eventos', [], None),
    'la-destitucion-del-presidente-y-otras-altas-autoridades-de-jorge-melgarejo-raggini': (None, 'noticias-y-eventos', [], None),
    'el-sufrimiento-de-beto-riart': (None, 'opinion', ['Emilio Camacho'], '2024-09-20'),
    'caminos-hacia-la-democracia-lecciones-de-la-union-europea-y-latinoamerica': (None, 'noticias-y-eventos', [], None),
    'paraguay-sistema-de-partidos-y-democracia-en-perspectiva': (None, 'opinion', ['Camilo Filártiga'], '2024-10-04'),
    'politicamente-perverso-y-constitucionalmente-ilegitimo': (None, 'opinion', ['Robert Marcial González'], '2024-10-10'),
    'el-cantar-de-un-ruisenor-homenaje-al-maestro-diego-valades': (None, 'opinion', ['Robert Marcial González'], '2024-11-02'),
    'ejercitar-la-esperanza-ante-la-indolencia-del-burocrata': (None, 'opinion', ['Robert Marcial González'], '2024-11-06'),
    'roberto-gargarella-en-paraguay-jornadas-de-debate-sobre-derecho-constitucional': (None, 'noticias-y-eventos', [], None),
    'breve-resena-sobre-el-capitulo-de-paraguay-en-el-volumen-constitutional-reasoning-in-latin-america-and-the-caribbean-editado-por-johanna-frohlich': (
        'resena-constitutional-reasoning-in-latin-america', 'opinion', ['María José García Ascolani', 'Juan Pablo Irrazabal'], None),
    'pecado-de-vanidad': (None, 'opinion', ['Robert Marcial González'], '2025-04-27'),
    'requiem-para-un-democrata': (None, 'opinion', ['Robert Marcial González'], '2025-05-26'),
    'autores-materiales-autores-morales-y-complices': (None, 'opinion', ['Robert Marcial González'], '2025-06-06'),
    'la-hara-cumplir': (None, 'opinion', ['Manuel Riera D.'], '2025-06-07'),
    'un-aplauso-para-el-cirujano-del-cartismo': (None, 'opinion', ['Robert Marcial González'], '2025-08-10'),
}

IMAGES = {
    'PHOTO-2024-09-14-11-24-11-1': (f'{A}/blog/invitacion-la-destitucion-del-presidente.jpg',
        'Invitación de Intercontinental Editora a la presentación del libro «La destitución del Presidente (y otras altas autoridades)» de Jorge Melgarejo Raggini, el jueves 26 de septiembre a las 19:00 en el Salón Auditorio de la Biblioteca del Congreso Nacional'),
    'tempImageMX1ek0': (f'{A}/blog/tapa-constitutional-reasoning.jpg',
        'Tapa del libro «Constitutional Reasoning in Latin America and the Caribbean», editado por Johanna Fröhlich (Hart Publishing)'),
    'ROBERTO-GARGARELLA-1': (f'{A}/blog/jornadas-gargarella.jpg',
        'Afiche de las Jornadas de debate «Problemas actuales de la teoría constitucional» con Roberto Gargarella, miércoles 27 y jueves 28 de noviembre, 16:00, en el Auditorio La Ley Paraguaya'),
    'Captura-de-pantalla-2025-06-07-a-las-11.06.03': (f'{A}/blog/votos-csj-kattya-gonzalez.png',
        'Tabla: resumen de votos de los actuales integrantes de la Corte Suprema de Justicia para el caso de Kattya González, por cuestión justiciable y procesal'),
}
FLYER = (f'{A}/blog/flyer-conversatorio-ciudadano.jpg',
         'Flyer del Conversatorio Ciudadano «Fronteras entre el orden jurídico local y el supranacional», jueves 26 de septiembre de 2024, 17:30 a 19:00, Colegio de Abogados del Paraguay. Docentes invitados: Jorge Alejandro Amaya, Alejandra Peralta, Diego Moreno, Manuel Riera D. y Cecilia Pérez. Actividad presencial libre y gratuita',
         '/wp-content/uploads/2024/09/CONVERSATORIO-CIUDADANO-1-1.pdf')

TYPOS = [
    ('POLíTICAMENTE PERVERSO Y CONSTITUCIONALMENTE ILEGíTIMO', 'POLÍTICAMENTE PERVERSO Y CONSTITUCIONALMENTE ILEGÍTIMO'),
    ('Villanueva**perdió', 'Villanueva** perdió'),
]


def split_front(text):
    _, fm, body = text.split('---\n', 2)
    meta = {}
    for line in fm.strip().splitlines():
        k, v = line.split(': ', 1)
        meta[k] = json.loads(v)
    return meta, body.strip()


def is_author_img(line):
    return bool(re.match(r'^!\[\]\(https://ipdc\.org\.py/wp-content/uploads/[^)]*(Robert-Gonzalez|Emilio_Camacho|WhatsApp_Image|Mane-Riera|Foto_mjga|IMG_8550)[^)]*\)', line))


def clean_body(body, old):
    lines = body.splitlines()
    # 1. Foto del autor y firma iniciales
    out, header_done = [], False
    for ln in lines:
        s = ln.strip()
        if not header_done:
            if not s:
                continue
            if is_author_img(s):
                s = re.sub(r'^!\[\]\([^)]*\)\s*', '', s)
                if not s:
                    continue
            if re.match(r'^\*\*[Pp]or\s', s):
                header_done = True
                continue
            header_done = True
        out.append(ln)
    body = '\n'.join(ln for ln in out if not is_author_img(ln.strip())).strip()

    # 2. Notas al pie applewebdata
    body = re.sub(r'\[\\\[(\d+)\\\]\]\(applewebdata://[^)]*#_ftn\d+\)', r'[^\1]', body)
    body = re.sub(r'^\[\\\[(\d+)\\\]\]\(applewebdata://[^)]*#_ftnref\d+\)\s*', r'[^\1]: ', body, flags=re.M)
    body = re.sub(r'\[(\\\*)+\]\(applewebdata://[^)]*\)\s*', '', body)  # asteriscos de la reseña (bios al pie)

    # 3. Imágenes
    def img(m):
        url = m.group(1)
        if url.endswith('.pdf'):
            src, alt, pdf = FLYER
            return f'[![{alt}]({src})]({pdf})'
        for key, (src, alt) in IMAGES.items():
            if key in url:
                return f'![{alt}]({src})'
        raise SystemExit(f'Imagen sin mapear en {old}: {url}')
    body = re.sub(r'!\[\]\((https://ipdc\.org\.py/[^)]+)\)', img, body)

    # 4. Títulos internos: sin negrita, nunca h1
    body = re.sub(r'^(#{2,6})\s*\*\*(.+?)\*\*\s*$', r'\1 \2', body, flags=re.M)
    body = re.sub(r'^# ', '## ', body, flags=re.M)

    # 5. Correcciones
    for a, b in TYPOS:
        body = body.replace(a, b)
    body = re.sub(r'[ \t]+$', '', body, flags=re.M)
    body = re.sub(r'\n{3,}', '\n\n', body)
    return body.strip() + '\n'


def plain(md):
    md = '\n'.join(l for l in md.splitlines() if not l.startswith('#'))
    t = re.sub(r'!\[[^\]]*\]\([^)]*\)', '', md)
    t = re.sub(r'\[([^\]]*)\]\([^)]*\)', r'\1', t)
    t = re.sub(r'\[\^\d+\]', '', t)
    t = re.sub(r'[*_#>`]', '', t)
    return re.sub(r'\s+', ' ', t).strip()


def excerpt(md, n=155):
    t = plain(md)
    if len(t) <= n:
        return t
    cut = t[:n].rsplit(' ', 1)[0].rstrip(',;:.')
    return cut + '…'


def yaml_str(s):
    return json.dumps(s, ensure_ascii=False)


OUT.mkdir(parents=True, exist_ok=True)
for path in sorted(SRC.glob('*.md')):
    meta, body = split_front(path.read_text())
    old = meta['old_url'].rstrip('/').split('/')[-1]
    if old == 'make-me-happy':
        continue
    new_slug, cat, authors, date = POSTS[old]
    slug = new_slug or old
    title = meta['title']
    for a, b in TYPOS:
        title = title.replace(a, b)
    body = clean_body(body, old)
    fm = ['---', f'title: {yaml_str(title)}', f'description: {yaml_str(excerpt(body))}',
          f'date: {date or meta["wp_published"][:10]}', f'category: {cat}']
    if authors:
        fm.append('authors: [' + ', '.join(yaml_str(a) for a in authors) + ']')
        if len(authors) == 1 and authors[0] in AUTHORS:
            fm.append(f'authorPhoto: {AUTHORS[authors[0]]}')
    fm.append(f'legacyUrl: {meta["old_url"].replace("https://ipdc.org.py", "")}')
    fm.append('---')
    (OUT / f'{slug}.md').write_text('\n'.join(fm) + '\n\n' + body)
    print(f'{slug}.md  [{cat}]  {date or meta["wp_published"][:10]}')
