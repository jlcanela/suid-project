import { Box, Typography, Button } from "@suid/material";
import { useNavigate, useParams, useLocation } from "@solidjs/router";
import { Match, Switch } from "solid-js";
import BpmnForm, { hasErrors } from "../components/Form"; // Import the BpmnForm component
import formSchema from "./ProjectDetailEdit.json"; // Import the form schema
import { ProjectDatasource, ProjectRepository } from "../repositories/ProjectRepository";
import PageHeader from "../components/PageHeader";

export default function ProjectDetailPage() {
  const repository: ProjectDatasource = new ProjectRepository();

  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Determine edit mode based on URL
  const isEditMode = location.pathname.includes("/edit");

  const query = repository.findOne(id);

  const handleUpdate = (event) => {
    event.preventDefault();
    if (hasErrors(event.errors)) {
    } else {
      console.log('updating project with ', event.data);
      repository.update({...event.data, "id": parseInt(id)});
      navigate(`/projects/`);
    }
  };

  return (
    <>
      <Switch>
        <Match when={query.isPending}>
          <p>Loading...</p>
        </Match>
        <Match when={query.isError}>
          <p>Error: {query.error.message}</p>
        </Match>
        <Match when={query.isSuccess}>
          <PageHeader title="Project Details" />
        
            {/* Toggle between View and Edit modes based on URL */}
            {!isEditMode ? (
              <>
                <Typography variant="h6">Name:</Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {query.data.projects_by_pk.name}
                </Typography>
                <Typography variant="h6">Description:</Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {query.data.projects_by_pk.description}
                </Typography>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/projects/${id}/edit`)}
                >
                  Edit
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate("/projects")}
                  sx={{ ml: 2 }}
                >
                  Back to Projects
                </Button>
              </>
            ) : (
              <>
                {/* Display the edit form in edit mode */}
                <BpmnForm schema={formSchema} data={query.data.projects_by_pk} onSubmit={handleUpdate} />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate(`/projects/${id}`)}
                  sx={{ mt: 2 }}
                >
                  Cancel
                </Button>
              </>
            )}
        </Match>
      </Switch>
    </>
  );
}
