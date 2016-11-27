import {h} from "preact";
import {Header, Footer} from "preact-photon";
import RouteAwareLink from "./RouteAwareLink";

const AppHeader = () => (
  <Header>
    <div class="toolbar-actions">
      <div class="btn-group">
        <button class="btn btn-default">
          <span class="icon icon-left-dir" />
        </button>
        <button class="btn btn-default">
          <span class="icon icon-right-dir" />
        </button>
      </div>
      <input class="form-control toolbar-form-control" type="text" placeholder="Search" />
    </div>
  </Header>
);

const AppSidebar = () => (
  <nav class="nav-group">
    <h5 class="nav-group-title">Favorites</h5>
    <RouteAwareLink href="/" class="nav-group-item" activeClass="active">
      <span class="icon icon-home" />
      Home
    </RouteAwareLink>
    <RouteAwareLink href="/memes" class="nav-group-item" activeClass="active">
      <span class="icon icon-download" />
      Memes
    </RouteAwareLink>
    <RouteAwareLink href="/memes" class="nav-group-item" activeClass="active">
      <span class="icon icon-download" />
      Downloads
    </RouteAwareLink>
  </nav>
);

const AppFooter = () => (
  <Footer>
    <div class="toolbar-actions">
      <button class="btn btn-default">
        Cancel
      </button>

      <button class="btn btn-primary pull-right">
        Save
      </button>
    </div>
  </Footer>
);

const Spinner = ({ active }) => (
  <div class="spinner" style={active ? "" : "display: none;"}>
    <div class="spinner-inner">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>
  </div>
);

export {AppHeader, AppSidebar, AppFooter, Spinner};
