# The VERNACULAR Guild⏳

> A decentralized civic field observatory and open archival ledger cataloging vernacular stonework, traditional joinery systems, typographic fragments, and oral architectural heritage.

---

## 🏛 Overview

**The Vernacular Guild** is an archival digital repository built with Next.js and Tailwind CSS. Designed with an archival-print brutalist visual language, the platform enables field observers, architectural historians, and typographers to document, inspect, and preserve physical culture and vernacular building treatises across historic regional cradles.

The project pairs interactive cartographic spatial nodes with forensic artifact dossiers, chronological structural condition telemetry, and decentralized field evidence intake.

---

## 🧭 Key Architectural Modules

### 1. Global Cartographic Field Observatory (World Atlas)
* **Calibrated Projection Map**: Custom interactive projection overlay featuring 19 monitored architectural cradles with precise spatial telemetry:
  * **Eastern Indian Deula Tradition** (Kalinga & Utkal Basin)
  * **Kigumi Woodcraft Guilds** (Kyoto & Nara Corridors)
  * **Sumerian & Babylonian Mudbrick Guilds** (Mesopotamian Alluvium)
  * **Classical Hellenic Lapidary Guilds** (Peloponnese & Cyclades)
  * **Nubian Catenary Vault Constructors** (Upper Nile Reach)
  * **Pre-Columbian Lithic Joinery** (Altiplano Tiwanaku & Cusco)
  * **Early Metal Movable Type Guilds** (Upper Rhine, Mainz)
  * **Khmer Hydraulic Foundation Guilds** (Angkor Tonle Sap)
  * **Barey-Ton Sahelian Earth Masons** (Djenné, Mali)
  * **Safavid Muqarnas & Double-Dome Architects** (Isfahan Oasis)
  * **Classic Maya Limestone Masonry** (Petén & Yucatán Lowlands)
  * **Gokomere & Shona Dry-Stone Builders** (Great Zimbabwe Plateau)
  * **Thule & Classic Inuit Whalebone Builders** (Somerset Island & High Arctic Archipelago)
  * **Greenland Norse Settler Guilds** (Hvalsey & Tunulliarfik Fjord)
  * **Northern Dene & Athabaskan Guilds** (Dehcho & Mackenzie River Basin)
  * **Iñupiat Marine Arctic Builders** (Point Barrow & Utqiaġvik Coastal Plain)
  * **Pazyryk & Scythian Nomadic Guilds** (Altai & Ukok Permafrost Basin)
  * **Siberian Ostrog Frontier Carpenter Guilds** (Yenisei Basin & Central Taiga)
  * **Yakut (Sakha) Earth & Wood Craftsmen** (Lena Basin & Sakha Plain)
* **Sonar Pulsing & Telemetry HUD**: Live coordinate locator, decay threat indices, material science profiles, and deep architectural dossiers.
* **Direct-Action Quick Relays**: Responsive regional switcher positioned directly beneath the map projection viewport for swift cradle navigation without layout displacement.
* **Archival Chromatic Reveal**: High-contrast monochrome filters at rest that transition into authentic full-color inspection on user interaction and modal surfacing.

### 2. Archival Specimen Repository (Forensic Artifact Index)
* **Curated Physical Culture**: Eight documented historical specimens spanning classical epigraphy, early print matrices, baked earth relief, and metallurgy:
  * `PL-091`: *Torana Pillars, Sun Temple, Modhera* (1026–27 CE)
  * `PL-092`: *Bengali Movable Metal & Wood Type, Serampore* (1778–1800 CE)
  * `PL-093`: *Malla Terracotta Temple Relief Plaques, Bishnupur* (1626–1656 CE)
  * `PL-094`: *Scinde Dawk & 1854 Half-Anna Stamp Impressions* (1852–1854 CE)
  * `PL-095`: *Perforated Makrana Marble Jali, Tomb of Salim Chishti* (1571–1607 CE)
  * `PL-096`: *Monolithic Forge-Welded Iron Pillar of Delhi* (c. 375–415 CE)
  * `PL-097`: *Akbarnama Illustrated Imperial Chronicle Folios* (1590–1597 CE)
  * `PL-098`: *Mature Harappan Steatite 'Unicorn' Seal* (c. 2600–1900 BCE)
* **Interactive Chrono-Scrubber**: SVG condition degradation curves tracking integrity indexes over centuries with step-by-step milestone scrubbing.
* **Forensic Assay Registry**: Cryptographic verification hashes, material spectroscopy, petrographic profiles, and documented institutional chain-of-custody.

### 3. Field Evidence Intake & Archive Management
* **In-Browser Client Compression**: High-resolution photographic plate upload equipped with offscreen canvas downscaling (constrained to 800px, 72% JPEG quality), preserving visual acuity under 50KB to permanently prevent browser `QuotaExceededError`.
* **Flexible Visual Input**: Dual-mode input allowing observers to upload local files directly from devices or link remote image URLs with instant live preview.
* **Decentralized Dispatch Registration**: Submit new architectural field observations with categorization tags, region tagging, observer credentials, and photographic documentation.
* **Custom Brutalist Confirmation Engine**: Modal-driven confirmation barriers replacing native browser alerts for destructive actions (`[Revoke]` item expunge & `[Recycle]` ledger purging).
* **Tactile Mechanical UI Physics**: Hard 1px borders with zero-gap multi-layered drop shadows (`1px 1px 0px #1c1917, 2px 2px 0px #1c1917, 3px 3px 0px #1c1917`) paired with `bg-clip-padding` to eliminate sub-pixel anti-aliasing white seam lines while delivering weighted press feedback on hover and click.
* **Local Persistence**: Client-side `localStorage` caching ensuring user-submitted dispatches and community endorsements persist across browser reloads.
* **Dynamic Tag Taxonomy & Submenu Filters**: Multi-tiered filter dropdowns with nested reading options for specific architectural traditions.

---

## 🛠 Tech Stack

* **Framework**: [Next.js](https://nextjs.org/) (App Router, Client Components)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Image Processing**: Client-side HTML5 Canvas API (In-browser compression & resampling)
* **State & Persistence**: React Hooks (`useState`, `useEffect`, `useRef`) + Browser `localStorage`
* **Data Visualization**: Native responsive SVG curves & coordinate math

---

<p>&copy; 2026 | 🔍Researched and Designed by Rohan Lal Das</p>
