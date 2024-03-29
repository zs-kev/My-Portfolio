import { type SchemaTypeDefinition } from "sanity";

import author from "./schemas/author";
import blockContent from "./schemas/blockContent";
import category from "./schemas/category";
import client from "./schemas/client";
import featured from "./schemas/featured";
import post from "./schemas/portfolio";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, author, category, client, featured, blockContent],
};
