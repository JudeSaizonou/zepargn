import { defineArrayMember, defineField, defineType } from "sanity";

const categoryOptions = [
  { title: "Épargne", value: "epargne" },
  { title: "Investissement", value: "investissement" },
  { title: "Bourse", value: "bourse" },
  { title: "Immobilier", value: "immobilier" },
  { title: "Banques", value: "banques" },
  { title: "SGI", value: "sgi" },
  { title: "Débuter", value: "debuter" }
];

export const educationArticleSchema = defineType({
  name: "educationArticle",
  title: "Article Éducation",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (rule) => rule.required().min(8).max(120)
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "subtitle",
      title: "Sous-titre",
      type: "string",
      validation: (rule) => rule.max(180)
    }),
    defineField({
      name: "excerpt",
      title: "Résumé court",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().min(30).max(260)
    }),
    defineField({
      name: "category",
      title: "Catégorie",
      type: "string",
      options: {
        list: categoryOptions,
        layout: "dropdown"
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "readingTime",
      title: "Temps de lecture",
      type: "string",
      initialValue: "5 min",
      validation: (rule) => rule.required().max(20)
    }),
    defineField({
      name: "date",
      title: "Date de publication",
      type: "date",
      options: {
        dateFormat: "YYYY-MM-DD"
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "authorName",
      title: "Auteur",
      type: "string",
      initialValue: "Équipe Zepargn",
      validation: (rule) => rule.required().max(80)
    }),
    defineField({
      name: "coverImage",
      title: "Image de couverture",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "contentBlocks",
      title: "Corps de l'article",
      type: "array",
      of: [
        defineArrayMember({
          name: "h2Block",
          title: "Titre H2",
          type: "object",
          fields: [
            defineField({
              name: "text",
              title: "Texte",
              type: "string",
              validation: (rule) => rule.required()
            })
          ],
          preview: {
            select: { text: "text" },
            prepare: ({ text }) => ({ title: text, subtitle: "H2" })
          }
        }),
        defineArrayMember({
          name: "h3Block",
          title: "Titre H3",
          type: "object",
          fields: [
            defineField({
              name: "text",
              title: "Texte",
              type: "string",
              validation: (rule) => rule.required()
            })
          ],
          preview: {
            select: { text: "text" },
            prepare: ({ text }) => ({ title: text, subtitle: "H3" })
          }
        }),
        defineArrayMember({
          name: "paragraphBlock",
          title: "Paragraphe",
          type: "object",
          fields: [
            defineField({
              name: "text",
              title: "Texte",
              type: "text",
              rows: 4,
              validation: (rule) => rule.required()
            })
          ],
          preview: {
            select: { text: "text" },
            prepare: ({ text }) => ({
              title: text ? `${text.slice(0, 80)}${text.length > 80 ? "..." : ""}` : "Paragraphe",
              subtitle: "Paragraphe"
            })
          }
        }),
        defineArrayMember({
          name: "listBlock",
          title: "Liste",
          type: "object",
          fields: [
            defineField({
              name: "items",
              title: "Éléments",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
              validation: (rule) => rule.required().min(1)
            })
          ],
          preview: {
            select: { items: "items" },
            prepare: ({ items }) => ({
              title: `${items?.length ?? 0} point(s)`,
              subtitle: "Liste"
            })
          }
        }),
        defineArrayMember({
          name: "imageBlock",
          title: "Image",
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              validation: (rule) => rule.required()
            }),
            defineField({
              name: "alt",
              title: "Texte alternatif",
              type: "string",
              validation: (rule) => rule.required().max(160)
            }),
            defineField({
              name: "caption",
              title: "Légende",
              type: "string",
              validation: (rule) => rule.max(160)
            })
          ],
          preview: {
            select: {
              title: "caption",
              media: "image"
            },
            prepare: ({ title, media }) => ({
              title: title || "Image",
              subtitle: "Image",
              media
            })
          }
        }),
        defineArrayMember({
          name: "quoteBlock",
          title: "Citation",
          type: "object",
          fields: [
            defineField({
              name: "text",
              title: "Texte",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required()
            })
          ],
          preview: {
            select: { text: "text" },
            prepare: ({ text }) => ({
              title: text ? `${text.slice(0, 80)}${text.length > 80 ? "..." : ""}` : "Citation",
              subtitle: "Citation"
            })
          }
        })
      ],
      validation: (rule) => rule.required().min(1)
    }),
    defineField({
      name: "keyTakeaways",
      title: "À retenir",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.required().min(1)
    }),
    defineField({
      name: "featured",
      title: "Article mis en avant",
      type: "boolean",
      initialValue: false
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" }
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      date: "date",
      media: "coverImage"
    },
    prepare: ({ title, subtitle, date, media }) => ({
      title,
      subtitle: [subtitle, date].filter(Boolean).join(" • "),
      media
    })
  }
});

