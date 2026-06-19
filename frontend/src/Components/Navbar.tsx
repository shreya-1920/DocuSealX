import {
FaBell,
FaSearch,
} from "react-icons/fa";

function Navbar() {
return ( <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 flex justify-between items-center"> <div> <h2 className="text-2xl font-bold text-slate-800">
Overview </h2>

    <p className="text-slate-500">
      DocuSealX Dashboard
    </p>
  </div>

  <div className="flex items-center gap-4">
    <div className="flex items-center gap-3 bg-slate-100 px-4 py-3 rounded-2xl w-96">
      <FaSearch className="text-slate-400" />

      <input
        placeholder="Search documents..."
        className="bg-transparent outline-none w-full"
      />
    </div>

    <button className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center">
      <FaBell />
    </button>

    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
      SJ
    </div>
  </div>
</div>


);
}

export default Navbar;
