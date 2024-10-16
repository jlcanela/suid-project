import { Button, Dialog } from "@suid/material";
import { createSignal } from "solid-js";
import BpmnForm, { hasErrors } from "./Form";
import { Schema } from "@bpmn-io/form-js";

export default function FormModal({
  title,
  schema,
  addProject,
}: {
  title: string;
  schema: Schema;
  addProject: (data) => void;
}) {
  const [showModal, setShowModal] = createSignal(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (hasErrors(event.errors)) {
    } else {
      addProject(event.data);
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

