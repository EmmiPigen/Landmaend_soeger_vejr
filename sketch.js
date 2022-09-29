const x = document.getElementById("demo");
let ugeDage = ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"];
let vindRetningOrd = ["N", "NØ", "Ø", "SØ", "S", "SV", "V", "NV"];
let dato5Dage30 = [25, 26, 27, 28, 29, 30, 1, 2, 3, 4, 5];
let dato5Dage31 = [26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5];
let dato5Dage28 = [23, 24, 25, 26, 27, 28, 1, 2, 3, 4, 5];
let dato5Dage29 = [24, 25, 26, 27, 28, 29, 1, 2, 3, 4, 5];
const iDag = new Date();
let lat;
let long; 
let tidzoneNavn;

let søgBy;
let byLok;
let landLok;
let regionLok;
let byKode;

let dato;
let dagDato;
let ugeDag;
let tidNu;

let temperaturNu;
let temperaturMinIdag;
let temperaturMaxIdag;
let vindFartIdag;
let vindRetningIdag;
let vindRetningIdagOrd;
let synlighed;
let solNed;
let solOp;
let solNedIdag;
let solOpIdag;
let regnIdag;
let UV;
let weatherID;
let advarsel;
let vejrIconIdag;
let regnMængde;

let temperaturMin5Dage = [];
let temperaturMax5Dage = [];
let vindFart5Dage = [];
let vindRetning5Dage = [];
let regn5Dage = [];
let solNed5DageUNIX = [];
let solOp5DageUNIX = [];
let solNed5Dage = [];
let solOp5Dage = [];
let weatherID5Dage = [];
let q;
let g;
let vejrIcon5dage;
let regnmængde5Dage;
let vindRetning5DageOrd;

let jordTemperatur6cm = [];
let jordTemperatur18cm = [];
let jordTemperatur54cm = [];
let jordFugtighed1_3cm = [];
let jordFugtighed3_9cm = [];
let jordFugtighed9_27cm = [];
let jordFugtighed27_81cm = [];

function preload(){
  mark = loadImage("Iconer/Mark_6.png");
  
  //nat iconer
  måneIcon = loadImage("Iconer/clear sky (nat).png");
  måneRegnIcon = loadImage("Iconer/rain (nat).png");
  måneTordenIcon = loadImage("Iconer/thunderstorm (nat).png");
  måneTågeIcon = loadImage("Iconer/mist (nat).png");
  TågeIconNat = loadImage("Iconer/mist (nat).png");

  //overskyet uden måne eller sol
  overskyetIcon = loadImage("Iconer/scattered clouds (dag).png");
  overskyetIconNat = loadImage("Iconer/scattered clouds (nat).png");
  overskyetSneIcon = loadImage("Iconer/snow (dag).png");
  måneSneIcon = loadImage("Iconer/snow (nat).png");
  regnIconNat = loadImage("Iconer/rain (nat).png");
  regnIcon = loadImage("Iconer/shower rain (dag).png");
  regnIconNat = loadImage("Iconer/shower rain (nat).png");
  
  //sol iconer
  solRegnIcon = loadImage("Iconer/rain (dag).png");
  solOverskyetIcon = loadImage("Iconer/few clouds (dag).png");
  solIcon = loadImage("Iconer/clear sky (dag).png");
  TågeIcondag = loadImage("Iconer/mist (dag).png");
  tågeIcon = loadImage("Iconer/mist (dag).png");
  tordenIcon = loadImage("Iconer/thunderstorm (dag).png");

  //InformationIconer
  søgIcon = loadImage("Iconer/SøgIcon.svg");
  vindIcon = loadImage("Iconer/vind (selv).png");
  synlighedIcon = loadImage("Iconer/øje.png");
  UVIcon = loadImage("Iconer/UV (selv).png");
  solOpIcon = loadImage("Iconer/sol går op.png");
  solNedIcon = loadImage("Iconer/sol går ned.png");
  regnMængdeIcon = loadImage("Iconer/dråbe (selv).png");
  placeringIcon = loadImage("Iconer/placering.png");
  advarselIcon = loadImage("Iconer/Advarsel 2.png");
}

function setup(){
  createCanvas(window.innerWidth, window.innerHeight);
  DatoIDag();
  //console.log(iDag);
  //Søgefelt
  søgBy = createInput("Søg", 'search');
  //Datofelt for idag
  dato = createDiv(ugeDag + ' d. ' + dagDato);

  //Lat og Lon for brugeren 
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  getLocation();
}

function draw (){
  //Object tilstande start
  colorMode(RGB, 255, 255, 255, 100);
  imageMode(CORNER);
  rectMode(CORNER); 
  //Font for teksten
  textFont('Calibri');
 
  //Hvis der ikke er noget data hentet endnu skal den kun tegne baggrunden og lave et søgefelt
  if(temperaturMax5Dage[0] == undefined){ 
    baggrund();
    infoBokse();
    søgeFelt();
  } else {
    baggrund();
    infoBokse();
    søgeFelt();
    infoIconerIdag();
    infoIconer5Dage();
    tekst();
    tekst5Dage();
    tekstJord();
    iconID();
    iconBillede5Dage();
    //Hvis der ikke er nogen advarsler for voldsom vejr skal den ikke vise et advarsel felt
    if(advarsel == undefined){
    } else {
      advarselFelt();
    }
  } 
}

