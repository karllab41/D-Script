angular.module("dendrogram-directive", [])

.directive("dendrogram", ["d3Service", function(d3Service){
    return {
        restrict: "E",
        scope: {
            vizData: "="
        },
        link: function(scope, element, attrs){
            
            //get d3 promise
            d3Service.d3().then(function(d3) {
                
                var margin = {top: 0, right: 320, bottom: 0, left: 0},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var tree = d3.layout.tree()
    .separation(function(a, b) { return a.parent === b.parent ? 1 : .5; })
    .children(function(d) { return d.children; })
    .size([height, width]);

var svg = d3.select(element[0]).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
				
                //bind data
                scope.$watch("vizData", function(newData, oldData) {
                    
                    //check for data
                    if (newData) {
                        
						var nodes = tree.nodes(newData);

  var link = svg.selectAll(".link")
      .data(tree.links(nodes))
    .enter().append("path")
      .attr("class", "link")
      .attr("d", elbow);

  var node = svg.selectAll(".node")
      .data(nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })

  node.append("text")
      .attr("class", "name")
      .attr("x", 8)
      .attr("y", -6)
      .text(function(d) { return d.name; });

  node.append("text")
      .attr("x", 8)
      .attr("y", 8)
      .attr("dy", ".71em")
      .attr("class", "about lifespan")
      .text(function(d) { return d.type; });

  node.append("text")
      .attr("x", 8)
      .attr("y", 8)
      .attr("dy", "1.86em")
      .attr("class", "about location")
      .text(function(d) { return d.url; });
                        
                    };
                    
                });   
                
                            function elbow(d, i) {
  return "M" + d.source.y + "," + d.source.x
       + "H" + d.target.y + "V" + d.target.x
       + (d.target.children ? "" : "h" + margin.right);
}
                
            });
            

            
        }
    }
    
}]);