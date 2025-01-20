import { useState } from "react";

import expandDown from "../assets/Expand_down.svg";

const OptionButton = ({ selectedValue, value, ...props }) => {
    let cssClass = 'w-full text-left text-sm font-semibold px-3 py-2 rounded-xl';

    if(selectedValue.id === value.id) {
        cssClass += ' bg-[#0E1325]';
    } else {
        cssClass += ' text-[#0E1325] hover:bg-slate-300';
    }
    
    return(
        <button 
            className={ cssClass }
            { ...props }
        >
            { value.value }
        </button>
    );
};

const Dropdown = ({ selectedValue, values, onSelectOption }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prevState) => !prevState);
  };

  const handleSelectOption = (option) => {
    onSelectOption(option);
    setOpen(false);
  };

  let cssClass = 'flex flex-row items-center gap-2 bg-[#E5E7EB] px-6 py-3';

  if(open) {
    cssClass += ' rounded-t-[50px]';
  } else {
    cssClass += ' rounded-[50px]'
  }

  return (
    <div className="relative">
      <button
        className={ cssClass }
        onClick={handleClick}
      >
        <p className="font-body text-base font-medium text-[#0E1325]">
          Sort by: { selectedValue.value }
        </p>
        <img src={expandDown} />
      </button>
      {open && (
        <div className="absolute w-full bg-[#E5E7EB] top-full px-3 py-2 left-0">
          <ul className="flex flex-col gap-2">
            {values.map((value) => (
              <li>
                <OptionButton 
                    selectedValue={ selectedValue }
                    value={ value }
                    onClick={ () => handleSelectOption(value) }
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
