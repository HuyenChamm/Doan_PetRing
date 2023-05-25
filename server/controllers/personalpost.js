exports.getPost = async (req, res) => {
  const {id} = req.params;

req.session.readTransaction( async tx => {
  // WHERE p.user_id = u.id
  const result =
    await tx.run(`MATCH (p:POST)-[n:POST]->(u:User) WHERE id(u) = ${id} RETURN u,p,id(u),id(p)`);
  const nodes = result.records.map(record => {
            return { 
              u: record.get('u').properties, 
              post: record.get('p')?.properties,
              idu: record.get(`id(u)`).low,
              idp: record.get(`id(p)`).low
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