import {
  Box,
  Divider,
  IconButton,
  Typography,
} from "@suid/material";
import { createSignal, For, Match, Signal, Switch } from "solid-js";
import VisibilityIcon from "@suid/icons-material/Visibility";
import EditIcon from "@suid/icons-material/Edit";
import DeleteIcon from "@suid/icons-material/Delete";
import AddProjectModal from "../components/projects/AddProject";
import { graphql } from "../gql";
import { DeleteProjectMutation, ProjectsQuery } from "../gql/graphql";
import { request } from "graphql-request";
import { createMutation, createQuery, dataTagSymbol, useQueryClient } from "@tanstack/solid-query";

import {
  ColumnDef,
} from "@tanstack/solid-table";

import { CustomTable } from "../components/CustomTable";
import { DeleteModal } from "../components/DeleteModal";

function ProjectsPage() {

  const DELETE_PROJECT = graphql`
mutation DeleteProject($id: Int!) {
  delete_projects_by_pk(id: $id) {
    id
  }
}`;

  const projectsQueryDocument = graphql(`
    query Projects {
      projects {
        id
        name
        description
      }
    }
  `);

  const viewProject = (id) => {
    console.log(`View project with ID: ${id}`);
  };

  const editProject = (id) => {
    console.log(`Edit project with ID: ${id}`);
  };

  // Utility type to extract the element type from an array
  type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

  // Use the utility type to get the type of a single project
  type Project = ArrayElement<ProjectsQuery["projects"]>;

  const columns: ColumnDef<Project>[] = [
    {
      accessorKey: "id",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    },
    {
      accessorKey: "name",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    },
    {
      accessorKey: "description",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    },
    {
      accessorKey: "action",
      cell: (info) =>  <div>
      <a href={`/projects/${info.row.original.id}`}>
      <IconButton aria-label="view">
        <VisibilityIcon />
      </IconButton>
      </a>
      <a href={`/projects/${info.row.original.id}/edit`}>
      <IconButton aria-label="edit">
        <EditIcon />
      </IconButton>
      </a>
      <IconButton aria-label="delete" onClick={() => handleDelete(info.row.original.id)}>
        <DeleteIcon />
      </IconButton>
    </div>,
      footer: (info) => info.column.id,
    },
  ];

  // Example event handlers
  function handleView(id) {
    console.log(`View project with ID: ${id}`);
  }

  function handleEdit(id) {
    console.log(`Edit project with ID: ${id}`);
  }

  const graphQLConfig = {
    url: "http://localhost:8080/v1/graphql",
    requestHeaders: {
      "x-hasura-admin-secret": "kAQ4hW8xJeyMICatUx7gvTGM",
    },
  };

  const [open, setOpen] = createSignal(false);
  const [selectedId, setSelectedId] = createSignal<number | null>(null);
  const [message, setMessage] = createSignal("Are you sure you want to delete this project?");

  const queryClient = useQueryClient();

  const deleteProject = createMutation(() => ({
    mutationFn: (variables: DeleteProjectMutation["delete_projects_by_pk"]) => {
      return request({
        ...graphQLConfig,
        document: DELETE_PROJECT,
        variables: {
          id: variables.id,
        },
      });
    },
    onSuccess: (data: DeleteProjectMutation, vars, context) => {
      const key = ["projects"];
      queryClient.resetQueries({ queryKey: key });
    },
  }));

  const handleDelete = (id: number) => {
    setSelectedId(id);
    setMessage(`Are you sure you want to delete this project (#${id})?`);
    setOpen(true);
  };

  const onDelete = () => {
    deleteProject.mutate({ id: selectedId() });
  }

  const query = createQuery(() => ({
    queryKey: ["projects"],
    queryFn: async () =>
      await request({
        ...graphQLConfig,
        document: projectsQueryDocument,
      }),
  }));

  return (
    <>
    <div>
      <ProjectsHeader/>
      <AddProjectModal />
      <Switch>
        <Match when={query.isPending}>
          <p>Loading...</p>
        </Match>
        <Match when={query.isError}>
          <p>Error: {query.error.message}</p>
        </Match>
        <Match when={query.isSuccess}>
          <CustomTable data={query.data.projects} columns={columns}/>
        </Match>
      </Switch>
    </div>
    <DeleteModal openSignal={[open, setOpen]} message={[message, setMessage]} onDelete={onDelete}/>
    </>
  );
}

function ProjectsHeader() {
  return (
    <Box sx={{ mb: 4, textAlign: "center", position: "relative" }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        Projects
      </Typography>
      <Divider variant="middle" sx={{ width: '50%', mx: 'auto', my: 2 }} />
    </Box>
  );
}

export default ProjectsPage;
