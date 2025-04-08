
import { CheckCircle2, Circle, X } from "lucide-react";
import { useState } from "react";

interface GroceryItemProps {
  id: string;
  name: string;
  category: string;
  checked: boolean;
  onCheck: (id: string, checked: boolean) => void;
  onRemove: (id: string) => void;
}

const GroceryItem = ({
  id,
  name,
  category,
  checked,
  onCheck,
  onRemove,
}: GroceryItemProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onCheck(id, newCheckedState);
  };

  return (
    <div className={`flex items-center justify-between p-3 border-b ${isChecked ? 'bg-gray-50' : ''}`}>
      <div className="flex items-center flex-1" onClick={handleToggle}>
        <button className="mr-3 text-gray-400 hover:text-leanfuel-primary">
          {isChecked ? (
            <CheckCircle2 size={20} className="text-leanfuel-primary" />
          ) : (
            <Circle size={20} />
          )}
        </button>
        <div>
          <p className={`${isChecked ? 'line-through text-gray-400' : ''}`}>
            {name}
          </p>
          <p className="text-xs text-gray-500">{category}</p>
        </div>
      </div>
      <button 
        onClick={() => onRemove(id)}
        className="text-gray-400 hover:text-red-500 p-1"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default GroceryItem;
