// Qween AI Asset Generation Portal — Generator Logic

const state = {
  persona: null,
  collection: null,
  shootType: null,
  view: null,
  jewellery: ''
};

// ─── DOM refs ───────────────────────────────────────────────────────────────
const personaGrid     = document.getElementById('persona-grid');
const collectionGrid  = document.getElementById('collection-grid');
const shootTypeGrid   = document.getElementById('shoot-type-grid');
const viewGrid        = document.getElementById('view-grid');
const jewelleryInput  = document.getElementById('jewellery-input');
const promptOutput    = document.getElementById('prompt-output');
const promptPlaceholder = document.getElementById('prompt-placeholder');
const copyBtn         = document.getElementById('copy-btn');
const weavyBtn        = document.getElementById('weavy-btn');
const copyFeedback    = document.getElementById('copy-feedback');

// ─── Build persona pills ─────────────────────────────────────────────────────
function buildPersonas() {
  Object.values(PERSONAS).forEach(persona => {
    const pill = document.createElement('button');
    pill.className = 'pill';
    pill.dataset.id = persona.id;
    pill.textContent = persona.name;
    pill.addEventListener('click', () => selectPersona(persona.id));
    personaGrid.appendChild(pill);
  });
}

// ─── Build collection pills ───────────────────────────────────────────────────
function buildCollections(personaId) {
  collectionGrid.innerHTML = '';
  const persona = personaId ? PERSONAS[personaId] : null;
  const suggested = persona ? persona.collections : [];
  const allPersonaCollections = new Set();

  Object.values(PERSONAS).forEach(p => p.collections.forEach(c => allPersonaCollections.add(c)));

  // Suggested (persona's own) first
  suggested.forEach(name => {
    collectionGrid.appendChild(makeCollectionPill(name, true, personaId));
  });

  // Cross-persona collections
  CROSS_PERSONA_COLLECTIONS.forEach(name => {
    if (!suggested.includes(name)) {
      collectionGrid.appendChild(makeCollectionPill(name, false, personaId));
    }
  });

  // Other persona collections (not already shown)
  if (personaId) {
    Object.values(PERSONAS).forEach(p => {
      if (p.id !== personaId) {
        p.collections.forEach(name => {
          if (!suggested.includes(name) && !CROSS_PERSONA_COLLECTIONS.includes(name)) {
            collectionGrid.appendChild(makeCollectionPill(name, false, personaId));
          }
        });
      }
    });
  }

  // Restore selection if still present
  if (state.collection) {
    const existing = collectionGrid.querySelector(`[data-name="${CSS.escape(state.collection)}"]`);
    if (existing) existing.classList.add('active');
  }
}

function makeCollectionPill(name, isSuggested, personaId) {
  const pill = document.createElement('button');
  pill.className = 'pill' + (isSuggested ? ' pill--suggested' : '');
  pill.dataset.name = name;
  pill.textContent = name;
  if (isSuggested && personaId) {
    pill.title = `Suggested for ${PERSONAS[personaId].name}`;
  }
  pill.addEventListener('click', () => selectCollection(name, pill));
  return pill;
}

// ─── Build shoot type pills ───────────────────────────────────────────────────
function buildShootTypes() {
  SHOOT_TYPES.forEach(type => {
    const pill = document.createElement('button');
    pill.className = 'pill';
    pill.dataset.id = type.id;
    pill.textContent = type.name;
    pill.addEventListener('click', () => selectShootType(type.id));
    shootTypeGrid.appendChild(pill);
  });
}

// ─── Build view pills ─────────────────────────────────────────────────────────
function buildViews() {
  VIEWS.forEach(view => {
    const pill = document.createElement('button');
    pill.className = 'pill';
    pill.dataset.id = view.id;
    pill.textContent = view.name;
    pill.addEventListener('click', () => selectView(view.id));
    viewGrid.appendChild(pill);
  });
}

// ─── Selection handlers ───────────────────────────────────────────────────────
function selectPersona(id) {
  state.persona = state.persona === id ? null : id;
  updatePills(personaGrid, state.persona, 'data-id');
  applyPersonaAccent(state.persona);
  buildCollections(state.persona);
  if (!state.persona) state.collection = null;
  updateCollectionSectionLabel();
  assemblePrompt();
}

function selectCollection(name, pill) {
  state.collection = state.collection === name ? null : name;
  collectionGrid.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  if (state.collection) pill.classList.add('active');
  assemblePrompt();
}

