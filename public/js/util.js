(function(root) {

  function inherit(Parent, Child) {
    var Proxy = function() {
      this.constructor = Child.constructor;
    };

    Proxy.prototype = Parent.prototype;
    Child.prototype = new Proxy();
    return Child;
  }

  root.Util = {};
  root.Util.inherit = inherit;
})(window);