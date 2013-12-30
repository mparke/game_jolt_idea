(function(root) {
  
  function Observable() {
    this.events = {};
  }

  Observable.prototype = {
    on: function(eventName, callback, context) {
      if (!this.events[eventName]) {
        this.events[eventName] = [];
      }

      this.events[eventName].push({ callback: callback, context: context });
    },

    off: function() {
      if (this.events[eventName]) {
        this.events[eventName].splice(0, this.events[eventName].length);
      }
    },

    trigger: function() {
      var allArgs = Array.prototype.slice.call(arguments),
        eventName = allArgs[0],
        args = allArgs.slice(1),
        events = this.events[eventName],
        len, eventObj;

      if (events) {
        len  = events.length;
        for (var i = 0; i < len; i++) {
          eventObj = events[i];
          eventObj.callback.apply(eventObj.context, args);
        }
      }
    }
  };

  root.Util.Observable = Observable;
})(window);