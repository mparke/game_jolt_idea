(function(root) {

  var Util = root.Util,
    inherit = Util.inherit,
    Renderable = Util.Renderable, 
    QuadTreeNode = Util.QuadTreeNode,
    Map = Util.Map,
    Character = root.Character,
    Npc = root.Npc,
    Canvas = root.Elements.Canvas,
    requestAnimationFrame = root.requestAnimationFrame;

  var Game = inherit(Renderable, function Game(config, gameLoaded) {
    this.width = config.width,
    this.height = config.height;

    this.$el = $('<div></div>'); // temp container
    this.canvas = new Canvas();
    this.canvas.size(this.width, this.height);
    this.$el.append(this.canvas.render().$el);

    this.treeRoot = new QuadTreeNode(0, 0, this.width, this.height);
    this.treeRoot.subdivide();

    this.map = new Map();
    this.map.update();

    this.character = new Character(this.map.getPath().pos, gameLoaded);

    this.tick = 0;

    Renderable.prototype.constructor.call(this);
  });

  _.extend(Game.prototype, {

    start: function() {
      this.loop();
    },

    loop: function() {
      var canvas = this.canvas;
      requestAnimationFrame(_.bind(this.loop, this));
      if (this.tick === 0) {

        // check collisions

        // is character jumping?
        if (this.character.isJumping()) {
          if (this.character.isDescending() && this.map.positionOnAnyPath(this.character.getPos())) {
            this.character.stopJumping();
          } else {
            this.character.updateJump();
          }
        }

        // is character on a path?
        // if (this.map.isPositionOnPath(this.character.getPos()))

        canvas.clear();

        if (this.map.isPositionOnPath(this.character.getPos())) {
          // continue updates
          this.character.render(canvas);

          this.map.update();
          this.map.render(canvas);
        } else {
          // kill character
        }

        this.tick = 0;
      } else {
        ++this.tick;
      }
    }
  });

  root.Game = Game;

})(window);