import React, { useEffect, useState } from "react";
import { Download, FileText } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_API_URL } from "../Api";
import jsPDF from "jspdf";

const Results = () => {
  const student = useSelector((state) => state.auth.user);
  const [result, setResult] = useState(null);
  const [resultBlob, setResultBlob] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [error, setError] = useState(false);

  const fetchResult = async () => {
    try {
      const session = "2024-25";
      const rollNo = student?.["Roll No"] || student?.rollNo || "";
      const studentClass = student?.Class || student?.class || "";

      // Fetch result data (JSON)
      const res = await axios.get(
        `${BASE_API_URL}/getresult?rollNo=${rollNo}&class=${studentClass}`
      );
      console.log("Result Data:", res.data);
      setResult(res.data);

      
      
      
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    if (student) fetchResult();
    // eslint-disable-next-line
  }, [student]);

  const downloadFile = (blob, fileName) => {
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
    if (resultBlob) {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      const img = new Image();
      img.src = URL.createObjectURL(resultBlob);
      img.onload = () => {
        const imgWidth = img.width;
        const imgHeight = img.height;
        const pageWidth = 210;
        const pageHeight = 297;
        const margin = 10;
        const maxWidth = pageWidth - 2 * margin;
        const maxHeight = pageHeight - 2 * margin;
        let pdfWidth = imgWidth;
        let pdfHeight = imgHeight;
        const aspectRatio = imgWidth / imgHeight;
        if (pdfWidth > maxWidth) {
          pdfWidth = maxWidth;
          pdfHeight = pdfWidth / aspectRatio;
        }
        if (pdfHeight > maxHeight) {
          pdfHeight = maxHeight;
          pdfWidth = pdfHeight * aspectRatio;
        }
        const x = (pageWidth - pdfWidth) / 2;
        const y = (pageHeight - pdfHeight) / 2;
        pdf.addImage(img, "PNG", x, y, pdfWidth, pdfHeight);
        pdf.save("result-card.pdf");
      };
    }
  };

  const handleDownloadImage = () => {
    if (resultBlob) {
      downloadFile(resultBlob, "result-card.png");
    }
  };

  // Render
  return (
    <div className="space-y-3 w-full h-full flex flex-col p-4">
      {/* HEADER */}
      <div className="flex items-center gap-3">
        <div className="bg-blue-100 rounded-full w-9 h-9 flex items-center justify-center">
          <FileText />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">Result Card</h2>
      </div>

      {/* Result Card Container */}
      <div className="flex items-center justify-center">
        <div className="relative w-full max-w-3xl animate-slideUp transition-all">
          {resultImage ? (
            <img src={resultImage} alt="Result Card" className="w-full" />
          ) : (
            <div className="flex items-center justify-center h-64">
              {error ? (
                <div className="p-4 bg-red-100 text-red-800 rounded-lg shadow-md">
                  <p className="font-semibold">
                    Result Not Found. Please contact support for assistance.
                  </p>
                </div>
              ) : (
                "Loading Result..."
              )}
            </div>
          )}
        </div>
      </div>

      {/* Download Buttons */}
      {resultImage && (
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

      {/* Result Table */}
     {result && Object.entries(result).map(([key, value]) => (
      <div className="mt-8 w-full max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
      <div className="font-bold mb-2">Student Name: <span className="font-normal">{result.studentName}</span>
          <table className="w-full mb-4 text-sm">
            <tbody>
              <tr><td className="font-semibold">Roll No:</td><td>{result.rollNo}</td></tr>
              <tr><td className="font-semibold">Class:</td><td>{result.class}</td></tr>
              <tr><td className="font-semibold">Section:</td><td>{result.section}</td></tr>
              <tr><td className="font-semibold">School:</td><td>{result.school}</td></tr>
              <tr><td className="font-semibold">Mark Scored:</td><td>{result.marksObtained}</td></tr>
              <tr><td className="font-semibold">Percentage:</td><td>{result.percentage}</td></tr>
              <tr><td className="font-semibold">Percentile Score:</td><td>{result.percentileScore}</td></tr>
              <tr><td className="font-semibold">School Rank:</td><td>{result.schoolRank}</td></tr>
              <tr><td className="font-semibold">Zonal Rank:</td><td>{result.zonalRank}</td></tr>
              <tr><td className="font-semibold">National Rank:</td><td>{result.nationalRank}</td></tr>
              <tr><td className="font-semibold">International Rank:</td><td>{result.internationRank}</td></tr>
              <tr><td className="font-semibold">Qualified For 2nd Level:</td><td>{result.qualifiedFor2ndLevel}</td></tr>
            </tbody>
          </table>
          </div>
          </div>))}
      {result && (
        
          
          
          {/* <div className="font-bold mb-2">Student Performance Report (SPR)</div>
          <table className="w-full border border-gray-300 text-xs">
            <thead>
              <tr>
                <th className="border px-2 py-1">Topic</th>
                <th className="border px-2 py-1">Good</th>
                <th className="border px-2 py-1">AI Chart</th>
              </tr>
            </thead>
            <tbody>
              {(result.spr || []).map((row, idx) => (
                <tr key={idx}>
                  <td className="border px-2 py-1">{row.topic}</td>
                  <td className="border px-2 py-1">{row.good}</td>
                  <td className="border px-2 py-1">{row.aiChart}</td>
                </tr>
              ))}
            </tbody>
          </table> */}
        
      )}
    </div>
  ); 
};

export default Results;
