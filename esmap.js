var m = new Map();
var o = {p: "Hello World"};

m.set(o, "content")
m.get(o) // "content"
console.log(m);
m.has(o) // true
m.delete(o) // true
m.has(o) // false
console.log(m);
