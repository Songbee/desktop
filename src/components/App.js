import {h, Component} from "preact";
import Router from "preact-router";

import {AppHeader, AppSidebar, AppFooter} from "./chrome";
import Home from "./views/Home";

class App extends Component {
  getChildContext() {
    return { history: this.props.history };
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
                <Home path="/" name="Home" />
                <Home path="/memes" name="Memes" />
              </Router>
            </div>
          </div>
        </section>

        <AppFooter />
      </div>
    );
  }
}

export default App;
