const TextArea = ({
  label,
  register,
  required,
  error,
  type,
  defaultValue = "",
  internalError = "",
}) => {
  const colors = {
    text: error || internalError ? "red" : "gray",
    border: error || internalError ? "red" : "indigo",
  };
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1">
        <textarea
          type={type}
          rows={10}
          defaultValue={defaultValue}
          {...register(label, { required })}
          className={`block w-full px-3 py-2 border border-${colors.border}-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-${colors.border}-500 focus:border-${colors.border}-500 sm:text-sm`}
        />
      </div>

      {error && (
        <p className={`mt-2 text-sm text-${colors.text}-600`} id="email-error">
          This field is required
        </p>
      )}
      {internalError && (
        <p className={`mt-2 text-sm text-${colors.text}-600`} id="email-error">
          {internalError}
        </p>
      )}
    </div>
  );
};

export default TextArea;
