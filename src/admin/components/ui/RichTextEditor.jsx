import { useMemo, useRef } from "react";
import JoditEditor from "jodit-react";
import { assetUrl, uploadsApi } from "../../api/contentApi";
import "../../styles/rte.css";

const ALLOWED = ["image/jpeg", "image/png", "image/webp"];
const MAX_MB = 5;

// Bullet list button that runs the browser list command directly (Jodit's built-in "ul" is a style dropdown).
const BULLET_LIST = {
  name: "bulletList",
  icon: "ul",
  tooltip: "Bullet list",
  exec: (editor) => { editor.execCommand("insertUnorderedList"); },
};

// Full-featured Jodit (MIT) editor: every standard toolbar feature, plus image upload through your own API.
export default function RichTextEditor({ value, onChange, placeholder = "Start writing…", height = 460, uploadFolder = "blog-images" }) {
  const initial = useRef(value || ""); // fixed initial value so typing never resets the cursor

  const config = useMemo(() => ({
    height,
    minHeight: 320,
    maxHeight: 1000,
    allowResizeY: true,
    placeholder,
    toolbarAdaptive: false,
    toolbarSticky: false,
    buttons: [
      "source", "|",
      "undo", "redo", "|",
      "paragraph", "font", "fontsize", "|",
      "bold", "italic", "underline", "strikethrough", "superscript", "subscript", "|",
      "brush", "|",
      BULLET_LIST, "ol", "|",
      "align", "outdent", "indent", "|",
      "link", "video", "table", "hr", "symbols", "|",
      "eraser", "copyformat", "|",
      "print", "fullsize",
    ],
    // Image button that uploads to your backend (/api/uploads) instead of embedding base64.
    extraButtons: [{
      name: "uploadImage",
      icon: "image",
      tooltip: "Upload image",
      exec: (editor) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ALLOWED.join(",");
        input.onchange = async () => {
          const file = input.files?.[0];
          if (!file) return;
          if (!ALLOWED.includes(file.type)) return window.alert("Use a JPG, PNG or WebP image.");
          if (file.size > MAX_MB * 1024 * 1024) return window.alert(`Image is too large. Max ${MAX_MB} MB.`);
          try {
            const url = await uploadsApi.upload(file, uploadFolder);
            editor.selection.insertImage(assetUrl(url), null, 600);
          } catch (err) {
            window.alert(err.message || "Image upload failed");
          }
        };
        input.click();
      },
    }],
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: false,
    askBeforePasteHTML: false,
    defaultActionOnPaste: "insert_clear_html",
    link: { openInNewTabCheckbox: true, noFollowCheckbox: false },
  }), [height, placeholder, uploadFolder]);

  return (
    <div className="rte">
      <JoditEditor value={initial.current} config={config} onChange={(html) => onChange(html === "<p><br></p>" ? "" : html)} />
    </div>
  );
}