//Bagrund for hjemmesiden
function baggrund(){
  //variable for header
  headerHeight = height / 18;
  //variabler for sidekasserne
  kantBoxWidth = width / 7;
  kantBoxHeight = height / 5 * 3.5;
  hKantBoxX = width - kantBoxWidth;
  //Variabler for midterboksen
  hovedBlokWidth = width - (2 * kantBoxWidth);
  hovedBlokHeight = height - ((kantBoxHeight / 8) * 6);
  //Variabler for 5 Dage kasserne i bunden
  dageBlokY = headerHeight + kantBoxHeight;
  dageBlokWidth = width / 5;
  dageBlokHeight = height - (headerHeight + kantBoxHeight);
  //Variabler for markbilledet
  markX = kantBoxWidth;
  markHeight = (kantBoxHeight - hovedBlokHeight);
  markY = (hovedBlokHeight + headerHeight) - markHeight;

  //header
  noStroke();
  fill(197, 224, 180);
  rect(0, 0, width, headerHeight); 
  //Venstre sidebox
  fill(112, 173, 71);
  rect(0, headerHeight, kantBoxWidth, kantBoxHeight); 
  //Højre sidebox
  rect(hKantBoxX, headerHeight, kantBoxWidth, kantBoxHeight); 
  
  //Baggrundsfarve for midterboksen afhængig af tid på dagen
  if(tidNu > solOp && tidNu < solNed){
    //Mørk om natten
    fill(173, 185, 202);
  } else {
    //Lys om dagen
    fill(30, 37, 47);
  }
  //Midterboksen
  rect(kantBoxWidth, headerHeight, hovedBlokWidth, hovedBlokHeight); //Hovedbox
  image(mark, markX, markY, hovedBlokWidth, markHeight * 2); //mark

  //5 Dages bokse
  fill(197, 224, 180);
  let a = 0;
  for(let i = 0; i < 5; i++) {
    rect(dageBlokWidth * a, dageBlokY, dageBlokWidth, dageBlokHeight);
    a++
  }
  //Linje mellem boksene
  let s = 1;
  for(let j = 0; j < 4; j++) {
    strokeWeight(5);
    stroke(23, 36, 15);
    strokeCap(SQUARE);
    line(dageBlokWidth * s, dageBlokY, dageBlokWidth * s, height);
    s++
  }

}

//Bokse til informationer
function infoBokse(){
  noStroke();
  fill(147, 162, 184, 90);

  //Variabler for dato Boks
  datoBoxX = kantBoxWidth + ((hovedBlokWidth / 6));
  datoBoxY = headerHeight + hovedBlokHeight / 20;
  datoBoxHeight = headerHeight + 5;
  datoBoxKant = 15;
  //Dato text
  dato.style('text-align:center');
  dato.style('font-size', datoBoxHeight - 10 + 'px');
  dato.position(datoBoxX + 15 , datoBoxY + 3);
  bredde = dato.size();
  //Datoboks
  rectMode(CENTER);
  rect(datoBoxX + (bredde.width + 30) / 2, datoBoxY + (datoBoxHeight / 2), bredde.width + 25, datoBoxHeight, datoBoxKant);
  rectMode(CORNER);

  //Variabler for infoboks for idag
  vejrInfoBoxX = hKantBoxX - hovedBlokWidth / 2;
  vejrInfoBoxY = (hovedBlokHeight / 2);
  vejrInfoBoxWidth = (hovedBlokWidth / 2) - 20;
  vejrInfoBoxHeight = vejrInfoBoxY + 20;
  vejrInfoBoxKant = 15;
  
  //vejrInfoBox
  fill(147, 162, 184, 90);
  rect(vejrInfoBoxX, vejrInfoBoxY, vejrInfoBoxWidth, vejrInfoBoxHeight, vejrInfoBoxKant, vejrInfoBoxKant, vejrInfoBoxKant, vejrInfoBoxKant);

  //Linjer for infoboks
  stroke(40, 49, 62);
  strokeWeight(3);
  //Vandrette
  line(vejrInfoBoxX, vejrInfoBoxHeight / 3 + vejrInfoBoxY, vejrInfoBoxX + vejrInfoBoxWidth, vejrInfoBoxHeight / 3 + vejrInfoBoxY);
  line(vejrInfoBoxX, 2 * vejrInfoBoxHeight / 3 + vejrInfoBoxY, vejrInfoBoxX + vejrInfoBoxWidth, 2 * vejrInfoBoxHeight / 3 + vejrInfoBoxY);
  //lodret
  line(vejrInfoBoxX + vejrInfoBoxWidth / 2, vejrInfoBoxY, vejrInfoBoxX + vejrInfoBoxWidth / 2, vejrInfoBoxY + vejrInfoBoxHeight);  
  noStroke();

  //variabler for jord databoks
  markHeightHalf = (kantBoxHeight - hovedBlokHeight);
  markYHalf = hovedBlokHeight + headerHeight;
  jordBoxX = markX + (hovedBlokWidth/ 25);
  jordBoxY = markYHalf  + ((markHeightHalf) / 20);
  jordBoxWidth = hovedBlokWidth - ((hovedBlokWidth / 25) * 2);
  jordBoxHeight = markHeightHalf - ((markHeightHalf / 20) * 2);
  jordBoxKant = 15;

  //jord data box
  fill(203, 150, 97, 75);
  rect(jordBoxX, jordBoxY, jordBoxWidth, jordBoxHeight, jordBoxKant, jordBoxKant, jordBoxKant, jordBoxKant);
  
  //linjer for jord data boks
  strokeCap(ROUND); //runde ender
  stroke(96, 64, 32);
  strokeWeight(4);
  //Lodret i midten
  line(jordBoxX + jordBoxWidth / 2, jordBoxY, jordBoxX + jordBoxWidth / 2, jordBoxY + jordBoxHeight); 
  
  //Vandrette under datapunkter
  line(jordBoxX, jordBoxY + (jordBoxHeight / 5 * 4), jordBoxX + jordBoxWidth / 2 - jordBoxWidth / 15, jordBoxY + (jordBoxHeight / 5 * 4));
  line(jordBoxX + jordBoxWidth / 2 + jordBoxWidth / 15, jordBoxY + (jordBoxHeight / 5 * 4), jordBoxX + jordBoxWidth, jordBoxY + (jordBoxHeight / 5 * 4));
  noStroke();
}

