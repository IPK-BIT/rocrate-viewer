import { readable, writable } from 'svelte/store';

function createAppStateStore() {
	const states = {
		INIT: 'init',
		GUI: 'gui'
	};

	const store = writable(states.INIT);

	return {
		subscribe: store.subscribe,
		set: store.set,
		...states
	};
}

export const state = createAppStateStore();