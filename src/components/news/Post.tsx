import moment from "moment"

interface PostProps {
  id: string
  title: string
  publishedAt: string
  editorContent: HTMLElement
}

const Post = ({ id, title, publishedAt, editorContent }: PostProps) => {
  return (
    <>
      <h1>{title}</h1>
      <p>{moment(publishedAt).format("Y.M.D")}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${editorContent}`,
        }}
      />
    </>
  )
}

export default Post
