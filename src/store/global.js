import { writable } from 'svelte/store';
import { checkLanguage } from '../lib/Utils';

export const storeLanguage = writable(checkLanguage());

console.log('store language', storeLanguage);