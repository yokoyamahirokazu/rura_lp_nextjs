import fetch from "node-fetch"

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  if (!req.query.slug) {
    return res.status(404).end()
  }
  const content = await fetch(
    `https://rura.microcms.io/api/v1/news/${req.query.slug}?fields=id&draftKey=${req.query.draftKey}`,
    {
      headers: {
        "X-MICROCMS-API-KEY": process.env.NEXT_PUBLIC_MICRO_CMS_API_KEY || "",
      },
    }
  )
    .then((res) => res.json())
    .catch((error) => null)

  if (!content) {
    return res.status(401).json({ message: "Invalid slug" })
  }

  res.setPreviewData({
    slug: content.id,
    draftKey: req.query.draftKey,
  })
  res.writeHead(307, { Location: `/preview/${content.id}` })
  res.end("Preview mode enabled")
}
