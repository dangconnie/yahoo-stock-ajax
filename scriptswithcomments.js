// Wait for the DOM

// 1. Make getJSON into a function so you can call it whenever you need to.
// 2. Instead of auto saving their symbols, you give them a save button.
// 3. Retrieve button?
// 4. Put bookmarks on the side of the page2
// 5. automatically refresh all stocks every X seconds
// 6. keep the watchlist stocks in a separate table from searched stocks
// 7. Keep a "Recent" localStorage var, and a "saved" localStorage var
// 8. Pair up with BlackJack



$(document).ready(function(){

	$('#arrow1').click(function(){
		$('#page1,#page2').css({
			'right': '100vw'
		});
	});

	$('#arrow2').click(function(){
			$('#page1,#page2').css({
			'right': '0vw'/*go back to original position. you can also write 'left':0vw'*/
		});
	});


	// See if the user has any stored stocks. If so, then load them. We only need one param because you're recalling something that has been set.
	var userStocksSaved = localStorage.getItem('userStocks');
	// // we ran split on userStocks localStorage var and it became an array!
	// console.log(userStocksSaved);
	// for(let i=0; i<userStocksSaved.length; i++){
	// 	var htmlToPlot = buildStockRow(userStocksSaved[i]);
	// 	$('#stock-body').append(htmlToPlot);
	// }

	var url ='http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("'+userStocksSaved+'")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json'

	$.getJSON(url, function(dataJSGotIfAny){
		var stockInfo = dataJSGotIfAny.query.results.quote;
		if(dataJSGotIfAny.query.count == 1){
			// we know this is a single object becaues theres only 1
			var htmlToPlot = buildStockRow(stockInfo);
			$('#stock-body').append(htmlToPlot);				
		}else{
			// we know this is an array, because the count isnt 1
			for(let i = 0; i < stockInfo.length; i++){
				var htmlToPlot = buildStockRow(stockInfo[i]);
				$('#stock-body').append(htmlToPlot);
			}
		}
		// console.log("I'm back!");
	});


	$('.yahoo-form').submit(function(){
		// Code runs when form is submitted. You can use enter or click if you have button type="submit"

		// Stop the form from submitting (Browser's default is to submit all forms or when enter is clicked. We don't want this.)
		event.preventDefault();
		//Get whatever the user typed out of the input
		var symbol = $('#symbol').val();
		//New form of cookies. param: what it will be called ("userStocks") and what it will be set to ("symbol"). Need two parameters to set.
		localStorage.setItem("userStocks", symbol);

		// console.log(symbol);

		// Dynamically build the URL to use the symbol(s) the user requested
		// var url =`http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("${symbol}")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json`
		var url ='http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("'+userStocksSaved+'")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json'
		// console.log(url);

		// getJSON: param1 = where to go, param2 = what to do
		//Second param will not run until JS found
		$.getJSON(url, function(dataJSGotIfAny){
			// console.log(dataJSGotIfAny.query.results.quote);
			var stockInfo = dataJSGotIfAny.query.results.quote;
			// console.log("I'm back!");
			console.log(stockInfo);
			
			//Want to be able to enter two symbols in at once
			$.getJSON(url, function(dataJSGotIfAny){
				var stockInfo = dataJSGotIfAny.query.results.quote;
				if(dataJSGotIfAny.query.count == 1){
					// we know this is a single object becaues theres only 1
					var htmlToPlot = buildStockRow(stockInfo);
					$('#stock-body').append(htmlToPlot);				
				}else{
					// we know this is an array, because the count isnt 1
					for(let i = 0; i < stockInfo.length; i++){
						var htmlToPlot = buildStockRow(stockInfo[i]);
						$('#stock-body').append(htmlToPlot);
					}
				}
				// console.log("I'm back!");
			});
			// console.log("Where is JS?");

	});
});
			
function buildStockRow(stock){

	//Check to see if change is + or -
	// console.log(stock);
	if(stockInfo.Change.indexOf('+') > -1){
		// if >-1, there is a + somewhere in this string
		var classChange = "success";
	}else{
		var classChange = "danger";
	}

	var newHTML = '';
	// Have jquery target stock-body and replace it with our HTML. THis is case-sensitive!!
	newHTML += '<tr>;'
		newHTML += '<td>' +stockInfo.Symbol+ '</td>';
		newHTML += '<td>' +stockInfo.Name+ '</td>';
		newHTML += '<td>' +stockInfo.Ask+ '</td>';
		newHTML += '<td>' +stockInfo.Bid+ '</td>';
		newHTML += '<td class="'+classChange+'">' +stockInfo.Change+ '</td>';
	newHTML += '</tr>;'
	// console.log(newHTML);
	//We want JQuery to change the original html (the table with dashes) and replace it with the newHTML that we just created.
	// $('#stock-body').html(newHTML);---this wouldn't allow you to add on rows. 
	// $('#stock-body').append(newHTML);
	return newHTML;
}
		//This is the asynchronous part of JS(AJAX). getJSON can't run until JS gets info back, so it runs something else while it is waiting, such as this console.log("Where is JS?"); This line runs before getJSON. JS runs in the order of whatever it can. Check out the console.logs to see the order.
		// console.log("Where is JS?");
