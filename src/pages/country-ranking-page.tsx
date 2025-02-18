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
        {region: "Americas", selected: false},
        {region: "Antarctic", selected: false},
        {region: "Africa", selected: false},
        {region: "Asia", selected: false},
        {region: "Europe", selected: false},
        {region: "Oceania", selected: false}
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
        console.log(selectedRegions);   
    }

    return (
        <main className="flex flex-col p-8 rounded-xl bg-zinc-800 border border-zinc-700">

            {/* Found x countries and search bar */}
            <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="font-medium text-lg">Found {countries.length} countries</p>
                <Input className="w-sm"></Input>
            </div>

            {/* Search + Table */}
            <div className="flex flex-row h-full">
                <div className="w-xl h-full flex flex-col gap-8">
                    <div className="flex flex-col w-fit">
                        <label htmlFor="SortBy">Sort by</label>
                        <Select>
                            <option value="test">Test</option>
                            <option value="test2">Test</option>
                            <option value="test3">Test</option>
                            <option value="test4">Test</option>
                        </Select>
                    </div>

                    <div className="flex flex-col gap-2 max-w-xs">
                        <p className="text-sm">Region</p>
                        <div className="flex flex-row flex-wrap gap-2">
                            {
                                selectedRegions.map(sr => {
                                    return (
                                        <div className={`${sr.selected ? `bg-zinc-700` : ``} px-2 py-1 rounded-xl transition-all select-none`}>
                                            <label htmlFor={sr.region + "Checkbox"} 
                                            className="font-md text-lg hover:cursor-pointer">{sr.region}</label>
                                            <input id={sr.region + "Checkbox"} 
                                            type="checkbox" 
                                            onChange={() => toggleRegion(sr.region)} hidden/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p>Status</p>
                        <Checkbox label="Member of the United Nations"></Checkbox>
                        <Checkbox label="Independent"></Checkbox>
                    </div>


                </div>
                <CountryTable countries={countries}></CountryTable>
            </div>


        </main>
    )
}