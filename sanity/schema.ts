import { type SchemaTypeDefinition } from 'sanity'
import Article from './schemas/article'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Article],
}
