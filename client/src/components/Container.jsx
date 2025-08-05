export default function Container({ children, className = "" }) {
  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 bg-white`}
    >
      <div
        className={`w-full max-w-md rounded-xl bg-[#f4fafa] shadow-md p-6 ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
