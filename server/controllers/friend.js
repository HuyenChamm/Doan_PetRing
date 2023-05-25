// exports.getAllFriend = async (req, res) => {
//   const {id} = req.params;
//   console.log(id)

// req.session.readTransaction( async tx => {
//   const result = await tx.run(`MATCH (u1:User)-[r]->(u2:User) WHERE type(r) = 'FRIEND' AND u1.id="${id}" RETURN  u2`);
//   const nodes = result.records.map(record => record.get('u2').properties );
//   res.json({
//     data: nodes
//   })
// }).then(() => {
// }).catch(error => {
//   console.log(error);
// })
// }

exports.getAllFriend = (req, res) => {
  const {id} = req.params;
  console.log(id);
  req.session
  .run(`MATCH (u1:User)-[r]->(u2:User) WHERE type(r) = 'FRIEND' AND id(u1)=${id} RETURN  u2`)
  .then(data => {
    const nodes = data.records.map(record => record.get('u2').properties);
    
    res.json({
      data: nodes
    })
  })
  .catch(error => console.error(error))
  
}