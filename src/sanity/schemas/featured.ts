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
      // Required: the homepage and About page both read this slot. Publishing
      // the document without it used to break both pages.
      validation: (Rule) => Rule.required(),
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

    // The testimonial shown in the Selected Projects grid. It used to be
    // hardcoded in the component, so it could not be changed, dated or
    // replaced without a deploy.
    defineField({
      name: "testimonialQuote",
      title: "Testimonial",
      description:
        "Shown in the Selected Projects grid on the home page. Leave empty to hide the testimonial entirely.",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "testimonialName",
      title: "Testimonial — who said it",
      description:
        "Required if there is a quote — an unattributed testimonial carries no weight.",
      type: "string",
      validation: (Rule) =>
        Rule.custom((name, context) => {
          const quote = (context.document as any)?.testimonialQuote;
          if (quote && !name) return "Add who said this, or clear the quote.";
          return true;
        }),
    }),
    defineField({
      name: "testimonialRole",
      title: "Testimonial — role or company",
      description: 'Optional, e.g. "Founder, Acme". Shown under the name.',
      type: "string",
    }),
  ],

  preview: {
    select: {
      first: "featuredOne.title",
    },
    prepare({ first }) {
      return {
        title: "Selected Projects",
        subtitle: first ? `Featured: ${first}` : "No project selected yet",
      };
    },
  },
});
