// Using UMD (Universal Module Definition), see https://github.com/umdjs/umd, and Jake,
// for a js file to be included as-is in Node code and in browser code.
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.Chromatography = factory();
  }
}(this, function () {
  // chromatography stuff
  return {
    // public methods
  };
}));
