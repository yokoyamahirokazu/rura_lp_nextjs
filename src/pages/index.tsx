import { GetStaticProps } from "next"
import Link from "next/link"

import Posts from "../components/news/Posts"
import CaseContent from "../components/case/Cases"
import {
  fetchLatestPosts,
  getCaseContents,
  getRecommendContents,
} from "../lib/api"

interface Posts {
  id: string
  title: string
  publishedAt: string
}
interface CaseContent {
  id: string
  caseName: string
  caseType: string
  caseBody: string
  caseImg: {
    url: string
  }
  caseLogo1: {
    url: string
  }
  caseLogo2: {
    url: string
  }
}

export const getStaticProps: GetStaticProps = async () => {
  const latestPosts = await fetchLatestPosts(3) // トップページは最新の3件取得
  const caseItem = await getCaseContents()
  const recommendItem = await getRecommendContents()

  return {
    props: { latestPosts, caseItem, recommendItem },
    revalidate: 1,
  }
}

const Home = ({ latestPosts, caseItem, recommendItem }) => {
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

      {caseItem?.map((caseList: CaseContent) => (
        <div key={caseList.id}>
          <CaseContent
            id={caseList.id}
            caseName={caseList.caseName}
            caseType={caseList.caseType}
            caseBody={caseList.caseBody}
            caseImg={caseList.caseImg.url}
            caseLogo1={caseList.caseLogo1.url}
            caseLogo2={caseList.caseLogo2 && caseList.caseLogo2.url}
          />
        </div>
      ))}

      {recommendItem?.map((recommend) => (
        <div key={recommend.id}>
          {recommend.img.url}
          {recommend.company}
          {recommend.name}
          {recommend.body}
        </div>
      ))}
    </div>
  )
}

export default Home
