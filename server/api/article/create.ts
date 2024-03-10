import { PrismaClient } from "@prisma/client"
const db = new PrismaClient()
async function up(title: string, tags: [string], content: string,auth:string) {
    const autherid = await db.auth.findFirst({
        where: {
            coockie: auth
        }, select: {
            userid: true,
        }
    }) || {userid:1}
    const article = await db.article.create({
        'data': {
            'autherid': autherid.userid,
            'title': title,
            'content': content,
        }, select: {
            id:true,
        }
    })
    tags.map(async (tag) => { 
        await db.tag.create({
        'data':{
            'name': tag,
            'artid': article.id,
        }
    })
    })
    return '创建成功'
}

export default defineEventHandler(async(event) => {
    const body = await readBody(event)
    return up(body.title,body.tags,body.content,body.auth)
    //return '404'
})