package request

type Buy struct {
	Player PlayerRequest

	ShipName string
	Cannons  int
	Sight    int
	Speed    int
}
