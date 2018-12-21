class RenderManager {
	constructor(fk, canvasid) {
		this.FuzzyKnights = fk;
		this.CanvasId = canvasid;
		
		this.Stage = new createjs.StageGL(this.CanvasId);
		this.Width = this.Stage.canvas.width;
		this.Height = this.Stage.canvas.height;
		
		this.Loader = new createjs.LoadQueue(false);
		this.Sprites = [
			{
				src: "entity/raccoon.png",
				id: "entity-raccoon"
			}
		];
		this.Loader.loadManifest(this.Sprites, true, "./assets/image/");

		this.Loader.addEventListener("complete", this.OnInit.bind(this) );
	}

	OnInit() {
		let spriteSheet = new createjs.SpriteSheet({
			"framerate": 4,
			"images": [ this.Loader.getResult("entity-raccoon") ],
			"frames": {
				"regX": 0,
				"regY": 0,
				"width": 256,
				"height": 260,
				"count": 4
			},
			"animations": {
				"45": [ 768, 0, "45" ],
				"135": [ 0, 0, "135" ],
				"225": [ 256, 0, "225" ],
				"315": [ 512, 0, "315" ]
			}
		});

		let raccoon = new createjs.Sprite(spriteSheet, "135");
		raccoon.y = 35;

		this.Stage.addChild(raccoon);

		createjs.Ticker.setFPS(4);
		// createjs.Ticker.timingMode = createjs.Ticker.RAF;	// RAF: RequestAnimationFrame, RAF_SYNCHED: RAF w/ FrameRate syncing, TIMEOUT: setTimeout
		createjs.Ticker.addEventListener("tick", this.OnTick.bind(this));
	}

	OnTick(e) {
		if (!e.paused) {
			this.Tick(e.delta / 1000, e.runTime / 1000);
			
			this.Stage.update(event);
		}
	}

	Tick(time, runTime) {
		console.log(time, runTime);
	}
}

export { RenderManager };