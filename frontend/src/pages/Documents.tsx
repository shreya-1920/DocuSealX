import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Components/Sidebar";
import { FaFilePdf, FaTrash } from "react-icons/fa";

function Documents() {
const [docs, setDocs] = useState([]);

// fetchDocuments needs to be declared before use in the effect
async function fetchDocuments() {
  try {
    const res = await axios.get("http://localhost:5000/api/docs");
    setDocs(res.data);
  } catch (error) {
    console.log(error);
  }
}

useEffect(() => {
  fetchDocuments();
}, []);

const deleteDocument = async (id: string) => {
try {
await axios.delete(
`http://localhost:5000/api/docs/${id}`
);


  fetchDocuments();
} catch (error) {
  console.log(error);
}


};

return ( <div className="flex min-h-screen bg-[#F8FAFC]"> <Sidebar />

```
  <div className="flex-1 p-8">

    <h1 className="text-4xl font-bold text-slate-800">
      Documents
    </h1>

    <p className="text-slate-500 mt-2 mb-8">
      Manage all uploaded PDF documents
    </p>

    <div className="grid gap-6">

      {docs.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 shadow-sm text-center">
          No Documents Found
        </div>
      ) : (
        docs.map((doc: any) => (
          <div
            key={doc._id}
            className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200"
          >
            <div className="flex justify-between items-center">

              <div className="flex items-center gap-4">
                <FaFilePdf
                  size={40}
                  className="text-red-500"
                />

                <div>
                  <h3 className="font-bold text-lg">
                    {doc.fileName}
                  </h3>

                  <p className="text-slate-500">
                    {(doc.fileSize / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>

              <div className="flex gap-3">

                <a
                  href={
                    "http://localhost:5000/" +
                    doc.filePath.replace(/\\/g, "/")
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="bg-purple-600 text-white px-4 py-2 rounded-xl"
                >
                  Open
                </a>

                <button
                  onClick={() =>
                    deleteDocument(doc._id)
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded-xl"
                >
                  <FaTrash />
                </button>

              </div>

            </div>
          </div>
        ))
      )}

    </div>
  </div>
</div>


);
}

export default Documents;
