

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/privacy/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/10.2c3571b5.js","_app/immutable/chunks/scheduler.457aa660.js","_app/immutable/chunks/index.4656ad90.js"];
export const stylesheets = [];
export const fonts = [];
