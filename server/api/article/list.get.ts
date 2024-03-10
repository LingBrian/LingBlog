import { PrismaClient } from "@prisma/client";

const db = new PrismaClient()


type article = {
    title?: string,
    overview?: string,
    auther?: string | null,
    date?: string,
    tags?: Array<string>,
};

async function list() {
    const lists = await db.article.findMany({
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


    return list()
})
/**
 * return await db.article.findMany({
        include: {
            Tag: true,
            auther: true,
        }
    })
 */