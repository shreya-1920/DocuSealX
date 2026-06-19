import {
FaHome,
FaFilePdf,
FaClipboardList,
FaCog,
FaSignOutAlt,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function Sidebar() {
const navigate = useNavigate();

const handleLogout = () => {
localStorage.removeItem("token");


navigate("/login");


};

return ( 
<div
   className="
   w-72
   h-screen
   sticky
   top-0
   bg-white
   border-r
   border-slate-200
   p-6
   flex
   flex-col
   "
 > 
  <div className="h-12 w-12 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
    D
  </div>

  <div>
    <h1 className="font-bold text-xl text-slate-800">
      DocuSealX
    </h1>

    <p className="text-sm text-slate-500">
      Digital Signature Platform
    </p>
  </div>

  <p className="text-xs text-slate-400 mb-4 font-semibold">
    PLATFORM
  </p>

  <nav className="flex flex-col gap-2">
    <button
      onClick={() => navigate("/dashboard")}
      className="flex items-center gap-3 w-full p-4 rounded-2xl bg-purple-50 text-purple-600 font-medium"
    >
      <FaHome />
      Dashboard
    </button>

    <button
      onClick={() => navigate("/documents")}
      className="flex items-center gap-3 w-full p-4 rounded-2xl text-slate-600 hover:bg-slate-100"
    >
      <FaFilePdf />
      Documents
    </button>

   <button
  onClick={() => navigate("/audit")}
  className="flex items-center gap-3 w-full p-4 rounded-2xl text-slate-600 hover:bg-slate-100"
>
  <FaClipboardList />
  Audit Logs
</button>

    <button
  onClick={() => navigate("/settings")}
  className="flex items-center gap-3 w-full p-4 rounded-2xl text-slate-600 hover:bg-slate-100"
>
  <FaCog />
  Settings
</button>
  </nav>

  <div className="mt-auto">
    <div className="mb-4 p-4 rounded-2xl bg-slate-50">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
          SJ
        </div>

        <div>
          <h3 className="font-semibold text-slate-800">
            Shreya Jain
          </h3>

          <p className="text-xs text-slate-500">
            Administrator
          </p>
        </div>
      </div>
    </div>

    <button
      onClick={handleLogout}
      className="
      flex
      items-center
      gap-3
      w-full
      p-4
      rounded-2xl
      bg-red-50
      text-red-500
      hover:bg-red-100
      "
    >
      <FaSignOutAlt />
      Logout
    </button>
  </div>
</div>


);
}

export default Sidebar;
