import { type SchemaTypeDefinition } from "sanity";
import article from "./schemas/article";
import tag from "./schemas/tag";
import { titleCard } from "./types/titleCard";
import { quote } from "./types/quote";
import { underline } from "./types/underline";
import { dialogue } from "./types/dialogue";
import { listItem } from "./types/listItem";
import { codeBlock } from "./types/codeBlock";
import { subtitleCard } from "./types/subtitleCard";
import { picture } from "./types/picture";
import { spoiler } from "./types/spoiler";
import { footnoteLink } from "./types/footnoteLink";
import post from "./schemas/post";
import { user, account, verificationToken } from "next-auth-sanity/schemas";
import comment from "./schemas/comment";
import userDetails from "./schemas/userDetails";
import like from "./schemas/like";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    article,
    post,
    tag,
    comment,
    like,
    userDetails,
    titleCard,
    quote,
    underline,
    dialogue,
    subtitleCard,
    listItem,
    codeBlock,
    picture,
    spoiler,
    footnoteLink,
    // User Schemas
    user,
    account,
    verificationToken,
  ],
};
