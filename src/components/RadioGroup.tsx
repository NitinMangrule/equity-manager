function RadioGroup({
  label,
  name,
  options,
  selectedValue,
  onChange,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  selectedValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="block text-base font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="flex items-center space-x-8">
        {options.map(({ value, label }) => (
          <label key={value} className="flex items-center space-x-2">
            <input
              type="radio"
              name={name}
              value={value}
              checked={selectedValue === value}
              onChange={onChange}
              className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300"
            />
            <span className="text-base text-gray-700">{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default RadioGroup;
