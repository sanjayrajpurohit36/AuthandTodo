// /*  5 
//     5 4 
//     5 4 3
//     5 4 3 2
//     5 4 3 2 1
// */

// function printPyramid() {
//     var i,j,n=5; // n keeping it as 5 for now
//     for(i=n; i>=1; i--) {
//         for(j=n;j>=i;j--) {
//             console.log(j)
//         }
//         console.log("\n")
//     }
// }  
// printPyramid()



// function first(name,callback) { 
//     alert("inside first function");
//     callback();
// }

// function second() {
//     console.log("inside second one");
// }

// first("Sanjay",second);


var x = 5;
var y = x || 6;

var z = x + y;

console.log('value of z ', z);