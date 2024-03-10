import { PrismaClient } from "@prisma/client"
const db = new PrismaClient()

async function login(username: string, password: string) {
    if (await matchTest(username)) {
        return { cookie: '', status: 2 }
    } else {
        const user = await db.user.findMany({
            where: {
                username: username
            }, select: {
                id: true,
                password: true,
            },
        })
        if (await md5(password) == user[0].password) {

            const authvalue = await md5(Date.now().toString())
            await db.auth.create(
                {
                    'data': {
                        'userid': user[0].id,
                        'coockie': authvalue,
                        'date': ((new Date(new Date().toLocaleString())).toISOString())
                    }
                }
            )
            await db.$disconnect()
            return { cookie: authvalue, status: 0 }
            //const auth = useCookie('auth', { maxAge: 60 * 30 })
        } else {
            return { cookie: '', status: 1 }//密码错误
        }
    }

}

async function md5(chars: string) {
    return (await import('crypto')).createHash('md5').update(chars).digest('hex')

}

async function matchTest(username: string) {
    const result = await db.user.findMany(
        {
            where: {
                OR: [
                    { username: username }

                ]
            }
        })
    console.log(result)
    return JSON.stringify(result) === '[]'
}


export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    return login(body.name, body.password)
})
