import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import englishCertificate from "./../assets/certificates/english.pdf";
import arabicCertificate from "./../assets/certificates/arabic.pdf";
import BigShotOne from "./../assets/fonts/BigShotOne.ttf";
import Cairo from "./../assets/fonts/Cairo.ttf";
import fontkit from "@pdf-lib/fontkit";

export default {
  FindComponent(CNumber, course) {
    //Takes a component number and searches for it returns it
    let returnvalue;
    course.CourseSections.forEach(section => {
      if (CNumber >= section.start && CNumber <= section.end) {
        returnvalue = section.CourseSectionComponents[CNumber - section.start];
      }
    });
    return returnvalue;
  },

  async downloadPDF(
    language,
    userName,
    courseTitle,
    instructorFirst,
    instructorLast
  ) {
    // Helper Functions
    const downloadURL = (data, fileName) => {
      const a = document.createElement("a");
      a.href = data;
      a.download = fileName;
      document.body.appendChild(a);
      a.style.display = "none";
      a.click();
      a.remove();
    };

    const downloadBlob = (data, fileName, mimeType) => {
      const blob = new Blob([data], {
        type: mimeType
      });
      const url = window.URL.createObjectURL(blob);
      downloadURL(url, fileName);
      setTimeout(() => window.URL.revokeObjectURL(url), 1000);
    };

    const truncate = str => {
      const n = 50;
      return str.length > n ? str.slice(0, n - 1) + "..." : str;
    };

    const isArabic = text => {
      let pattern = /[\u0600-\u06FF\u0750-\u077F]/;
      return pattern.test(text);
    };

    const getTodayDate = () => {
      // Get todays date in format dd/mm/yyyy
      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth() + 1; //January is 0!
      let yyyy = today.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      return dd + "/" + mm + "/" + yyyy;
    };

    // // Load a PDFDocument from the existing PDF bytes
    let pdfDocBytes;
    if (language === "English") {
      pdfDocBytes = await fetch(englishCertificate).then(res =>
        res.arrayBuffer()
      );
    } else {
      pdfDocBytes = new Uint8Array(arabicCertificate);
      pdfDocBytes = await fetch(arabicCertificate).then(res =>
        res.arrayBuffer()
      );
    }
    let pdfDoc = await PDFDocument.load(pdfDocBytes);
    pdfDoc.registerFontkit(fontkit);

    // Load fonts from google fonts
    const CairoFontBytes = await fetch(Cairo).then(res => res.arrayBuffer());
    const BigShotOneFontBytes = await fetch(BigShotOne).then(res =>
      res.arrayBuffer()
    );

    // Embed the Fonts
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const CairoFont = await pdfDoc.embedFont(CairoFontBytes);
    const BigShotOneFont = await pdfDoc.embedFont(BigShotOneFontBytes);

    // Get the first page of the document
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Get the width and height of the first page
    const { width, height } = firstPage.getSize();

    if (language === "Arabic") {
      // Add Username
      let text = userName;
      let textSize = 32;
      let textWidth = isArabic(userName)
        ? CairoFont.widthOfTextAtSize(text, textSize)
        : BigShotOneFont.widthOfTextAtSize(text, textSize);
      firstPage.drawText(text, {
        x: width / 2 - textWidth / 2,
        y: height / 2 + 75,
        size: textSize,
        font: isArabic(userName) ? CairoFont : BigShotOneFont,
        color: rgb(0, 0, 0)
      });

      // Add Date
      text = getTodayDate();
      textSize = 14;
      textWidth = helveticaFont.widthOfTextAtSize(text, textSize);
      firstPage.drawText(text, {
        x: width / 2 + 122 - textWidth / 2,
        y: 41,
        size: textSize,
        font: helveticaFont,
        color: rgb(0, 0, 0)
      });

      // Add Serial Number
      text = "----------";
      textSize = 14;
      textWidth = helveticaFont.widthOfTextAtSize(text, textSize);
      firstPage.drawText(text, {
        x: width / 2 - 125 - textWidth / 2,
        y: 41,
        size: textSize,
        font: helveticaFont,
        color: rgb(0, 0, 0)
      });

      // Add Training Hours
      text = "-";
      textSize = 20;
      textWidth = helveticaFont.widthOfTextAtSize(text, textSize);
      firstPage.drawText(text, {
        x: width / 2 + 75 - textWidth / 2,
        y: height / 2 - 132,
        size: textSize,
        font: helveticaFont,
        color: rgb(0, 0, 0)
      });

      // Add Course Title
      text = truncate(courseTitle);
      textSize = 24;
      textWidth = isArabic(courseTitle)
        ? CairoFont.widthOfTextAtSize(text, textSize)
        : BigShotOneFont.widthOfTextAtSize(text, textSize);
      firstPage.drawText(text, {
        x: width / 2 - textWidth / 2,
        y: height / 2 - 63,
        size: textSize,
        font: isArabic(courseTitle) ? CairoFont : BigShotOneFont,
        color: rgb(0, 0, 0)
      });

      // Add Instructor Name
      text = instructorFirst;
      textSize = 24;
      textWidth = isArabic(instructorFirst)
        ? CairoFont.widthOfTextAtSize(text, textSize)
        : BigShotOneFont.widthOfTextAtSize(text, textSize);
      firstPage.drawText(text, {
        x: 135 - textWidth / 2,
        y: 157,
        size: textSize,
        font: isArabic(instructorFirst) ? CairoFont : BigShotOneFont,
        color: rgb(0, 0, 0)
      });
      text = instructorLast;
      textSize = 24;
      textWidth = isArabic(instructorLast)
        ? CairoFont.widthOfTextAtSize(text, textSize)
        : BigShotOneFont.widthOfTextAtSize(text, textSize);
      firstPage.drawText(text, {
        x: 135 - textWidth / 2,
        y: 132,
        size: textSize,
        font: isArabic(instructorLast) ? CairoFont : BigShotOneFont,
        color: rgb(0, 0, 0)
      });
    } else {
      // Add Username
      let text = userName;
      let textSize = 32;
      let textWidth = isArabic(userName)
        ? CairoFont.widthOfTextAtSize(text, textSize)
        : BigShotOneFont.widthOfTextAtSize(text, textSize);
      firstPage.drawText(text, {
        x: width / 2 - textWidth / 2,
        y: height / 2 + 50,
        size: textSize,
        font: isArabic(instructorLast) ? CairoFont : BigShotOneFont,
        color: rgb(0, 0, 0)
      });

      // Add Date
      text = getTodayDate();
      textSize = 14;
      textWidth = helveticaFont.widthOfTextAtSize(text, textSize);
      firstPage.drawText(text, {
        x: width / 2 - 135 - textWidth / 2,
        y: 35,
        size: textSize,
        font: helveticaFont,
        color: rgb(0, 0, 0)
      });

      // Add Serial Number
      text = "----------";
      textSize = 14;
      textWidth = helveticaFont.widthOfTextAtSize(text, textSize);
      firstPage.drawText(text, {
        x: width / 2 + 170 - textWidth / 2,
        y: 35,
        size: textSize,
        font: helveticaFont,
        color: rgb(0, 0, 0)
      });

      // Add Training Hours
      text = "-";
      textSize = 20;
      textWidth = helveticaFont.widthOfTextAtSize(text, textSize);
      firstPage.drawText(text, {
        x: width / 2 - 48 - textWidth / 2,
        y: height / 2 - 135,
        size: textSize,
        font: helveticaFont,
        color: rgb(0, 0, 0)
      });

      // Add Course Title
      text = truncate(courseTitle);
      textSize = 24;
      textWidth = isArabic(courseTitle)
        ? CairoFont.widthOfTextAtSize(text, textSize)
        : BigShotOneFont.widthOfTextAtSize(text, textSize);
      firstPage.drawText(text, {
        x: width / 2 - textWidth / 2,
        y: height / 2 - 71,
        size: textSize,
        font: isArabic(courseTitle) ? CairoFont : BigShotOneFont,
        color: rgb(0, 0, 0)
      });

      // Add Instructor Name
      text = instructorFirst;
      textSize = 24;
      textWidth = isArabic(instructorFirst)
        ? CairoFont.widthOfTextAtSize(text, textSize)
        : BigShotOneFont.widthOfTextAtSize(text, textSize);
      firstPage.drawText(text, {
        x: 135 - textWidth / 2,
        y: 145,
        size: textSize,
        font: isArabic(instructorFirst) ? CairoFont : BigShotOneFont,
        color: rgb(0, 0, 0)
      });
      text = instructorLast;
      textSize = 24;
      textWidth = isArabic(instructorLast)
        ? CairoFont.widthOfTextAtSize(text, textSize)
        : BigShotOneFont.widthOfTextAtSize(text, textSize);
      firstPage.drawText(text, {
        x: 135 - textWidth / 2,
        y: 120,
        size: textSize,
        font: isArabic(instructorLast) ? CairoFont : BigShotOneFont,
        color: rgb(0, 0, 0)
      });
    }

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const uint8PDF = await pdfDoc.save();

    // Download the file
    downloadBlob(uint8PDF, "certificate.pdf", "application/pdf");
  }
};
