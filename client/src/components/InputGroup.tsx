import classNames from 'classnames';

interface InputGroupProps {
  className?: string;
  type: string;
  placeholder: string;
  value: string;
  error: string | undefined;
  setValue: (str: string) => void;
}

const InputGroup: React.FC<InputGroupProps> = ({
  className,
  type,
  placeholder,
  value,
  error,
  setValue,
}) => {
  return (
    <div className={className}>
      <input
        type={type}
        className={classNames(
          'w-full px-3 py-2  duration-200 border border-gray-300 rounded outline-none transtion bg-gray-50 focus:bg-white hover:bg-white',
          { 'border-red-500': error }
        )}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <small className="pl-1 text-xs font-medium text-red-600">{error}</small>
    </div>
  );
};

export default InputGroup;
