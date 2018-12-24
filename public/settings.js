export default {
	// Entities: {
	// 	//	[ Enum.CreatureType, Speed, FollowRange ]
	// 	Creature: {
	// 		Raccoon: [ EnumCreatureType.HOSTILE, 1.6, 3 ]
	// 	}
	// },
	View: {
		Tile: {
			Width: 128,
			Height: 128
		}
	},
	Bindings: {
		Movement: {
			Left: [ 37, 65 ],		//	LEFT_ARROW, A
			Right: [ 39, 68 ],		//	RIGHT_ARROW, D
			Up: [ 38, 87 ],			//	UP_ARROW, W
			Down: [ 40, 83 ]		//	DOWN_ARROW, S
		},
		Action: {
			Primary: [ 81 ],		//	Q
			Secondary: [ 69 ],		//	E
			Interact: [ 32 ],		//	SPACE
			Slots: {
				1: [ 49, 97 ],		//	1, 1 (NumPad)
				2: [ 50, 98 ],		//	2, 2 (NumPad)
				3: [ 51, 99 ],		//	3, 3 (NumPad)
				4: [ 52, 100 ],		//	4, 4 (NumPad)
				5: [ 53, 101 ],		//	5, 5 (NumPad)
				6: [ 54, 102 ],		//	6, 6 (NumPad)
				7: [ 55, 103 ],		//	7, 7 (NumPad)
				8: [ 56, 104 ],		//	8, 8 (NumPad)
				9: [ 57, 105 ],		//	9, 9 (NumPad)
				0: [ 48, 96 ]		//	0, 0 (NumPad)
			}
		}
	}
};