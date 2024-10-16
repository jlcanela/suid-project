import {
  CreateProjectMutation,
  ProjectsQuery,
  ProjectsQueryVariables,
  DeleteProjectMutation,
  UpdateProjectMutation,
  ProjectQuery,
} from "../gql/graphql";

import { graphql } from "../gql";
import { request } from "graphql-request";
import graphQLConfig from './GraphQLConfig.json';

import {
  createMutation,
  createQuery,
  CreateQueryResult,
  useQueryClient,
} from "@tanstack/solid-query";

const PROJECT_FIND_ALL = graphql(`
    query Projects {
      projects {
        id
        name
        description
      }
    }
  `);

const PROJECT_FIND = graphql(`
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

type ProjectFindInput = ProjectsQueryVariables;
type ProjectFindOutput = CreateQueryResult<ProjectsQuery, Error>;
type ProjectFindOneInput = string;
type ProjectFindOneOutput = CreateQueryResult<ProjectQuery, Error>;
type ProjectCreateInput = CreateProjectMutation["insert_projects_one"];
type ProjectCreateOutput = void;
type ProjectUpdateInput = UpdateProjectMutation["update_projects_by_pk"];
type ProjectUpdateOutput = void;
type ProjectDeleteInput = DeleteProjectMutation["delete_projects_by_pk"];
type ProjectDeleteOutput = void;
export type ProjectId = ProjectsQuery["projects"]

export interface ProjectDatasource {
  findOne: (input: ProjectFindOneInput) => ProjectFindOneOutput;
  findAll: (input: ProjectFindInput) => ProjectFindOutput;
  create: (input: ProjectCreateInput) => ProjectCreateOutput;
  update: (input: ProjectUpdateInput) => ProjectUpdateOutput;
  delete: (input: ProjectDeleteInput) => ProjectDeleteOutput;
}

export class ProjectRepository implements ProjectDatasource {

  queryClient = useQueryClient();

  createGraphQLMutation<TVariables, TData>(
    document: any,
    variablesMapper: (variables: TVariables) => Record<string, any> = (
      variables: TVariables
    ) => variables
  ) {
    return createMutation(() => ({
      mutationFn: (variables: TVariables) => {
        return request({
          ...graphQLConfig,
          document,
          variables: variablesMapper(variables),
        });
      },
      onSuccess: () => {
        this.queryClient.resetQueries({ queryKey: ["projects"] });
      },
      onError: (err) => {
        console.log(err);
      },
    }));
  }

  findAll(input: ProjectFindInput): ProjectFindOutput {
    return createQuery(() => ({
      queryKey: ["projects"],
      queryFn: async () =>
        await request({
          ...graphQLConfig,
          document: PROJECT_FIND_ALL,
        }),
    }));
  }

  findOne(input: ProjectFindOneInput): ProjectFindOneOutput {
    return createQuery(() => ({
      queryKey: ["projects", input],
      queryFn: async () =>
        await request<ProjectQuery>({
          ...graphQLConfig,
          document: PROJECT_FIND,
          variables: { id: parseInt(input) },
        }),
    }));
  }

  protected createProjectMutation = this.createGraphQLMutation<
    ProjectCreateInput,
    CreateProjectMutation
  >(CREATE_PROJECT, (variables) => ({
    name: variables.name,
    description: variables.description,
    owner: 1,
  }));

  create(input: ProjectCreateInput): ProjectCreateOutput {
    this.createProjectMutation.mutate(input);
  }

  protected updateProjectMutation = this.createGraphQLMutation<
    UpdateProjectMutation["update_projects_by_pk"],
    DeleteProjectMutation
  >(UPDATE_PROJECT, (variables) => ({
    id: variables.id,
    name: variables.name,
    description: variables.description,
  }));

  update(input: ProjectUpdateInput): ProjectUpdateOutput {
    this.updateProjectMutation.mutate(input);
  }

  deleteProjectMutation = this.createGraphQLMutation<
    DeleteProjectMutation["delete_projects_by_pk"],
    DeleteProjectMutation
  >(DELETE_PROJECT, (variables) => ({ id: variables.id }));

  delete(input: ProjectDeleteInput): ProjectCreateOutput {
    this.deleteProjectMutation.mutate(input);
  }
}
