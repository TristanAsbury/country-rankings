import { Link, useParams } from "react-router"
import { Country } from "../types/country";
import { useEffect, useState } from "react";
import api from "../services/axios";

export const CountryDetailsPage = () => {
    const {countryName} = useParams();
    const [country, setCountry] = useState<Country>();
    const [neighbors, setNeighbors] = useState<Country[]>([]);
    
    useEffect(() => {
        api.get(`/name/${countryName}/?fullText=true`).then(r => {
            const results = r.data as Country[];
            if(results.length > 1){
                throw new Error("Invalid country");
            } else {
                setCountry(results[0]);
            }
        }, error => {
            console.error(error)
        });
    }, [countryName])

    useEffect(() => {
        const nbors: Country[] = [];
        country?.borders?.forEach(border => {
            api.get(`/alpha/${border}`).then(b => {
                const nbor = b.data[0];
                nbors.push(nbor);
                setNeighbors(nbors);
            });
        });
    }, [country])

    return (
        <div className="bg-zinc-800 border border-zinc-700 max-w-2xl m-auto rounded-xl shadow-xl">
            <div className="flex flex-col divide-y-1 divide-zinc-700">
                <div className="w-full">
                    <div className="w-full p-6">
                        <Link to={"/"} className="w-fit border-2 border-zinc-700 rounded-md p-2 inline-block">
                            Back to search
                        </Link>
                        <img src={country?.flags.svg} className="rounded-xl m-auto max-w-2/5 mb-4 mt-10"></img>
                        <h1 className="font-medium text-3xl text-center">{country?.name.common}</h1>
                        <h3 className="text-center">{country?.name.official}</h3>
                    </div>

                    <div className="w-fit flex flex-row gap-4 m-auto p-8 text-[10px] md:text-base">
                        <div className="text-zinc-200 w-fit flex flex-row items-center justify-between divide-x-1 p-3 rounded-lg bg-zinc-700 divide-zinc-800">
                            <p className="px-2">Population</p>
                            <p className="px-2">{country?.population.toLocaleString()}</p>
                        </div>


                        <div className="text-zinc-200 w-fit flex flex-row items-center justify-between divide-x-1 p-3 rounded-lg bg-zinc-700 divide-zinc-800">
                            <p className="px-2">Area (km2)</p>
                            <p className="px-2">{country?.area.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                <div className="p-4 flex flex-row justify-between">
                    <p>Capital</p>
                    <p>{country?.capital}</p>
                </div>

                <div className="p-4 flex flex-row justify-between">
                    <p>Subregion</p>
                    <p>{country?.subregion}</p>
                </div>

                <div className="p-4 flex flex-row justify-between">
                    <p>Language</p>
                    <div className="flex flex-row gap-2">
                    {
                        country?.languages && Object.values(country?.languages).join(', ')
                    }
                    </div>
                </div>

                <div className="p-4 flex flex-row justify-between">
                    <p>Currencies</p>
                    <div className="flex flex-row gap-2">
                    {
                        country?.currencies && Object.values(country?.currencies).map(c => c.name).join(', ')
                    }
                    </div>
                </div>

                <div className="p-4 flex flex-row justify-between">
                    <p>Continents</p>
                    <div>
                    {
                        country?.continents.join(', ')
                    }
                    </div>
                </div>

                <div className="p-4 flex flex-col justify-between gap-4">
                    <p>Neighboring Countries</p>
                    <div className="flex flex-row overflow-x-scroll gap-4">
                        {
                            neighbors.map(n => {
                                return (
                                    <Link className="flex flex-col gap-2 shrink-0"
                                    to={`/country/${n.name.common}`} 
                                    key={n.name.common}>
                                        <img src={n.flags.svg} className="w-18 rounded-lg aspect-3/2"/>
                                        <p className="text-sm">
                                            {n.name.common}
                                        </p>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}