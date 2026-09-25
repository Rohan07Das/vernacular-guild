"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Stamp,
  ShieldCheck,
  MapPin,
  ArrowLeft,
  ArrowRight,
  Eye,
  BookOpen,
  CornerDownRight,
  X,
  UploadCloud,
  CheckCircle2,
  Filter,
  Activity,
  Calendar,
  FileCheck,
  Fingerprint,
  Award,
  Sliders,
  Compass,
  ExternalLink,
  Radio,
  Trash2,
  RotateCcw,
  AlertTriangle,
  ChevronDown,
  Layers,
} from "lucide-react";

interface Dispatch {
  id: string;
  location: string;
  region: string;
  contributor: string;
  role: string;
  date: string;
  excerpt: string;
  image: string;
  tags: string[];
}

interface TimelineMilestone {
  year: string;
  numericYear: number;
  event: string;
  conditionIndex: number;
  detail: string;
}

interface ForensicVerification {
  assayMethod: string;
  datingConfidence: string;
  spectroscopyResults: string;
  chainOfCustody: string;
  verificationHash: string;
  leadExaminer: string;
  institution: string;
  status: "AUTHENTICATED" | "PROVISIONAL" | "UNDER REVIEW";
}

interface ArchivalArtifact {
  id: string;
  title: string;
  period: string;
  medium: string;
  image: string;
  plateNumber: string;
  notes: string;
  timeline: TimelineMilestone[];
  verification: ForensicVerification;
}

interface CartographicNode {
  id: string;
  name: string;
  culture: string;
  coordinates: string;
  x: number;
  y: number;
  hitboxWidth: number;
  hitboxHeight: number;
  era: string;
  focus: string;
  brief: string;
  extendedHistory: string;
  materialScience: string;
  endangermentStatus: string;
  image: string;
  activeSurveys: number;
}

interface CustomConfirmDialog {
  isOpen: boolean;
  type: "REVOKE_ITEM" | "RECYCLE_ALL";
  targetId?: string;
  title: string;
  message: string;
  details?: string;
}

const CARTOGRAPHIC_NODES: Record<string, CartographicNode> = {
  kalinga: {
    id: "NODE-IND",
    name: "Kalinga & Utkal Basin",
    culture: "Eastern Indian Deula Tradition",
    coordinates: "20.2961° N, 85.8245° E",
    x: 71.4,
    y: 47.8,
    hitboxWidth: 4,
    hitboxHeight: 6,
    era: "c. 750 – 1250 CE",
    focus: "Ferruginous Sandstone & Mortarless Dry-Stone Ashlar",
    brief:
      "Interlocking dry-stone tongue-and-groove joints, forged iron dowels, and cyclopean laterite foundation plinths resistant to tropical monsoon salinization.",
    extendedHistory:
      "The architectural guild masters (Sthapatis) of the Kalinga school formulated empirical building treatises (Bhubana Pradipa) mandating stone-on-stone balance without lime mortars. Load transfer relied on cantilevered corbelling and forge-welded iron beams spanning temple mandapas, establishing continuous structural balance through eight centuries of coastal storm cycles.",
    materialScience:
      "Ferruginous sandstone bound by iron-rich silicate cements. Magnetite and hematite inclusions create passive oxidation barriers, preventing subsurface exfoliation.",
    endangermentStatus: "High // Ground-moisture efflorescence & salt crystallization",
    image:
      "https://vedicfeed.com/wp-content/uploads/2020/05/Somavamshi-dynasty-e1590856015173.jpg",
    activeSurveys: 28,
  },
  japan: {
    id: "NODE-JPN",
    name: "Kyoto & Nara Forest Corridors",
    culture: "Japanese Kigumi Woodcraft Guilds",
    coordinates: "35.0116° N, 135.7681° E",
    x: 84.4,
    y: 38.6,
    hitboxWidth: 4,
    hitboxHeight: 6,
    era: "c. 593 CE – Present",
    focus: "Nail-less Complex Joinery & Cypress Dynamics",
    brief:
      "Seismic-flexible interlocking timber frames crafted exclusively with Japanese Hinoki cypress without mechanical iron fasteners.",
    extendedHistory:
      "Kigumi joinery relies on complex three-dimensional friction joints (Kanawa-tsugi and Sampo-sashi) carved using micro-beveled pull saws. During seismic tremors, the wood fibers flex against each other, absorbing destructive shear forces as friction heat rather than suffering structural failure.",
    materialScience:
      "Chamaecyparis obtusa (Hinoki Cypress) containing natural alpha-cadinol resins, conferring innate fungal and termite resistance spanning over 1,300 years.",
    endangermentStatus: "Stable // Active lineage of hereditary master carpenters (Miyadaiku)",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80",
    activeSurveys: 42,
  },
  mesopotamia: {
    id: "NODE-MES",
    name: "Mesopotamian Alluvial Plain",
    culture: "Sumerian & Babylonian Brick Guilds",
    coordinates: "31.3255° N, 45.6322° E",
    x: 60.1,
    y: 40.8,
    hitboxWidth: 4,
    hitboxHeight: 6,
    era: "c. 3200 – 539 BCE",
    focus: "Kiln-Fired Silt & Natural Bitumen Waterproofing",
    brief:
      "Sun-dried adobe core blocks reinforced with reed matting layers and bonded with natural petroleum bitumen asphalt beds.",
    extendedHistory:
      "Lacking timber and quarryable rock, lowland Tigris-Euphrates builders pioneered mass-produced standardized mudbricks. Massive ziggurat cores incorporated woven reed mats dipped in hot bitumen every seven brick courses, dispersing structural tensile stress and draining underground capillary water over millennia.",
    materialScience:
      "Flocculated river silt high in montmorillonite clay, tempered with straw chaff and sealed with natural pitch hydrocarbons.",
    endangermentStatus: "Critical // Wind ablation & armed conflict zone fragmentation",
    image:
      "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1000&q=80",
    activeSurveys: 14,
  },
  greece: {
    id: "NODE-MED",
    name: "Peloponnese & Cyclades",
    culture: "Classical Hellenic Lapidary Guilds",
    coordinates: "37.9838° N, 23.7275° E",
    x: 53.6,
    y: 37.8,
    hitboxWidth: 4,
    hitboxHeight: 5,
    era: "c. 600 – 146 BCE",
    focus: "Pentelic Marble & Lead-Sheathed Molten Dowels",
    brief:
      "Dry-joint marble drums finished with microscopic anathyrosis margins, aligned internally via bronze pins cast inside molten lead jackets.",
    extendedHistory:
      "Greek masons achieved seam lines narrower than a single hair by grinding adjacent drum surfaces with olive-oil emery pastes (anathyrosis). The interior iron and bronze connection dowels were encased in poured molten lead to prevent thermal expansion from fracturing the crystalline marble core.",
    materialScience:
      "Metamorphic calcitic marble with interlocking calcite crystals displaying high compressive strength and low moisture absorption (<0.1%).",
    endangermentStatus: "Vulnerable // Acid rain dissolution of high-relief fluting",
    image:
      "https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=1000&q=80",
    activeSurveys: 33,
  },
  egypt: {
    id: "NODE-EGY",
    name: "Upper Nile Nubian Reach",
    culture: "Nubian Mudbrick Vault Constructors",
    coordinates: "24.0889° N, 32.8998° E",
    x: 56.4,
    y: 45.2,
    hitboxWidth: 4,
    hitboxHeight: 6,
    era: "c. 2000 BCE – Present",
    focus: "Catenary Vaulting Without Centering Timbers",
    brief:
      "Self-supporting paraboloid barrel vaults laid at an inclined 65° angle against a back wall, eliminating timber falsework requirements.",
    extendedHistory:
      "Developed in a hyper-arid desert devoid of tall timber stands, the Nubian vault technique allows master masons to throw broad ceiling vaults using only sun-dried mud, sand, and water. Adhesion is maintained solely through high-suction clay slips while each brick is gently leaned against the previous course.",
    materialScience:
      "Nile alluvium compounded with cattle manure enzymes and wheat straw, producing porous low-thermal-conductivity walls.",
    endangermentStatus: "Endangered // Concrete replacement & river dam inundation",
    image:
      "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1000&q=80",
    activeSurveys: 19,
  },
  andes: {
    id: "NODE-AND",
    name: "Altiplano Tiwanaku & Cusco",
    culture: "Pre-Columbian Lithic Joinery Guilds",
    coordinates: "16.5550° S, 68.6736° W",
    x: 29.8,
    y: 64.6,
    hitboxWidth: 4,
    hitboxHeight: 7,
    era: "c. 300 – 1533 CE",
    focus: "Polygonal Andesite Joinery & Bronze Cramps",
    brief:
      "Megalithic polygonal blocks chiseled with multifaceted concave-convex joints and fitted with cold-hammered bronze clamp matrices.",
    extendedHistory:
      "Inca and Tiwanaku builders assembled multi-ton blocks of hard volcanic andesite that fit together without mortar so tightly that a knife blade cannot slip between them. The irregular polygons move independently during earthquakes, shedding energy before settling back into their exact pre-quake seats.",
    materialScience:
      "Porphyritic Andesite and Diorite (Mohs hardness 6.0–6.5) chiseled with hematite hammerstones and smoothed using wet quartz sands.",
    endangermentStatus: "Vulnerable // Tourist erosion & seismic displacement",
    image:
      "https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=1000&q=80",
    activeSurveys: 21,
  },
  germany: {
    id: "NODE-GER",
    name: "Upper Rhine Typography Enclave",
    culture: "Mainz Early Metal Cast Movable Type Guild",
    coordinates: "49.9929° N, 8.2473° E",
    x: 49.6,
    y: 30.6,
    hitboxWidth: 3.5,
    hitboxHeight: 5,
    era: "c. 1440 – 1520 CE",
    focus: "Adjustable Hand Moulds & Antimony-Lead Metallurgy",
    brief:
      "Steel punch-cutting, copper strike matrices, and low-temperature expansion alloy casting engineered for vernacular movable type.",
    extendedHistory:
      "Johannes Gutenberg merged regional wine-screw press mechanics with goldsmith punch-cutting to create the adjustable two-part hand mould. The type metal alloy incorporated antimony, which uniquely expands upon solidification, filling the finest serifs and ligature grooves of the copper matrix.",
    materialScience:
      "Tertiary alloy: Lead (75%), Antimony (20%), and Tin (5%). Formulated for low melting temperature (260°C) and microscopic edge acuity.",
    endangermentStatus: "Archived // Historical foundry matrices preserved in guild vaults",
    image:
      "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=1000&q=80",
    activeSurveys: 37,
  },
  khmer: {
    id: "NODE-KHM",
    name: "Angkor Tonle Sap Basin",
    culture: "Khmer Hydraulic & Sandstone Ashlar Guilds",
    coordinates: "13.4125° N, 103.8670° E",
    x: 76.5,
    y: 52.6,
    hitboxWidth: 4,
    hitboxHeight: 6,
    era: "c. 802 – 1431 CE",
    focus: "Groundwater Hydraulic Foundations & Interlocking Sandstone",
    brief:
      "Vast artificial baray reservoir networks engineered to pressurize sandy sub-foundation strata, preventing multi-ton temple towers from sinking.",
    extendedHistory:
      "The Khmer built colossal temples out of fine-grained grey and green sandstones quarried from Mount Kulen. Rather than using mortar, stone faces were rubbed against one another with wet abrasive sands to create frictionless dry joints, resting on vast sand-core foundation beds kept buoyant by seasonal reservoir canals.",
    materialScience:
      "Glauconitic arkosic sandstone with high silicate binder ratios; subterranean laterite plinths hardened by exposure to air.",
    endangermentStatus: "High // Groundwater depletion causing subterranean sub-plinth compaction",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/f7/54/34/caption.jpg?w=720&h=480&s=1",
    activeSurveys: 31,
  },
  mali: {
    id: "NODE-MAL",
    name: "Inland Niger Delta & Djenne",
    culture: "Sahelian Masonry Guild of Barey-Ton",
    coordinates: "13.9056° N, 4.5533° W",
    x: 45.6,
    y: 52.8,
    hitboxWidth: 4,
    hitboxHeight: 6,
    era: "c. 1200 CE – Present",
    focus: "Monumental Raw Earth Adobe (Ferey) & Palm Toron Beams",
    brief:
      "Hand-formed sun-baked cylindrical mud bricks (djenné-ferey) bound with fermented river silt and reinforced with projecting palm timbers.",
    extendedHistory:
      "The master masons of the Barey-Ton guild oversee the preservation of the Great Mosque of Djenné, the largest earthen building on Earth. Projecting palm-wood toron scaffold beams remain permanently embedded within the clay towers, allowing the entire city collective to replaster the melting mud façade annually following the monsoon season.",
    materialScience:
      "Alluvial clay fermented with rice husks, fish oil, and shea butter baobab extracts, providing water repellency and flexibility against desert thermal shock.",
    endangermentStatus: "Critical // Irregular precipitation patterns and modern cement patch degradation",
    image:
      "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1000&q=80",
    activeSurveys: 16,
  },
  persia: {
    id: "NODE-PER",
    name: "Isfahan Zayandeh Oasis",
    culture: "Safavid Muqarnas & Double-Dome Architects",
    coordinates: "32.6546° N, 51.6680° E",
    x: 61.8,
    y: 39.8,
    hitboxWidth: 4,
    hitboxHeight: 6,
    era: "c. 1501 – 1736 CE",
    focus: "Hollow Double-Shell Domes & Cobalt Cuerda Seca Tiles",
    brief:
      "Interlocking stalactite corbel vaulting (muqarnas) paired with double-shelled bulbous masonry domes designed to insulate against desert extremes.",
    extendedHistory:
      "Safavid court architects perfected the structural double dome: an inner structural dome supporting dead weight while an outer decorative turquoise bulb acts as a radiant heat shield and wind sail. Deep corbelled stalactite vaults break sonic flutter and diffuse searing desert sunlight into serene geometric gradients.",
    materialScience:
      "High-alkali tin-opacified glazed tiles over silica clay bodies; gypsum mortar (gach) setting within 8 minutes without wooden centering frames.",
    endangermentStatus: "Moderate // Structural vibration and subsurface ground subsidence",
    image:
      "https://media.istockphoto.com/id/1761638505/photo/si-o-se-pol-bridge-the-famous-two-storey-stone-bridge-with-33-arches-over-the-zayandeh-river.jpg?s=612x612&w=0&k=20&c=5ciDTNAWiSX6RVwa_eJVVCJoF95mKSZxoI0loy8GOxI=",
    activeSurveys: 24,
  },
  maya: {
    id: "NODE-MAY",
    name: "Petén & Yucatán Lowlands",
    culture: "Classic Maya Limestone Masonry Guilds",
    coordinates: "17.2220° N, 89.6237° W",
    x: 24.6,
    y: 49.5,
    hitboxWidth: 4,
    hitboxHeight: 6,
    era: "c. 250 – 900 CE",
    focus: "Corbelled Vaulting & Calcite Sascab Mortars",
    brief:
      "Steep cantilevered false arches (Maya vaults) bonded with slow-curing limestone plaster made from unconsolidated volcanic ash and bark extract.",
    extendedHistory:
      "Classic Maya builders generated vaulted stone sanctuaries amidst tropical jungle canopies without keystones. Layers of limestone were cantilevered inward until meeting at a capping capstone. The binding mortar utilized burned limestone mixed with sascab powder and boiled bark sap from the Chukum tree, creating an impermeable water-shedding exterior rind.",
    materialScience:
      "Karst limestone aggregate mixed with organic polyphenolic compounds derived from local tree bark, which cross-link to form an elastic waterproof biocement.",
    endangermentStatus: "High // Tropical root wedging and acid biomechanic lichen decay",
    image:
      "https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=1000&q=80",
    activeSurveys: 22,
  },
  zimbabwe: {
    id: "NODE-ZIM",
    name: "Great Zimbabwe Plateau",
    culture: "Gokomere & Shona Dry-Stone Guilds",
    coordinates: "20.2675° S, 30.9333° E",
    x: 56.0,
    y: 69.8,
    hitboxWidth: 4,
    hitboxHeight: 6,
    era: "c. 1100 – 1450 CE",
    focus: "Curvilinear Dry-Stone Granite Batter Walls",
    brief:
      "Massive 11-meter-tall curvilinear enclosure walls assembled exclusively from natural fire-fractured granite spalls without a single grain of mortar.",
    extendedHistory:
      "Master builders harvested exfoliated granite slabs by heating hilltop rock sheets with brush fires and quenching them with water. The stone fractured along natural cleavage planes into parallel blocks. Walls were erected with an inward-sloping batter (taper), ensuring gravity pulled every block inward toward the core rather than allowing lateral wall collapse.",
    materialScience:
      "Coarse-grained biotite granite displaying high quartz and microcline feldspar content; complete absence of chemical mortar eliminates water retention and freeze-thaw cracking.",
    endangermentStatus: "Vulnerable // Invasive ficus tree root wedging and wall tilt",
    image:
      "https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&w=1000&q=80",
    activeSurveys: 17,
  },
};

