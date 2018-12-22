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

	constructor(fk, entity, filename, onload = null) {
		this.FuzzyKnights = fk;
		this.Entity = entity;
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
	GetEntity() {
		return this.Entity;
	}

	Render() {
		let pos = this.FuzzyKnights.Component.Mutator.Maps.GetPosition(this.Entity);

		return [
			this.GetImage(),
			pos.X,
			pos.Y,
			2,		// tx - These need to change based on STATE
			0		// ty - These need to change based on STATE
		];
	}
}

export { Entity };