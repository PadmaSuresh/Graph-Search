var incount=0;
var abrv1=[];
var iswitch=false;
function clear(elementID)
		{
		  
                  document.getElementById(elementID).innerHTML="";
		}
		var value=0;
		
//To add a new row for the Database Schema		
function addRowSc(tableID) {
 
            var table = document.getElementById(tableID);
 
            var rowCount = table.rows.length;
            var row = table.insertRow(rowCount);
 
            var cell1 = row.insertCell(0);
            var element1 = document.createElement("input");
            element1.type = "checkbox";
            element1.name="chkbox[]";
            cell1.appendChild(element1);
 
            
            var cell3 = row.insertCell(1);
	    var element2 = document.createElement("input");
            element2.type = "text";
            element2.id = "text";
	    element2.name = "txtbox";
            cell3.appendChild(element2);
 
	    var cell4 = row.insertCell(2);
	    var element3 = document.createElement("select");
	    element3.id="select1"+value;
	    cell4.appendChild(element3);
	    
	    var elements2=["keyword","string","boolean","int","long","bigint","float","double","ref","date","uuid","bytes"];
	    
	    for(i=0;i<elements2.length;i++){
	      var keyword=keyword+i;
	      keyword = document.createElement("option");
	      document.getElementById(element3.id).options.add(keyword);
	      keyword.text=elements2[i];
	    }
	  
	    var cell5 = row.insertCell(3);
	    var element4 = document.createElement("select");
	    element4.id="select2"+value;
	    cell5.appendChild(element4);
	    
	    var elements = ["one","many"];
	    for(i=0;i<elements.length;i++){
	        var element9=element9+i
	        element9 = document.createElement("option");
		document.getElementById(element4.id).options.add(element9);
		element9.text=elements[i];
	    }
	    
	    
	    var cell6 = row.insertCell(4);
	    var element5 = document.createElement("select");
	    element5.id="select3"+value;
	    cell6.appendChild(element5);
	    
	    var elements1 = ["Default","Absolute","Prefix","custom"];
	    for(i=0;i<elements1.length;i++){
	    var element8=element8+i;
	     element8 = document.createElement("option");
	    document.getElementById(element5.id).options.add(element8);
	    element8.text=elements1[i];
	    }
	    
	    value++; 
        }
	
//To delete the row in the Database Schema	
function deleteRowSc(tableID) {
            try {
            var table = document.getElementById(tableID);
            var rowCount = table.rows.length;
 
            for(var i=0; i<rowCount; i++) {
                var row = table.rows[i];
                var chkbox = row.cells[0].childNodes[0];
                if(null != chkbox && true == chkbox.checked) {
                    table.deleteRow(i);
                    rowCount--;
                    i--;
                }
             }
            }catch(e) {
                alert(e);
            }
        }
var valuee=0;
var rowCount1;
 var name1=[];var sel11=[];var sel21=[];var sel31=[];
 
 //Storing the new schema values in a JSON
