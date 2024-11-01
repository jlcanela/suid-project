import formSchema from "./ProjectAdd.json";
import PageHeader from "../components/PageHeader";
import { ArrayElement } from "../components/GeneratedTypesUtils";
import { ProjectRepository } from "../repositories/ProjectRepository";
import { ProjectsQuery } from "../gql/graphql";
import { CreateQueryResult } from "@tanstack/solid-query";
import EntityTable from "../components/EntityTable";
import AddEntityModal from "../components/AddEntityModal";
import { Box } from "@suid/material";
import { useAuth0 } from "../auth";

function ProjectsTable() {
  const { getToken } = useAuth0();

  type Project = ArrayElement<ProjectsQuery["projects"]>;

  const repository = new ProjectRepository(getToken);
  const q: CreateQueryResult<ProjectsQuery, Error> = repository.findAll({});
  const onDelete = (id: number) => {
    repository.delete({id});
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

function AddProjectModal() {
  const { getToken } = useAuth0();

  const repository = new ProjectRepository(getToken);
  return (
    <AddEntityModal title="Add Project" schema={formSchema} create={repository.create.bind(repository) }/>
  );
}

export default function ProjectsPage() {
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
