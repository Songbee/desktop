import pify from "pify";
import baseBlobToBuffer from "blob-to-buffer";

export default pify(baseBlobToBuffer);