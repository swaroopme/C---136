status="";
objects=[];
video = "";

function setup(){
    canvas=createCanvas(350,350)
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}
function start(){
    objectDetected=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status: dectecting Objects";
}
function modelLoaded(){
    console.log('ModelLoaded');
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
    
}
function gotResult(error,results){
    if(error){
        console.log(error);
        
    }
    else{
        console.log(results);
        objects=results;
    }
}
function draw(){
    image(video,0,0,480,480)
    if(status !=""){
        objectDetected.detect(video,gotResult)
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="status ; Objects Detected";
            document.getElementById("number_of_objects").innerHTML="number of objects : " +objects.length;
            fill("#ff0000")
            persentage=floor(objects[i].confidence*100);
            text(objects[i].label+"  " +persentage+"%",objects[i].x+15,objects[i].y+15)
            noFill()
            stroke("#ff0000")
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
        }
    }
}   