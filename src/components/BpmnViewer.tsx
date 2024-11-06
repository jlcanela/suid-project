import { Form, Schema, ViewerCommands } from "@bpmn-io/form-js";
import { keyboard } from "@testing-library/user-event/dist/cjs/keyboard/index.js";
import { onMount } from "solid-js";
import Viewer from "bpmn-js/lib/Viewer";
import Modeler from "bpmn-js/lib/Modeler";
import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
  CamundaPlatformPropertiesProviderModule,
  ZeebePropertiesProviderModule, // Camunda 8 provider
} from "bpmn-js-properties-panel";
import CamundaBpmnModdle from 'camunda-bpmn-moddle/resources/camunda.json'

import { Box } from "@suid/material";
      // Camunda 8 moddle extension
import zeebeModdle from 'zeebe-bpmn-moddle/resources/zeebe';

      // Camunda 8 behaviors
import ZeebeBehaviorsModule from 'camunda-bpmn-js-behaviors/lib/camunda-cloud';

      
//import BpmnModeler from 'bpmn-js/lib/Modeler';
function loadXml(xmlFilePath: string): Promise<string> {
  // Path to your XML file
  //const xmlFilePath = './PartyDetailEdit.xml';

  // Fetch the XML file
  return fetch(xmlFilePath)
    .then((response) => response.text()) // Get the response as text
    .then((xmlString) => {
      // Parse the XML string into a DOM object
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, "application/xml");

      
      // Example: Access specific elements from the XML
      const titleElements = xmlDoc.getElementsByTagName("title");
      if (titleElements.length > 0) {
        console.log(titleElements[0].textContent); // Prints content of first <title> element
      }


      return xmlString;
    })
    .catch((error) => {
      console.error("Error loading the XML file:", error);
      throw error;
    });
}

export function hasErrors(errors: Record<string, any>): boolean {
  return Object.keys(errors).length > 0;
}

export function BpmnViewer({
  xmlPath,
  height,
}: {
  xmlPath: string;
  height: number;
}) {
  let container!: HTMLDivElement; // Use non-null assertion to indicate that this will be assigned

  // Define the createForm function with TypeScript
  const createBpmnViewer = async (
    container: HTMLElement,
    xmlPath: string,
    height: number
  ) => {
    const viewer = new Viewer({
      container: container,
      height: height,
    });

    const xml = await loadXml(xmlPath);

    await viewer.importXML(xml);

    viewer.get("canvas").zoom("fit-viewport");
  };

  onMount(() => {
    // Use the createForm method
    createBpmnViewer(container, xmlPath, height);
  });

  return (
    <div>
      <div ref={(el) => (container = el as HTMLDivElement)}></div>
    </div>
  );
}

export function BpmnModeler({
  xmlPath,
  height,
  camunda
}: {
  xmlPath: string;
  height: number;
  camunda?: boolean;
}) {
  let container!: HTMLDivElement; // Use non-null assertion to indicate that this will be assigned

  // Define the createForm function with TypeScript
  const createBpmnModeler = async (
    container: HTMLElement,
    xmlPath: string,
    height: number
  ) => {
    let modeler;
    if (camunda) {

      modeler = new Modeler({
        container: container,
        propertiesPanel: {
          parent: '#properties'
        },
        additionalModules: [
          BpmnPropertiesPanelModule,
          BpmnPropertiesProviderModule,
          CamundaPlatformPropertiesProviderModule,
          //ZeebePropertiesProviderModule,
          //ZeebeBehaviorsModule
        ],
        moddleExtensions: {
          camunda: CamundaBpmnModdle,
          //zeebe: zeebeModdle
        }
      });
    } else {
      modeler = new Modeler({
        container: container,
        propertiesPanel: { parent: "#properties" },
        additionalModules: [
          BpmnPropertiesPanelModule,
          BpmnPropertiesProviderModule,
        ],
        keyboard: {
          bindTo: window,
        },
      });
    };

    const xml = await loadXml(xmlPath);

    await modeler.importXML(xml);

    modeler.get("canvas").zoom("fit-viewport");
  };

  onMount(() => {
    // Use the createForm method
    createBpmnModeler(container, xmlPath, height);
  });

  return (
    <Box
      sx={{
        display: "flex",
        width: "80%",
        height: `${height}px`,
        margin: "0 auto",
      }}
    >
      <div class="modeler" style="width: 70%;">
        {/* Flexbox container for side-by-side layout */}
        {/* Canvas - 60% width */}
        <div
          ref={(el) => (container = el as HTMLDivElement)}
          id="canvas"
          style={{
            flexBasis: "60%",
            border: "1px solid black",
            height: "100%",
            backgroundColor: "lightgray", // Ensure background color is applied here
          }}
        ></div>
      </div>
      {/* Properties Panel - 40% width */}
      <div
        id="properties"
        style={{
          flexBasis: "40%",
          border: "1px solid grey",
          width:"30%",
          height: "100%",
        }}
      ></div>
    </Box>

    // <div>
    //   <div ref={(el) => (container = el as HTMLDivElement)}></div>
    // </div>
  );
}
