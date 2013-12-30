(function(root) {

  var Math = root.Math;

  function Map() {
    this.paths = [];
  }

  _.extend(Map.prototype, {
    
    // levels of varying height
    levels: [
      {
        x: 0,
        y: 500
      },
      {
        x: 0,
        y: 400
      },
      {
        x: 0,
        y: 300
      }
    ],

    minPathLength: 100,
    maxPathLength: 500,

    render: function(canvas, pos) {
      var width = canvas.getSize().width,
        ctx = canvas.getContext(),
        len = this.paths.length,
        i = 0,
        path = this.paths[i], // should always have at least 1 path
        currentXPos = path.pos.x,
        endReached = false;
      
      ctx.save();
      // ctx.translate(pos.x, pos.y);

      // TODO: is it possible for the end of the paths array to be reached?
      while (!endReached) {
        ctx.beginPath();
        ctx.moveTo(path.pos.x, path.pos.y);
        ctx.lineTo(path.pos.x + path.length, path.pos.y);
        ctx.stroke();

        currentXPos += path.length;
        path = this.paths[++i];

        if (currentXPos >= width) {
          endReached = true;
        }
      }

      ctx.restore();
    },

    update: function() {
      this.nextPaths();
    },

    getPath: function() {
      // TODO: should the default always be 0?
      return this.paths[0];
    },

    positionOnAnyPath: function(pos) {
      var isOnPath = false,
        i = 0,
        len = this.paths.length;

      while (i < len && !isOnPath) {
        if ((this.paths[i].pos.y - pos.y) <= 0) {
          isOnPath = true;
        }
        i++;
      }

      return isOnPath;
    },

    isPositionOnPath: function(pos) {
      // paths need to be subdivided into visible paths
      return true;
    },

    nextPaths: function() {
      // TODO: figure out continuous path creation balance
      if (this.paths.length < 10) {
        this.paths = this.paths.concat(this.generatePaths(10));
      }
    },

    // generate count number of paths, and return an array
    generatePaths: function(count) {
      var paths = [],
        path,
        lastXPos = 0;

      for (var i = 0; i < count; i++) {
        path = this.createPathSection(lastXPos);
        paths.push(path);
        lastXPos = path.pos.x + path.length;
      }

      return paths;
    },

    createPathSection: function(lastXPos) {
      // choose a level to generate on
      var level = this.levels[this.randomInt(0, 2)],
        // randomly generate the length of the path
        pathLength = this.randomInt(this.minPathLength, this.maxPathLength);
      
      // create the path object
      return {
        pos: {
          x: lastXPos, // TODO: manipulate lastXPos to create gaps
          y: level.y
        },
        length: pathLength
      };
    },

    // returns a random integer between min and max
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    randomInt: function(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

  });
  
  root.Util.Map = Map;
})(window);