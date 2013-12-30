(function(root) {

  // each node is a bounding box
  function QuadTreeNode(minX, minY, maxX, maxY) {
    this.minX = minX;
    this.minY = minY;
    this.maxX = maxX;
    this.maxY = maxY;
    
    this.children = null;
  }

  _.extend(QuadTreeNode.prototype, {

    subdivide: function() {
      var minX = this.minX,
        minY = this.minY,
        maxX = this.maxX,
        maxY = this.maxY,
        midX = ((maxX - minX) / 2) + minX,
        midY = ((maxY - minY) / 2) + minY;

      var topLeft = new QuadTreeNode(minX, minY, midX, midY), 
        topRight = new QuadTreeNode(midX, minY, maxX, midY),
        bottomLeft = new QuadTreeNode(minX, midY, midX, maxY),
        bottomRight = new QuadTreeNode(midX, midY, maxX, maxY);

      this.children = [topLeft, topRight, bottomLeft, bottomRight];

      // don't subdivide smaller than 16x16 pixels
      if ((midX - minX) > 16 && (midY - minY) > 16) {
        topLeft.subdivide();
        topRight.subdivide();
        bottomLeft.subdivide();
        bottomRight.subdivide();
      }
    },

    contains: function(x, y) {

    },

    each: function(fn) {
      var child;
      if (this.children) {
        for(var i = 0; i < 4; i++) {
          child = this.children[i];
          fn(child);
          child.each(fn);
        }
      }
    }

  });

  root.Util.QuadTreeNode = QuadTreeNode;
})(window);