//Iconer for information for iDag
function infoIconerIdag(){
  vindIconIdagX = vejrInfoBoxX - 3;
  vindIconIdagY = vejrInfoBoxY - 28;
  vindIconIdagWidth = (vejrInfoBoxWidth / 4.5);
  vindIconIdagHeight = (vejrInfoBoxHeight / 1.5);

  image(vindIcon, vindIconIdagX, vindIconIdagY, vindIconIdagWidth, vindIconIdagHeight);

  regnIconX = vejrInfoBoxX+20;
  regnIconY = vejrInfoBoxY + (vejrInfoBoxHeight / 3) + 5;
  regnIconWidth = (vejrInfoBoxWidth / 2) / 4;
  regnIconHeight = (vejrInfoBoxHeight / 3) - 10;

  image(regnMængdeIcon, regnIconX, regnIconY, regnIconWidth, regnIconHeight);

  UVIconX = vejrInfoBoxX + (vejrInfoBoxWidth / 2) + 20;
  UVIconY = vejrInfoBoxY + 5;
  UVIconWidth = (vejrInfoBoxWidth / 2) / 4;
  UVIconHeight = (vejrInfoBoxHeight / 3) - 10;

  image(UVIcon, UVIconX, UVIconY, UVIconWidth, UVIconHeight);

  synlighedIconX = UVIconX-25;
  synlighedIconY = regnIconY-25;
  synlighedIconWidth = UVIconWidth+45;
  synlighedIconHeight =  regnIconHeight+45;

  image(synlighedIcon, synlighedIconX, synlighedIconY, synlighedIconWidth, synlighedIconHeight);

  solOpIconX = vejrInfoBoxX+20
  solOpIconY = regnIconY + (vejrInfoBoxHeight / 3)
  solOpIconWidth = (vejrInfoBoxWidth / 2) / 3.5
  solOpIconHeight = (vejrInfoBoxHeight / 3) - 10;

  image(solOpIcon, solOpIconX, solOpIconY, solOpIconWidth, solOpIconHeight);
  
  solNedIconX = UVIconX
  solNedIconY = solOpIconY
  solNedIconWidth = solOpIconWidth;
  solNedIconHeight = solOpIconHeight;

  image(solNedIcon, solNedIconX, solNedIconY, solNedIconWidth, solNedIconHeight);

 
}

//Iconer for information for 5 dage
function infoIconer5Dage(){
  //Regnicon Variabler
  regnIcon5DageY = dageBlokY + (dageBlokHeight / 2);
  regnIcon5DageWidth = dageBlokWidth / 6;
  regnIcon5DageHeight = dageBlokHeight / 4;

  //Vindicon Variabler
  vindIcon5DageY = regnIcon5DageY + regnIcon5DageHeight;
  vindIcon5DageWidth = dageBlokWidth / 6;
  vindIcon5DageHeight = regnIcon5DageHeight;

  //SolOpicon Variabler
  solOp5DageIconY = regnIcon5DageY;
  solOp5DageIconWidth = regnIcon5DageWidth;
  solOp5DageIconHeight = regnIcon5DageHeight - 5;
  
  //SolNedicon Variabler
  solNed5DageIconY = vindIcon5DageY;
  solNed5DageIconWidth = solOp5DageIconWidth;
  solNed5DageIconHeight = solOp5DageIconHeight;

  let ab = 0
  for(let cd = 0; cd < 5; cd++){
    //X værdier for iconerne
    regnIcon5DageX = dageBlokWidth * ab;
    vindIcon5DageX = regnIcon5DageX + 3;
    solOp5DageIconX = regnIcon5DageX + (dageBlokWidth / 2) + (dageBlokWidth / 15)
    solNed5DageIconX = solOp5DageIconX

    image(regnMængdeIcon, regnIcon5DageX, regnIcon5DageY, regnIcon5DageWidth, regnIcon5DageHeight); //RegnIcon
    image(vindIcon, vindIcon5DageX, vindIcon5DageY, vindIcon5DageWidth, vindIcon5DageHeight); //VindIcon
    image(solOpIcon, solOp5DageIconX, solOp5DageIconY, solOp5DageIconWidth,solOp5DageIconHeight); //SolOpIcon
    image(solNedIcon, solNed5DageIconX, solNed5DageIconY, solNed5DageIconWidth,solNed5DageIconHeight); //SolNedIcon
    ab++
  }
}

//Tekst for Idag
function tekst(){
  //Lokalitet text
  byNavn = byLok + ', ';
  landNavn = landLok; 
  //Hvis ikke kan findes nogen region eller stat skal den være blank
  if(regionLok == undefined){
    regionNavn = ''
  } else{
    regionNavn = regionLok + ', ';
  }

  //Lokalitet variabler position
  lokX = width / 2;
  lokY = headerHeight / 2;
  
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(headerHeight - 10);
  text(byNavn + regionNavn + landNavn, lokX, lokY);

  //icon for placering
  //X værdi afhænging af længden af lokalitetteksten
  placeringIconX = (width / 2) - (textWidth(byNavn + regionNavn + landNavn) / 2) - 35 / 2; 
  placeringIconY = headerHeight / 2;
  placeringIconWidth = 35;
  placeringIconHeight = headerHeight;

  imageMode(CENTER);
  image(placeringIcon, placeringIconX, placeringIconY, placeringIconWidth, placeringIconHeight)
  
  //Tekstfarve for temperaturen afhængig af tid på dagen
  if(tidNu > solOp && tidNu < solNed){
    //Sort om dagen
    fill(0)
  } else {
    //Hvid og fed skrift om natte
    textStyle(BOLD);
    fill(255);
  }
  
  textAlign(LEFT, BASELINE);
 
  //temperatur nu
  textSize(hovedBlokHeight / 2.7);
  temperaturX = kantBoxWidth + (hovedBlokWidth / 20);
  temperaturY = markYHalf - (hovedBlokHeight / 100);
  text(temperaturNu + '°', temperaturX, temperaturY);
  
  //temp min/max idag
  textAlign(RIGHT, BACKSPACE)
  textSize((hovedBlokHeight / 2.7) / 1.5);
  tempMinMaxX = vejrInfoBoxX - 10
  text(temperaturMinIdag + '°/' + temperaturMaxIdag + '°', tempMinMaxX, temperaturY - 6);
  fill(0)

  //Text indstillinger for teksten i Infoboxen
  textSize((vejrInfoBoxHeight / 3) - 25);
  textStyle(NORMAL);
  textAlign(CENTER, CENTER);
  
  //vind idag
  vindX = vejrInfoBoxX + ((vejrInfoBoxWidth / 2) / 1.5);
  vindY = vejrInfoBoxY + ((vejrInfoBoxHeight / 3) / 2);
  text(vindRetningIdagOrd + ' ' + vindFartIdag + 'm/s', vindX, vindY);
 
  //regn Idag
  //Hvis der ingen regn er skal den vise 0mm
  if(regnIdag = 'undefined') {
    regnMængde = 0 + 'mm'
  } else {
    regnMængde = regnIdag + 'mm'; 
  }
  regnX = vindX;
  regnY = vejrInfoBoxY + (((vejrInfoBoxHeight / 3) / 2) + (vejrInfoBoxHeight / 3));
  text(regnMængde, regnX, regnY);

  //UV idag
  UVX = vindX + vejrInfoBoxWidth / 2;
  UVY = vejrInfoBoxY + ((vejrInfoBoxHeight / 3) / 2);
  text(UV, UVX, UVY);

  //Synlighed
  synlighedX = UVX;
  synlighedY = vejrInfoBoxY + (((vejrInfoBoxHeight / 3) / 2) + (vejrInfoBoxHeight / 3));
  text(synlighed + 'Km', synlighedX, synlighedY);

  //sol Op Idag
  solOpX = vindX;
  solOpY = vejrInfoBoxY + (((vejrInfoBoxHeight / 3) / 2) + (vejrInfoBoxHeight / 3 * 2));
  text(solOpIdag, solOpX, solOpY);

  //sol ned Idag
  solNedX = UVX;
  solNedY = vejrInfoBoxY + (((vejrInfoBoxHeight / 3) / 2) + (vejrInfoBoxHeight / 3 * 2));
  text(solNedIdag, solNedX, solNedY);
}

