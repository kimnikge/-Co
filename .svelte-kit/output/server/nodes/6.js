

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/cases/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.9dd93442.js","_app/immutable/chunks/scheduler.457aa660.js","_app/immutable/chunks/index.4656ad90.js"];
export const stylesheets = ["_app/immutable/assets/6.56739b57.css"];
export const fonts = [];
