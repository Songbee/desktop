import { h, Component } from "preact";
import { route, Router } from "preact-router";

import blobToBuffer from "../../promisified/blob-to-buffer";
import { bind } from "decko";

import { AppHeader, AppSidebar, AppFooter, Spinner } from "./chrome";
import Home from "./views/Home";
import Release from "./views/Release";
import NowPlayingView from "./views/NowPlayingView";


class App extends Component {
  constructor(props) {
    super(props);
    this.backend = props.backend;
    this.setState({
      loading: false
    });
  }

  componentWillMount() {
    window.addEventListener("dragover", e => e.preventDefault());
    window.addEventListener("drop", this._handleDrop);
  }

  @bind
  async _handleDrop(event) {
    event.preventDefault()
    let files = (event.dataTransfer) ? event.dataTransfer.files :
                (event.frame) ? event.frame.files : undefined;

    if (files && files[0].type == "application/x-bittorrent") {
      this.addTorrent(await blobToBuffer(files[0]));
    }
  }

  @bind
  async addTorrent(buffer) {
    this.setState({ loading: true });
    let torrent = await this.backend.add(buffer);
    route(`/_torrent-release/${torrent.infoHash}`);
    this.setState({ loading: false });
  }

  getChildContext() {
    return {
      history: this.props.history,
      torrents: this.backend,
      backend: this.backend,
      addTorrent: this.addTorrent,
    };
  }

  render({history, ...props}) {
    return (
      <div class="window">
        <AppHeader />

        <section class="window-content">
          <div class="pane-group">
            <div class="pane-sm sidebar">
              <AppSidebar />
            </div>
            <div class="pane">
              <Router history={history}>
                <Home path="/" />
                <Release path="/_torrent-release/:infoHash" />
                <NowPlayingView path="/now-playing" />
              </Router>
              <Spinner active={this.state.loading} />
            </div>
          </div>
        </section>

        <AppFooter />
      </div>
    );
  }
}

export default App;
