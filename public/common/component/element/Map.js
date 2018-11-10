import { Element } from "./Element.js";
import { Position } from "./../../utility/physics/2D/Position.js";

class Map extends Element {
	/**
	 * Stores Map details
	 * @param EnumMapType type 
	 * @param real x 
	 * @param real y 
	 * @param UUID mapIdentifier 
	 */
	constructor(type, x, y, mapIdentifier) {
		super(type);
		
		this.Position = new Position(x, y);
		this.MapIdentifier = mapIdentifier;
	}

	GetPosition() {
		return this.Position;
	}
	SetPosition(x, y) {
		this.Position = new Position(x, y);
		
		return this;
	}
	
	GetMapIdentifier() {
		return this.MapIdentifier;
	}
	SetMapIdentifier(mapIdentifier) {
		this.MapIdentifier = mapIdentifier;
		
		return this;
	}
}

export { Map };