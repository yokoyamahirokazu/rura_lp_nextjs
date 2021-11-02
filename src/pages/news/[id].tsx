import { GetStaticPaths, GetStaticProps } from "next"

import Post from "../../components/news/Post"

import { getAllContents, fetchPostById } from "../../lib/api"

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllContents()
  const paths = posts.map(({ id }) => `/news/${id}`)

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id: string = String(params.id)
  const post = await fetchPostById(id)

  return {
    props: { post },
    revalidate: 1,
  }
}

interface Post {
  post: {
    id: string
    title: string
    publishedAt: string
    editorContent: HTMLElement
  }
}

const BlogId = ({ post }: Post) => {
  return (
    <div>
      <Post
        id={post.id}
        title={post.title}
        publishedAt={post.publishedAt}
        editorContent={post.editorContent}
      />
    </div>
  )
}

export default BlogId
