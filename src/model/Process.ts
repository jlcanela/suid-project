// repositories/ProcessRepository.ts

import { makePersisted } from "@solid-primitives/storage";
import { Accessor, createResource, createSignal, ResourceReturn, Setter, Signal } from "solid-js";
import { defaultXml, importZip } from "./zip";

export interface ProcessInfo {
    name: string;
    content: string;
}

export class ProcessModel {
    private processes: [Accessor<Map<string, ProcessInfo>>, Setter<Map<string, ProcessInfo>>];
    private currentProcess: [Accessor<string>, Setter<string>];
    private _xml: Accessor<string>;
  
    constructor() {
      const [processes, setProcesses] = makePersisted(
        createSignal<Map<string, ProcessInfo>>(new Map()),
        {
          name: "processes",
          storage: localStorage,
          serialize: (map: Map<string, ProcessInfo>) =>
            JSON.stringify(Array.from(map.entries())),
          deserialize: (str: string) =>
            new Map<string, ProcessInfo>(JSON.parse(str)),
        }
      );
      this.processes = [processes, setProcesses];

      const [currentProcess, setCurrentProcess] = makePersisted(
        createSignal<string>(""), 
        {
          name: "process",
          storage: localStorage,
          serialize: JSON.stringify,
          deserialize: JSON.parse,
        }
      );
      this.currentProcess = [currentProcess, setCurrentProcess];

      const [_xml, { mutate, refetch }] = createResource(this.getCurrentProcess(), (name) => {
        return this.getProcessXml(name);
      });

      this._xml = _xml;

  
  }

  xml() {    
    return this._xml;
  }

  getProcesses() {
    return this.processes[0];
  }

  setProcesses(processes: Map<string, ProcessInfo>) {
    this.processes[1](processes);
  }

  getCurrentProcess() {
    return this.currentProcess?.[0];
  }

  setCurrentProcess(process: string) {
    this.currentProcess[1](process);
  }

  addProcess(processName: string) {
    const newMap = new Map(this.getProcesses()());
    newMap.set(processName, { name: processName, content: defaultXml });
    this.setProcesses(newMap);
    this.setCurrentProcess(processName);
  }

  deleteProcess(processToDelete: string) {
    const newMap = new Map(this.getProcesses()());
    newMap.delete(processToDelete);
    this.setProcesses(newMap);
  }

  updateProcessXml(processName: string, newXml: string) {
    const newMap = new Map(this.getProcesses()());
    newMap.set(processName, { name: processName, content: newXml });
    this.setProcesses(newMap);
  }

  getProcessXml(processName: string): string {
    return this.getProcesses()().get(processName)?.content || "";
  }

  async importFiles(files: FileList)  {
    if (files.length > 0 && files[0].name.endsWith(".zip")) {
      const firstFile = files[0];
      const map = await importZip(firstFile);
      this.setProcesses(map);
      this.setCurrentProcess(map.keys().next().value);
    }
  };
}
