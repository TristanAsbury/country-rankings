import { useEffect, useState } from "react";
import { CountryTable } from "../components/country-table"
import api from "../services/axios"
import { Country } from "../types/country";

export const CountryRankingPage = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    
    useEffect(() => {
        api.get('/all').then(r => {
            return r.data;
        }).then(cs => {
            setCountries(cs);
        })
    }, [])

    return (
        <main className="flex flex-col p-8 rounded-xl">

            {/* Found x countries and search bar */}
            <div className="flex flex-col md:flex-row">
                <p>Found {countries.length} countries</p>
                <input 
                className="bg-zinc-700 p-2 rounded-lg"
                type="text" 
                placeholder="Search by Name, Region, Subregion" />
            </div>


            <CountryTable countries={countries}></CountryTable>

        </main>
    )
}