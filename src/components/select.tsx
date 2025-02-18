import React, { useState, useRef, useEffect, ReactElement } from "react";

export const Select = ({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [displayValue, setDisplayValue] = useState<React.ReactNode | null>(null);
  const selectRef = useRef<HTMLDivElement>(null); // Ref for the dropdown container

  // Ensure options are React Elements
  const options = React.Children.toArray(children).filter(
    (child): child is ReactElement<{ value: string; children: React.ReactNode[] }> =>
      React.isValidElement(child) && child.type === "option"
  );

  const handleSelect = (value: string, display: React.ReactNode) => {
    setSelectedValue(value);
    setDisplayValue(display);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectRef} className="relative w-64">
      {/* Visible Select Box */}
      <div
        className="rounded-lg p-2 cursor-pointer border-2 border-zinc-600 flex flex-row justify-between items-center"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {displayValue || "Select an option"}
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-down"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 9l6 6l6 -6" /></svg>
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full border-2 border-zinc-600 rounded-lg bg-zinc-800 shadow-md mt-1 z-10">
          {options.map((option, index) => (
            <div
              key={index}
              className="p-2 cursor-pointer hover:bg-zinc-700 rounded-md"
              onClick={() => handleSelect(option.props.value, option.props.children)}
            >
              {option.props.children}
            </div>
          ))}
        </div>
      )}

      {/* Hidden native select element for accessibility */}
      <select {...props} value={selectedValue ?? ""} hidden>
        {children}
      </select>
    </div>
  );
};
