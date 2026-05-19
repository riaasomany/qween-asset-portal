// Qween AI Asset Generation Portal — Data
// All persona foundations, collections, shoot types, and views

const PERSONAS = {
  'party-girl': {
    id: 'party-girl',
    name: 'Party Girl',
    model: 'Indian woman, warm medium-deep skin tone, voluminous curly dark hair, bold expressive eyes, defined lips, late 20s',
    lighting: 'hard disco side-light, warm bokeh spots in background',
    setting: 'indoor night venue or studio club, deep jewel-tone background — hot pink or deep burgundy',
    mood: 'alive, bold, sultry, caught-in-the-moment',
    styling: 'sequin deep-V blazer, open neckline, dark metallic palette — no high necklines',
    hmu: 'strong smoky or glittery eye, deep berry or red lip, dewy glow skin, voluminous curls',
    colour: 'hot pink, gold, black — avoid dull or muted backgrounds',
    accent: '#E8185A',
    accentLight: 'rgba(232, 24, 90, 0.08)',
    collections: ['DiscoBall', 'Confetti', 'Miami Afterhours', 'Champagne Hour', 'Paris At Midnight']
  },
  'gala-grandeur': {
    id: 'gala-grandeur',
    name: 'Gala Grandeur',
    model: 'Indian woman, sharp defined features, sleek pulled-back hair, luminous warm skin, late 20s–30s',
    lighting: 'soft diffused warm light, controlled elegance',
    setting: 'formal ballroom or draped fabric studio, powder blue or champagne background',
    mood: 'composed, regal, knowing, quietly powerful',
    styling: 'structured draped gown or sheer tailoring, ivory or powder blue palette',
    hmu: 'sleek updo or structured blowout, soft glam, nude satin lip, glass skin',
    colour: 'powder blue, ivory, champagne gold',
    accent: '#B8903A',
    accentLight: 'rgba(184, 144, 58, 0.08)',
    collections: ['Stairway to Power', 'The Empress', 'Lumiere', 'Gala Grandeur', 'Own My Runway']
  },
  'feminity-reclaimed': {
    id: 'feminity-reclaimed',
    name: 'Feminity Reclaimed',
    model: 'Indian woman, long dark hair, bold red lip, defined bone structure, porcelain-warm skin',
    lighting: 'high-contrast vintage editorial light',
    setting: 'classic interior or crimson studio, deep red or ivory background',
    mood: 'alluring, self-possessed, timeless, intentional',
    styling: 'silk, pearl-finish or tailored structured pieces, deep crimson or cream palette',
    hmu: 'bold red lip, defined eye, porcelain skin finish, sleek or vintage-set hair',
    colour: 'deep red, cream, maroon — rich and classic',
    accent: '#8B1A1A',
    accentLight: 'rgba(139, 26, 26, 0.08)',
    collections: ['Feminity Reclaimed', 'The Pearl Palette', 'Pearl Ombre', 'Seve', 'Maree']
  },
  'untamed-in-love': {
    id: 'untamed-in-love',
    name: 'Untamed in Love',
    model: 'East Asian woman, dark flowing hair, fair warm skin, natural relaxed energy',
    lighting: 'natural sunlight, warm blush-gold tones, soft and organic',
    setting: 'outdoor or bright minimal studio, warm pink or blush background',
    mood: 'joyful, soft, open, free, romantic',
    styling: 'pink blazer or easy relaxed layers, warm blush and gold palette',
    hmu: 'soft natural glow, rosy lip, effortless undone hair',
    colour: 'warm pink, blush, gold — no dark or moody tones',
    accent: '#C4634A',
    accentLight: 'rgba(196, 99, 74, 0.08)',
    collections: ['Untamed in Love', 'Soulmate', 'Victorious Love', 'Wild Rose', 'Qween of Eden', 'Written in the Stars', 'Serendipity']
  },
  'i-want-it-all': {
    id: 'i-want-it-all',
    name: 'I Want it All',
    model: 'Indian woman, short dark hair, sharp bone structure, intense direct gaze',
    lighting: 'controlled dramatic studio light, strong and directional',
    setting: 'stark studio, powder blue or deep charcoal background',
    mood: 'intense, unapologetic, powerful, fierce',
    styling: 'sharp fitted blazer or structured leather, architectural silhouette',
    hmu: 'graphic eye, strong brow, matte skin or high-shine editorial finish',
    colour: 'powder blue, black, silver — avoid anything soft or romantic',
    accent: '#3A6EA8',
    accentLight: 'rgba(58, 110, 168, 0.08)',
    collections: ['I Want it All', 'SHE', 'Cuban Chains', 'Wolf', 'Eleve', 'Stairway to Power']
  }
};

const CROSS_PERSONA_COLLECTIONS = [
  'Cleopatra',
  'The Maharani',
  'Colour Me Committed',
  "Qween's Flower"
];

const SHOOT_TYPES = [
  {
    id: 'lifestyle-model',
    name: 'Lifestyle Model',
    descriptor: 'cinematic lifestyle portrait, photorealistic, natural real-skin texture'
  },
  {
    id: 'model-detail',
    name: 'Model Detail',
    descriptor: 'editorial detail shot, model in frame, jewellery as hero element'
  },
  {
    id: 'product-flat',
    name: 'Product Flat',
    descriptor: 'clean product flat-lay, minimal studio background, no model'
  },
  {
    id: 'still-life',
    name: 'Still Life',
    descriptor: 'artistic still life, jewellery with props and scene, no model'
  }
];

const VIEWS = [
  {
    id: 'face-close-crop',
    name: 'Face Close Crop',
    descriptor: '85mm face-forward portrait, earrings and neck clearly visible, tight editorial crop'
  },
  {
    id: 'three-quarter-body',
    name: '3/4 Body',
    descriptor: '3/4 body editorial frame, necklace and outfit fully in frame'
  },
  {
    id: 'full-body',
    name: 'Full Body',
    descriptor: 'full body frame head to toe, all jewellery and styling visible'
  },
  {
    id: 'hands-wrist',
    name: 'Hands / Wrist',
    descriptor: 'close crop hands and wrists, bracelets and rings in sharp focus'
  },
  {
    id: 'neck-decolletage',
    name: 'Neck / Décolletage',
    descriptor: 'neck and decolletage close crop, necklace or choker as hero'
  }
];
