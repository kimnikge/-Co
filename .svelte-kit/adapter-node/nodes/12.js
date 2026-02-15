

export const index = 12;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/services/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/12.69160a9c.js","_app/immutable/chunks/scheduler.0318841a.js","_app/immutable/chunks/index.1becb56c.js"];
export const stylesheets = ["_app/immutable/assets/12.ba0ba40c.css"];
export const fonts = [];
