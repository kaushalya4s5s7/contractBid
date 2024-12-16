export function MetricCard({ title, value, icon, status = "success" }) {
  const statusColors = {
    success: "from-purple-600/20 to-purple-600/10 text-purple-500",
    warning: "from-amber-500/20 to-amber-500/10 text-amber-500",
    error: "from-red-500/20 to-red-500/10 text-red-500",
  };

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-gray-800 p-6 shadow-lg`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-white">{value}</p>
        </div>
        <div className="text-2xl text-purple-500">{icon}</div>
      </div>
      <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-purple-600/5" />
    </div>
  );
}
