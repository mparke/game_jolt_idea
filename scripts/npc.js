(function(root) {

  function Npc(sprite, rootX) {
    this.sprite = sprite;

    this.rootX = rootX; // the root x position
    this.path = { negX: 100, posX: 100 }; // the max distance able to travel
    this.pos = { x: rootX, y: 350 }; // the current position
    this.speed = 1; // the change in position speed

    this.movingLeft = true;
    this.movingRight = false;
  }

  _.extend(Npc.prototype, {

    update: function() {
      this.move();
    },

    move: function() {
      if (this.movingLeft) {
        if (this.pos.x > (this.rootX - this.path.negX)) {
          this.pos.x -= this.speed;
        } else {
          this.movingLeft = false;
          this.movingRight = true;
        }
      } else {
        if (this.pos.x < (this.rootX + this.path.posX)) {
          this.pos.x += this.speed;
        } else {
          this.movingRight = false;
          this.movingLeft = true;
        }
      }
    }
  });

  root.Npc = Npc;
})(window);