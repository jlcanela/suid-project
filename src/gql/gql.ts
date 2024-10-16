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
    "\n      query Parties {\n        identity_parties {\n          party_id\n          first_name\n          last_name\n        }\n      }\n  ": types.PartiesDocument,
    "\n    query Party($id: Int!) {\n      identity_parties_by_pk(party_id: $id) {\n        party_id\n        first_name\n        last_name\n      }\n    }\n  ": types.PartyDocument,
    "\n    mutation CreateParty($first_name: String!, $last_name: String!) {\n      insert_identity_parties_one(object: {first_name: $first_name, last_name: $last_name, idp_id: \"\" }) {\n        first_name\n        last_name\n      }\n    }\n  ": types.CreatePartyDocument,
    "\n    mutation UpdateParty($party_id: Int!, $first_name: String!, $last_name: String!) {\n      update_identity_parties_by_pk(pk_columns: {party_id: $party_id}, _set: {first_name: $first_name, last_name: $last_name}) {\n        party_id\n        first_name\n        last_name\n      }\n    }\n  ": types.UpdatePartyDocument,
    "\n    mutation DeleteParty($party_id: Int!) {\n      delete_identity_parties_by_pk(party_id: $party_id) {\n        party_id\n      }\n    }\n  ": types.DeletePartyDocument,
    "\n    query Projects {\n      projects {\n        id\n        name\n        description\n      }\n    }\n  ": types.ProjectsDocument,
    "\n  query Project($id: Int!) {\n    projects_by_pk(id: $id) {\n      id\n      name\n      description\n    }\n  }\n": types.ProjectDocument,
    "\n  mutation CreateProject($name: String!, $description: String!, $owner: Int!) {\n    insert_projects_one(\n      object: { name: $name, description: $description, owner: $owner }\n    ) {\n      id\n      name\n      description\n      owner\n    }\n  }\n": types.CreateProjectDocument,
    "\n  mutation UpdateProject($id: Int!, $name: String!, $description: String!) {\n    update_projects_by_pk(\n      _set: { name: $name, description: $description }\n      pk_columns: { id: $id }\n    ) {\n      id\n      name\n      description\n    }\n  }\n": types.UpdateProjectDocument,
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
export function graphql(source: "\n      query Parties {\n        identity_parties {\n          party_id\n          first_name\n          last_name\n        }\n      }\n  "): (typeof documents)["\n      query Parties {\n        identity_parties {\n          party_id\n          first_name\n          last_name\n        }\n      }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Party($id: Int!) {\n      identity_parties_by_pk(party_id: $id) {\n        party_id\n        first_name\n        last_name\n      }\n    }\n  "): (typeof documents)["\n    query Party($id: Int!) {\n      identity_parties_by_pk(party_id: $id) {\n        party_id\n        first_name\n        last_name\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateParty($first_name: String!, $last_name: String!) {\n      insert_identity_parties_one(object: {first_name: $first_name, last_name: $last_name, idp_id: \"\" }) {\n        first_name\n        last_name\n      }\n    }\n  "): (typeof documents)["\n    mutation CreateParty($first_name: String!, $last_name: String!) {\n      insert_identity_parties_one(object: {first_name: $first_name, last_name: $last_name, idp_id: \"\" }) {\n        first_name\n        last_name\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateParty($party_id: Int!, $first_name: String!, $last_name: String!) {\n      update_identity_parties_by_pk(pk_columns: {party_id: $party_id}, _set: {first_name: $first_name, last_name: $last_name}) {\n        party_id\n        first_name\n        last_name\n      }\n    }\n  "): (typeof documents)["\n    mutation UpdateParty($party_id: Int!, $first_name: String!, $last_name: String!) {\n      update_identity_parties_by_pk(pk_columns: {party_id: $party_id}, _set: {first_name: $first_name, last_name: $last_name}) {\n        party_id\n        first_name\n        last_name\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation DeleteParty($party_id: Int!) {\n      delete_identity_parties_by_pk(party_id: $party_id) {\n        party_id\n      }\n    }\n  "): (typeof documents)["\n    mutation DeleteParty($party_id: Int!) {\n      delete_identity_parties_by_pk(party_id: $party_id) {\n        party_id\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Projects {\n      projects {\n        id\n        name\n        description\n      }\n    }\n  "): (typeof documents)["\n    query Projects {\n      projects {\n        id\n        name\n        description\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Project($id: Int!) {\n    projects_by_pk(id: $id) {\n      id\n      name\n      description\n    }\n  }\n"): (typeof documents)["\n  query Project($id: Int!) {\n    projects_by_pk(id: $id) {\n      id\n      name\n      description\n    }\n  }\n"];
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
export function graphql(source: "\n  mutation DeleteProject($id: Int!) {\n    delete_projects_by_pk(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteProject($id: Int!) {\n    delete_projects_by_pk(id: $id) {\n      id\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;