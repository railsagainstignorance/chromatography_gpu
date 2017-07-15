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
  function createPaper( config ) {
    ['gpu', 'canvasWrapper', 'queryString'].forEach( field => {
      if (! config.hasOwnProperty(field)) {
        throw `ERROR: createPaper: requires field=${field}`;
      }
    });

    const           gpu = config.gpu;
    const canvasWrapper = config.canvasWrapper;
    const   queryString = config.queryString;

    function iteratePaper() {
      console.log(`DEBUG: in iteratePaper`);
    }

    return {
      iterate : iteratePaper
    }
  }


  return {
    // public methods
    createPaper
  };
}));
