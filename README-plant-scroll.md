# 🌱 Voksende Planter - Scrollytelling Implementation

## 📦 Hvad er dette?

En komplet scrollytelling-webgrænseflade med 10 fotorealistiske plante-vækst videoer genereret med Veo3.1, optimeret til web og synkroniseret med scroll-position via GSAP ScrollTrigger.

## ✨ Features

### 🎬 Video Integration
- **10 unikke plante-animationer** (8 sekunder hver)
- Alle videoer har **magenta (#FF00FF) baggrund** klar til chroma keying
- **CSS mix-blend-mode** bruges til at simulere gennemsigtighed
- Video playback **synkroniseret med scroll position**

### 🎨 Design & Animation
- **Solarpunk-inspireret gradient baggrund**
- **Glassmorphism UI** med backdrop-filter effekter
- **Smooth scroll-baseret animationer** via GSAP
- **Alternating layout** for visuel variation
- **Fully responsive** design til alle devices

### ⚡ Performance
- **Lazy loading** af videoer
- **Intersection Observer** til automatisk pause af off-screen videoer
- **Preload="auto"** for hurtigere initial load
- **Optimeret scrubbing** med GSAP scrub parameter

## 🎯 De 10 Planter

1. **Klatrende Efeu** - Ivy vines growing upward (16:9)
2. **Bregne** - Fern fiddlehead unrolling (16:9)
3. **Vilde Blomster** - Wildflowers sprouting (16:9)
4. **Monstera Blad** - Monstera leaf unfurling (16:9)
5. **Slyngplanter** - Creeper vines spiraling (16:9)
6. **Sukkulent** - Succulent rosette expanding (16:9)
7. **Rød Rose** - Red rose blooming (9:16)
8. **Mos** - Moss spreading outward (16:9)
9. **Bambusskud** - Bamboo shooting upward (9:16)
10. **Hængende Planter** - String of Pearls cascading (9:16)

## 🚀 Sådan Bruger Du Det

### Option A: Test på Netlify (Anbefalet)
1. Filen er nu i dit `BFperformanceefterskolen.dk` repository
2. Netlify vil automatisk deploye ændringerne
3. Besøg: `https://[dit-netlify-site].netlify.app/plant-scroll.html`

### Option B: Lokal Test
```bash
cd BFperformanceefterskolen.dk
open plant-scroll.html
```

## 🎨 CSS Tricks til Baggrundsfjerning

Da videoerne har magenta (#FF00FF) baggrund, bruger vi:

```css
.plant-video {
    mix-blend-mode: screen;  /* Fjerner mørke farver */
    filter: contrast(1.15) saturate(1.1);  /* Booster planterne */
}
```

**Hvorfor det virker:**
- `screen` blend mode gør magenta-baggrunden næsten usynlig
- Filter-justeringer booster planternes naturlige grønne farver
- Resultatet er en "pseudo-alpha channel" effekt

## 🔧 Tilpasning

### Ændre Scroll-Hastighed
```javascript
ScrollTrigger.create({
    trigger: section,
    scrub: 1,  // Lavere = hurtigere, højere = langsommere
    ...
});
```

### Ændre Video Start/Slut Points
```javascript
ScrollTrigger.create({
    start: 'top 80%',  // Start når top er ved 80% af viewport
    end: 'bottom 20%',  // Slut når bund er ved 20%
    ...
});
```

### Tilføje Flere Planter
1. Generer ny video med Veo3.1
2. Kopier en `<section class="plant-section">` blok
3. Opdater video URL, nummer og tekst

## 📊 Browser Support

✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+

**Note:** `mix-blend-mode: screen` understøttes af alle moderne browsere.

## 🎓 Integration Med Din Eksisterende Site

### Tilføj til Navigation
```html
<a href="plant-scroll.html">🌱 Voksende Planter</a>
```

### Embed som Sektion
Du kan kopiere `.plant-section` blokkene direkte ind i din `index.html` mellem andre sektioner.

### Brug Dine Eksisterende Fonts
Filen bruger allerede `DM Sans` fra din eksisterende site styling.

## 🔄 Næste Skridt (Valgfrit)

Hvis du vil have **ægte alpha channel** (100% gennemsigtig baggrund):

### Option 1: FFmpeg (Mac Terminal)
```bash
ffmpeg -i input.mp4 -vf "chromakey=0xFF00FF:0.1:0.2" -c:v vp9 -pix_fmt yuva420p output.webm
```

### Option 2: Adobe After Effects
1. Import video
2. Effect → Keying → Keylight
3. Vælg magenta farve
4. Export som WebM med Alpha

### Option 3: DaVinci Resolve (Gratis)
1. Import video
2. Color → Qualifier → Select magenta
3. Deliver → WebM + Alpha Channel

## 📹 Video URLs (Reference)

```javascript
const videoUrls = [
    'https://cdn.simtheory.ai/video/upload/v1765916473/veo3_text_to_video_18468_1765916473_v26npc.mp4',  // Ivy
    'https://cdn.simtheory.ai/video/upload/v1765916480/veo3_text_to_video_18468_1765916480_tsn2nd.mp4',  // Fern
    'https://cdn.simtheory.ai/video/upload/v1765916463/veo3_text_to_video_18468_1765916463_lzqwqc.mp4',  // Wildflowers
    'https://cdn.simtheory.ai/video/upload/v1765916495/veo3_text_to_video_18468_1765916495_kr9hgn.mp4',  // Monstera
    'https://cdn.simtheory.ai/video/upload/v1765916465/veo3_text_to_video_18468_1765916465_spqnzs.mp4',  // Creepers
    'https://cdn.simtheory.ai/video/upload/v1765917511/veo3_text_to_video_18468_1765917511_ykmq7f.mp4',  // Succulent
    'https://cdn.simtheory.ai/video/upload/v1765916473/veo3_text_to_video_18468_1765916473_qsob0c.mp4',  // Rose
    'https://cdn.simtheory.ai/video/upload/v1765916463/veo3_text_to_video_18468_1765916462_xiu7rz.mp4',  // Moss
    'https://cdn.simtheory.ai/video/upload/v1765916456/veo3_text_to_video_18468_1765916456_z4e0rw.mp4',  // Bamboo
    'https://cdn.simtheory.ai/video/upload/v1765916467/veo3_text_to_video_18468_1765916467_l4wjvk.mp4'   // String of Pearls
];
```

## 🆘 Troubleshooting

### Videoer loader ikke
- Check internet forbindelse
- Videoerne er hosted på Cloudinary CDN, så de burde være tilgængelige globalt

### Scroll animation er hakket
- Reducer `scrub` værdien til `0.5` for hurtigere respons
- Check browser performance (åbn DevTools → Performance)

### Magenta baggrund er stadig synlig
- Prøv at ændre `mix-blend-mode` til `lighten` eller `screen`
- Juster `filter: contrast()` værdien

### Videos spiller ikke på mobile
- Sikr at `playsinline` attribute er sat
- iOS kræver `muted` for autoplay

## 💡 Tips

1. **Test scroll hastighed** på forskellige devices
2. **Tilpas teksten** til din målgruppe (Lindenborg Efterskole elever)
3. **Overvej at tilføje sound effects** når planter "vokser"
4. **Eksperimenter med blend modes** for forskellige visuelle effekter

## 📬 Support

Hvis du har spørgsmål eller vil have hjælp til yderligere tilpasninger, så sig til! 🌿

---

**Lavet med 💚 til Lindenborg Efterskole's Solarpunk-projekt**