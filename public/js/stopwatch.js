(function(root) {

  function StopWatch() {
    this.startTime = 0;
    this.running = false;
    this.elapsed = null;
  }

  _.extend(StopWatch.prototype, {

    start: function() {
      this.startTime = +new Date();
      this.running = true;
    },

    stop: function() {
      this.elapsed = (+new Date()) - this.startTime;
    },

    getElapsedTime: function() {
      if (this.running) {
        return (+new Date()) - this.startTime;
      }
      
      return this.elapsed;
    }

  });

  root.Util.StopWatch = StopWatch;
})(window);