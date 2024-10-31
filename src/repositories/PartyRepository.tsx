import {
  CreatePartyMutation,
  PartiesQuery,
  PartiesQueryVariables,
  DeletePartyMutation,
  UpdatePartyMutation,
  PartyQuery,
  UpdatePartyRolesMutationVariables,
  ProjectPartyRolesQuery,
} from "../gql/graphql";

import { graphql } from "../gql";

import { createQuery, CreateQueryResult } from "@tanstack/solid-query";

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
      party_roles {
        role_type {
          description
          value
        }
      }
    }
    identity_role_type {
      description
      value
    }
  }
`);

const CREATE_PARTY = graphql(`
  mutation CreateParty($first_name: String!, $last_name: String!) {
    insert_identity_parties_one(
      object: { first_name: $first_name, last_name: $last_name, idp_id: "" }
    ) {
      first_name
      last_name
    }
  }
`);

const UPDATE_PARTY = graphql(`
  mutation UpdateParty(
    $party_id: Int!
    $first_name: String!
    $last_name: String!
  ) {
    update_identity_parties_by_pk(
      pk_columns: { party_id: $party_id }
      _set: { first_name: $first_name, last_name: $last_name }
    ) {
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

const UPDATE_PARTY_ROLES = graphql(`
 mutation UpdatePartyRoles($party_id: Int!, $role_type_ids_to_remove: [identity_role_type_enum!]!, $new_role_types: [identity_party_roles_insert_input!]!) {
    delete_identity_party_roles(
      where: { role_type_id: { _in: $role_type_ids_to_remove }, party_id: { _eq: $party_id } }
    ) {
      affected_rows
    }
    insert_identity_party_roles(
      objects: $new_role_types
    ) {
      affected_rows
    }
  }
`);

const PROJECT_PARTY_ROLES = graphql(`
  query ProjectPartyRoles {
  identity_parties(where: {party_roles_aggregate: {count: {predicate: {_gt: 0}}}}) {
    party_roles {
      party_role_id
      role_type {
        description
      }
    }
    name
  }
}
`);

export type PartyId = PartiesQuery["identity_parties"];
export type Party = PartyQuery["identity_parties_by_pk"];
export type RoleType = PartyQuery["identity_role_type"];

//type UpdatePartyRolesInput = UpdatePartyRolesMutation;
type TUpdatePartyRolesInput = UpdatePartyRolesMutationVariables;
export class PartyRepository extends EntityRepository<
  PartiesQueryVariables,
  CreateQueryResult<PartiesQuery, Error>,
  string,
  CreateQueryResult<PartyQuery, Error>,
  CreatePartyMutation["insert_identity_parties_one"],
  UpdatePartyMutation["update_identity_parties_by_pk"],
  DeletePartyMutation["delete_identity_parties_by_pk"]
> {
  constructor() {
    super(
      PARTY_FIND_ALL,
      PARTY_FIND_ONE,
      CREATE_PARTY,
      UPDATE_PARTY,
      DELETE_PARTY,
      "parties"
    );
  }

  updatePartyRolesMutation = this.createGraphQLMutation<UpdatePartyRolesMutationVariables, any>(UPDATE_PARTY_ROLES);
    
  updatePartyRoles(input: UpdatePartyRolesMutationVariables): void {
    this.updatePartyRolesMutation.mutate(input);
  }

  findAllPartyRolesQuery = () => () => this.createQueryInstance(PROJECT_PARTY_ROLES);

  findAllPartyRoles() {
    return createQuery(this.findAllPartyRolesQuery())  as unknown as ProjectPartyRolesQuery;
  }  

}
