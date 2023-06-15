const driver = require("../utils/db");

exports.getSearchPet = (req, res) => {
const session = driver.session();
 const {query} = req.query
 console.log("name",query);
 console.log(query !== '');
 if(query !== '' )
 {
  session
  .run(`MATCH (p:Pet) WHERE toLower(p.name) CONTAINS toLower("${query}") RETURN p,id(p)`)
  .then(data => {
    const nodes = data.records.map(record => {
      return { 
        p:  record.get('p').properties, 
        id: record.get(`id(p)`).low
    };
    });
    req.io.emit("searchpet",nodes)
    res.json({
      data: nodes
    })
  })
  .catch(error => console.error(error))
 }else{
  req.io.emit("searchpet",[])
    res.json({
      data: []
    })
 }

}