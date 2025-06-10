import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Search, Filter, Zap } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-80 border-r border-gradient-to-b from-violet-500/10 via-cyan-500/10 bg-gradient-to-b to-base-200/30 backdrop-blur-sm flex flex-col transition-all duration-300 shadow-xl">
      {/* Header with enhanced styling */}
      <div className="border-b border-gradient-to-r from-violet-500/20 w-full p-6 bg-gradient-to-r via-cyan-500/5 to-fuchsia-500/5">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-violet-500 via-cyan-500 to-fuchsia-500 flex items-center justify-center shadow-lg">
              <Users className="size-5 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg" />
          </div>
          <span className="font-bold text-xl hidden lg:block bg-gradient-to-r from-violet-600 via-cyan-600 to-fuchsia-600 bg-clip-text text-transparent">
            Contacts
          </span>
        </div>

        {/* Enhanced filter controls */}
        <div className="mt-4 hidden lg:flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <label className="cursor-pointer flex items-center gap-3 group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={showOnlineOnly}
                  onChange={(e) => setShowOnlineOnly(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-12 h-6 rounded-full transition-all duration-300 ${
                  showOnlineOnly 
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg' 
                    : 'bg-gray-300'
                }`}>
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 mt-0.5 ${
                    showOnlineOnly ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </div>
              </div>
              <span className="text-sm font-medium group-hover:text-violet-600 transition-colors">
                Online only
              </span>
            </label>
            
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-green-500 animate-pulse" />
              <span className="text-xs px-2 py-1 bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-full font-medium border border-green-500/20">
                {onlineUsers.length - 1} online
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* User list with enhanced styling */}
      <div className="overflow-y-auto w-full py-4 space-y-2 px-3">
        {filteredUsers.map((user, index) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-4 flex items-center gap-4 rounded-2xl
              transition-all duration-300 hover:scale-[1.02] hover:shadow-lg
              transform-gpu group relative overflow-hidden
              ${selectedUser?._id === user._id 
                ? "bg-gradient-to-r from-violet-500/20 via-cyan-500/20 to-fuchsia-500/20 shadow-xl ring-2 ring-violet-500/30 scale-[1.02]" 
                : "hover:bg-gradient-to-r hover:from-violet-500/10 hover:via-cyan-500/10 hover:to-fuchsia-500/10"
              }
            `}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Background animation for selected user */}
            {selectedUser?._id === user._id && (
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-cyan-500/5 to-fuchsia-500/5 animate-pulse" />
            )}

            <div className="relative mx-auto lg:mx-0 group-hover:scale-110 transition-transform duration-300">
              {/* Profile picture with enhanced styling */}
              <div className="relative">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.name}
                  className="size-14 object-cover rounded-2xl border-2 border-white/20 shadow-lg group-hover:shadow-xl transition-all duration-300"
                />
                
                {/* Online status indicator */}
                {onlineUsers.includes(user._id) && (
                  <div className="absolute -bottom-1 -right-1">
                    <div className="w-5 h-5 bg-green-500 rounded-xl ring-3 ring-white shadow-lg animate-pulse" />
                    <div className="absolute inset-0 bg-green-400 rounded-xl animate-ping" />
                  </div>
                )}
              </div>
            </div>

            {/* User info with enhanced typography */}
            <div className="hidden lg:block text-left min-w-0 flex-1 relative z-10">
              <div className="font-bold text-base truncate group-hover:text-violet-600 transition-colors duration-300">
                {user.fullName}
              </div>
              <div className={`text-sm font-medium flex items-center gap-2 mt-1 ${
                onlineUsers.includes(user._id) 
                  ? "text-green-500" 
                  : "text-gray-400"
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  onlineUsers.includes(user._id) 
                    ? "bg-green-500 animate-pulse" 
                    : "bg-gray-400"
                }`} />
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>

            {/* Hover effect indicator */}
            <div className="hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-2 h-8 bg-gradient-to-b from-violet-500 via-cyan-500 to-fuchsia-500 rounded-full" />
            </div>
          </button>
        ))}

        {/* Empty state with enhanced styling */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-gray-400/20 to-gray-500/20 rounded-2xl flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <div className="space-y-2">
              <p className="text-gray-500 font-medium">No online users</p>
              <p className="text-sm text-gray-400">Check back later or invite friends!</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
