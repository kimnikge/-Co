

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/price/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/9.8ee9466f.js","_app/immutable/chunks/scheduler.0318841a.js","_app/immutable/chunks/index.1becb56c.js"];
export const stylesheets = ["_app/immutable/assets/9.c890f9b1.css"];
export const fonts = [];
