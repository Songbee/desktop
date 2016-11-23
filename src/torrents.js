import url from "url";
import bencode from "bencode";
import parseTorrentFile from "parse-torrent-file";
import WebTorrent from "./promisified/webtorrent";
import ListPlayer from "listplayer";

class TorrentManager {
  constructor() {
    this.webtorrent = new WebTorrent();
    this.torrents = {};
    this.server = null;
    this.player = new ListPlayer({tracks: ["__HACK!__.mp3"]});
    console.log("TorrentManager is ", this);
  }

  async add(torrent, serve=true) {
    let parsed = bencode.decode(torrent);

    torrent = parseTorrentFile(torrent);
    torrent = await this.webtorrent.add(torrent);
    this.torrents[torrent.infoHash] = torrent;
    this.serve(torrent);
    return torrent;
  }

  serve(torrent) {
    if (this.server) {
      this.server.close();
    }
    this.server = torrent.createServer();
    this.server.listen(8998);
    let serverAddr = this.server.address();

    this.player.pause();
    this.player.seek(0);
    this.player.tracks = torrent.files.map((file, i) => ({
      title: file.name,
      src: url.format({
        protocol: "http",
        hostname: serverAddr.address,
        port: serverAddr.port,
        pathname: `/${i}`
      }),
    }));
    this.player.index = 0;

    return this.server;
  }
}

export default TorrentManager;
