import { Box, Typography, Button, Container } from "@suid/material";
import PageHeader from "../components/PageHeader";
import {BpmnModeler, BpmnViewer} from "../components/BpmnViewer";
import { createSignal } from "solid-js";
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-js.css';

import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';

export default function BPMNEditor() {
  const [activeTab, setActiveTab] = createSignal(0);

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
      {activeTab() === 0 && <div id="canvas" class="with-diagram"><BpmnViewer xmlPath="./pizza-collaboration.bpmn" height={600} /></div>}
      {activeTab() === 1 && <div id="canvas" style="background-color: light-gray"><BpmnModeler xmlPath="./pizza-collaboration.bpmn" height={800}/></div>}
      {activeTab() === 2 && <div id="canvas" style="background-color: light-gray"><BpmnModeler xmlPath="./process-diagram.bpmn" height={800} camunda={true}/></div>}
    </Box>
  </Box>
    // <Container>
    //   <PageHeader title="BPMN Editor" />

    //     

    // </Container>
  );
}
