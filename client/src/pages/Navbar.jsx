import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  
  
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/10 border-b border-white/10 shadow-lg p-4 px-12 flex items-center justify-between rounded-b-2xl transition-all duration-300 hover:backdrop-blur-2xl">
      {/* Logo */}
      <h1 className="text-5xl font-extrabold text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text tracking-wide hover:scale-110 transition-all duration-300 drop-shadow-2xl">
       TODO APP
      </h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8">
        <Link to="/signup">
          <button className="px-8 py-3 rounded-xl text-white font-bold bg-gradient-to-r from-cyan-500 to-indigo-600 shadow-lg hover:shadow-xl hover:scale-110 transition-all hover:animate-pulse  duration-300">
            Signup
          </button>
        </Link>

        <Link to="/login">
          <button className="px-8 py-3 rounded-xl text-white font-bold bg-gradient-to-r from-pink-500 to-orange-400 shadow-lg hover:shadow-xl hover:scale-110 transition-all hover:animate-pulse duration-300">
            Login
          </button>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-black/90 backdrop-blur-md text-white text-lg text-center space-y-6 py-6 rounded-b-2xl shadow-xl md:hidden">
          <Link to="/signup" className="block">
            <button className="px-6 py-3 w-3/4 rounded-xl text-white font-bold bg-gradient-to-r from-cyan-500 to-indigo-600 shadow-lg hover:shadow-xl transition-all duration-300">
              Signup
            </button>
          </Link>

          <Link to="/login" className="block">
            <button className="px-6 py-3 w-3/4 rounded-xl text-white font-bold bg-gradient-to-r from-pink-500 to-orange-400 shadow-lg hover:shadow-xl transition-all duration-300">
              Login
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
