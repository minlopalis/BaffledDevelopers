const Button = ({ children, type = 'button', onClick }) => (
  <button
    onClick={onClick}
    type={type}
    className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
    {children}
  </button>
);

export default Button;
