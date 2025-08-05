export default function HeroText({ children, className = "" }) {
  return (
    <h1
      className={`text-2xl font-bold text-center mb-6 text-red-600 ${className}`}
    >
      {children}
    </h1>
  );
}
