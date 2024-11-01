export type CreateUserArgs = {
    input : {
        userName : string ,
        password : string
    }
}

export type CreatePostArgs = {
    input : {
        title : string ,
        content : string , 
        userId : string
    }
}

export type CreateCommentInput = {
    input : {
        comment : string , 
        userId : string , 
        postId : number
    }
}

export type DeletePostInput = {
    input : {
        postId : number , 
        userId : string
    }
}

export type DeleteCommentInput = {
    input : {
        commentId : number , 
        userId : String
    }
}

export type UpdatePostInput = {
    input : {
        postId : number , 
        userId : string , 
        title : string , 
        content : string
    }
}


export type UpdateCommentInput = {
    input : {
        commentId : number , 
        comment : string , 
        userId : string
    }
}