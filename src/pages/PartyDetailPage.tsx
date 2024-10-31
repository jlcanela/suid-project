import { Typography, Button, Card, CardContent, Box, FormControlLabel, Switch } from "@suid/material";
import { useNavigate, useParams } from "@solidjs/router";
import { createMemo, createSignal, Show } from "solid-js";

import BpmnForm, { hasErrors } from "../components/Form";
import PageHeader from "../components/PageHeader";
import StatusMessage from "../components/StatusMessage";

import { Party, PartyRepository, RoleType } from "../repositories/PartyRepository";
import { Identity_Role_Type_Enum, UpdatePartyRolesMutationVariables } from "../gql/graphql";

import formSchema from "./PartyDetailEdit.json";

function PartyDetail({ data, onUpdate }) {
  const [isEditMode, setIsEditMode] = createSignal(false);

  const handleSave = (event) => {
    event.preventDefault();
    if (!hasErrors(event.errors)) {
      onUpdate(event.data);
      setIsEditMode(false);
    }
  };

  return (
    <Card sx={{ width: "48%" }}>
      <CardContent>
        {!isEditMode() ? (
          <>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Party Details
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              FirstName: {data.first_name}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              LastName: {data.last_name}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsEditMode(true)}
              sx={{ mt: 2 }}
            >
              Edit
            </Button>
          </>
        ) : (
          <>
            <BpmnForm schema={formSchema} data={data} onSubmit={handleSave} />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setIsEditMode(false)}
              sx={{ mt: 2 }}
            >
              Cancel
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function PartyRoles({ party, roleTypes, onUpdate }: { party: Party, roleTypes: RoleType, onUpdate: (variables: UpdatePartyRolesMutationVariables) => void }) {

  const rolePresenceMapping = roleTypes.reduce((acc, role) => {
    acc[role.value] = party.party_roles.some(
      (partyRole) => partyRole.role_type.value === role.value
    );
    return acc;
  }, {});

  const originalRoleStates = { ...rolePresenceMapping };
  const [roleStates, setRoleStates] = createSignal(rolePresenceMapping);
  
  const isDirty = createMemo(() => {
    const currentStates = roleStates();
    return Object.keys(originalRoleStates).some(
      (key) => originalRoleStates[key] !== currentStates[key]
    );
  });

  const handleToggle = (roleValue) => {
    setRoleStates((prevStates) => ({
      ...prevStates,
      [roleValue]: !prevStates[roleValue],
    }));
  };

const save = () => {
  
  const currentRoleStates = roleStates(); // Assuming roleStates() returns the current state object

  // Identify roles to remove: present in originalRoleStates but not in currentRoleStates
  const roles_to_remove = Object.keys(originalRoleStates).filter(
    (role) => originalRoleStates[role] && !currentRoleStates[role]
  );

  // Identify roles to add: present in currentRoleStates but not in originalRoleStates
  const roles_to_add = Object.keys(currentRoleStates).filter(
    (role) => currentRoleStates[role] && !originalRoleStates[role]
  );

  const variables = {
    party_id: party.party_id,
    role_type_ids_to_remove: roles_to_remove as Identity_Role_Type_Enum[], // Cast to the correct enum type
    new_role_types: roles_to_add.map((role) => ({
      party_id: party.party_id,
      role_type_id: role as Identity_Role_Type_Enum, // Ensure correct typing here as well
    })),
  };

  onUpdate(variables);
};

  return (
    <Card sx={{ width: "48%" }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Party Roles
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {roleTypes.map((role) => (
             <div style={{ 'margin-bottom': '8px' }}>
             <FormControlLabel
               control={
                 <Switch
                   checked={roleStates()[role.value]}
                   onChange={() => handleToggle(role.value)}
                 />
               }
               label={role.description}
             />
           </div>
          ))}
        </Typography>
        <Show when={isDirty()}>
        <Button
              variant="contained"
              color="secondary"
              sx={{ mt: 2 }}
              onClick={save}
              >
              Save
            </Button>
        </Show>
      </CardContent>
    </Card>
  );
}

export default function PartyDetailPage() {
  const repository = new PartyRepository();

  const { id } = useParams();
  const navigate = useNavigate();

  const query = repository.findOne(id);
  const updatePartyDetail = (updatedData) => {
    repository.update({ ...updatedData, party_id: parseInt(id) });
  };

  const updatePartyRoles = (variables: UpdatePartyRolesMutationVariables) => {
    repository.updatePartyRoles(variables);
  };
  return (
    <>
      <PageHeader title="Party Details" />
      <StatusMessage query={query} />

      <Show when={query.isSuccess && query.data?.identity_parties_by_pk}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <PartyDetail
            data={query.data.identity_parties_by_pk}
            onUpdate={updatePartyDetail}
          />
          <PartyRoles party={query.data.identity_parties_by_pk} roleTypes={query.data.identity_role_type} onUpdate={updatePartyRoles} />
        </Box>
      </Show>
      <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/parties")}
              sx={{ ml: 2 }}
            >
              Back to Parties
            </Button>
    </>
  );
}
