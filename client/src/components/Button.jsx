export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`block w-fit mx-auto bg-[#42D4BC] text-black text-sm font-semibold py-2 px-3 rounded-md shadow-md hover:bg-[#35b4a6] transition duration-200 ${className}`}
    >
      {children}
    </button>
  );
}
