export interface Country {
    flags: {
        svg: string;
        png: string;
    };
    name: {
        common: string;
        official: string;
    };
    population: number;
    area: number;
    region: string;
    unMember: boolean;
    capital: string;
    subregion: string;
    languages: Record<string, string>;
    currencies: Record<string, {name: string, symbol: string}>;
    continents: string[];
    borders: string[];
}