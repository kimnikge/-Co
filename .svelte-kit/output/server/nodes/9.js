

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/price/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/9.38c1779a.js","_app/immutable/chunks/scheduler.457aa660.js","_app/immutable/chunks/index.4656ad90.js"];
export const stylesheets = ["_app/immutable/assets/9.c890f9b1.css"];
export const fonts = [];