//Tekst for 5 Dage
function tekst5Dage(){
  //Variabler for 5 dage tekst
  dageBlokHeightVejrdata = (dageBlokHeight - dageBlokHeight / 5); 
  //Y-værdier
  dato5DageY = headerHeight + kantBoxHeight;
  tempMinMax5dageY = (dato5DageY + dageBlokHeightVejrdata / 3) + 25;
  regn5DageY = (tempMinMax5dageY + dageBlokHeightVejrdata / 3) - 5;
  vind5DageY = (regn5DageY + dageBlokHeightVejrdata / 3) - 5;
  solOp5DageY = regn5DageY;
  solNed5DageY = vind5DageY;

  let o = 0;
  let p = 1;
  let d = iDag.getDate() - 24;
  let k = 0;
  let æ = 1
  for(let v = 0; v < 5; v++){
    dato5DageX = (dageBlokWidth * o) + dageBlokWidth / 2;
    ugeDag5Dage = ugeDage[iDag.getDay() + æ];
    if(iDag.getMonth() ==  1){
      if(iDag.getDate() >= 23){
        dagDato5Dage = dato5Dage28[d + 2];
      } else{
        dagDato5Dage = iDag.getDate() + æ
      }
    }else if(iDag.getMonth() ==  0 || iDag.getMonth() ==  2 || iDag.getMonth() ==  4 || iDag.getMonth() ==  6 || iDag.getMonth() ==  7 || iDag.getMonth() ==  9 || iDag.getMonth() ==  11){
      if(iDag.getDate() >= 26){
        dagDato5Dage = dato5Dage31[d - 1];
      } else if (iDag.getDate < 26){
        dagDato5Dage = iDag.getDate() + æ
      }
    }else if(iDag.getMonth() ==  3 || iDag.getMonth() ==  5 || iDag.getMonth() ==  8 || iDag.getMonth() ==  10){
      if(iDag.getDate() >= 25){
        dagDato5Dage = dato5Dage30[d];
      } else if (iDag.getDate < 25){
        dagDato5Dage = iDag.getDate() + æ
      }
    }

    textSize(dageBlokHeight / 5);
    textAlign(CENTER, TOP);
    text(ugeDag5Dage + ' d. ' + dagDato5Dage, dato5DageX, dato5DageY);

    textSize(dageBlokHeight / 5);
    textAlign(RIGHT, BASELINE);
    tempMinMax5dageX = (dageBlokWidth * o) + (dageBlokWidth / 2) + 7;
    text(temperaturMin5Dage[k] + '°/' + temperaturMax5Dage[k] + '°', tempMinMax5dageX, tempMinMax5dageY);
    
    textSize(dageBlokHeightVejrdata / 5.5)

    regn5DageX = tempMinMax5dageX;
    if(regn5Dage[k] == undefined){
      regnMængde5Dage = '0';
    } else {
      regnMængde5Dage = regn5Dage[k];
    }
    text(regnMængde5Dage + 'mm', regn5DageX, regn5DageY);

    g = vindRetning5Dage[k];
    vindRetCompass5Dage();

    vind5DageX = tempMinMax5dageX;
    text(vindRetning5DageOrd + vindFart5Dage[k] + 'm/s', vind5DageX, vind5DageY);

    solOp5DageX = (dageBlokWidth * p) - 15;
    text(solOp5Dage[k], solOp5DageX, solOp5DageY);

    solNed5DageX = (dageBlokWidth * p) - 15;
    text(solNed5Dage[k], solNed5DageX, solNed5DageY);

    d++
    o++
    p++
    k++
    æ++
  }
}

