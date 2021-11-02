import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"

import React, { useCallback } from "react"

import Posts from "../../../components/news/Posts"
import { getAllContents, fetchPostsByPageNumber } from "../../../lib/api"
import { Pagination } from "@material-ui/lab"

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllContents()

  const per_page = 10

  const range = (start: number, end: number) => {
    return [...Array(end - start + 1)].map((_, i) => start + i)
  }

  const paths = range(1, Math.ceil(allPosts.length / per_page)).map(
    (number) => `/news/page/${number}`
  )

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const currentPageNumber: number = Number(params.number)
  const limit: number = 10

  const postsByPageNumber = await fetchPostsByPageNumber(
    currentPageNumber,
    limit
  )
  const allPosts = await getAllContents()

  return {
    revalidate: 1,
    props: {
      currentPageNumber,
      postsByPageNumber,
      allPosts,
    },
  }
}

interface Posts {
  id: string
  title: string
  publishedAt: string
}

const NewsPage = ({ currentPageNumber, postsByPageNumber, allPosts }) => {
  const router = useRouter()

  const handleChangePage = useCallback(
    (_: React.ChangeEvent<unknown>, number: number) => {
      router.push(`${number}`)
    },
    [router]
  )

  const perPage: number = 10

  return (
    <>
      <div>
        <>
          {postsByPageNumber?.map((post: Posts) => (
            <div key={post.id}>
              <Posts
                id={post.id}
                title={post.title}
                publishedAt={post.publishedAt}
              />
            </div>
          ))}

          <Pagination
            count={Math.ceil(allPosts.length / perPage)}
            variant="outlined"
            page={currentPageNumber}
            onChange={handleChangePage}
          />
        </>
      </div>
    </>
  )
}

export default NewsPage
