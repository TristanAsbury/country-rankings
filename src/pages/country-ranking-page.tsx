import { useEffect, useState } from "react";
import { CountryTable } from "../components/country-table"
import api from "../services/axios"
import { Country } from "../types/country";
import { Input } from "../components/input";
import { Checkbox } from "../components/checkbox";
import { Select } from "../components/select";

export const CountryRankingPage = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [selectedRegions, setSelectedRegions] = useState<{region: string; selected: boolean}[]>([
        {region: "Americas", selected: true},
        {region: "Antarctic", selected: true},
        {region: "Africa", selected: true},
        {region: "Asia", selected: true},
        {region: "Europe", selected: true},
        {region: "Oceania", selected: true}
    ]);
    
    useEffect(() => {
        api.get('/all').then(r => {
            return r.data;
        }).then(cs => {
            setCountries(cs);
        })
    }, [])

    const toggleRegion = (region: string) => {
        const updatedSelectedRegions = [...selectedRegions];
        const selectedRegion = updatedSelectedRegions.find(r => r.region === region);
        if (selectedRegion){
            selectedRegion.selected = !selectedRegion?.selected;
            setSelectedRegions(updatedSelectedRegions);
        }
    }

    return (
        <main className="h-full flex flex-col p-8 rounded-xl bg-zinc-800 border border-zinc-700">
            {/* Found x countries and search bar */}
            <div className="flex-1 flex flex-col md:flex-row justify-between items-center">
                <p className="font-medium text-lg">Found {countries.length} countries</p>
                <Input className="w-sm"></Input>
            </div>

            {/* Search + Table */}
            <div className="h-full flex flex-row flex-grow mt-4 overflow-hidden">
                {/* Search Properties */}
                <div className="w-xl flex flex-col gap-8">
                <div className="flex flex-col w-fit">
                    <label htmlFor="SortBy">Sort by</label>
                    <Select>
                    <option value="test">Name</option>
                    <option value="test2">Population</option>
                    <option value="test3">Area</option>
                    <option value="test4">Region</option>
                    </Select>
                </div>

                <div className="flex flex-col gap-2 max-w-xs">
                    <p className="text-sm">Region</p>
                    <div className="flex flex-row flex-wrap gap-2">
                    {selectedRegions.map((sr) => (
                        <div
                        key={sr.region}
                        className={`${sr.selected ? `bg-zinc-700` : ``} px-2 py-1 rounded-xl transition-all select-none`}
                        >
                        <label htmlFor={sr.region + "Checkbox"} className="font-md text-lg hover:cursor-pointer">
                            {sr.region}
                        </label>
                        <input id={sr.region + "Checkbox"} type="checkbox" onChange={() => toggleRegion(sr.region)} hidden />
                        </div>
                    ))}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <p>Status</p>
                    <Checkbox label="Member of the United Nations"></Checkbox>
                    <Checkbox label="Independent"></Checkbox>
                </div>
                </div>

                {/* Table Wrapper with Scroll */}
                <div className="flex-1 overflow-auto">
                    <CountryTable countries={countries} />
                </div>
            </div>
        </main>
    )
}