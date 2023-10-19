import { defineField, defineType } from "sanity";

export default defineType({
  name: "client",
  title: "Client",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "clientColorPrimary",
      title: "Client color Primary",
      type: "color",
    }),
    defineField({
      name: "clientColorSecondary",
      title: "Client color Secondary",
      type: "color",
    }),
    defineField({
      name: "clientColorAlt",
      title: "Client color Alternative",
      type: "color",
    }),
    defineField({
      name: "mainLogo",
      title: "Main Logo",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "altLogo",
      title: "Alt Logo",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
  ],
});
