// exports.getPet = (req, res) => {
//   const {id} = req.params;
//   console.log(id);
//   req.session
//   .run(`
//   MATCH (u:User)-[:OWNER]->(pet:Pet) WHERE id(u) = ${id} RETURN pet,id(u),id(pet)
//   `)
//   .then(data => {
//     const nodes = data.records.map(record => {
//             return {
//               pet: record.get('pet').properties,
//               idu: record.get(`id(u)`).low,
//               idpet: record.get(`id(pet)`).low
//             }
//           });
//     res.json({
//       data: nodes
//     })
//   })
//   .catch(error => console.error(error))
// }
exports.getEditPet = async (req, res) => {
  const {id} = req.params;

req.session.readTransaction( async tx => {
  const result = await tx.run(`MATCH (p:Pet) WHERE id(p) = ${id} RETURN p,id(p)`);
  const nodes = result.records.map(record => {
    return { 
      p: record.get('p').properties,
      idpet: record.get(`id(p)`).low
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



exports.EditPet = (req, res) => {
  const {id,name,age,type,desc,weight ,imgp} = req.query;
  
  req.session
  .run(`MATCH (p:Pet) WHERE id(p) = ${id} SET p.name = "${name}", p.age = "${age}",p.desc= "${desc}",p.img= "${imgp}",
    p.type= "${type}",p.weight= "${weight}"  RETURN p , id(p)`)
  .then(data => {
    const nodes = data.records.map(record =>{
      return { 
        p: record.get('p').properties,
      idpet: record.get(`id(p)`).low
    };
   });
    res.json({
      data: nodes
    })
  })
  .catch(error => console.error(error))
}




exports.getPet = async (req, res) => {
  const {id} = req.params;

req.session.readTransaction( async tx => {
  const result = await tx.run(`MATCH (u:User)-[:OWNER]->(pet:Pet) WHERE id(u) = ${id} RETURN pet,id(u),id(pet)`);
  const nodes = result.records.map(record => {
    return { 
      pet: record.get('pet').properties,
      idu: record.get(`id(u)`).low,
      idpet: record.get(`id(pet)`).low
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

exports.getMyPet = async (req, res) => {
  const {id} = req.params;

req.session.readTransaction( async tx => {
  const result = await tx.run(`MATCH (u:User)-[:OWNER]->(pet:Pet) WHERE id(u) = ${id} RETURN pet,id(u),id(pet)`);
  const nodes = result.records.map(record => {
    return { 
      pet: record.get('pet').properties,
      idu: record.get(`id(u)`).low,
      idpet: record.get(`id(pet)`).low
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

exports.addPet = (req, res) => {
  const { id , name , age ,type , weight , desc ,imgp} = req.query;
  req.session
  .run(`
  MATCH (u:User) 
  WHERE id(u) = ${id} 
  CREATE (pet:Pet{name:'${name}',age:'${age} months',img:'${imgp}',type:'${type}',weight:'${weight}',desc:'${desc}'})
  CREATE (u)-[:OWNER]->(pet)
  RETURN pet,id(u),id(pet)`)
  .then(data => {
   
    const nodes = data.records.map(record => {
      return {
        pet: record.get('pet').properties,
        idu: record.get(`id(u)`).low,
        idpet: record.get(`id(pet)`).low
    }
    });
   
    res.json({
      data: nodes
    })
  
  })
  .catch(error => console.error(error))
}

exports.deletePet = (req, res) => {
  const { id } = req.query;
  req.session
  .run(`
  MATCH (p:Pet) WHERE id(p) = ${id} DETACH DELETE p RETURN p`)
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