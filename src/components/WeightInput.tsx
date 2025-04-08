
import { useState } from "react";
import { SaveIcon } from "lucide-react";

interface WeightInputProps {
  onSave: (weight: number) => void;
  currentWeight?: number;
}

const WeightInput = ({ onSave, currentWeight }: WeightInputProps) => {
  const [weight, setWeight] = useState(currentWeight?.toString() || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (weight) {
      setIsSaving(true);
      // Simulate API call delay
      setTimeout(() => {
        onSave(parseFloat(weight));
        setIsSaving(false);
      }, 500);
    }
  };

  return (
    <div className="leanfuel-card">
      <h3 className="text-lg font-bold mb-2">Track Your Weight</h3>
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="number"
          step="0.1"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="leanfuel-input flex-1 mr-2"
          placeholder="Enter weight in kg"
          min="30"
          max="250"
        />
        <button
          type="submit"
          className="leanfuel-btn-primary flex items-center"
          disabled={isSaving || !weight}
        >
          {isSaving ? (
            <span className="animate-pulse">Saving...</span>
          ) : (
            <>
              <SaveIcon size={16} className="mr-1" />
              Save
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default WeightInput;
