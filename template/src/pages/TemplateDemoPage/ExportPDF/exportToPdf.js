import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const exportHtmlToPdf = async (htmlString, fileName) => {
  const pdf = new jsPDF("p", "mm", "a4");

  const element = document.createElement("div");
  element.innerHTML = htmlString;

  const pages = Math.ceil(
    element.clientHeight / pdf.internal.pageSize.getHeight()
  );

  for (let i = 0; i < pages; i++) {
    const yOffset = i * pdf.internal.pageSize.getHeight();
    const canvas = await html2canvas(element, { y: yOffset });
    pdf.addImage(
      canvas.toDataURL("image/png"),
      "PNG",
      0,
      0,
      pdf.internal.pageSize.getWidth(),
      pdf.internal.pageSize.getHeight()
    );

    if (i < pages - 1) {
      pdf.addPage();
    }
  }

  pdf.save(fileName);
};

