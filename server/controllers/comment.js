exports.getAllComment = async (req, res) => {
  const { post_id } = req.query
  console.log("id",post_id);

req.session.readTransaction( async tx => {
  const result = await tx.run(`MATCH (u:User)-[:UCOMMENT]->(cmt:COMMENT)-[:PCOMMENT]->(p:POST) WHERE id(p) =${post_id} 
   RETURN u , cmt ,id(p),id(cmt) `);
  const nodes = result.records.map(record => {
            return { 
             u: record.get('u')?.properties,
             cmt: record.get('cmt')?.properties,
             idp: record.get(`id(p)`).low,
             idcmt: record.get(`id(cmt)`).low
          };
        });
  res.json({
    data: nodes
  })
}).then(() => {
}).catch(error => {
  console.log(error);
})
}


// exports.addComment = async (req, res) => {
//   const { postId , id , content} = req.query
//   console.log("idcmt",id);

// req.session.writeTransaction( async tx => {
//   const result = await tx.run(`
//   MATCH (u:User),(p:POST)
//   WHERE id(u) = ${id} AND id(p)=${postId}
//   CREATE (cmt:COMMENT{content:'${content}'})
//   CREATE (u)-[r1:UCOMMENT]->(cmt)
//   CREATE (cmt)-[r2:PCOMMENT]->(p)
//   RETURN cmt,u,id(p),id(cmt) 
//    `);
//   const nodes = result.records.map(record => {
//             return { 
//               u: record.get('u')?.properties,
//               cmt: record.get('cmt')?.properties,
//               idp: record.get(`id(p)`).low,
//               idcmt: record.get(`id(cmt)`).low
//           };
//         });
//   req.io.emit("addcomment",nodes[0])
//   res.json({
//     data: nodes[0]
//   })
// }).then(() => {
// }).catch(error => {
//   console.log(error);
// })
// }


 

// exports.getAllComment = (req, res) => {
//   const { post_id } = req.query
//   console.log("id",post_id);
//   req.session
//   .run(`
//   MATCH (u:User)-[:UCOMMENT]->(cmt:COMMENT)-[:PCOMMENT]->(p:POST) WHERE id(p) =${post_id} 
//    RETURN u , cmt ,id(p),id(cmt) 
//   `)
//   .then(data => {
//     const nodes = data.records.map(record =>{
//       return { 
//         u: record.get('u')?.properties,
//              cmt: record.get('cmt')?.properties,
//              idp: record.get(`id(p)`).low,
//              idcmt: record.get(`id(cmt)`).low
//     };
//     });
       
//     res.json({
//       data: nodes
//     })
//   })
//   .catch(error => console.error(error))
// }

exports.addComment = async (req, res) => {
  const { postId , id , content} = req.query
  console.log("idcmt",id);
   req.session
   .run(`
    MATCH (u:User),(p:POST)
    WHERE id(u) = ${id} AND id(p)=${postId}
    CREATE (cmt:COMMENT{content:'${content}'})
    CREATE (u)-[r1:UCOMMENT]->(cmt)
    CREATE (cmt)-[r2:PCOMMENT]->(p)
    RETURN cmt,u,id(p),id(cmt)
   `)
   .then(data => {
     const nodes = data.records.map(record => {
      return { 
        u: record.get('u')?.properties,
        cmt: record.get('cmt')?.properties,
        idp: record.get(`id(p)`).low,
        idcmt: record.get(`id(cmt)`).low
     };
     }
     );
    console.log( nodes);
    req.io.emit("addcomment",nodes[0])
    res.json({
     data: nodes[0]
    })
   })
   .catch(error => console.error(error))

 }
