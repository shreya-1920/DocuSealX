import { useState, useEffect } from "react";
import axios from "axios";

interface DocumentData {
  _id: string;
  fileName: string;
  filePath: string;
  fileSize: number;
}

function Dashboard() {
  const [docs, setDocs] = useState<DocumentData[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/docs")
      .then((res) => {
        setDocs(res.data);
      })
      .catch((error) => {
        console.log("Error fetching documents:", error);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        Dashboard
      </h1>

      {docs.length === 0 ? (
        <p>No documents found.</p>
      ) : (
        docs.map((doc) => {
          const pdfUrl =
            "http://localhost:5000/" +
            doc.filePath.replace(/\\/g, "/");

          return (
            <div
              key={doc._id}
              className="border p-4 mb-4 rounded"
            >
              <h3 className="font-semibold mb-3">
                {doc.fileName}
              </h3>

              <a
                href={pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                Open PDF in New Tab
              </a>

              <div className="mt-4">
                <iframe
                  src={pdfUrl}
                  width="100%"
                  height={500}
                  title={doc.fileName}
                  className="border"
                />
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Dashboard;