function selectShootType(id) {
  state.shootType = state.shootType === id ? null : id;
  updatePills(shootTypeGrid, state.shootType, 'data-id');
  assemblePrompt();
}

function selectView(id) {
  state.view = state.view === id ? null : id;
  updatePills(viewGrid, state.view, 'data-id');
  assemblePrompt();
}

function updatePills(grid, activeId, attr) {
  grid.querySelectorAll('.pill').forEach(pill => {
    pill.classList.toggle('active', pill.getAttribute(attr) === activeId);
  });
}

// ─── Accent colour ────────────────────────────────────────────────────────────
function applyPersonaAccent(personaId) {
  const root = document.documentElement;
  if (personaId && PERSONAS[personaId]) {
    const p = PERSONAS[personaId];
    root.style.setProperty('--accent', p.accent);
    root.style.setProperty('--accent-light', p.accentLight);
  } else {
    root.style.setProperty('--accent', '#111111');
    root.style.setProperty('--accent-light', 'rgba(17,17,17,0.05)');
  }
}

// ─── Collection section label ─────────────────────────────────────────────────
function updateCollectionSectionLabel() {
  const label = document.getElementById('collection-label');
  if (state.persona && PERSONAS[state.persona]) {
    label.textContent = `${PERSONAS[state.persona].name} collections appear first`;
  } else {
    label.textContent = 'Select a persona to see suggested collections';
  }
}

// ─── Prompt assembly ──────────────────────────────────────────────────────────
function assemblePrompt() {
  const persona    = state.persona    ? PERSONAS[state.persona]                                  : null;
  const shootType  = state.shootType  ? SHOOT_TYPES.find(s => s.id === state.shootType)          : null;
  const view       = state.view       ? VIEWS.find(v => v.id === state.view)                     : null;
  const jewellery  = state.jewellery.trim();
  const collection = state.collection;

  // Need at least shoot type or persona to show something
  const hasContent = persona || shootType || view || collection || jewellery;

  if (!hasContent) {
    promptOutput.textContent = '';
    promptPlaceholder.style.display = 'block';
    promptOutput.style.display = 'none';
    copyBtn.disabled = true;
    return;
  }

  const parts = [];

  if (shootType) parts.push(shootType.descriptor);
  if (view)      parts.push(view.descriptor);
  if (persona)   parts.push(persona.model);
  if (persona)   parts.push(persona.lighting);
  if (persona)   parts.push(persona.setting);

  let moodStylingHmu = '';
  if (persona) {
    moodStylingHmu = `${persona.mood} energy — ${persona.styling}, ${persona.hmu}`;
    parts.push(moodStylingHmu);
  }

  // Jewellery segment
  let jewellerySegment = '';
  if (jewellery) {
    jewellerySegment = `jewellery: ${jewellery}`;
  } else if (collection) {
    jewellerySegment = `jewellery: ${collection} collection — placeholder reference, establish placement only`;
  }
  if (jewellerySegment) parts.push(jewellerySegment);

  if (persona) parts.push(persona.colour);

  parts.push('4:5 vertical crop');
  parts.push('editorial quality');
  parts.push('photorealistic');
  parts.push('no watermarks');
  parts.push('Qween jewellery campaign');

  const prompt = parts.join(', ');

  promptPlaceholder.style.display = 'none';
  promptOutput.style.display = 'block';
  promptOutput.textContent = prompt;
  copyBtn.disabled = false;
}

// ─── Copy to clipboard ────────────────────────────────────────────────────────
copyBtn.addEventListener('click', async () => {
  const text = promptOutput.textContent;
  if (!text) return;

  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // Fallback for older browsers
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }

  copyFeedback.classList.add('visible');
  setTimeout(() => copyFeedback.classList.remove('visible'), 2000);
});

// ─── Open Weavy ───────────────────────────────────────────────────────────────
weavyBtn.addEventListener('click', () => {
  window.open('https://weave.figma.com/', '_blank', 'noopener');
});

// ─── Jewellery input ──────────────────────────────────────────────────────────
jewelleryInput.addEventListener('input', e => {
  state.jewellery = e.target.value;
  assemblePrompt();
});

// ─── Init ─────────────────────────────────────────────────────────────────────
buildPersonas();
buildCollections(null);
buildShootTypes();
buildViews();
applyPersonaAccent(null);
