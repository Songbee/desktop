import url from "url";
import path from "path";

import bencode from "bencode";
import isEqual from "lodash.isequal";
import parseTorrentFile from "parse-torrent-file";
import envPaths from "env-paths";
import WebTorrent from "../promisified/webtorrent";
import MPV from "../promisified/mpv";


class Release {
  constructor(torrent, meta={}) {
    this.torrent = torrent;
    this.server = null;

    this.meta = {
      title: meta.title || torrent.name,
      artist: meta.artist || "Unknown",
      tracks: meta.tracks || torrent.files.map((file) => ({
        title: file.name,
        artists: [],
        filename: file.path,
      })),
    };

    let fileNames = torrent.files.map((file) => file.name);
    let filePaths = torrent.files.map((file) => file.path);

    this.tracks = this.meta.tracks.map((track) => {
      let fileNum = fileNames.indexOf(track.filename);
      if (fileNum === -1) fileNum = filePaths.indexOf(track.filename);
      if (fileNum === -1) return;

      let release = this;
      return {
        title: track.title,
        artists: [this.meta.artist].concat(track.artists),
        release: release,
        fileNum: fileNum,
        get url() {
          if (!release.server) release.serve();
          return url.format({
            protocol: "http",
            // hostname is always [::], but on Windows this
            // doesn't work so we have what we have:
            hostname: "localhost",
            port: release.address.port,
            pathname: `/${fileNum}`,
          });
        },
        serve() {
          return this.url;
        }
      }
    }).filter((track) => !!track);  // Filter out undefined
  }

  get infoHash() {
    return this.torrent.infoHash;
  }

  serve() {
    if (this.server) return this.server;

    this.server = this.torrent.createServer();
    this.server.listen(0); // random port
    this.address = this.server.address();
    return this.server;
  }
}


const WINDOWS_SOCKET = String.raw`\\.\pipe\songbeempv`;


class Manager {
  constructor(debug=false) {
    let isWin = /^win/.test(process.platform);

    let paths = this.paths = { base: envPaths("Songbee", { suffix: "" }) };
    Object.assign(this.paths, {
      downloads: path.join(paths.base.cache, "downloads"),
    });

    this.playlist = [];

    this.webtorrent = new WebTorrent();
    this.player = new MPV({
      audio_only: !debug,
      socket: isWin ? WINDOWS_SOCKET : "/tmp/songbeempv.sock",
      debug: debug,
    });

    this.releases = {};
    this._trackShift = 0;
  }

  async add(torrent) {
    let parsed = bencode.decode(torrent);
    torrent = parseTorrentFile(parsed);

    if (this.releases.hasOwnProperty(torrent.infoHash)) {
      return this.releases[torrent.infoHash];
    }

    torrent = await this.webtorrent.add(torrent, {
      path: path.join(this.paths.downloads, torrent.infoHash),
    });
    let release = new Release(torrent);
    this.releases[torrent.infoHash] = release;

    return release;
  }

  async replacePlaylist(newPlaylist, track=-1) {
    // this puts the new playlist right after the current
    // playing song and removes everything else

    if (!isEqual(this.playlist, newPlaylist)) {
      console.log("Replacing the playlist.");
      this.player.clearPlaylist();
      this._trackShift = await this.player.getProperty("playlist/count");
      newPlaylist.map((track) => {
        this.player.append(track.url);
      });
      this.playlist = newPlaylist;
    } else {
      console.log("Playlist haven't changed!");
    }

    if (track !== -1) {
      this.switchTrack(track);
    }
  }

  switchTrack(track) {
    if (typeof track !== "number") {
      track = this.playlist.indexOf(track);
      if (track === -1) return;  // or throw?
    }

    this.player.setProperty("playlist-pos", track + this._trackShift);
  }

  quit() {
    this.player.freeCommand('{"command": ["quit", 0]}');
  }
}

export default Manager;
