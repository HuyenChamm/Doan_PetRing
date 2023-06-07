const driver = require("../utils/db");

exports.recommendpet = (req, res) => {
  const session = driver.session();
  const {id} = req.query;
 
  session
  .run(`MATCH (me:User), (user:User), (pet:Pet)
        WHERE NOT (me)-[:FRIEND]-(user) 
        AND id(me) = ${id} 
        AND NOT id(user) = ${id}
        AND (user)-[:OWNER]->(pet)
        RETURN user,pet,id(user)`)
  .then(data => {
    const nodes = data.records.map(record =>{
      return { 
        u: record.get('user').properties, 
        p: record.get('pet').properties,
        id: record.get(`id(user)`).low
    };
    } 
    );
       
    res.json({
      data: nodes
    })
  })
  .catch(error => console.error(error))

}