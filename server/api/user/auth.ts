import { PrismaClient } from "@prisma/client"

const db = new PrismaClient()

async function auth(auth: string) {
    const res = await db.auth.findMany({ where: { coockie: auth.toString() } })
    //return JSON.stringify((await res).values)
    if (JSON.stringify(res) === '[]') {
        return {
            login: false,
            code: 0//未登录
        }
    } else {
        if (Date.parse(res[0].date.toString()) + 1000 * 60 * 30 > Date.now()) {

            return {
                login: true,
                code: 1//登录状态正常
            }

        } else {
            return {
                login: false,
                code: 2//登录超时
            }
        }

    }

}

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    return auth(body.auth)
})