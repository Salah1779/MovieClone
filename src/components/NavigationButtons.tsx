import { useState } from 'react';

interface NavigationButtonsProps {
  labels: string[];
  setSelected: (label: string) => void;
}

export const NavigationButtons = ({ labels, setSelected }: NavigationButtonsProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleButtonClick = (label: string, index: number) => {
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