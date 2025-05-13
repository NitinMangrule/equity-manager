function TextInput({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  required = false,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-base font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="block w-full border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
        required={required}
      />
    </div>
  );
}
export default TextInput;
