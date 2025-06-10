// import { useChatStore } from "../store/useChatStore";
// import { useEffect, useRef } from "react";

// import ChatHeader from "./ChatHeader";
// import MessageInput from "./MessageInput";
// import MessageSkeleton from "./skeletons/MessageSkeleton";
// import { useAuthStore } from "../store/useAuthStore";
// import { formatMessageTime } from "../lib/utils";

// const ChatContainer = () => {
//   const {
//     messages,
//     getMessages,
//     isMessagesLoading,
//     selectedUser,
//     subscribeToMessages,
//     unsubscribeFromMessages,
//   } = useChatStore();
//   const { authUser } = useAuthStore();
//   const messageEndRef = useRef(null);

//   useEffect(() => {
//     getMessages(selectedUser._id);

//     subscribeToMessages();

//     return () => unsubscribeFromMessages();
//   }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

//   useEffect(() => {
//     if (messageEndRef.current && messages) {
//       messageEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   if (isMessagesLoading) {
//     return (
//       <div className="flex-1 flex flex-col overflow-auto">
//         <ChatHeader />
//         <MessageSkeleton />
//         <MessageInput />
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1 flex flex-col overflow-auto">
//       <ChatHeader />

//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((message) => (
//           <div
//             key={message._id}
//             className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
//             ref={messageEndRef}
//           >
//             <div className=" chat-image avatar">
//               <div className="size-10 rounded-full border">
//                 <img
//                   src={
//                     message.senderId === authUser._id
//                       ? authUser.profilePic || "/avatar.png"
//                       : selectedUser.profilePic || "/avatar.png"
//                   }
//                   alt="profile pic"
//                 />
//               </div>
//             </div>
//             <div className="chat-header mb-1">
//               <time className="text-xs opacity-50 ml-1">
//                 {formatMessageTime(message.createdAt)}
//               </time>
//             </div>
//             <div className="chat-bubble flex flex-col">
//               {message.image && (
//                 <img
//                   src={message.image}
//                   alt="Attachment"
//                   className="sm:max-w-[200px] rounded-md mb-2"
//                 />
//               )}
//               {message.text && <p>{message.text}</p>}
//             </div>
//           </div>
//         ))}
//       </div>

//       <MessageInput />
//     </div>
//   );
// };
// export default ChatContainer;



