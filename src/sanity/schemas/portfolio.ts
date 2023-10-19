import { defineField, defineType } from "sanity";

export default defineType({
  name: "portfolio",
  title: "Portfolio",
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
  fieldsets: [
    {
      name: "heroSection",
      title: "Hero Section",
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      name: "overviewSection",
      title: "Overview Section",
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      name: "quoteSection",
      title: "Quote Section",
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      name: "imagesSection",
      title: "Images Section",
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "hero",
      fieldset: "heroSection",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "hero",
      fieldset: "heroSection",
      validation: (Rule) => Rule.required(),
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
      fieldset: "heroSection",
      validation: (Rule) => Rule.required(),
      to: { type: "author" },
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "reference",
      group: "hero",
      fieldset: "heroSection",
      validation: (Rule) => Rule.required(),
      to: { type: "client" },
    }),
    defineField({
      name: "CompletedAt",
      title: "Completed",
      type: "string",
      group: "hero",
      fieldset: "heroSection",
    }),
    defineField({
      name: "websiteUrl",
      title: "Website URL",
      type: "url",
      group: "hero",
      fieldset: "heroSection",
    }),
    defineField({
      name: "githubUrl",
      title: "Github URL",
      type: "url",
      group: "hero",
      fieldset: "heroSection",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      group: "hero",
      fieldset: "heroSection",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "theChallenge",
      title: "The Challenge",
      type: "text",
      group: "overview",
      fieldset: "overviewSection",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "myApproach",
      title: "My Approach",
      type: "text",
      group: "overview",
      fieldset: "overviewSection",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      group: "overview",
      fieldset: "overviewSection",
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
      name: "featuresImage",
      title: "Features image",
      type: "image",
      group: "features",
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
      name: "hotspots",
      type: "array",
      group: "features",
      of: [
        defineField({
          name: "spot",
          type: "object",
          fieldsets: [{ name: "position", options: { columns: 2 } }],
          fields: [
            { name: "details", type: "text", rows: 2 },
            {
              name: "x",
              type: "number",
              readOnly: true,
              fieldset: "position",
              initialValue: 50,
              validation: (Rule) => Rule.required().min(0).max(100),
            },
            {
              name: "y",
              type: "number",
              readOnly: true,
              fieldset: "position",
              initialValue: 50,
              validation: (Rule) => Rule.required().min(0).max(100),
            },
          ],
          preview: {
            select: {
              title: "details",
              x: "x",
              y: "y",
            },
            prepare({ title, x, y }) {
              return {
                title,
                subtitle: x && y ? `${x}% x ${y}%` : `No position set`,
              };
            },
          },
        }),
      ],
      options: {
        imageHotspot: {
          imagePath: "featuresImage",
        },
      },
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      group: "quote",
      fieldset: "quoteSection",
    }),
    defineField({
      name: "quoteName",
      title: "Quote Name",
      type: "string",
      group: "quote",
      fieldset: "quoteSection",
    }),
    defineField({
      name: "firstImage",
      title: "First image",
      type: "image",
      group: "images",
      fieldset: "imagesSection",
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
      fieldset: "imagesSection",
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
      fieldset: "imagesSection",
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
      fieldset: "imagesSection",
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
      validation: (Rule) => Rule.required(),
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "featureImage",
      title: "feature image",
      type: "image",
      validation: (Rule) => Rule.required(),
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
