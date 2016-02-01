// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
// *** CHANGE THE PLUGIN ID HERE *** - must match the "id" property in edittime.js
//          vvvvvvvv
cr.plugins_.JsontoC2Array = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	/////////////////////////////////////
	// *** CHANGE THE PLUGIN ID HERE *** - must match the "id" property in edittime.js
	//                            vvvvvvvv
	var pluginProto = cr.plugins_.JsontoC2Array.prototype;
		
	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function(plugin)
	{
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};

	var typeProto = pluginProto.Type.prototype;

	// called on startup for each object type
	typeProto.onCreate = function()
	{
	};

	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function(type)
	{
		this.type = type;
		this.runtime = type.runtime;
		
		// any other properties you need, e.g...
		// this.myValue = 0;
	};
	
	var instanceProto = pluginProto.Instance.prototype;

	// called whenever an instance is created
	instanceProto.onCreate = function()
	{
		// note the object is sealed after this call; ensure any properties you'll ever need are set on the object
		// e.g...
		// this.myValue = 0;
	};
	
	// called whenever an instance is destroyed
	// note the runtime may keep the object after this call for recycling; be sure
	// to release/recycle/reset any references to other objects in this function.
	instanceProto.onDestroy = function ()
	{
	};
	
	// called when saving the full state of the game
	instanceProto.saveToJSON = function ()
	{
		// return a Javascript object containing information about your object's state
		// note you MUST use double-quote syntax (e.g. "property": value) to prevent
		// Closure Compiler renaming and breaking the save format
		return {
			// e.g.
			//"myValue": this.myValue
		};
	};
	
	// called when loading the full state of the game
	instanceProto.loadFromJSON = function (o)
	{
		// load from the state previously saved by saveToJSON
		// 'o' provides the same object that you saved, e.g.
		// this.myValue = o["myValue"];
		// note you MUST use double-quote syntax (e.g. o["property"]) to prevent
		// Closure Compiler renaming and breaking the save format
	};
	
	// only called if a layout object - draw to a canvas 2D context
	instanceProto.draw = function(ctx)
	{
	};
	
	// only called if a layout object in WebGL mode - draw to the WebGL context
	// 'glw' is not a WebGL context, it's a wrapper - you can find its methods in GLWrap.js in the install
	// directory or just copy what other plugins do.
	instanceProto.drawGL = function (glw)
	{
	};
	
	// The comments around these functions ensure they are removed when exporting, since the
	// debugger code is no longer relevant after publishing.
	/**BEGIN-PREVIEWONLY**/
	instanceProto.getDebuggerValues = function (propsections)
	{
		// Append to propsections any debugger sections you want to appear.
		// Each section is an object with two members: "title" and "properties".
		// "properties" is an array of individual debugger properties to display
		// with their name and value, and some other optional settings.
		propsections.push({
			"title": "My debugger section",
			"properties": [
				// Each property entry can use the following values:
				// "name" (required): name of the property (must be unique within this section)
				// "value" (required): a boolean, number or string for the value
				// "html" (optional, default false): set to true to interpret the name and value
				//									 as HTML strings rather than simple plain text
				// "readonly" (optional, default false): set to true to disable editing the property
				
				// Example:
				// {"name": "My property", "value": this.myValue}
			]
		});
	};
	
	instanceProto.onDebugValueEdited = function (header, name, value)
	{
		// Called when a non-readonly property has been edited in the debugger. Usually you only
		// will need 'name' (the property name) and 'value', but you can also use 'header' (the
		// header title for the section) to distinguish properties with the same name.
		if (name === "My property")
			this.myProperty = value;
	};
	/**END-PREVIEWONLY**/

	//////////////////////////////////////
	// Conditions
	function Cnds() {};

	// the example condition
	Cnds.prototype.MyCondition = function (myparam)
	{
		// return true if number is positive
		return myparam >= 0;
	};
	
	// ... other conditions here ...
	
	pluginProto.cnds = new Cnds();
	
	//////////////////////////////////////
	// Actions
	function Acts() {};

	// the example action
	Acts.prototype.ConvertJson = function (myparam)
	{
        var object = [{"id": "6CF3E228-50E7-47E6-9849-2EB4332EE5D3","text": "Prepare Your Slides","complete": "false"},{"id": "DB74E5C3-C4D6-4F9F-8B9A-F0C83A600048","text": "Prepare Your Demo","complete": "false"},{"id": "FB1E47C8-71C9-4246-87EB-235153E2397A","text": "Don't Get Nervous","complete": "false"},{"id": "C6958AEA-32F2-4834-9B98-631E84D2EF56","text": "Talk Confidently","complete": "false"},{"id": "4D04412A-5570-47E3-B8C4-370B1AA8B685","text": "Believe in yourself","complete": "false"},{"id": "78DEEF3B-6425-4336-8B7A-FA86CE736DE2","text": "Great workshop!","complete": "false"},{"id": "1FAF1DFD-349B-44C3-A3BF-B2519F53C098","text": "James do your laundry!","complete": "false"},{"id": "60B7FB5E-F18B-439B-9939-E309E8C1CFE9","text": "Thanks for the presentation ","complete": "false"},{"id": "4DAC8F78-82D6-4C25-A56C-6CB72B7B49ED","text": "Thanks for the presentation ","complete": "1"},{"id": "686CFD99-9D81-4A0B-8799-273BB6A33E6C","text": "hi!","complete": "1"},{"id": "AA546FAC-9363-45A5-8BCF-D8C8987E33B0","text": "hi!","complete": "1"},{"id": "AC10D9E8-E5F1-41F9-BAAF-27B662F03493","text": "walk the dog","complete": "1"},{"id": "6E71F39E-4CFB-4429-908B-C62254854E84","text": "Hola","complete": "1"},{"id": "024BD640-A754-4A71-9388-C6D9018758D7","text": "hello","complete": "1"},{"id": "ABB63154-39FD-41EE-8254-33394EF01637","text": "Play some halo! ","complete": "false"},{"id": "9C4EFE33-1FCC-44A4-8138-FAE76939434F","text": "You rock from now nanny","complete": "1"},{"id": "C1A293D8-8BEF-40B5-8AC1-E8F406C2B501","text": "Play some halo! ","complete": "1"},{"id": "5926742A-CB28-4E0C-BED4-50FE65B4B12A","text": "James get your stuff together!","complete": "false"},{"id": "C8CDF3C9-C87E-4E68-BFD6-6014FC878C66","text": "Test Access Sig","complete": "false"},{"id": "EBE7AC03-0E26-4CD5-8870-835C13994233","text": "Test Access Sig","complete": "false"},{"id": "0C69C2E1-4EFB-4E87-B41C-92C0CCC929D4","text": "Test Access Sig 4","complete": "false"},{"id": "C4C4A071-D2C8-487B-ACE2-24874C876CF5","text": "Test Access Sig 5","complete": "false"},{"id": "B5C3DEC9-D76F-4B79-AA31-FA8A81D82273","text": "James Look Behind You","complete": "false"}]

		if (object.length === 0){
		
		}
		else
        {
		  //Get the number of records
    	    var width = Object.keys(object).length; //3 records
    		console.log(height);
       		//Get the number of columns per record
    	    var height = Object.keys(object[0]).length; //4 properties
    		console.log(width);

    	    var array = []

           // Map object to array
    		//For each record
    	    for (var i in object) {
    			//for each property in the record
    	        for (var e in object[i]) {
    	            object[i][e] === null ? object[i][e] = 0 : object[i][e] = '"' + object[i][e] + '"';
    	            array.push(object[i][e]);
    	        }
    	    }
	   	   console.log(array);
           // Create string in C2 format
    	    var c2ArrayData = "[";
    	    for (var i = 0; i < array.length; i++) {
    	        if (i < array.length && i > 0) c2ArrayData += ",";
    	        if (i % height === 0) c2ArrayData += "[";
    	        c2ArrayData += "[" + array[i] + "]";
    	        if ((i + 1) % height === 0) c2ArrayData += "]";
	       }
	       c2ArrayData += "]";

	       var c2Array = '{"c2array":true,"size":[' + width + ',' + height + ',1],"data":' + c2ArrayData + "}";
		  console.log(c2Array);
          // alert the message
		  alert(c2Array);
		}
		
	};
	
	// ... other actions here ...
	
	pluginProto.acts = new Acts();
	
	//////////////////////////////////////
	// Expressions
	function Exps() {};
	
	// the example expression
	Exps.prototype.ConvertJSON = function (ret, myparam)	// 'ret' must always be the first parameter - always return the expression's result through it!
	{
        console.log("Raw ParamString is " + myparam);
        var object = JSON.parse(myparam);
        console.log("Object is " + object);

		if (object.length === 0){
		  ret.set_string("Failed");
		}
		else
        {
		  //Get the number of records
    	    var width = Object.keys(object).length; //3 records
    		console.log(height);
       		//Get the number of columns per record
    	    var height = Object.keys(object[0]).length; //4 properties
    		console.log(width);
    	    var array = []
           // Map object to array
    		//For each record
    	    for (var i in object) {
    			//for each property in the record
    	        for (var e in object[i]) {
    	            object[i][e] === null ? object[i][e] = 0 : object[i][e] = '"' + object[i][e] + '"';
    	            array.push(object[i][e]);
    	        }
    	    }	
	   	   console.log(array);
           // Create string in C2 format
    	    var c2ArrayData = "[";
    	    for (var i = 0; i < array.length; i++) {
    	        if (i < array.length && i > 0) c2ArrayData += ",";
    	        if (i % height === 0) c2ArrayData += "[";
    	        c2ArrayData += "[" + array[i] + "]";
    	        if ((i + 1) % height === 0) c2ArrayData += "]";
	       }
	       c2ArrayData += "]";

	       var c2Array = '{"c2array":true,"size":[' + width + ',' + height + ',1],"data":' + c2ArrayData + "}";

		  console.log(c2Array);
          ret.set_string(c2Array);		// for ef_return_string
		}
		//ret.set_int(1337);				// return our value
		// ret.set_float(0.5);			// for returning floats
		 
		// ret.set_any("woo");			// for ef_return_any, accepts either a number or string
	};
	
	// ... other expressions here ...
	
	pluginProto.exps = new Exps();

}());