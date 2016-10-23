# Emitter

Emitter is a tiny module for raising and listening to arbitrary events in Javascript.

## Getting Started

Download the file, and include in the browser, or require the file in node.js

### Usage

`emitter = new Emitter()`

emitter.on("myEvent", function(argObject){
	console.log(argObject);
})

`emitter.raise("myEvent", {name : "myName", value : "myValue"})`

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details