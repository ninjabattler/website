const insertNewComment = async (prisma, content, post_id, user_id) => {
  const result = await  prisma.comments.create({
    data: {
      content: content,
      post_id: Number(post_id),
      user_id: Number(user_id)
    }
  })

  return result
}

module.exports = insertNewComment
