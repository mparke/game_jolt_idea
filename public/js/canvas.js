(function(root) {

  var document = root.document,
    Util = root.Util,
    inherit = Util.inherit,
    Renderable = Util.Renderable;

  var Canvas = inherit(Renderable, function Canvas() {
    this.$el = $('<div></div>'); // temp container
    this._canvas = document.createElement('canvas');
    this._ctx = this._canvas.getContext('2d');

    this.$el.append(this._canvas);

    Renderable.prototype.constructor.call(this);
  });

  // hmm
  _.extend(Canvas.prototype, {

    getContext: function() {
      return this._ctx;
    },

    clear: function() {
      this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    },

    size: function(width, height) {
      Renderable.prototype.size.call(this, width, height);

      this._canvas.width = width;
      this._canvas.height = height;
    },

    getSize: function() {
      return {
        width: this._canvas.width,
        height: this._canvas.height
      };
    },

    rect: function(x, y, width, height) {
      this._ctx.strokeStyle = '#000';
      this._ctx.strokeRect(x, y, width, height);
    },

    getForegroundContext: function() {
      return this._ctx;
    },

    draw: function(x, y) {
      this._ctx.save();

      this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
      this._ctx.translate(x, y);
      this.dot();

      this._ctx.restore();
    },

    renderPath: function() {

    },

    renderSprite: function(sprite, x, y) {
      this._ctx.save();

      this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
      this._ctx.translate(Math.round(x), Math.round(y)); // use bitshift for faster round operation
      this._ctx.drawImage(sprite, 0, 0, 256, 256);
      
      this._ctx.restore();
    }
  });

  root.Elements = {};
  root.Elements.Canvas = Canvas;
})(window);
