/* 16 Points */
/* Pose node definitions */
var nodes = [
    {name: 'Head Top'},//0
    {name: 'Upper Neck'},//1
    {name: 'Thorax'},//2
    {name: 'Right Shoulder'},//3
    {name: 'Right Elbow'},//4
    {name: 'Right Hand'},//5
    {name: 'Left Shoulder'},//6
    {name: 'Left Elbow'},//7
    {name: 'Left Hand'},//8
    {name: 'Pelvis'},//9
    {name: 'Right Hip'},//10
    {name: 'Left Hip'},//11
    {name: 'Right Knee'},//12
    {name: 'Left Knee'},//13
    {name: 'Right Ankle'},//14
    {name: 'Left Ankle'}//15
];

/* Pose edge definitions */
var edges = [
    {index: [0,1]},
    {index: [1,2]},
    {index: [9,11], color: [0, 128, 255]},
    {index: [11,13], color: [0, 128, 255]},
    {index: [13,15], color: [0, 128, 255]},
    {index: [2,9]},
    {index: [9,10], color: [0, 255, 128]},
    {index: [10,12], color: [0, 255, 128]},
    {index: [12,14], color: [0, 255, 128]},
    {index: [2,3], color: [0, 255, 128]},
    {index: [3,4], color: [0, 255, 128]},
    {index: [4,5], color: [0, 255, 128]},
    {index: [2,6], color: [0, 128, 255]},
    {index: [6,7], color: [0, 128, 255]},
    {index: [7,8], color: [0, 128, 255]}
];

/* Example1 node definitions */
var example1_nodes = [
    {position: [ 50,  14]},
    {position: [ 50,  50]},
    {position: [ 50, 73]},//Thorax
    {position: [ 21,  68]},
    {position: [ 23, 114]},
    {position: [ 13, 156]},
    {position: [ 81,  69]},
    {position: [ 81, 119]},
    {position: [ 86, 155]},
    {position: [ 50, 155]},//Pelvis
    {position: [ 34, 160]},
    {position: [ 70, 160]},
    {position: [ 23, 224]},
    {position: [ 75, 223]},
    {position: [ 21, 294]},
    {position: [ 80, 296]}
];

/* Example2 node definitions */
var example2_nodes = [
    {position: [ 57,  11]},
    {position: [ 57,  47]},
    {position: [ 55,  68]},//Thorax
    {position: [ 85,  67]},
    {position: [ 88, 120]},
    {position: [ 82, 153]},
    {position: [ 27,  60]},
    {position: [ 14, 109]},
    {position: [ 14, 150]},
    {position: [ 50, 155]},//Pelvic
    {position: [ 67, 161]},
    {position: [ 33, 159]},
    {position: [ 64, 222]},
    {position: [ 31, 224]},
    {position: [ 62, 300]},
    {position: [ 35, 300]}
];

// Create an example.
createExample = function(document, imageURL, example_nodes, type)
{
    return new GraphAnnotator(imageURL, {
        container: document.getElementById('example-' + type),
        graph: { nodes: example_nodes, edges: edges },
        nodeColor: [255, 255, 255],
        onload: function() {
            // Highlight the first node.
            this.setNodeAttributes(0, {color: [255, 0, 0], diameter:5});
        }
    });
}

deepCopy = function(object)
{
    return JSON.parse(JSON.stringify(object));
}

var BASE_URL = 'data/';
var graphs = [], graph = {};
var image_names;

$.ajax({
    url: "data.json",
    async: false,
    dataType: 'json',
    success: function(data) {
        image_names = data;
    }
});

getScales = function(n)
{
    var scales = [], image;
    for (var i = 0; i < n; i++){
        image = new Image();
        image.src = BASE_URL + image_names[i];
        scales.push(image.height / 500.);
    }
    return scales;
}

creatAnnotator = function(document, image_num, example1, example2)
{
    if (graphs.length == image_num-1){
        imageURL = BASE_URL + image_names[image_num-1];
        graph = { image: imageURL, nodes: nodes, edges: edges };
    } else {
        graph = graphs[image_num-1];
    }
    var annotator = new GraphAnnotator(graph.image, {
        container: document.getElementById('annotator'),
        graph: graph,
                              
        onload: function() {
            var current_node = 0;
            while (graph.nodes[current_node].position !== undefined) current_node++;
            document.getElementById('message').innerHTML = 'Click ' + nodes[current_node].name;
            example1.setNodeAttributes({color: null, diameter: 3});
            example2.setNodeAttributes({color: null, diameter: 3});
            example1.setNodeAttributes(current_node, {color: [255, 0, 0], diameter: 5});
            example2.setNodeAttributes(current_node, {color: [255, 0, 0], diameter: 5});
        },
                                
        onselect: function(current_node) {
            // Highlight the current node.
            example1.setNodeAttributes({color: null, diameter: 3});
            example2.setNodeAttributes({color: null, diameter: 3});
            this.setNodeAttributes(current_node, {color: [255, 0, 0], diameter: 5});
            example1.setNodeAttributes(current_node, {color: [255, 0, 0], diameter: 5});
            example2.setNodeAttributes(current_node, {color: [255, 0, 0], diameter: 5});
        },
                                
        onchange: function(current_node, which) {
            // Reset the node style.
            this.setNodeAttributes(current_node, {visibility: nodeVisibility(which), color: nodeColor(which), diameter: 3});
            example1.setNodeAttributes(current_node, {color: null, diameter: 3});
            example2.setNodeAttributes(current_node, {color: null, diameter: 3});
            var nextNode = this.getNextNode();
            if (nextNode === null) {
                // Finished.
                document.getElementById('message').innerHTML = 'Finished';
            } else {
                // Highlight the next node.
                document.getElementById('message').innerHTML = 'Click ' + nodes[nextNode].name;
                example1.setNodeAttributes(nextNode, {color: [255, 0, 0], diameter: 5});
                example2.setNodeAttributes(nextNode, {color: [255, 0, 0], diameter: 5});
            }
            graph = this.getGraph();
        }
    });
    annotator.image.height = 500;
    return annotator;
}

/* Convert graph to the final annotation object */
toResult = function(graphs)
{
    var results = [], scales = getScales(graphs.length);
    var vis, coords;
    
    for (var i = 0; i < graphs.length; i++){
        var new_nodes = [], new_obj = {};
        for (var j = 0; j < graphs[i].nodes.length; j++){
            var new_node = {};
            
            isAnnotated = graphs[i].nodes[j].position !== undefined;
            if (isAnnotated){
                vis = deepCopy(graphs[i].nodes[j]['visibility']);
                coords = deepCopy(graphs[i].nodes[j]['position']);
                coords[0] = Math.floor(coords[0] * scales[i]);
                coords[1] = Math.floor(coords[1] * scales[i]);
                new_node[graphs[i].nodes[j]['name'].toLowerCase()] = [coords[0], coords[1], vis];
            } else {
                new_node[graphs[i].nodes[j]['name'].toLowerCase()] = [];
            }
            new_nodes.push(new_node);
        }
        new_obj[graphs[i].image] = new_nodes;
        results.push(new_obj);
    }
    return results;
}
