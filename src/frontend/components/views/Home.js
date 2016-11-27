import fs from "fs";
import path from "path";
import {h, Component} from "preact";

const SAMPLE_TORRENTS = [
  "Eject.torrent",
  "Immersion.torrent",
].map((filename) => fs.readFileSync(path.join(__dirname, "../../../torrents", filename)));

class Home extends Component {
  handleAdd(i) {
    this.context.addTorrent(SAMPLE_TORRENTS[i]);
  }

  render({ infoHash }) {
    return (
      <div style="margin: 5px;">
        <h2>Welcome to Songbee.</h2>
        <p>To get started, drag and drop a music torrent here or select something cool below:</p>
        <p>
          <button class="btn btn-large btn-primary"
              onclick={() => this.handleAdd(1)}>
            Pendulum — Immersion [aac]
          </button>
        </p>
        <p>
          <button class="btn btn-mini btn-default"
              onclick={() => this.handleAdd(0)}>
            Cazzette — Eject [flac]
          </button>
          {" — untested, should work on hi-speed connections"}
          {/* Player doesn't work for some reason, mpv works fine */}
        </p>
      </div>
    );
  }
}

export default Home;
