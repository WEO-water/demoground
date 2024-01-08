export type MapLayer = {
    title: string
    visible: boolean
};

export interface OSMMapLayer extends MapLayer {
    tileUrl: string
    tileLayerOptions: any
}

export interface WFSMapLayer extends MapLayer {
    url: string
    data: any
    options: any
}