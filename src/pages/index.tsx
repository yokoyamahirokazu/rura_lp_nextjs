import { GetStaticProps } from "next"
import Link from "next/link"

import Posts from "../components/news/Posts"
import { fetchLatestPosts } from "../lib/api"

interface Posts {
  id: string
  title: string
  publishedAt: string
}

export const getStaticProps: GetStaticProps = async () => {
  const latestPosts = await fetchLatestPosts(3) // トップページは最新の3件取得

  return {
    props: { latestPosts },
    revalidate: 1,
  }
}

const Home = ({ latestPosts }) => {
  return (
    <div>
      {latestPosts?.map((post: Posts) => (
        <div key={post.id}>
          <Posts
            id={post.id}
            title={post.title}
            publishedAt={post.publishedAt}
          />
        </div>
      ))}
      <Link href="/news/page/1">
        <a>All Posts</a>
      </Link>
    </div>
  )
}

export default Home
