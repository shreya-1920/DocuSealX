import {
FaFilePdf,
FaSignature,
FaCheckCircle,
} from "react-icons/fa";

interface Props {
docs: number;
signatures: number;
}

function StatsCards({
docs,
signatures,
}: Props) {
return ( <div className="grid md:grid-cols-3 gap-6 mt-8"> <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200"> <div className="flex justify-between"> <div> <h3 className="text-slate-500">
Total Documents </h3>


        <p className="text-5xl font-bold text-slate-800 mt-3">
          {docs}
        </p>
      </div>

      <FaFilePdf
        size={32}
        className="text-cyan-400"
      />
    </div>
  </div>

  <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
    <div className="flex justify-between">
      <div>
        <h3 className="text-slate-500">
          Signatures
        </h3>

        <p className="text-5xl font-bold text-slate-800 mt-3">
          {signatures}
        </p>
      </div>

      <FaSignature
        size={32}
        className="text-purple-500"
      />
    </div>
  </div>

  <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
    <div className="flex justify-between">
      <div>
        <h3 className="text-slate-500">
          Status
        </h3>

        <p className="text-3xl font-bold text-green-500 mt-3">
          Active
        </p>
      </div>

      <FaCheckCircle
        size={32}
        className="text-green-500"
      />
    </div>
  </div>
</div>

);
}

export default StatsCards;
