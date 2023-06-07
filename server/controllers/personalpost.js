// exports.getPost = async (req, res) => {
//   const {id} = req.params;

const driver = require("../utils/db");

// req.session.readTransaction( async tx => {
//   // WHERE p.user_id = u.id
//   const result =
//     await tx.run(`MATCH (p:POST)-[n:POST]->(u:User) WHERE id(u) = ${id} RETURN u,p,id(u),id(p)`);
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

///
exports.getPost = (req, res) => {
  const session = driver.session();
  const {id} = req.params;
  session
  .run(`
  MATCH (p:POST)-[n:POST]->(u:User) WHERE id(u) = ${id} RETURN u,p,id(u),id(p)`)
  .then(data => {
   
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
////
exports.deletePost = (req, res) => {
  const session = driver.session();
  const { idp } = req.query;
  session
  .run(`
  MATCH (p:POST) WHERE id(p) = ${idp} DETACH DELETE p RETURN p`)
  .then(data => {
   
    const nodes = data.records.map(record => {
      return {
        p: record.get('p').properties,
    }
    });
   
    res.json({
      data: nodes
    })
  
  })
  .catch(error => console.error(error))
}