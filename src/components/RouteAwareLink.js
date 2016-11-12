/* eslint react/prop-types: [0] */

import {h, Component} from "preact";

class RouteAwareLink extends Component {
  constructor(props) {
    super(props);
    this._history = window._history;  // XXX
    this.setState({active: false});
  }

  componentDidMount() {
    this._history.listen(this.checkPath);
    this.checkPath(this._history.location);
  }

  checkPath = location => {
    const url = `${location.pathname || ""}${location.search || ""}`;
    this.setState({
      active: url === this.props.href || location.pathname === this.props.href
    });
  }

  render({children, href, className, activeClass, ...props}) {
    return (
      <a
        className={`${props.class} ${className} ${this.state.active ? activeClass : ""}`}
        href={href}
        {...props}
        >{ children }</a>
    );
  }
}

export default RouteAwareLink;
