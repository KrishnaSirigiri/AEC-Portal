const Button = ({ label, onClick, variant = "primary" }) => {
  const base = "px-4 py-2 rounded-lg font-medium transition";
  const variants = {
    primary: `${base} bg-indigo-600 text-white hover:bg-indigo-700`,
    outline: `${base} border border-indigo-600 text-indigo-600 hover:bg-indigo-50`,
  };
  return (
    <button className={variants[variant]} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
