import { defineField, defineType } from "sanity";

export default defineType({
  name: "featured",
  title: "Featured",
  type: "document",
  fields: [
    defineField({
      name: "featuredOne",
      title: "Featured One",
      type: "reference",
      to: { type: "portfolio" },
    }),
    defineField({
      name: "featuredTwo",
      title: "Featured Two",
      type: "reference",
      to: { type: "portfolio" },
    }),
    defineField({
      name: "featuredThree",
      title: "Featured Three",
      type: "reference",
      to: { type: "portfolio" },
    }),
    defineField({
      name: "featuredFour",
      title: "Featured Four",
      type: "reference",
      to: { type: "portfolio" },
    }),
    defineField({
      name: "featuredFive",
      title: "Featured Five",
      type: "reference",
      to: { type: "portfolio" },
    }),
  ],
});
