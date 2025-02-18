import { Country } from "../types/country"

export const CountryTable = ({countries}: {countries: Country[]}) => {
    const addCommas = (num: number): string => {
        return num.toLocaleString();
    };

    return (
        <table className="w-full h-full">
            <thead className="">
                <tr className="sticky top-0 text-zinc-400 border-b border-zinc-500 bg-zinc-800">
                    <th className="text-left w-sm pb-4 font-medium text-sm">Flag</th>
                    <th className="text-left w-sm pb-4 font-medium text-sm">Name</th>
                    <th className="text-left w-sm pb-4 font-medium text-sm">Population</th>
                    <th className="text-left w-sm pb-4 font-medium text-sm">Area (km2)</th>
                    <th className="text-left w-sm pb-4 font-medium text-sm">Region</th>
                </tr>
            </thead>
            <tbody>
            {
                countries.map((c: Country, idx) => {
                    return (
                        <tr key={idx} className="font-medium hover:bg-zinc-700 transition-all duration-50 cursor-pointer">
                            {/* FLAG */}
                            <td className="py-2 px-2">
                                <img className="w-12 rounded-md object-cover aspect-3/2"
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
                            <td>
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