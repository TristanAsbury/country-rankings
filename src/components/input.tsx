import React from "react";

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <div className={`flex flex-row gap-2 bg-zinc-700 rounded-lg py-1 items-center px-2 ${props?.className}`}>
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
            <input {...props} className="px-2 py-1 focus:outline-none w-full" placeholder="Search by Name, Region, Subregion" />
        </div>
    );
};