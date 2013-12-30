(function(root) {

  var document = root.document;

  function SpriteSheet(config) {
    this.spriteMap = config.spriteMap;
    this.url = config.url;
    
    this._sprites = {};  
    this._canvas = document.createElement('canvas');
    this._ctx = this._canvas.getContext('2d');
  }

  _.extend(SpriteSheet.prototype, {

    load: function(callback) {
      this.spriteSheetImage = new Image();
      this.spriteSheetImage.onload = _.bind(this.genOnLoad(callback), this);
      this.spriteSheetImage.src = this.url;
    },

    genOnLoad: function(callback) {
      return function() {
        var width = this.spriteSheetImage.width,
          height = this.spriteSheetImage.height,
          len = this.spriteMap.length,
          sprite, minX, minY, maxX, maxY,
          spriteWidth, spriteHeight,
          spriteData, spriteDataUrl, spriteImg;
        
        for(var i = 0; i < len; i++) {
          sprite = this.spriteMap[i];
          minX = sprite.minX;
          minY = sprite.minY;
          maxX = sprite.maxX;
          maxY = sprite.maxY;
          spriteWidth = maxX - minX;
          spriteHeight = maxY - minY;
          
          // resize the canvas and draw the sprite sheet
          this._canvas.width = width;
          this._canvas.height = height;
          this._ctx.drawImage(this.spriteSheetImage, 0, 0);

          spriteData = this._ctx.getImageData(minX, minY, spriteWidth, spriteHeight);
          
          // clear and resize the canvas
          this._ctx.clearRect(0, 0, width, height);
          this._canvas.width = spriteWidth;
          this._canvas.height = spriteHeight;

          // put the image data onto the resized canvas
          this._ctx.putImageData(spriteData, 0, 0);

          // use toDataUrl to create an image element to be used with drawImage
          spriteDataUrl = this._canvas.toDataURL();
          spriteImage = new Image();
          spriteImage.src = spriteDataUrl;

          // map the sprite by name with the new image
          this._sprites[sprite.name] = _.extend(sprite, {
            image: spriteImage
          });

          this._ctx.clearRect(0, 0, spriteWidth, spriteHeight);
        }

        // dump canvas and ctx refs
        // TODO: possibly resize canvas and keep in memory to be re-used here?
        this._canvas = null;
        this._ctx = null;

        callback(this._sprites);
      };
    }
  });

  root.Util.SpriteSheet = SpriteSheet;
})(window);