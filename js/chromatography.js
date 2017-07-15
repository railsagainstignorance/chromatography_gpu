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

    const xSize = 10;
    const ySize = 10;
    const CELL_LIVE = 1;
    const CELL_DEAD = 0;

    // Create the GPU accelerated function
    const golGpuUpdate = gpu.createKernel(function(CURRENT) {
      // var countNhbrs = 0;
      // for (var dx=-1; dx<2; dx++){
      //   for ( var dy=-1; dy<2; dy++){
      //     var x = ((this.thread.x + dx) + this.dimensions.x ) % this.dimensions.x;
      //     var y = ((this.thread.y + dy) + this.dimensions.y ) % this.dimensions.y;
      //     countNhbrs += CURRENT[y][x];
      //   }
      // }
      // var self = CURRENT[this.thread.y][this.thread.x];
      // countNhbrs -= self;
      //
      // var newSelf = 1;
      // if (countNhbrs == 3){ // || (countNhbrs == 2 && self == 1)) {
      //   newSelf = 1;
      // }

      var self = CURRENT[this.thread.y][this.thread.x];
      var newSelf;
      if (self < 0.5) {
        newSelf = 1;
      } else {
        newSelf = 0;
      }
      return newSelf;
    }).dimensions([xSize, ySize]);

    const golGpuGenerateEmpty = gpu.createKernel(function() {
      return 0;
    }).dimensions([xSize, ySize]);

    const golRandomiseGrid = function( grid ){
      grid.forEach( yRow => {
        for (var x = 0; x < yRow.length; x++) {
          yRow[x] = (Math.random() > 0.5)? CELL_LIVE : CELL_DEAD;
        }
      } );
      return grid;
    }

    var golGpuRender = gpu.createKernel(function(CURRENT) {
      var cell = CURRENT[this.thread.y][this.thread.x];
      // cell = 1;
      cell = (this.thread.y + this.thread.x) % 2;
      this.color(0 * cell, 1 * cell, 0 * cell, 1);
    }).dimensions([xSize, ySize]).graphical(true);

    var updateCanvas = function( newCanvas ){
      canvasWrapper.replaceChild(newCanvas, canvasWrapper.getElementsByTagName('canvas')[0]);
    }

    function iteratePaper() {
      console.log(`DEBUG: in iteratePaper`);
      var currentGrid = golGpuGenerateEmpty();
      console.log(`DEBUG: iteratePaper: currentGrid=${JSON.stringify(currentGrid)}`);
      golRandomiseGrid(currentGrid);
      console.log(`DEBUG: iteratePaper: currentGrid=${JSON.stringify(currentGrid)}`);
      var nextGrid = golGpuUpdate(currentGrid);
      console.log(`DEBUG: iteratePaper: nextGrid=${JSON.stringify(nextGrid)}`);
      golGpuRender( currentGrid );
      var newCanvas = golGpuRender.getCanvas();
      updateCanvas( newCanvas );
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
