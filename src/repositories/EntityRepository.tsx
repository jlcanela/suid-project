  import { request } from "graphql-request";
  import graphQLConfig from './GraphQLConfig.json';
  
  import {
    createMutation,
    createQuery,
    useQueryClient,
  } from "@tanstack/solid-query";

// Define a generic interface for the repository
export interface EntityDatasource<TFindInput, TFindOutput, TFindOneInput, TFindOneOutput, TCreateInput, TUpdateInput, TDeleteInput> {
    findOne: (input: TFindOneInput) => TFindOneOutput;
    findAll: (input: TFindInput) => TFindOutput;
    create: (input: TCreateInput) => void;
    update: (input: TUpdateInput) => void;
    delete: (input: TDeleteInput) => void;
  }
  
// Generic EntityRepository class
export class EntityRepository<TFindInput, TFindOutput, TFindOneInput, TFindOneOutput, TCreateInput, TUpdateInput, TDeleteInput> 
  implements EntityDatasource<TFindInput, TFindOutput, TFindOneInput, TFindOneOutput, TCreateInput, TUpdateInput, TDeleteInput> {
    protected queryClient = useQueryClient();
    protected createMutationInstance;
    protected updateMutationInstance; 
    protected deleteMutationInstance;
    protected findAllQueryInstance;
    protected findOneQueryInstance;

    constructor(
      private findAllDocument: any,
      private findOneDocument: any,
      private createDocument: any,
      private updateDocument: any,
      private deleteDocument: any,
      private entityKey: string
    ) {
        this.findAllDocument = findAllDocument; 
        this.findOneDocument = findOneDocument;
        this.createDocument = createDocument;
        this.updateDocument = updateDocument;
        this.deleteDocument = deleteDocument;
        this.entityKey = entityKey;
    
        this.createMutationInstance = this.createGraphQLMutation<TCreateInput, any>(this.createDocument);
        this.updateMutationInstance = this.createGraphQLMutation<TUpdateInput, any>(this.updateDocument);
        this.deleteMutationInstance = this.createGraphQLMutation<TDeleteInput, any>(this.deleteDocument);
        this.findAllQueryInstance = (input) => () => this.createQueryInstance(this.findAllDocument, input);
        this.findOneQueryInstance = (input) => () => this.createQueryInstance(this.findOneDocument, input);
    }
  
    protected createGraphQLMutation<TVariables, TData>(
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
          this.queryClient.resetQueries({ queryKey: [this.entityKey] });
        },
        onError: (err) => {
          console.log(err);
        },
      }));
    }

    protected createQueryInstance(document: any, input?: any) {
      return {
        queryKey: input ? [this.entityKey, input] : [this.entityKey],
        queryFn: async () => {
          try {
            return await request({
              ...graphQLConfig,
              document: document,
              ...(input && { variables: { id: input } }),
            });
          } catch (err) {
            console.log(err);
            throw err;
          }
        },
      };
    }
  
    findAll(input: TFindInput): TFindOutput {
      return createQuery(this.findAllQueryInstance())  as unknown as TFindOutput;
    }
  
    findOne(input: TFindOneInput): TFindOneOutput {
      return createQuery(this.findOneQueryInstance(input))  as unknown as TFindOneOutput;
    }
  
    create(input: TCreateInput): void {
      this.createMutationInstance.mutate(input);
    }
  
    update(input: TUpdateInput): void {
      this.updateMutationInstance.mutate(input);
    }
  
    delete(input: TDeleteInput): void {
      this.deleteMutationInstance.mutate(input);
    }
  }

  