const INITIAL_DISPATCHES: Dispatch[] = [
  {
    id: "DSP-01",
    location: "Kalinga Terracotta Kilns",
    region: "Eastern Corridor",
    contributor: "Priya M.",
    role: "Material Historian",
    date: "14h ago",
    excerpt:
      "The specific high-iron clay composition and slow-cooling process haven't altered since the 11th century temple plinths.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/11/Beauty_of_LingrajTemple.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original",
    tags: ["Terracotta", "Stone Carving"],
  },
  {
    id: "DSP-02",
    location: "Bazaar Letterpress Vault",
    region: "Old Quarter",
    contributor: "Arjun K.",
    role: "Type Archivist",
    date: "1d ago",
    excerpt:
      "Discovered surviving wooden ligature blocks used for pre-independence regional prints, preserved in dried linseed oil.",
    image:
      "https://media.istockphoto.com/id/464999964/photo/printing-press-letters-and-accessories.jpg?s=612x612&w=0&k=20&c=1TD7hCenJs7WPm63MRSrf_VWT7rciJzfWNV0pzBD-Nw=",
    tags: ["Movable Type", "Press"],
  },
  {
    id: "DSP-03",
    location: "Sandstone Gateway Arches",
    region: "Temple Enclave",
    contributor: "Debashis R.",
    role: "Field Surveyor",
    date: "2d ago",
    excerpt:
      "Erosion along the base reliefs reveals hidden interlocking stone tongue-and-groove joints without mortar.",
    image:
      "https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=900&q=80",
    tags: ["Architecture", "Heritage"],
  },
];

