export type MapLayer = {
    id: number
    position: number
    type: string
    title: string
    visible: boolean
    removable: boolean
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

export interface GEOJsonMapLayer extends MapLayer {
    orgLayerTitle: string
    featureCount: number
    data: any
    options: any
    color: any
}