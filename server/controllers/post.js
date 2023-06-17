const driver = require("../utils/db")

exports.getAllPost = (req, res) => {
  const session = driver.session();
  const {post_setting} = req.query
  const requestPubblic = post_setting ? `WHERE p.post_setting ='public'` : ``

  session
  .run(`MATCH (p:POST)-[n:POST]->(u:User)  ${requestPubblic} RETURN u,p,id(u),id(p)`)
  .then(data => {
    // console.log(`MATCH (p:POST)-[n:POST]->(u:User) WHERE p.user_id = u.id ${requestPubblic} RETURN u.name,p`);
    const nodes = data.records.map(record => {
      return {
        u: record.get('u').properties, 
        post: record.get('p')?.properties,
        idu: record.get(`id(u)`).low,
        idp: record.get(`id(p)`).low
      }
    });
    
    res.json({
      data: nodes
    })
  })
  .catch(error => console.error(error))
  
}
///
// exports.getAllPost = async (req, res) => {
 
//   const {post_setting} = req.query
//   const requestPubblic = post_setting ? `WHERE p.post_setting ='public'` : ``

// req.session.readTransaction( async tx => {
//   // WHERE p.user_id = u.id
//   const result =
//     await tx.run(`MATCH (p:POST)-[n:POST]->(u:User)  ${requestPubblic} RETURN u,p,id(u),id(p)`);
//   const nodes = result.records.map(record => {
//             return { 
//               u: record.get('u').properties, 
//               post: record.get('p')?.properties,
//               idu: record.get(`id(u)`).low,
//               idp: record.get(`id(p)`).low
//           };
//         });
//   res.json({
//     data: nodes
//   })
// }).then(() => {
// }).catch(error => {
//   console.log(error);
// })

// }


exports.addPost = (req, res) => {
  const session = driver.session();
  const { id , imgp , content , time, option } = req.query
  session
  .run(`
  MATCH (u:User) WHERE id(u) = ${id}
  CREATE (post:POST{content:'${content}',img:'${imgp}',datetime:'${time}',post_setting:'${option}'})
  CREATE (post)-[:POST]->(u)
  RETURN post,u,id(u),id(post)`)
  .then(data => {
   
    const nodes = data.records.map(record => {
      return {
        u: record.get('u').properties, 
        post: record.get('post')?.properties,
        idu: record.get(`id(u)`).low,
        idp: record.get(`id(post)`).low
    }
    });
    req.io.emit("addpost",nodes[0]) 
    res.json({
      data: nodes[0]
    })
  
  })
  .catch(error => console.error(error))
 
}

exports.updatePost = (req, res) => {
  res.send("UPDATE");
}

exports.deletePost = (req, res) => {
  res.send("DELETE");
}

