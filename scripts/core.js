// Party In the Woods
(function(root) {
  var $body = $(document.body),
    Game = root.Game;

  var game = new Game({
    width: 1000,
    height: 600
  }, function() {
    // game ready
    game.start();
  });
  $body.append(game.render().$el);

})(window);