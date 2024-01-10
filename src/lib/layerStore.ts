import { type Readable, writable, type Writable } from 'svelte/store';
import type { MapLayer } from '$lib/types/MapLayer';



export interface LayerStore extends Writable<MapLayer[]> {
    addLayer: (layer: MapLayer) => void;
    reset: () => void;
}

const initStore = (): LayerStore => {
    const initialState: MapLayer[] = [];

    const { subscribe, set, update } =
        writable(initialState);

    return {
        subscribe,
        update,
        set,
        addLayer: (newLayer: MapLayer) =>
            update((layers) => ([
                ...layers,
                newLayer
            ])),
        reset: () => set(initialState)
    };
};

export const layers = initStore();