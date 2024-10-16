import {
    CreatePartyMutation,
    PartiesQuery,
    PartiesQueryVariables,
    DeletePartyMutation,
    UpdatePartyMutation,
    PartyQuery,
  } from "../gql/graphql";
  
  import { graphql } from "../gql";

  import {
    CreateQueryResult,
  } from "@tanstack/solid-query";

  import { EntityRepository } from "./EntityRepository";
  
  const PARTY_FIND_ALL = graphql(`
      query Parties {
        identity_parties {
          party_id
          first_name
          last_name
        }
      }
  `);
  
  const PARTY_FIND_ONE = graphql(`
    query Party($id: Int!) {
      identity_parties_by_pk(party_id: $id) {
        party_id
        first_name
        last_name
      }
    }
  `);
  
  const CREATE_PARTY = graphql(`
    mutation CreateParty($first_name: String!, $last_name: String!, $idp_id: String!) {
      insert_identity_parties_one(object: {first_name: $first_name, last_name: $last_name, idp_id: $idp_id }) {
        first_name
        last_name
      }
    }
  `);
  
  const UPDATE_PARTY = graphql(`
    mutation UpdateParty($party_id: Int!, $first_name: String!, $last_name: String!) {
      update_identity_parties_by_pk(pk_columns: {party_id: $party_id}, _set: {first_name: $first_name, last_name: $last_name}) {
        party_id
        first_name
        last_name
      }
    }
  `);
  
  const DELETE_PARTY = graphql(`
    mutation DeleteParty($party_id: Int!) {
      delete_identity_parties_by_pk(party_id: $party_id) {
        party_id
      }
    }
  `);
  

export type PartyId = PartiesQuery["identity_parties"]

export class PartyRepository extends EntityRepository<
    PartiesQueryVariables, CreateQueryResult<PartiesQuery, Error>, 
    string, CreateQueryResult<PartyQuery, Error>, 
    CreatePartyMutation["insert_identity_parties_one"], 
    UpdatePartyMutation["update_identity_parties_by_pk"],
    DeletePartyMutation["delete_identity_parties_by_pk"]> {

    constructor() {
      super(PARTY_FIND_ALL, PARTY_FIND_ONE, CREATE_PARTY, UPDATE_PARTY, DELETE_PARTY, "parties");
    }
  }