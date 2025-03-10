// "use client";
// import { useContext } from "react";
// import Link from "next/link";
// import { AuthContext } from "../context/AuthContext";
// import {
//   FiHome,
//   FiCloud,
//   FiBell,
//   FiSettings,
//   FiUser,
//   FiX,
// } from "react-icons/fi";

// export default function Sidebar({ isOpen, toggleSidebar }) {
//   const { isAuthenticated } = useContext(AuthContext);

//   return (
//     <div
//       className={`bg-gray-900 h-screen fixed top-0 left-0 transition-all duration-300 ${
//         isOpen ? "w-64" : "w-0 overflow-hidden"
//       }`}
//     >
//       {/* Sidebar Header */}
//       <div className="flex justify-between items-center p-4 text-white">
//         <h2 className="text-lg font-bold">Menu</h2>
//         <button onClick={toggleSidebar} className="text-white p-2">
//           <FiX size={20} />
//         </button>
//       </div>

//       {/* Sidebar Links */}
//       <ul
//         className={`${
//           isOpen ? "opacity-100" : "opacity-0"
//         } transition-opacity duration-300`}
//       >
//         {/* Show Profile, Settings, and Notifications if Authenticated */}
//         {isAuthenticated && (
//           <>
//             <li className="mb-3 px-4 py-2 hover:bg-gray-700">
//               <Link href="/" className="flex items-center space-x-2 text-white">
//                 <FiHome /> <span>Dashboard</span>
//               </Link>
//             </li>
//             <li className="mb-3 px-4 py-2 hover:bg-gray-700">
//               <Link
//                 href="/reports"
//                 className="flex items-center space-x-2 text-white"
//               >
//                 <FiCloud /> <span> Reports</span>
//               </Link>
//             </li>
//             <li className="mb-3 px-4 py-2 hover:bg-gray-700">
//               <Link
//                 href="/notifications"
//                 className="flex items-center space-x-2 text-white"
//               >
//                 <FiBell /> <span>Notifications</span>
//               </Link>
//             </li>
//             <li className="mb-3 px-4 py-2 hover:bg-gray-700">
//               <Link
//                 href="/settings"
//                 className="flex items-center space-x-2 text-white"
//               >
//                 <FiSettings /> <span>Settings</span>
//               </Link>
//             </li>
//             <li className="mb-3 px-4 py-2 hover:bg-gray-700">
//               <Link
//                 href="/profile"
//                 className="flex items-center space-x-2 text-white"
//               >
//                 <FiUser /> <span>Profile</span>
//               </Link>
//             </li>
//           </>
//         )}
//       </ul>
//     </div>
//   );
// }
