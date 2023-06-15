const driver = require("../utils/db");

exports.getPet = (req, res) => {
  const session = driver.session();
  const {id} = req.params;
  
  session
  .run(`MATCH (n:Pet) WHERE id(n) = ${id}  RETURN n, id(n)`)
  .then(data => {
    const nodes = data.records.map(record =>{
      return { 
        n: record.get('n').properties,
        id: record.get(`id(n)`).low,
    };
   });
    res.json({
      data: nodes
    })
  })
  .catch(error => console.error(error))
}
