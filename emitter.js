Emitter = function(isAsync){

	//Store used for events, keys are string, values are arrays of functions
	this.store = {}

	//Whether or not the emitter should raise events asynchronusly, default is true.
	this.async = isAsync == undefined ? true : isAsync;

	//Function for raising events, eventName is the key, argObject is a JSON object provided to all functions listening under the key
	this.raise = function(eventName, argObject){

		if(this.store[eventName] == undefined){

			console.warn("Emitter: No event with name '"+ eventName +"' has been defined");
			return;
		}
		else{

			//For each function listening to the eventName
			this.store[eventName].forEach(function(i){

				//Either asynchronusly
				if(this.async){

					//Create a function wrapper 
					var asyncFunction = function(){

						//To call the function with the argument object
						i(argObject);
					}

					//And invoke the wrapper without delay.
					setTimeout(asyncFunction, 0)
				}

				//Or Synchronusly
				else{
				
					//Just call the function with the argument object.
					i(argObject);
				}

			}, this) //Binding 'this' to 'emitter' in forEach loop
		}
	}

	//Function to add a listener 'func' to an event with string key 'eventName'
	this.on = function(eventName, func){

		if(typeof func !== "function"){

			throw new Error("Emitter.on : Usage Error (argument[1] is not a function, it is '"+(typeof func)+"'') ; should be .on(stringName, functionToCall)");
		}

		//If we are adding the first listener to a key, we need to create the store for potentially more
		if(this.store[eventName] == undefined){

			//The store is an array
			this.store[eventName] = [];
		}

		//push the function to invoke into the array.
		this.store[eventName].push(func);
	}

	return this;
}

Emitter.test = function(){

	emitter = new Emitter();

	emitter.on("call", function(argObject){
		console.log(argObject);
	})

	emitter.raise("call", {"name" : "testName", "type" : "testType", "testValue" : 0});
}

if(!window){

	module.exports = Emitter;
}