import {
  CreateProjectMutation,
  ProjectsQuery,
  ProjectsQueryVariables,
  DeleteProjectMutation,
  UpdateProjectMutation,
  ProjectQuery,
  UpdateProjectAssignementsMutationVariables,
} from "../gql/graphql";

import { graphql } from "../gql";

import { CreateQueryResult } from "@tanstack/solid-query";
import { EntityRepository } from "./EntityRepository";

const PROJECT_FIND_ALL = graphql(`
  query Projects {
    projects {
      id
      name
      description
    }
  }
`);

const PROJECT_FIND_ONE = graphql(`
  query Project($id: Int!) {
    projects_by_pk(id: $id) {
      id
      name
      description
      project_assignments {
        party_role {
          party_role_id
          party {
            name
            party_id
          }
        }
      }
      owner_party {
        name
        party_id
      }
    }
    identity_parties(
      where: { party_roles_aggregate: { count: { predicate: { _gt: 0 } } } }
    ) {
      party_roles {
        party_role_id
        role_type {
          description
        }
      }
      name
      party_id
    }
  }
`);

const CREATE_PROJECT = graphql(`
  mutation CreateProject($name: String!, $description: String!, $owner: Int!) {
    insert_projects_one(
      object: { name: $name, description: $description, owner: $owner }
    ) {
      id
      name
      description
      owner
    }
  }
`);

const UPDATE_PROJECT = graphql(`
  mutation UpdateProject($id: Int!, $name: String!, $description: String!) {
    update_projects_by_pk(
      _set: { name: $name, description: $description }
      pk_columns: { id: $id }
    ) {
      id
      name
      description
    }
  }
`);

const UPDATE_PROJECT_ASSIGNMENTS = graphql(`
mutation UpdateProjectAssignements($project_id: Int!, $to_remove: [Int!]!, $to_add: [project_assignments_insert_input!]!) {
  delete_project_assignments(where: {party_role_id: {_in: $to_remove}, project_id: {_eq: $project_id}}) {
    affected_rows
  }
  insert_project_assignments(objects: $to_add) {
    affected_rows
  }
}
`);

const DELETE_PROJECT = graphql(`
  mutation DeleteProject($id: Int!) {
    delete_projects_by_pk(id: $id) {
      id
    }
  }
`);

export type ProjectId = ProjectsQuery["projects"];
export type Parties = ProjectQuery["identity_parties"];
export type ProjectAssignments = ProjectQuery["projects_by_pk"]["project_assignments"];
export type TUpdateProjectAssigmnentsVariable = UpdateProjectAssignementsMutationVariables

export class ProjectRepository extends EntityRepository<
  ProjectsQueryVariables,
  CreateQueryResult<ProjectsQuery, Error>,
  string,
  CreateQueryResult<ProjectQuery, Error>,
  CreateProjectMutation["insert_projects_one"],
  UpdateProjectMutation["update_projects_by_pk"],
  DeleteProjectMutation["delete_projects_by_pk"]
> {
  constructor(fetchJwt: () => Promise<string>) {
    super(
      fetchJwt,
      PROJECT_FIND_ALL,
      PROJECT_FIND_ONE,
      CREATE_PROJECT,
      UPDATE_PROJECT,
      DELETE_PROJECT,
      "projects"
    );
  }

  create(input: CreateProjectMutation["insert_projects_one"]): void {
    super.create({ ...input, owner: 1 });
  }

  updateProjectAssignmentsMutation = this.createGraphQLMutation<UpdateProjectAssignementsMutationVariables, any>(UPDATE_PROJECT_ASSIGNMENTS);
    
  updateProjectAssignments(input: UpdateProjectAssignementsMutationVariables): void {
    this.updateProjectAssignmentsMutation.mutate(input);
  }
}
