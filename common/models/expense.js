module.exports = function(Expense) {

  //Method to get the category based expenses for the month.
	Expense.getMonthlyCategoryBasedAnalysis = function(cb)
	{
		ONE_MONTH = 30 * 24 * 60 * 60 * 1000;  // Month in milliseconds
		var lastDate = new Date(Date.now() - ONE_MONTH);
		var result = "";
		var jsonArr = [];
		Expense.find( { expensedate: {gt: lastDate} },
		function (err, instance)
		{
			var tempArr = [0, 0, 0, 0];
			console.log("instance.length is "+instance.length);
			for (var i=0;i<instance.length;i++)
			{
				if(instance[i].expensedate > lastDate)
				{
					console.log("in if");
					if(instance[i].category == "Food")
						tempArr[0] = tempArr[0] + instance[i].price;
					else if (instance[i].category == "Travel")
						tempArr[1] = tempArr[1] + instance[i].price;
					else if (instance[i].category == "Education")
						tempArr[2] = tempArr[2] + instance[i].price;
					else if (instance[i].category == "Miscellaneous")
						tempArr[3] = tempArr[3] + instance[i].price;
				}
			}
			for (var i = 0; i < tempArr.length; i++) {
			console.log("temp arr is "+tempArr[i]);
				var cat = "";
				if(i == 0) cat = "Food";
				if(i == 1) cat = "Travel";
				if(i == 2) cat = "Education";
				if(i == 3) cat = "Miscellaneous";
				//create the JSON for the client to consume
				jsonArr.push({
					"category": cat,
          "period": "LastMonth",
					"price": tempArr[i]
				});
			}
			console.log("json to be returned for the category based report is "+jsonArr);
			response = jsonArr ;

  		cb(null, response);
		});
	}
	//Expose the method as a REST API
	Expense.remoteMethod ('getMonthlyCategoryBasedAnalysis',{
          http: {path: '/getMonthlyCategoryBasedAnalysis', verb: 'get'},
          //accepts: {arg: 'categoryName', type: 'string', http: { source: 'query' } },
          returns: {arg: 'data', type: 'string'}
        }
    );


};
