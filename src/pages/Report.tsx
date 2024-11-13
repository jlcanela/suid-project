import { Button } from "@suid/material"; // Importing Button from SUID Material
import { jsPDF } from "jspdf"; // Importing jsPDF
import html2canvas from "html2canvas"; // Importing html2canvas
import { createSignal } from "solid-js"; // Signal for dynamic rendering

// Function to trigger the print dialog
const printPDF = () => {
    window.print(); // Opens the browser's print dialog
  };

const generatePDF = async () => {
    const doc = new jsPDF();
    const reportElement = document.getElementById("report-content");

    // Set up dimensions for A4 size (210mm x 297mm)
    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = doc.internal.pageSize.getHeight();

    // Measure the height of the entire content
    const contentHeight = reportElement.scrollHeight;

    // Calculate how many full pages are needed (content height / PDF page height)
    const totalPages = Math.ceil(contentHeight / pdfHeight);

    let currentPage = 0;

    while (currentPage < totalPages) {
      // Capture current view of the report element as an image
      const canvas = await html2canvas(reportElement, {
        scrollY: -(currentPage * pdfHeight), // Scroll down by one page's worth of height each time
        windowHeight: pdfHeight, // Capture only enough height for one page
        scale: 2, // Increase scale for better quality
      });

      const imgData = canvas.toDataURL("image/png");

      if (currentPage > 0) {
        doc.addPage(); // Add new page for every iteration after the first
      }

      // Add image to PDF with proper scaling to fit within A4 dimensions
      doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      currentPage++;
    }

    // Save the generated PDF to the user's machine
    doc.save("report.pdf");
  };

const Report = () => { 

    const [report] = createSignal(`
        <div>
          <h1>Report Title</h1>
          <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p>
           <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p> <p>This is a report generated from an HTML string.</p>
          <p>It contains <strong>bold text</strong>, <em>italic text</em>, and more.</p>
        </div>
      `);

      return (

          <>
      {/* Button to trigger PDF generation */}
      <Button variant="contained" color="primary" onClick={printPDF}>
        Download PDF Report
      </Button>
      {/* Render the report dynamically */}
      <div id="report-content" innerHTML={report()}></div>

    </>
        )
 };

export default Report;