const ARTIFACT_GALLERY: ArchivalArtifact[] = [
  {
    id: "ART-01",
    title: "Torana Arch Keystone",
    period: "c. 980 CE",
    medium: "Chiseled Sandstone",
    plateNumber: "PL-091",
    image:
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
    notes:
      "Features ornamental scrollwork depicting aquatic makara motifs along the primary load-bearing arch.",
    verification: {
      assayMethod: "X-Ray Powder Diffraction (XRD) & Optical Luminescence",
      datingConfidence: "980 CE (±28 yrs) // 99.1% Confidence",
      spectroscopyResults:
        "Quartz Silt (71.2%), Hematite Binder (16.4%), Trace Feldspar (4.1%)",
      chainOfCustody:
        "Field excavation register 1898 -> Central Museum vault -> Guild Registry 2026",
      verificationHash:
        "SHA256: 4a9f931d8e6a12b4e899238cf7802a4b08d7e930129bc",
      leadExaminer: "Dr. K. Patnaik, FSA",
      institution: "Civic Lithic Conservation Bureau",
      status: "AUTHENTICATED",
    },
    timeline: [
      {
        year: "980 CE",
        numericYear: 980,
        event: "Initial Carving & Dedication",
        conditionIndex: 100,
        detail:
          "Quarried from regional ferruginous sandstone beds and dedicated under royal patronage.",
      },
      {
        year: "1145 CE",
        numericYear: 1145,
        event: "Temple Mandapa Expansion",
        conditionIndex: 94,
        detail:
          "Secondary arch added above keystone; minor compression fractures recorded on rear joint.",
      },
      {
        year: "1420 CE",
        numericYear: 1420,
        event: "Monsoon Silt Infiltration",
        conditionIndex: 82,
        detail:
          "Flooding submerged the base plinth, causing early spalling along the low-relief carvings.",
      },
      {
        year: "1688 CE",
        numericYear: 1688,
        event: "Seismic Ground Displacement",
        conditionIndex: 71,
        detail:
          "Regional tectonic tremor opened an 8mm lateral gap between central interlocking voussoirs.",
      },
      {
        year: "1898 CE",
        numericYear: 1898,
        event: "Colonial Archeological Survey",
        conditionIndex: 65,
        detail:
          "British surveyors bound loose keystone joints using early zinc-plate braces and iron pins.",
      },
      {
        year: "1974 CE",
        numericYear: 1974,
        event: "Mortarless Stabilization",
        conditionIndex: 80,
        detail:
          "Zinc braces removed; chemical poultice washes extracted ingrained atmospheric sulfites.",
      },
      {
        year: "2026 CE",
        numericYear: 2026,
        event: "Photogrammetry & Guild Indexing",
        conditionIndex: 78,
        detail:
          "Sub-millimeter lidar scan uploaded to public decentralized archive registry.",
      },
    ],
  },
  {
    id: "ART-02",
    title: "Wooden Foundry Movable Type",
    period: "c. 1912",
    medium: "Oiled Teakwood",
    plateNumber: "PL-092",
    image:
      "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=800&q=80",
    notes:
      "Extracted from a regional printing guild vault. Shows hand-carved vernacular ligatures.",
    verification: {
      assayMethod: "Dendrochronological Core Growth Ring Analysis",
      datingConfidence: "Felled Winter 1909–1911 // 98.4% Confidence",
      spectroscopyResults:
        "Tectona grandis (Teak), Oxidized Linseed Residue, Carbon Black Pigment",
      chainOfCustody:
        "Provincial Press Treasury -> Underground Press Vault (1942) -> Guild 2026",
      verificationHash:
        "SHA256: 7bc902fa11904bc38e09f8721c0b34598a3421ec88910",
      leadExaminer: "M. Bhattacharya, Archival Type Master",
      institution: "Ephemera & Press Preservation Trust",
      status: "AUTHENTICATED",
    },
    timeline: [
      {
        year: "1912",
        numericYear: 1912,
        event: "Hand Cutting of Typeface",
        conditionIndex: 98,
        detail:
          "Carved out of seasoned Burma teak to withstand thousands of hand-press ink impressions.",
      },
      {
        year: "1928",
        numericYear: 1928,
        event: "High-Volume Gazette Run",
        conditionIndex: 90,
        detail:
          "Daily vernacular journal production produced edge wear on vowel mark ligatures.",
      },
      {
        year: "1942",
        numericYear: 1942,
        event: "Underground Resistance Bulletins",
        conditionIndex: 79,
        detail:
          "Hidden in rural damp earth during colonial search and seizure raids.",
      },
      {
        year: "1968",
        numericYear: 1968,
        event: "Linseed Bath Sealing",
        conditionIndex: 64,
        detail:
          "Immersed in heated linseed oil drums upon commercial adoption of hot metal monotype.",
      },
      {
        year: "1994",
        numericYear: 1994,
        event: "Entomological Remediation",
        conditionIndex: 70,
        detail:
          "Anoxic nitrogen chamber treatment arrested early teakwood borer beetle tunneling.",
      },
      {
        year: "2026 CE",
        numericYear: 2026,
        event: "Vector Font Standardization",
        conditionIndex: 73,
        detail:
          "Individual woodblocks scanned at 4800 DPI to preserve glyph kerning and ligatures.",
      },
    ],
  },
  {
    id: "ART-03",
    title: "Terracotta Relief Plaque",
    period: "c. 1640 CE",
    medium: "Kiln-Fired Silt",
    plateNumber: "PL-093",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
    notes:
      "Depicts everyday vernacular trade along coastal estuary settlements.",
    verification: {
      assayMethod: "Thermoluminescence (TL) Mineral Dating",
      datingConfidence: "1638 CE (±34 yrs) // 97.9% Confidence",
      spectroscopyResults:
        "Fe₂O₃ (14.2%), Al₂O₃ (22.8%), SiO₂ (54.1%), Zero Synthetic Additives",
      chainOfCustody:
        "Riverine Temple Plinth -> Local Council Vault -> Guild Ledger 2026",
      verificationHash:
        "SHA256: e8812c44309aef8821049bc7881023d8702391bce9812",
      leadExaminer: "Dr. Ananya Ray, Ceramic Petrographer",
      institution: "Estuary Cultural Guild Archeometry Lab",
      status: "AUTHENTICATED",
    },
    timeline: [
      {
        year: "1640 CE",
        numericYear: 1640,
        event: "Pit Kiln Vitrification",
        conditionIndex: 96,
        detail:
          "Baked with rice husk and tamarind coals to produce distinctive ferrous slip coloration.",
      },
      {
        year: "1722 CE",
        numericYear: 1722,
        event: "Temple Wall Setting",
        conditionIndex: 91,
        detail:
          "Set into slaked lime binder along the north circumambulatory exterior corridor.",
      },
      {
        year: "1810 CE",
        numericYear: 1810,
        event: "Saline Ground Exposure",
        conditionIndex: 78,
        detail:
          "Estuary tidal surges deposited halite crystals, triggering micro-spalling on perimeter relief.",
      },
      {
        year: "1931 CE",
        numericYear: 1931,
        event: "Structural Delamination",
        conditionIndex: 56,
        detail:
          "Thermal expansion cycles caused horizontal hairline fracture across primary boat rowers.",
      },
      {
        year: "1988 CE",
        numericYear: 1988,
        event: "Desalination Soak",
        conditionIndex: 74,
        detail:
          "Deionized water bath cycles extracted 94% of accumulated soluble chloride salts.",
      },
      {
        year: "2026 CE",
        numericYear: 2026,
        event: "Silicate Consolidant Infusion",
        conditionIndex: 76,
        detail:
          "Ethyl silicate consolidant injected into micro-fissures under vacuum hood.",
      },
    ],
  },
  {
    id: "ART-04",
    title: "Vernacular Postmark Ledger",
    period: "c. 1934",
    medium: "Cotton Rag & Ink",
    plateNumber: "PL-094",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
    notes:
      "Shows cancelled hand-carved rubber stamps and wax seal receipts from provincial transit nodes.",
    verification: {
      assayMethod: "Spectrophotometric Ink & Fiber Microscopy",
      datingConfidence: "1934 Postmark Verified // 100% Provenance",
      spectroscopyResults:
        "Cotton Cellulose (94%), Shellac Wax, Aniline Dye Cancel Stamps",
      chainOfCustody:
        "District Post Office Trunk -> Retired Postmaster Heirloom -> Guild Archive",
      verificationHash:
        "SHA256: 3c9902a7812bc880491fedbc667104982a0b457812903",
      leadExaminer: "S. Sengupta, Philatelic Forensicist",
      institution: "Postal Ephemera Research Circle",
      status: "AUTHENTICATED",
    },
    timeline: [
      {
        year: "1934",
        numericYear: 1934,
        event: "Provincial Postal Opening",
        conditionIndex: 100,
        detail:
          "Logged first mailbag transit across river ferries; ink stamps pristine.",
      },
      {
        year: "1948",
        numericYear: 1948,
        event: "Post-War Reclassification",
        conditionIndex: 89,
        detail:
          "Transferred to regional government depository; page corners show minor handling folds.",
      },
      {
        year: "1962",
        numericYear: 1962,
        event: "Monsoon Moisture Bloom",
        conditionIndex: 72,
        detail:
          "Damp warehouse storage caused foxing and localized iron-gall ink bleed on pages 40–48.",
      },
      {
        year: "1985",
        numericYear: 1985,
        event: "Silverfish & Insect Attack",
        conditionIndex: 61,
        detail:
          "Starch paste binding consumed by silverfish, detaching spine signatures.",
      },
      {
        year: "2010",
        numericYear: 2010,
        event: "Japanese Tissue Mending",
        conditionIndex: 79,
        detail:
          "Kizukishi Kozo paper strips reinforced tears using wheat starch adhesive.",
      },
      {
        year: "2026 CE",
        numericYear: 2026,
        event: "Deacidification & Ingestion",
        conditionIndex: 83,
        detail:
          "Non-aqueous magnesium oxide buffer spray stabilized cellulose fiber pH to 7.8.",
      },
    ],
  },
  {
    id: "ART-05",
    title: "Perforated Sandstone Jali",
    period: "c. 1580 CE",
    medium: "Red Sandstone",
    plateNumber: "PL-095",
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
    notes:
      "Geometric airflow lattice engineered to accelerate ambient cross-ventilation in arid seasons.",
    verification: {
      assayMethod: "Non-Destructive Ultrasonic Velocity Testing (UPV)",
      datingConfidence: "1580 CE (±40 yrs) // Structural Integrity Validated",
      spectroscopyResults:
        "Ferruginous Quartz Arenite, Sub-angular Grains, Silica Cementation",
      chainOfCustody:
        "Fort Pavilion Wall -> Monument Registry (1922) -> Guild 2026",
      verificationHash:
        "SHA256: f0182ba9c87410293ebca67120489bca7820129bcfe18",
      leadExaminer: "Eng. R. K. Nayak, Structural Archeologist",
      institution: "Heritage Engineering Taskforce",
      status: "AUTHENTICATED",
    },
    timeline: [
      {
        year: "1580 CE",
        numericYear: 1580,
        event: "Geometric Chisel Piercing",
        conditionIndex: 98,
        detail:
          "Monolithic slab pierced with 120 interlocking octagonal perforations.",
      },
      {
        year: "1704 CE",
        numericYear: 1704,
        event: "Windward Sandblasting",
        conditionIndex: 88,
        detail:
          "Decades of desert dust storms softened external sharp relief edges.",
      },
      {
        year: "1857 CE",
        numericYear: 1857,
        event: "Siege Shockwave Fracture",
        conditionIndex: 68,
        detail:
          "Concussive blast created diagonal shear fissure through lower four rows.",
      },
      {
        year: "1940 CE",
        numericYear: 1940,
        event: "Ferrous Cramp Rust Expansion",
        conditionIndex: 59,
        detail:
          "Colonial iron repair pins oxidized and expanded, causing stone cracking.",
      },
      {
        year: "1998 CE",
        numericYear: 1998,
        event: "Titanium Dowel Replacement",
        conditionIndex: 75,
        detail:
          "Corroded iron cramps replaced with inert titanium rods and lime grout.",
      },
      {
        year: "2026 CE",
        numericYear: 2026,
        event: "Ultrasonic Pulse Validation",
        conditionIndex: 77,
        detail:
          "Acoustic pulse sensors indicate uniform compressive load path.",
      },
    ],
  },
  {
    id: "ART-06",
    title: "Monolithic Pillar Fluting",
    period: "c. 1020 CE",
    medium: "Carved Granulite",
    plateNumber: "PL-096",
    image:
      "https://www.worldhistory.org/img/r/p/1500x1500/1101.jpg.webp?v=1721079843",
    notes:
      "Fluted column base exhibiting microscopic chisel striations consistent with hardened iron points.",
    verification: {
      assayMethod: "Laser Confocal Chisel Wear Metrology",
      datingConfidence: "Early 11th Century // 96.5% Mineral Match",
      spectroscopyResults:
        "Granulite Facies Metamorphic Rock (Garnet-Sillimanite-Gneiss Complex)",
      chainOfCustody:
        "Temple Mandapa Ruin -> In-Situ Preservation Zone -> Guild Telemetry 2026",
      verificationHash:
        "SHA256: d90184b238ef10924cba89710389ebca5610293847ab1",
      leadExaminer: "Prof. T. Mohanty",
      institution: "State Geochronology Research Institute",
      status: "AUTHENTICATED",
    },
    timeline: [
      {
        year: "1020 CE",
        numericYear: 1020,
        event: "Monolithic Lathe Turning",
        conditionIndex: 97,
        detail:
          "Single block smoothed with abrasive emery powders and river stone rollers.",
      },
      {
        year: "1350 CE",
        numericYear: 1350,
        event: "Superstructure Collapse",
        conditionIndex: 82,
        detail:
          "Collapse of masonry ceiling dumped sandstone beams on pillar capital.",
      },
      {
        year: "1680 CE",
        numericYear: 1680,
        event: "Foundation Tilting",
        conditionIndex: 69,
        detail:
          "Differential soil subsidence skewed pillar 1.8° off vertical axis.",
      },
      {
        year: "1910 CE",
        numericYear: 1910,
        event: "Archaeological Excavation",
        conditionIndex: 64,
        detail:
          "Buried under 2 meters of river silt; vegetation root systems cleared.",
      },
      {
        year: "1982 CE",
        numericYear: 1982,
        event: "Hydraulic Jack Re-leveling",
        conditionIndex: 78,
        detail:
          "Sub-base plinth reinforced with micro-piles to halt foundation roll.",
      },
      {
        year: "2026 CE",
        numericYear: 2026,
        event: "Strain Gauge Telemetry",
        conditionIndex: 80,
        detail:
          "Continuous optical strain telemetry monitors micro-settlement.",
      },
    ],
  },
  {
    id: "ART-07",
    title: "Hand-Bound Court Chronicle",
    period: "c. 1876",
    medium: "Marbled Binding & Vellum",
    plateNumber: "PL-097",
    image:
      "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80",
    notes:
      "Hand-inked bilingual land boundary arbitration records preserved with pine-resin sealant.",
    verification: {
      assayMethod: "FTIR Spectroscopy & Multispectral Fluorescence",
      datingConfidence: "Circa 1876 Certified // Document Seal Cross-Referenced",
      spectroscopyResults:
        "Oak Gall Acid, Gum Arabic, Rag Paper Sizing (Animal Gelatin)",
      chainOfCustody:
        "Feudatory Court Record Room -> District Archive -> Guild Scan Project 2026",
      verificationHash:
        "SHA256: a177289b4c09238471bce68201948bcaf782910384729",
      leadExaminer: "R. Lal Das, Conservator",
      institution: "Civic Paleography Guild",
      status: "AUTHENTICATED",
    },
    timeline: [
      {
        year: "1876",
        numericYear: 1876,
        event: "Court Inscription",
        conditionIndex: 98,
        detail:
          "Scribe executed boundaries using lampblack and gall inks on English rag paper.",
      },
      {
        year: "1905",
        numericYear: 1905,
        event: "Marbled Paper Rebound",
        conditionIndex: 91,
        detail:
          "Comb-pattern marbled paper covers fitted to protect inner legal leaves.",
      },
      {
        year: "1947",
        numericYear: 1947,
        event: "Trunk Transfer & Acidification",
        conditionIndex: 76,
        detail:
          "Packed in galvanized iron trunks during administrative transfers.",
      },
      {
        year: "1978",
        numericYear: 1978,
        event: "Fungal Inoculation",
        conditionIndex: 62,
        detail:
          "Aspergillus mold colonies caused purple staining along tail margins.",
      },
      {
        year: "2008",
        numericYear: 2008,
        event: "Ethanol Sterilization",
        conditionIndex: 75,
        detail:
          "Controlled alcohol vapor treatment neutralized inactive fungal spores.",
      },
      {
        year: "2026 CE",
        numericYear: 2026,
        event: "Multispectral Extraction",
        conditionIndex: 79,
        detail:
          "Ultra-violet multispectral photography recovered faded legal annotations.",
      },
    ],
  },
  {
    id: "ART-08",
    title: "Cast Bronze Votive Seal",
    period: "c. 1250 CE",
    medium: "Lost-Wax Bronze",
    plateNumber: "PL-098",
    image:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
    notes:
      "Official seal insignia used by guild merchants to guarantee grain measure calibration.",
    verification: {
      assayMethod: "X-Ray Fluorescence (XRF) Alloy Assay",
      datingConfidence: "13th Century Alloy Fingerprint // 99.7% Provenance",
      spectroscopyResults:
        "Copper (82.4%), Tin (12.1%), Lead (4.3%), Trace Silver (0.8%)",
      chainOfCustody:
        "Riverbed Silt Dredging Find (1962) -> Guild Numismatic Vault 2026",
      verificationHash:
        "SHA256: 8810bca3471092847bcdae682019384712093847bca19",
      leadExaminer: "Dr. H. Jena, Archeometallurgist",
      institution: "Maritime Trade Guild Research Laboratory",
      status: "AUTHENTICATED",
    },
    timeline: [
      {
        year: "1250 CE",
        numericYear: 1250,
        event: "Lost-Wax Casting",
        conditionIndex: 100,
        detail:
          "Cast in bell-metal bronze with recessed negative intaglio seal matrix.",
      },
      {
        year: "1380 CE",
        numericYear: 1380,
        event: "River Estuary Loss",
        conditionIndex: 88,
        detail:
          "Cargo boat capsized in tidal bar; seal settled into anaerobic silt bed.",
      },
      {
        year: "1620 CE",
        numericYear: 1620,
        event: "Cuprite Patination",
        conditionIndex: 82,
        detail:
          "Stable dark red cuprite skin formed in low-oxygen brackish sediment.",
      },
      {
        year: "1962 CE",
        numericYear: 1962,
        event: "Dredging Recovery & Bronze Disease",
        conditionIndex: 65,
        detail:
          "Sudden air exposure triggered cuprous chloride bronze disease pits.",
      },
      {
        year: "1995 CE",
        numericYear: 1995,
        event: "Sodium Sesquicarbonate Bath",
        conditionIndex: 80,
        detail:
          "Two-year alkaline soak converted active chlorides into stable patina.",
      },
      {
        year: "2026 CE",
        numericYear: 2026,
        event: "Benzotriazole & Microcrystalline Wax",
        conditionIndex: 85,
        detail:
          "Vacuum-sealed in microcrystalline wax to isolate atmospheric moisture.",
      },
    ],
  },
];

