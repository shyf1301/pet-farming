var knightLevel;
var entries;
var refills;
var totalEntries;
var gemCostArray = [0,100,300,700,1500,2700,4300];
var petImages;
var farmArray = [];
var maxFrags = 330;

var petList =  [
                  {name:"Mambo",      fragments:180,	 farm:true,  reqs:[2,3,13,104]},
                  {name:"Joe",        fragments:10,		 farm:false, reqs:[4,5,17,106]},
                  {name:"Mummy",      fragments:10,		 farm:false, reqs:[6,7,21,108]},
                  {name:"Piggy",      fragments:10,		 farm:false, reqs:[8,9,25,110]},
                  {name:"Potang",     fragments:10,		 farm:false, reqs:[10,11,29,112]},
                  {name:"Uni",        fragments:10,		 farm:false, reqs:[12,15,33,114]},
                  {name:"Joker",      fragments:10,		 farm:false, reqs:[14,19,37,116]},
                  {name:"Snork",      fragments:10,		 farm:true,  reqs:[16,23,41,118]},
                  {name:"Phoenic",    fragments:10,		 farm:true,  reqs:[18,27,45,120]},
                  {name:"Indy",       fragments:10,		 farm:true,  reqs:[20,31,49,122]},
                  {name:"Grim",       fragments:10,		 farm:false, reqs:[22,35,53,124]},
                  {name:"Woola",      fragments:10,		 farm:false, reqs:[24,39,57,126]},
                  {name:"Lamp",       fragments:10,		 farm:true,  reqs:[26,43,61,128]},
                  {name:"Tinkey",     fragments:80,		 farm:true,  reqs:[28,47,65,130]},
                  {name:"Sleepy",     fragments:10,		 farm:true,  reqs:[30,51,69,132]},
                  {name:"Totem",      fragments:10,		 farm:true,  reqs:[32,55,73,134]},
                  {name:"Icy",        fragments:50,		 farm:true,  reqs:[34,59,77,136]},
                  {name:"Squirrel",   fragments:10,		 farm:true,  reqs:[36,63,81,138]},
                  {name:"Moon",       fragments:30,		 farm:true,  reqs:[38,67,85,140]},
                  {name:"Boom",       fragments:10,		 farm:true,  reqs:[40,71,89,142]},
                  {name:"Leo",        fragments:10,		 farm:false, reqs:[42,75,93,144]},
                  {name:"Devil",      fragments:10,		 farm:true,  reqs:[44,79,97,146]},
                  {name:"Griffy",     fragments:10,		 farm:false, reqs:[46,83,101,148]},
                  {name:"Mir",        fragments:10,		 farm:true,  reqs:[48,87,105,150]},
                  {name:"Nimbus",     fragments:0,		 farm:true,  reqs:[50,91,109,152]},
                  {name:"Jingger",    fragments:0,		 farm:true,  reqs:[52,95,113,154]},
                  {name:"Rapty",      fragments:0,		 farm:true,  reqs:[54,99,117,156]},
                  {name:"Winky",      fragments:0,		 farm:true,  reqs:[56,103,121,158]},
                  {name:"Bunny",      fragments:0,		 farm:true,  reqs:[58,107,125,160]},
                  {name:"Cora",       fragments:0,		 farm:true,  reqs:[60,111,129,162]},
                  {name:"Wakong",     fragments:0,		 farm:true,  reqs:[62,115,133,164]},
                  {name:"E-77",       fragments:0,		 farm:true,  reqs:[64,119,137,166]},
                  {name:"Windy",      fragments:0,		 farm:true,  reqs:[66,123,141,168]},
                  {name:"Dark Snake", fragments:0,		 farm:true,  reqs:[68,127,145,170]},
                  {name:"Seahorse",   fragments:0,		 farm:true,  reqs:[70,131,149,172]},
                  {name:"Sarah",      fragments:0,		 farm:true,  reqs:[72,135,153,174]},
                  {name:"Oscar",      fragments:0,		 farm:true,  reqs:[74,139,157,176]},
                  {name:"Black",      fragments:0,		 farm:true,  reqs:[76,143,161,178]},
                  {name:"Juda",       fragments:0,		 farm:true,  reqs:[78,147,165,180]},
                  {name:"Rena",       fragments:0,		 farm:true,  reqs:[80,151,169,182]},
                  {name:"Hippong",    fragments:0,		 farm:true,  reqs:[82,155,173,184]},
                  {name:"Osma",       fragments:0,		 farm:true,  reqs:[84,159,177,186]},
                  {name:"Saul",       fragments:0,		 farm:true,  reqs:[86,163,181,188]},
                  {name:"Bernard",    fragments:0,		 farm:true,  reqs:[88,167,185,190]},
                  {name:"ChiChi",     fragments:0,		 farm:true,  reqs:[90,171,189,192]},
                  {name:"Chesher",    fragments:0,		 farm:true,  reqs:[92,175,193,194]},
                  {name:"Bamba",      fragments:0,		 farm:true,  reqs:[94,179,197,196]},
                  {name:"Cat Knight", fragments:0,		 farm:true,  reqs:[96,183]},
                  {name:"Mori",       fragments:0,		 farm:true,  reqs:[98,187]},
                  {name:"Cerbero",    fragments:0,		 farm:true,  reqs:[100,191]},
                  {name:"Octopa",     fragments:0,		 farm:true,  reqs:[102,195]},
                ];

