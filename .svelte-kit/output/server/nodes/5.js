

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/calculator/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.fc78676b.js","_app/immutable/chunks/scheduler.457aa660.js","_app/immutable/chunks/index.4656ad90.js"];
export const stylesheets = ["_app/immutable/assets/5.2f8f5dbf.css"];
export const fonts = [];
