import type { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
  schema: 'project-schema.graphql',
  //https://swapi-graphql.netlify.app/.netlify/functions/index',
  documents: ['src/**/*.tsx', 'src/**/*.graphql'],
  ignoreNoDocuments: true,
  generates: {
    './src/gql/': {
      preset: 'client',
      // presetConfig: {
      //   fragmentMasking: { unmaskFunctionName: 'getFragmentData' }
      // },
      // config: {
      //   documentMode: 'string'
      // }
    },
    // './schema.graphql': {
    //   plugins: ['schema-ast'],
    //   config: {
    //     includeDirectives: true
    //   }
    // }
  }
}
 
export default config