//Tekst for Jord Data
function tekstJord(){
  textAlign(CENTER, TOP);
  textSize((jordBoxHeight - 2 * 5) / 5);

  //Jordtemperatur titel
  jordTempX = jordBoxX + jordBoxWidth / 4
  jordTempY = jordBoxY
  halvJordBox = jordBoxWidth / 2
  text('Jordtemperatur(°)', jordTempX, jordTempY);
  
  //jordTemp Data
  jordTemp6cmY = jordBoxY + jordBoxHeight / 5;
  jordTemp18cmY = jordTemp6cmY + jordBoxHeight / 5;
  jordTemp54cmY = jordTemp18cmY + jordBoxHeight / 5;
  jordTid = jordTemp54cmY + jordBoxHeight / 5 + 4;
  let j = 0.5;
  let l = 0
  for(let s = 0; s < 6; s++) {
    textSize((jordBoxHeight - 2 * 5) / 6);
    textAlign(CENTER, TOP);
    jordTempXcmX = jordBoxX + halvJordBox / 14 * j * 2;
    text(jordTemperatur6cm[l] + '°', jordTempXcmX, jordTemp6cmY);
    text(jordTemperatur18cm[l] + '°', jordTempXcmX, jordTemp18cmY);
    text(jordTemperatur54cm[l] + '°', jordTempXcmX, jordTemp54cmY);

    //Time tal under tabellen
    let timerJordTemp = l.toString()
    if(timerJordTemp.length == 2) {
    text('00:' + timerJordTemp, jordTempXcmX, jordTid);
    } else if(timerJordTemp.length == 1) {
      text('00:0' + timerJordTemp, jordTempXcmX, jordTid);
    }

    j++
    l = l + 4
  }
  textSize((jordBoxHeight - 2 * 5) / 6);
  text('6cm', jordTempXcmX + halvJordBox / 14 * 2, jordTemp6cmY);
  text('18cm', jordTempXcmX + halvJordBox / 14 * 2, jordTemp18cmY);
  text('54cm', jordTempXcmX + halvJordBox / 14 * 2, jordTemp54cmY);

  textAlign(CENTER, TOP);
  textSize((jordBoxHeight - 2 * 5) / 5);

  //jordfugtighed titel
  jordFugtX = jordBoxX + (jordBoxWidth / 4 * 3)
  jordFugtY = jordBoxY
  text('Jordfugtighed(m³/m³)', jordFugtX, jordFugtY);

  jordFugt1_3cmY = jordBoxY + jordBoxHeight / 6;
  jordFugt3_9cmY = jordFugt1_3cmY + jordBoxHeight / 6;
  jordFugt9_27cmY = jordFugt3_9cmY + jordBoxHeight / 6;
  jordFugt27_81cmY = jordFugt9_27cmY + jordBoxHeight / 6;

  let h = 1.5;
  let m = 0
  for(let d = 0; d < 6; d++) {
    textSize((jordBoxHeight - 2 * 5) / 7);
    textAlign(CENTER, TOP);
    jordFugtXcmX = jordBoxX + ((halvJordBox / 14 * h * 2) + halvJordBox);
    text(jordFugtighed1_3cm[m], jordFugtXcmX, jordFugt1_3cmY);
    text(jordFugtighed3_9cm[m], jordFugtXcmX, jordFugt3_9cmY);
    text(jordFugtighed9_27cm[m], jordFugtXcmX, jordFugt9_27cmY);
    text(jordFugtighed27_81cm[m], jordFugtXcmX, jordFugt27_81cmY);
    textSize((jordBoxHeight - 2 * 5) / 6);
    //Timetal under tabellen
    let timerJordFugt = m.toString()
    if(timerJordFugt.length == 2) {
    text('00:' + timerJordFugt, jordFugtXcmX, jordTid);
    } else if(timerJordFugt.length == 1) {
      text('00:0' + timerJordFugt, jordFugtXcmX, jordTid);
    }
    h++
    m = m + 4
  }
  textSize((jordBoxHeight - 2 * 5) / 7);
  jordFugtOrdX = jordBoxX + ((halvJordBox / 14) + halvJordBox)
  text('1-3cm', jordFugtOrdX, jordFugt1_3cmY);
  text('3-9cm', jordFugtOrdX, jordFugt3_9cmY);
  text('9-27cm', jordFugtOrdX, jordFugt9_27cmY);
  text('27-81cm', jordFugtOrdX, jordFugt27_81cmY);
  
  strokeCap(ROUND);
  stroke(96, 64, 32);
  strokeWeight(4);
  line(jordFugtOrdX + (halvJordBox / 14), jordBoxY + jordBoxHeight / 6, jordFugtOrdX + (halvJordBox / 14), jordBoxY + jordBoxHeight - jordBoxHeight / 6); 
  
  line(jordFugtOrdX - (halvJordBox / 14 * 3), jordBoxY + jordBoxHeight / 6, jordFugtOrdX - (halvJordBox / 14 * 3), jordBoxY + jordBoxHeight - jordBoxHeight / 6)
  noStroke(); 
}

//ID for vejricon Idag
function iconID(){
  if(weatherID == 200 || weatherID == 201 || weatherID == 202 || weatherID == 210 || weatherID == 211 || weatherID == 212 || weatherID == 221 || weatherID == 230 || weatherID == 231 || weatherID == 232){
    if(tidNu > solOp && tidNu < solNed){
      vejrIconIdag = tordenIcon;
    } else {
      vejrIconIdag = måneTordenIcon;
    }
    iconBilledeIdag();
  } else if(weatherID == 300 || weatherID == 301 || weatherID == 302 || weatherID == 310 || weatherID == 311 || weatherID == 312 || weatherID == 313 || weatherID == 314 || weatherID == 321 || weatherID == 500 || weatherID == 501 || weatherID == 502 || weatherID == 503 || weatherID == 504 || weatherID == 520 || weatherID == 521 || weatherID == 522 || weatherID == 531){
    if(tidNu > solOp && tidNu < solNed){
      vejrIconIdag = regnIcon;
    } else {
      vejrIconIdag = måneRegnIcon;
    }
    iconBilledeIdag();
  } else if(weatherID == 511 || weatherID == 600 || weatherID == 601 || weatherID == 602 || weatherID == 611 || weatherID == 612 || weatherID ==  613 || weatherID == 615 || weatherID == 616 || weatherID == 620 || weatherID == 621 || weatherID == 622){
    if(tidNu > solOp && tidNu < solNed){
      vejrIconIdag = overskyetSneIcon;
    } else {
      vejrIconIdag = måneSneIcon;
    }
    iconBilledeIdag();
  } else if(weatherID == 701 || weatherID == 711 || weatherID == 721 || weatherID == 731 || weatherID == 741 || weatherID == 751 || weatherID ==  761 || weatherID == 762 || weatherID == 771 || weatherID == 781){
    if(tidNu > solOp && tidNu < solNed){
      vejrIconIdag = tågeIcon;
    } else {
      vejrIconIdag = måneTågeIcon;
    }
    iconBilledeIdag();
  } else if(weatherID  == 800){
    if(tidNu > solOp && tidNu < solNed){
    vejrIconIdag = solIcon;
    } else {
    vejrIconIdag = måneIcon;
    }
    iconBilledeIdag();
  } else if(weatherID == 801 || weatherID == 802 || weatherID == 803 || weatherID == 804){
    if(tidNu > solOp && tidNu < solNed){
    vejrIconIdag = solOverskyetIcon;
    } else {
    vejrIconIdag = måneOverskyetIcon;
    }
    iconBilledeIdag();
  }
}

