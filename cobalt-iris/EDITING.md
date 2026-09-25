# Customer Editing Guide — Something Blue (cobalt-iris)

This template is a 100% self-contained luxury wedding invitation with cinematic wax-seal envelope opening, ambient video hero loop, background music, interactive timeline, schedule of events, venue details, and email RSVP.

---

## Normal Customer Changes

All routine customer edits are configured in:
→ `wedding-data.js`

### 1. Couple Information
Edit `couple` in `wedding-data.js`:
- `first` & `second`: Couple's names (e.g. `Alex` & `Jamie`)
- `heroNote`: Sub-header on the hero banner
- `subtitle`: Emotional tagline / subtitle

### 2. Wedding Date & Times
Edit `wedding` in `wedding-data.js`:
- `dateLabel`: Short display date (e.g. `27 · 09 · 2026`)
- `longDate`: Full display date (e.g. `Sunday, 27 September 2026`)
- `dateISO` & `endISO`: ISO timestamps with timezone offset (e.g. `2026-09-27T17:00:00-04:00`). Drives countdown and Google Calendar download.

### 3. Schedule of Events
Edit `schedule` array in `wedding-data.js`:
- Chronological list of events with `time` and `title`.

### 4. Venue & Map Link
Edit `venue` in `wedding-data.js`:
- `name`: Venue name
- `address`: Street address
- `mapsUrl`: Google Maps link (leave empty to trigger auto-search)

### 5. Media & Assets
All media files are self-contained in `media/` and `assets/`:
- `media/opening.mp4` / `media/opening-poster.webp`: 6s envelope opening video & poster
- `media/hero.mp4` / `media/hero-poster.webp`: 8s ambient video loop & poster
- `media/music.mp3`: Background soundtrack

### 6. Email RSVP
Edit `rsvp` in `wedding-data.js`:
- `email`: Host's email address to receive RSVPs
- `heading`, `note`, `deadline`: RSVP card text

---

## Validation
Validate syntax after editing:
```bash
node --check wedding-data.js
```
