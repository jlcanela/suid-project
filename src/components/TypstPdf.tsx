import { withGlobalCompiler } from "@myriaddreamin/typst.ts/dist/esm/contrib/global-compiler.mjs";
import * as typst from "@myriaddreamin/typst.ts";
import { createEffect, createSignal, Show } from "solid-js";
import { Button } from "@suid/material";

export interface TypstPdfProps {
  fill?: string;
  artifact?: Uint8Array;
  format?: "vector";
}

let moduleInitOptions: typst.InitOptions = {
  beforeBuild: [],
  getModule: () =>
    "https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm",
};

export const TypstPdf = ({ fill, artifact, format }: TypstPdfProps) => {
  /// --- beg: manipulate permission --- ///

  // todo: acquire permission.
  const [permission, setPermissionInternal] = createSignal(false);
  const setPermissionAndOk = (status: PermissionStatus) => {
    if (status.state === "granted") {
      setPermissionInternal(true);
      return true;
    }
    setPermissionInternal(false);
    return false;
  };

  const [diagnostics, setDiagnostics] = createSignal<string[]>([]);
  const [pdf, setPdf] = createSignal<Uint8Array>(Uint8Array.from([]));
  createEffect(() => {
    const doCompile = async (compiler: typst.TypstCompiler) => {
      compiler.addSource(
        "/main.typ",
        `#set page(
  width: 210mm,  // A4 width
  height: 297mm, // A4 height
  margin: (
    left: 25mm,
    right: 25mm,
    top: 25mm,
    bottom: 25mm,
  ),
);

Hello, Typst!`
      );
      let { result, diagnostics } = await compiler.compile({
        mainFilePath: "/main.typ",
        format: "pdf",
        diagnostics: "unix",
      });
      setDiagnostics(diagnostics);
      setPdf(result);
    };

    withGlobalCompiler(typst.createTypstCompiler, moduleInitOptions, doCompile);
  });

  /// --- end: update document --- ///
  const downloadPdf = () => {
    // Create blob from Uint8Array
    const blob = new Blob([pdf()], { type: "application/pdf" });

    // Create URL for the blob
    const url = URL.createObjectURL(blob);

    // Create temporary link element
    const link = document.createElement("a");
    link.href = url;
    link.download = "report.pdf";

    // Append to document, click, and cleanup
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Release the blob URL
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1>TypstDocument</h1>
      <div>
        <h2>Diagnostics</h2>
        <ul>
          <Show
            when={diagnostics() && diagnostics().length === 0}
            fallback={<li>No diagnostics</li>}
          >
            {diagnostics().map((diagnostic) => (
              <li>{diagnostic}</li>
            ))}
          </Show>
        </ul>
        <Button
          variant="contained"
          onClick={downloadPdf}
          disabled={pdf().length === 0}
        >
          Download PDF
        </Button>
      </div>
      {/* todo: remove this embedded css */}
      {/* <style>{injectedCss}</style>
		<div ref={setDisplayDivRef}></div> */}
    </div>
  );
};

TypstPdf.setWasmModuleInitOptions = (opts: typst.InitOptions) => {
  moduleInitOptions = opts;
};
