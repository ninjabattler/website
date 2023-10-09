import { type SchemaTypeDefinition } from 'sanity'
import article from './schemas/article'
import { titleCard } from './types/titleCard'
import { quote } from './types/quote'
import { underline } from './types/underline'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    article,
    titleCard,
    quote,
    underline
  ]
}
