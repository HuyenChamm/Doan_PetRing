const driver = require("../utils/db");

exports.getSearch = (req, res) => {
const session = driver.session();
 const {query} = req.query
 console.log("name",query);
 console.log(query !== '');
 if(query !== '' )
 {
  session
  .run(`MATCH (u:User) WHERE toLower(u.name ) CONTAINS toLower("${query}") RETURN u,id(u)`)
  .then(data => {
    const nodes = data.records.map(record => {
      return { 
        u:  record.get('u').properties, 
        id: record.get(`id(u)`).low
    };
    });
    req.io.emit("search",nodes)
    res.json({
      data: nodes
    })
  })
  .catch(error => console.error(error))
 }else{
  req.io.emit("search",[])
    res.json({
      data: []
    })
 }

}