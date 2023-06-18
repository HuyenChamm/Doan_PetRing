
const driver = require("../utils/db");

exports.getMess = (req, res) => {
  const session = driver.session();
  const {idu, id} = req.query;
  console.log(id, idu,"mess");
  session
    .run(`

    MATCH (u:User)-[:MESSAGE]->(m:MESSAGE)-[:SEND]->(u2:User)
    WHERE id(u) =${id} AND id(u2) = ${idu} OR id(u) = ${idu} AND id(u2) = ${id}
    RETURN u.name AS name , m.message AS mess ,m.send_at AS time  ,id(m) AS idm ,id(u) AS idu
    ORDER BY u.name
  `)
    .then(data => {
      const nodes = data.records.map(record => {
        return {
          name: record.get(`name`),
          m: record.get(`mess`),
          time: record.get(`time`),
          idu: record.get(`idu`).low,
          idm: record.get(`idm`).low
        };
    
      }
      );
      res.json({
        data: nodes
      })

    })
    .catch(error => console.error(error))
}

exports.getMessSend = (req, res) => {
  const session = driver.session();
  const { id, idu } = req.query;
  console.log(id, idu,"SEND");
  session
    .run(`
    MATCH (u:User)-[:MESSAGE]-> (m:MESSAGE) -[:SEND]-> (u2:User)
    WHERE id(u) =${id} AND id(u2) = ${idu}  RETURN m,u,u2,id(m)
  `)
    .then(data => {
      const nodes = data.records.map(record => {
        return {
          m: record.get('m').properties,
          u: record.get('u').properties,
          u2: record.get('u2').properties,
          idm: record.get(`id(m)`).low
        };

      }
      );
      console.log();
      res.json({
        data: nodes
      })


    })
    .catch(error => console.error(error))
}

exports.getMessReceive = (req, res) => {
  const session = driver.session();
  const { id, idu } = req.query;
  session
    .run(`
  MATCH (u:User)-[:MESSAGE]-> (m:MESSAGE) -[:SEND]-> (u2:User)
  WHERE id(u) = ${idu} AND id(u2) = ${id}  RETURN m,u,u2,id(m)
  `)
    .then(data => {
      const nodes = data.records.map(record => {
        return {
          m: record.get('m').properties,
          u: record.get('u').properties,
          u2: record.get('u2').properties,
          idm: record.get(`id(m)`).low
        };
      });

      res.json({
        data: nodes
      })
    })
    .catch(error => console.error(error))
}

exports.sendMess = (req, res) => {
  const session = driver.session();
  const { messageInput, id, idu, time } = req.query;
  console.log(messageInput, id, idu, time);
  session
    .run(`
    MATCH (u:User), (u2:User)
    WHERE id(u) = ${id} AND id(u2) = ${idu}
    CREATE (m:MESSAGE { message:'${messageInput}',send_at:'${time}'})
    CREATE (u)-[:MESSAGE]->(m)-[:SEND]->(u2)
    RETURN  u.name AS name , m.message AS mess ,m.send_at AS time  ,id(m) AS idm ,id(u) AS idu
  `)
    .then(data => {
      const nodes = data.records.map(record => {
        return {
          name: record.get(`name`),
          m: record.get(`mess`),
          time: record.get(`time`),
          idu: record.get(`idu`).low,
          idm: record.get(`idm`).low
        };
      });
      req.io.emit("sendmess",nodes[0])
      res.json({
        data: nodes[0]
      })
    
    })
    .catch(error => console.error(error))
}
