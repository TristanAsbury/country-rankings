import { useEffect, useState } from "react";
import { CountryTable } from "../components/country-table"
import api from "../services/axios"
import { Country } from "../types/country";
import "../index.css";
import {Button, Checkbox, Input, Key, Label, ListBox, ListBoxItem, Popover, SearchField, Select, SelectValue, Tag, TagGroup, TagList} from "react-aria-components"

export const CountryRankingPage = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [unChecked, setUnChecked] = useState(false);
    const [indChecked, setIndChecked] = useState(false);
    const [sortByOption, setSortByOption] = useState<Key>("population")
    const allRegions = ["Americas", "Antarctic", "Africa", "Asia", "Europe", "Oceania"];
    const [selectedRegions, setSelectedRegions] = useState<'all' | Set<Key>>('all');
    
    useEffect(() => {
        api.get('/all').then(r => {
            return r.data;
        }).then(cs => {
            setCountries(cs);
            setFilteredCountries(cs);
        })
    }, [])

    useEffect(() => {
        console.log({searchTerm, unChecked, indChecked, sortByOption, selectedRegions})

        const updatedCountries = countries.filter(c => {
            const inTerm = c.name.common.includes(searchTerm) || c.region.includes(searchTerm);
        
            let inUn = true; // Default to true, so it doesn’t filter out anything unless checked
            let nonUn = true;
            if (unChecked) {
                inUn = c.unMember; // Only allow UN members if `unChecked` is true
            }
            if (indChecked) {
                nonUn = !c.unMember; // Only allow independent nations if `indChecked` is true
            }
            const inRegion = selectedRegions === 'all' || (selectedRegions && selectedRegions.has(c.region));
        
            return inTerm && inRegion && inUn && nonUn;
        });

        switch(sortByOption){
            case "population":
                updatedCountries.sort((a,b) => a.population > b.population ? -1 : 1);
                break;
            case "name":
                updatedCountries.sort((a,b) => a.name.common.localeCompare(b.name.common));
                break;
            case "area":
                updatedCountries.sort((a,b) => a.area > b.area ? -1 : 1);
                break;
            case "region":
                updatedCountries.sort((a,b) => a.region.localeCompare(b.region));
                break;
            default:
                break;
        }

        setFilteredCountries(updatedCountries);
    }, [searchTerm, unChecked, indChecked, sortByOption, selectedRegions, countries]) 

    return (
        <main className="h-full flex flex-col p-8 rounded-xl bg-zinc-800 border border-zinc-700">
            {/* Found x countries and search bar */}
            <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="font-medium text-lg">Found {countries.length} countries</p>
                <SearchField aria-label="Search" onChange={setSearchTerm}>
                    <Input placeholder="Search by Name, Region, Subregion"/>
                    <Button>
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                    </Button>
                </SearchField>
            </div>

            {/* Search + Table Wrapper */}
            <div className="flex-1 flex flex-row overflow-hidden mt-4">
                {/* Search Properties */}
                <div className="min-w-xs flex flex-col gap-8 mr-4 p-2">
                    <div className="flex flex-col gap-2">
                        <Select 
                            placeholder="Select one" 
                            defaultSelectedKey={sortByOption}
                            onSelectionChange={setSortByOption}>
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
                        <TagGroup 
                        selectedKeys={selectedRegions}
                        selectionMode="multiple"
                        onSelectionChange={setSelectedRegions}>
                            <Label>Region</Label>
                            <TagList>
                                {allRegions.map((r) => (
                                    <Tag key={r} id={r}>{r}</Tag>
                                ))}
                            </TagList>
                        </TagGroup>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p>Status</p>
                        <Checkbox onChange={setUnChecked} aria-label="Member of United Nations">
                            <div className="checkbox">
                                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor" strokeWidth={2} stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>
                            </div>
                            <Label>Member of the United Nations</Label>
                        </Checkbox>
                        <Checkbox onChange={setIndChecked} aria-label="Independent">
                            <div className="checkbox">
                                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor" strokeWidth={2} stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>
                            </div>
                            <Label>Independent</Label>
                        </Checkbox>
                    </div>
                </div>

                {/* Table Wrapper with Scroll */}
                <div className="overflow-auto">
                    <CountryTable countries={filteredCountries} />
                </div>
            </div>
        </main>
    )
}