import { useState, useEffect , useRef } from "react";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";

import Navbar from "../Components/Navbar";
import StatsCards from "../Components/StatsCards";


import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

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
status?: string;
reason?: string;
}


function Dashboard() {
  const [docs, setDocs] = useState<DocumentData[]>([]);
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [filter, setFilter] =
useState("all");

const [generatedPdf, setGeneratedPdf] =
useState("");

  const [dragging, setDragging] = useState(false);
  const [selectedSignatureId, setSelectedSignatureId] = useState<string | null>(
    null,
  );

  const [numPagesMap, setNumPagesMap] = useState<{
    [key: string]: number;
  }>({});

  const fileInputRef =
  useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docsRes = await axios.get("http://localhost:5000/api/docs");

        setDocs(docsRes.data);

        const allSignatures: Signature[] = [];

        for (const doc of docsRes.data as DocumentData[]) {
          try {
            const sigRes = await axios.get(
              `http://localhost:5000/api/signatures/${doc._id}`,
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
    { numPages }: { numPages: number },
  ) => {
    setNumPagesMap((prev) => ({
      ...prev,
      [docId]: numPages,
    }));
  };

  const handlePdfClick = async (
    e: React.MouseEvent<HTMLDivElement>,
    fileId: string,
  ) => {
    // Prevent creating new signatures while dragging
    if (dragging) return;

    const rect = e.currentTarget.getBoundingClientRect();

    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;

    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
    const alreadyExists =
  signatures.some(
    (sig) => sig.fileId === fileId
  );

if (alreadyExists) {
  return;
}

    try {
      const response = await axios.post(
        "http://localhost:5000/api/signatures",
        {
          fileId,
          signer: "shreya@gmail.com",
          xPercent,
          yPercent,
          status: "pending",
        },
      );

      setSignatures((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error saving signature:", error);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging || !selectedSignatureId) return;

    const rect = e.currentTarget.getBoundingClientRect();

    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;

    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

    setSignatures((prev) =>
      prev.map((sig) =>
        sig._id === selectedSignatureId
          ? {
              ...sig,
              xPercent,
              yPercent,
            }
          : sig,
      ),
    );
  };

  const handleMouseUp = async () => {
    if (!selectedSignatureId) {
      setDragging(false);
      return;
    }

    const signature = signatures.find((sig) => sig._id === selectedSignatureId);

    if (!signature) {
      setDragging(false);
      setSelectedSignatureId(null);
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/signatures/${selectedSignatureId}`,
        {
          xPercent: signature.xPercent,
          yPercent: signature.yPercent,
        },
      );
    } catch (error) {
      console.error("Error updating signature:", error);
    }

    setDragging(false);
    setSelectedSignatureId(null);
  };
  const updateStatus = async (
id: string,
status: string
) => {
try {
await axios.patch(
`http://localhost:5000/api/signatures/${id}/status`,
{
status,
}
);


setSignatures((prev) =>
  prev.map((sig) =>
    sig._id === id
      ? { ...sig, status }
      : sig
  )
);


} catch (error) {
console.log(error);
}
};


const deleteSignature = async (
  id: string
) => {
  try {
    await axios.delete(
      `http://localhost:5000/api/signatures/${id}`
    );

    setSignatures((prev) =>
      prev.filter(
        (sig) => sig._id !== id
      )
    );
  } catch (error) {
    console.log(error);
  }
};

const handleUpload = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];

  if (!file) return;

  const formData = new FormData();

  formData.append(
    "document",
    file
  );

  try {
    await axios.post(
      "http://localhost:5000/api/docs/upload",
      formData
    );

    alert(
      "Document uploaded successfully"
    );

    window.location.reload();
  } catch (error) {
    console.log(error);

    alert(
      "Upload failed"
    );
  }

};
const generatePdf = async (id: string) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/pdf/generate/${id}`
    );

    if (res.data.file) {
      window.open(
        "http://localhost:5000" + res.data.file,
        "_blank"
      );
    }
  } catch (error) {
    console.error("PDF Generation Error:", error);
    alert("Failed to generate PDF");
  }
};

 return (

  <div>
    <Navbar />

<div className="mt-8 mb-8">
  <h1 className="text-5xl font-bold text-slate-800">
    Digital Signature Dashboard
  </h1>

  <p className="text-slate-500 mt-3 text-lg">
    Upload, Sign and Manage Documents
  </p>
</div>

<StatsCards
  docs={docs.length}
  signatures={signatures.length}
/>
<input
  type="file"
  hidden
  ref={fileInputRef}
  onChange={handleUpload}
/>

<button
  onClick={() =>
    fileInputRef.current?.click()
  }
  className="
  bg-purple-600
  text-white
  px-6
  py-3
  rounded-2xl
  font-bold
  shadow-lg
  hover:bg-purple-700
  transition
  "
>
  + Upload Document
</button>
<div className="my-6">
  <select
    value={filter}
    onChange={(e) =>
      setFilter(e.target.value)
    }
    className="border rounded-xl p-3"
  >
    <option value="all">
      All Signatures
    </option>

    <option value="pending">
      Pending
    </option>

    <option value="signed">
      Signed
    </option>

    <option value="rejected">
      Rejected
    </option>
  </select>
</div>


      {docs.length === 0 ? (
        <p>No documents found.</p>
      ) : (
        docs.map((doc) => {
          const pdfUrl =
            "http://localhost:5000/" + doc.filePath.replace(/\\/g, "/");

          return (
            <div
              key={doc._id}
             
className="
bg-white
border
border-slate-200
rounded-3xl
p-6
mb-10
shadow-lg
"
            >
              <div className="flex justify-between items-center mb-5">
                <div>
                  <h3 className="text-xl font-bold">{doc.fileName}</h3>

                  <p className="text-gray-500">
                    {(doc.fileSize / 1024).toFixed(2)} KB
                  </p>
                </div>

                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                  Uploaded
                </span>
              </div>

              <a
                href={pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                Open PDF in New Tab
              </a>
              <button
  onClick={() => generatePdf(doc._id)}
  className="
  ml-4
  bg-purple-600
  text-white
  px-4
  py-2
  rounded-xl
  text-sm
  "
>
  Generate Signed PDF
</button>
              <div
                className="
mt-4
bg-slate-50
border
rounded-2xl
overflow-auto
max-h-200
relative
p-4
"
                onClick={(e) => handlePdfClick(e, doc._id)}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
              >
                <Document
                  file={pdfUrl}
                  onLoadSuccess={(data) => handleLoadSuccess(doc._id, data)}
                  onLoadError={(error) => {
                    console.error("PDF Error:", error);
                  }}
                  loading={<p>Loading PDF...</p>}
                >
                  {Array.from(
                    new Array(numPagesMap[doc._id] || 0),
                    (_, index) => (
                      <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        width={800}
                      />
                    )
                  )}
                </Document>

                {signatures
  .filter((sig) => sig.fileId === doc._id)
  .filter(
    (sig) =>
      filter === "all" ||
      sig.status === filter
  )
  .map((sig) => (
                    <div
                      key={sig._id || `${sig.xPercent}-${sig.yPercent}`}
                      onMouseDown={(e) => {
                        e.stopPropagation();

                        if (sig._id) {
                          setDragging(true);
                          setSelectedSignatureId(sig._id);
                        }
                      }}
                      style={{
                        position: "absolute",
                        left: `${sig.xPercent}%`,
                        top: `${sig.yPercent}%`,
                        border: "2px dashed #2563eb",
                        background: "#dbeafe",
                        borderRadius: "12px",
                        color: "#1e3a8a",
                        boxShadow: "0 4px 12px rgba(0,0,0,.15)",
                        padding: "6px 10px",
                        zIndex: 1000,
                        fontWeight: "bold",
                        cursor: "move",
                        userSelect: "none",
                      }}
                    >
                      <div>
                        <div className="text-sm">
  ✍ Sign Here
</div>

                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();

                              if (sig._id) {
                                updateStatus(sig._id, "signed");
                              }
                            }}
                            className="
    bg-green-500
    text-white
    px-3
    py-1
    rounded
    text-sm
    "
                          >
                            Sign
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();

                              if (sig._id) {
                                updateStatus(sig._id, "rejected");
                              }
                            }}
                            className="
    bg-red-500
    text-white
    px-3
    py-1
    rounded
    text-sm
    "
                          >
                            Reject
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();

                              if (sig._id) {
                                deleteSignature(sig._id);
                              }
                            }}
                            className="
    bg-slate-600
    text-white
    px-3
    py-1
    rounded
    text-sm
    "
                          >
                            Delete
                          </button>
                        </div>
                        {generatedPdf && (
  <a
    href={generatedPdf}
    target="_blank"
    rel="noreferrer"
    className="
    block
    mt-3
    text-green-600
    font-semibold
    "
  >
    Download Signed PDF
  </a>
)}
                        <div className="text-xs mt-2 font-semibold">
                          {sig.status || "pending"}
                        </div>
                      </div>
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