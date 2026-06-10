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
  xPercent: number;
  yPercent: number;
}

function Dashboard() {
  const [docs, setDocs] = useState<DocumentData[]>([]);
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [dragging, setDragging] = useState(false);
  const [selectedSignatureId, setSelectedSignatureId] =
    useState<string | null>(null);

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
    // Prevent creating new signatures while dragging
    if (dragging) return;

    const rect =
      e.currentTarget.getBoundingClientRect();

    const xPercent =
  ((e.clientX - rect.left) /
    rect.width) *
  100;

const yPercent =
  ((e.clientY - rect.top) /
    rect.height) *
  100;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/signatures",
        {
  fileId,
  signer: "shreya@gmail.com",
  xPercent,
  yPercent,
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

  const handleMouseMove = (
  e: React.MouseEvent<HTMLDivElement>
) => {
  if (!dragging || !selectedSignatureId)
    return;

  const rect =
    e.currentTarget.getBoundingClientRect();

  const xPercent =
    ((e.clientX - rect.left) /
      rect.width) *
    100;

  const yPercent =
    ((e.clientY - rect.top) /
      rect.height) *
    100;

  setSignatures((prev) =>
    prev.map((sig) =>
      sig._id === selectedSignatureId
        ? {
            ...sig,
            xPercent,
            yPercent,
          }
        : sig
    )
  );
};
   

  const handleMouseUp = async () => {
    if (!selectedSignatureId) {
      setDragging(false);
      return;
    }

    const signature = signatures.find(
      (sig) =>
        sig._id === selectedSignatureId
    );

    if (!signature) {
      setDragging(false);
      setSelectedSignatureId(null);
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/signatures/${selectedSignatureId}`,
        {
  xPercent:
    signature.xPercent,
  yPercent:
    signature.yPercent,
}
      );
    } catch (error) {
      console.error(
        "Error updating signature:",
        error
      );
    }

    setDragging(false);
    setSelectedSignatureId(null);
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
                onMouseMove={
                  handleMouseMove
                }
                onMouseUp={handleMouseUp}
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
  `${sig.xPercent}-${sig.yPercent}`
}
                      onMouseDown={(e) => {
                        e.stopPropagation();

                        if (sig._id) {
                          setDragging(
                            true
                          );
                          setSelectedSignatureId(
                            sig._id
                          );
                        }
                      }}
                      style={{
                        position:
                          "absolute",
                     left: `${sig.xPercent}%`,
top: `${sig.yPercent}%`,
                        border:
                          "2px dashed blue",
                        background:
                          "white",
                        padding:
                          "8px 12px",
                        zIndex: 1000,
                        fontWeight:
                          "bold",
                        cursor: "move",
                        userSelect:
                          "none",
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