import { Box, Typography, Button, Container } from "@suid/material";
import PageHeader from "../components/PageHeader";
import {BpmnModeler, BpmnViewer, loadXml} from "../components/BpmnViewer";
import { createResource, createSignal } from "solid-js";
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-js.css';

import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';

export default function BPMNEditor() {
  const [activeTab, setActiveTab] = createSignal(0);

  const [xml] = createResource(() => loadXml("./pizza-collaboration.bpmn"));
  const [processDiagram] = createResource(() => loadXml("./process-diagram.bpmn"));

  const tabs = ["Viewer", "Editor", "Camunda8 Editor"];

  const handleTabChange = (event: any, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
  <PageHeader title="BPMN Editor" />
    {/* Tabs component from SUID */}
  <div style={{ display: "flex", cursor: "pointer" }}>
        {tabs.map((tab, index) => (
          <div
            style={{
              padding: "10px",
              "border-bottom": activeTab() === index ? "2px solid blue" : "none"
            }}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </div>
        ))}
      </div>
    
    {/* Content for each tab */}
    <Box sx={{ padding: 3 }}>
      {activeTab() === 0 && <div id="canvas" class="with-diagram"><BpmnViewer xml={xml()} height={600} /></div>}
      {activeTab() === 1 && <div id="canvas" style="background-color: light-gray; height: 700px"><BpmnModeler xml={xml()} /></div>}
      {activeTab() === 2 && <div id="canvas" style="background-color: light-gray; height: 700px"><BpmnModeler xml={processDiagram()} camunda={true}/></div>}
    </Box>
  </Box>
    // <Container>
    //   <PageHeader title="BPMN Editor" />

    //     

    // </Container>
  );
}
