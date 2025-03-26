import { useState } from 'react';


export const NavigationButtons = ({ labels, setSelected }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleButtonClick = (label, index) => {
    setSelected(label);
    setActiveIndex(index);
  };

  return (
    <div className="flex space-x-4">
      {labels.map((label, index) => (
        <button
          key={label}
          className={`px-4 py-2 rounded hover:bg-blue-600  text-white ${
            activeIndex === index ? 'bg-violet-800' : 'bg-blue-500'
          }`}
          onClick={() => handleButtonClick(label, index)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default NavigationButtons;