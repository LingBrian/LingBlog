import { PrismaClient } from "@prisma/client"
const db = new PrismaClient()
async function up(artid: number, title: string, tags: [string], content: string, auth: string) {
          const autherid = await db.auth.findFirst({
                    where: {
                              coockie: auth
                    }, select: {
                              userid: true,
                    }
          }) || { userid: 1 }
          const article = await db.article.update({
                    'data': {
                              'title': title,
                              'content': content,
                              'update': ((new Date(new Date().toLocaleString())).toISOString())
                    }, where: {
                              id: artid,
                    }
          })
          await db.tag.deleteMany({
                    where: {
                              artid: artid
                    }
          })
          tags.map(async (tag) => {
                    await db.tag.create({
                              'data': {
                                        'name': tag,
                                        'artid': artid,
                              }
                    })
          })
          return '更新成功'
}

export default defineEventHandler(async (event) => {
          const body = await readBody(event)
          return up(body.artid, body.title, body.tags, body.content, body.auth)
          //return '404'
})