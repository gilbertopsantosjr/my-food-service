import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['error', 'info', 'warn', 'query']
})

async function main() {
  await prisma.$connect()
  await prisma.category.deleteMany()
  await prisma.restaurant.deleteMany()
  await prisma.user.deleteMany()

  const gilbertopsantosjr = await prisma.user.create({
    data: {
      email: 'gilbertopsantos@gmail.com',
      username: 'Gilberto Santos',
      password: '21232f297a57a5a743894a0e4a801fc3',
      createdAt: new Date()
    } satisfies Prisma.UserCreateInput
  })

  const asian = await prisma.category.create({
    data: {
      title: 'Asian',
      description: 'Asian food',
      createdAt: new Date()
    } satisfies Prisma.CategoryCreateInput
  })

  const brazilian = await prisma.category.create({
    data: {
      title: 'Brazilian',
      description: 'Brazilian food',
      createdAt: new Date()
    } satisfies Prisma.CategoryCreateInput
  })

  const restaurant = await prisma.restaurant.create({
    data: {
      title: 'Gilberto Santos Restaurant',
      createdAt: new Date(),
      user: {
        connect: {
          id: gilbertopsantosjr.id
        }
      },
      content: 'The best restaurant in the world',
      categories: {
        connect: [
          {
            id: asian.id
          },
          {
            id: brazilian.id
          }
        ]
      }
    } satisfies Prisma.RestaurantCreateInput
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
