/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query Parties {\n    identity_parties {\n      party_id\n      first_name\n      last_name\n    }\n  }\n": types.PartiesDocument,
    "\n  query Party($id: Int!) {\n    identity_parties_by_pk(party_id: $id) {\n      party_id\n      first_name\n      last_name\n      party_roles {\n        role_type {\n          description\n          value\n        }\n      }\n    }\n    identity_role_type {\n      description\n      value\n    }\n  }\n": types.PartyDocument,
    "\n  mutation CreateParty($first_name: String!, $last_name: String!) {\n    insert_identity_parties_one(\n      object: { first_name: $first_name, last_name: $last_name, idp_id: \"\" }\n    ) {\n      first_name\n      last_name\n    }\n  }\n": types.CreatePartyDocument,
    "\n  mutation UpdateParty(\n    $party_id: Int!\n    $first_name: String!\n    $last_name: String!\n  ) {\n    update_identity_parties_by_pk(\n      pk_columns: { party_id: $party_id }\n      _set: { first_name: $first_name, last_name: $last_name }\n    ) {\n      party_id\n      first_name\n      last_name\n    }\n  }\n": types.UpdatePartyDocument,
    "\n  mutation DeleteParty($party_id: Int!) {\n    delete_identity_parties_by_pk(party_id: $party_id) {\n      party_id\n    }\n  }\n": types.DeletePartyDocument,
    "\n mutation UpdatePartyRoles($party_id: Int!, $role_type_ids_to_remove: [identity_role_type_enum!]!, $new_role_types: [identity_party_roles_insert_input!]!) {\n    delete_identity_party_roles(\n      where: { role_type_id: { _in: $role_type_ids_to_remove }, party_id: { _eq: $party_id } }\n    ) {\n      affected_rows\n    }\n    insert_identity_party_roles(\n      objects: $new_role_types\n    ) {\n      affected_rows\n    }\n  }\n": types.UpdatePartyRolesDocument,
    "\n  query ProjectPartyRoles {\n  identity_parties(where: {party_roles_aggregate: {count: {predicate: {_gt: 0}}}}) {\n    party_roles {\n      party_role_id\n      role_type {\n        description\n      }\n    }\n    name\n  }\n}\n": types.ProjectPartyRolesDocument,
    "\n  query Projects {\n    projects {\n      id\n      name\n      description\n    }\n  }\n": types.ProjectsDocument,
    "\n  query Project($id: Int!) {\n    projects_by_pk(id: $id) {\n      id\n      name\n      description\n      project_assignments {\n        party_role {\n          party_role_id\n          party {\n            name\n            party_id\n          }\n        }\n      }\n      owner_party {\n        name\n        party_id\n      }\n    }\n    identity_parties(\n      where: { party_roles_aggregate: { count: { predicate: { _gt: 0 } } } }\n    ) {\n      party_roles {\n        party_role_id\n        role_type {\n          description\n        }\n      }\n      name\n      party_id\n    }\n  }\n": types.ProjectDocument,
    "\n  mutation CreateProject($name: String!, $description: String!, $owner: Int!) {\n    insert_projects_one(\n      object: { name: $name, description: $description, owner: $owner }\n    ) {\n      id\n      name\n      description\n      owner\n    }\n  }\n": types.CreateProjectDocument,
    "\n  mutation UpdateProject($id: Int!, $name: String!, $description: String!) {\n    update_projects_by_pk(\n      _set: { name: $name, description: $description }\n      pk_columns: { id: $id }\n    ) {\n      id\n      name\n      description\n    }\n  }\n": types.UpdateProjectDocument,
    "\nmutation UpdateProjectAssignements($project_id: Int!, $to_remove: [Int!]!, $to_add: [project_assignments_insert_input!]!) {\n  delete_project_assignments(where: {party_role_id: {_in: $to_remove}, project_id: {_eq: $project_id}}) {\n    affected_rows\n  }\n  insert_project_assignments(objects: $to_add) {\n    affected_rows\n  }\n}\n": types.UpdateProjectAssignementsDocument,
    "\n  mutation DeleteProject($id: Int!) {\n    delete_projects_by_pk(id: $id) {\n      id\n    }\n  }\n": types.DeleteProjectDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Parties {\n    identity_parties {\n      party_id\n      first_name\n      last_name\n    }\n  }\n"): (typeof documents)["\n  query Parties {\n    identity_parties {\n      party_id\n      first_name\n      last_name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Party($id: Int!) {\n    identity_parties_by_pk(party_id: $id) {\n      party_id\n      first_name\n      last_name\n      party_roles {\n        role_type {\n          description\n          value\n        }\n      }\n    }\n    identity_role_type {\n      description\n      value\n    }\n  }\n"): (typeof documents)["\n  query Party($id: Int!) {\n    identity_parties_by_pk(party_id: $id) {\n      party_id\n      first_name\n      last_name\n      party_roles {\n        role_type {\n          description\n          value\n        }\n      }\n    }\n    identity_role_type {\n      description\n      value\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateParty($first_name: String!, $last_name: String!) {\n    insert_identity_parties_one(\n      object: { first_name: $first_name, last_name: $last_name, idp_id: \"\" }\n    ) {\n      first_name\n      last_name\n    }\n  }\n"): (typeof documents)["\n  mutation CreateParty($first_name: String!, $last_name: String!) {\n    insert_identity_parties_one(\n      object: { first_name: $first_name, last_name: $last_name, idp_id: \"\" }\n    ) {\n      first_name\n      last_name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateParty(\n    $party_id: Int!\n    $first_name: String!\n    $last_name: String!\n  ) {\n    update_identity_parties_by_pk(\n      pk_columns: { party_id: $party_id }\n      _set: { first_name: $first_name, last_name: $last_name }\n    ) {\n      party_id\n      first_name\n      last_name\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateParty(\n    $party_id: Int!\n    $first_name: String!\n    $last_name: String!\n  ) {\n    update_identity_parties_by_pk(\n      pk_columns: { party_id: $party_id }\n      _set: { first_name: $first_name, last_name: $last_name }\n    ) {\n      party_id\n      first_name\n      last_name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteParty($party_id: Int!) {\n    delete_identity_parties_by_pk(party_id: $party_id) {\n      party_id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteParty($party_id: Int!) {\n    delete_identity_parties_by_pk(party_id: $party_id) {\n      party_id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n mutation UpdatePartyRoles($party_id: Int!, $role_type_ids_to_remove: [identity_role_type_enum!]!, $new_role_types: [identity_party_roles_insert_input!]!) {\n    delete_identity_party_roles(\n      where: { role_type_id: { _in: $role_type_ids_to_remove }, party_id: { _eq: $party_id } }\n    ) {\n      affected_rows\n    }\n    insert_identity_party_roles(\n      objects: $new_role_types\n    ) {\n      affected_rows\n    }\n  }\n"): (typeof documents)["\n mutation UpdatePartyRoles($party_id: Int!, $role_type_ids_to_remove: [identity_role_type_enum!]!, $new_role_types: [identity_party_roles_insert_input!]!) {\n    delete_identity_party_roles(\n      where: { role_type_id: { _in: $role_type_ids_to_remove }, party_id: { _eq: $party_id } }\n    ) {\n      affected_rows\n    }\n    insert_identity_party_roles(\n      objects: $new_role_types\n    ) {\n      affected_rows\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ProjectPartyRoles {\n  identity_parties(where: {party_roles_aggregate: {count: {predicate: {_gt: 0}}}}) {\n    party_roles {\n      party_role_id\n      role_type {\n        description\n      }\n    }\n    name\n  }\n}\n"): (typeof documents)["\n  query ProjectPartyRoles {\n  identity_parties(where: {party_roles_aggregate: {count: {predicate: {_gt: 0}}}}) {\n    party_roles {\n      party_role_id\n      role_type {\n        description\n      }\n    }\n    name\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Projects {\n    projects {\n      id\n      name\n      description\n    }\n  }\n"): (typeof documents)["\n  query Projects {\n    projects {\n      id\n      name\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Project($id: Int!) {\n    projects_by_pk(id: $id) {\n      id\n      name\n      description\n      project_assignments {\n        party_role {\n          party_role_id\n          party {\n            name\n            party_id\n          }\n        }\n      }\n      owner_party {\n        name\n        party_id\n      }\n    }\n    identity_parties(\n      where: { party_roles_aggregate: { count: { predicate: { _gt: 0 } } } }\n    ) {\n      party_roles {\n        party_role_id\n        role_type {\n          description\n        }\n      }\n      name\n      party_id\n    }\n  }\n"): (typeof documents)["\n  query Project($id: Int!) {\n    projects_by_pk(id: $id) {\n      id\n      name\n      description\n      project_assignments {\n        party_role {\n          party_role_id\n          party {\n            name\n            party_id\n          }\n        }\n      }\n      owner_party {\n        name\n        party_id\n      }\n    }\n    identity_parties(\n      where: { party_roles_aggregate: { count: { predicate: { _gt: 0 } } } }\n    ) {\n      party_roles {\n        party_role_id\n        role_type {\n          description\n        }\n      }\n      name\n      party_id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateProject($name: String!, $description: String!, $owner: Int!) {\n    insert_projects_one(\n      object: { name: $name, description: $description, owner: $owner }\n    ) {\n      id\n      name\n      description\n      owner\n    }\n  }\n"): (typeof documents)["\n  mutation CreateProject($name: String!, $description: String!, $owner: Int!) {\n    insert_projects_one(\n      object: { name: $name, description: $description, owner: $owner }\n    ) {\n      id\n      name\n      description\n      owner\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateProject($id: Int!, $name: String!, $description: String!) {\n    update_projects_by_pk(\n      _set: { name: $name, description: $description }\n      pk_columns: { id: $id }\n    ) {\n      id\n      name\n      description\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateProject($id: Int!, $name: String!, $description: String!) {\n    update_projects_by_pk(\n      _set: { name: $name, description: $description }\n      pk_columns: { id: $id }\n    ) {\n      id\n      name\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation UpdateProjectAssignements($project_id: Int!, $to_remove: [Int!]!, $to_add: [project_assignments_insert_input!]!) {\n  delete_project_assignments(where: {party_role_id: {_in: $to_remove}, project_id: {_eq: $project_id}}) {\n    affected_rows\n  }\n  insert_project_assignments(objects: $to_add) {\n    affected_rows\n  }\n}\n"): (typeof documents)["\nmutation UpdateProjectAssignements($project_id: Int!, $to_remove: [Int!]!, $to_add: [project_assignments_insert_input!]!) {\n  delete_project_assignments(where: {party_role_id: {_in: $to_remove}, project_id: {_eq: $project_id}}) {\n    affected_rows\n  }\n  insert_project_assignments(objects: $to_add) {\n    affected_rows\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteProject($id: Int!) {\n    delete_projects_by_pk(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteProject($id: Int!) {\n    delete_projects_by_pk(id: $id) {\n      id\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;