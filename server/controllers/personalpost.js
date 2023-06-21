// exports.getPost = async (req, res) => {
//   const {id} = req.params;

const driver = require("../utils/db");


exports.getPost = (req, res) => {
  const session = driver.session();
  const {id} = req.params;
  session
  .run(`
  MATCH (p:POST)-[n:POST]->(u:User) WHERE id(u) = ${id} RETURN u,p,id(u),id(p)`)
  .then(data => {
   
    const nodes = data.records.map(record => {
      return {
        u: record.get('u').properties, 
        post: record.get('p')?.properties,
        idu: record.get(`id(u)`).low,
        idp: record.get(`id(p)`).low
    }
    });
   
    res.json({
      data: nodes
    })
  
  })
  .catch(error => console.error(error))
}
////

exports.getPagePost = (req, res) => {
  const session = driver.session();
  const {id} = req.params;
  session
  .run(`
  MATCH (p:POST)-[n:POST]->(u:User) WHERE id(p) = ${id} RETURN u,p,id(u),id(p)`)
  .then(data => {
   
    const nodes = data.records.map(record => {
      return {
        u: record.get('u').properties, 
        post: record.get('p')?.properties,
        idu: record.get(`id(u)`).low,
        idp: record.get(`id(p)`).low
    }
    });
   
    res.json({
      data: nodes
    })
  
  })
  .catch(error => console.error(error))
}
////
exports.deletePost = (req, res) => {
  const session = driver.session();
  const { idp } = req.query;
  session
  .run(`
  MATCH (p:POST) WHERE id(p) = ${idp} DETACH DELETE p RETURN p`)
  .then(data => {
   
    const nodes = data.records.map(record => {
      return {
        p: record.get('p').properties,
    }
    });
   
    res.json({
      data: nodes
    })
  
  })
  .catch(error => console.error(error))
}
////
exports.editPost = (req, res) => {
  const session = driver.session();
  const { id ,content,option,img} = req.query;
  session
  .run(`
  MATCH (n:POST) WHERE id(n) = ${id} SET n.content = "${content}" , n.post_setting = "${option}",n.img = "${img}"  RETURN n , id(n)`)
  .then(data => {
   
    const nodes = data.records.map(record => {
      return {
        n: record.get('n').properties,
        idn: record.get( `id(n)`).low,
    }
    });
   
    res.json({
      data: nodes
    })
  
  })
  .catch(error => console.error(error))
}