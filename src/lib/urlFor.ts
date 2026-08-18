import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "./sanity.client";

// @sanity/image-url v2 deprecated the default export in favour of this named one.
const builder = createImageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

export default urlFor;
