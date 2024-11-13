// worker.js
importScripts('https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-web-compiler@0.5.0-rc8/pkg/typst_ts_web_compiler.js');

self.onmessage = async function(e) {
  const wasmBuffer = e.data;
  const result = await WebAssembly.compile(wasmBuffer);
  self.postMessage(result);
};