function saveJSON() {
  
    document.getElementById("dataTableDiv").style.visibility = 'hidden';
    document.getElementById("tableGetData").style.visibility = 'visible';
    document.getElementById("update").style.visibility = 'visible';
    document.getElementById("add").style.visibility = 'visible';
    var table = document.getElementById("dataTable");
    var rowCount = table.rows.length;
    rowCount1=rowCount;
    var name=[];var sel1=[];var sel2=[];var sel3=[];
    
   
    var many=0;
   
    for(i=0;i<rowCount-1;i++){
     
		  name[i]=table.rows[i+1].cells[1].getElementsByTagName("input")[0].value;
		  if (i==0) {
		  sel1[i]=  document.getElementById("select1").value;
		  sel2[i] =document.getElementById("select2").value;
		  sel3[i]= document.getElementById("select3").value;
		   many=sel2[i];
		   if (many=="many") {
		     abrv1.push(i);
		     iswitch=true;
		    }
		    }
		   else
		   {
		    sel1[i]=  document.getElementById("select1"+(i-1)).value;
		    sel2[i] =document.getElementById("select2"+(i-1)).value;
		    sel3[i]= document.getElementById("select3"+(i-1)).value;
		    many=sel2[i];
		     if (many=="many") {
		       abrv1.push(i);
		       iswitch=true;
		     }
    }
    name1=name,sel11=sel1,sel21=sel2,sel31=sel3;
   }
   
  for(i=name.length-1;i>=0;i--)
    {
      var table=document.getElementById("tableGetDataa");
    // Create an empty <tr> element and add it to the 1st position of the table:
      var row = table.insertRow(0); 
    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      // Add some text to the new cells:
      cell1.innerHTML = name[i];
      cell2.innerHTML = '<input type="text" id="fact'+valuee+'">';
      valuee++;
	  }
     var oldTable= document.getElementById("tableGetDataa");
    var rowCountOld = oldTable.rows.length;
     var table = document.getElementById("myTableData");
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    row.style.background="brown";
    row.style.color="white";
    row.insertCell(0).innerHTML= 'SELECT';
    
    for(i=0;i<rowCountOld-1;i++)
    {
       row.insertCell(i+1).innerHTML = oldTable.rows[i].cells[0].innerHTML;      
    }
   
    row.insertCell(rowCountOld).innerHTML='DELETE';

    clear("dataTableDiv");
    clear("createdb");
}

//TO hide the div elements
function hideDiv() {
     // document.getElementById("Edbname").value = "";
      document.getElementById("update").style.visibility = 'hidden';
      document.getElementById("tableGetData").style.visibility = 'hidden';
      document.getElementById("add").style.visibility = 'hidden';
      document.getElementById("SENDREQUEST").style.visibility = 'hidden';
       clear("Edbname");
     
    document.getElementById("tableData").style.visibility = 'hidden';
    }
    
//To create a Database with the new schema     
function Edb()
{
  var schema=[];
  for(i=0;i<rowCount1-1;i++)
  {
    //Cardinality value for default option
    if (sel31[i]=="Default") {
	{
	
	 schema[i]={":fc/attr":":"+name1[i]+"",
		":fc/type":":fc.type/"+sel11[i]+"",
		":fc/cardinality":":"+sel21[i]+"",
		":fc/index":true};
      }
    }//Cardinality value for Absolute option
    else if (sel31[i]=="Absolute") {
       schema[i]={":fc/attr":":"+name1[i]+"",
		":fc/type":":fc.type/"+sel11[i]+"",
		":fc/cardinality":":"+sel21[i]+"",
		":fc/index":true,
		":fc/mapping":{":type":":string",":index":":not_analyzed"}};
    }//Cardinality value for Prefix option
    else if (sel31[i]=="Prefix") {
      schema[i]={":fc/attr":":"+name1[i]+"",
		":fc/type":":fc.type/"+sel11[i]+"",
		":fc/cardinality":":"+sel21[i]+"",
		":fc/index":true,
		":fc/mapping":{":type":":string",":analyzer":":simple"}};
    }
    
  }
   var db=document.getElementById("Edbname").value;
   //DB creation request to the server
    CreateDB(schema,db);
}



//To add a row to the table with datas	
function addRow() {
  
      document.getElementById("tableData").style.visibility = 'visible';
      document.getElementById("SENDREQUEST").style.visibility = 'visible';
    
   var oldTable= document.getElementById("tableGetDataa");
   var rowCountOld = oldTable.rows.length;
    
    var table = document.getElementById("myTableData");
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    
    row.insertCell(0).innerHTML= '<input type="radio" name="checkbox" value = "select"  onClick="Javacsript:getDetails(this)"/>';
    
 for(i=0;i<rowCountOld-1;i++)
 {
   
    row.insertCell(i+1).innerHTML = oldTable.rows[i].cells[1].getElementsByTagName("input")[0].value;      
 }
    row.insertCell(rowCountOld).innerHTML='<button  class="btn btn-default" onclick="deleteRow(this)"><span class="glyphicon glyphicon-trash"></span></button> ';

    
     
     for(i=0;i<valuee;i++){
      var calc="fact"+i;
       document.getElementById(calc).value="";
     }
     
      
}

 //delete a row from the table 
