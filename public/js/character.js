(function(root) {

  var Util = root.Util,
    inherit = Util.inherit,
    Observable = Util.Observable,
    SpriteSheet = Util.SpriteSheet,
    StopWatch = Util.StopWatch,
    document = root.document;

  var Character = inherit(Observable, function Character(initialPos, characterLoaded) {
    this.width = Math.floor((76 / 3) * 2);
    this.height = Math.floor((92 / 3) * 2);
    this.pos = {
      x: initialPos.x,
      y: initialPos.y - this.height 
    };

    this.movingRight = false;
    this.movingLeft = false;

    this.jumping = false;
    this.ascending = false;
    this.jumpHeightMax = 150;
    
    this.activeSprite = null;
    this.spriteSheet = new SpriteSheet({
      url: 'images/sprite_sheet.png',
      // all widths = 92 pixels
      // all heights = 152 pixels
      spriteMap: [
        {
          name: 'base_right',
          minX: 34,
          minY: 10,
          maxX: 110,
          maxY: 150
        },
        {
          name: 'base_left',
          minX: 122,
          minY: 10,
          maxX: 200,
          maxY: 150
        },
        {
          name: 'moving_right',
          minX: 218,
          minY: 10,
          maxX: 294,
          maxY: 150
        },
        {
          name: 'moving_left',
          minX: 300,
          minY: 10,
          maxX: 380,
          maxY: 150
        }
      ]
    });
    this.spriteSheet.load(_.bind(this.genOnSpriteSheetLoad(characterLoaded), this));

    Observable.prototype.constructor.call(this);
  });

  _.extend(Character.prototype, {

    render: function(canvas) {
      var ctx = canvas.getContext();
      ctx.save();
      ctx.translate(this.pos.x, this.pos.y);
      ctx.drawImage(this._activeSprite.image, 0, 0, this.width, this.height);
      ctx.restore();
    },

    getPos: function() {
      return this.pos;
    },

    genOnSpriteSheetLoad: function(characterLoaded) {
      return function(sprites) {
        this._sprites = sprites;
        this._activeSprite = this._sprites['base_right'];
        this.initEvents();
        characterLoaded();
      };
    },

    initEvents: function() {
      var $doc = $(document);

      $doc.keydown(_.bind(this.onKeydown, this));
      $doc.keyup(_.bind(this.onKeyup, this));
    },

    onKeydown: function(e) {
      var keyCode = e.keyCode;
      // 32 === spacebar
      if (keyCode === 32 && !this.jumping) {
        this.jump();
      } else if (typeof this.keyMap[keyCode] === 'function') {
        this.keyMap[keyCode].call(this);
      }
    },

    onKeyup: function(e) {
      if (!this.jumping) {
        this.stopMoving();
      }
    },

    stopMoving: function() {
      if (this.movingRight) {
        this._activeSprite = this._sprites['base_right'];
        this.movingRight = false;
      } else if (this.movingLeft) {
        this._activeSprite = this._sprites['base_left'];
        this.movingLeft = false;
      }
    },
    
    getActiveSprite: function() {
      return this._activeSprite;
    },

    jump: function() {
      this.jumping = true;
      this.ascending = true;
      this.beforeJumpHeight = this.pos.y;
      //this.stopWatch.start();
    },

    isJumping: function() {
      return this.jumping;
    },

    // TODO: break up ascend vs descend for usage against path checking
    // keep descending until reaching a path?
    updateJump: function() {
      if (this.ascending) {
        this.ascend();  
      } else {
        this.descend()
      }
    },

    ascend: function() {
      var pos = this.pos;
      if (pos.y >= (this.beforeJumpHeight - this.jumpHeightMax)) {
        pos.y -= 6;

        if (this.movingRight) {
          pos.x += 6;
        } else if (this.movingLeft) {
          pos.x -= 6;
        }
      } else {
        this.ascending = false; // will descend on next tick
      }
    },

    isAscending: function() {
      return this.ascending;
    },

    descend: function() {
      var pos = this.pos;
      if (pos.y < this.beforeJumpHeight) {
        pos.y += 6;
      
        if (this.movingRight) {
          pos.x += 6;
        } else if (this.movingLeft) {
          pos.x -= 6;
        }
      } else {
        this.stopJumping();
      }
    },

    isDescending: function() {
      return !this.ascending;
    },

    stopJumping: function() {
      this.jumping = false;
      this.stopMoving();
      // note: this.ascending should already be false
    },

    keyMap: {

      37: function() {
        var pos = this.pos;
        this.movingLeft = true;
        this.movingRight = false;
        this._activeSprite = this._sprites['moving_left'];
        
        if (pos.x <= 0) {
          pos.x = 0;
        } else {
          pos.x -= 6;
        }
      },

      39: function() {
        var pos = this.pos;
        this.movingRight = true;
        this.movingLeft = false;
        this._activeSprite = this._sprites['moving_right'];
        
        pos.x += 6;
      }
    }
  });

  root.Character = Character;
})(window);