import {
  CreateProjectMutation,
  ProjectsQuery,
  ProjectsQueryVariables,
  DeleteProjectMutation,
  UpdateProjectMutation,
  ProjectQuery,
} from "../gql/graphql";

import { graphql } from "../gql";

import {
  CreateQueryResult,
} from "@tanstack/solid-query";
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

const DELETE_PROJECT = graphql(`
  mutation DeleteProject($id: Int!) {
    delete_projects_by_pk(id: $id) {
      id
    }
  }
`);


export type ProjectId = ProjectsQuery["projects"]

export class ProjectRepository extends EntityRepository<
    ProjectsQueryVariables, CreateQueryResult<ProjectsQuery, Error>, 
    string, CreateQueryResult<ProjectQuery, Error>, 
    CreateProjectMutation["insert_projects_one"], 
    UpdateProjectMutation["update_projects_by_pk"],
    DeleteProjectMutation["delete_projects_by_pk"]> {

    constructor() {
      super(PROJECT_FIND_ALL, PROJECT_FIND_ONE, CREATE_PROJECT, UPDATE_PROJECT, DELETE_PROJECT, "projects");
    }

    create(input: CreateProjectMutation["insert_projects_one"]): void {
      super.create({...input, "owner": 1});
    }
    
  }
