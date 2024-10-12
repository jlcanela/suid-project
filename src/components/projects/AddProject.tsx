import { Button, Dialog } from "@suid/material";
import { createSignal } from "solid-js";
import BpmnForm from "../Form";
import formSchema from "./AddProject.json";
import { graphql } from "../../gql";
import { createMutation, useQueryClient } from "@tanstack/solid-query";

import { request } from "graphql-request";
import { CreateProjectMutation } from "../../gql/graphql";

const CREATE_PROJECT = graphql`
  mutation CreateProject($name: String!, $description: String!, $owner: Int!) {
    insert_projects_one(
      object: { name: $name, description: $description, owner: $owner }
    ) {
      id
      name
      description
      owner
    }
  }
`;

function hasErrors(errors: Record<string, any>): boolean {
  return Object.keys(errors).length > 0;
}

function AddProjectModal() {
  const [showModal, setShowModal] = createSignal(false);
  const [newProject, setNewProject] = createSignal({
    name: "",
    description: "",
  });

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProject({ ...newProject(), [name]: value });
    console.log(newProject());
  };

  const queryClient = useQueryClient();

  const graphQLConfig = {
    url: "http://localhost:8080/v1/graphql",
    requestHeaders: {
      "x-hasura-admin-secret": "kAQ4hW8xJeyMICatUx7gvTGM",
    },
  };

  const mutation = createMutation(() => ({
    mutationFn: (variables: CreateProjectMutation["insert_projects_one"]) => {
      return request({
        ...graphQLConfig,
        document: CREATE_PROJECT,
        variables: {
          name: variables.name,
          description: variables.description,
          owner: 1,
        },
      });
    },
    onSuccess: (data: CreateProjectMutation, vars, context) => {
      const key = ["projects"];
      queryClient.resetQueries({ queryKey: key });
    },
  }));

  const handleSubmit = (event) => {
    event.preventDefault();
    if (hasErrors(event.errors)) {
      console.log(event);
    } else {
      mutation.mutate(event.data);
      handleClose();
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleShow}>
        Add Project
      </Button>
      <Dialog open={showModal()} onClose={handleClose}>
        <BpmnForm schema={formSchema} onSubmit={handleSubmit} />

        {/* <DialogTitle>Add New Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the project details below.
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="dense"
              label="Project Name"
              type="text"
              fullWidth
              variant="standard"
              name="name"
              value={newProject().name}
              onChange={handleInputChange}
              placeholder="Enter project name"
            />
            <TextField
              margin="dense"
              label="Project Description"
              multiline
              rows={3}
              fullWidth
              variant="standard"
              name="description"
              value={newProject().description}
              onChange={handleInputChange}
              placeholder="Enter project description"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save Changes
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}

export default AddProjectModal;
