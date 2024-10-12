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
    "\n  mutation CreateProject($name: String!, $description: String!, $owner: Int!) {\n    insert_projects_one(\n      object: { name: $name, description: $description, owner: $owner }\n    ) {\n      id\n      name\n      description\n      owner\n    }\n  }\n": types.CreateProjectDocument,
    "\nmutation DeleteProject($id: Int!) {\n  delete_projects_by_pk(id: $id) {\n    id\n  }\n}": types.DeleteProjectDocument,
    "\n    query Projects {\n      projects {\n        id\n        name\n        description\n      }\n    }\n  ": types.ProjectsDocument,
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
export function graphql(source: "\n  mutation CreateProject($name: String!, $description: String!, $owner: Int!) {\n    insert_projects_one(\n      object: { name: $name, description: $description, owner: $owner }\n    ) {\n      id\n      name\n      description\n      owner\n    }\n  }\n"): (typeof documents)["\n  mutation CreateProject($name: String!, $description: String!, $owner: Int!) {\n    insert_projects_one(\n      object: { name: $name, description: $description, owner: $owner }\n    ) {\n      id\n      name\n      description\n      owner\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation DeleteProject($id: Int!) {\n  delete_projects_by_pk(id: $id) {\n    id\n  }\n}"): (typeof documents)["\nmutation DeleteProject($id: Int!) {\n  delete_projects_by_pk(id: $id) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Projects {\n      projects {\n        id\n        name\n        description\n      }\n    }\n  "): (typeof documents)["\n    query Projects {\n      projects {\n        id\n        name\n        description\n      }\n    }\n  "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;