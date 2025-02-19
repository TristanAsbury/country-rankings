import { useNavigate } from "react-router";
import { Country } from "../types/country"

export const CountryTable = ({countries}: {countries: Country[]}) => {
    const navigate = useNavigate();

    const addCommas = (num: number): string => {
        return num.toLocaleString();
    };

    const goToDetails = (country: Country) => {
        navigate(`/country/${country.name.common}`);
    }

    return (
        <table className="w-full">
            <thead className="">
                <tr className="sticky top-0 text-zinc-400 border-b border-zinc-500 bg-zinc-800">
                    <th className="text-left w-sm pb-4 font-medium text-sm">Flag</th>
                    <th className="text-left w-sm pb-4 font-medium text-sm">Name</th>
                    <th className="text-left w-sm pb-4 font-medium text-sm">Population</th>
                    <th className="text-left w-sm pb-4 font-medium text-sm">Area (km2)</th>
                    <th className="text-left w-sm pb-4 font-medium text-sm hidden xl:block">Region</th>
                </tr>
            </thead>
            <tbody>
            {
                countries.map((c: Country, idx) => {
                    return (
                        <tr 
                        onClick={() => goToDetails(c)}
                        key={idx} 
                        className="font-medium hover:bg-zinc-700 transition-all duration-50 cursor-pointer">
                            {/* FLAG */}
                            <td className="py-2">
                                <img className="w-12 rounded-sm object-cover aspect-3/2"
                                    src={c.flags.png}
                                    alt={"Flag of " + c.name}/>
                            </td>

                            {/* NAME */}
                            <td>
                                {c.name.common}
                            </td>

                            {/* Population */}
                            <td>
                                {addCommas(c.population)}
                            </td>

                            {/* Area */}
                            <td>
                                {addCommas(c.area)}
                            </td>

                            {/* Region */}
                            <td className="hidden xl:block">
                                {c.region}
                            </td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}