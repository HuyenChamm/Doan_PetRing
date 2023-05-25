exports.changePass = (req, res) => {
  const {id,change} = req.query;
  console.log(id,change);
  req.session
  .run(`MATCH (n:User) WHERE id(n)= ${id} SET n.pass = '${change}' RETURN n.pass,id(n) `)
  .then(data => {
    const nodes = data.records.map(record =>{
      return { 
        pass: record.get('n.pass').properties, 
        id: record.get(`id(n)`).low
    };
   });
    res.json({
      data: nodes
    })
  })
  .catch(error => console.error(error))
  
}


// exports.changePass = async (req, res) => {
//   const {id,change} = req.query;
//   console.log(id,change);

//   req.session.writeTransaction( async tx => {
//   const result = await tx.run(`
//     MATCH (n:User) WHERE id(n)= ${id} SET n.pass = '${change}' RETURN n.pass,id(n)
//    `);
//   const nodes = result.records.map(record => {
//             return { 
//               pass: record.get('n.pass').properties, 
//               id: record.get(`id(n)`).low
//           };
//         });
//   res.json({
//     data: nodes
//   })
// }).then(() => {
// }).catch(error => {
//   console.log(error);
// })}