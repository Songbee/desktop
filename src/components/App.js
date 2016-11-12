import {h} from "preact";
import Router from "preact-router";

import {AppHeader, AppSidebar, AppFooter} from "./chrome";
import Home from "./views/Home";

export default ({history}) => (
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
