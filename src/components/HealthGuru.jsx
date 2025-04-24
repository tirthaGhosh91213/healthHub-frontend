// import React, { useState, useEffect, useRef } from "react";
// import SockJS from "sockjs-client";
// import { over } from "stompjs";

// const ChatApp = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const chatBoxRef = useRef(null);

//   let stompClient = useRef(null);

//   // Initialize WebSocket connection
//   useEffect(() => {
//     const socket = new SockJS("http://localhost:7000/ws-chat");
//     stompClient.current = over(socket);

//     stompClient.current.connect({}, () => {
//       console.log("Connected to WebSocket");
//       stompClient.current.subscribe("/topic/public", (messageOutput) => {
//         const message = JSON.parse(messageOutput.body);
//         setMessages((prev) => [...prev, message]);
//       });
//     });

//     return () => stompClient.current?.disconnect();
//   }, []);

//   // Scroll chat box to the bottom on new messages
//   useEffect(() => {
//     chatBoxRef.current?.scrollTo(0, chatBoxRef.current.scrollHeight);
//   }, [messages]);

//   const sendMessage = () => {
//     if (!input.trim()) return;

//     const userMessage = { sender: "User", content: input, type: "CHAT" };
//     setMessages((prev) => [...prev, userMessage]);
//     stompClient.current.send("/app/chat.sendMessage", {}, JSON.stringify(userMessage));
//     setInput("");
//   };

//   const toggleDarkMode = () => {
//     setIsDarkMode((prev) => !prev);
//     document.body.classList.toggle("dark-mode", !isDarkMode);
//   };

//   return (
//     <div className={`chat-container ${isDarkMode ? "dark" : ""} mx-auto max-w-3xl h-screen flex flex-col`}>
//       {/* Header */}
//       <header className="bg-blue-600 text-white text-center py-4">
//         <h1 className="text-2xl font-bold">HealthGuru</h1>
//         <p className="text-sm">The Smart Path to Wellness</p>
//         <div className="mt-2">
//           <label className="flex items-center justify-end gap-2 cursor-pointer">
//             <span>🌙</span>
//             <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} className="hidden" />
//             <div className="w-12 h-6 bg-gray-300 rounded-full relative">
//               <div className={`absolute w-5 h-5 bg-white rounded-full transition-all ${isDarkMode ? "translate-x-6" : "translate-x-1"}`} />
//             </div>
//             <span>☀️</span>
//           </label>
//         </div>
//       </header>

//       {/* Chat Box */}
//       <div ref={chatBoxRef} className="chat-box flex-1 overflow-y-auto p-4 bg-gray-100 dark:bg-gray-800">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`message max-w-xs md:max-w-md mb-3 px-4 py-2 rounded-lg shadow ${msg.sender === "AI" ? "bg-white dark:bg-gray-700 border border-blue-500 text-gray-800 dark:text-gray-200 self-start" : "bg-blue-500 text-white self-end"
//               }`}
//           >
//             {msg.sender === "AI" ? (
//               typeof msg.content === "object" && msg.content?.title ? (
//                 <>
//                   <h3 className="font-bold">{msg.content.title}</h3>
//                   <ol className="pl-4 list-decimal">
//                     {msg.content.steps?.map((step, i) => (
//                       <li key={i}>
//                         <strong>Step {step.step}:</strong> {step.instruction}
//                         <br />
//                         <em>{step.note}</em>
//                       </li>
//                     ))}
//                   </ol>
//                   {msg.content.note && <p className="text-sm mt-2">⚠️ {msg.content.note}</p>}
//                 </>
//               ) : (
//                 msg.content
//               )
//             ) : (
//               `User: ${msg.content}`
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Input Area */}
//       <div className="input-area flex items-center bg-gray-200 dark:bg-gray-900 p-4">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           placeholder="Type your message here..."
//           className="flex-1 p-3 rounded-lg border dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           onClick={sendMessage}
//           className="ml-4 px-6 py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
//         >
//           Send
//         </button>
//       </div>

//       {/* Footer */}
//       <footer className="bg-blue-600 text-white text-center py-2 text-sm">
//         HealthGuru can make mistakes. Please verify important information.
//       </footer>
//     </div>
//   );
// };

// export default ChatApp;