//Vejricon billede for idag
function iconBilledeIdag(){
  imageMode(CENTER);
  iconIdagX = kantBoxWidth + (hovedBlokWidth / 4);
  iconIdagY = hovedBlokHeight / 2 + 20;
  iconIdagSize = hovedBlokWidth / 5;

  image(vejrIconIdag, iconIdagX, iconIdagY, iconIdagSize, iconIdagSize);
}

//Vejricon billedevariabler for 5 dage
function iconBillede5Dage(){
  icon5DageY = tempMinMax5dageY - 18;
  icon5DageWidth = (dageBlokWidth / 2) / 2;
  icon5DageHeight = icon5DageWidth
  let i = 0;
  let æ = 0;
 imageMode(CENTER);
  for(let w = 0; w < 5; w++){
    q = weatherID5Dage[i];
    icon5DageX = (dageBlokWidth / 4 * 3) + (dageBlokWidth * æ);
    iconID5Dage();
   //console.log(q)
    i++
    æ++
  }
}

//Vejricon for 5 Dage
function iconID5Dage(){
  if(q == 200 || q == 201 || q == 202 || q == 210 || q == 211 || q == 212 || q == 221 || q == 230 || q == 231 || q == 232){
    image(tordenIcon, icon5DageX, icon5DageY, icon5DageWidth, icon5DageHeight);
    //vejrIcon5dage = tordenIcon;

  } else if(q == 300 || q == 301 || q == 302 || q == 310 || q == 311 || q == 312 || q == 313 || q == 314 || q == 321 || q == 500 || q == 501 || q == 502 || q == 503 || q == 504 || q == 520 || q == 521 || q == 522 || q == 531){
    //vejrIcon5dage = regnIcon;
    image(regnIcon, icon5DageX, icon5DageY, icon5DageWidth, icon5DageHeight);

  } else if(q == 511 || q == 600 || q == 601 || q == 602 || q == 611 || q == 612 || q ==  613 || q == 615 || q == 616 || q == 620 || q == 621 || q == 622){
    //vejrIcon5dage = overskyetSneIcon;
    image(overskyetSneIcon, icon5DageX, icon5DageY, icon5DageWidth, icon5DageHeight);

  } else if(q == 701 || q == 711 || q == 721 || q == 731 || q == 741 || q == 751 || q ==  761 || q == 762 || q == 771 || q == 781){
    image(tågeIcon, icon5DageX, icon5DageY, icon5DageWidth, icon5DageHeight);

  } else if(q  == 800){
    image(solIcon, icon5DageX, icon5DageY, icon5DageWidth, icon5DageHeight);
    //vejrIcon5dage = solIcon;

  } else if(q == 801 || q == 802 || q == 803 || q == 804){
    image(solOverskyetIcon, icon5DageX, icon5DageY, icon5DageWidth, icon5DageHeight);
    //vejrIcon5dage = solOverskyetIcon;
  }
}

//Felt for varslinger om voldsomt vejr
function advarselFelt(){
  //Variabler for boks
  advarselBoksX = vejrInfoBoxX;
  advarselBoksY = datoBoxY;
  advarselBoksWidth = vejrInfoBoxWidth;
  advarselBoksHeight = datoBoxHeight + datoBoxHeight / 2;
  advarselBoksKant = 20;
  //Variabler for advarsel icon
  advarselIconWidth = advarselBoksWidth / 7;
  advarselIconX = advarselBoksX + 7;
  //Variabler for advarsel tekst
  advarselTekstX = advarselBoksX + advarselIconWidth + ((advarselBoksWidth - advarselIconWidth) / 2);
  advarselTekstY = advarselBoksY + 16;

  //Advarsel boks
  fill(147, 162, 184, 90);
  rect(advarselBoksX, advarselBoksY, advarselBoksWidth, advarselBoksHeight, advarselBoksKant);

  //Advarsel Billede
  imageMode(CORNER);
  image(advarselIcon, advarselIconX, advarselBoksY, advarselIconWidth, advarselBoksHeight);

  //Advarsel text
  textAlign(CENTER, TOP);
  fill(0);
  textStyle(BOLD);
  textFont('sans-serif')
  textSize(advarselBoksHeight - 30);
  text(advarsel, advarselTekstX, advarselBoksY + 20);
  textStyle(NORMAL);
}

//Felt til at søge efter by
function søgeFelt(){
    //Søge felt
    søgBoksX = 0 + (width / 200 * 3);
    søgBoksY = (headerHeight / 2) - (headerHeight / 3);
    søgBoksWidth = width / 4.5;
    søgBoksHeight = headerHeight - (headerHeight / 3);
  
    søgBy.position(søgBoksX, søgBoksY);
    søgBy.size(søgBoksWidth, søgBoksHeight);
    søgBy.mousePressed(søg);

    søgIconX = 0;
    søgIconY = 0 + 5;
    søgIconWidth = søgBoksX
    søgIconHeight = headerHeight - 10;
    image(søgIcon, søgIconX, søgIconY, søgIconWidth, søgIconHeight);
}

//Clear al text ved tryk
function søg(){
  søgBy.value("")
}

//Søg ved tryk på enter
function keyPressed(){
  if(keyCode === ENTER){
    byKode = søgBy.value();
    geoLokalitet();
  }
}

//Dato for i dag
function DatoIDag(){
  dagDato = iDag.getDate()
  ugeDag = ugeDage[iDag.getDay()]
}

