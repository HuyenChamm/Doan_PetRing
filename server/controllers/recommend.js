exports.recommend = async (req, res) => {
  const {id} = req.query;
 
  req.session
  .run(`MATCH (me:User), (user:User)
        WHERE NOT (me)-[:FRIEND]-(user) 
        AND id(me) = ${id} AND NOT id(user) =  ${id} 
        AND me.address = user.address
        RETURN user,id(user)`)
  .then(data => {
    const nodes = data.records.map(record =>{
      return { 
        u: record.get('user').properties, 
        id: record.get(`id(user)`).low
    };
    } 
    );
    console.log(`MATCH (me:User), (user:User)
    WHERE NOT (me)-[:FRIEND]-(user) 
    AND id(me) = ${id} AND NOT id(user) =  ${id} 
    AND me.address = user.address
    RETURN user,id(user)`);
    res.json({
      data: nodes
    })
  })
  .catch(error => console.error(error))

}
