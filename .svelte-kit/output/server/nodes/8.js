

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/disclaimer/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/8.473984b7.js","_app/immutable/chunks/scheduler.457aa660.js","_app/immutable/chunks/index.4656ad90.js"];
export const stylesheets = [];
export const fonts = [];