import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import { Eye, Download, Heart, Smile } from "lucide-react";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [hoveredMessage, setHoveredMessage] = useState(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto bg-gradient-to-b from-base-100 to-base-200/50">
        <ChatHeader />
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-cyan-500/5 to-fuchsia-500/5 animate-pulse" />
          <MessageSkeleton />
        </div>
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto relative">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/3 via-cyan-500/3 to-fuchsia-500/3 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)] pointer-events-none" />
      
      <ChatHeader />

      {/* Messages container with enhanced styling */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10 scroll-smooth">
        {messages.map((message, index) => {
          const isOwn = message.senderId === authUser._id;
          const isConsecutive = index > 0 && messages[index - 1].senderId === message.senderId;
          
          return (
            <div
              key={message._id}
              className={`flex items-end gap-3 group ${isOwn ? "justify-end" : "justify-start"} ${
                isConsecutive ? "mt-1" : "mt-6"
              }`}
              onMouseEnter={() => setHoveredMessage(message._id)}
              onMouseLeave={() => setHoveredMessage(null)}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Avatar - only show if not consecutive message */}
              {!isOwn && !isConsecutive && (
                <div className="relative group-hover:scale-110 transition-transform duration-200">
                  <div className="w-10 h-10 rounded-2xl border-2 border-white/20 shadow-lg overflow-hidden bg-gradient-to-br from-violet-500/20 to-cyan-500/20">
                    <img
                      src={selectedUser.profilePic || "/avatar.png"}
                      alt="profile pic"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white shadow-sm" />
                </div>
              )}

              {/* Message content */}
              <div className={`flex flex-col max-w-xs sm:max-w-md ${isOwn ? "items-end" : "items-start"}`}>
                {/* Timestamp - only show if not consecutive */}
                {!isConsecutive && (
                  <div className={`text-xs text-base-content/50 mb-2 font-medium ${isOwn ? "text-right" : "text-left"}`}>
                    {formatMessageTime(message.createdAt)}
                  </div>
                )}

                {/* Message bubble */}
                <div
                  className={`
                    relative px-4 py-3 rounded-2xl shadow-lg backdrop-blur-sm
                    transition-all duration-300 transform-gpu
                    ${hoveredMessage === message._id ? "scale-[1.02] shadow-xl" : ""}
                    ${isOwn 
                      ? "bg-gradient-to-r from-violet-500 via-cyan-500 to-fuchsia-500 text-white ml-12" 
                      : "bg-white/80 border border-white/20 text-gray-800 mr-12"
                    }
                    ${isConsecutive 
                      ? isOwn 
                        ? "rounded-tr-md" 
                        : "rounded-tl-md"
                      : ""
                    }
                  `}
                >
                 

                  {/* Image attachment */}
                  {message.image && (
                    <div className="mb-3 group/image cursor-pointer" onClick={() => setImagePreview(message.image)}>
                      <div className="relative overflow-hidden rounded-xl">
                        <img
                          src={message.image}
                          alt="Attachment"
                          className="max-w-[250px] sm:max-w-[300px] rounded-xl transition-transform duration-300 group-hover/image:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex gap-2">
                            <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                              <Eye className="w-4 h-4 text-gray-700" />
                            </button>
                            <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                              <Download className="w-4 h-4 text-gray-700" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Text content */}
                  {message.text && (
                    <p className={`text-sm leading-relaxed ${isOwn ? "text-white" : "text-gray-800"}`}>
                      {message.text}
                    </p>
                  )}

                  {/* Message status indicators for own messages */}
                  {isOwn && (
                    <div className="flex items-center justify-end mt-1 gap-1 opacity-70">
                      <div className="w-1 h-1 bg-white/60 rounded-full" />
                      <div className="w-1 h-1 bg-white/80 rounded-full" />
                    </div>
                  )}

                  {/* Message tail */}
                  <div 
                    className={`absolute top-4 w-3 h-3 transform rotate-45 ${
                      isOwn 
                        ? "bg-gradient-to-r from-violet-500 via-cyan-500 to-fuchsia-500 -right-1" 
                        : "bg-white/80 border-l border-t border-white/20 -left-1"
                    } ${isConsecutive ? "hidden" : "block"}`} 
                  />
                </div>
              </div>

              {/* Own avatar */}
              {isOwn && !isConsecutive && (
                <div className="relative group-hover:scale-110 transition-transform duration-200">
                  <div className="w-10 h-10 rounded-2xl border-2 border-white/20 shadow-lg overflow-hidden bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20">
                    <img
                      src={authUser.profilePic || "/avatar.png"}
                      alt="profile pic"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white shadow-sm" />
                </div>
              )}
            </div>
          );
        })}
        
        {/* Scroll anchor */}
        <div ref={messageEndRef} className="h-1" />

        {/* Empty state */}
        {messages.length === 0 && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4 opacity-60">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-violet-500/20 via-cyan-500/20 to-fuchsia-500/20 rounded-3xl flex items-center justify-center">
                <Smile className="w-8 h-8 text-violet-500" />
              </div>
              <div>
                <p className="text-lg font-medium text-base-content/70">Start the conversation!</p>
                <p className="text-sm text-base-content/50">Send a message to get things started</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Image preview modal */}
      {imagePreview && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setImagePreview(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={imagePreview}
              alt="Preview"
              className="max-w-full max-h-full rounded-2xl shadow-2xl"
            />
            <button
              onClick={() => setImagePreview(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <MessageInput />
    </div>
  );
};

export default ChatContainer;