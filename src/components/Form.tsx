import { Form, Schema } from "@bpmn-io/form-js";
import { onMount } from "solid-js";


type OnSubmitCallback = (data: any, errors: any) => void;

// Define the createForm function with TypeScript
export function createForm(container: HTMLElement, schema: Schema, data: any, onSubmit: OnSubmitCallback): void {
  const form = new Form({
    container: container,
  });

  form.importSchema(schema, data).then(() => {
    form.on("submit", (event) => {
      onSubmit(event, undefined);
    });
  });
}

export function hasErrors(errors: Record<string, any>): boolean {
  return Object.keys(errors).length > 0;
}

function BpmnForm({ schema, data, onSubmit }: { schema: Schema; data: any, onSubmit: OnSubmitCallback }) {
    let formContainer!: HTMLDivElement; // Use non-null assertion to indicate that this will be assigned
  
    onMount(() => {
      // Use the createForm method
      createForm(formContainer, schema, data, onSubmit);
    });
  
    return (
      <div>
        <div ref={el => (formContainer = el as HTMLDivElement)}></div>
      </div>
    );
  }
export default BpmnForm;
