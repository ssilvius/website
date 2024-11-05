import { ContentPostingSchema } from "@/types/content"

export function SchemaJsonLd({ schema }: { schema: ContentPostingSchema }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  )
}