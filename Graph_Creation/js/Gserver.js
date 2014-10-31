var URL = "http://analyze.formcept.com/awsem/services/factordb/graph/gs";

function sendRequestCreateNode(param) {

	var myURL = URL+'/type?gdb=crictest&uid=test&pp=06d81d798ab441dd964a61ff3945a917';	
	$.ajax({
		type: "POST",
		url:myURL,
                dataType: "json",
		data: param
		}).success(function(data) {
		}).error(function(data) {
                       fcLog("error");   	
		});
}
function sendRequestCreateLinks(param) {
 
	var myURL = URL+"/rel?gdb=crictest&uid=test&pp=06d81d798ab441dd964a61ff3945a917";
	$.ajax({
		type: "POST",
		url:myURL,
                dataType: "json",
		data: param
		}).success(function(data) {
		}).error(function(data) {   	
                       fcLog("error");                      
		});
}
function sendRequestGetGraph(cb) {
 
	var myURL = URL+"?gdb=crictest&uid=test&pp=06d81d798ab441dd964a61ff3945a917";	    
	$.ajax({
		type: "GET",
		url:myURL,
		success: cb
		}).error(function(url) {   
                       fcLog("error");              
		});
	
}
function sendRequestDeleteNode(param) {

	var myURL = URL+"/type?gdb=crictest&uid=test&pp=06d81d798ab441dd964a61ff3945a917&type="+param;	
	$.ajax({
		type: "DELETE",
		url:myURL,
		}).success(function(url) {
		}).error(function(url) {   	
                       fcLog("error");
		});
}
function sendRequestDeleteLinks(param1,param2,param3) {
	var myURL = URL+"/rel?gdb=crictest&uid=test&pp=06d81d798ab441dd964a61ff3945a917&stype="+param1+"&ttype="+param2+"&rel="+param3;	
	$.ajax({
		type: "DELETE",
		url:myURL,
		}).success(function(url) {
		}).error(function(url) {   
                       fcLog("error");                     
		});
}
function sendRequestDeleteGraph() {
	var myURL = URL+"?gdb=crictest&uid=test&pp=06d81d798ab441dd964a61ff3945a917";	
	$.ajax({
		type: "DELETE",
		url:myURL,
		}).success(function(url) {
		}).error(function(url) {   
                       fcLog("error");                   
		});
}