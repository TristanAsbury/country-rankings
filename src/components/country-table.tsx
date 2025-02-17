import { Country } from "../types/country"

export const CountryTable = ({countries}: {countries: Country[]}) => {
    console.log(countries);
    return (
        <table className="w-full">
            <thead className="">
                <tr className="text-zinc-500 border-b border-zinc-500">
                    <th className="text-left w-sm py-4">Flag</th>
                    <th className="text-left w-sm py-4">Name</th>
                    <th className="text-left w-sm py-4">Population</th>
                    <th className="text-left w-sm py-4">Area (km2)</th>
                    <th className="text-left w-sm py-4">Region</th>
                </tr>
            </thead>
            <tbody>
            {
                countries.map((c: Country, idx) => {
                    return (
                        <tr key={idx} className="font-medium">
                            {/* FLAG */}
                            <td className="py-2">
                                <img
                                className="w-12 rounded-md object-cover aspect-3/2"
                                    src={c.flags.png}
                                    alt={"Flag of " + c.name} />
                            </td>

                            {/* NAME */}
                            <td>
                                {c.name.common}
                            </td>

                            {/* Population */}
                            <td>
                                {c.population}
                            </td>

                            {/* Area */}
                            <td>
                                {c.area}
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