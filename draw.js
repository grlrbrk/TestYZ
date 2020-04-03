const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const scale = 10;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

var agent;

(function setup() {
    agent = new Agent();
    var fruit = [];

    for(let i=0;i<10;i++){
        fruit.push(new Fruit());
        fruit[i].pickLocation();
    }

    window.setInterval(() => {
        ctx.clearRect(0,0, canvas.width, canvas.height);
        for(let i=0;i<10;i++){
            fruit[i].draw();
        }    

        agent.update();
        agent.draw();
        var closest = agent.findClosest(fruit)

        if(this.x!=closest[0].x && this.y!=closest[0].y){
            agent.moveToClosest(closest[0]);
        }

        if(agent.eat(fruit)){
            //TO:DO
            fruit.splice(closest[1],1);
        }
    }, 250);
}());

window.addEventListener('keydown',((evt) => {
    const direction = evt.key.replace('Arrow', '');
    agent.changeDirection(direction);
}))