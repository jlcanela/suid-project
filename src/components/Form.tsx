import { Box, Typography, Button, Container } from "@suid/material";
import { Form, Schema } from "@bpmn-io/form-js";
import { onMount } from "solid-js";


type OnSubmitCallback = (event: any) => void;

// Define the createForm function with TypeScript
export function createForm(container: HTMLElement, schema: Schema, onSubmit: OnSubmitCallback): void {
  const form = new Form({
    container: container,
  });

  form.importSchema(schema).then(() => {
    form.on("submit", (event) => {
      onSubmit(event);
    });
  });
}


function BpmnForm({ schema, onSubmit }: { schema: Schema; onSubmit: OnSubmitCallback }) {
    let formContainer!: HTMLDivElement; // Use non-null assertion to indicate that this will be assigned
  
    onMount(() => {
      // Use the createForm method
      createForm(formContainer, schema, onSubmit);
    });
  
    return (
      <div>
        <div ref={el => (formContainer = el as HTMLDivElement)}></div>
      </div>
    );
  }
export default BpmnForm;
