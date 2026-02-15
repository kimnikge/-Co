

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.61fe76e6.js","_app/immutable/chunks/scheduler.457aa660.js","_app/immutable/chunks/index.4656ad90.js","_app/immutable/chunks/singletons.caebda63.js"];
export const stylesheets = [];
export const fonts = [];
