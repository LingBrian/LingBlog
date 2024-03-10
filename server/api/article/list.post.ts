import { PrismaClient } from "@prisma/client"

const db = new PrismaClient()

type article = {
          id?: number,
          title?: string,
          overview?: string,
          auther?: string | null,
          date?: string,
          tags?: Array<string>,
};

async function list(uid: number) {
          const lists = await db.article.findMany({
                    where: {
                              autherid: uid
                    },
                    include: {
                              Tag: true,
                              auther: true,
                    },
          })

          var tags: string[] = []
          var articles: article[] = []
          lists.map((art) => {
                    art.Tag.map((tag) => {
                              tags.push(tag.name)
                    })
                    articles.push({
                              id: art.id,
                              title: art.title,
                              overview: art.content.replace(/<[^>]*>/g, '').substr(0, 300) + '...',
                              auther: art.auther.username || '',
                              date: (new Date(art.date)).toLocaleString(),
                              tags: tags
                    })
                    tags = []
          })
          return articles


}

export default defineEventHandler(async (event) => {
          const body = await readBody(event)

          return list(body.userid)
})