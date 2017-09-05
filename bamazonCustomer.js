var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "password",
  database: "bamazon"
});
// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
});

 connection.query("SELECT * FROM products", function(err, results) {
   console.log(results);
   inquirer.prompt([
     {
       name:'id',
       type:'input',
       message:'What is the id of the product you would like to buy?'
     },
     {
       name:'quantity',
       type:'input',
       message:'How many would you like to buy'
     }
   ]).then(function(answer) {

   })
 });
