export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13')
];

export const server_loads = [0];

export const dictionary = {
		"/": [2],
		"/admin": [~3],
		"/agreement": [4],
		"/calculator": [5],
		"/cases": [6],
		"/contact": [7],
		"/disclaimer": [8],
		"/price": [9],
		"/privacy": [10],
		"/requisites": [11],
		"/services": [12],
		"/tax-2026": [13]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';