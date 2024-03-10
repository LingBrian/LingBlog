import { PrismaClient } from "@prisma/client"

const db = new PrismaClient()

async function getUser(auth: string) {
    const user = await db.auth.findFirst({
        where: {
            coockie: auth
        }, select: {
            user: {
                select: {
                    id: true,
                    username: true,
                    email: true
                }
            }
        }
    })
    return user
}


export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    return getUser(body.auth)
})