import { useState } from "react";

export interface ChckboxAttributes extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export const Checkbox = (props: ChckboxAttributes) => {
    const [checked, setChecked] = useState(props.checked || false);

    return (
        <div className={`flex flex-row gap-2 items-center cursor-pointer ${props.className}`} onClick={() => setChecked(!checked)}>
            <label
                htmlFor={props.id || props.label?.replace(/\s+/g, "-").toLowerCase()}
                className={`w-6 h-6 flex items-center justify-center border-2 rounded-md cursor-pointer
                    ${checked ? "bg-blue-500 border-blue-500" : "border-gray-400"}
                    focus:ring-2 focus:ring-blue-600 focus:outline-none`}
                tabIndex={0} // Make label focusable
                role="checkbox"
                aria-checked={checked}
                onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Enter") {
                        setChecked(!checked);
                    }
                }}
            >
                {checked && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M5 12l5 5l10 -10" />
                    </svg>
                )}
            </label>
            {props.label && <label className="text-lg font-medium">{props.label}</label>}
        </div>
    );
};
