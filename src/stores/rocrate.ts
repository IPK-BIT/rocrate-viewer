import { writable, get, type Writable } from "svelte/store";

export const rocrate: Writable<any> = writable({});
export const rocrateLevel = writable('investigation');