import Post from "../../../components/news/Post"

export const getStaticProps = async (context) => {
  const slug = context.params?.slug
  const draftKey = context.previewData?.draftKey
  const content = await fetch(
    `https://rura.microcms.io/api/v1/news/${slug}${
      draftKey !== undefined ? `?draftKey=${draftKey}` : ""
    }`,
    {
      headers: {
        "X-MICROCMS-API-KEY": process.env.NEXT_PUBLIC_MICRO_CMS_API_KEY || "",
      },
    }
  ).then((res) => res.json())
  return {
    props: {
      content,
    },
  }
}

const Preview = (content) => {
  if (!content) {
    return <>エラー</>
  }
  return (
    <div>
      <Post
        id={content.id}
        title={content.title}
        publishedAt={content.publishedAt}
        editorContent={content.editorContent}
      />
    </div>
  )
}

export default Preview
