import {h, render} from "preact";
import App from "./components/App";
import createHistory from "history/createMemoryHistory";

const history = createHistory();
render(<App history={history} />, document.body);
