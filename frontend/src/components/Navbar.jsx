import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-slate-800 border-b border-slate-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
                SummarEye AI
              </Link>
            </div>
            <div className="ml-6 flex items-center space-x-4">
              <Link to="/" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Upload
              </Link>
              <Link to="/dashboard" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
