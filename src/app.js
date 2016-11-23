import {h, render} from "preact";
import App from "./components/App";
import createHistory from "history/createMemoryHistory";

import "babel-polyfill";

const history = createHistory();
window._history = history;
render(<App history={history} />, document.body);
