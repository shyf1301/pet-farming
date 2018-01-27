var knightLevel;
var entries;
var refills;
var gemCostArray = [0,100,300,700,1500,2700,4300];
var petImages;
var farmArray = [];
var maxFrags = 330;

var petArray =  [
                  {name:"Mambo",      fragments:180,  req:[2,3,13,104]},
                  {name:"Joe",        fragments:10,	req:[4,5,17,106]},
                  {name:"Mummy",      fragments:10,	req:[6,7,21,108]},
                  {name:"Piggy",      fragments:10,	req:[8,9,25,110]},
                  {name:"Potang",     fragments:10,	req:[10,11,29,112]},
                  {name:"Uni",        fragments:10,	req:[12,15,33,114]},
                  {name:"Joker",      fragments:10,	req:[14,19,37,116]},
                  {name:"Snork",      fragments:10,	req:[16,23,41,118]},
                  {name:"Phoenic",    fragments:10,	req:[18,27,45,120]},
                  {name:"Indy",       fragments:10,	req:[20,31,49,122]},
                  {name:"Grim",       fragments:10,	req:[22,35,53,124]},
                  {name:"Woola",      fragments:10,	req:[24,39,57,126]},
                  {name:"Lamp",       fragments:10,	req:[26,43,61,128]},
                  {name:"Tinkey",     fragments:80,	req:[28,47,65,130]},
                  {name:"Sleepy",     fragments:10,	req:[30,51,69,132]},
                  {name:"Totem",      fragments:10,	req:[32,55,73,134]},
                  {name:"Icy",        fragments:50,	req:[34,59,77,136]},
                  {name:"Squirrel",   fragments:10,	req:[36,63,81,138]},
                  {name:"Moon",       fragments:30,	req:[38,67,85,140]},
                  {name:"Boom",       fragments:0,	req:[40,71,89,142]},
                  {name:"Leo",        fragments:0,	req:[42,75,93,144]},
                  {name:"Devil",      fragments:0,	req:[44,79,97,146]},
                  {name:"Griffy",     fragments:0,	req:[46,83,101,148]},
                  {name:"Mir",        fragments:0,	req:[48,87,105,150]},
                  {name:"Nimbus",     fragments:0,	req:[50,91,109,152]},
                  {name:"Jingger",    fragments:0,	req:[52,95,113,154]},
                  {name:"Rapty",      fragments:0,	req:[54,99,117,156]},
                  {name:"Winky",      fragments:0,	req:[56,103,121,158]},
                  {name:"Bunny",      fragments:0,	req:[58,107,125,160]},
                  {name:"Cora",       fragments:0,	req:[60,111,129,162]},
                  {name:"Wakong",     fragments:0,	req:[62,115,133,164]},
                  {name:"E-77",       fragments:0,	req:[64,119,137,166]},
                  {name:"Windy",      fragments:0,	req:[66,123,141,168]},
                  {name:"Dark Snake", fragments:0,	req:[68,127,145,170]},
                  {name:"Seahorse",   fragments:0,	req:[70,131,149,172]},
                  {name:"Sarah",      fragments:0,	req:[72,135,153,174]},
                  {name:"Oscar",      fragments:0,	req:[74,139,157,176]},
                  {name:"Black",      fragments:0,	req:[76,143,161,178]},
                  {name:"Juda",       fragments:0,	req:[78,147,165,180]},
                  {name:"Rena",       fragments:0,	req:[80,151,169,182]},
                  {name:"Hippong",    fragments:0,	req:[82,155,173,184]},
                  {name:"Osma",       fragments:0,	req:[84,159,177,186]},
                  {name:"Saul",       fragments:0,	req:[86,163,181,188]},
                  {name:"Bernard",    fragments:0,	req:[88,167,185,190]},
                  {name:"ChiChi",     fragments:0,	req:[90,171,189,192]},
                  {name:"Chesher",    fragments:0,	req:[92,175,193,194]},
                  {name:"Bamba",      fragments:0,	req:[94,179,197,196]},
                  {name:"Cat Knight", fragments:0,	req:[96,183]},
                  {name:"Mori",       fragments:0,	req:[98,187]},
                  {name:"Cerbero",    fragments:0,	req:[100,191]},
                  {name:"Octopa",     fragments:0,	req:[102,195]},
                ];

var tierListArray = [40,13,16,46,19,30,34,35,18,9,31,32,33,27,28,29,47,48,49,50,41,42,39,43,44,45,0,12,15,14,25,36,24,23,17,8,21,7,3,26,37,38,1,2,4,5,6,10,11,20,22];

function updatePetList() {
  knightLevel = parseInt($("#input-kl").val());
  entries = parseInt($("#input-entries").val());
  refills = parseInt($("#input-refills").val());
  localStorage.setItem("knightLevel",knightLevel);
  localStorage.setItem("entries",entries);
  localStorage.setItem("refills",refills);

  $("#shgemcost").html(gemCostArray[refills]);  

  var klindex = knightLevel - (knightLevel % 2 + 1);
  petImages = $(".petimage img");
  $("#farminglist").html("");
  $("#farminglist").css("border","none");

  petImages.each( function (index, element) {
    if(index > klindex) {
      $( this ).css("opacity",0.2);
    } else {
      $( this ).css("opacity",1);
    }
  });

  for(var i = 0; i < petArray.length; i++) {
    if(petArray[i].fragments >= maxFrags ){
      for(var j = 0; j < petArray[i].req.length; j++) {
        $(petImages.get((petArray[i].req[j])-2)).css("opacity",0.2);
      }
    }
  }
  farm();
}

