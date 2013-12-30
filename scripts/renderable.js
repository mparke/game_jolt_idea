(function(root) {
  var Util = root.Util,
    inherit = Util.inherit,
    Observable = Util.Observable;

  var Renderable = inherit(Observable, function Renderable() {

    Observable.prototype.constructor.call(this);
  });

  _.extend(Renderable.prototype, {
    
    size: function(width, height) {
      this.$el.width(width);
      this.$el.height(height);
    },

    render: function() {
      return this;
    }
  });

  root.Util.Renderable = Renderable;
})(window);