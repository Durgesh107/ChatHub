import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, User } from "lucide-react";
import icon from "../assets/icon.jpg"

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="border-b border-base-300 w-full top-0 z-40 
     backdrop-blur-lg bg-base-100/80 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-cyan-500/5 to-fuchsia-500/5" />
      
      <div className="container mx-auto px-4 h-16 relative z-10">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all group">
              <div className="size-9 rounded-lg bg-gradient-to-r from-violet-500/20 via-cyan-500/20 to-fuchsia-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <img src={icon} alt="" className="w-5 h-5 text-transparent bg-gradient-to-r from-violet-600 via-cyan-600 to-fuchsia-600 bg-clip-text" />
              </div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-violet-600 via-cyan-600 to-fuchsia-600 bg-clip-text text-transparent">ChatHub</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {authUser && (
              <>
                <Link to={"/profile"} className="btn btn-sm gap-2 bg-gradient-to-r from-violet-500/10 via-cyan-500/10 to-fuchsia-500/10 border-violet-500/20 hover:from-violet-500/20 hover:via-cyan-500/20 hover:to-fuchsia-500/20 transition-all">
                  <User className="size-5 text-violet-600" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button 
                  className="flex gap-2 items-center btn btn-sm bg-gradient-to-r from-red-500/10 to-pink-500/10 border-red-500/20 hover:from-red-500/20 hover:to-pink-500/20 transition-all" 
                  onClick={logout}
                >
                  <LogOut className="size-5 text-red-600" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;