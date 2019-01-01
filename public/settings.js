export default {
	View: {
		DebugMode: false,
		HUD: true,
		Tile: {
			Width: 128,
			Height: 128,
			Target: 128
		}
	},

	Input: {		
		Mouse: {
			Primary: 0,			// "B1" | Main / Left
			Auxillary: 1,		// "B2" | Auxillary / Middle / Wheel Down
			Secondary: 2,		// "B3" | Secondary / Right
			Button4: 3,			// "B4" | Button 4 / Thumb Back / "Browser Back"
			Button5: 4			// "B5" | Button 5 / Thumb Front / "Browser Forward"
		}
	},

	Bindings: {
		DebugMode: [ "F3" ],			//	F3
		HUD: [ "v" ],
		Movement: {
			Left: [ "a", "ArrowLeft" ],
			Right: [ "d", "ArrowRight" ],
			Up: [ "w", "ArrowUp" ],
			Down: [ "s", "ArrowDown" ]
		},
		Action: {
			Primary: [ "q", "MB1" ],
			Secondary: [ "e", "MB2" ],
			Interact: [ "Space", "Shift+MB1" ],
			Slots: {
				1: [ "1" ],
				2: [ "2" ],
				3: [ "3" ],
				4: [ "4" ],
				5: [ "5" ],
				6: [ "6" ],
				7: [ "7" ],
				8: [ "8" ],
				9: [ "9" ],
				0: [ "0" ]
			}
		}
	}
};