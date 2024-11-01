import prisma from "../../../../utils/prisma"

export default {
    posts : async (parent : {id : string}) => {
        try {
            return await prisma.post.findMany({
                where : {
                    userId : parent.id
                }
            })

        } catch (err) {
            if(err instanceof Error){
                console.log(`this error is from method User / posts ${err.message}`)
            }
            return
        }
    }
}