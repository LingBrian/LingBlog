import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function addUser(username: string, email: string, password: string) {
  // ... you will write your Prisma Client queries here
  if (!(await matchTest(username, email))) {

    return false
  } else {

    await prisma.user.create({
      'data': {
        'username': username,
        'email': email,
        'password': (await import('crypto')).createHash('md5').update(password).digest('hex')

      }
    })
    return true
  }
}
async function matchTest(username: string, email: string) {
  const result = await prisma.user.findMany(
    {
      where: {
        OR: [
          { email: email },
          { username: username }

        ]
      }
    })
  console.log(result)
  return JSON.stringify(result) === '[]'
}




export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  // return await matchTest(body.name, body.email)
  return await addUser(body.name, body.email, body.password)
})
