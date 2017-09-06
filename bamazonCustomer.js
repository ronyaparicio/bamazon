const mysql = require("mysql");
const inquirer = require("inquirer");
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

buyProducts();

function buyProducts() {

  connection.query("Select * from products", function(err, results) {
    if (err) throw err;
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
      for (let i = 0; i < results.length; i++) {
        if (results[i].product_ID === parseInt(answer.id)) {
          let newQuantity = results[i].quantity - parseInt(answer.quantity);
          let aQuantity = parseInt(answer.quantity);
          if (results[i].quantity >= parseInt(answer.quantity)) {
            console.log(newQuantity);
            connection.query(
              "UPDATE products SET ? WHERE ?",
              [
                {
                  quantity: newQuantity

                },{
                  product_ID: aQuantity
                }
              ],
              function(err) {
                if (err) throw err;
              console.log("Your purchase was successfull!");
              buyProducts();
              }
            );
          }
        }
      }
    });
  })
}
