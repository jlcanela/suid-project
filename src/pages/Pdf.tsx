import { Box } from "@suid/material";
import PageHeader from "../components/PageHeader";
import type { Component } from "solid-js";
import { createEffect, createResource, Show } from "solid-js";
import { TypstDocument } from "../components/TypstDocument";
import {
  initSync,
  TypstCompiler,
  TypstCompilerBuilder,
} from "@myriaddreamin/typst-ts-web-compiler";

import { createTypstCompiler } from "@myriaddreamin/typst.ts";
import { TypstPdf } from "../components/TypstPdf";

async function setupCompiler() {
  // const wasmModule = await WebAssembly.instantiateStreaming(
  //   fetch(
  //     "https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-web-compiler@0.5.0-rc8/pkg/typst_ts_web_compiler_bg.wasm"
  //   ),
  //   testImportObject
  // );
  // await initSync(wasmModule.instance);
  // const worker = new Worker('worker.js');
  // const wasmResponse = await fetch('https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-web-compiler@0.5.0-rc8/pkg/typst_ts_web_compiler_bg.wasm');
  // const wasmBuffer = await wasmResponse.arrayBuffer();

  // worker.postMessage(wasmBuffer);
  // worker.onmessage = async (e) => {
  //   await initSync(e.data);
  // };

  // const wasmResponse = await fetch('https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-web-compiler@0.5.0-rc8/pkg/typst_ts_web_compiler_bg.wasm');
  // const wasmBuffer = await wasmResponse.arrayBuffer();
  // // Use WebAssembly.compile instead of sync compilation
  // const wasmModule = await WebAssembly.compile(wasmBuffer);
  // await initSync(wasmModule);

  // Create a new compiler builder
  const builder = new TypstCompilerBuilder();

  // Set up a dummy access model for basic usage
  await builder.set_dummy_access_model();

  // Build the compiler
  const compiler = await builder.build();
  return compiler;
}

async function compileTypst() {
  const compiler = await setupCompiler();

  // Add source content
  compiler.add_source(
    "main.typ",
    `#set page(width: 10cm, height: auto)
       Hello, Typst!`
  );

  // Compile to PDF format
  const result = await compiler.compile(
    "main.typ", // main file path
    undefined, // inputs (optional)
    "pdf", // output format
    0 // diagnostics format
  );

  // Get compilation artifacts
  const artifact = await compiler.get_artifact(
    "pdf", // format
    0 // diagnostics format
  );

  // Clean up
  compiler.free();
}

export default function Pdf() {
  try {
    //compileTypst();
  } catch (e) {
    console.error(e);
  }

  const getArtifactData = async () => {
    const response = await fetch(
      // get pre-compiled file
      "https://myriad-dreamin.github.io/typst.ts/docs/readme.artifact.sir.in"
    ).then((response) => response.arrayBuffer());

    return new Uint8Array(response);
  };
  const [vector] = createResource(getArtifactData);

  //console.log(createTypstCompiler);
  return (
    <Box sx={{ width: "100%" }}>
      <PageHeader title="PDF Report" />
   <TypstPdf fill="#343541" artifact={vector()} />
      {/* <Show when={vector()} fallback={<h1>Loading...</h1>}>
        <TypstDocument fill="#343541" artifact={vector()} />
      </Show> */}
    </Box>
  );
}

/*
import type { Component } from 'solid-js';
import { createResource, Show } from 'solid-js'
import { TypstDocument } from 'typst-ts-solid';

export const App = (artifact: Uint8Array) => {
  const getArtifactData = async () => {
    const response = await fetch(
      // get pre-compiled file
      'https://myriad-dreamin.github.io/typst.ts/docs/readme.artifact.sir.in'
    ).then(response => response.arrayBuffer());

    return (new Uint8Array(response));
  };
  const [vector] = createResource(getArtifactData);

  return (
    <div>
      <Show when={vector()} fallback={<h1>Loading...</h1>}>
        <TypstDocument fill="#343541" artifact={vector()} />
      </Show>
    </div>
  );
};
export default App;
*/
