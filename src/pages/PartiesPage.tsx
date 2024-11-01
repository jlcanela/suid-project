import { Button, Dialog } from "@suid/material";
import { createSignal } from "solid-js";

import formSchema from "./PartyAdd.json";

import BpmnForm, { hasErrors } from "../components/Form";
import PageHeader from "../components/PageHeader";
import { ArrayElement } from "../components/GeneratedTypesUtils";
import { ProjectRepository } from "../repositories/ProjectRepository";
import { PartyRepository } from "../repositories/PartyRepository";
import { PartiesQuery, ProjectsQuery } from "../gql/graphql";
import { CreateQueryResult } from "@tanstack/solid-query";
import EntityTable from "../components/EntityTable";
import AddEntityModal from "../components/AddEntityModal";
import { useAuth0 } from "../auth";


function PartiesTable() {

  type Entity = ArrayElement<PartiesQuery["identity_parties"]>;
  const { getToken } = useAuth0();

  const repository = new PartyRepository(getToken);
  const q: CreateQueryResult<PartiesQuery, Error> = repository.findAll({});
  const onDelete = (id: number) => {
    repository.delete({party_id: id});
  };

  return (
    <EntityTable<PartiesQuery, Entity, number> 
      columnNames={["party_id", "first_name", "last_name"]} 
      path="/parties"
      prepareDeleteMessage={(p: Entity) => p ? `Are you sure you want to delete party '${p.first_name} ${p.last_name}' ?`: 'Are you sure ?' }
      fetch_id={ (p: Entity) => p.party_id }
      query={q}
      fetch_data={q => q.data.identity_parties}
      deleteEntity={onDelete}
      />
  );

}

function AddPartyModal() {
  const { getToken } = useAuth0();
  const repository = new PartyRepository(getToken);
  return (
    <AddEntityModal title="Add Party" schema={formSchema} create={repository.create.bind(repository) }/>
  );
}

export default function PartiesPage() {
  return (
    <>
      <div>
        <PageHeader title="Parties" />
        <AddPartyModal />
       <PartiesTable/>
      </div>
    </>
  );
}
