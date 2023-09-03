import SimpleMDE from "easymde/types/easymde";

const createAlignAction = (align: "left" | "center" | "right" | "justify") =>
  function action(editor: SimpleMDE) {
    const cm = editor.codemirror;
    const selections = editor.codemirror.listSelections();
    const text = `<p style="text-align:${align};">$1</p>`;

    if (selections.length > 0) {
      const startLine = selections[0].head.line;
      const endLine = selections[selections.length - 1].anchor.line;

      if (startLine === endLine) {
        const replaceText = cm.getLine(startLine);
        const replacedText = text.replace("$1", `${replaceText}`);
        cm.replaceRange(
          replacedText,
          { line: startLine, ch: 0 },
          { line: startLine, ch: replacedText.length }
        );
        return;
      }

      let replaceText = "";

      for (let i = startLine; i <= endLine; i++) {
        replaceText += editor.codemirror.getLine(i) + (i < endLine ? "\n" : "");
      }

      return cm.replaceRange(
        text.replace("$1", `\n ${replaceText} \n`),
        { line: startLine, ch: 0 },
        { line: endLine + 1, ch: text.length }
      );
    }

    return cm.replaceSelection(text.replace("$1", ""));
  };

const AlignLeftBtn = {
  name: "align-left",
  className: "fa fa-align-left",
  title: "",
  action: createAlignAction("left"),
};

const AlignCenterBtn = {
  name: "align-center",
  className: "fa fa-align-center",
  title: "",
  action: createAlignAction("center"),
};
const AlignRightBtn = {
  name: "align-right",
  className: "fa fa-align-right",
  title: "",
  action: createAlignAction("right"),
};
const AlignJustifyBtn = {
  name: "align-justify",
  className: "fa fa-align-justify",
  title: "",
  action: createAlignAction("justify"),
};

const ImageButton = {
  name: "insert image",
  className: "fa fa-image",
  title: "Insert Image",
  async action(editor: SimpleMDE) {
    this.onAction();
    // const cm = editor.codemirror;
    // const cursor = cm.getCursor();
    // const currentLine = cursor.line;
    // const currentLineText = editor.codemirror.getLine(currentLine);
    // const textSelected = cm.getSelection();

    // if (textSelected) {
    //   return cm.replaceSelection(`![alt](${textSelected})`);
    // }

    // if (!currentLineText || currentLineText.trim() === "") {
    //   return cm.replaceSelection(
    //     `![alt](${textSelected ? textSelected : "http://"})`
    //   );
    // }
    // return cm.replaceSelection(
    //   `\n ![alt](${textSelected ? textSelected : "http://"})`
    // );
  },
  onAction: () => {},
};

export {
  AlignCenterBtn,
  AlignJustifyBtn,
  AlignRightBtn,
  AlignLeftBtn,
  ImageButton,
};
