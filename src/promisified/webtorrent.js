import BaseWebTorrent from "webtorrent";

class WebTorrent extends BaseWebTorrent {
  add(torrentId, opts) {
    return new Promise((resolve, _) => {
      super.add(torrentId, opts, resolve);
    });
  }

  seed(input, opts) {
    return new Promise((resolve, _) => {
      super.seed(input, opts, resolve);
    });
  }

  remove(torrentId) {
    return new Promise((resolve, _) => {
      super.remove(torrentId, resolve);
    });
  }

  destroy() {
    return new Promise((resolve, _) => {
      super.destroy(resolve);
    });
  }
}

export default WebTorrent;
