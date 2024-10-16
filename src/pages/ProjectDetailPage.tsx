import { Typography, Button, Card, CardContent, Box } from "@suid/material";
import { useNavigate, useParams, useLocation } from "@solidjs/router";
import { Match, Switch } from "solid-js";
import BpmnForm, { hasErrors } from "../components/Form";
import formSchema from "./ProjectDetailEdit.json";
import { ProjectRepository } from "../repositories/ProjectRepository";
import PageHeader from "../components/PageHeader";
import { DataArrayTwoTone } from "@suid/icons-material";

export default function ProjectDetailPage() {
  const repository = new ProjectRepository();

  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const isEditMode = location.pathname.includes("/edit");

  const query = repository.findOne(id);

  const handleUpdate = (event) => {
    event.preventDefault();
    if (!hasErrors(event.errors)) {
      console.log("updating project with ", event.data);
      repository.update({ ...event.data, id: parseInt(id) });
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

          {!isEditMode ? (
            <>
              {/* Project Detail Card */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Card sx={{ width: "48%" }}>
                  <CardContent>
                    <Typography variant="h6">Project Details</Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      Name: {query.data.projects_by_pk.name}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      Description: {query.data.projects_by_pk.description}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate(`/projects/${id}/edit`)}
                      sx={{ mt: 2 }}
                    >
                      Edit Project Details
                    </Button>
                  </CardContent>
                </Card>

                {/* Project Resources Card */}
                <Card sx={{ width: "48%" }}>
                  <CardContent>
                    <Typography variant="h6">Project Resources</Typography>
                    <ul>
                      {query.data.identity_parties.map((party) => (
                        <li /*key={party.party_id}*/>
                          {party.first_name} {party.last_name} - Roles:{" "}
                          {party.party_roles
                            .map((pr) => pr.role_type.description)
                            .join(", ")}
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate(`/projects/${id}/edit`)}
                      sx={{ mt: 2 }}
                    >
                      Edit Project Resources
                    </Button>
                  </CardContent>
                </Card>
              </Box>

              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/projects")}
                sx={{ mt: 2 }}
              >
                Back to Projects
              </Button>
            </>
          ) : (
            <>
             <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>

              {/* Edit Mode - Project Detail Form */}
              <Card sx={{ width: "48%" }}>
                <CardContent>
                  <BpmnForm
                    schema={formSchema}
                    data={query.data.projects_by_pk}
                    onSubmit={handleUpdate}
                  />
                </CardContent>
              </Card>

              {/* Edit Mode - Project Resource Editor */}
              <Card sx={{ width: "48%" }}>
                <CardContent>
                  {/* Implement your resource editor here */}
                  <Typography variant="h6">Edit Project Resources</Typography>
                  {/* Add form or inputs to edit resources */}
                </CardContent>
              </Card>
              </Box>

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
