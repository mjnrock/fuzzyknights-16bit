const Direction = {
	NORTH:		1 << 0,
	EAST:		1 << 1,
	SOUTH:		1 << 2,
	WEST:		1 << 3
};

Direction.NORTH_EAST = Direction.NORTH | Direction.EAST;
Direction.NORTH_WEST = Direction.NORTH | Direction.WEST;
Direction.SOUTH_EAST = Direction.SOUTH | Direction.EAST;
Direction.SOUTH_WEST = Direction.SOUTH | Direction.WEST;

export default Direction;