import cuid from "cuid";
import BaseMPV from "node-mpv";

class MPV extends BaseMPV {
  constructor(options={}, args=[]) {
    super(options, args);
    this._getPropertyCallbacks = {};
    this.on("getrequest", (id, result) => {
      if (this._getPropertyCallbacks.hasOwnProperty(id)) {
        this._getPropertyCallbacks[id](result);
        delete this._getPropertyCallbacks[id];
      }
    })
  }

  getProperty(property) {
    let id = cuid();
    return new Promise((resolve, _) => {
      this._getPropertyCallbacks[id] = resolve;
      super.getProperty(property, id);
    });
  }
}

export default MPV;
