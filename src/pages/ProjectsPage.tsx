import { Button, Dialog } from "@suid/material";
import { createSignal } from "solid-js";

import formSchema from "./PartyAdd.json";

import BpmnForm, { hasErrors } from "../components/Form";
import PageHeader from "../components/PageHeader";
import { ArrayElement } from "../components/GeneratedTypesUtils";
import { ProjectRepository } from "../repositories/ProjectRepository";
import { ProjectsQuery } from "../gql/graphql";
import { CreateQueryResult } from "@tanstack/solid-query";
import EntityTable from "../components/EntityTable";

function ProjectsTable() {

  type Project = ArrayElement<ProjectsQuery["projects"]>;

  const repo = new ProjectRepository();
  const q: CreateQueryResult<ProjectsQuery, Error> = repo.findAll({});
  const onDelete = (id: number) => {
    repo.delete({id});
  };

  return (
    <EntityTable<ProjectsQuery, Project, number> 
      columnNames={["id", "name", "description"]} 
      path="/projects"
      prepareDeleteMessage={(p: Project) => p ? `Are you sure you want to delete project '${p.name}' ?`: 'Are you sure ?' }
      fetch_id={ (p: Project) => p.id }
      query={q}
      fetch_data={q => q.data.projects}
      deleteEntity={onDelete}
    />
  );

}

function ProjectsPage() {
  return (
    <>
      <div>
        <PageHeader title="Projects" />
        <AddProjectModal />
       <ProjectsTable/>
      </div>
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

