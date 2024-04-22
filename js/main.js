const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

//Obtener coordenadas y tamaño de dimensiones de la pantalla actual
const window_height = window.innerHeight;  //Ancho 
const window_width = window.innerWidth;    //Alto

//El canvas tiene las mismas dimensiones que la pantalla

canvas.height = window_height;
canvas.width = window_width;

//Añadir fondo
canvas.style.background = "#ff8";

class Circle {
    constructor(x, y, radius, color, text, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.text = text;

        this.speed = speed;
        this.dx = 1*this.speed;
        this.dy = 1*this.speed;

    }

    draw(context) {
        context.beginPath();
        context.strokeStyle = this.color;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "20px Arial";
        context.lineWidth = 5;
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        context.stroke();
        context.closePath();
        context.fillText(this.text, this.posX, this.posY);

    }

    update(context){
        
        this.draw(context);

        //si el circulo supera el margen derecho, entonces se mueve a la izquierda
        if((this.posX+this.radius)>window_width){
           
            this.dx = -this.dx;
        }

        //si el circulo supera el margen izquierdo entonces se mueve a la derecha
        if((this.posX-this.radius)<0){
           
            this.dx = -this.dx;
        }

        if((this.posY-this.radius)<0){
           
            this.dy = -this.dy;
        }

        if((this.posY+this.radius)>window_height){
           
            this.dy = -this.dy;
        }

        this.posX +=this.dx;
        this.posY+=this.dy;

        }
    }


    let circles = [];

    // Creamos 10 círculos aleatorios y los almacenamos en el arreglo
    for (let i = 0; i < 10; i++) {
        let randomX = Math.random() * window_width;
        let randomY = Math.random() * window_height;
        let randomRadius = Math.floor(Math.random() * 100 + 10); 
    
        let circle = new Circle(randomX, randomY, randomRadius, 'blue', 'Tec'+i, 5);
        circles.push(circle);
    }
    
    // Dibujamos y actualizamos cada círculo en el arreglo
    let updateCircles = function() {
        requestAnimationFrame(updateCircles);
        ctx.clearRect(0, 0, window_width, window_height);
        circles.forEach(function(circle) {
            circle.update(ctx);
        });
    }
    
    updateCircles();

//shift + alt + a comentarios rápidos

