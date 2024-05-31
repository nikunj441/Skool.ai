import Post from '../model/post.js'

export const createPost = async (request,response) =>{

    try{
        const post = await new Post(request.body)
        await post.save()

        return response.status(200).json({msg: 'Post saved successfully'})
    }catch(err){
        return response.status(500).json(err)
    }
}

export const getAllPosts = async(request,response)=>{
    const category = request.query.category
    let posts;
    try {
        if(category){
            posts = await Post.find({categories: category}).exec()
        } else{
            posts = await Post.find({}).exec()
        }

        return response.status(200).json(posts)

    } catch (error) {
        console.log(error.message)
        return response.status(500).json({msg: error.message})
    }
}

export const getPost = async (req,res) =>{
    try {
        const post = await Post.findById(req.params.id)

        return res.status(200).json(post)
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
}


export const updatePost = async (req,res) =>{
    try {
        let post = await Post.findById(req.params.id)

        if(!post)
            return res.status(404).json({msg: 'Post not found'})
        
        await Post.findByIdAndUpdate(req.params.id, {$set: req.body})

        return res.status(200).json({msg: 'Post updated successfully'})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

export const deletePost = async (req,res) =>{

    try {
        let post = await Post.findByIdAndDelete(req.params.id)

        if(!post)
            return res.status(404).json({msg: 'Post not found'})
        
        return res.status(200).json({msg: 'Post deleted successfully'})
    } catch (error) {

        return res.status(500).json({error: error.message})
    }
}