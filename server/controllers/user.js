const driver = require("../utils/db");

exports.getAllUser = (req, res) => {
  const session = driver.session();
  session
  .run('MATCH (n:User)  RETURN n,id(n)')
  .then(data => {
    const nodes = data.records.map(record => {
      return { 
        n: record.get('n').properties, 
        id: record.get(`id(n)`).low
    };
    });
       
    res.json({
      data: nodes
    })
  })
  .catch(error => console.error(error))

}


exports.getUser = (req, res) => {
  const session = driver.session();
  const {id} = req.params;
 
  session
  .run(`MATCH (n:User) WHERE id(n) = ${id} RETURN n,id(n)`)
  .then(data => {
    const nodes = data.records.map(record =>{
      return { 
        n: record.get('n').properties, 
        id: record.get(`id(n)`).low
    };
    } 
    );
       
    res.json({
      data: nodes
    })
  })
  .catch(error => console.error(error))
  
}


exports.addUser = (req, res) => {
  res.send("user: id");
}

exports.updateUser = (req, res) => {
  const session = driver.session();
  const {id, name, email, address, phone,sex,dob} = req.query;
  console.log(id, name, email, address, phone,sex,dob);
  session
  .run(`MATCH (n:User) WHERE id(n) = ${id} SET n.name = "${name}" , n.email = "${email}" , n.phone = "${phone}" , 
        n.sex = "${sex}", n.dob = " ${dob}", n.address = "${address}" RETURN n , id(n)`)
  .then(data => {
    const nodes = data.records.map(record =>{
      return { 
        n: record.get('n').properties, 
        id: record.get(`id(n)`).low
    };
   });
    res.json({
      data: nodes
    })
  })
  .catch(error => console.error(error))
}

exports.deleteUser = (req, res) => {
  res.send("DELETE");
}

