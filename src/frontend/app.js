import {h, render} from "preact";
import App from "./components/App";
import createHistory from "history/createMemoryHistory";
import BackendManager from "../backend";

const history = createHistory();
const backend = new BackendManager();
window._history = history;
window._backend = backend;

history.listen(() => {
  // a hotpatch for preact-router
  window.dispatchEvent(new PopStateEvent("popstate"));
});

render(<App history={history} backend={backend} />, document.body);
