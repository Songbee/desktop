/* eslint react/prop-types: [0] */

import { h, Component } from "preact";
import { bind } from "decko";

class RouteAwareLink extends Component {
  constructor(props) {
    super(props);
    this.setState({active: false});
  }

  componentDidMount() {
    this.context.history.listen(this.checkPath);
    this.checkPath(this.context.history.location);
  }

  @bind
  checkPath(location) {
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
