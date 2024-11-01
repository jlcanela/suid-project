import {
  Typography,
  Button,
  Card,
  CardContent,
  Box,
} from "@suid/material";
import { useNavigate, useParams } from "@solidjs/router";

import { Accessor, createMemo, For, Show } from "solid-js";
import BpmnForm, { hasErrors } from "../components/Form";
import formSchema from "./ProjectDetailEdit.json";
import {
  Parties,
  ProjectAssignments,
  ProjectRepository,

} from "../repositories/ProjectRepository";
import PageHeader from "../components/PageHeader";
import { createSignal } from "solid-js";

import StatusMessage from "../components/StatusMessage";

import Toggle from "../components/Toggle";
import type { Action } from "../components/Toggle";
import { useAuth0 } from "../auth";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const { getToken } = useAuth0();
  const repository = new ProjectRepository(getToken);
  const navigate = useNavigate();
  const query = repository.findOne(id);
  const assignees: Accessor<ProjectAssignments> = createMemo(
    () => query.data?.projects_by_pk?.project_assignments
  );
  const parties: Accessor<Parties> = createMemo(
    () => query.data?.identity_parties
  );

  const handleUpdate = (updatedData) => {
    repository.update({ ...updatedData, id: parseInt(id) });
  };

  const handleUpdateAssignments = (toRemove: number[], toAdd: number[]) => {

    const variables = {
      project_id: parseInt(id),
      to_remove: toRemove,
      to_add: toAdd.map((party_role_id) => ({
        party_role_id: party_role_id,
        project_id: parseInt(id),
      })),
    };

    repository.updateProjectAssignments(variables);
  };

  return (
    <>
      <PageHeader title="Project Details" />
      <StatusMessage query={query} />
      <Show when={query.isSuccess && query.data?.projects_by_pk}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <ProjectDetail
            data={query.data.projects_by_pk}
            onUpdate={handleUpdate}
          />
          <Developers
            assignees={assignees}
            parties={parties}
            updateProjectAssignments={handleUpdateAssignments}
          />
        </Box>
      </Show>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/projects")}
        sx={{ mt: 2 }}
      >
        Back to Projects
      </Button>
    </>
  );
}

function Developers({
  assignees,
  parties,
  updateProjectAssignments,
}: {
  assignees: Accessor<ProjectAssignments>;
  parties: Accessor<Parties>;
  updateProjectAssignments: (toRemove: number[], toAdd: number[]) => void;
}) {
  const originalSwitchStates = createInitialSwitchStates(
    assignees(),
    parties()
  );

  // Initialize actions with "Nothing" for each key in originalSwitchStates
  const initializeActions = (originalSwitchStates) => {
    const initialActions = {};
    for (const key in originalSwitchStates) {
      if (originalSwitchStates.hasOwnProperty(key)) {
        initialActions[key] = "Nothing"; // Initialize all actions as "Nothing"
      }
    }
    return initialActions;
  };

  // Create actions signal
  const [actions, setActions] = createSignal(
    initializeActions(originalSwitchStates)
  );

  function createInitialSwitchStates(assignees, parties) {
    // Step 1: Create a set of assigned party role IDs
    const assignedRoleIds = new Set(
      assignees.map((assignment) => assignment.party_role.party_role_id)
    );

    // Step 2 & 3: Compute initialState with key as party_role_id and value as true/false
    const initialState = {};
    parties.forEach((party) => {
      party.party_roles.forEach((role) => {
        initialState[role.party_role_id] = assignedRoleIds.has(
          role.party_role_id
        );
      });
    });

    return initialState;
  }

  // Implement setAction function to update the actions signal
  const setAction = (key: number, action: Action) => {
    setActions((prevActions) => ({
      ...prevActions,
      [key]: action, // Update the action for the given key
    }));
  };

  const save = () => {
    const currentActions = actions();

    // Find party_roles to Add
    const rolesToAdd = Object.keys(currentActions)
      .filter((key) => currentActions[key] === "Add")
      .map(Number);

    // Find party_roles to Remove
    const rolesToRemove = Object.keys(currentActions)
      .filter((key) => currentActions[key] === "Remove")
      .map(Number);

    updateProjectAssignments(rolesToRemove, rolesToAdd);
  };

  // Implement isDirty function to check if any action is not "Nothing"
  const isDirty = () => {
    const currentActions = actions();
    return Object.values(currentActions).some((action) => action !== "Nothing");
  };

  return (
    <Card sx={{ width: "48%" }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Team Members
        </Typography>
        <hr/>

        {/* Iterate over the parties */}
        <For each={parties()}>
          {(party) => (
            <div style={{ "margin-bottom": "16px" }}>
              {/* Display party name */}
              <Typography variant="h6" sx={{ mb: 1 }}>
                {party.name}
              </Typography>

              {/* Iterate over party roles */}
              <For each={party.party_roles}>
                {(item) => (
                  <Toggle
                    initialState={originalSwitchStates[item.party_role_id]}
                    key={item.party_role_id}
                    label={`${item.role_type.description}(${item.party_role_id})`}
                    setAction={setAction}
                  />
                )}
              </For>
            </div>
          )}
        </For>

        {/* Show save button if isDirty is true */}
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

function ProjectDetail({ data, onUpdate }) {
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
              Project Details
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Name: {data.name}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Description: {data.description}
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
