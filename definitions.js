/* Pose node definitions */
var nodes = [
    {name: 'head'},
    {name: 'neck'},
    {name: 'right shoulder'},
    {name: 'right elbow'},
    {name: 'right hand'},
    {name: 'left shoulder'},
    {name: 'left elbow'},
    {name: 'left hand'},
    {name: 'right hip'},
    {name: 'left hip'},
    {name: 'right knee'},
    {name: 'left knee'},
    {name: 'right ankle'},
    {name: 'left ankle'}
];

/* Pose edge definitions */
var edges = [
    {index: [0,1]},
    {index: [5,9], color: [0, 128, 255]},
    {index: [9,11], color: [0, 128, 255]},
    {index: [11,13], color: [0, 128, 255]},
    {index: [8,9]},
    {index: [2,8], color: [0, 255, 128]},
    {index: [8,10], color: [0, 255, 128]},
    {index: [10,12], color: [0, 255, 128]},
    {index: [1,2], color: [0, 255, 128]},
    {index: [2,3], color: [0, 255, 128]},
    {index: [3,4], color: [0, 255, 128]},
    {index: [1,5], color: [0, 128, 255]},
    {index: [5,6], color: [0, 128, 255]},
    {index: [6,7], color: [0, 128, 255]}
];

/* Example1 node definitions */
var example1_nodes = [
    {position: [ 50,  14]},
    {position: [ 50,  55]},
    {position: [ 21,  68]},
    {position: [ 23, 114]},
    {position: [ 13, 156]},
    {position: [ 81,  69]},
    {position: [ 81, 119]},
    {position: [ 86, 155]},
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
    {position: [ 57,  53]},
    {position: [ 85,  67]},
    {position: [ 88, 120]},
    {position: [ 82, 153]},
    {position: [ 27,  60]},
    {position: [ 14, 109]},
    {position: [ 14, 150]},
    {position: [ 67, 161]},
    {position: [ 33, 159]},
    {position: [ 64, 222]},
    {position: [ 31, 224]},
    {position: [ 62, 300]},
    {position: [ 35, 300]}
];