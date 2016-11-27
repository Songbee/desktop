import {h, Component} from "preact";

class Release extends Component {
  constructor(props) {
    super(props);

    this.setState({
      activeRow: -1,
    });
  }

  render({ infoHash }) {
    let torrent = this.context.torrents.torrents[infoHash];
    window._torrent = torrent;
    return (
      <div>
        <h2>{torrent.name}</h2>
        <table class="table-striped">
          <thead>
            <tr>
              <th>Filename</th>
            </tr>
          </thead>
          <tbody>
            {torrent.files.map((file, i) => (
              <tr key={i}
                  class={(this.state.activeRow == i) ? "active" : ""}
                  onclick={() => this.setState({
                    activeRow: i,
                  })}
                  ondblclick={() => {
                    // this should start playing automatically
                    this.context.torrents.switchTrack(i);
                  }}>
                <td>{file.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style="opacity: .5;">Double-click any song to start playing!</p>
      </div>
    );
  }
}

export default Release;
