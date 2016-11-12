import {h, render} from "preact";
import App from "./components/App";
import createHistory from "history/createMemoryHistory";

const history = window._history = createHistory();
history.getCurrentLocation = () => history.location;  // XXX: preact-router needs this

render(<App history={history} />, document.body);
