import { parseDateTime } from '@zolplay/utils'
import Image from 'next/image'
import Link from 'next/link'

import {
  CalendarIcon,
  CursorClickIcon,
  HourglassIcon,
  ScriptIcon,
} from '~/assets'
import { prettifyNumber } from '~/lib/math'
import { type Post } from '~/sanity/schemas/post'

export function BlogPostCard({ post, views }: { post: Post; views: number }) {
  // 解构 post 对象，获取文章的标题、slug、主图、发布时间、分类和阅读时间
  const { title, slug, mainImage, publishedAt, categories, readingTime } = post

  return (
    <Link
      href={`/blog/${slug}`} // 点击链接后跳转到对应的博客文章页面
      prefetch={false} // 禁用预取，以减少不必要的请求
      className="group relative flex w-full transform-gpu flex-col rounded-3xl bg-transparent ring-2 ring-[--post-image-bg] transition-transform hover:-translate-y-0.5"
      style={
        {
          '--post-image-fg': mainImage.asset.dominant?.foreground, // 设置主图前景色
          '--post-image-bg': mainImage.asset.dominant?.background, // 设置主图背景色
          '--post-image': `url(${mainImage.asset.url}`, // 设置主图的背景图
        } as React.CSSProperties
      }
      // todo ：在这里我要怎么修改这些内容？
    >
      <div className="relative aspect-[240/135] w-full">
        <Image
          src={mainImage.asset.url} // 主图的 URL
          alt="" // 图片的替代文本
          className="rounded-t-3xl object-cover" // 设置图片样式
          placeholder="blur" // 图片加载时的模糊占位
          blurDataURL={mainImage.asset.lqip} // 模糊占位图的 URL
          fill // 使图片填充父容器
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw" // 响应式图片大小
        />
      </div>
      <span className="relative z-10 flex w-full flex-1 shrink-0 flex-col justify-between gap-0.5 rounded-b-[calc(1.5rem+1px)] bg-cover bg-bottom bg-no-repeat p-4 bg-blend-overlay [background-image:var(--post-image)] before:pointer-events-none before:absolute before:inset-0 before:z-10 before:select-none before:rounded-b-[calc(1.5rem-1px)] before:bg-[--post-image-bg] before:opacity-70 before:transition-opacity after:pointer-events-none after:absolute after:inset-0 after:z-10 after:select-none after:rounded-b-[calc(1.5rem-1px)] after:bg-gradient-to-b after:from-transparent after:to-[--post-image-bg] after:backdrop-blur after:transition-opacity group-hover:before:opacity-30 md:p-5">
        <h2 className="z-20 text-base font-bold tracking-tight text-[--post-image-fg] opacity-70 transition-opacity group-hover:opacity-100 md:text-xl">
         {title} {/* 显示文章标题 */}
        </h2>

        <span className="relative z-20 flex items-center justify-between opacity-50 transition-opacity group-hover:opacity-80">
          <span className="inline-flex items-center space-x-3">
            <span className="inline-flex items-center space-x-1 text-[12px] font-medium text-[--post-image-fg] md:text-sm">
              <CalendarIcon /> {/* // 日历图标 */}
              <span>
                {parseDateTime({ date: new Date(publishedAt) })?.format(
                  'YYYY/MM/DD' // 格式化发布时间
                )}
              </span>
            </span>

            {Array.isArray(categories) && (
              <span className="inline-flex items-center space-x-1 text-[12px] font-medium text-[--post-image-fg] md:text-sm">
                <ScriptIcon /> 
                {/* // 分类图标 */}
                <span>{categories.join(', ')}</span> 
                {/* // 显示文章分类 */}
              </span>
            )}
          </span>
          <span className="inline-flex items-center space-x-3 text-[12px] font-medium text-[--post-image-fg] md:text-xs">
            <span className="inline-flex items-center space-x-1">
              <CursorClickIcon /> 
              {/* // 点击图标 */}
              <span>{prettifyNumber(views, true)}</span> 
              {/* // 显示浏览量 */}
            </span>

            <span className="inline-flex items-center space-x-1">
              <HourglassIcon /> 
              {/* // 沙漏图标 */}
              <span>{readingTime.toFixed(0)}分钟阅读</span>
               {/* // 显示阅读时间 */}
            </span>
          </span>
        </span>
      </span>
    </Link>
  )
}
