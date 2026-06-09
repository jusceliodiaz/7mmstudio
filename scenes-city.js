const CONFIG = {
  poster: "images/seq_arch/est_00.jpg",

  // Navigation bar — order matches left-to-right display
  timeline: [
    {
      id: "aereo",
      label: "Overview",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9c3-2 6-3 9-3s6 1 9 3"/><path d="M3 15c3 2 6 3 9 3s6-1 9-3"/><circle cx="12" cy="12" r="3"/></svg>`,
    },
    {
      id: "pool",
      label: "Parking",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/></svg>`,
    },
    {
      id: "jardim",
      label: "Building",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="1"/><path d="M9 22V12h6v10"/><path d="M8 6h1M11 6h1M14 6h1M8 10h1M11 10h1M14 10h1"/></svg>`,
    },
    {
      id: "living",
      label: "Lobby",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21V7l9-4 9 4v14"/><path d="M13 21v-6h-2v6"/><path d="M3 10h18"/></svg>`,
    },
    {
      id: "kitchen",
      label: "Park",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22V12"/><circle cx="12" cy="7" r="5"/><path d="M5 22h14"/></svg>`,
    },
  ],

  scenes: {
    aereo: {
      video: "images/dia_low.webm",
      pois: [
        { id: "pan-1", label: "Parking",  x: 51.4, y: 37.9, tag: "Infrastructure · Basement",    title: "Parking",       desc: "Covered underground parking with spaces for residents and visitors, with automatic gate and license plate recognition.", panorama360: "images/XP_NPL_360_2.jpeg" },
        { id: "pan-2", label: "Park",     x: 13.8, y: 65.2, tag: "Leisure · Park",               title: "Park",          desc: "Gathering space with playground, courts and picnic area integrated into the landscaping.", panorama360: "images/XP_NPL_360_2.jpeg" },
        { id: "pan-3", label: "Building", x: 59.1, y: 57.1, tag: "Residential · Main Block",     title: "Building",      desc: "Residential tower with 28 floors and panoramic views. Units from 68m² to 220m² with floor-to-ceiling glazing.", panorama360: "images/XP_NPL_360_2.jpeg" },
        { id: "pan-4", label: "Lobby",    x: 64.6, y: 71.0, tag: "Access · Entrance",            title: "Lobby",         desc: "24h access-controlled lobby with glazed hall and integrated biometric system.", panorama360: "images/XP_NPL_360_2.jpeg" },
      ],
    },
    pool: {
      video: "images/estacionamento.webm",
      pois: [
        { id: "est-1", label: "Parking", x: 48.7, y: 59.7, tag: "Infrastructure · Basement", title: "Vehicle Access", desc: "Dedicated entrance with automatic gate and app-based license plate recognition.", panorama360: "images/XP_NPL_360_2.jpeg" },
      ],
    },
    living: {
      video: "images/hall.webm",
      pois: [
        { id: "hall-1", label: "Lobby", x: 50.0, y: 55.0, tag: "Access · Entrance", title: "Main Entrance", desc: "24h access-controlled lobby with glazed hall and integrated biometric system.", panorama360: "images/XP_NPL_360_2.jpeg" },
      ],
    },
    jardim: {
      video: "images/predio.webm",
      pois: [
        { id: "pred-1", label: "Lobby", x: 56.9, y: 82.2, tag: "Circulation · Ground Floor", title: "Lobby", desc: "6m-high hall with marble cladding and reception desk for residents and visitors.", panorama360: "images/XP_NPL_360_2.jpeg" },
      ],
    },
    kitchen: {
      video: "images/parque.webm",
      pois: [
        { id: "parq-1", label: "Park", x: 53.6, y: 58.6, tag: "Leisure · Park", title: "Park", desc: "Gathering space with playground, courts and picnic area integrated into the landscaping.", panorama360: "images/XP_NPL_360_2.jpeg" },
      ],
    },
  },

  // Each reverse sequence shares the same frames as its forward counterpart, played backwards
  sequences: {
    "aereo-to-pool":    { folder: "images/seq_arch/", prefix: "est_",                from: 0, to: 47, pad: 2, ext: "jpg", fps: 45 },
    "pool-to-aereo":    { folder: "images/seq_arch/", prefix: "est_",                from: 0, to: 47, pad: 2, ext: "jpg", fps: 45, reverse: true },
    "pool-to-living":   { folder: "images/seq_arch/", prefix: "est_to_portaria_",    from: 0, to: 47, pad: 2, ext: "jpg", fps: 45 },
    "living-to-pool":   { folder: "images/seq_arch/", prefix: "est_to_portaria_",    from: 0, to: 47, pad: 2, ext: "jpg", fps: 45, reverse: true },
    "pool-to-kitchen":  { folder: "images/seq_arch/", prefix: "est_to_parque_",      from: 0, to: 47, pad: 2, ext: "jpg", fps: 45 },
    "kitchen-to-pool":  { folder: "images/seq_arch/", prefix: "est_to_parque_",      from: 0, to: 47, pad: 2, ext: "jpg", fps: 45, reverse: true },
    "pool-to-jardim":   { folder: "images/seq_arch/", prefix: "est_to_predio_",      from: 0, to: 47, pad: 2, ext: "jpg", fps: 45 },
    "jardim-to-pool":   { folder: "images/seq_arch/", prefix: "est_to_predio_",      from: 0, to: 47, pad: 2, ext: "jpg", fps: 45, reverse: true },
    "aereo-to-jardim":  { folder: "images/seq_arch/", prefix: "arch_",               from: 0, to: 47, pad: 2, ext: "jpg", fps: 45 },
    "jardim-to-aereo":  { folder: "images/seq_arch/", prefix: "arch_",               from: 0, to: 47, pad: 2, ext: "jpg", fps: 45, reverse: true },
    "aereo-to-kitchen": { folder: "images/seq_arch/", prefix: "parque_",             from: 0, to: 47, pad: 2, ext: "jpg", fps: 45 },
    "kitchen-to-aereo": { folder: "images/seq_arch/", prefix: "parque_",             from: 0, to: 47, pad: 2, ext: "jpg", fps: 45, reverse: true },
    "aereo-to-living":  { folder: "images/seq_arch/", prefix: "pano_to_hall_",       from: 0, to: 47, pad: 2, ext: "jpg", fps: 45 },
    "living-to-aereo":  { folder: "images/seq_arch/", prefix: "pano_to_hall_",       from: 0, to: 47, pad: 2, ext: "jpg", fps: 45, reverse: true },
    "living-to-kitchen":{ folder: "images/seq_arch/", prefix: "portaria_to_parque_", from: 0, to: 47, pad: 2, ext: "jpg", fps: 45 },
    "kitchen-to-living":{ folder: "images/seq_arch/", prefix: "portaria_to_parque_", from: 0, to: 47, pad: 2, ext: "jpg", fps: 45, reverse: true },
    "jardim-to-kitchen":{ folder: "images/seq_arch/", prefix: "predio_to_parque_",   from: 0, to: 46, pad: 2, ext: "jpg", fps: 45 },
    "kitchen-to-jardim":{ folder: "images/seq_arch/", prefix: "predio_to_parque_",   from: 0, to: 46, pad: 2, ext: "jpg", fps: 45, reverse: true },
    "jardim-to-living": { folder: "images/seq_arch/", prefix: "torre_",              from: 0, to: 47, pad: 2, ext: "jpg", fps: 45 },
    "living-to-jardim": { folder: "images/seq_arch/", prefix: "torre_",              from: 0, to: 47, pad: 2, ext: "jpg", fps: 45, reverse: true },
  },

  transitions: {
    aereo:   { pool: "aereo-to-pool",   jardim: "aereo-to-jardim",   kitchen: "aereo-to-kitchen",   living: "aereo-to-living"   },
    pool:    { aereo: "pool-to-aereo",  living: "pool-to-living",    kitchen: "pool-to-kitchen",    jardim: "pool-to-jardim"    },
    living:  { pool: "living-to-pool",  jardim: "living-to-jardim",  kitchen: "living-to-kitchen",  aereo: "living-to-aereo"    },
    kitchen: { pool: "kitchen-to-pool", jardim: "kitchen-to-jardim", living: "kitchen-to-living",   aereo: "kitchen-to-aereo"   },
    jardim:  { pool: "jardim-to-pool",  aereo: "jardim-to-aereo",    living: "jardim-to-living",    kitchen: "jardim-to-kitchen" },
  },
};
