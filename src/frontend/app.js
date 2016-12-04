import { h, render } from "preact";
import { remote } from "electron";

import App from "./components/App";
import createHistory from "history/createMemoryHistory";

const history = createHistory();
const backend = remote.getGlobal("backend");
window._history = history;
window._backend = backend;

history.listen(() => {
  // a hotpatch for preact-router
  window.dispatchEvent(new PopStateEvent("popstate"));
});

render(<App history={history} backend={backend} />, document.body);
