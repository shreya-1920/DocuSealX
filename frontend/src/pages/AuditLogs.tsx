import Sidebar from "../Components/Sidebar";

function AuditLogs() {
  const logs = [
    {
      action: "Document Uploaded",
      user: "Shreya Jain",
      time: "Today 10:30 AM",
    },
    {
      action: "Signature Added",
      user: "Shreya Jain",
      time: "Today 10:35 AM",
    },
    {
      action: "Document Signed",
      user: "Shreya Jain",
      time: "Today 10:40 AM",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold">
          Audit Logs
        </h1>

        <p className="text-slate-500 mt-2 mb-8">
          Track document activities
        </p>

        <div className="space-y-4">
          {logs.map((log, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-3xl shadow-sm"
            >
              <h3 className="font-bold">
                {log.action}
              </h3>

              <p className="text-slate-500">
                {log.user}
              </p>

              <p className="text-sm text-slate-400">
                {log.time}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AuditLogs;