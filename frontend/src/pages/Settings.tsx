import Sidebar from "../Components/Sidebar";

function Settings() {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold">
          Settings
        </h1>

        <p className="text-slate-500 mt-2 mb-8">
          Manage your account
        </p>

        <div className="bg-white rounded-3xl p-8 shadow-sm max-w-xl">

          <div className="mb-5">
            <label className="block font-medium mb-2">
              Full Name
            </label>

            <input
              value="Shreya Jain"
              readOnly
              className="w-full border p-3 rounded-xl"
            />
          </div>

          <div className="mb-5">
            <label className="block font-medium mb-2">
              Email
            </label>

            <input
              value="shreya@gmail.com"
              readOnly
              className="w-full border p-3 rounded-xl"
            />
          </div>

          <div className="mb-5">
            <label className="block font-medium mb-2">
              Role
            </label>

            <input
              value="Administrator"
              readOnly
              className="w-full border p-3 rounded-xl"
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Settings;