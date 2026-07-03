export default function ConnectionBanner({ connected }) {
  if (connected) return null;

  return (
    <div className="bg-red-600 text-white p-3 text-center">
      Connection Lost: Reconnecting...
    </div>
  );
}