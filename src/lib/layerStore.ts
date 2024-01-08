import { type Readable, writable, type Writable } from 'svelte/store';

export interface Layer {
    title: string;
    visible: boolean;
}

export interface LayerStore extends Writable<Layer[]> {
    addLayer: (layer: Layer) => void;
    reset: () => void;
}

const initStore = (): LayerStore => {
    const initialState: Layer[] = [];

    const { subscribe, set, update } =
        writable(initialState);

    return {
        subscribe,
        update,
        set,
        addLayer: (newLayer: Layer) =>
            update((layers) => ([
                ...layers,
                newLayer
            ])),
        reset: () => set(initialState)
    };
};

export const layers = initStore();