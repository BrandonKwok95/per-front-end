const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "db",
  user: "root",
  password: "kwok95",
  database: "easyapp_test",
});

connection.connect();

const query = function (sql,arg) {
  return new Promise((resolve, reject) => {
    connection.query(sql, arg, function (error, results) {
      if(error){
        reject(error);
      }else{
        resolve(results)
      }
    });
  })
}

module.exports = query
