const fs = require('fs');
const path = require('path');
const con = require('../database');


getAllPostsQuery = () => {
    const query = 'SELECT * FROM post';
    return new Promise((resolve, reject) => {
        con.query(query, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
          });
    });
};

getAllPosts = async (req, res) =>{
    try{
        const posts =  await getAllPostsQuery();
        res.status(200).send(posts);
    }
    catch{
        res.status(500).send(error.message);
    }
};

getSpecificPostQuery = (postId) => {
    const query = 'SELECT * FROM post WHERE id = ?';
    return new Promise((resolve, reject) => {
        con.query(query,[postId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
          });
    });
}

getSpecificPost = async (req, res) => {
    const postId = req.params.id;

    try {
        const post = await getSpecificPostQuery(postId);
        res.status(200).send(post[0]);  
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// createNewPost = (req, res) => {
//     const postText = req.body.text;
//     const postLikes = req.body.likes;
//     const postCreated = req.body.created_on;
//     const query = `INSERT INTO post (text, likes, created_on) VALUES (${postText}, ${postLikes}, ${postCreated});`




    

// }


module.exports = {
    getAllPosts,
    getSpecificPost

}