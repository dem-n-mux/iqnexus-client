import React, { useEffect, useState } from "react";
import { Download, FileText } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_API_URL } from "../Api";

const AdmitCard = () => {
  const student = useSelector((state) => state.auth.user);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [admitCardImage, setAdmitCardImage] = useState(null);
  const [admitCardBlob, setAdmitCardBlob] = useState(null);

  const fetchAdmitCard = async () => {
    try {
      const levelMap = { "L1": "basic", "L2": "advanced" };
      const level = levelMap[selectedLevel] || "basic";
      const session = "2024-25";

      const response = await axios.post(
        `${BASE_API_URL}/fetch-admit-card`,
        { mobNo: student["Mob No"], level, session },
        { responseType: "blob" }
      );

      if (response.status === 200 && response.data) {
        const blob = response.data;
        const imageUrl = URL.createObjectURL(blob);
        setAdmitCardImage(imageUrl);
        setAdmitCardBlob(blob);
      } else {
        console.error("Failed to fetch admit card.");
      }
    } catch (error) {
      console.error("Error fetching admit card:", error);
    }
  };

  useEffect(() => {
    if (selectedLevel) {
      fetchAdmitCard();
    }
  }, [selectedLevel, student]);

  const downloadFile = (blob, fileName, type) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPDF = () => {
    if (admitCardBlob) {
      downloadFile(admitCardBlob, "admit-card.pdf", "application/pdf");
    }
  };

  const handleDownloadImage = () => {
    if (admitCardBlob) {
      downloadFile(admitCardBlob, "admit-card.png", "image/png");
    }
  };

  return (
    <div className="space-y-3 w-full h-full flex flex-col p-4">
      {/* HEADER */}
      <div className="flex items-center gap-3">
        <div className="bg-blue-100 rounded-full w-9 h-9 flex items-center justify-center">
          <FileText />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">Admit Card</h2>
      </div>

      {/* Level Selection */}
      <div className="flex flex-col w-full gap-2 justify-center">
        <select
          className="w-full bg-blue-50 border border-blue-200 rounded-md px-4 py-2 text-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
        >
          <option value="">Select Level</option>
          <option value="L1">Level 1</option>
          <option value="L2">Level 2</option>
        </select>
      </div>

      {/* Admit Card Container */}
      <div className="flex items-center justify-center">
        <div className="relative w-full max-w-3xl animate-slideUp transition-all hover:shadow-2xl">
          {admitCardImage ? (
            <img src={admitCardImage} alt="Admit Card" className="w-full" />
          ) : (
            <div className="flex items-center justify-center h-64">
              {selectedLevel ? "Loading Admit Card..." : "Please select Level"}
            </div>
          )}
        </div>
      </div>

      {/* Download Buttons */}
      {admitCardImage && (
        <div className="flex flex-col md:flex-row justify-center items-center mt-4 gap-3">
          <button
            onClick={handleDownloadPDF}
            className="bg-blue-600 w-fit text-center text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-blue-700 transition-all"
          >
            <Download size={16} />
            Download PDF
          </button>
          <button
            onClick={handleDownloadImage}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-blue-700 transition-all"
          >
            <Download size={16} />
            Download Image
          </button>
        </div>
      )}
    </div>
  );
};

export default AdmitCard;