function deleteRow(obj) {
      
    var index = obj.parentNode.parentNode.rowIndex;
    var table = document.getElementById("myTableData");
    
    table.deleteRow(index);
    
}
//Display the values of the selected row
function getDetails(obj) {
      
   var index = obj.parentNode.parentNode.rowIndex;
   incount=index;
    var table= document.getElementById("myTableData");
   var vals=valuee,j=1;
   for(i=valuee;i>0;i--){
    var calc="fact"+(vals-1);
   document.getElementById(calc).value=table.rows[index].cells[j].innerHTML;
  vals--;
  j++;
   }
}

//To update the selected row 
function updateDetails() {
    var table= document.getElementById("myTableData");
   var vals=valuee,j=1;
   for(i=valuee;i>0;i--){
    var calc="fact"+(vals-1);
table.rows[incount].cells[j].innerHTML= document.getElementById(calc).value;
 vals--;
  j++;
   }
   for(i=0;i<valuee;i++){
      var calc="fact"+i;
       document.getElementById(calc).value="";
     }
}

//To send request to the server to add all the rows to the database
function AddData()
{
  var Erecords=[];
  var abrv=[];
  db1=document.getElementById("Edbname").value;
  var table= document.getElementById("myTableData");
  for(i=1;i<table.rows.length-1;i++)
  {
    var j=1;
    var obj={};
   if (iswitch==false) {

    for(z=0;z<name1.length;z++){
    obj[':item/'+name1[z]] =table.rows[i+1].cells[j].innerHTML;j++;
    }
    Erecords.push(obj);
   }
else{
  
  for(z=0;z<name1.length;z++){
    obj[':item/'+name1[z]] =table.rows[i+1].cells[j].innerHTML;j++;
    
    }
    Erecords.push(obj);
   for(k=0;k<abrv1.length;k++)
    {abrv[i-1] =table.rows[i+1].cells[abrv1[k]+1].innerHTML;
    var res = abrv[i-1].split(",");
    obj[':item/'+name1[abrv1[k]]] =res;
    }
    }
  }
 addDataToDB(Erecords,db1);
}

//TO view the database
function  view() {
  db=document.getElementById("dbname").value;
  document.getElementById("dbname").value="";
  ViewDB(db,renderData);
}
 var data=[];
 var obj=[];
 
 
  //Callback function for view Database
 function renderData(url) {
        var obj = url.response[':hits'];
        var cols = GetHeaders(obj);

        DBdata(obj,cols);
    }
 
 
//To get the datas other than headers in the database
function DBdata(obj,cols)
    {
        var table = document.getElementById("GetAvailDataa");
    
    
    
        for (var j = 0; j < obj.length; j++) {
            var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
            var player = obj[j];
            for (var k = 0; k < cols.length; k++) {
                var columnName = cols[k];
                 row.insertCell(k).innerHTML = player[columnName];
            }
    }
    }
    
    //To get the Headers in the Database
     function GetHeaders(obj) {
        var cols = new Array();
        var p = obj[0];
        for (var key in p) {
            cols.push(key);
        }
        
        clear("GetAvailDataa");
        var table = document.getElementById("GetAvailDataa");
	var table1=document.getElementById("GetAvailDataa").createCaption();
	table1.innerHTML="<h3><b>"+db+"</b></h3>"
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    row.style.background="brown";
    row.style.color="white";
    for (var i = 0; i < cols.length; i++) {
        row.insertCell(i).innerHTML = cols[i];
        }
        
        return cols;
    }
