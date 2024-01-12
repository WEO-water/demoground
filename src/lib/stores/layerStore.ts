import { type Readable, writable, type Writable } from 'svelte/store';
import type { MapLayer } from '$lib/types/MapLayer';



export interface LayerStore extends Writable<MapLayer[]> {
    addLayer: (layer: MapLayer) => void;
    removeLayer: (id: number) => void;
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
            update((layers) => {
                if (!newLayer.id) {
                    newLayer.id = Math.floor(Math.random() * 100000)
                }
                if (!newLayer.position) {
                    newLayer.position = layers.length + 1
                }
                return [
                    ...layers,
                    newLayer
                ]
            }),
        removeLayer: (id: number) =>
            update((layers) => {
                return layers.filter((p) => (p.id !== id))
            }),
        reset: () => set(initialState)
    };
};

export const layers = initStore();