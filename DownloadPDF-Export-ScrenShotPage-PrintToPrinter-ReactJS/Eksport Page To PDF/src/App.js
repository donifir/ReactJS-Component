import React from "react";
import ShippingLabel from "./components/ShippingLabel";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function App() {
  const exportPDF = () => {
    const input = document.getElementById("App");
    html2canvas(input, {
      logging: true,
      letterRendering: 1,
      useCORS: true,
    }).then((canvas) => {
      const imgWidth = 208;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("goatrank.pdf");
    });
  };

  return (
    <div>
      <button onClick={() => exportPDF()}>PrintPDF</button>
      <header id="App" className="App-header">
        <ShippingLabel />
      </header>
      App
    </div>
  );
}
