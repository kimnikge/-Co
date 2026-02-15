const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["apple-touch-icon.png","favicon.ico","icons/icon-192.png","icons/icon-512.png","manifest.webmanifest","sw.js"]),
	mimeTypes: {".png":"image/png",".webmanifest":"application/manifest+json",".js":"application/javascript"},
	_: {
		client: {"start":"_app/immutable/entry/start.7f7d6dd8.js","app":"_app/immutable/entry/app.45e10757.js","imports":["_app/immutable/entry/start.7f7d6dd8.js","_app/immutable/chunks/scheduler.0318841a.js","_app/immutable/chunks/singletons.84eb42ad.js","_app/immutable/entry/app.45e10757.js","_app/immutable/chunks/scheduler.0318841a.js","_app/immutable/chunks/index.1becb56c.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./chunks/0-07a12bda.js')),
			__memo(() => import('./chunks/1-bae30661.js')),
			__memo(() => import('./chunks/2-67f33a8a.js')),
			__memo(() => import('./chunks/3-c784d2ac.js')),
			__memo(() => import('./chunks/4-3dc64dee.js')),
			__memo(() => import('./chunks/5-01959f81.js')),
			__memo(() => import('./chunks/6-471cf129.js')),
			__memo(() => import('./chunks/7-70108199.js')),
			__memo(() => import('./chunks/8-7ee57f09.js')),
			__memo(() => import('./chunks/9-c6a960c8.js')),
			__memo(() => import('./chunks/10-3c909bd7.js')),
			__memo(() => import('./chunks/11-ba2e9438.js')),
			__memo(() => import('./chunks/12-51924d8f.js')),
			__memo(() => import('./chunks/13-a4d0e08d.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/admin",
				pattern: /^\/admin\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/agreement",
				pattern: /^\/agreement\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/api/export",
				pattern: /^\/api\/export\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-398a2d5c.js'))
			},
			{
				id: "/api/requests",
				pattern: /^\/api\/requests\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-5a5274dd.js'))
			},
			{
				id: "/calculator",
				pattern: /^\/calculator\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/cases",
				pattern: /^\/cases\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/contact",
				pattern: /^\/contact\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: __memo(() => import('./chunks/_server.ts-129bf9fb.js'))
			},
			{
				id: "/disclaimer",
				pattern: /^\/disclaimer\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/price",
				pattern: /^\/price\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/privacy",
				pattern: /^\/privacy\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/requisites",
				pattern: /^\/requisites\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/services",
				pattern: /^\/services\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/tax-2026",
				pattern: /^\/tax-2026\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 13 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();

const prerendered = new Set([]);

export { manifest, prerendered };
//# sourceMappingURL=manifest.js.map
