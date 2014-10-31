var URL = "http://analyze.formcept.com/awsem/services/factordb";

function CreateDB(param,db) {
        
        var param1= 'db=' + db + '&schema=' + JSON.stringify(param) ;
        var myURL =URL+'?uid=test&pp=06d81d798ab441dd964a61ff3945a917';
	$.ajax({
		type: "POST",
		url:myURL,
                dataType: "json",
		data: param1
		}).success(function(data) {
		
		}).error(function(data) {   
                       fcLog("error");                       
		});
}

function Refresh(db) {
        
        var param1='refresh=true' ;
        var myURL =URL+'/sync?db=' + db+'&uid=test&pp=06d81d798ab441dd964a61ff3945a917';
	$.ajax({
		type: "POST",
		url:myURL,
                dataType: "json",
		data: param1
		}).success(function(data) {
	
		}).error(function(data) {   
                   fcLog("error");      
		});
}


function addDataToDB(param,db) {

        var param1='records='+JSON.stringify(param);
        myURL =URL+'/facts?db='+db+'&uid=test&pp=06d81d798ab441dd964a61ff3945a917';
	$.ajax({
		type: "POST",
		url:myURL,
                dataType: "json",
		data: param1
		}).success(function(data) {
			Refresh(db);
		}).error(function(data) {   
                       fcLog("error");
		});
}


function ViewDB(db,cb) { 

        var param='q={"query":{"match_all":{}}, "from":0, "size":15}';
        myURL =URL+'/query?db='+db+'&uid=test&pp=06d81d798ab441dd964a61ff3945a917';
	$.ajax({
		type: "POST",
		url:myURL,
                dataType: "json",
		data: param,
		success: cb
		}).error(function(data) {   
                       fcLog("error");
                       
		});
}

