import { PrismaClient } from "@prisma/client"
type log = {
    id: string,
    username: string | null,
    date: string
    status: string
}
const db = new PrismaClient()

async function logs() {
    const auth = await db.auth.findMany({ include: { user: true } })
    var logs: log[] = []

    auth.forEach(element => {

        logs[element.id - 1] = {
            id: element.id.toString(),
            username: element.user.username,
            date: element.date.toLocaleString(),
            status: Date.parse(element.date.toString()) + 1000 * 60 * 30 > Date.now() ? '在线' : '超时'

        }
    })
    return logs
}

export default defineEventHandler(async (event) => {
    //const body = await readBody(event)
    //return auth(body.auth)
    //return (db.user.findFirst({ where: { id: 1 } })).then(a => { return a?.username })
    return logs()//typeof (logs())
})