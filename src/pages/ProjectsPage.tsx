import { Box, Button, Dialog, Divider, Typography } from "@suid/material";
import { createSignal, Match, Switch } from "solid-js";

import formSchema from "./ProjectsAdd.json";

import { CustomTable, makeColumnDefs } from "../components/CustomTable";
import { DeleteModal } from "../components/DeleteModal";
import BpmnForm, { hasErrors } from "../components/Form";
import { ProjectDatasource, ProjectRepository } from "../repositories/ProjectRepository";
import PageHeader from "../components/PageHeader";

function ProjectsPage() {
  const repository: ProjectDatasource = new ProjectRepository();

  const [open, setOpen] = createSignal(false);
  const [selectedId, setSelectedId] = createSignal<number | null>(null);
  const [message, setMessage] = createSignal(
    "Are you sure you want to delete this project?"
  );

  const handleDelete = (id: number) => {
    setSelectedId(id);
    setMessage(`Are you sure you want to delete this project (#${id})?`);
    setOpen(true);
  };

  const onDelete = () => {
    repository.delete({id: selectedId()});
  };

  const columns = makeColumnDefs(
    ["id", "name", "description"],
    "/projects",
    handleDelete
  );

  const query = repository.findAll({});

  return (
    <>
      <div>
        <PageHeader title="Projects" />
        <AddProjectModal />
        <Switch>
          <Match when={query.isPending}>
            <p>Loading...</p>
          </Match>
          <Match when={query.isError}>
            <p>Error: {query.error.message}</p>
          </Match>
          <Match when={query.isSuccess}>
            <CustomTable data={query.data.projects} columns={columns} />
          </Match>
        </Switch>
      </div>
      <DeleteModal
        openSignal={[open, setOpen]}
        message={[message, setMessage]}
        onDelete={onDelete}
      />
    </>
  );
}

export default ProjectsPage;

function AddProjectModal() {
  const repository = new ProjectRepository();
  const [showModal, setShowModal] = createSignal(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (hasErrors(event.errors)) {
    } else {
      repository.create(event.data);
      handleClose();
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleShow}>
        Add Project
      </Button>
      <Dialog open={showModal()} onClose={handleClose}>
        <BpmnForm schema={formSchema} data={{}} onSubmit={handleSubmit} />
      </Dialog>
    </div>
  );
}
