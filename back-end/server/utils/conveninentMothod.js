export function createColorCode(){
    var colorValue="0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f";
    var colorArray = colorValue.split(",");
     var color="#";
     for(var i=0;i<6;i++){
        color+=colorArray[Math.floor(Math.random()*16)];
     }
     return color;
}