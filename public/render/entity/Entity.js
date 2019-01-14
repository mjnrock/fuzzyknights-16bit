import Canvas from "./../drawing/Canvas.js";

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
		
		this.Canvas = new Canvas();
		this.Canvas.id = this.Entity.UUID;
		
		//TODO Change this to actually care about Entity Width/Height once implemented
		this.Canvas.SetWidth(this.FuzzyKnights.Game.Settings.View.Tile.Width).SetHeight(this.FuzzyKnights.Game.Settings.View.Tile.Height);

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

	GetTilePosition() {
		return [ 0, 0 ];
	}
	GetTileColor() {
		return null;
	}
	GetTileCoordinates() {
		let rot = this.FuzzyKnights.Component.Mutator.Worlds.GetAngle(this.Entity) || 0,
			tx = rot.Theta / 45 || 0,
			ty = 0;

		//TODO Change tiles based on State

		return [ tx, ty ];
	}

	Render() {
		this.Canvas.PreDraw();
		
		this.Canvas.DrawTile(
			this.GetImage(),
			...this.GetTilePosition(),
			...this.GetTileCoordinates()
		);

		return this.Canvas;
	}
}

export { Entity };