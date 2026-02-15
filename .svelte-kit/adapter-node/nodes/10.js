

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/privacy/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/10.b79a41a2.js","_app/immutable/chunks/scheduler.0318841a.js","_app/immutable/chunks/index.1becb56c.js"];
export const stylesheets = [];
export const fonts = [];
