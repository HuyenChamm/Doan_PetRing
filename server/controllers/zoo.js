exports.getAllPet = async (req, res) => {
  req.session.readTransaction( async tx => {
    const result = await tx.run(`MATCH (n:Pet) RETURN n , id(n)`);
    const nodes = result.records.map(record => {
      return { 
        p: record.get('n').properties,
        id: record.get(`id(n)`).low
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