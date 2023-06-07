const driver = require("../utils/db");

exports.recommendfr = (req, res) => {
  const session =driver.session();
  const {id} = req.query;
 
  session
  .run(`MATCH (currentUser:User)-[:FRIEND]-(commonFriend)-[:FRIEND]-(user:User)
        WHERE id(currentUser) = ${id} AND NOT (currentUser)-[:FRIEND]-(user)
        RETURN user, COUNT(commonFriend) AS commonFriendsCount, commonFriend
        ORDER BY commonFriendsCount DESC`)
  .then(data => {
    const nodes = data.records.map(record =>{
      return { 
        u: record.get('user').properties, 
        count: record.get('commonFriendsCount').low,
        fr: record.get('commonFriend').properties
    };
    } 
    );
       
    res.json({
      data: nodes
    })
  })
  .catch(error => console.error(error))

}