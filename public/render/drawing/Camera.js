import Cinematograph from "./Cinematograph.js";

class Camera extends Cinematograph {
	constructor(canvas = null) {
		super(null, canvas);
		
		this.Entity = null;
		this.Map = null;
		
		this.Helper = {
			Width: (this.Canvas.Width / Cinematograph.FuzzyKnights.Game.Settings.View.Tile.Target / 2) - 0.5,
			Height: (this.Canvas.Height / Cinematograph.FuzzyKnights.Game.Settings.View.Tile.Target / 2) - 0.5
		};
	}

	TrackPlayer(input) {
		if(input instanceof Cinematograph.FuzzyKnights.Render.Entity.Entity) {
			this.Map = Cinematograph.FuzzyKnights.Component.Mutator.Maps.GetMap(input.Entity);
			this.Entity = Cinematograph.FuzzyKnights.Render.RenderManager.GetEntity(input.Entity.UUID);
		} else if(input instanceof Cinematograph.FuzzyKnights.Entity.Entity) {
			this.Map = Cinematograph.FuzzyKnights.Component.Mutator.Maps.GetMap(input);
			this.Entity = Cinematograph.FuzzyKnights.Render.RenderManager.GetEntity(input.UUID);
		} else {
			let entity = Cinematograph.FuzzyKnights.Game.GameManager.GetPlayer().GetEntity();

			this.Map = Cinematograph.FuzzyKnights.Component.Mutator.Maps.GetMap(entity);
			this.Entity = Cinematograph.FuzzyKnights.Render.RenderManager.GetEntity(entity.UUID);
		}

		return this;
	}
	

	//TODO Rewrite this with no associate to player, but instead have something else send Player info here
	//TODO Lock entity in middle of screen and scroll Terrain around Entity
	//TODO ViewPort needs to receive this for a Player and for the Terrain around the Player
	Render(time) {
		super.Render(time);

		if(this.Entity) {
			let [ image, x, y, sx, sy ] = this.Entity.Render(time);

			//	Draw Entity in Middle of Screen
			this.Canvas.DrawTile(image, this.Helper.Width, this.Helper.Height, sx, sy);
		}

		return this;
	}
}

export default Camera;