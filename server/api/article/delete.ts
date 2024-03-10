import { PrismaClient } from "@prisma/client"

const db = new PrismaClient()


async function del(artid: number) {


          await db.tag.deleteMany({
                    where: {
                              artid: artid
                    }
          })

          const res = await db.article.delete({
                    where: {
                              id: artid
                    }
          })
          if (res.id == artid) {
                    return {
                              code: 1,
                              message: '删除文章' + artid + '成功'
                    }
          } else {
                    return {
                              code: 0,
                              message: '删除文章' + artid + '失败'
                    }
          }



}

export default defineEventHandler(async (event) => {
          const body = await readBody(event)

          return del(body.artid)
})