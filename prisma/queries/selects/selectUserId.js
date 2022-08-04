const selectUserId = async (prisma, ip) => {
  const result = await  prisma.users.findMany({
    select: {
      id: true
    },
    where: {
      ip: ip
    }
  })

  return result
}

module.exports = selectUserId
