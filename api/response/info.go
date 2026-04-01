package response

import "Pirates/models/info"

type Info struct {
	Lookout  *info.LookOut
	Ship     *info.InfoShip
	Messages []info.Message `json:"messages,omitempty"`
	Error    string         `json:"error,omitempty"`
}