function belowStarLevel(frags) {    
  maxFrags = frags;
  updatePetList();
}

function updateFrags(petIndex, frags) {
  petArray[petIndex].fragments = parseInt(frags);
  localStorage.setItem("petArray", JSON.stringify(petArray));

  var fragborder = $(".fragimage").get(petIndex);
  var fragimage = $(".fragimage img").get(petIndex);
  if(frags >= 330) {
    $(fragborder).css("border-color","#ee0000");
    $(fragimage).css("opacity",1);
  } else if (frags >= 180) {
    $(fragborder).css("border-color","#8822cc");
    $(fragimage).css("opacity",1);
  } else if (frags >= 80) {
    $(fragborder).css("border-color","#0000ee");
    $(fragimage).css("opacity",1);
  } else if (frags >= 30) {
    $(fragborder).css("border-color","#22aa22");
    $(fragimage).css("opacity",1);
  } else if (frags >= 10) {
    $(fragborder).css("border-color","#555555"); 
    $(fragimage).css("opacity",1);
  } else {
    $(fragborder).css("border-color","#222");
    $(fragimage).css("opacity",0.5);
  }
  updatePetList();
}

function updateAllFrags() {
  for(i=0; i < petArray.length; i++) {
    $($(".petinput input").get(i)).val(petArray[i].fragments);
    updateFrags(i, petArray[i].fragments);
  }
}

function farm() {
  var totalEntries = entries + (refills * 5);
  var maxFarmFrags = maxFrags > 330 ? 330 : maxFrags;  
  var outputString = "<span style='font-size:12px; font-weight:bold; text-decoration:underline'>Fragments</span><br />";
  farmArray = [];
  $(petImages).css("filter","none");

  for(var i = 0; i < tierListArray.length; i++) {
    var addedFrags = 0;
    if(totalEntries > 0 && petArray[tierListArray[i]].fragments < maxFarmFrags && petArray[tierListArray[i]].req[0] <= knightLevel){
      addedFrags += 1;
      totalEntries -=1;
      $(petImages.get((petArray[tierListArray[i]].req[0])-2)).css("filter","drop-shadow(1px 1px 5px rgba(30,220,30,1)");
    
      if(totalEntries > 0 && petArray[tierListArray[i]].fragments < (maxFarmFrags - addedFrags) && petArray[tierListArray[i]].req[1] - 1 <= knightLevel){
        addedFrags += 1;
        totalEntries -=1;
        $(petImages.get((petArray[tierListArray[i]].req[1])-2)).css("filter","drop-shadow(1px 1px 5px rgba(30,220,30,1)");
        if(totalEntries > 0 && petArray[tierListArray[i]].fragments < (maxFarmFrags - addedFrags)) {
          addedFrags += 1;
          totalEntries -=1;
        }
        if(totalEntries > 0 && petArray[tierListArray[i]].fragments < (maxFarmFrags - addedFrags)) {
          addedFrags += 1;
          totalEntries -=1;
        }
      
        if(totalEntries > 0 && petArray[tierListArray[i]].fragments < (maxFarmFrags - addedFrags) && petArray[tierListArray[i]].req[2] - 1 <= knightLevel){
          addedFrags += 1;
          totalEntries -=1;
          $(petImages.get((petArray[tierListArray[i]].req[2])-2)).css("filter","drop-shadow(1px 1px 5px rgba(30,220,30,1)");
          if(totalEntries > 0 && petArray[tierListArray[i]].fragments < (maxFarmFrags - addedFrags)) {
            addedFrags += 1;
            totalEntries -=1;
          }
          if(totalEntries > 0 && petArray[tierListArray[i]].fragments < (maxFarmFrags - addedFrags)) {
            addedFrags += 1;
            totalEntries -=1;
          }
          if(totalEntries > 0 && petArray[tierListArray[i]].fragments < maxFarmFrags && petArray[tierListArray[i]].req[3] <= knightLevel){
            addedFrags += 1;
            totalEntries -=1;
            $(petImages.get((petArray[tierListArray[i]].req[3])-2)).css("filter","drop-shadow(1px 1px 5px rgba(30,220,30,1)");
          }
        }
      }
      farmArray.push([tierListArray[i],addedFrags]);
      outputString += "&nbsp;" + addedFrags + " &nbsp; " + petArray[tierListArray[i]].name + "<br />";
    }    
  }

  outputString += "<br /><button onclick='addFarmFrags()' style='margin-bottom:5px'>Add</button><br />"
  $("#farminglist").html(outputString);
  $("#farminglist").css("border","1px solid #555");
}

function addFarmFrags() {
  for(var i = 0; i < farmArray.length; i++) {
    petArray[farmArray[i][0]].fragments += farmArray[i][1];
  }

  updateAllFrags();
}

$(document).ready(function(){
  knightLevel = parseInt(localStorage.getItem("knightLevel")) || 100;
  entries = parseInt(localStorage.getItem("entries")) || 10;
  refills = parseInt(localStorage.getItem("refills")) || 3;
  $("#input-kl").val(knightLevel);
  $("#input-entries").val(entries);
  $("#input-refills").val(refills);

  petArray = JSON.parse(localStorage.getItem("petArray")) || petArray;
  maxFrags = 331;
  updateAllFrags();
  
});