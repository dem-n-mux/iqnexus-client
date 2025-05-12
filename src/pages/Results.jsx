import React, { useState } from "react";
import "../styles/Results.css";
import { Download, GraduationCap } from "lucide-react";
import result from "../assets/result.png";

const Results = () => {
  const [selectedLevel, setSelectedLevel] = useState("IMO BASIC LEVEL");

  return (
    <div className="space-y-3 w-full h-screen p-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-blue-100 rounded-full w-9 h-9 flex items-center justify-center">
          <GraduationCap/>
        </div>

        <h1 className="text-2xl font-semibold text-gray-800">Results</h1>
      </div>

      {/* Level Selector */}
      <div>
        <select
          className="w-full bg-blue-50 border border-blue-200 rounded-md px-4 py-2 text-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
        >
          <option value="IMO BASIC LEVEL">IMO BASIC LEVEL</option>
          <option value="IMO ADVANCED LEVEL">IMO ADVANCED LEVEL</option>
        </select>
      </div>

      {/* Result Preview */}
      <div className="flex justify-center">
        <div className="rounded-md p-2">
          <img
            src={result}
            alt="Certificate"
            className="h-full max-w-md border border-black object-contain"
          />
        </div>
      </div>

       {/* Download Buttons */}
       <div className="flex flex-col md:flex-row justify-center items-center mt-4">
        <button className="bg-blue-600 w-fit text-center text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-blue-700 transition-all">
          <Download size={16} />
          Download PDF
        </button>
        <button className="text-blue-600 px-4 py-2 hover:underline">or</button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-blue-700 transition-all">
          <Download size={16} />
          Download Image
        </button>
      </div>
    </div>
  );
};

export default Results;
