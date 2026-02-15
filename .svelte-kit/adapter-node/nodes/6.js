

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/cases/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.78b02389.js","_app/immutable/chunks/scheduler.0318841a.js","_app/immutable/chunks/index.1becb56c.js"];
export const stylesheets = ["_app/immutable/assets/6.56739b57.css"];
export const fonts = [];
