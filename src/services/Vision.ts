const vision = require("@google-cloud/vision");

const client = new vision.ImageAnnotatorClient();

class Vision {
  public async getTextFromImage(image: File) {
    const reader: FileReader = new FileReader();
    reader.onloadend = async () => {
      const arrayBuffer = reader.result !== null ? reader.result : "";
      if (typeof arrayBuffer !== "string") {
        const buffer: Buffer = Buffer.from(new Uint8Array(arrayBuffer));
        const visionResult = await client.documentTextDetection(buffer);
        const fullTextAnnotation = visionResult.fullTextAnnotation;
        console.log(`Full text: ${fullTextAnnotation.text}`);
        fullTextAnnotation.pages.forEach(page => {
          page.blocks.forEach(block => {
            console.log(`Block confidence: ${block.confidence}`);
            block.paragraphs.forEach(paragraph => {
              console.log(`Paragraph confidence: ${paragraph.confidence}`);
              paragraph.words.forEach(word => {
                const wordText = word.symbols.map(s => s.text).join("");
                console.log(`Word text: ${wordText}`);
                console.log(`Word confidence: ${word.confidence}`);
                word.symbols.forEach(symbol => {
                  console.log(`Symbol text: ${symbol.text}`);
                  console.log(`Symbol confidence: ${symbol.confidence}`);
                });
              });
            });
          });
        });
      }
    };
    const blob: Blob = image;
    return reader.readAsArrayBuffer(image);
  }
}

export default new Vision();
