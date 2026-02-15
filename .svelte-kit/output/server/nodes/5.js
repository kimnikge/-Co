

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/calculator/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.e563ca30.js","_app/immutable/chunks/scheduler.0318841a.js","_app/immutable/chunks/index.1becb56c.js"];
export const stylesheets = ["_app/immutable/assets/5.2f8f5dbf.css"];
export const fonts = [];
