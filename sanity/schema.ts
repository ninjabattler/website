import { type SchemaTypeDefinition } from "sanity";
import article from "./schemas/article";
import { titleCard } from "./types/titleCard";
import { quote } from "./types/quote";
import { underline } from "./types/underline";
import { dialogue } from "./types/dialogue";
import { listItem } from "./types/listItem";
import { codeBlock } from "./types/codeBlock";
import { subtitleCard } from "./types/subtitleCard";
import { picture } from "./types/picture";
import { spoiler } from "./types/spoiler";
import tag from "./schemas/tag";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    article,
    tag,
    titleCard,
    quote,
    underline,
    dialogue,
    subtitleCard,
    listItem,
    codeBlock,
    picture,
    spoiler,
  ],
};
