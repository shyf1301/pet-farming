var knightLevel;
var entries;
var refills;
var totalEntries;
var gemCostArray = [0,100,300,700,1500,2700,4300];
var petImages;
var maxFrags = 330;
var farmArray = [];
var tierList = [];
var petList = [];


function updatePetList() {
  knightLevel = parseInt($("#input-kl").val());
  entries = parseInt($("#input-entries").val());
  refills = parseInt($("#input-refills").val());
  localStorage.setItem("knightLevel",knightLevel);
  localStorage.setItem("entries",entries);
  localStorage.setItem("refills",refills);
  localStorage.setItem("petList", JSON.stringify(petList));
  localStorage.setItem("tierList", JSON.stringify(tierList));

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

function updateFrags(petIndex, frags, updateList) {
  petList[petIndex].fragments = parseInt(frags);  

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
    $(fragborder).css("border-color","#aaa"); 
    $(fragimage).css("opacity",1);
  } else {
    $(fragborder).css("border-color","#555");
    $(fragimage).css("opacity",0.2);
  }
  if(updateList) {
    updatePetList();
  }
}

function updateAllFrags() {
  for(i=0; i < petList.length; i++) {
    $($(".petinput input").get(i)).val(petList[i].fragments);
    updateFrags(i, petList[i].fragments, false);
  }
  updatePetList();
}

function farm() {
  totalEntries = entries + (refills * 5);
  var maxFarmFrags = maxFrags > 330 ? 330 : maxFrags;  
  var outputString = "<span style='font-size:12px; font-weight:bold; text-decoration:underline'>Fragments</span><br />";
  farmArray = [];
  $(petImages).css("filter","none");

  for(var i = 0; i < tierList.length; i++) {
    var addedFrags = 0;
    var pet = petList[getPetIndex(tierList[i])];
    if(pet.farm) {
      for(var j = 0; j < pet.reqs.length ; j++) {
        addedFrags += getFragments(pet.reqs[j], pet.fragments + addedFrags, maxFarmFrags);
      }

      if(addedFrags > 0) {
        farmArray.push([tierList[i],addedFrags]);
        outputString += "&nbsp;" + addedFrags + " &nbsp; " + pet.name + "<br />";  
      }
    }
  }
  outputString += "&nbsp;<br />&nbsp;" + totalEntries + " &nbsp; Entries left<br />"
  outputString += "<br /><button onclick='addFarmFrags()' style='margin-bottom:5px'>Add</button><br />"
  $("#farminglist").html(outputString);
  $("#farminglist").css("border","1px solid #555");
  updateDaysRemaining();
}

function getFragments(req, fragments, maxFarmFrags) {
  var kltest = knightLevel % 2 == 0 ? knightLevel + 1 : knightLevel;
  if(totalEntries > 0 && fragments < maxFarmFrags && req <= kltest){
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

function togglePet(petName) {
  if($("#tierlist-"+ petName + " input[type='checkbox']").prop('checked')) {
    petList[getPetIndex(petName)].farm = true;
    $("#tierlist-"+petName).removeClass("inactive");
  } else {
    petList[getPetIndex(petName)].farm = false;
    $("#tierlist-"+petName).addClass("inactive");
  }
  updatePetList();
}

function createTierList() {
  var htmlString = "";
  for(i = 0 ; i < tierList.length; i++) {
    var pet = petList[getPetIndex(tierList[i])];
    var checked = pet.farm ? "checked" : "";
    var inactive = pet.farm ? "" : " class='inactive'";
    htmlString += '<li id="tierlist-' + pet.name + '"' + inactive + '><img class="icon-16" src="files/img/' + pet.img + '.png"><span>' + 
                  tierList[i] + '</span><input type="checkbox" onchange="togglePet(\'' + pet.name + '\')"' + checked + 
                  '><input type="hidden" value="' + pet.name + '"></input></li>'
  }
  $("#tierlist ol").html(htmlString);
  var sortable = Sortable.create(document.getElementById('sortable'), {
    onEnd: function (evt) {
      updateTierList();
    }
  });
  /*$("#tierlist ol").sortable({
    group: 'no-drop',
    onDrop: function($item, container, _super) {
      $item.removeClass(container.group.options.draggedClass).removeAttr("style")
      $("body").removeClass(container.group.options.bodyClass)
      updateTierList();
    }
  });*/
}

function updateTierList() {
  tierList = [];
  $("#tierlist li input[type='hidden'").each(function (index, element) {
    tierList.push($(element).val());
  });
  updatePetList();
}

function resetTierList() {
  tierList = data.tierList;
  createTierList();
  updatePetList();
}

function updateDaysRemaining() {
  for(var i = 0; i < petList.length; i++) {
    var farmFrags = 0;
    for (var j=0; j < farmArray.length; j++) {
      if(farmArray[j][0] == petList[i].name) {
        farmFrags = Math.ceil((330 - petList[i].fragments) / farmArray[j][1]);
      }
    }
    var farmString = farmFrags > 0 ? "&nbsp;" + farmFrags + " days" : " &nbsp; ";
    $($(".petinput span").get(i)).html(farmString);
  }
}


$(document).ready(function(){
  knightLevel = parseInt(localStorage.getItem("knightLevel")) || 70;
  entries = parseInt(localStorage.getItem("entries")) || 10;
  refills = parseInt(localStorage.getItem("refills")) || 3;
  $("#input-kl").val(knightLevel);
  $("#input-entries").val(entries);
  $("#input-refills").val(refills);

  tierList = JSON.parse(localStorage.getItem("tierList")) || data.tierList;
  petList = JSON.parse(localStorage.getItem("petList")) || data.petList;

  //safeguard against bad data from old version
  if(!(petList[0].hasOwnProperty('img'))) {
    petList = data.petList;
  }
  for(i=0; i < petList.length; i++) {
    petList[i].name = petList[i].name.replace(" ", "-");
    tierList[i] = tierList[i].replace(" ", "-");
  }

  maxFrags = 331;
  updateAllFrags();

  createTierList();
});