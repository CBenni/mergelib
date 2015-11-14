

function merge(a,b) {
	if(a===undefined || a===null)return b;
	if(b===undefined || b===null)return a;
	var typea = typeof a;
	var typeb = typeof b;
	if(typea!=typeb) throw new TypeError('Hello', "someFile.js", 10);
	if(Array.isArray(a)) {
		var res = [];
		for(key in a) {
			res.push(a[key]);
		}
		for(key in b) {
			res.push(b[key]);
		}
		return res;
	} else if(typea==="object") {
		var res = {};
		for(key in a) {
			res[key] = a[key];
		}
		for(key in b) {
			res[key] = merge(a[key],b[key]);
		}
		return res;
	}
	return b;
}

var obj1 = {
	stringUnchanged: "val1",
	stringChanged: "val2",
	listChanged: [
		"val1",
		"val2",
		{ "key": "val3" }
	],
	listUnchanged: [
		"val4"
	],
	subkeyChanged: {
		"subkey1": "subval1",
		"subkey2": { "subsubkey1": "subsubval" }
	},
	subkeyUnchanged: {
		"subkey3": "subval2"
	}
}

var obj2 = {
	stringChanged: "val2changed",
	listChanged: [
		"val5added"
	],
	subkeyChanged: {
		"subkey1": "subval1changed",
		"subkey2": { "subsubkey1": "subsub1val" },
		"subkey3added": { "subsubkey2added": "subsubval2added" }
	}
}

var obj3 = merge(obj1,obj2);

console.log("First object:\n");
console.log(JSON.stringify(obj1,null,2));
console.log("\n\nSecond object:\n");
console.log(JSON.stringify(obj2,null,2));
console.log("\n\nMerged object:\n");
console.log(JSON.stringify(obj3,null,2));