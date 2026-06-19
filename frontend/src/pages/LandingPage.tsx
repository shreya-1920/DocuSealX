import { Link } from "react-router-dom";
import {
FaFilePdf,
FaSignature,
FaCheckCircle,
} from "react-icons/fa";

function LandingPage() {
return ( <div className="min-h-screen bg-slate-50">


  {/* Navbar */}
  <nav className="flex justify-between items-center px-10 py-6 bg-white shadow-sm">
    <div className="flex items-center gap-3">
      <div className="h-12 w-12 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
        D
      </div>

      <div>
        <h1 className="font-bold text-xl">
          DocuSealX
        </h1>

        <p className="text-xs text-slate-500">
          Digital Signature Platform
        </p>
      </div>
    </div>

    <div className="flex gap-4">
      <Link
        to="/login"
        className="px-5 py-2 rounded-xl border"
      >
        Login
      </Link>

      <Link
        to="/register"
        className="px-5 py-2 rounded-xl bg-purple-600 text-white"
      >
        Register
      </Link>
    </div>
  </nav>

  {/* Hero */}
  <section className="relative overflow-hidden">

    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500/10 to-pink-500/10" />

    <div className="max-w-7xl mx-auto px-10 py-28 text-center relative">

      <div className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-medium mb-8">
        🚀 Secure • Fast • Professional
      </div>

      <h1 className="text-7xl font-bold leading-tight text-slate-900">
        Sign Documents
        <br />
        Digitally & Securely
      </h1>

      <p className="text-xl text-slate-600 mt-8 max-w-3xl mx-auto">
        Upload PDFs, place digital signatures,
        approve or reject requests,
        and generate signed documents instantly.
      </p>

      <div className="mt-10 flex justify-center gap-5">

        <Link
          to="/register"
          className="
          px-8
          py-4
          rounded-2xl
          bg-gradient-to-r
          from-purple-600
          to-pink-500
          text-white
          font-semibold
          shadow-xl
          hover:scale-105
          transition
          "
        >
          Get Started
        </Link>

        <Link
          to="/login"
          className="
          px-8
          py-4
          rounded-2xl
          border
          border-slate-300
          bg-white
          font-semibold
          "
        >
          Login
        </Link>

      </div>
    </div>
  </section>

  {/* Features */}

  <section className="max-w-7xl mx-auto px-10 py-20">

    <h2 className="text-4xl font-bold text-center mb-16">
      Powerful Features
    </h2>

    <div className="grid md:grid-cols-3 gap-8">

      <div className="bg-white p-8 rounded-3xl shadow-lg">
        <FaFilePdf
          size={40}
          className="text-purple-600 mb-4"
        />

        <h3 className="text-2xl font-bold mb-3">
          Upload PDFs
        </h3>

        <p className="text-slate-500">
          Securely upload and manage PDF documents.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-lg">
        <FaSignature
          size={40}
          className="text-pink-500 mb-4"
        />

        <h3 className="text-2xl font-bold mb-3">
          Digital Signatures
        </h3>

        <p className="text-slate-500">
          Place signatures anywhere on your document.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-lg">
        <FaCheckCircle
          size={40}
          className="text-green-500 mb-4"
        />

        <h3 className="text-2xl font-bold mb-3">
          Approval Workflow
        </h3>

        <p className="text-slate-500">
          Approve or reject requests with one click.
        </p>
      </div>

    </div>
  </section>

  {/* Footer */}

  <footer className="bg-slate-900 text-white py-10 text-center">
    <h3 className="text-2xl font-bold">
      DocuSealX
    </h3>

    <p className="text-slate-400 mt-2">
      React • Node.js • MongoDB • JWT
    </p>
  </footer>

</div>


);
}

export default LandingPage;
