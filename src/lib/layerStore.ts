import { type Readable, writable } from 'svelte/store';

export interface Layer {
    label: string;
    hidden: boolean;
}

export interface LayerStore extends Readable<Layer[]> {
    addLayer: (layer: Layer) => void;
    reset: () => void;
}

const initStore = (): LayerStore => {
    const initialState: Layer[] = [];

    const { subscribe, set, update } =
        writable(initialState);

    return {
        subscribe,
        addLayer: (newLayer: Layer) =>
            update((layers) => ([
                ...layers,
                newLayer
            ])),
        reset: () => set(initialState)
    };
};

export const layers = initStore();