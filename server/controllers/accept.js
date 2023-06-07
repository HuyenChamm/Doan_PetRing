const driver = require("../utils/db");

exports.getAccept = async (req, res) => {

  const session = driver.session();
  const {id} = req.query;

  session
  .run(`
  MATCH (u1:User), (u2:User),(u2:User)-[:ADDFR]->(u1:User)
  WHERE NOT (u1:User)-[:ADDFR]->(u2:User)-[:ACCEPT]->(u1:User)  
  AND NOT (u2:User)-[:ADDFR]->(u1:User)-[:ACCEPT]->(u2:User)
  AND NOT (u1:User)-[:ACCEPT]->(u2:User)
  AND id(u1) = ${id} AND NOT id(u2) = ${id}
  RETURN u2, id(u2) ,u1
  
        `)
  .then(data => {
    const nodes = data.records.map(record =>{
      return { 
        u: record.get('u2').properties, 
        id: record.get(`id(u2)`).low
    };
    } 
    );
    res.json({
      data: nodes
    })
  })
  .catch(error => console.error(error))

}

exports.addAccept = async (req, res) => {
  const session = driver.session();
  const {idadd,idu} = req.query;

  session
  .run(`
  MATCH (u1:User),(u2:User)
  WHERE id(u1) =${idu}  AND id(u2) = ${idadd}
  CREATE (u1)-[:ACCEPT]->(u2)
  RETURN u1,u2
        `)
  .then(data => {
    const nodes = data.records.map(record =>{
      return { 
        u: record.get('u2').properties, 
        u1: record.get('u1').properties
    };
    } 
    );
    res.json({
      data: nodes
    })
  })
  .catch(error => console.error(error))

}
