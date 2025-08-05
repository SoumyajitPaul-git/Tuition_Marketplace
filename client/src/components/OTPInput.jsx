export default function OTPInput({ value, onChange }) {
  return (
    <input
      type="text"
      inputMode="numeric"
      maxLength={6}
      className="w-full text-center text-2xl tracking-widest border rounded-md py-2 px-4 border-gray-300 focus:ring-primary focus:outline-none"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      // placeholder="___    ___   ___   ___"
    />
  );
}
