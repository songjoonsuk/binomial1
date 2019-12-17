let font,
  fontsize = 50;
let hanfont;

let objs = []; // array of property objects

let h,v;
let diameter = 30;
let Xmargin =  60;
let Ymargin =  20;
let cir_color; 
let cir_intense;
let Xcenter ;
let circle_color;
let j_color;
let arr;
let BallNo = 1;
let StoryNo = 13;
let upper_margin;
let text_color;
let keyflag = 0;
let ret = 1; 

let left_x1,left_y1,left_x2,left_y2;
let right_x1,right_y1,right_x2,right_y2;

let img;
let swing = 5;
let rand1;

let pre_count = [];


function preload() {
   //  font = loadFont('../source-sans-pro/SourceSansPro-Regular.otf');
   hanfont = loadFont('font/Cafe24Dangdanghae/Cafe24Dangdanghae.ttf' );
   img = loadImage('image/logo1.png'); // Load the image
}


function setup() {
  createCanvas(1900, 1050);
//  createCanvas(1000, 600);

 
  // textFont(font);
  textFont(hanfont);
  textSize(fontsize);
  textAlign(CENTER, CENTER);
  text_color = color( 255,255,255 );  
//  text_color = color( 14,141,207 );  


  Xcenter = width*5/12;
  upper_margin = ( height - StoryNo*(diameter + Ymargin) ) / 2 - (2*Ymargin) ;

 // Create objects
  cir_color    = color( 114, 115 , 95 );  
  cir_intense = color( 170, 250 , 50 );  
  circle_color = [ cir_color , cir_intense  ] ;
  j_color = color( 0, 0 , 0 );
//  noStroke();

  for ( v = 0; v < (StoryNo+1); v++ ) {
    for ( h = 0 ; h < v; h++) {
      objs.push(new Property());
    }
  }
  for( let i =0 ; i< StoryNo;i++) {
    pre_count[i] = 0; 
  }
  
  defaultScreen();
  msg();

}


let xt,yt;
let id = 0;
let repeat = 0;
function draw() {
  if (mouseIsPressed) keyflag = 1;
  
  
  if( keyflag ) {
    if( id == 0 && repeat == 0) define_T();
 
      if( objs[id].color == cir_intense )  {
          defaultScreen();
          fill ( 255 ) ;
   
   //      rand1 = random( -swing , swing );
   //       ellipse(objs[id].Xcoor+rand1, objs[id].Ycoor, objs[id].diameter );
          ellipse(objs[id].Xcoor, objs[id].Ycoor, objs[id].diameter );
         
       
      }  // if


    
      repeat = repeat + 1 ;
      if( repeat == 1 ) {
        repeat = 0;
        id = id + 1;
        if( id == objs.length ) {
          id = 0;keyflag = 0;
          for( let i =0 ; i< StoryNo;i++) {
            pre_count[i] = objs[i+arr[StoryNo-1]].count;
          }
          defaultScreen();
        }
      }

  } // keyflag
}

function defaultScreen() {
//  background(114, 98, 95);
  background(50, 89, 100);

  image(img, width/40, height/20 , width/10 , height/10 );
 
  title();
   
  draw_hurdle(); 
    
   
  display_count();
  draw_boundary();


}

function title() {
  textAlign(CENTER);
  fill( 230, 150, 47 );
  text('이항분포기      ', Xcenter,  (upper_margin*3/4) );
}

function msg() {
  textAlign(RIGHT);
  fill( 255 );
  text('[마우스 클릭] 또는 [키보드]    ', width,  (upper_margin*3/4) );

}

function binomial() {

    let p = random();
    p = ( p >= 0.5 ) ? 1 : 0 ;   

    return p;
}

function col_start(n){
  arr = [0,1,3,6,10,15,21,28,36, 45, 55, 66, 78, 91, 105];
                 /* 5  6  7  8   9  10  11  12  13 14  15  */
  let r;
  r = arr[n];

  return r;
}

function define_T() {

  
  let i = 0;
  let j = 0;
  let k = 0;

  let pre_t;
  h = 0;
 
  for (let i = 0; i < objs.length; i++)  objs[i].desel();

  objs[0].sel();
  pre_t = 0;
  for ( let v = 1; v < StoryNo; v++ ) {
 
    h = col_start(v);

    if( binomial() ) {
      objs[h+pre_t].sel();
    }
    else {              
      objs[h+pre_t+1].sel();
      pre_t = pre_t+1;
    }
  }
  
}

function display_count() {

  let count;

  fill( text_color );
  let Xref = Xcenter- StoryNo*(diameter+Xmargin)/2 ; 
  let Yref = upper_margin + StoryNo * ( diameter + Ymargin )+70; 
  for( let i =0 ; i< StoryNo;i++) {
    text( pre_count[i] , Xref+i*(diameter+Xmargin) , Yref );
//    text( objs[i+arr[StoryNo-1]].count , Xref+i*(diameter+Xmargin) , Yref + 50 );
  }
}

function keyPressed() {
  
  if (key >= 'a' && key <= 'z') {
    keyflag = 1;
  }
}

function display_ball( i ) {

   
  if( objs[i].color == cir_intense ) {	

    console.log(i);

    fill ( cir_intense ) ;
    ellipse(objs[i].Xcoor, objs[i].Ycoor, objs[i].diameter );

    ret = 1;   
  }
  else ret = 0;
  
}

function draw_hurdle() {
  for (let i = 0; i < (objs.length - StoryNo) ; i++) {
    fill ( objs[i].j_color ) ;
//    ellipse(objs[i].jx, objs[i].jy, 15 );

    triangle( objs[i].jx, objs[i].jy , objs[i].j2x ,objs[i].j2y ,objs[i].j3x ,objs[i].j3y );
    
  }
}

function draw_boundary() {

  left_x1 = objs[0].Xcoor-diameter/2 - 15;
  left_y1 = objs[0].Ycoor-15 ;

  left_x2 = objs[objs.length - StoryNo].Xcoor-diameter/2 - 15;
  left_y2 = objs[objs.length - StoryNo].Ycoor - 15;

  right_x1 = objs[0].Xcoor+diameter/2 + 15; 
  right_y1 = objs[0].Ycoor - 15 ;
  
  right_x2 = objs[objs.length-1].Xcoor + diameter/2 + 15;
  right_y2 = objs[objs.length-1].Ycoor - 15;



  strokeWeight( 20 );
  stroke(0);
  line( left_x1,left_y1 , left_x2,left_y2);
  line( right_x1,right_y1 , right_x2,right_y2);
  noStroke();

  
}

// Property class
class Property {

  constructor() {
    this.Ycoor = upper_margin + v * ( diameter + Ymargin );
    this.Xcoor = (Xcenter- v*(diameter+Xmargin)/2) + h * ( diameter + Xmargin ) ;
    this.diameter = diameter; 
    this.color = circle_color[0];
    this.TF = 0;
    this.count = 0;
    
    this.jx = this.Xcoor ;
    this.jy = this.Ycoor + diameter/2 + 5  ;
    this.j2x = this.jx - ( Xmargin/4 ) ;
    this.j2y = this.jy + Ymargin*2 ;
    this.j3x = this.jx + ( Xmargin/4 ) ;
    this.j3y = this.j2y;
    this.j_color = j_color;
    
  }

  sel() {
    this.color = circle_color[1];
    this.TF = 1;
    this.count += 1;
    
  }

  desel() {
    this.color = circle_color[0];
    this.TF = 0;
  }

}

