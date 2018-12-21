class Entity {
	static ASSETS(filepath = null) {
		if(filepath !== null) {
			let ext = RegExp(/(?:\.([^.]+))?$/).exec(filepath);
			if(filepath[filepath.length - 1] !== "/" && ext[1] === void 0) {
				return `./assets/image/${ filepath }.png`;
			}

			return `./assets/image/${ filepath }`;
		}

		return "./assets/image/";
	}
	static TERRAIN(filepath = null) {
		if(filepath !== null) {
			return `terrain/${ filepath }`;
		}

		return "terrain/";
	}
	static ENTITY(filepath = null) {
		if(filepath !== null) {
			return `entity/${ filepath }`;
		}

		return "entity/";
	}

	constructor(filename, onload = null) {
		this.Filename = filename;
		this.Image = new Image();
		this.Image.src = Entity.ASSETS(filename);

		if(onload !== null && typeof onload === "function") {
			this.Image.onload = (e) => onload(this, e);
		}
	}

	GetFilename() {
		return this.Filename;
	}
	GetImage() {
		return this.Image;
	}
}

export { Entity };