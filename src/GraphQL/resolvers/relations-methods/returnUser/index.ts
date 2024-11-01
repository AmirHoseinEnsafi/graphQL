import prisma from "../../../../utils/prisma";

export default {
    user : async (parent : {userId : string}) => {
        try{
            if(parent.userId){
                return await prisma.user.findFirst({
                    where : {
                        id : parent.userId
                    }
                })

            }else{
                return
            }
        } catch (err) {
            if(err instanceof Error){
                console.log(`this error is from method ReturnUserById / user  ${err.message}`)
            }
            return 
        }
    }
}