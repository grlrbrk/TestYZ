const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const scale = 10;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

var agent;
var agent2;

(function setup() {
    agent = new Agent();
    agent2 = new Agent();
    var fruit = [];

    for(let i=0;i<10;i++){
        fruit.push(new Fruit());
        fruit[i].pickLocation();
    }

    window.setInterval(() => {
        ctx.clearRect(0,0, canvas.width, canvas.height);
        for(let i=0;i<fruit.length;i++){
            fruit[i].draw();
        }    
        //FOR AGENT : 1
        agent.update();
        agent.draw();
        var closest = agent.findClosest(fruit)

        if(this.x!=closest[0].x && this.y!=closest[0].y){
            agent.moveToClosest(closest[0]);
        }

        if(agent.eat(fruit)){
            fruit.splice(closest[1],1);
            agent.score++;
        }
        //FOR AGENT : 2 
        agent2.update();
        agent2.draw();
        var closest2 = agent2.findClosest(fruit)

        if(this.x!=closest2[0].x && this.y!=closest2[0].y){
            agent2.moveToClosest(closest2[0]);
        }

        if(agent2.eat(fruit)){
            fruit.splice(closest2[1],1);
            agent2.score++;
        }

    }, 250);
}());

window.addEventListener('keydown',((evt) => {
    const direction = evt.key.replace('Arrow', '');
    agent.changeDirection(direction);
}))