import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();

  const linkClass = (path: string) =>
    `px-4 py-2 rounded-xl text-sm font-medium transition ${
      pathname === path
        ? "bg-blue-500 text-white shadow-sm"
        : "text-gray-600 hover:bg-gray-100"
    }`;
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-800">
          Weather Dashboard
        </h1>

        <div className="flex gap-2">
          <Link to="/" className={linkClass("/")}>
            Current
          </Link>
          <Link to="/historical" className={linkClass("/historical")}>
            Historical
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
