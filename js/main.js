var $profileForm = document.getElementById('profile');
var $avatarImg = document.querySelector('img');
var $containerList = document.querySelectorAll('.container');

$profileForm.addEventListener('input', function (event) {
  if (event.target.id === 'avatar') {
    document.querySelector('img').setAttribute('src', event.target.value);
  }
});

$profileForm.addEventListener('submit', function (event) {
  event.preventDefault();
  for (const property in data.profile) {
    data.profile[property] = $profileForm.elements[property].value;
  }
  viewSwapper('view-profile');
  localStorage.setItem('data-profile', JSON.stringify(data));
  $profileForm.reset();
  $avatarImg.setAttribute('src', './images/placeholder-image-square.jpg');
});

document.addEventListener('click', function (event) {
  if (event.target.nodeName.toLowerCase() === 'a') {
    if ((event.target.dataset.view === 'view-profile' && data.profile.username) ||
      event.target.dataset.view === 'edit-profile') {
      viewSwapper(event.target.dataset.view);
    }
  }
});

function profileRender(dataProfile) {
  var $mainDiv = document.createElement('div');
  var $header = document.createElement('h1');
  $header.textContent = dataProfile.fullName;
  var $row = document.createElement('div');
  $row.className = 'row';
  var $imgContainer = document.createElement('div');
  $imgContainer.className = 'column-half image-container';
  var $newAvatar = document.createElement('img');
  $newAvatar.setAttribute('src', dataProfile.avatarUrl);
  var $textContainer = document.createElement('div');
  $textContainer.className = 'column-half';
  var $usernameHeader = document.createElement('h4');
  var $personIconSpan = document.createElement('span');
  $personIconSpan.className = 'icon';
  var $personIcon = document.createElement('i');
  $personIcon.className = 'fas fa-user';
  var $locationHeader = document.createElement('h4');
  var $locationIconSpan = document.createElement('span');
  $locationIconSpan.className = 'icon';
  var $locationIcon = document.createElement('i');
  $locationIcon.className = 'fas fa-map-marker-alt';
  var $bio = document.createElement('p');
  $bio.textContent = dataProfile.bio;
  var $editLink = document.createElement('a');
  $editLink.setAttribute('href', '#');
  $editLink.setAttribute('data-view', 'edit-profile');
  $editLink.className = 'edit';
  $editLink.textContent = 'EDIT';

  $mainDiv.append($header, $row);
  $row.append($imgContainer, $textContainer);
  $imgContainer.appendChild($newAvatar);
  $textContainer.append($usernameHeader, $locationHeader, $bio, $editLink);
  $usernameHeader.append($personIconSpan, dataProfile.username);
  $personIconSpan.appendChild($personIcon);
  $locationHeader.append($locationIconSpan, dataProfile.location);
  $locationIconSpan.appendChild($locationIcon);
  return $mainDiv;
}

function viewSwapper(dataView) {
  for (let i = 0; i < $containerList.length; i++) {
    if ($containerList[i].dataset.view === dataView) {
      $containerList[i].className = 'container';
      data.view = $containerList[i].dataset.view;
    } else {
      $containerList[i].className = 'container hidden';
    }
    if ($containerList[i].dataset.view === 'view-profile') {
      $containerList[i].innerHTML = '';
      $containerList[i].appendChild((profileRender(data.profile)));
    } else if ($containerList[i].dataset.view === 'edit-profile' && !!data.profile.username) {
      for (const property in data.profile) {
        $profileForm.elements[property].value = data.profile[property];
        $avatarImg.setAttribute('src', data.profile.avatarUrl);
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', function (event) {
  if (localStorage['data-profile']) {
    var localProfileJSON = localStorage.getItem('data-profile');
    var localProfile = JSON.parse(localProfileJSON);
    data = localProfile;
  }
  if (!data.profile.username) {
    for (let i = 0; i < $containerList.length; i++) {
      if ($containerList[i].dataset.view === 'edit-profile') {
        $containerList[i].className = 'container';
      } else {
        $containerList[i].className = 'container hidden';
      }
    }
  } else { viewSwapper('view-profile'); }
});
