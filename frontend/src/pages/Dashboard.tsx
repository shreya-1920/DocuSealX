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

interface Signature {
  _id?: string;
  fileId: string;
  x: number;
  y: number;
}

function Dashboard() {
  const [docs, setDocs] = useState<DocumentData[]>([]);
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [numPagesMap, setNumPagesMap] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docsRes = await axios.get(
          "http://localhost:5000/api/docs"
        );

        setDocs(docsRes.data);

        const allSignatures: Signature[] = [];

        for (const doc of docsRes.data as DocumentData[]) {
          try {
            const sigRes = await axios.get(
              `http://localhost:5000/api/signatures/${doc._id}`
            );

            allSignatures.push(...sigRes.data);
          } catch (err) {
            console.error(err);
          }
        }

        setSignatures(allSignatures);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
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

  const handlePdfClick = async (
    e: React.MouseEvent<HTMLDivElement>,
    fileId: string
  ) => {
    const rect =
      e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/signatures",
        {
          fileId,
          signer: "shivam@gmail.com",
          x,
          y,
          status: "pending",
        }
      );

      setSignatures((prev) => [
        ...prev,
        response.data,
      ]);
    } catch (error) {
      console.error(
        "Error saving signature:",
        error
      );
    }
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

              <div
                className="mt-4 border p-2 overflow-auto relative"
                onClick={(e) =>
                  handlePdfClick(
                    e,
                    doc._id
                  )
                }
              >
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
                    <p>Loading PDF...</p>
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

                {signatures
                  .filter(
                    (sig) =>
                      sig.fileId ===
                      doc._id
                  )
                  .map((sig) => (
                    <div
                      key={
                        sig._id ||
                        `${sig.x}-${sig.y}`
                      }
                      style={{
                        position:
                          "absolute",
                        left: sig.x,
                        top: sig.y,
                        border:
                          "2px dashed blue",
                        background:
                          "white",
                        padding:
                          "8px 12px",
                        zIndex: 1000,
                        fontWeight:
                          "bold",
                      }}
                    >
                      Sign Here
                    </div>
                  ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Dashboard;