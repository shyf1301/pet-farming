let knightLevel;
let entries;
let refills;
let totalEntries;
const gemCostArray = [0, 100, 300, 700, 1500, 2700, 4300];
let petImages;
let maxFrags = 330;
let farmArray = [];
let tierList = [];
let petList = [];

function updatePetList() {
  knightLevel = parseInt($('#input-kl').val(), 10);
  entries = parseInt($('#input-entries').val(), 10);
  refills = parseInt($('#input-refills').val(), 10);
  localStorage.setItem('knightLevel', knightLevel);
  localStorage.setItem('entries', entries);
  localStorage.setItem('refills', refills);
  localStorage.setItem('petList', JSON.stringify(petList));
  localStorage.setItem('tierList', JSON.stringify(tierList));

  $('#shgemcost').html(gemCostArray[refills]);

  const klindex = knightLevel - (knightLevel % 2 + 1);
  petImages = $('.petimage img');
  $('#farminglist').html('');
  $('#farminglist').css('border', 'none');

  petImages.each(function setOpacity(index) {
    if (index > klindex) {
      $(this).css('opacity', 0.2);
    } else {
      $(this).css('opacity', 1);
    }
  });

  for (let i = 0; i < petList.length; i++) {
    if (petList[i].fragments >= maxFrags) {
      for (let j = 0; j < petList[i].reqs.length; j++) {
        $(petImages.get(petList[i].reqs[j] - 2)).css('opacity', 0.2);
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

  const fragborder = $('.fragimage').get(petIndex);
  const fragimage = $('.fragimage img').get(petIndex);
  if (frags >= 330) {
    $(fragborder).css('border-color', '#ee0000');
    $(fragimage).css('opacity', 1);
  } else if (frags >= 180) {
    $(fragborder).css('border-color', '#8822cc');
    $(fragimage).css('opacity', 1);
  } else if (frags >= 80) {
    $(fragborder).css('border-color', '#0000ee');
    $(fragimage).css('opacity', 1);
  } else if (frags >= 30) {
    $(fragborder).css('border-color', '#22aa22');
    $(fragimage).css('opacity', 1);
  } else if (frags >= 10) {
    $(fragborder).css('border-color', '#aaa');
    $(fragimage).css('opacity', 1);
  } else {
    $(fragborder).css('border-color', '#555');
    $(fragimage).css('opacity', 0.2);
  }
  if (updateList) {
    updatePetList();
  }
}

function updateAllFrags() {
  for (let i = 0; i < petList.length; i++) {
    $($('.petinput input').get(i)).val(petList[i].fragments);
    updateFrags(i, petList[i].fragments, false);
  }
  updatePetList();
}

function farm() {
  totalEntries = entries + refills * 5;
  const maxFarmFrags = maxFrags > 330 ? 330 : maxFrags;
  let outputString = "<span style='font-size:12px; font-weight:bold; text-decoration:underline'>Fragments</span><br />";
  farmArray = [];
  $(petImages).css('filter', 'none');

  for (let i = 0; i < tierList.length; i++) {
    let addedFrags = 0;
    const pet = petList[getPetIndex(tierList[i])];
    if (pet.farm) {
      for (let j = 0; j < pet.reqs.length; j++) {
        addedFrags += getFragments(pet.reqs[j], pet.fragments + addedFrags, maxFarmFrags);
      }

      if (addedFrags > 0) {
        farmArray.push([tierList[i], addedFrags]);
        outputString += `&nbsp;${addedFrags} &nbsp; ${pet.name}<br />`;
      }
    }
  }
  outputString += `&nbsp;<br />&nbsp;${totalEntries} &nbsp; Entries left<br />`;
  outputString += "<br /><button onclick='addFarmFrags()' style='margin-bottom:5px'>Add</button><br />";
  $('#farminglist').html(outputString);
  $('#farminglist').css('border', '1px solid #555');
  updateDaysRemaining();
}

function getFragments(req, fragments, maxFarmFrags) {
  const kltest = knightLevel % 2 === 0 ? knightLevel + 1 : knightLevel;
  if (totalEntries > 0 && fragments < maxFarmFrags && req <= kltest) {
    if (req % 2 === 0) {
      $(petImages.get(req - 2)).css('filter', 'drop-shadow(1px 1px 5px rgba(30,220,30,1)');
      totalEntries--;
      return 1;
    }
    $(petImages.get(req - 2)).css('filter', 'drop-shadow(1px 1px 5px rgba(30,220,30,1)');
    let addedFrags = 0;
    while (totalEntries > 0 && addedFrags < 3 && addedFrags + fragments < maxFarmFrags) {
      totalEntries--;
      addedFrags++;
    }
    return addedFrags;
  }
  return 0;
}
function addFarmFrags() {
  for (let i = 0; i < farmArray.length; i++) {
    petList[getPetIndex(farmArray[i][0])].fragments += farmArray[i][1];
  }

  updateAllFrags();
}

function getPetIndex(petName) {
  for (let i = 0; i < petList.length; i++) {
    if (petList[i].name === petName) return i;
  }
  return 0;
}

function togglePet(petName) {
  if ($(`#tierlist-${petName} input[type='checkbox']`).prop('checked')) {
    petList[getPetIndex(petName)].farm = true;
    $(`#tierlist-${petName}`).removeClass('inactive');
  } else {
    petList[getPetIndex(petName)].farm = false;
    $(`#tierlist-${petName}`).addClass('inactive');
  }
  updatePetList();
}

function createTierList() {
  let htmlString = '';
  for (let i = 0; i < tierList.length; i++) {
    const pet = petList[getPetIndex(tierList[i])];
    const checked = pet.farm ? 'checked' : '';
    const inactive = pet.farm ? '' : " class='inactive'";
    htmlString += `<li id="tierlist-${pet.name}"${inactive}><img class="icon-16" src="files/img/${pet.img}.png"><span>${
      tierList[i]
    }</span><input type="checkbox" onchange="togglePet('${pet.name}')"${checked}><input type="hidden" value="${
      pet.name
    }"></input></li>`;
  }
  $('#tierlist ol').html(htmlString);
  // eslint-disable-next-line no-undef
  const sortable = Sortable.create(document.getElementById('sortable'), {
    onEnd(evt) {
      updateTierList();
    },
  });
  /* $("#tierlist ol").sortable({
    group: 'no-drop',
    onDrop: function($item, container, _super) {
      $item.removeClass(container.group.options.draggedClass).removeAttr("style")
      $("body").removeClass(container.group.options.bodyClass)
      updateTierList();
    }
  }); */
}

function updateTierList() {
  tierList = [];
  $("#tierlist li input[type='hidden'").each((index, element) => {
    tierList.push($(element).val());
  });
  updatePetList();
}

function resetTierList() {
  // eslint-disable-next-line no-undef
  tierList = data.tierList;
  createTierList();
  updatePetList();
}

function updateDaysRemaining() {
  for (let i = 0; i < petList.length; i++) {
    let farmFrags = 0;
    for (let j = 0; j < farmArray.length; j++) {
      if (farmArray[j][0] === petList[i].name) {
        farmFrags = Math.ceil((330 - petList[i].fragments) / farmArray[j][1]);
      }
    }
    const farmString = farmFrags > 0 ? `&nbsp;${farmFrags} days` : ' &nbsp; ';
    $($('.petinput span').get(i)).html(farmString);
  }
}

$(document).ready(() => {
  knightLevel = parseInt(localStorage.getItem('knightLevel')) || 70;
  entries = parseInt(localStorage.getItem('entries')) || 10;
  refills = parseInt(localStorage.getItem('refills')) || 3;
  $('#input-kl').val(knightLevel);
  $('#input-entries').val(entries);
  $('#input-refills').val(refills);

  // eslint-disable-next-line no-undef
  tierList = JSON.parse(localStorage.getItem('tierList')) || data.tierList;
  // eslint-disable-next-line no-undef
  petList = JSON.parse(localStorage.getItem('petList')) || data.petList;

  // safeguard against bad data from old version
  if (!petList[0].hasOwnProperty('img')) {
    // eslint-disable-next-line no-undef
    petList = data.petList;
  }
  for (let i = 0; i < petList.length; i++) {
    petList[i].name = petList[i].name.replace(' ', '-');
    tierList[i] = tierList[i].replace(' ', '-');
  }

  maxFrags = 331;
  updateAllFrags();

  createTierList();
});
