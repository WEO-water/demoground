export type FeatureMetaInformation = {
    id: string
    layer: any
    originalStyle: any
    properties: {
        [key: string]: string | number
    };
};
