/////////

const driver = require("../utils/db");

exports.getAllLike = (req, res) => {
  const session = driver.session();
  const { postId } = req.query
  session
    .run(`MATCH (u:User)-[l:LIKE]->(p:POST) WHERE id(p) =${postId} RETURN count(l) AS count ,id(p)`)
    .then(data => {
      const nodes = data.records.map(record => record.get('count').toNumber()
      );
      res.json({
        data: nodes
      })
    })
    .catch(error => {
      console.log(error);
    })
}

exports.getStatusLike = (req, res) => {
  const session = driver.session();
  const { postId,id } = req.query
  session
    .run(`MATCH (u:User)-[l:LIKE]->(p:POST) WHERE id(p) =${postId} AND id(u)= ${id} RETURN u,id(p),p`)
    .then(data => {
      const nodes = data.records.map(record => {
        return {
          u: record.get('u').properties,
          p: record.get('p').properties,
          idp: record.get( `id(p)`).low
        };
      });
      res.json({
        data: nodes,
        status : nodes.length ? true : false
      })
    })
    .catch(error => {
      res.json({
        status :false
      })
      console.log(error);
    })
}


exports.addLike = (req, res) => {
  const session = driver.session();
  const { postId , id} = req.query
  console.log( postId , id,"addlike");
  session
    .run(`MATCH (u:User),(p:POST)
          WHERE id(u) = ${id}  AND id(p) = ${postId}
          CREATE (u)-[l:LIKE]->(p)
          RETURN u,id(p),p`)
    .then(data => {
      const nodes = data.records.map(record => {
        return {
          u: record.get('u').properties,
          p: record.get('p').properties,
          idp: record.get( `id(p)`).low
        };
      }
      );
      res.json({
        data: nodes,
        status :true
      })
    })
    .catch(error => console.error(error))
}


exports.deleteLike = (req, res) => {
  const session = driver.session();
  const { postId , id} = req.query
  session
    .run(`MATCH (u:User)-[r:LIKE]->(p:POST)
          WHERE id(u) =${id} AND id(p) = ${postId}
          DELETE r RETURN u,id(p),p`)
    .then(data => {
      const nodes = data.records.map(record => {
        return {
          u: record.get('u').properties,
          p: record.get('p').properties,
          idp: record.get( `id(p)`).low
        };
      });
      res.json({
        status : false
      })
    })
    .catch(error => console.error(error))
    
}

//////Get All like

// exports.getAllLike = async (req, res) => {
//   const { postId } = req.query
//   req.session.readTransaction( async tx => {
//   await tx.run(`
//   MATCH (u:User)-[l:LIKE]->(p:POST) WHERE id(p) =${postId} RETURN count(l) AS count ,l,u
//    `);
// }).then((result) => {
//    const nodes = result.records.map(record => {
//             return { 
//               count: record.get('count').toNumber(),
//               l: record.get('l').properties,
//               u: record.get('u').properties
//           };
//         });
//   res.json({
//     data: nodes ,
//     status : 'like'
//   })
// }).catch(error => {
//   res.json({
//    status : 'unlike'
//   })
//   console.log(error);
// })
// }


// ///// Add Like
// exports.addLike = async (req, res) => {
//   const { post_id , id} = req.query
//   req.session.writeTransaction( async tx => {
//   const result = await tx.run(`
//   MATCH (u:User),(p:POST)
//   WHERE id(u) =${id}  AND id(p) = ${post_id}
//   CREATE (u)-[l:LIKE]->(p)
//   RETURN l,u
//    `);
//   const nodes = result.records.map(record => {
//             return { 
//               l: record.get('l').properties,
//               u: record.get('u').properties
//           };
//         });
//   res.json({
//     data: nodes
//   })
// }).then(() => {
// }).catch(error => {
//   console.log(error);
// })}


// ///// DeleteLike
// exports.deleteLike = async (req, res) => {
//   const { post_id , id} = req.query
//   req.session.writeTransaction( async tx => {
//   const result = await tx.run(`
//   MATCH (u:User)-[r:LIKE]->(p:POST)
//   WHERE id(u) =${id} AND id(p) = ${post_id}
//   DELETE r RETURN r,u
//    `);
//   const nodes = result.records.map(record => {
//             return { 
//               l: record.get('l').properties,
//               u: record.get('u').properties
//           };
//         });
//   res.json({
//     data: nodes
//   })
// }).then(() => {
// }).catch(error => {
//   console.log(error);
// })}




