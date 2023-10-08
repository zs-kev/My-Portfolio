import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  groups: [
    {
      name: "hero",
      title: "Hero",
    },
    {
      name: "overview",
      title: "Overview",
    },
    {
      name: "features",
      title: "Features",
    },
    {
      name: "quote",
      title: "Quote",
    },
    {
      name: "images",
      title: "Images",
    },
    {
      name: "final",
      title: "Final Words",
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "hero",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      group: "hero",
      to: { type: "author" },
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "reference",
      group: "hero",
      to: { type: "client" },
    }),
    defineField({
      name: "CompletedAt",
      title: "Completed",
      type: "datetime",
      group: "hero",
    }),
    defineField({
      name: "websiteUrl",
      title: "Website URL",
      type: "url",
      group: "hero",
    }),
    defineField({
      name: "githubUrl",
      title: "Github URL",
      type: "url",
      group: "hero",
    }),
    defineField({
      name: "theChallenge",
      title: "The Challenge",
      type: "text",
      group: "overview",
    }),
    defineField({
      name: "myApproach",
      title: "My Approach",
      type: "text",
      group: "overview",
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      group: "overview",
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
      name: "quote",
      title: "Quote",
      type: "text",
      group: "quote",
    }),
    defineField({
      name: "quoteName",
      title: "Quote Name",
      type: "text",
      group: "quote",
    }),
    defineField({
      name: "firstImage",
      title: "First image",
      type: "image",
      group: "images",
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
      name: "secondImage",
      title: "Second image",
      type: "image",
      group: "images",
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
      name: "thirdImage",
      title: "Third image",
      type: "image",
      group: "images",
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
      name: "fourthImage",
      title: "Fourth image",
      type: "image",
      group: "images",
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
      name: "finalWords",
      title: "Final Words",
      type: "text",
      group: "final",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      group: "hero",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    }),
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
