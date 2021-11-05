interface Post {
  id: string
  title: string
}

const serviceId: string = process.env.NEXT_PUBLIC_MICRO_CMS_SERVICE_ID
const baseUrl: string = `https://${serviceId}.microcms.io/api/v1`

const apiKey: string = process.env.NEXT_PUBLIC_MICRO_CMS_API_KEY
const writeApiKey: string = process.env.NEXT_PUBLIC_MICRO_CMS_WRITE_API_KEY

const params = (method: string, data?: {}) => {
  if (data) {
    return {
      method: method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "X-WRITE-API-KEY": writeApiKey,
      },
      body: JSON.stringify(data),
    }
  } else {
    return {
      method: method,
      headers: {
        "X-API-KEY": apiKey,
      },
    }
  }
}

// 記事を全件取得
export const fetchAllPosts = async (): Promise<Post[]> => {
  const data = await fetch(`${baseUrl}/news`, params("GET"))
    .then((res) => res.json())
    .catch(() => null)

  if (data.contents) {
    return data.contents
  }
}

// IDから個別の記事を取得
export const fetchPostById = async (id: string): Promise<Post> => {
  const data = await fetch(`${baseUrl}/news/${id}`, params("GET"))
    .then((res) => res.json())
    .catch(() => null)

  if (data) {
    return data
  }
}

// ページ番号によって記事を取得
export const fetchPostsByPageNumber = async (
  pageNumber: number,
  limit: number
): Promise<Post[]> => {
  const data = await fetch(
    `${baseUrl}/news?offset=${(pageNumber - 1) * 10}&limit=${limit}`,
    params("GET")
  )
    .then((res) => res.json())
    .catch(() => null)

  if (data.contents) {
    return data.contents
  }
}

// 最新の記事のみを取得
export const fetchLatestPosts = async (limit: number): Promise<Post[]> => {
  const data = await fetch(`${baseUrl}/news?limit=${limit}`, params("GET"))
    .then((res) => res.json())
    .catch(() => null)

  if (data.contents) {
    return data.contents
  }
}

import { createClient } from "microcms-js-sdk" //ES6

export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_MICRO_CMS_SERVICE_ID,
  apiKey: process.env.NEXT_PUBLIC_MICRO_CMS_API_KEY,
})
const fields = "id,title,publishedAt"

const getAllContents = async (offset = 0, limit = 10) => {
  const data = await client.get({
    endpoint: `news`,
    queries: {
      offset,
      limit,
      fields,
    },
  })

  if (data.offset + data.limit <= data.totalCount) {
    const contents = await getAllContents(data.offset + data.limit, data.limit)
    return [...data.contents, ...contents]
  }

  return data.contents
}
const getCaseContents = async (offset = 0, limit = 10) => {
  const caseData = await client.get({
    endpoint: `case`,
    queries: {},
  })

  if (caseData.offset + caseData.limit <= caseData.totalCount) {
    const contents = await getCaseContents(
      caseData.offset + caseData.limit,
      caseData.limit
    )
    return [...caseData.contents, ...contents]
  }

  return caseData.contents
}
const getRecommendContents = async (offset = 0, limit = 10) => {
  const recommendData = await client.get({
    endpoint: `recommend`,
    queries: {},
  })

  if (recommendData.offset + recommendData.limit <= recommendData.totalCount) {
    const contents = await getRecommendContents(
      recommendData.offset + recommendData.limit,
      recommendData.limit
    )
    return [...recommendData.contents, ...contents]
  }

  return recommendData.contents
}
export { getAllContents, getCaseContents, getRecommendContents }
