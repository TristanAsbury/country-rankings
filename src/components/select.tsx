import React from "react";
import { useState, ReactElement } from "react";

export const Select = ({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  // Ensure options are React Elements
  const options = React.Children.toArray(children).filter(
    (child): child is ReactElement<{ value: string, children: React.ReactNode[] }> =>
      React.isValidElement(child) && child.type === "option"
  );

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  return (
    <div className="relative w-64">
      {/* Visible Select Box */}
      <div
        className="rounded-lg p-2 cursor-pointer border-2 border-zinc-600"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedValue || "Select an option"}
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full border-2 border-zinc-600 rounded-lg bg-zinc-800 shadow-md mt-1 z-10">
          {options.map((option, index) => (
            <div
              key={index}
              className="p-2 cursor-pointer hover:bg-zinc-700 rounded-lg"
              onClick={() => handleSelect(option.props.value)}
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
