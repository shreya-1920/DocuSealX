import { useState, useEffect } from "react";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// PDF Worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface DocumentData {
  _id: string;
  fileName: string;
  filePath: string;
  fileSize: number;
}

function Dashboard() {
  const [docs, setDocs] = useState<DocumentData[]>([]);
  const [numPagesMap, setNumPagesMap] = useState<{
    [key: string]: number;
  }>({});

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

  const handleLoadSuccess = (
    docId: string,
    { numPages }: { numPages: number }
  ) => {
    setNumPagesMap((prev) => ({
      ...prev,
      [docId]: numPages,
    }));
  };

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
              className="border p-4 mb-6 rounded"
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

              <div className="mt-4 border p-2 overflow-auto">
                <Document
                  file={pdfUrl}
                  onLoadSuccess={(data) =>
                    handleLoadSuccess(
                      doc._id,
                      data
                    )
                  }
                  onLoadError={(error) => {
                    console.error(
                      "PDF Error:",
                      error
                    );
                  }}
                  loading={
                    <p>
                      Loading PDF...
                    </p>
                  }
                >
                  {Array.from(
                    new Array(
                      numPagesMap[doc._id] || 0
                    ),
                    (_, index) => (
                      <Page
                        key={`page_${
                          index + 1
                        }`}
                        pageNumber={
                          index + 1
                        }
                        width={800}
                      />
                    )
                  )}
                </Document>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Dashboard;