var video="";
var Status="";
objects=[];

function preload(){
    video=createVideo('video.mp4');
    video.hide();
}
function setup(){
    canvas=createCanvas(500,400);
    canvas.center();
    
}
function draw(){
    image(video,0,0,500,400);
    if(Status!=""){
        objectDetector.detect(video,gotResults);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="status: objects detected";
            document.getElementById("no_of_objects").innerHTML="Number of objects detected are : "+objects.length;

            fill("#ff0000");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label +" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }

}
function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status= Detecting Objects"
}
function modelLoaded(){
    console.log("Model Loaded!")
    Status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResults(error,results){
    if(error){
        console.log(error);
    }else{
        console.log(results);
        objects=results;
    }
}
