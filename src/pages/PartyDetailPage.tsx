import { Typography, Button } from "@suid/material";
import { useNavigate, useParams, useLocation } from "@solidjs/router";
import { Match, Switch } from "solid-js";
import BpmnForm, { hasErrors } from "../components/Form"; // Import the BpmnForm component
import formSchema from "./PartyDetailEdit.json"; // Import the form schema
import PageHeader from "../components/PageHeader";
import { PartyRepository } from "../repositories/PartyRepository";

export default function PartyDetailPage() {
  const repository = new PartyRepository();

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
      console.log('updating party with ', event.data);
      repository.update({...event.data, "party_id": parseInt(id)});
      navigate(`/parties/`);
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
          <PageHeader title="Party Details" />
        
            {/* Toggle between View and Edit modes based on URL */}
            {!isEditMode ? (
              <>
                <Typography variant="h6">Firstname:</Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {query.data.identity_parties_by_pk.first_name}
                </Typography>
                <Typography variant="h6">Lastname:</Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {query.data.identity_parties_by_pk.last_name}
                </Typography>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/parties/${id}/edit`)}
                >
                  Edit
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate("/parties")}
                  sx={{ ml: 2 }}
                >
                  Back to Parties
                </Button>
              </>
            ) : (
              <>
                {/* Display the edit form in edit mode */}
                <BpmnForm schema={formSchema} data={query.data.identity_parties_by_pk} onSubmit={handleUpdate} />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate(`/parties/${id}`)}
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
