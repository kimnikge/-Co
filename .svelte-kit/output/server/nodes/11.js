

export const index = 11;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/requisites/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/11.30565219.js","_app/immutable/chunks/scheduler.0318841a.js","_app/immutable/chunks/index.1becb56c.js"];
export const stylesheets = [];
export const fonts = [];
