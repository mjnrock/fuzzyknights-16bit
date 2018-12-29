import { Element } from "./Element.js";
import Heading from "../../utility/physics/Heading.js";

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
		
		this.Heading = Heading.Generate(x, y, 0);
		this.MapIdentifier = mapIdentifier;
	}

	GetHeading() {
		return this.Heading;
	}
	SetHeading(x = 0, y = 0, r = 0) {
		this.Heading = Heading.Generate(x, y, r);
		
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