import { PrismaClient } from "@prisma/client";

const db = new PrismaClient()


type article = {
    id?: number,
    title?: string,
    overview?: string,
    auther?: string | null,
    date?: string,
    tags?: Array<string>,
};

async function getArticle(id: number) {
    let art = await db.article.findUnique({
        where: {
            id: id,
        }
        , select: {
            id: true,
            title: true,
            date: true,
            content: true,
            update: true,
            Tag: {
                select: {
                    name: true,
                }
            },
            auther: {
                select: {
                    id: true,
                    username: true,
                    email: true
                }
            }
        }
    })

    return art


}


export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')


    return getArticle(Number(id))

})
/**
 * return await db.article.findMany({
        include: {
            Tag: true,
            auther: true,
        }
    })
 */