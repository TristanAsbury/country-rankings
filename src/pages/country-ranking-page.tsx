import { useEffect, useState } from "react";
import { CountryTable } from "../components/country-table"
import api from "../services/axios"
import { Country } from "../types/country";
import "../index.css";
import {Button, Input, Label, ListBox, ListBoxItem, Popover, Select, SelectValue, Tag, TagGroup, TagList, TextField} from "react-aria-components"

export const CountryRankingPage = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [unChecked, setUnChecked] = useState(false);
    const [indChecked, setIndChecked] = useState(false);
    const [sortByOption, setSortByOption] = useState<string | null>(null)
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

    useEffect(() => {
        console.log("Something changed");
    }, [searchTerm, unChecked, indChecked, sortByOption, selectedRegions])

    const toggleRegion = (region: string) => {
        const updatedSelectedRegions = [...selectedRegions];
        const selectedRegion = updatedSelectedRegions.find(r => r.region === region);
        if (selectedRegion){
            selectedRegion.selected = !selectedRegion?.selected;
            setSelectedRegions(updatedSelectedRegions);
        }
    }

    const onSearchChange = (term: string) => {
        setSearchTerm(term);
    }

    const onSortByChanged = (value: string) => {
        setSortByOption(value);
    }

    return (
        <main className="h-full flex flex-col p-8 rounded-xl bg-zinc-800 border border-zinc-700">
            {/* Found x countries and search bar */}
            <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="font-medium text-lg">Found {countries.length} countries</p>
                <TextField aria-label="Search" onChange={onSearchChange}>
                    <Input placeholder="Search by Name, Region, Subregion"></Input>
                </TextField>
            </div>

            {/* Search + Table Wrapper */}
            <div className="flex-1 flex flex-row overflow-hidden mt-4">
                {/* Search Properties */}
                <div className="min-w-xs flex flex-col gap-8 mr-4">
                    <div className="flex flex-col gap-2">
                        <Select 
                            placeholder="Select one" 
                            defaultSelectedKey={"population"}
                            onSelectionChange={(v) => onSortByChanged(v.toString())}>
                            <Label>Sort by</Label>
                            <Button>
                                <SelectValue/>
                            </Button>
                            <Popover>
                                <ListBox>
                                    <ListBoxItem id={"population"}>Population</ListBoxItem>
                                    <ListBoxItem id={"name"}>Name</ListBoxItem>
                                    <ListBoxItem id={"area"}>Area</ListBoxItem>
                                    <ListBoxItem id={"region"}>Region</ListBoxItem>
                                </ListBox>
                            </Popover>
                        </Select>
                    </div>

                    <div className="flex flex-col gap-2 max-w-xs">
                        <TagGroup selectionMode="multiple">
                            <Label>Region</Label>
                            <TagList>
                                {selectedRegions.map((sr) => (
                                    <Tag key={sr.region}>{sr.region}</Tag>
                                ))}
                            </TagList>
                        </TagGroup>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p>Status</p>
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