
function setVisibility(id, visibility) {
document.getElementById(id).style.display = visibility;

}
var App = angular.module("GS",[  ]);

App.controller("GSCtrl",function  ($scope)
{
	var source,target;
	selected_node = null,
	selected_link = null,
	mousedown_link = null,
	mousedown_node = null,
	mouseup_node = null;
	var lastNodeId=1;
	
	$scope.types = [],
	$scope.rels = [];

	//function to delete the link of specified node
	function spliceLinksForNode(node) {
	    
	    var toSplice = $scope.rels.filter(function(l) {
		return (l.source=== node || l.target === node);
	    });
	    toSplice.map(function(l) {
	    $scope.rels.splice($scope.rels.indexOf(l), 1);
	    });
	}   
	//Adding a new node
	$scope.addNode=function()
	{	
		$scope.types.splice(0,0,{id :lastNodeId++, Type:"",Aka:"", Fmap:""});
		render();
	}
	$scope.addNode1=function()
	{
		var name=document.getElementById("nodeTypecreate").value;
		if (name!=0) {
		$scope.types.splice(0,0,{id : lastNodeId++, Type:name,Aka:"", Fmap:""});
		}
		render();	
	}
		
	//function to delete node and links of particular node
	$scope.del=function()
	{
		var name=document.getElementById("nodeTypeDel").value;
		 var URL = "http://analyze.formcept.com/awsem/services/factordb/gs/type?gdb=crictest&uid=test&pp=06d81d798ab441dd964a61ff3945a917&type=";
		URL=URL+name;
		for(var i=0;i<=lastNodeId;i++)
		{
		    if (name==$scope.types[i].TYPE)
		    {
				spliceLinksForNode($scope.types[i]);
				//sendRequestDeleteNode(name);//to delete node
				
				//fcDelete(URL, {success : function(a){}},"");
				fcDelete(URL,{success:function(a){
					
				}},'');
				
				
				
				$scope.types.splice($scope.types.indexOf($scope.types[i]), 1);
				render();
				setVisibility('visible', 'none');
				break;
		    }
		} 
	}
	
	
	//Function to delete the entire graph
	$scope.delall=function(){
	    sendRequestDeleteGraph();
	}
	var json,id=0,count=0;
	var datas=[];
	var AKA=0,TYPE=1,FMAP=2,TTYPE=1,STYPE=0,source1,target1,rel=2;
	
	//Function to get the whole graph
	$scope.getall=function()
	{ 
	    sendRequestGetGraph(callBack);
	}
	var getalll=function()
	{ 
	    sendRequestGetGraph(callBack);
	}
	
	//Function to get the datas from the server
	var callBack = function(url)
	{
	    
			$scope.types=[];
			$scope.rels=[];
			lastNodeId=1;
			json = $.parseJSON(url);
			for(count=0;count<json.response.types.length;count++)
			{
				for (name in json.response.types[count]) {
				    datas[AKA]=json.response.types[count][name].AKA;
				    datas[TYPE]=json.response.types[count][name].TYPE;
				    var fmap=JSON.stringify(json.response.types[count][name].FMAP);
				    $scope.types.push({id :lastNodeId++, TYPE: datas[TYPE],AKA: datas[AKA], FMAP:fmap});
				}
			}
			
			for(count=0;count<json.response.rels.length;count++)
			{	
				for (name in json.response.rels[count]) {   
				    datas[STYPE]=json.response.rels[count][name].STYPE;
				    datas[TTYPE]=json.response.rels[count][name].TTYPE;
				     datas[rel]=json.response.rels[count][name].TYPE;
				    for (i=0; i < $scope.types.length; i++)
				    {
					  if ($scope.types[i].TYPE == datas[STYPE])
					  {
							 source1=$scope.types[i].id;
							 
						for (i=0; i < $scope.types.length; i++)
						 {
							if ($scope.types[i].TYPE == datas[TTYPE])
							 {
								target1=$scope.types[i].id;
								
								$scope.rels.push({ source: source1-1  ,target: target1-1, relation :datas[rel]});
								
							 }}}}}}	
			render();
			
	}
	
	//to save all the modal textboxes
	$scope.save=function()
	{
    
		document.getElementById("d1").value=document.getElementById("data").value;
		document.getElementById("u1").value=document.getElementById("uid").value;
		document.getElementById("a1").value=document.getElementById("api").value;

	}

	//to clear all the modal textboxes
	 $scope.clearall=function()
	{
	document.getElementById("data").value="";
	document.getElementById("uid").value="";
	document.getElementById("api").value="";
	}
	//To clear all the tab textboxes
	 $scope.clearone=function()
	{
	document.getElementById("nodeTypecreate").value="";
	document.getElementById("nodeTypeupdate").value="";
	document.getElementById("nodeTypeDel").value="";
	document.getElementById("nodeAkaupdate").value="";
	document.getElementById("nodeFmapupdate").value="";
	
	}
	
	//to render the graph
	var render= function(){
		clear("svgVisualize");
	    	var width  = 960,height = 500,
		colors = d3.scale.ordinal().range(["#1f77b4"]);
		var svg = d3.select('#svgVisualize')
			    .append('svg')
			    .attr('width', width)
			    .attr('height', height);

		// set up initial nodes and links
		// init D3 force layout
		var force = d3.layout.force()
				     .nodes($scope.types)
				     .links($scope.rels)
				     .size([width, height])
				     .linkDistance(150)
				     .charge(-1000)
				     .on('tick', tick)
				     
		//Adding marker to the graph
		svg.append("svg:defs").selectAll("marker")
					.data(["end"])
					.enter().append("svg:marker")
					.attr("id", String)
					.attr("viewBox", "0 -5 10 10")
					.attr("refX", 23)
					.attr("refY", 0.4)
					.attr("markerWidth", 4)
					.attr("markerHeight", 4)
					.attr("orient", "auto")
					.append("svg:path")
					.attr("d", "M0,-5L10,0L0,5");
    


		// line displayed when dragging new nodes
		var drag_line = svg.append('svg:path')
				    .attr('class', 'link dragline hidden')
				    .attr('d', 'M0,0L0,0');

		// handles to link and node element groups
		var path = svg.append('svg:g').selectAll('path'),
		    circle = svg.append('svg:g').selectAll('g'),
		linktext=svg.append('svg:g').selectAll('linktext');
 
		function resetMouseVars() {
		  mousedown_node = null;
		  mouseup_node = null;
		  mousedown_link = null;
		}

		// update force layout (called automatically each iteration)
		function tick() {
		  // draw directed edges with proper padding from node centers
		    path.attr('d', function(d) {
		    var deltaX = d.target.x - d.source.x,
			deltaY = d.target.y - d.source.y,
			dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY),
			normX = deltaX / dist,
			normY = deltaY / dist,
			sourcePadding = d.left ? 17 : 12,
			targetPadding = d.right ? 17 : 12,
			sourceX = d.source.x + (sourcePadding * normX),
			sourceY = d.source.y + (sourcePadding * normY),
			targetX = d.target.x - (targetPadding * normX),
			targetY = d.target.y - (targetPadding * normY);
		    return 'M' + sourceX + ',' + sourceY + 'L' + targetX + ',' + targetY;
		     });
		  
		    linktext
		    .attr("x",function(d){
		    return ((d.source.x + d.target.x)/2);
		    })
		    .attr("y",function(d){
		    return ((d.source.y + d.target.y)/2);
		    })
		      circle.attr('transform', function(d) {
			return 'translate(' + d.x + ',' + d.y + ')';
		      });
		force.start();
		}

	// update graph (called when needed)
	function restart() {
	  path = path.data($scope.rels);
	
	  // update existing links
	  path.classed('selected', function(d) { return d === selected_link; })
	  .attr("marker-end", "url(#end)");
	
	
	  // add new links
	  path.enter().append('svg:path')
	    .attr('class', 'link')
	    .classed('selected', function(d) { return d === selected_link; })
	    .attr("marker-end", "url(#end)")
	
	    .on('mousedown', function(d) {
	      if(d3.event.ctrlKey) return;
	
	      // select link
	      mousedown_link = d;
	      if(mousedown_link === selected_link) selected_link = null;
	      else selected_link = mousedown_link;
	      selected_node = null;
	      restart();
	    });
	
	    linktext = linktext.data($scope.rels);
	      linktext.enter().append('svg:text')
	    .attr('class', 'linktext')
		.attr("text-anchor", "start")
		.attr("dx", 20)
		.attr("dy", ".25em")
	    .text(function(d){
		return d.relation;
	    })
	    
	    // remove old links
	    path.exit().remove();
	    circle = circle.data($scope.types, function(d) { return d.id;  });
	    
	    var g = circle.enter().append('svg:g');
	  
	    g.append('svg:circle')
	      .attr('class', 'node')
	      .attr('r', 35)
	      .style('fill', colors)
	      //to display on mouseover function
	      .on('mouseover', function(node) {
		  
		  document.getElementById("nodeId").value=node.id;
		  if (node.TYPE==null) {
					document.getElementById("nodeType").value="";
					document.getElementById("nodeAka").value="";
					document.getElementById("nodeFmap").value="";
				}
				else
				{
					document.getElementById("nodeType").value=node.TYPE;
					document.getElementById("nodeAka").value=node.AKA;
					document.getElementById("nodeFmap").value=node.FMAP;
				}
		      setVisibility('visible', 'inline');
	      })
	      
	      .on('mousedown', function(d) {
		if(d3.event.ctrlKey) return;
	  
		// select node
		mousedown_node = d;
		if(mousedown_node === selected_node) selected_node = null;
		else selected_node = mousedown_node;
		selected_link = null;
	  
		// reposition drag line
		drag_line
		  .attr("marker-end", "url(#end)")
	  
		  .classed('hidden', false)
		  .attr('d', 'M' + mousedown_node.x + ',' + mousedown_node.y + 'L' + mousedown_node.x + ',' + mousedown_node.y);
	  
		restart();
	      })
	      .on('mouseup', function(d) {
		if(!mousedown_node) return;
		drag_line
		  .classed('hidden', true)
		  .attr("marker-end", "url(#end)");
	  
		// check for drag-to-self
		mouseup_node = d;
		if(mouseup_node === mousedown_node) { resetMouseVars(); return; }
	  
		  var linkName=window.prompt("enter the link name");
		// add link to graph (update if exists)
		  source = mousedown_node;
		  target = mouseup_node;
		  
		  
				  
				  var request ={stype : source.TYPE, ttype:target.TYPE,rel:linkName ,aka : "known",fmap : "{'111':'11'}"};
				  sendRequestCreateLinks(request);
				  
		var link;
		  link = {source: source, target: target,relation:linkName
		  };
		  $scope.rels.push(link);
		  restart();
		  
		// select new link
		selected_link = link;
		selected_node = null;
		
		restart();
		
	      });

		// show node IDs
		g.append('svg:text')
		    .attr('x', 0)
		    .attr('y', 4)
		    .attr('class', 'id')
		    .text(function(d) { return d.TYPE; });
	      
		// remove old nodes
		circle.exit().remove();
	      
		// set the graph in motion
		force.start();
	      }
	      
	      function mousemove() {
		if(!mousedown_node) return;
	      
		// update drag line
		drag_line.attr('d', 'M' + mousedown_node.x + ',' + mousedown_node.y + 'L' + d3.mouse(this)[0] + ',' + d3.mouse(this)[1]);
	      
		restart();
	      }
	      
	      function mouseup() {
		if(mousedown_node) {
		  // hide drag line
		  drag_line
		    .classed('hidden', true)
		    //.style('marker-end', '');
		    .attr("marker-end", "url(#end)");
	      
		}
	      
		// because :active only works in WebKit?
		svg.classed('active', false);
	      
		// clear mouse event vars
		resetMouseVars();
	      }
	      
	      // only respond once per keydown
	      var lastKeyDown = -1;
	      
	      function keydown() {
	      
		if(lastKeyDown !== -1) return;
		lastKeyDown = d3.event.keyCode;
	      
		// ctrl
		if(d3.event.keyCode === 17) {
		  circle.call(force.drag);
		  svg.classed('ctrl', true);
		}
	      
		if(!selected_node && !selected_link) return;
		switch(d3.event.keyCode) {
		  case 46: // delete the selected link
		     if(selected_link) {
			sendRequestDeleteLinks(selected_link.source.TYPE,selected_link.target.TYPE,selected_link.relation);
		      $scope.rels.splice($scope.rels.indexOf(selected_link), 1);
		      
		    }
		    selected_link = null;
		    
		    restart();
		    break;
		  case 66: 
		    if(selected_link) {
		      // set link direction to both left and right
		      selected_link.left = true;
		      selected_link.right = true;
		    }
		    restart();
		    break;
		  case 76: 
		    if(selected_link) {
		      // set link direction to left only
		      selected_link.left = true;
		      selected_link.right = false;
		    }
		    restart();
		    break;
		  case 82: 
		    if(selected_node) {
		      // toggle node reflexivity
		      selected_node.reflexive = !selected_node.reflexive;
		    } else if(selected_link) {
		      // set link direction to right only
		      selected_link.left = false;
		      selected_link.right = true;
		    }
		    restart();
		    break;
		}
	      
	      }
	      
	      function keyup() {
		lastKeyDown = -1;
	      
		// ctrl
		if(d3.event.keyCode === 17) {
		  circle
		    .on('mousedown.drag', null)
		    .on('touchstart.drag', null);
		  svg.classed('ctrl', false);
		}
	      }
	      
	      // app starts here
	      svg//.on('mousedown', mousedown)
		.on('mousemove', mousemove)
		.on('mouseup', mouseup);
	      d3.select(window)
		.on('keydown', keydown)
		.on('keyup', keyup);
	      restart();
		      }
		      
		      $scope.update=function()
		      {
			      var id=document.getElementById("nodeId").value;
			      for(i=0;i<lastNodeId;i++)
			      {
			      if (id==$scope.types[i].id) {
				      $scope.types[i].Type=document.getElementById("nodeType").value;
				      $scope.types[i].Aka=document.getElementById("nodeAka").value;
				      $scope.types[i].Fmap=document.getElementById("nodeFmap").value;
				      var request ={type : $scope.types[i].Type,aka : $scope.types[i].Aka,fmap :$scope.types[i].Fmap};
				      sendRequestCreateNode(request);
				      setVisibility('visible', 'none');
				      clear("svgVisualize");
				      getalll();
				      render();
				      break;
			      }
			      }
			      
		      }
		      $scope.updatetab=function()
		      {
			      var type=document.getElementById("nodeTypeupdate").value;
			      for(i=0;i<lastNodeId;i++)
			      {
				      if (type==$scope.types[i].TYPE) {
				      $scope.types[i].Aka=document.getElementById("nodeAkaupdate").value;
				      $scope.types[i].Fmap=document.getElementById("nodeFmapupdate").value;
				      var request ={type : $scope.types[i].Type,aka : $scope.types[i].Aka,fmap : $scope.types[i].Fmap};
				      sendRequestCreateNode(request);
				      render();
				      break;
			      }
			      }
		      }
		      
		      
	      });

