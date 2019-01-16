import Canvas from "./Canvas.js";
import DebugView from "./DebugView.js";

// It is generally implied that there only will ever be 1 instance of this at a time, treat as such
class ViewPort {
	constructor(fk) {
		this.FuzzyKnights = fk;

		this.Canvas = new Canvas("viewport");
		this.Camera = new this.FuzzyKnights.Client.Render.Drawing.Actor(
			this.FuzzyKnights.Common.Game.GameManager.GetPlayer().GetEntity(),
			3
		);
		// this.Camera = new this.FuzzyKnights.Client.Render.Drawing.Camera(
		// 	this.FuzzyKnights.Common.Component.Mutator.Worlds.GetZone(this.FuzzyKnights.Common.Game.GameManager.GetPlayer().GetEntity()),
		// 	2,
		// 	2,
		// 	2			
		// );
		
		// this.HUD = new this.FuzzyKnights.Client.Render.Drawing.HUD(this.FuzzyKnights, this.Canvas);
		
		this.DebugView = new DebugView(fk, "debug");
	}

	Render(time) {
		this.Canvas.PreDraw();
		this.Canvas.DrawImage(
			this.Camera.GetFeed().GetHTMLCanvas(),
			((window.innerWidth - this.Camera.Canvas.Width) / 2),
			((window.innerHeight - this.Camera.Canvas.Height) / 2)
		);
		
		// if(this.FuzzyKnights.Common.Game.Settings.View.HUD && this.FuzzyKnights.Common.Game.GameManager.GetPlayer().GetEntity()) {
		// 	this.HUD.Draw(time, this.FuzzyKnights.Client.Render.RenderManager.GetCreatureModels());
		// }
		
		this.DebugView.Render(time);

		return this.Canvas;
	}
}

export default ViewPort;