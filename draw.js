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
    agent3 = new Agent();
    var fruit = [];
    var redFruit = [];
    var isGameOver = false;

    //Creating foods
    for(let i=0;i<90;i++){
        //Creating green fruits
        fruit.push(new Fruit());
        fruit[i].pickLocation();
        //Creating red fruits
        redFruit.push(new RedFruit());
        redFruit[i].pickLocation();
    }

    window.setInterval(() => {
    if(!isGameOver){
        if(fruit.length == 0){
            isGameOver = true;
            alert("Fruits are gone.");
        }
        ctx.clearRect(0,0, canvas.width, canvas.height);
        for(let i=0;i<fruit.length;i++){
            fruit[i].draw();
        }    
        for(let i=0;i<redFruit.length;i++){
            redFruit[i].draw();
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
            document.getElementById("agent1").innerHTML = agent.score;
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
            document.getElementById("agent2").innerHTML = agent2.score;
        }

        //FOR AGENT : 3 
        agent3.update();
        agent3.draw();
        var closest3 = agent3.findClosest(fruit)

        if(this.x!=closest3[0].x && this.y!=closest3[0].y){
            agent3.moveToClosest(closest3[0]);
        }

        if(agent3.eat(fruit)){
            fruit.splice(closest3[1],1);
            agent3.score++;
            document.getElementById("agent3").innerHTML = agent3.score;
        }
    }
    }, 250);
}());

window.addEventListener('keydown',((evt) => {
    const direction = evt.key.replace('Arrow', '');
    agent.changeDirection(direction);
}))