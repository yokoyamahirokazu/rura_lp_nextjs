import Link from "next/link"
import moment from "moment"

interface PostsProps {
  id: string
  title: string
  publishedAt: string
}

const Posts = ({ id, title, publishedAt }: PostsProps) => {
  return (
    <Link href="/news/[id]" as={`/news/${id}`} passHref>
      <a>
        <p>{title}</p>
        <p>{moment(publishedAt).format("Y.M.D")}</p>
      </a>
    </Link>
  )
}

export default Posts
