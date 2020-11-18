export interface ICityResults {
    geonames: IGeoNames[];
    totalResultsCount?: number;
}

export interface IGeoNames {
    lat: string;
    lng: string;
    name: string;
}

export interface IHotelsResults {
    results: IHotel[]
}

export interface IHotel {
    position: number[];
    category: string;
    title: string;
    vinicity: string;
}

export interface IMarker {
    position: IPosition;
    label?: ILabel;
    title?: string;
    icon?: string;
    options?: IOptions;
} 

export interface IPosition {
    lat: number;
    lng: number;    
} 

export interface ILabel {
    color: string;
    text: string;
} 

export interface IOptions {
    icon: string;
} 


