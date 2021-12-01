const Select = ({
  label,
  register,
  required,
  error,
  selectID,
  selectedItem,
  data,
  internalError = "",
}) => {
  const colors = {
    text: error || internalError ? "red" : "gray",
    border: error || internalError ? "red" : "indigo",
  };
  return (
    <div className="py-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1">
        <select
          name={label}
          id={selectID}
          data={data}
          className={`block w-full px-3 py-2 border border-${colors.border}-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-${colors.border}-500 focus:border-${colors.border}-500 sm:text-sm`}
          {...register(label, { required })}
        >
          {data.map((d) => {
            return (
              <option key={d?.id} selected={selectedItem === d.name} value={d?.id}>
                {d?.name}
              </option>
            );
          })}
          ;
        </select>
      </div>

      {error && (
        <p className={`mt-2 text-sm text-${colors.text}-600`} id="email-error">
          This field is required
        </p>
      )}
      {internalError && (
        <p className={`mt-2 text-${colors.text}-600`} id="email-error">
          {internalError}
        </p>
      )}
    </div>
  );
};

export default Select;
