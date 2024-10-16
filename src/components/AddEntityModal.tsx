import { Button, Dialog } from "@suid/material";
import { createSignal } from "solid-js";

import BpmnForm, { hasErrors } from "../components/Form";
import { Schema } from "@bpmn-io/form-js";

export default function AddEntityModal<Input>({ title, schema, create }: { title: string,  schema: Schema, create: (data: Input) => void}) {  
  const [showModal, setShowModal] = createSignal(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (hasErrors(event.errors)) {
    } else {
      create(event.data);
      handleClose();
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleShow}>
        {title}
      </Button>
      <Dialog open={showModal()} onClose={handleClose}>
        <BpmnForm schema={schema} data={{}} onSubmit={handleSubmit} />
      </Dialog>
    </div>
  );
}