/* Specific Reading Options for the Dropdown Menus */
interface DropdownTopic {
  label: string;
  tag: string;
  desc: string;
}

const FOLK_TERRACOTTA_TOPICS: DropdownTopic[] = [
  {
    label: "All Terracotta Dispatches",
    tag: "Terracotta",
    desc: "Index of all kiln and silt terracotta architecture records.",
  },
  {
    label: "Slip Vitrification & Pit Kilns",
    tag: "Terracotta",
    desc: "High-iron ferrous glaze and rice-husk slow-cooling dynamics.",
  },
  {
    label: "Folkloric Coastal Relics",
    tag: "Terracotta",
    desc: "Vernacular river-basin plaques and protective terracotta iconography.",
  },
];

const TYPE_PRESS_TOPICS: DropdownTopic[] = [
  {
    label: "All Movable Type Dispatches",
    tag: "Type",
    desc: "Complete archival press ledger and letterpress specimens.",
  },
  {
    label: "Vernacular Ligature Blocks",
    tag: "Movable Type",
    desc: "Seasoned Burma teak & linseed bath preservative blocks.",
  },
  {
    label: "Foundry Metal & Hand Moulds",
    tag: "Press",
    desc: "Low-temperature antimony-lead tertiary alloy punch matrices.",
  },
];

