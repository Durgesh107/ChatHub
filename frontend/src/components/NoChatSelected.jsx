import { MessageSquare, Sparkles, Heart } from "lucide-react";
import icon from "../assets/icon.jpg"

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-cyan-500/5 to-fuchsia-500/5 animate-pulse" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-violet-400/30 rounded-full animate-bounce delay-0" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-400/40 rounded-full animate-bounce delay-300" />
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-fuchsia-400/30 rounded-full animate-bounce delay-700" />
      </div>
      <div className="max-w-md text-center space-y-8 relative z-10">
        <div className="flex justify-center gap-4 mb-8">
          <div className="relative group">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-violet-500 via-cyan-500 to-fuchsia-500 p-0.5 animate-spin-slow opacity-70 group-hover:opacity-100 transition-opacity duration-500">
              <div className="w-full h-full rounded-3xl bg-base-100" />
            </div>
            <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-500/10 via-cyan-500/10 to-fuchsia-500/10 flex items-center justify-center backdrop-blur-sm border border-white/10 shadow-2xl group-hover:scale-110 transition-all duration-500 animate-float">
              <img src={icon} alt="" className="w-10 h-10 text-transparent bg-gradient-to-r from-violet-500 via-cyan-500 to-fuchsia-500 bg-clip-text drop-shadow-lg" />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-600 via-cyan-600 to-fuchsia-600 bg-clip-text text-transparent drop-shadow-sm">
            Welcome to ChatHub!
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-violet-500 via-cyan-500 to-fuchsia-500 rounded-full mx-auto animate-pulse" />
        </div>
        <p className="text-lg text-base-content/70 leading-relaxed font-medium">
          Select a conversation from the sidebar to start your amazing chat experience
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-base-content/50 animate-bounce">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500" />
          <span>Choose a contact to begin</span>
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500" />
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;