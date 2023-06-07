// //Get message send
// exports.getMessSend = async (req, res) => {
//   const { params, nodeId } = req.query;
//   req.session.readTransaction(async tx => {
//     const result = await tx.run(`
//   MATCH (u:User)-[:MESSAGE]-> (m:MESSAGE) -[:SEND]-> (u2:User)
//     WHERE id(u) =${params} AND id(u2) = ${nodeId}  RETURN m,u,u2,id(m)
//    `);
//     const nodes = result.records.map(record => {
//       return {
//         m: record.get('m').properties,
//         u: record.get('u').properties,
//         u2: record.get('u2').properties,
//         idm: record.get(`id(m)`).low
//       };
//     });
//     res.json({
//       data: nodes
//     })
//   }).then(() => {
    

//   }).catch(error => {
//     console.log(error);
//   })
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

  const { params, nodeId } = req.query;
  req.session
    .run(`
    MATCH (u:User)-[:MESSAGE]-> (m:MESSAGE) -[:SEND]-> (u2:User)
    WHERE id(u) =${params} AND id(u2) = ${nodeId}  RETURN m,u,u2,id(m)
  `)
    .then(data => {
      const nodes = data.records.map(record => {
        return {
          m: record.get('m').properties,
          u: record.get('u').properties,
          u2: record.get('u2').properties,
          idm: record.get(`id(m)`).low
        };

      }
      );
      console.log();
      res.json({
        data: nodes
      })


    })
    .catch(error => console.error(error))
}

exports.getMessReceive = (req, res) => {
  const { params, nodeId } = req.query;
  req.session
    .run(`
  MATCH (u:User)-[:MESSAGE]-> (m:MESSAGE) -[:SEND]-> (u2:User)
  WHERE id(u) = ${nodeId} AND id(u2) = ${params}  RETURN m,u,u2,id(m)
  `)
    .then(data => {
      const nodes = data.records.map(record => {
        return {
          m: record.get('m').properties,
          u: record.get('u').properties,
          u2: record.get('u2').properties,
          idm: record.get(`id(m)`).low
        };
      });

      res.json({
        data: nodes
      })
    })
    .catch(error => console.error(error))
}

exports.sendMess = (req, res) => {
  const { messageInput, id, nodeId, time } = req.query;
  req.session
    .run(`
  MATCH (u:User), (u2:User)
  WHERE id(u) = ${id} AND id(u2) = ${nodeId}
  CREATE (m:MESSAGE { message:'${messageInput}',send_at:'${time}' })
  CREATE (u)-[:MESSAGE]->(m)-[:SEND]->(u2)
  RETURN m,u,u2,id(m)
  `)
    .then(data => {
      const nodes = data.records.map(record => {
        return {
          m: record.get('m').properties,
          u: record.get('u').properties,
          u2: record.get('u2').properties,
          idm: record.get(`id(m)`).low
        };
      });
      // req.io.emit("sendmess",nodes)
      res.json({
        data: nodes
      })
    })
    .catch(error => console.error(error))
}
