import { kvKeys } from '~/config/kv'
import { env } from '~/env.mjs'
import { redis } from '~/lib/redis'
import { getLatestBlogPosts } from '~/sanity/queries'

import { BlogPostCard } from './BlogPostCard'

export async function BlogPosts({ limit = 5 }) {
  // 获取最新的博客文章，限制数量为 limit，forDisplay 表示是否用于展示
  const posts = await getLatestBlogPosts({ limit, forDisplay: true }) || []
  
  // 获取每篇文章的 ID，用于后续获取浏览量
  const postIdKeys = posts.map(({ _id }) => kvKeys.postViews(_id))

  let views: number[] = []
  
  // 根据环境判断如何获取浏览量
  if (env.VERCEL_ENV === 'development') {
    // 在开发环境中，随机生成浏览量
    views = posts.map(() => Math.floor(Math.random() * 1000))
  } else {
    // 在生产环境中，从 Redis 获取实际的浏览量
    if (postIdKeys.length > 0) {
      views = await redis.mget<number[]>(...postIdKeys)
    }
  }

  return (
    <>
      {/* 遍历每篇文章并渲染 BlogPostCard 组件 */}
      {posts.map((post, idx) => (
        <BlogPostCard post={post} views={views[idx] ?? 0} key={post._id} />
      ))}
    </>
  )
}
