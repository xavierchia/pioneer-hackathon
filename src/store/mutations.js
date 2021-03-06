import Vue from 'vue'

import { createPerson } from '../utils'

export default {
	// Update self audio track
	updateAudioTrack(state, track) {
		Vue.set(state.self.tracks, 'audio', track)
	},

	// Update self video track
	updateVideoTrack(state, track) {
		Vue.set(state.self.tracks, 'audio', track)
	},

	// Update or disconnect group ID
	setGroupID(state, groupID) {
		if(groupID != undefined) {
			Vue.set(state, 'groupID', groupID);
			Vue.set(state, 'connected', true);
		} else {
			Vue.set(state, 'groupID', '');
			Vue.set(state, 'connected', false);
		}
	},

	addPeer(state, peer) {
		console.log('ADDPEER', peer.id, peer.data);
		let person = createPerson(peer.data);
		console.log(peer.id, person);
		Vue.set(state.peers, peer.id, person);
	},

	removePeer(state, peer_id) {
		if (peer_id in state.peers) {
			state.peers[peer_id].connection.close();
			Vue.delete(state.peers, peer_id);
		}
	},

	addTrackToPeer(state, {peer_id, track}) {
		Vue.set(state.peers[peer_id].tracks, track.kind, track);
    },
    
    setName(state, {name, peer_id}) {
        if(peer_id) {
			// update name of peer
			Vue.set(state.peers[peer_id], 'name', name);
		} else {
			// update name of self
			Vue.set(state.self, 'name', name);
		}
    },

	setPosition(state, {point, peer_id}) {
		if(peer_id) {
			// update position of peer
			Vue.set(state.peers[peer_id], 'x', point.x);
			Vue.set(state.peers[peer_id], 'y', point.y);
		} else {
			// update position of self
			Vue.set(state.self, 'x', point.x);
			Vue.set(state.self, 'y', point.y);
		}
    },
    
    setDirection(state, {angle, peer_id}) {
        if(peer_id) {
            // update direction of peer
            Vue.set(state.peers[peer_id], 'angle', angle);
        } else {
            // update direction of self
            Vue.set(state.self, 'angle', angle);
        }
    },

    setPointer(state, {pointer, peer_id}) {
        if(peer_id) {
            // update pointer of peer
            Vue.set(state.peers[peer_id], 'pointer', pointer);
        } else {
            // update pointer of self
            Vue.set(state.self, 'pointer', pointer);
        }
    },

    setColor(state, {color, peer_id}) {
        if(peer_id) {
            // update color of peer
            Vue.set(state.peers[peer_id], 'color', color);
        } else {
            // update color of self
            Vue.set(state.self, 'color', color);
        }
    },

    setOrder(state, {order, peer_id}) {
        if(peer_id) {
            // update order of peer
            Vue.set(state.peers[peer_id], 'order', order);
        } else {
            // update order of self
            Vue.set(state.self, 'order', order);
        }
	},
	
	setPlaying(state, value) {
		Vue.set(state.boombox, 'playing', value);
	},

	addPlaylistItem(state, data) {
		Vue.set(state.boombox, 'playlist', [...state.boombox.playlist, data])
	},

	setCurrent(state, value) {
		Vue.set(state.boombox, 'current', value);
	},

	setPlaylist(state, playlist) {
		Vue.set(state.boombox, 'playlist', playlist);
	},
	
	setEmote(state, {emote, peer_id}) {
		if (peer_id) {
			Vue.set(state.peers[peer_id], 'emote', {emote});
		} else {
			Vue.set(state.self, 'emote', {emote});
		}
	}
}