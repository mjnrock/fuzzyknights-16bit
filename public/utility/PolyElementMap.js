import ElementMap from "./ElementMap.js";

class PolyElementMap extends ElementMap {
	constructor(width, height, seedFn = (em) => em.Init([])) {
		super(width, height, seedFn);
	}

	//#	GetElement(x, y, UUID)
	//#	GetElement(x, y, index)
	//#	GetElement(x, y, SearchFunction) -> SearchFunction()
	FindElement(x, y, input) {
		let node = this.Get(x, y) || [];
		
		if(typeof input === "number") {
			//	Index
			return node[input];
		} else if(typeof input === "string" || input instanceof String) {
			//	UUID of something in the array
			return node.filter(ele => ele.UUID === input);
		} else if(typeof input === "function") {
			return input(x, y, node);
		}

		return node;
	}

	AddElement(x, y, element) {
		let node = this.Get(x, y);
		node.push(element);
		this.Set(x, y, node);

		return this;
	}
	
	//#	RemoveElement(x, y, UUID)
	//#	RemoveElement(x, y, index) 
	//#	RemoveElement(x, y, TxFunction) -> .Set(x, y, TxFunction())
	RemoveElement(x, y, input) {
		let node = this.Get(x, y);
		
		if(node) {
			if(typeof input === "number") {
				node.splice(input, 1);
			} else if(typeof input === "string" || input instanceof String) {
				node = node.filter(ele => ele.UUID !== input);
			} else if(typeof input === "function") {
				node = input(x, y, node);
			}
			this.Set(x, y, node);
		}

		return this;
	}

	ForEachElement(x, y, callback, ...args) {
		let node = this.Get(x, y);

		node.forEach(element => {
			callback({
				X: x,
				Y: y
			}, element, node, this, ...args);
		});

		return this;
	}
}

export default PolyElementMap;