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
      {title}
      {moment(publishedAt).format("Y.M.D")}
      <div
        dangerouslySetInnerHTML={{
          __html: `${editorContent}`,
        }}
      />
    </>
  )
}

export default Post
