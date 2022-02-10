import { Paragraph, Document, Packer, HeadingLevel, ImageRun, AlignmentType } from "docx";
import { saveAs } from "file-saver";

export default function App() {
  const generate =   async() => {
    const blob = await fetch(
      "https://raw.githubusercontent.com/dolanmiu/docx/master/demo/images/cat.jpg"
    ).then(r => r.blob());

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              text: "文書",
              heading: HeadingLevel.TITLE,
              alignment:AlignmentType.CENTER,
            }),
            new Paragraph({
              text: "東京調査研究所",
              alignment:AlignmentType.RIGHT,
            }),
            new Paragraph({
              text: "東京都中央区日本橋堀留町1-3-16-821",
              alignment:AlignmentType.RIGHT,
            }),
            new Paragraph({
              text: "調査日      2022年1月2日",
            }),
            new Paragraph({
              text: "対象者指名      熊谷将太朗",
            }),
            new Paragraph({
              text: "自宅住所      東京都中央区日本橋堀留町1-3-16-821",
            }),
            new Paragraph({
              text: "勤務先住所      不明",
            }),
            new Paragraph({
              spacing:{
                before:700
              },
              text: "文書をダウンロードしました。",
              children:[
                new ImageRun({
                  data: blob,
                  transformation: {
                    width: 100,
                    height: 100
                  }
                })
              ]
            }),
          ]
        }
      ]
    });
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "example.docx");
    });
  };
  return (
    <div className="App">
      <h1>My awsome document</h1>
      <h2>click dowonload document</h2>
      <button onClick={generate}>Generate doc</button>
    </div>
  );
}
