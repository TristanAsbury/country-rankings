export interface Country {
    flags: {
        svg: string;
        png: string;
    };
    name: {
        common: string;
    };
    population: number;
    area: number;
    region: string;
    unMember: boolean;
}