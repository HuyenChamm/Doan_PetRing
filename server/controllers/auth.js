exports.auth = (req, res) => {
  console.log(req.query);
  const {username, pass} = req.query
  req.session
  .run(`MATCH (n:User {username: "${username}", pass: "${pass}" }) RETURN n,id(n)`)
  .then(data => {
    const nodes = data.records.map(record =>{
      return { 
        n: record.get('n').properties, 
        id: record.get(`id(n)`).low
    };
    });
    const isExist = nodes.length ? 'success' : 'fail'
    res.json({
      data: nodes, status: isExist
    })
  })
  .catch(error => res.json({status:'Username or password incorrect!'}))
  
}

// exports.auth = async (req, res) => {
//   console.log(req.query);
//   const {username, pass} = req.query
//   req.session.readTransaction( async tx => {
//   const result = await tx.run(`
//   MATCH (n:User {username: "${username}", pass: "${pass}" }) RETURN n,id(n) 
//    `);
//   const nodes = result.records.map(record => {
//             return { 
//               n: record.get('n').properties, 
//               id: record.get(`id(n)`).low
//           };
//         });
//   const isExist = nodes.length ? 'success' : 'fail'
//   res.json({
//     data: nodes, status: isExist
//   })
// }).then(() => {
// }).catch(error => res.json({status:'Username or password incorrect!'}))
// }