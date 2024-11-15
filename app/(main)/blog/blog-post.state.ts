import { proxy } from 'valtio'

import { type PostIDLessCommentDto } from '~/db/dto/comment.dto'

// 使用 Valtio 库来管理博客文章的状态。Valtio 是一个用于状态管理的库，允许你以简单的方式创建可观察的状态

type PostID = string
export const blogPostState = proxy<{
  postId: PostID
  currentBlockId: string | null
  comments: PostIDLessCommentDto[]
  replyingTo: PostIDLessCommentDto | null
}>({
  postId: '',
  currentBlockId: null,
  comments: [],
  replyingTo: null,
})

export function addComment(comment: PostIDLessCommentDto) {
  blogPostState.comments.push(comment)
}

export function replyTo(comment: PostIDLessCommentDto) {
  blogPostState.replyingTo = comment
}

export function clearReply() {
  blogPostState.replyingTo = null
}

export function focusBlock(blockId: string | null) {
  blogPostState.currentBlockId = blockId
}

export function clearBlockFocus() {
  blogPostState.currentBlockId = null
}