//var tierList = [40,13,16,46,19,30,34,35,18,9,31,32,33,27,28,29,47,48,49,50,41,42,39,43,44,45,0,12,15,14,25,36,24,23,17,8,21,7,3,26,37,38,1,2,4,5,6,10,11,20,22];
var tierList = [
                "Hippong",
                "Tinkey",
                "Icy",
                "Bamba",
                "Boom",
                "Wakong",
                "Seahorse",
                "Sarah",
                "Moon",
                "Octopa",
                "Cat Knight",
                "Cerbero",
                "Mori",
                "E-77",
                "Dark Snake",
                "Windy",
                "Winky",
                "Cora",
                "Bunny",
                "Osma",
                "Saul",
                "Rena",
                "Bernard",
                "ChiChi",
                "Chesher",
                "Mambo",
                "Totem",
                "Lamp",
                "Sleepy",
                "Jingger",
                "Oscar",
                "Nimbus",
                "Mir",
                "Squirrel",
                "Phoenic",
                "Devil",
                "Indy",
                "Snork",
                "Piggy",
                "Rapty",
                "Black",
                "Juda",
                "Joe",
                "Mummy",
                "Potang",
                "Uni",
                "Joker",
                "Grim",
                "Woola",
                "Leo",
                "Griffy",
               ];
function updatePetList() {
  knightLevel = parseInt($("#input-kl").val());
  entries = parseInt($("#input-entries").val());
  refills = parseInt($("#input-refills").val());
  //localStorage.setItem("knightLevel",knightLevel);
  //localStorage.setItem("entries",entries);
  //localStorage.setItem("refills",refills);

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

  for(var i = 0; i < petList.length; i++) {
    if(petList[i].fragments >= maxFrags ){
      for(var j = 0; j < petList[i].reqs.length; j++) {
        $(petImages.get((petList[i].reqs[j])-2)).css("opacity",0.2);
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
  petList[petIndex].fragments = parseInt(frags);
  //localStorage.setItem("petList", JSON.stringify(petList));

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
  for(i=0; i < petList.length; i++) {
    $($(".petinput input").get(i)).val(petList[i].fragments);
    updateFrags(i, petList[i].fragments);
  }
}

function farm() {
  totalEntries = entries + (refills * 5);
  var maxFarmFrags = maxFrags > 330 ? 330 : maxFrags;  
  var outputString = "<span style='font-size:12px; font-weight:bold; text-decoration:underline'>Fragments</span><br />";
  farmArray = [];
  $(petImages).css("filter","none");

  for(var i = 0; i < 51; i++) {
    var addedFrags = 0;
    var pet = petList[getPetIndex(tierList[i])];
    
    for(var j = 0; j < pet.reqs.length ; j++) {
      addedFrags += getFragments(pet.reqs[j], pet.fragments + addedFrags, maxFarmFrags);
    }
    

    if(addedFrags > 0) {
      farmArray.push([tierList[i],addedFrags]);
      outputString += "&nbsp;" + addedFrags + " &nbsp; " + pet.name + "<br />";  
    }
  }
  outputString += "&nbsp;<br />&nbsp;" + totalEntries + " &nbsp; Entries left<br />"
  outputString += "<br /><button onclick='addFarmFrags()' style='margin-bottom:5px'>Add</button><br />"
  $("#farminglist").html(outputString);
  $("#farminglist").css("border","1px solid #555");
}

function getFragments(req, fragments, maxFarmFrags) {
  if(totalEntries > 0 && fragments < maxFarmFrags && req <= knightLevel){
    if(req % 2 == 0) {
      $(petImages.get(req-2)).css("filter","drop-shadow(1px 1px 5px rgba(30,220,30,1)");
      totalEntries--;
      return 1; 
    } else {
      $(petImages.get(req-2)).css("filter","drop-shadow(1px 1px 5px rgba(30,220,30,1)");
      var addedFrags = 0;
      while(totalEntries > 0 && addedFrags < 3 && (addedFrags + fragments) < maxFarmFrags) {
        totalEntries--;
        addedFrags++;
      }
      return addedFrags;
    }
  } else {
    return 0;
  }
}
function addFarmFrags() {
  for(var i = 0; i < farmArray.length; i++) {
    petList[getPetIndex(farmArray[i][0])].fragments += farmArray[i][1];
  }

  updateAllFrags();
}

function getPetIndex(petName) {
  for (var i=0; i < petList.length; i++) {
    if (petList[i].name == petName) return i;
  }
}
$(document).ready(function(){
  knightLevel = parseInt(localStorage.getItem("knightLevel")) || 70;
  entries = parseInt(localStorage.getItem("entries")) || 10;
  refills = parseInt(localStorage.getItem("refills")) || 3;
  $("#input-kl").val(knightLevel);
  $("#input-entries").val(entries);
  $("#input-refills").val(refills);

  petList = JSON.parse(localStorage.getItem("petList")) || petList;
  maxFrags = 331;
  updateAllFrags();
  
});