//Vindretning som ord istedet for grader for Idag
function vindRetCompassIdag(){
  f = vindRetningIdag
  if (24 <= f && f <= 68){
    vindRetningIdagOrd = vindRetningOrd[1]
  } else if (69 <= f && f <= 113){
    vindRetningIdagOrd = vindRetningOrd[2]
  } else if (114 <= f && f <= 158){
    vindRetningIdagOrd = vindRetningOrd[3]
  } else if (159 <= f && f <= 203){
    vindRetningIdagOrd = vindRetningOrd[4]
  } else if (204 <= f && f <= 248){
    vindRetningIdagOrd = vindRetningOrd[5]
  } else if (249 <= f && f <= 293){
    vindRetningIdagOrd = vindRetningOrd[6]
  } else if (294 <= f && f <= 336){
    vindRetningIdagOrd = vindRetningOrd[7]
  } else if (337 <= f || f <= 23){
    vindRetningIdagOrd = vindRetningOrd[0]
  }
}

//Vindretning som ord istedet for grader for 5 Dage
function vindRetCompass5Dage(){
  if (24 <= g && g <= 68){
    vindRetning5DageOrd = vindRetningOrd[1];
  } else if (69 <= g && g <= 113){
    vindRetning5DageOrd = vindRetningOrd[2];
  } else if (114 <= g && g <= 158){
    vindRetning5DageOrd = vindRetningOrd[3];
  } else if (159 <= g && g <= 203){
    vindRetning5DageOrd = vindRetningOrd[4];
  } else if (204 <= g && g <= 248){
    vindRetning5DageOrd = vindRetningOrd[5];
  } else if (249 <= g && g <= 293){
    vindRetning5DageOrd = vindRetningOrd[6];
  } else if (294 <= g && g <= 336){
    vindRetning5DageOrd = vindRetningOrd[7];
  } else if (337 <= g || g <= 23){
    vindRetning5DageOrd = vindRetningOrd[0];
  }
}

//Koordinater for bruger(successful)
function showPosition(position){
  lat = position.coords.latitude;
  long = position.coords.longitude;

  //console.log(lat, long);
  positionNavn();
}

//Koordinater for bruger(usuccessful)
function showError(error){
  //Hvis lokalitet ikke kan findes skal den vise data for københavn istedet
  switch(error.code) {
    case error.PERMISSION_DENIED:
      lat = 55.6867243 
      long = 12.5700724
      positionNavn();
      break;
    case error.POSITION_UNAVAILABLE:
      lat = 55.6867243 
      long = 12.5700724
      positionNavn();
      break;
    case error.TIMEOUT:
      lat = 55.6867243 
      long = 12.5700724
      positionNavn();
      break;
    case error.UNKNOWN_ERROR:
      lat = 55.6867243 
      long = 12.5700724
      positionNavn();
      break;
  }
}

//Vejrdata Api 
async function getVejrData(){
  //Dato i ISO uden timer
  let d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth() + 1;
  let date = d.getDate();
  let ISODateStart = year + '-' + '0' + month + '-' + date

  //Jord temp + fugt API
  jordTempFugtApi = 'https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + long + '&hourly=soil_temperature_6cm,soil_temperature_18cm,soil_temperature_54cm,soil_moisture_1_3cm,soil_moisture_3_9cm,soil_moisture_9_27cm,soil_moisture_27_81cm&timezone=' + tidzoneNavn + '&start_date='+ ISODateStart + '&end_date=' + ISODateStart;
  //console.log('Open-Metero Jord', jordTempFugtApi)

  //API for Vejr idag og 5 dage
  vejrApi = 'https://api.openweathermap.org/data/3.0/onecall?lat='+ lat + '&lon=' + long + '&exclude=hourly,minutely&units=metric&appid=86ba36e11f19834abde919c3653aec7e'
  //console.log('OneCall', vejrApi);
  
  responseVejr = await fetch(vejrApi);
  vejrDataJson = await responseVejr.json();
  //console.log(vejrDataJson);

  responseJord = await fetch(jordTempFugtApi);
  jordDataJson = await responseJord.json();
  //console.log(jordDataJson);

  //variabler for idag
  tidNu = (vejrDataJson.current.dt + vejrDataJson.timezone_offset) * 1000;
  temperaturMaxIdag = round(vejrDataJson.daily[0].temp.max); //Temp max
  temperaturMinIdag = round(vejrDataJson.daily[0].temp.min); //Temp min
  vindFartIdag = vejrDataJson.current.wind_speed; //Vind hastighed
  vindRetningIdag = vejrDataJson.current.wind_deg; //Vind retning
  regnIdag = vejrDataJson.daily[0].rain; //Regn
  solOp = (vejrDataJson.daily[0].sunrise + vejrDataJson.timezone_offset) * 1000;
  solOpIdag = new Date(solOp).toISOString().slice(11, 16); //sol op
  solNed = (vejrDataJson.daily[0].sunset + vejrDataJson.timezone_offset) * 1000;
  solNedIdag = new Date(solNed).toISOString().slice(11, 16); // sol ned
  UV = round(vejrDataJson.current.uvi); //UV
  synlighed = vejrDataJson.current.visibility / 1000; //Synlighed
  temperaturNu = round(vejrDataJson.current.temp); //Temperatur nu
  advarselCheck = vejrDataJson.alerts
  if(advarselCheck == undefined){
    advarsel = undefined
  } else {
    advarsel = vejrDataJson.alerts[0].event
  }
  weatherID = vejrDataJson.current.weather[0].id
  vindRetCompassIdag();
  

  //Jordtemperatur 
  jordTemperatur6cm = jordDataJson.hourly.soil_temperature_6cm;
  jordTemperatur18cm = jordDataJson.hourly.soil_temperature_18cm;
  jordTemperatur54cm = jordDataJson.hourly.soil_temperature_54cm;
  //Jordfugtighed
  jordFugtighed1_3cm = jordDataJson.hourly.soil_moisture_1_3cm;
  jordFugtighed3_9cm = jordDataJson.hourly.soil_moisture_3_9cm;
  jordFugtighed9_27cm = jordDataJson.hourly.soil_moisture_9_27cm;
  jordFugtighed27_81cm = jordDataJson.hourly.soil_moisture_27_81cm;
  
  data5DageClear()
  //Variabler for 5 dage
  let b = 1;
  for(let z = 0; z < 5; z++){
    temperaturMax5Dage.push(round(vejrDataJson.daily[b].temp.max)); //Max temp 5dage
    temperaturMin5Dage.push(round(vejrDataJson.daily[b].temp.min)); //Min temp 5 dage
    solOp5DageUNIX.push((vejrDataJson.daily[b].sunrise + vejrDataJson.timezone_offset) * 1000); //Sol op i UNIX 5 dage
    solNed5DageUNIX.push((vejrDataJson.daily[b].sunset + vejrDataJson.timezone_offset) * 1000);//Sol ned i UNIX 5 dage
    regn5Dage.push(vejrDataJson.daily[b].rain); //Regn 5 dage
    vindFart5Dage.push(round(vejrDataJson.daily[b].wind_speed, 1));//vind fart 5 dage
    vindRetning5Dage.push(vejrDataJson.daily[b].wind_deg);//Vind retning 5 dage
    solOp5Dage.push(new Date(solOp5DageUNIX[b - 1]).toISOString().slice(11,16)); //Sol op i timer og minutter
    solNed5Dage.push(new Date(solNed5DageUNIX[b - 1]).toISOString().slice(11,16)); //sol ned i timer og minutter
    weatherID5Dage.push(vejrDataJson.daily[b].weather[0].id);
    b++
  }
  //printData()
}

