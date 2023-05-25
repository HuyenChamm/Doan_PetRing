exports.getUser = (req, res) => {
  const {id} = req.params;
 
  req.session
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