export default function Home() {
  const [dispatches, setDispatches] = useState<Dispatch[]>(INITIAL_DISPATCHES);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [endorsed, setEndorsed] = useState<Record<string, number>>({
    "DSP-01": 14,
    "DSP-02": 29,
    "DSP-03": 8,
  });

  const [selectedArtifact, setSelectedArtifact] =
    useState<ArchivalArtifact | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<
    "TIMELINE" | "VERIFICATION"
  >("TIMELINE");
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState<number>(0);

  // Cartographic State
  const [hoveredRegionKey, setHoveredRegionKey] = useState<string>("kalinga");
  const [detailedMapNode, setDetailedMapNode] =
    useState<CartographicNode | null>(null);

  // Custom Dropdown State for the "+" buttons
  const [activeDropdown, setActiveDropdown] = useState<"TERRACOTTA" | "TYPE" | null>(null);
  const filterRibbonRef = useRef<HTMLDivElement>(null);

  // Custom Brutalist Confirmation Dialog State
  const [confirmDialog, setConfirmDialog] = useState<CustomConfirmDialog>({
    isOpen: false,
    type: "REVOKE_ITEM",
    title: "",
    message: "",
  });

  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [newLocation, setNewLocation] = useState("");
  const [newRegion, setNewRegion] = useState("");
  const [newContributor, setNewContributor] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newExcerpt, setNewExcerpt] = useState("");
  const [newTag, setNewTag] = useState("Architecture");

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterEnrolled, setNewsletterEnrolled] = useState(false);

  const carouselRef = useRef<HTMLDivElement>(null);
  const dispatchesRef = useRef<HTMLElement>(null);
  const specimensRef = useRef<HTMLElement>(null);
  const cartographyRef = useRef<HTMLElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRibbonRef.current &&
        !filterRibbonRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Hydrate Dispatches & Endorsements from localStorage on mount
  useEffect(() => {
    try {
      const savedDispatches = localStorage.getItem("vernacular_guild_dispatches");
      if (savedDispatches) {
        setDispatches(JSON.parse(savedDispatches));
      }
      const savedEndorsements = localStorage.getItem("vernacular_guild_endorsed");
      if (savedEndorsements) {
        setEndorsed(JSON.parse(savedEndorsements));
      }
    } catch (err) {
      console.error("Storage hydration error:", err);
    }
  }, []);

  const activeNodeData =
    CARTOGRAPHIC_NODES[hoveredRegionKey] || CARTOGRAPHIC_NODES.kalinga;

  const toggleEndorse = (id: string) => {
    setEndorsed((prev) => {
      const updated = {
        ...prev,
        [id]: (prev[id] || 0) + 1,
      };
      try {
        localStorage.setItem("vernacular_guild_endorsed", JSON.stringify(updated));
      } catch (err) {
        console.error("Failed to save endorsement:", err);
      }
      return updated;
    });
  };

  const requestDeleteDispatch = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const target = dispatches.find((d) => d.id === id);
    setConfirmDialog({
      isOpen: true,
      type: "REVOKE_ITEM",
      targetId: id,
      title: `REVOKE EVIDENCE // [${id}]`,
      message: `Permanently purge this field dispatch from decentralized guild archives?`,
      details: target ? `Entry: "${target.location}" by ${target.contributor} (${target.region})` : undefined,
    });
  };

  const requestPurgeAllDispatches = () => {
    const userSubmittedCount = dispatches.length - INITIAL_DISPATCHES.length;
    setConfirmDialog({
      isOpen: true,
      type: "RECYCLE_ALL",
      title: "RECYCLE ARCHIVAL REGISTRY",
      message: userSubmittedCount > 0
        ? `Execute ledger recycling? This action will permanently purge ${userSubmittedCount} custom observer submissions and restore initial registry state.`
        : `Reset and re-synchronize local archival storage caches to baseline configuration?`,
      details: "Database entries will be re-indexed to Edition IV baseline specifications.",
    });
  };

  const handleExecuteConfirmedAction = () => {
    if (confirmDialog.type === "REVOKE_ITEM" && confirmDialog.targetId) {
      const filtered = dispatches.filter((d) => d.id !== confirmDialog.targetId);
      setDispatches(filtered);
      try {
        localStorage.setItem("vernacular_guild_dispatches", JSON.stringify(filtered));
      } catch (err) {
        console.error("Failed to update storage upon deletion:", err);
      }
    } else if (confirmDialog.type === "RECYCLE_ALL") {
      setDispatches(INITIAL_DISPATCHES);
      const initialEndorsements = { "DSP-01": 14, "DSP-02": 29, "DSP-03": 8 };
      setEndorsed(initialEndorsements);
      try {
        localStorage.removeItem("vernacular_guild_dispatches");
        localStorage.removeItem("vernacular_guild_endorsed");
      } catch (err) {
        console.error("Failed to clear localStorage:", err);
      }
    }
    setConfirmDialog({ isOpen: false, type: "REVOKE_ITEM", title: "", message: "" });
  };

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 340;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleFilterClick = (tag: string) => {
    setActiveFilter(tag);
    if (dispatchesRef.current) {
      dispatchesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openArtifactInspection = (artifact: ArchivalArtifact) => {
    setSelectedArtifact(artifact);
    setActiveModalTab("TIMELINE");
    setActiveMilestoneIndex(0);
  };

  const handleCreateDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLocation || !newContributor) return;

    const newEntry: Dispatch = {
      id: `DSP-0${dispatches.length + 1}`,
      location: newLocation,
      region: newRegion || "Field Observation",
      contributor: newContributor,
      role: newRole || "Archival Observer",
      date: "Just now",
      excerpt:
        newExcerpt ||
        "Newly submitted field testimony pending corroboration.",
      image:
        "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80",
      tags: [newTag, "Field Submission"],
    };

    const nextList = [newEntry, ...dispatches];
    setDispatches(nextList);

    setEndorsed((prev) => {
      const nextEndorse = { ...prev, [newEntry.id]: 1 };
      try {
        localStorage.setItem("vernacular_guild_endorsed", JSON.stringify(nextEndorse));
      } catch (err) {
        console.error("Storage error:", err);
      }
      return nextEndorse;
    });

    try {
      localStorage.setItem("vernacular_guild_dispatches", JSON.stringify(nextList));
    } catch (err) {
      console.error("Storage error:", err);
    }

    setIsSubmitOpen(false);
    setNewLocation("");
    setNewRegion("");
    setNewContributor("");
    setNewRole("");
    setNewExcerpt("");
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterEnrolled(true);
    setTimeout(() => {
      setNewsletterEmail("");
    }, 3000);
  };

  const filteredDispatches =
    activeFilter === "ALL"
      ? dispatches
      : dispatches.filter((d) =>
          d.tags.some((t) =>
            t.toLowerCase().includes(activeFilter.toLowerCase())
          )
        );

  return (
    <main className="min-h-screen archival-grain p-3 sm:p-6 md:p-8 flex flex-col items-center gap-8">
      {/* Primary Container Frame */}
      <div className="w-full max-w-7xl border-2 border-stone-800 bg-stone-50 p-4 sm:p-8 shadow-[8px_8px_0px_rgba(28,25,23,1)] flex flex-col justify-between">
        <header className="border-b-2 border-stone-800 pb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2 w-2 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-600" />
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-stone-600 leading-none">
                  Open Collective // {1420 + dispatches.length - 3} Observers
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-normal text-stone-900 leading-tight flex items-baseline">
                <span className="font-normal tracking-wide">The</span>
                <span className="italic font-bold -ml-0 mr-2.5 inline-block text-red-600">
                  VERNACULAR
                </span>
                <span className="font-normal tracking-wide">Guild</span>
              </h1>
            </div>

            {/* Navigation & Action Buttons */}
            <div className="flex flex-col sm:items-end gap-2 w-full lg:w-auto">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setActiveFilter("ALL");
                    dispatchesRef.current?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-3 py-1.5 font-mono text-xs uppercase tracking-wider border border-stone-800 bg-white text-stone-900 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-200 shadow-[2px_2px_0px_rgba(28,25,23,1)] active:translate-x-[1px] active:translate-y-[1px]"
                >
                  [Field Reports]
                </button>
                <button
                  onClick={() => {
                    specimensRef.current?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-3 py-1.5 font-mono text-xs uppercase tracking-wider border border-stone-800 bg-white text-stone-900 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-200 shadow-[2px_2px_0px_rgba(28,25,23,1)] active:translate-x-[1px] active:translate-y-[1px]"
                >
                  [Specimen Index]
                </button>
                <button
                  onClick={() => {
                    cartographyRef.current?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-3 py-1.5 font-mono text-xs uppercase tracking-wider border border-stone-800 bg-white text-stone-900 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-200 shadow-[2px_2px_0px_rgba(28,25,23,1)] active:translate-x-[1px] active:translate-y-[1px]"
                >
                  [World Atlas]
                </button>
                <button
                  onClick={() => setIsSubmitOpen(true)}
                  className="px-3 py-1.5 font-mono text-xs uppercase tracking-wider border border-stone-800 bg-white text-stone-900 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-200 shadow-[2px_2px_0px_rgba(28,25,23,1)] active:translate-x-[1px] active:translate-y-[1px]"
                >
                  [Submit Evidence +]
                </button>
              </div>

              {/* Dedicated Archival Recycle / Reset button */}
              <div className="flex justify-start sm:justify-end w-full">
                <button
                  onClick={requestPurgeAllDispatches}
                  title="Recycle and revert all custom dispatches back to initial curated archive"
                  className="px-1.5 py-1 font-mono text-[11px] uppercase tracking-wider border border-stone-800 bg-stone-100 text-stone-700 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-200 shadow-[2px_2px_0px_rgba(28,25,23,1)] flex items-center gap-1 active:translate-x-[1px] active:translate-y-[1px]"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>[Recycle]</span>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-dashed border-stone-300 flex flex-wrap justify-between text-xs font-mono text-stone-500">
            <span className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-stone-400" />
              ACTIVE FILTER:{" "}
              <strong className="text-stone-900 font-bold uppercase">
                [{activeFilter}]
              </strong>
              {activeFilter !== "ALL" && (
                <button
                  onClick={() => setActiveFilter("ALL")}
                  className="text-red-600 underline text-[11px] ml-1"
                >
                  Reset
                </button>
              )}
            </span>
            <span className="text-red-700 font-semibold uppercase">
              STATUS: HOVER RECORDS TO REVEAL CHROMATIC PROFILE
            </span>
          </div>
        </header>

        {/* Filter Anchors with Interactive Dropdown Menus on '+' Icons */}
        <div
          ref={filterRibbonRef}
          className="relative py-4 flex flex-wrap gap-4 sm:gap-8 justify-center font-mono text-xs text-stone-600 border-b border-stone-200"
        >
          {/* 1. FOLKLORISTS & TERRACOTTA (WITH INTERACTIVE '+' DROPDOWN) */}
          <div className="relative">
            <button
              onClick={() =>
                setActiveDropdown(activeDropdown === "TERRACOTTA" ? null : "TERRACOTTA")
              }
              className={`flex items-center gap-1.5 transition-colors ${
                activeDropdown === "TERRACOTTA" || activeFilter === "Terracotta"
                  ? "text-red-600 font-bold underline"
                  : "hover:text-red-600"
              }`}
            >
              <span className="font-bold">{activeDropdown === "TERRACOTTA" ? "−" : "+"}</span>
              <span>Folklorists &amp; Terracotta</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform ${
                  activeDropdown === "TERRACOTTA" ? "rotate-180 text-red-600" : "text-stone-400"
                }`}
              />
            </button>

            {/* Submenu Dropdown Panel (Positioned exactly over the designated card area) */}
            {activeDropdown === "TERRACOTTA" && (
              <div className="absolute left-0 top-full mt-2 w-72 sm:w-80 bg-stone-50 border-2 border-stone-900 p-3 shadow-[6px_6px_0px_rgba(28,25,23,1)] z-40 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between border-b border-stone-300 pb-2 mb-2 font-mono text-[10px] text-stone-500">
                  <span className="flex items-center gap-1 text-red-600 font-bold uppercase">
                    <Layers className="w-3 h-3" /> [ TERRACOTTA ARCHIVE DOSSIERS ]
                  </span>
                  <span>SELECT FOCUS</span>
                </div>

                <div className="space-y-1.5">
                  {FOLK_TERRACOTTA_TOPICS.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        handleFilterClick(item.tag);
                        setActiveDropdown(null);
                      }}
                      className="w-full text-left p-2 border border-stone-200 bg-white hover:border-red-600 hover:bg-red-50/60 transition-all group"
                    >
                      <div className="font-serif font-bold text-sm tracking-wider text-stone-900 group-hover:text-red-600 flex items-center justify-between">
                        <span>{item.label}</span>
                        <CornerDownRight className="w-3 h-3 text-stone-400 group-hover:text-red-600" />
                      </div>
                      <p className="font-sans text-[11px] text-stone-600 mt-0.5 leading-snug">
                        {item.desc}
                      </p>
                    </button>
                  ))}
                </div>

                <div className="mt-2 pt-2 border-t border-dashed border-stone-300 flex justify-between items-center text-[10px] text-stone-400 font-mono">
                  <span>FILTER INDEX</span>
                  <button
                    onClick={() => {
                      handleFilterClick("ALL");
                      setActiveDropdown(null);
                    }}
                    className="hover:text-red-600 underline"
                  >
                    Reset Filter
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 2. STONE MASONS & CARVINGS */}
          <button
            onClick={() => {
              setActiveDropdown(null);
              handleFilterClick("Stone");
            }}
            className="hover:text-red-600 transition-colors"
          >
            * Stone Masons &amp; Carvings
          </button>

          {/* 3. TYPE COLLECTORS & PRESS (WITH INTERACTIVE '+' DROPDOWN) */}
          <div className="relative">
            <button
              onClick={() =>
                setActiveDropdown(activeDropdown === "TYPE" ? null : "TYPE")
              }
              className={`flex items-center gap-1.5 transition-colors ${
                activeDropdown === "TYPE" || activeFilter === "Type" || activeFilter === "Movable Type"
                  ? "text-red-600 font-bold underline"
                  : "hover:text-red-600"
              }`}
            >
              <span className="font-bold">{activeDropdown === "TYPE" ? "−" : "+"}</span>
              <span>Type Collectors &amp; Press</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform ${
                  activeDropdown === "TYPE" ? "rotate-180 text-red-600" : "text-stone-400"
                }`}
              />
            </button>

            {/* Submenu Dropdown Panel (Positioned exactly over the designated card area) */}
            {activeDropdown === "TYPE" && (
              <div className="absolute left-0 sm:-left-12 top-full mt-2 w-72 sm:w-80 bg-stone-50 border-2 border-stone-900 p-3 shadow-[6px_6px_0px_rgba(28,25,23,1)] z-40 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between border-b border-stone-300 pb-2 mb-2 font-mono text-[10px] text-stone-500">
                  <span className="flex items-center gap-1 text-red-600 font-bold uppercase">
                    <Layers className="w-3 h-3" /> [ TYPOGRAPHY VAULT INDEX ]
                  </span>
                  <span>SELECT FOCUS</span>
                </div>

                <div className="space-y-1.5">
                  {TYPE_PRESS_TOPICS.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        handleFilterClick(item.tag);
                        setActiveDropdown(null);
                      }}
                      className="w-full text-left p-2 border border-stone-200 bg-white hover:border-red-600 hover:bg-red-50/60 transition-all group"
                    >
                      <div className="font-serif font-bold text-sm text-stone-900 group-hover:text-red-600 flex items-center justify-between">
                        <span>{item.label}</span>
                        <CornerDownRight className="w-3 h-3 text-stone-400 group-hover:text-red-600" />
                      </div>
                      <p className="font-sans text-[11px] text-stone-600 mt-0.5 leading-snug">
                        {item.desc}
                      </p>
                    </button>
                  ))}
                </div>

                <div className="mt-2 pt-2 border-t border-dashed border-stone-300 flex justify-between items-center text-[10px] text-stone-400 font-mono">
                  <span>FILTER INDEX</span>
                  <button
                    onClick={() => {
                      handleFilterClick("ALL");
                      setActiveDropdown(null);
                    }}
                    className="hover:text-red-600 underline"
                  >
                    Reset Filter
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 4. ARCHITECTURE EPHEMERA */}
          <button
            onClick={() => {
              setActiveDropdown(null);
              handleFilterClick("Architecture");
            }}
            className="hover:text-red-600 transition-colors"
          >
            * Architecture Ephemera
          </button>
        </div>

        {/* Primary Dispatches Grid with Individual Evidence Removal Options */}
        <section ref={dispatchesRef} className="my-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredDispatches.map((dispatch) => (
              <article
                key={dispatch.id}
                className="group relative border border-stone-400 bg-white p-4 transition-all duration-500 hover:border-red-600 hover:shadow-[6px_6px_0px_rgba(220,38,38,1)]"
              >
                {/* Header row with Delete shortcut button on hover */}
                <div className="flex justify-between items-center font-mono text-xs mb-3 text-stone-500">
                  <span className="font-bold text-stone-800 group-hover:text-red-600 transition-colors">
                    {dispatch.id}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-stone-400" />
                      {dispatch.region}
                    </span>
                    <button
                      onClick={(e) => requestDeleteDispatch(dispatch.id, e)}
                      title="Expunge this evidence record"
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-600 hover:text-white transition-all border border-transparent hover:border-red-700 text-stone-400 ml-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="relative aspect-[4/3] overflow-hidden bg-stone-200 border border-stone-200">
                  <img
                    src={dispatch.image}
                    alt={dispatch.location}
                    className="h-full w-full object-cover grayscale contrast-125 brightness-95 
                               transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                               group-hover:grayscale-0 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 bg-red-600 text-white font-mono text-[10px] px-2 py-0.5 uppercase tracking-wider flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ShieldCheck className="w-3 h-3" />
                    Verified
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {dispatch.tags.map((tag, i) => (
                      <button
                        key={i}
                        onClick={() => handleFilterClick(tag)}
                        className="text-[10px] font-mono uppercase bg-stone-100 px-1.5 py-0.5 border border-stone-300 text-stone-600 hover:border-red-600 hover:text-red-600 transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>

                  <h2 className="font-serif text-xl font-bold tracking-normal text-stone-900 group-hover:text-red-600 transition-colors">
                    {dispatch.location}
                  </h2>
                  <p className="font-mono text-xs text-stone-500 mt-1">
                    Logged by {dispatch.contributor} // {dispatch.role}
                  </p>

                  <p className="text-sm text-stone-700 mt-3 leading-relaxed border-t border-stone-200 pt-3 font-sans">
                    {dispatch.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-dashed border-stone-300 flex items-center justify-between text-xs font-mono">
                  <button
                    onClick={() => toggleEndorse(dispatch.id)}
                    className="flex items-center gap-1.5 px-2 py-1 border border-stone-300 text-stone-700 hover:border-red-600 hover:text-red-600 transition-colors active:scale-95"
                  >
                    <Stamp className="w-3.5 h-3.5 text-red-600" />
                    <span>Endorse [{endorsed[dispatch.id] || 0}]</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="text-stone-400">{dispatch.date}</span>
                    <button
                      onClick={(e) => requestDeleteDispatch(dispatch.id, e)}
                      title="Revoke and remove evidence"
                      className="text-[10px] uppercase text-stone-400 hover:text-red-600 hover:underline flex items-center gap-0.5 ml-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      [Revoke]
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredDispatches.length === 0 && (
            <div className="p-8 text-center border border-dashed border-stone-400 bg-white font-mono text-sm text-stone-500">
              No field dispatches match tag [{activeFilter}].{" "}
              <button
                onClick={() => setActiveFilter("ALL")}
                className="text-red-600 font-bold underline"
              >
                Clear filter
              </button>
            </div>
          )}
        </section>

        {/* Specimen Carousel */}
        <section ref={specimensRef} className="mt-6 pt-6 border-t-2 border-stone-800">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <span className="font-mono text-xs text-red-600 uppercase tracking-widest block font-bold">
                [ ARCHIVAL SPECIMEN REPOSITORY ]
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-normal text-stone-900 mt-1">
                Physical Evidence &amp; Fragments
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-stone-500">
                SCROLL INDEX
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => scrollCarousel("left")}
                  aria-label="Scroll left"
                  className="p-2 border border-stone-800 bg-white hover:bg-red-600 hover:text-white transition-all shadow-[2px_2px_0px_rgba(28,25,23,1)] active:translate-x-[1px] active:translate-y-[1px]"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollCarousel("right")}
                  aria-label="Scroll right"
                  className="p-2 border border-stone-800 bg-white hover:bg-red-600 hover:text-white transition-all shadow-[2px_2px_0px_rgba(28,25,23,1)] active:translate-x-[1px] active:translate-y-[1px]"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div
            ref={carouselRef}
            className="flex gap-5 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {ARTIFACT_GALLERY.map((artifact) => (
              <div
                key={artifact.id}
                onClick={() => openArtifactInspection(artifact)}
                className="group flex-none w-[290px] sm:w-[330px] snap-start border border-stone-400 bg-white p-4 transition-all duration-500 hover:border-red-600 hover:shadow-[5px_5px_0px_rgba(220,38,38,1)] cursor-pointer"
              >
                <div className="flex justify-between items-center font-mono text-[11px] text-stone-500 mb-2.5">
                  <span className="font-bold text-stone-800 group-hover:text-red-600 transition-colors">
                    {artifact.plateNumber}
                  </span>
                  <span>{artifact.period}</span>
                </div>

                <div className="relative aspect-square overflow-hidden bg-stone-200 border border-stone-200">
                  <img
                    src={artifact.image}
                    alt={artifact.title}
                    className="h-full w-full object-cover grayscale contrast-125 brightness-95 
                               transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                               group-hover:grayscale-0 group-hover:scale-105"
                  />
                  <div className="absolute bottom-2 left-2 bg-stone-900/85 text-white font-mono text-[9px] px-2 py-0.5 uppercase tracking-wider backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {artifact.medium}
                  </div>
                </div>

                <div className="mt-3">
                  <h3 className="font-serif text-lg font-bold tracking-normal text-stone-900 group-hover:text-red-600 transition-colors line-clamp-1">
                    {artifact.title}
                  </h3>
                  <div className="mt-2 pt-2 border-t border-dashed border-stone-200 flex items-center justify-between text-[11px] font-mono text-stone-500">
                    <span className="flex items-center gap-1 group-hover:text-red-600 transition-colors font-semibold">
                      <Eye className="w-3 h-3" /> Inspect Telemetry &amp; Assay
                    </span>
                    <span className="text-red-600 font-semibold">[DOSSIER]</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Global Cartographic World Atlas */}
        <section
          ref={cartographyRef}
          className="mt-8 pt-8 border-t-2 border-stone-800"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <span className="font-mono text-xs text-red-600 uppercase tracking-widest block font-bold flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-red-600 animate-spin" />
                [ CARTOGRAPHIC FIELD OBSERVATORY // PROJECTION PLATE 01 ]
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-normal text-stone-900 mt-1">
                Global Vernacular Survey &amp; Cartographic Nodes
              </h2>
            </div>
            <div className="flex items-center gap-3 font-mono text-xs text-stone-500">
              <span className="flex items-center gap-1 text-stone-700 font-semibold">
                <Radio className="w-3 h-3 text-red-600 animate-pulse" />
                12 MONITORED ARCHITECTURAL CRADLES
              </span>
              <span className="hidden md:inline">// CALIBRATED REGISTER</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 border-2 border-stone-800 bg-white p-4 sm:p-6 shadow-[6px_6px_0px_rgba(28,25,23,1)]">
            {/* Left 8 Columns: World Map Loaded from public/worldmap.png */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              <div className="relative w-full aspect-[2/1] border border-stone-400 bg-[#fbfbf9] overflow-hidden select-none">
                <img
                  src="/worldmap.png"
                  alt="Cartographic World Projection"
                  className="w-full h-full object-fill filter contrast-125 brightness-[0.98]"
                />

                {Object.entries(CARTOGRAPHIC_NODES).map(([key, node]) => {
                  const isSelected = hoveredRegionKey === key;
                  return (
                    <div
                      key={key}
                      style={{
                        left: `${node.x}%`,
                        top: `${node.y}%`,
                        width: `${node.hitboxWidth}%`,
                        height: `${node.hitboxHeight}%`,
                      }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 flex items-center justify-center group"
                      onMouseEnter={() => setHoveredRegionKey(key)}
                      onClick={() => {
                        setHoveredRegionKey(key);
                        setDetailedMapNode(node);
                      }}
                    >
                      <div className="absolute inset-0 rounded-full border border-dashed border-transparent group-hover:border-red-500/40 transition-colors" />

                      {isSelected && (
                        <span className="absolute h-10 w-10 rounded-full bg-red-600/25 animate-ping pointer-events-none" />
                      )}

                      <div
                        className={`relative flex items-center justify-center transition-all duration-300 ${
                          isSelected
                            ? "scale-125"
                            : "scale-90 opacity-60 group-hover:opacity-100 group-hover:scale-110"
                        }`}
                      >
                        <div className="h-3.5 w-3.5 rounded-full border-2 border-red-600 bg-white shadow-[0_0_8px_rgba(220,38,38,0.9)] flex items-center justify-center">
                          <div className="h-1.5 w-1.5 rounded-full bg-red-600" />
                        </div>
                        <div
                          className={`absolute -inset-1 border border-stone-900/40 pointer-events-none transition-opacity ${
                            isSelected ? "opacity-100" : "opacity-0"
                          }`}
                        />
                      </div>

                      {isSelected && (
                        <div className="absolute left-5 -top-3 whitespace-nowrap bg-stone-900 text-white font-mono text-[10px] px-2 py-0.5 border border-stone-900 shadow-md pointer-events-none z-30 animate-in fade-in zoom-in-95 duration-150 flex items-center gap-1.5">
                          <span className="text-red-500 font-bold">●</span>
                          <span>[{node.name}]</span>
                        </div>
                      )}
                    </div>
                  );
                })}

                <div className="absolute bottom-2 left-2 bg-stone-900/90 text-white font-mono text-[9px] px-2.5 py-1 uppercase tracking-wider backdrop-blur-xs flex items-center gap-3 border border-stone-700 z-10">
                  <span className="flex items-center gap-1.5 text-red-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                    LIVE STATION LOCATOR
                  </span>
                  <span className="text-stone-400 hidden sm:inline">
                    COORDINATE: [{activeNodeData.coordinates}]
                  </span>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5 font-mono text-[10px]">
                <span className="text-stone-500 py-1 mr-1">QUICK RELAYS:</span>
                {Object.entries(CARTOGRAPHIC_NODES).map(([key, node]) => (
                  <button
                    key={key}
                    onClick={() => setHoveredRegionKey(key)}
                    onMouseEnter={() => setHoveredRegionKey(key)}
                    className={`px-2 py-1 border uppercase transition-all ${
                      hoveredRegionKey === key
                        ? "bg-red-600 text-white border-red-600 font-bold shadow-[2px_2px_0px_rgba(28,25,23,1)]"
                        : "bg-stone-100 text-stone-700 border-stone-300 hover:border-stone-800"
                    }`}
                  >
                    {node.name.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Right 4 Columns: Live Regional Telemetry Dossier HUD */}
            <div className="lg:col-span-4 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-stone-300 pt-4 lg:pt-0 lg:pl-6">
              <div>
                <div className="flex justify-between items-start text-xs font-mono text-stone-500 pb-2 border-b border-stone-300 mb-3">
                  <span className="font-bold text-red-600 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {activeNodeData.id}
                  </span>
                  <span>{activeNodeData.coordinates}</span>
                </div>

                {/* Outside: Grayscale at rest, full color when hovered */}
                <div className="relative aspect-[16/9] border border-stone-300 bg-stone-200 overflow-hidden mb-3 group cursor-pointer">
                  <img
                    src={activeNodeData.image}
                    alt={activeNodeData.name}
                    className="h-full w-full object-cover grayscale contrast-125 brightness-95 
                               transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                               group-hover:grayscale-0 group-hover:scale-105"
                  />
                  <div className="absolute top-1.5 left-1.5 bg-stone-900/90 text-white font-mono text-[9px] px-1.5 py-0.5 uppercase z-10">
                    {activeNodeData.era}
                  </div>
                  <div className="absolute bottom-1.5 right-1.5 bg-red-600 text-white font-mono text-[9px] px-1.5 py-0.5 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    Chromatic View
                  </div>
                </div>

                <h3 className="font-serif text-xl font-bold tracking-normal text-stone-900 leading-snug">
                  {activeNodeData.name}
                </h3>
                <span className="font-mono text-[11px] text-stone-500 block mt-0.5">
                  {activeNodeData.culture}
                </span>

                <div className="mt-3 p-2.5 bg-stone-100 border border-stone-300 text-xs font-mono text-stone-700 leading-relaxed">
                  <strong className="text-red-700 uppercase block mb-1">
                    [HISTORIC FOCUS: {activeNodeData.focus}]
                  </strong>
                  {activeNodeData.brief}
                </div>

                <div className="mt-3 font-mono text-[11px] space-y-1 text-stone-600">
                  <div className="flex justify-between border-b border-dashed border-stone-200 pb-1">
                    <span className="text-stone-400">THREAT INDEX:</span>
                    <span className="font-bold text-red-600">
                      {activeNodeData.endangermentStatus}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-stone-400">SURVEY REGISTERS:</span>
                    <strong className="text-stone-900">
                      {activeNodeData.activeSurveys} Expeditions Logged
                    </strong>
                  </div>
                </div>
              </div>

              {/* Action Button: Read Full Field Dossier */}
              <div className="mt-4 pt-3 border-t border-stone-300">
                <button
                  onClick={() => setDetailedMapNode(activeNodeData)}
                  className="w-full py-2 px-3 font-mono text-xs uppercase tracking-wider bg-stone-900 text-white hover:bg-red-600 transition-colors shadow-[2px_2px_0px_rgba(220,38,38,1)] flex items-center justify-center gap-1.5 active:translate-x-[1px] active:translate-y-[1px]"
                >
                  <span>Read Full Field Dossier</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Viewport Frame Bottom Bar */}
        <div className="pt-4 mt-6 border-t-2 border-stone-800 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs font-mono text-stone-600 gap-2">
          <span>ALL ARTIFACTS SOURCED FROM PUBLIC DOMAIN REPOSITORIES</span>
          <span className="text-red-700 font-bold tracking-wider">
            GUILD ARCHIVE REGISTRATION ID // 09-K-2026
          </span>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-7xl border-2 border-stone-800 bg-stone-100 p-6 sm:p-10 shadow-[8px_8px_0px_rgba(28,25,23,1)]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b-2 border-stone-800">
          <div className="md:col-span-2">
            <span className="font-mono text-xs uppercase tracking-widest text-red-600 font-bold">
              [ GUILD CHARTER ]
            </span>
            <h3 className="font-serif text-2xl font-bold tracking-normal text-stone-900 mt-1">
              THE VERNACULAR GUILD
            </h3>
            <p className="text-sm text-stone-700 mt-3 max-w-md leading-relaxed font-sans">
              A decentralized civic observatory dedicated to cataloging vernacular
              stonework, typographic artifacts, and oral architectural lore before
              modern development overwrites them.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-mono text-stone-600">
              <BookOpen className="w-3.5 h-3.5 text-red-600" />
              <span>Catalog maintained under CC BY-NC 4.0 International</span>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest font-bold text-stone-800 mb-3">
              Index Ledgers
            </h4>
            <ul className="space-y-2 font-mono text-xs text-stone-600">
              <li>
                <button
                  onClick={() => handleFilterClick("Architecture")}
                  className="hover:text-red-600 transition-colors flex items-center gap-1 text-left"
                >
                  <CornerDownRight className="w-3 h-3 text-stone-400" /> Temple Plinths
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFilterClick("Type")}
                  className="hover:text-red-600 transition-colors flex items-center gap-1 text-left"
                >
                  <CornerDownRight className="w-3 h-3 text-stone-400" /> Foundry Typography
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFilterClick("Terracotta")}
                  className="hover:text-red-600 transition-colors flex items-center gap-1 text-left"
                >
                  <CornerDownRight className="w-3 h-3 text-stone-400" /> Terracotta Moulds
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFilterClick("Stone")}
                  className="hover:text-red-600 transition-colors flex items-center gap-1 text-left"
                >
                  <CornerDownRight className="w-3 h-3 text-stone-400" /> Vernacular Postmarks
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest font-bold text-stone-800 mb-3">
              Field Telegram
            </h4>
            <p className="text-xs text-stone-600 mb-3 font-sans">
              Receive printed bi-weekly catalog dispatches directly to your terminal.
            </p>

            {newsletterEnrolled ? (
              <div className="p-3 border border-red-600 bg-red-50 text-red-700 font-mono text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                <span>OBSERVER ENROLLED // DISPATCH QUEUED</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="observer@domain.org"
                  className="w-full px-3 py-1.5 text-xs font-mono border border-stone-400 bg-white focus:outline-none focus:border-red-600"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 font-mono text-xs uppercase tracking-wider bg-stone-900 text-white hover:bg-red-600 transition-colors shadow-[2px_2px_0px_rgba(220,38,38,1)]"
                >
                  Enroll [Send Mark]
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs font-mono text-stone-500 gap-3">
          <div>
            <span>SYSTEM TIMESTAMP: 2026 // EDITION IV</span>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => alert("Archive Privacy Charter: Encrypted telemetry.")}
              className="hover:text-red-600 transition-colors"
            >
              [PRIVACY]
            </button>
            <button
              onClick={() => alert("Node Telemetry: Operating on 12 regional relays.")}
              className="hover:text-red-600 transition-colors"
            >
              [TELEMETRY]
            </button>
            <button
              onClick={() => {
                setActiveFilter("ALL");
                dispatchesRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hover:text-red-600 transition-colors"
            >
              [REPOSITORIES]
            </button>
          </div>
        </div>
      </footer>

      {/* Forensic Inspection Lightbox (Full Color Inside) */}
      {selectedArtifact && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-stone-50 border-2 border-stone-900 p-4 sm:p-8 shadow-[12px_12px_0px_rgba(220,38,38,1)] max-h-[94vh] overflow-y-auto">
            <button
              onClick={() => setSelectedArtifact(null)}
              className="absolute top-4 right-4 p-1.5 border border-stone-800 bg-white hover:bg-red-600 hover:text-white transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b-2 border-stone-800 pb-4 mb-5">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs text-red-600 font-bold uppercase tracking-widest">
                  [ SPECIMEN FORENSIC DOSSIER ]
                </span>
                <span className="font-mono text-xs text-stone-400">//</span>
                <span className="font-mono text-xs text-stone-500 font-bold">
                  {selectedArtifact.plateNumber}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <h3 className="font-serif text-2xl sm:text-4xl font-bold tracking-normal text-stone-900">
                  {selectedArtifact.title}
                </h3>
                <span className="font-mono text-xs bg-red-100 border border-red-600 text-red-700 px-2 py-0.5 font-bold uppercase self-start sm:self-auto">
                  STATUS: {selectedArtifact.verification.status}
                </span>
              </div>
            </div>

            <div className="flex gap-2 mb-6 border-b border-stone-300 pb-2">
              <button
                onClick={() => setActiveModalTab("TIMELINE")}
                className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider border transition-all ${
                  activeModalTab === "TIMELINE"
                    ? "bg-stone-900 text-white border-stone-900 font-bold shadow-[2px_2px_0px_rgba(220,38,38,1)]"
                    : "bg-white text-stone-600 border-stone-300 hover:border-red-600 hover:text-red-600"
                }`}
              >
                [ Condition Telemetry &amp; Chrono-Slider ]
              </button>
              <button
                onClick={() => setActiveModalTab("VERIFICATION")}
                className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider border transition-all ${
                  activeModalTab === "VERIFICATION"
                    ? "bg-stone-900 text-white border-stone-900 font-bold shadow-[2px_2px_0px_rgba(220,38,38,1)]"
                    : "bg-white text-stone-600 border-stone-300 hover:border-red-600 hover:text-red-600"
                }`}
              >
                [ Background &amp; Forensic Verification ]
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-5 flex flex-col gap-3">
                <div className="relative border-2 border-stone-800 aspect-square bg-stone-200 overflow-hidden">
                  <img
                    src={selectedArtifact.image}
                    alt={selectedArtifact.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-stone-900 text-white font-mono text-[10px] px-2 py-0.5 uppercase tracking-wider">
                    CHROMATIC SCAN
                  </div>
                </div>

                <div className="border border-stone-300 bg-white p-3 font-mono text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-stone-500">PERIOD:</span>
                    <strong className="text-stone-900">{selectedArtifact.period}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">MEDIUM:</span>
                    <strong className="text-stone-900">{selectedArtifact.medium}</strong>
                  </div>
                  <div className="flex justify-between border-t border-dashed border-stone-200 pt-1.5">
                    <span className="text-stone-500">REGISTRATION:</span>
                    <strong className="text-red-600">CONFIRMED GUILD CORPUS</strong>
                  </div>
                </div>

                <div className="p-3 bg-stone-100 border border-stone-300 font-mono text-[11px] text-stone-600 leading-relaxed">
                  <strong className="text-stone-900 block mb-1 uppercase">[FIELD NOTE]</strong>
                  {selectedArtifact.notes}
                </div>
              </div>

              <div className="md:col-span-7">
                {activeModalTab === "TIMELINE" ? (
                  <div>
                    <div className="flex items-center justify-between font-mono text-xs mb-2">
                      <span className="flex items-center gap-1.5 font-bold text-stone-800">
                        <Activity className="w-3.5 h-3.5 text-red-600" />
                        STRUCTURAL CONDITION INDEX (%)
                      </span>
                      <span className="text-red-700 font-bold">
                        SCRUB: {selectedArtifact.timeline[activeMilestoneIndex].year}
                      </span>
                    </div>

                    <div className="border border-stone-400 bg-white p-4 relative mb-3 shadow-inner">
                      <div className="h-40 w-full relative">
                        <svg
                          className="w-full h-full overflow-visible"
                          viewBox="0 0 400 130"
                          preserveAspectRatio="none"
                        >
                          <defs>
                            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#dc2626" stopOpacity="0.25" />
                              <stop offset="100%" stopColor="#dc2626" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>

                          <line x1="0" y1="30" x2="400" y2="30" stroke="#f0eee9" strokeDasharray="3 3" />
                          <line x1="0" y1="65" x2="400" y2="65" stroke="#f0eee9" strokeDasharray="3 3" />
                          <line x1="0" y1="100" x2="400" y2="100" stroke="#f0eee9" strokeDasharray="3 3" />

                          {(() => {
                            const totalPoints = selectedArtifact.timeline.length;
                            const coords = selectedArtifact.timeline.map((m, idx) => {
                              const x = (idx / (totalPoints - 1)) * 370 + 15;
                              const y = 115 - (m.conditionIndex / 100) * 95;
                              return { x, y, milestone: m };
                            });

                            const linePath = coords.map((c) => `${c.x},${c.y}`).join(" ");
                            const activeX = coords[activeMilestoneIndex].x;
                            const activeY = coords[activeMilestoneIndex].y;

                            return (
                              <>
                                <polygon
                                  fill="url(#areaGradient)"
                                  points={`15,120 ${linePath} ${coords[coords.length - 1].x},120`}
                                />

                                <polyline
                                  fill="none"
                                  stroke="#dc2626"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  points={linePath}
                                />

                                <line
                                  x1={activeX}
                                  y1="10"
                                  x2={activeX}
                                  y2="120"
                                  stroke="#1c1917"
                                  strokeWidth="1.5"
                                  strokeDasharray="2 2"
                                />

                                {coords.map((c, idx) => {
                                  const isSelected = idx === activeMilestoneIndex;
                                  return (
                                    <g key={idx} className="cursor-pointer">
                                      {isSelected && (
                                        <circle
                                          cx={c.x}
                                          cy={c.y}
                                          r="9"
                                          fill="#fee2e2"
                                          className="animate-pulse"
                                        />
                                      )}
                                      <circle
                                        cx={c.x}
                                        cy={c.y}
                                        r={isSelected ? 6 : 3.5}
                                        fill={isSelected ? "#dc2626" : "#ffffff"}
                                        stroke="#1c1917"
                                        strokeWidth={isSelected ? 2 : 1.5}
                                        onClick={() => setActiveMilestoneIndex(idx)}
                                      />
                                    </g>
                                  );
                                })}

                                <g transform={`translate(${activeX}, ${Math.max(activeY - 14, 16)})`}>
                                  <rect
                                    x="-20"
                                    y="-12"
                                    width="40"
                                    height="14"
                                    fill="#1c1917"
                                    rx="2"
                                  />
                                  <text
                                    x="0"
                                    y="-2"
                                    fill="#ffffff"
                                    fontSize="8"
                                    fontFamily="monospace"
                                    textAnchor="middle"
                                  >
                                    {selectedArtifact.timeline[activeMilestoneIndex].conditionIndex}%
                                  </text>
                                </g>
                              </>
                            );
                          })()}
                        </svg>
                      </div>

                      <div className="flex justify-between font-mono text-[10px] text-stone-400 mt-2 border-t border-stone-200 pt-1">
                        {selectedArtifact.timeline.map((m, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveMilestoneIndex(idx)}
                            className={`hover:text-red-600 transition-colors ${
                              idx === activeMilestoneIndex
                                ? "text-red-600 font-bold"
                                : ""
                            }`}
                          >
                            {m.year}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4 bg-white border border-stone-300 p-3 shadow-sm">
                      <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
                        <span className="flex items-center gap-1 text-stone-700 font-bold uppercase">
                          <Sliders className="w-3 h-3 text-red-600" />
                          Temporal Scrubber
                        </span>
                        <span className="text-stone-500">
                          Step {activeMilestoneIndex + 1} of{" "}
                          {selectedArtifact.timeline.length}
                        </span>
                      </div>

                      <input
                        type="range"
                        min="0"
                        max={selectedArtifact.timeline.length - 1}
                        step="1"
                        value={activeMilestoneIndex}
                        onChange={(e) =>
                          setActiveMilestoneIndex(parseInt(e.target.value, 10))
                        }
                        aria-label="Temporal Timeline Scrubber"
                        className="w-full accent-red-600 cursor-pointer h-2 bg-stone-200 rounded-none border border-stone-400"
                      />

                      <div className="flex justify-between mt-1 text-[9px] font-mono text-stone-400">
                        <span>ORIGIN ERA</span>
                        <span>DRAG TO ADVANCE CENTURIES</span>
                        <span>CONTEMPORARY</span>
                      </div>
                    </div>

                    {selectedArtifact.timeline[activeMilestoneIndex] && (
                      <div className="border-2 border-stone-800 bg-stone-100 p-4 relative shadow-[4px_4px_0px_rgba(28,25,23,1)]">
                        <div className="flex justify-between items-center font-mono text-xs text-stone-500 mb-1 border-b border-stone-300 pb-1.5">
                          <span className="flex items-center gap-1 text-red-600 font-bold">
                            <Calendar className="w-3.5 h-3.5" />
                            CHRONO LOG: {selectedArtifact.timeline[activeMilestoneIndex].year}
                          </span>
                          <span>
                            INTEGRITY:{" "}
                            <strong className="text-stone-900 font-bold">
                              {selectedArtifact.timeline[activeMilestoneIndex].conditionIndex}%
                            </strong>
                          </span>
                        </div>

                        <h4 className="font-serif text-lg font-bold tracking-normal text-stone-900 mt-1">
                          {selectedArtifact.timeline[activeMilestoneIndex].event}
                        </h4>
                        <p className="text-xs sm:text-sm text-stone-700 mt-1.5 leading-relaxed font-sans">
                          {selectedArtifact.timeline[activeMilestoneIndex].detail}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="border border-stone-400 bg-white p-3.5 shadow-sm">
                      <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                        <span className="flex items-center gap-1.5 font-bold text-stone-800">
                          <Fingerprint className="w-4 h-4 text-red-600" />
                          CRYPTOGRAPHIC PROVENANCE
                        </span>
                        <span className="text-[10px] text-stone-400 uppercase">SHA-256</span>
                      </div>
                      <div className="mt-2 bg-stone-100 p-2 font-mono text-[11px] text-stone-700 break-all select-all border border-stone-200">
                        {selectedArtifact.verification.verificationHash}
                      </div>
                    </div>

                    <div className="border border-stone-400 bg-white p-3.5 shadow-sm space-y-2.5">
                      <div className="flex items-center gap-1.5 font-bold text-stone-800 pb-1 border-b border-stone-200">
                        <FileCheck className="w-4 h-4 text-red-600" />
                        SCIENTIFIC ASSAY DATA
                      </div>

                      <div>
                        <span className="text-stone-500 block text-[10px] uppercase">
                          Dating Method &amp; Confidence
                        </span>
                        <strong className="text-stone-900 text-xs">
                          {selectedArtifact.verification.datingConfidence}
                        </strong>
                        <p className="text-stone-600 text-[11px] mt-0.5 font-sans">
                          Methodology: {selectedArtifact.verification.assayMethod}
                        </p>
                      </div>

                      <div className="border-t border-dashed border-stone-200 pt-2">
                        <span className="text-stone-500 block text-[10px] uppercase">
                          Spectroscopy &amp; Elemental Profiling
                        </span>
                        <p className="text-stone-800 text-[11px] leading-relaxed font-sans">
                          {selectedArtifact.verification.spectroscopyResults}
                        </p>
                      </div>

                      <div className="border-t border-dashed border-stone-200 pt-2">
                        <span className="text-stone-500 block text-[10px] uppercase">
                          Chain of Custody
                        </span>
                        <p className="text-stone-700 text-[11px] leading-relaxed font-sans">
                          {selectedArtifact.verification.chainOfCustody}
                        </p>
                      </div>
                    </div>

                    <div className="border-2 border-stone-800 bg-stone-100 p-3 flex items-center justify-between shadow-[2px_2px_0px_rgba(28,25,23,1)]">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-red-600" />
                        <div>
                          <span className="block font-bold text-stone-900 text-[11px]">
                            {selectedArtifact.verification.leadExaminer}
                          </span>
                          <span className="text-[10px] text-stone-500 font-sans">
                            {selectedArtifact.verification.institution}
                          </span>
                        </div>
                      </div>
                      <span className="border border-red-600 text-red-600 font-bold px-2 py-0.5 text-[10px] uppercase">
                        SEALED &amp; VERIFIED
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t-2 border-stone-800 flex justify-end">
              <button
                onClick={() => setSelectedArtifact(null)}
                className="px-4 py-2 font-mono text-xs uppercase tracking-wider bg-stone-900 text-white hover:bg-red-600 transition-colors shadow-[2px_2px_0px_rgba(220,38,38,1)]"
              >
                Close Specimen Dossier [ESC]
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cartographic Node Full Field Dossier Modal (Rendered in Full Color) */}
      {detailedMapNode && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-stone-50 border-2 border-stone-900 p-5 sm:p-8 shadow-[12px_12px_0px_rgba(220,38,38,1)] max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setDetailedMapNode(null)}
              className="absolute top-4 right-4 p-1.5 border border-stone-800 bg-white hover:bg-red-600 hover:text-white transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b-2 border-stone-800 pb-4 mb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs text-red-600 font-bold uppercase tracking-widest">
                  [ CARTOGRAPHIC SURVEY EXPEDITION DOSSIER ]
                </span>
                <span className="font-mono text-xs text-stone-400">//</span>
                <span className="font-mono text-xs text-stone-500 font-bold">
                  {detailedMapNode.id}
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-4xl font-bold tracking-normal text-stone-900">
                {detailedMapNode.name}
              </h3>
              <p className="font-mono text-xs text-stone-500 mt-1">
                {detailedMapNode.culture} // Era: {detailedMapNode.era}
              </p>
            </div>

            {/* In the modal: completely full color without any grayscale or contrast filters */}
            <div className="relative aspect-[21/9] border border-stone-400 overflow-hidden bg-stone-200 mb-4">
              <img
                src={detailedMapNode.image}
                alt={detailedMapNode.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-stone-900/90 text-white font-mono text-[10px] px-2 py-0.5">
                COORDINATES: {detailedMapNode.coordinates}
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-stone-700 font-sans">
              <div className="p-3 bg-stone-100 border border-stone-300 font-mono text-xs">
                <strong className="text-stone-900 uppercase block mb-1">
                  Primary Joinery &amp; Material Focus:
                </strong>
                <span className="text-red-700 font-bold">
                  {detailedMapNode.focus}
                </span>
              </div>

              <div>
                <h4 className="font-serif text-base font-bold text-stone-900 mb-1">
                  Detailed Historical &amp; Architectural Context
                </h4>
                <p className="leading-relaxed">{detailedMapNode.extendedHistory}</p>
              </div>

              <div className="border-t border-dashed border-stone-300 pt-3">
                <h4 className="font-serif text-base font-bold text-stone-900 mb-1">
                  Material Science &amp; Petrographic Profile
                </h4>
                <p className="leading-relaxed font-mono text-xs text-stone-600">
                  {detailedMapNode.materialScience}
                </p>
              </div>

              <div className="border-t border-dashed border-stone-300 pt-3 flex flex-col sm:flex-row justify-between font-mono text-xs gap-2">
                <div>
                  <span className="text-stone-400">CONSERVATION VULNERABILITY:</span>
                  <div className="text-red-600 font-bold">
                    {detailedMapNode.endangermentStatus}
                  </div>
                </div>
                <div>
                  <span className="text-stone-400">TOTAL RECORDED SURFACINGS:</span>
                  <div className="text-stone-900 font-bold">
                    {detailedMapNode.activeSurveys} Active Field Ledger Registries
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t-2 border-stone-800 flex justify-end">
              <button
                onClick={() => setDetailedMapNode(null)}
                className="px-4 py-2 font-mono text-xs uppercase tracking-wider bg-stone-900 text-white hover:bg-red-600 transition-colors shadow-[2px_2px_0px_rgba(220,38,38,1)]"
              >
                Close Field Dossier [ESC]
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Brutalist In-App Confirmation Modal */}
      {confirmDialog.isOpen && (
        <div className="fixed inset-0 z-[70] bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-stone-50 border-2 border-stone-900 p-6 sm:p-7 shadow-[10px_10px_0px_rgba(28,25,23,1)] animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b-2 border-stone-900 mb-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
                <span className="font-mono text-xs text-red-600 font-bold uppercase tracking-widest">
                  {confirmDialog.type === "REVOKE_ITEM"
                    ? "[ ARCHIVAL REVOCATION DECREE ]"
                    : "[ ARCHIVE RECYCLE SANCTION ]"}
                </span>
              </div>
              <button
                onClick={() =>
                  setConfirmDialog({ isOpen: false, type: "REVOKE_ITEM", title: "", message: "" })
                }
                className="p-1 border border-stone-800 bg-white hover:bg-red-600 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-start gap-3.5 my-2">
              <div className="p-2.5 border border-red-600 bg-red-50 text-red-600 shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-xl font-bold text-stone-900 leading-snug">
                  {confirmDialog.title}
                </h4>
                <p className="text-xs sm:text-sm text-stone-700 font-sans mt-1.5 leading-relaxed">
                  {confirmDialog.message}
                </p>
                {confirmDialog.details && (
                  <div className="mt-3 p-2 bg-stone-100 border border-stone-300 font-mono text-[11px] text-stone-600 break-words">
                    {confirmDialog.details}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-dashed border-stone-300 flex flex-col sm:flex-row justify-end gap-2.5">
              <button
                type="button"
                onClick={() =>
                  setConfirmDialog({ isOpen: false, type: "REVOKE_ITEM", title: "", message: "" })
                }
                className="px-4 py-2 font-mono text-xs uppercase tracking-wider border border-stone-800 bg-white text-stone-800 hover:bg-stone-200 transition-colors shadow-[2px_2px_0px_rgba(28,25,23,1)] active:translate-x-[1px] active:translate-y-[1px]"
              >
                [Cancel]
              </button>
              <button
                type="button"
                onClick={handleExecuteConfirmedAction}
                className="px-4 py-2 font-mono text-xs uppercase tracking-wider border border-stone-900 bg-stone-900 text-white hover:bg-red-600 hover:border-red-600 transition-colors shadow-[2px_2px_0px_rgba(220,38,38,1)] font-bold active:translate-x-[1px] active:translate-y-[1px]"
              >
                {confirmDialog.type === "REVOKE_ITEM"
                  ? "[Confirm Expunge]"
                  : "[Execute Recycle]"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submission Drawer */}
      {isSubmitOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-stone-50 border-l-2 border-stone-900 h-full p-6 sm:p-8 flex flex-col justify-between overflow-y-auto shadow-2xl">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-stone-300">
                <div>
                  <span className="font-mono text-xs text-red-600 font-bold uppercase">
                    [ FIELD DISPATCH INTAKE ]
                  </span>
                  <h3 className="font-serif text-2xl font-bold tracking-normal text-stone-900">
                    Register Evidence
                  </h3>
                </div>
                <button
                  onClick={() => setIsSubmitOpen(false)}
                  className="p-1 border border-stone-800 bg-white hover:bg-red-600 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateDispatch} className="mt-6 space-y-4">
                <div>
                  <label className="block font-mono text-xs text-stone-600 mb-1 uppercase">
                    Site / Artifact Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="e.g. Mukteswar Torana Gate"
                    className="w-full px-3 py-2 text-xs font-mono border border-stone-400 bg-white focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-stone-600 mb-1 uppercase">
                    Geographic Region
                  </label>
                  <input
                    type="text"
                    value={newRegion}
                    onChange={(e) => setNewRegion(e.target.value)}
                    placeholder="e.g. Old Town Precinct"
                    className="w-full px-3 py-2 text-xs font-mono border border-stone-400 bg-white focus:outline-none focus:border-red-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono text-xs text-stone-600 mb-1 uppercase">
                      Observer Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={newContributor}
                      onChange={(e) => setNewContributor(e.target.value)}
                      placeholder="e.g. R. Das"
                      className="w-full px-3 py-2 text-xs font-mono border border-stone-400 bg-white focus:outline-none focus:border-red-600"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-stone-600 mb-1 uppercase">
                      Field Discipline
                    </label>
                    <input
                      type="text"
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      placeholder="e.g. Typographer"
                      className="w-full px-3 py-2 text-xs font-mono border border-stone-400 bg-white focus:outline-none focus:border-red-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs text-stone-600 mb-1 uppercase">
                    Primary Category
                  </label>
                  <select
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono border border-stone-400 bg-white focus:outline-none focus:border-red-600"
                  >
                    <option value="Architecture">Architecture</option>
                    <option value="Stone Carving">Stone Carving</option>
                    <option value="Terracotta">Terracotta</option>
                    <option value="Movable Type">Movable Type</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs text-stone-600 mb-1 uppercase">
                    Field Notes &amp; Architectural Evidence
                  </label>
                  <textarea
                    rows={4}
                    value={newExcerpt}
                    onChange={(e) => setNewExcerpt(e.target.value)}
                    placeholder="Document material composition, joinery techniques, or inscriptions observed..."
                    className="w-full px-3 py-2 text-xs font-mono border border-stone-400 bg-white focus:outline-none focus:border-red-600 leading-relaxed font-sans"
                  />
                </div>

                <div className="p-4 border border-dashed border-stone-400 bg-stone-100 flex flex-col items-center justify-center text-center">
                  <UploadCloud className="w-6 h-6 text-stone-500 mb-1" />
                  <span className="font-mono text-xs text-stone-600">
                    High-res photograph auto-assigned from field feed
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 font-mono text-xs uppercase tracking-wider bg-red-600 text-white hover:bg-stone-900 transition-colors shadow-[4px_4px_0px_rgba(28,25,23,1)] active:translate-x-[1px] active:translate-y-[1px]"
                >
                  Affix Stamp &amp; Dispatch Record
                </button>
              </form>
            </div>

            <div className="pt-6 border-t border-stone-200 text-stone-500 font-mono text-[11px]">
              Entries undergo automatic peer review by verified guild observers.
            </div>
          </div>
        </div>
      )}
    </main>
  );
}