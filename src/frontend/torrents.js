import url from "url";
import bencode from "bencode";
import parseTorrentFile from "parse-torrent-file";
import WebTorrent from "../promisified/webtorrent";
import MPV from "../promisified/mpv";

class TorrentManager {
  constructor() {
    this.webtorrent = new WebTorrent();
    this.torrents = {};
    this.server = null;
    this.player = new MPV({ audio_only: true });
    this._trackShift = 0;
    console.log("TorrentManager is ", this);
  }

  async add(torrent, serve=true) {
    let parsed = bencode.decode(torrent);
    torrent = parseTorrentFile(parsed);

    if (!this.torrents.hasOwnProperty(torrent.infoHash)) {
      torrent = await this.webtorrent.add(torrent);
      this.torrents[torrent.infoHash] = torrent;
    } else {
      torrent = this.torrents[torrent.infoHash];
    }

    if (serve) {
      this.serve(torrent);
    }

    return torrent;
  }

  async serve(torrent) {
    if (this.server) {
      this.server.close();
    }
    this.server = torrent.createServer();
    this.server.listen(0); // random port
    let serverAddr = this.server.address();

    this.player.clearPlaylist();
    this._trackShift = await this.player.getProperty("playlist/count");
    torrent.files.map((file, i) => {
      this.player.append(url.format({
        protocol: "http",
        hostname: serverAddr.address,
        port: serverAddr.port,
        pathname: `/${i}`
      }));
    });

    return this.server;
  }

  switchTrack(i) {
    this.player.setProperty("playlist-pos", i + this._trackShift);
  }
}

export default TorrentManager;
