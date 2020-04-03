function Agent(){
    this.x = (Math.floor(Math.random() * rows - 1) + 1) * scale;
    this.y = (Math.floor(Math.random() * columns - 1) + 1) * scale;
    this.xSpeed = scale * 1;
    this.ySpeed = 0;
    this.score = 0;

    this.draw = function(){
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(this.x, this.y, scale, scale);
    }
    this.update = function() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if (this.x >= canvas.width) {
          this.changeDirection('Left');
        }
      
        if (this.y >= canvas.height) {
          this.changeDirection('Up');
        }
      
        if (this.x <= 0) {
          this.changeDirection('Right');
        }
      
        if (this.y <= 0) {
          this.changeDirection('Down');
        }

    }

    this.changeDirection = function(direction) {
        switch(direction) {
          case 'Up':
            this.xSpeed = 0;
            this.ySpeed = -scale * 1;
            break;
          case 'Down':
            this.xSpeed = 0;
            this.ySpeed = scale * 1;
            break;
          case 'Left':
            this.xSpeed = -scale * 1;
            this.ySpeed = 0;
            break;
          case 'Right':
            this.xSpeed = scale * 1;
            this.ySpeed = 0;
            break;
        }
      }
  
      this.findClosest = function(fruit){
        var currentPosition = {x:this.x, y:this.y};
        function distSquared(pt1, pt2) {
          var diffX = pt1.x - pt2.x;
          var diffY = pt1.y - pt2.y;
          return (diffX*diffX+diffY*diffY);
        }
        var closest = [];
        closest[0] = fruit[0];
        shortestDistance  = distSquared(currentPosition, fruit[0]);
        for (i = 0; i < fruit.length; i++) {
          var d = distSquared(currentPosition, fruit[i]);
          if (d < shortestDistance) {
              closest[0] = fruit[i];
              closest[1] = i;
              shortestDistance = d;
          }
        }

        return closest;
      }
      
      this.eat = function(fruit){
        if(fruit.some(fruit => this.x === fruit.x && this.y === fruit.y)){
          
          return true;
        }

        return false;
      }

      this.moveToClosest = function(closest){
          if(this.x<closest.x){
            this.changeDirection('Right');
          }
          if(this.x>closest.x){
            this.changeDirection('Left');
          }
          if(this.y>closest.y){
            this.changeDirection('Up');
          }
          if(this.y<closest.y){
            this.changeDirection('Down');
          }
      }

}