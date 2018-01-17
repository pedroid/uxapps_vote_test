var appVotes = "https://script.google.com/macros/s/AKfycby2Wz9zEFnY1GdUYS-hNerOhnz1dQI5LFdF8r3L1RdYZv_xSkc/exec";

$(document).ready(function() {
    $("#container div a").click(function() {
        $(this).parent().animate({
           width: '+=100px'
        }, 500);

        $(this).prev().html(parseInt($(this).prev().html()) + 1);
        return false;
    });
	
	$.get(appVotes,

		 {
			 "command":"commandGetAllVotes"
		 },
	   function (data) {
		 var ItemSet = data.split('||');
		ItemSet.pop();		 
		 for( ItemID in ItemSet){
			 var Item = ItemSet[ItemID];
			 var ItemID = Item.split('$$')[0];
			 var ItemName = Item.split('$$')[1];
			 var ItemVotes = Item.split('$$')[2];
			 $('#container').append(parameter2html(ItemID, ItemName, ItemVotes));
		 }


	   }
	);
});
var parameter2html_result = function(ItemID, ItemName, ItemVotes){
	var html_content = '';
	html_content+= "<div id=\"vote"
	html_content+=ItemID;
	html_content+="\"><span>";
	html_content+= ItemVotes;
	html_content+= "</span>   ";
	html_content+= ItemName;
	html_content+= "</div>";
	return html_content;
}
var parameter2html = function(ItemID, ItemName, ItemVotes){
	var html_content = '';
	html_content+= "<div id=\"vote"
	html_content+=ItemID;
	html_content+="\"><span>";
	html_content+= ItemVotes;
	html_content+= "</span><a href=\"javascript:vote(";
	html_content+=ItemID;
	html_content+=")\">Vote</a>";
	html_content+= ItemName;
	html_content+= "</div>";
	return html_content;
}

var vote = function(ItemID){
	//console.log(ItemID);
	var old_value = parseInt($('#vote'+ItemID+' span').html());
	$('#container').html("<span id=\"question\">What is your most-used language?</span>processing...")
	
   //console.log(old_value);
//   $('#vote'+ItemID+' span').html(old_value+1);
   
	$.get(appVotes,

		 {
			    "command":"commandVote",
				"ItemID":ItemID
		 },
	   function (data) {
		   $.get(appVotes,

		 {
			 "command":"commandGetAllVotes"
		 },
	   function (data) {
		   $('#container').html("<span id=\"question\">What is your most-used language?</span>")
		 var ItemSet = data.split('||');
		 
		ItemSet.pop();		 
		 for( ItemID in ItemSet){
			 var Item = ItemSet[ItemID];
			 var ItemID = Item.split('$$')[0];
			 var ItemName = Item.split('$$')[1];
			 var ItemVotes = Item.split('$$')[2];
			 $('#container').append(parameter2html_result(ItemID, ItemName, ItemVotes));
			 
		 }
		$('#container').append("<a href=\"\">Vote again</a>");

	   }
	);
		   
		   
	   }
	);
}