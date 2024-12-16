export function Link({ href, icon, children, isActive, onClick }) {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
      className={`flex items-center space-x-3 rounded-lg px-3 py-2 transition-colors ${
        isActive
          ? "bg-gray-700 text-white"
          : "text-gray-300 hover:bg-gray-700 hover:text-white"
      }`}
    >
      {icon}
      <span>{children}</span>
    </a>
  );
}
