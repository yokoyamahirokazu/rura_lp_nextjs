import Post from "../../components/news/Post"
import { GetStaticPaths, GetStaticProps } from "next"

import { getAllContents, fetchPostById } from "../../lib/api"

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllContents()
  const paths = posts.map(({ id }) => `/preview/${id}`)

  return {
    paths,
    fallback: false,
  }
}

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

interface Post {
  content: {
    id: string
    title: string
    publishedAt: string
    editorContent: HTMLElement
  }
}

const BlogId = ({ content }: Post) => {
  if (!content) {
    return <div>エラー</div>
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

export default BlogId
