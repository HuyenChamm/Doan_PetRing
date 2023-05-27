// //Get message send
// exports.getMessSend = async (req, res) => {
//   req.session.readTransaction( async tx => {
//   const result = await tx.run(`
//   MATCH (u:User)-[:MESSAGE]-> (m:MESSAGE) -[:SEND]-> (u2:User)
//   WHERE id(u) = 0 AND id(u2) = 2  RETURN m,u,u2
//    `);
//   const nodes = result.records.map(record => {
//             return { 
//               m: record.get('m').properties, 
//               u: record.get('u').properties, 
//               u2: record.get('u2').properties, 
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
// //Get message receive
// exports.getMessReceive = async (req, res) => {
//   req.session.readTransaction( async tx => {
//   const result = await tx.run(`
//   MATCH (u:User)-[:MESSAGE]-> (m:MESSAGE) -[:SEND]-> (u2:User)
//   WHERE id(u) = 2 AND id(u2) = 0  RETURN m,u,u2
//    `);
//   const nodes = result.records.map(record => {
//             return { 
//               m: record.get('m').properties, 
//               u: record.get('u').properties, 
//               u2: record.get('u2').properties, 
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
// //Send message
// exports.sendMess = async (req, res) => {
 
//   req.session.writeTransaction( async tx => {
//   const result = await tx.run(`
//   MATCH (u:User), (u2:User)
//   WHERE id(u) = 0 AND id(u2) = 2
//   CREATE (m:MESSAGE { message:'Hello MayA',send_at:'5/11/2023, 10:31:10 PM' })
//   CREATE (u)-[:MESSAGE]->(m)-[:SEND]->(u2)
//    `);
//   const nodes = result.records.map(record => {
//             return { 
//               m: record.get('m').properties, 
//               u: record.get('u').properties, 
//               u2: record.get('u2').properties, 
//           };
//         });
//   res.json({
//     data: nodes
//   })
// }).then(() => {
// }).catch(error => {
//   console.log(error);
// })}

exports.getMessSend = (req, res) => {
  req.session
  .run(`
  MATCH (u:User)-[:MESSAGE]-> (m:MESSAGE) -[:SEND]-> (u2:User)
  WHERE id(u) = 1 AND id(u2) = 0  RETURN m,u,u2
  `)
  .then(data => {
    const nodes = data.records.map(record =>{
      return { 
        m: record.get('m').properties, 
        u: record.get('u').properties, 
        u2: record.get('u2').properties, 
    };
    });
    res.json({
      data: nodes
    })
  })
  .catch(error => console.error(error))
}

exports.getMessReceive = (req, res) => {
  req.session
  .run(`
  MATCH (u:User)-[:MESSAGE]-> (m:MESSAGE) -[:SEND]-> (u2:User)
  WHERE id(u) = 1 AND id(u2) = 0  RETURN m,u,u2
  `)
  .then(data => {
    const nodes = data.records.map(record =>{
      return { 
        m: record.get('m').properties, 
        u: record.get('u').properties, 
        u2: record.get('u2').properties, 
        
    };
    });
       
    res.json({
      data: nodes
    })
  })
  .catch(error => console.error(error))
}
exports.sendMess = (req, res) => {
  req.session
  .run(`
  MATCH (u:User), (u2:User)
  WHERE id(u) = 0 AND id(u2) = 2
  CREATE (m:MESSAGE { message:'Hello MayA',send_at:'5/11/2023, 10:31:10 PM' })
  CREATE (u)-[:MESSAGE]->(m)-[:SEND]->(u2)
  `)
  .then(data => {
    const nodes = data.records.map(record =>{
      return { 
        m: record.get('m').properties, 
        u: record.get('u').properties, 
        u2: record.get('u2').properties, 
        
    };
    });
    res.json({
      data: nodes
    })
  })
  .catch(error => console.error(error))
}
