import { type Readable, writable, type Writable } from 'svelte/store';
import type { FeatureMetaInformation } from '$lib/types/FeatureMetaInformation';



export interface SelectedFeatureStore extends Writable<FeatureMetaInformation[]> {
    addSelectedFeature: (feature: FeatureMetaInformation) => void;
    reset: () => void;
}

const initStore = (): SelectedFeatureStore => {
    const initialState: FeatureMetaInformation[] = [];

    const { subscribe, set, update } =
        writable(initialState);

    return {
        subscribe,
        update,
        set,
        addSelectedFeature: (feature: FeatureMetaInformation) => {
            feature.layer.setStyle({
                radius: 9,
                fillColor: 'red',
                color: "red",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.95
            })

            return update((features) => {
                features.forEach((feature) => {
                    feature.layer.setStyle(feature.originalStyle)
                })
                return [
                    feature
                ]
            })},
        reset: () => set(initialState)
    };
};

export const selectedFeature = initStore();