//Koordinater ud fra søgning
async function geoLokalitet(){
  geolok = 'https://eu1.locationiq.com/v1/search?key=pk.77fb17b877b39718edb9fbdc5047e6c3&q=' + byKode + '&format=json&accept-language=native'
  //console.log(geolok)
  
  responseGeoLok = await fetch(geolok);
  geoLokJson = await responseGeoLok.json();

  lat = geoLokJson[0].lat
  long = geoLokJson[0].lon
  //console.log(lat, long)
  
  //data5DageClear()
  positionNavn();
  //tidszone();
  //getVejrData();
}

//Navn ud fra koordinater
async function positionNavn(){
  //Position 
  lokalitet ='https://eu1.locationiq.com/v1/reverse?key=pk.77fb17b877b39718edb9fbdc5047e6c3&lat=' + lat + '&lon=' + long +'&format=json&accept-language=native&normalizeaddress=1'
  //console.log(lokalitet);

  ResponseLok = await fetch(lokalitet);
  lokalitetJson = await ResponseLok.json();
  //console.log(lokalitetJson)
   
  byLok = lokalitetJson.address.city;
  regionLok = lokalitetJson.address.state 
  landLok =  lokalitetJson.address.country;

  tidszone();
  //getVejrData();
}

//Tidszone ud fra koordinater
async function tidszone(){
  tidsZone = 'https://us1.locationiq.com/v1/timezone?key=pk.77fb17b877b39718edb9fbdc5047e6c3&lat=' + lat + '&lon=' + long + '&format=json';
  //console.log(tidsZone);

  ResponseTidzone = await fetch(tidsZone);
  tidzoneJson = await ResponseTidzone.json();
  //console.log(tidzoneJson);

  tidzoneNavn = tidzoneJson.timezone.name;
  if(tidzoneNavn == 'America/Nuuk'){
    tidzoneNavn = 'America/Miquelon'
  }
  getVejrData();
}

//Ved søgning skal data i alle 5 dages array slettes så nyt kan tilføjes
function data5DageClear(){
  temperaturMax5Dage.splice(0, 5); //Max temp 5dage
  temperaturMin5Dage.splice(0, 5); //Min temp 5 dage
  solOp5DageUNIX.splice(0, 5); //Sol op i UNIX 5 dage
  solNed5DageUNIX.splice(0, 5);//Sol ned i UNIX 5 dage
  regn5Dage.splice(0, 5); //Regn 5 dage
  vindFart5Dage.splice(0, 5);//vind fart 5 dage
  vindRetning5Dage.splice(0, 5);//Vind retning 5 dage
  solOp5Dage.splice(0, 5); //Sol op i timer og minutter
  solNed5Dage.splice(0, 5); //sol ned i timer og minutter
  weatherID5Dage.splice(0, 5);
}

//Console.log Datapunkter
function printData(){
  //Idag
  console.log('Temperatur nu:', temperaturNu + '°');
  console.log('Temperatur, max, min:', temperaturMaxIdag + '°/' + temperaturMinIdag + '°');
  console.log('Vind hastighed:', vindFartIdag + 'm/s');
  console.log('Vind retning:', vindRetningIdag + '°');
  
  console.log('Regn:', regnIdag + 'mm');
  console.log('SolOp:', solOpIdag);
  console.log('SolNed:', solNedIdag);
  console.log('UV:', UV);
  console.log('Synlighed:', synlighed + 'km');
  console.log('AdvarselCheck:', advarselCheck);
  console.log('Advarsel:', advarsel);
  
  //Jord temp
  console.log('Jordtemperatur 6cm:', jordTemperatur6cm);
  console.log('Jordtemperatur 18cm:', jordTemperatur18cm);
  console.log('Jordtemperatur 54cm:', jordTemperatur54cm);
  //Jord fugt
  console.log('Jordfugtighed 1-3cm:', jordFugtighed1_3cm);
  console.log('Jordfugtighed 3_9cm:', jordFugtighed3_9cm);
  console.log('Jordfugtighed 9_27cm:', jordFugtighed9_27cm);
  console.log('Jordfugtighed 27_81cm:', jordFugtighed27_81cm);
  
  //5 Dage
  console.log('Temp max 5 dage:', temperaturMax5Dage);
  console.log('Temp min 5 dage:', temperaturMin5Dage);
  console.log('Sol op 5 dage: ', solOp5Dage);
  console.log('Sol ned 5 dage:', solNed5Dage);
  console.log('Regn 5 dage:', regn5Dage);
  console.log('Vind fart 5 dage:', vindFart5Dage);
  console.log('Vind retning 5 dage:', vindRetning5Dage);
}