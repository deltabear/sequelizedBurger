// for orm.js, use methods:
//selectAll()
//insertOne()
//updateOne()

//Export the ORM object in module.exports.
//===========

// Import MySQL connection.
var connection = require("../config/connection");


function printQuestionMarks(num) {
	var arr = [];

	for (var i = 0; i < num; i++) {
		arr.push("?");
	}

	return arr.toString();
}

// translates sql into a readable query
function objToSql(ob) {
	var arr = [];

	for (var key in ob) {
		arr.push(key + "=" + ob[key]);
	}

	return arr.toString();
}


//selectAll()
var orm = {
	// Function that returns all table entries
	selectAll: function(tableInput, cb) {
		// Construct the query string that returns all rows from the target table
		var queryString = "SELECT * FROM " + tableInput + ";";

		// Perform the database query
		connection.query(queryString, function(err, res) {
			if (err) {
				throw err;
			}

			// Return results in callback
			cb(res);
		});
	},

  //insertOne()
  // Inserts single table entry
  insertOne: function(table, cols, vals, cb) {
		// Construct the query string that inserts a single row into the target table
		var queryString = "INSERT INTO " + table;

		queryString += " (";
		queryString += cols.toString();
		queryString += ") ";
		queryString += "VALUES (";
		queryString += printQuestionMarks(vals.length);
		queryString += ") ";

		// console.log(queryString);

		// Perform the database query
		connection.query(queryString, vals, function(err, res) {
			if (err) {
				throw err;
			}

			// Return results in callback
			cb(res);
		});
	},

  
//updateOne()
  // Updates single table entry
  updateOne: function(table, objColVals, condition, cb) {
		// Construct the query string that updates a single entry in the target table
		var queryString = "UPDATE " + table;

		queryString += " SET ";
		queryString += objToSql(objColVals);
		queryString += " WHERE ";
		queryString += condition;

		// console.log(queryString);

		// Perform the database query
		connection.query(queryString, function(err, res) {
			if (err) {
				throw err;
			}

			// Return results in callback
			cb(res);
		});
	}
};

// Export the orm object for the model
module.exports = orm;
