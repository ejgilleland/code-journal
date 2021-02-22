var $profileForm = document.getElementById('profile');
var $avatarImg = document.getElementById('avatar-image');
var $containerList = document.querySelectorAll('.container');
var $entryForm = document.getElementById('new-entry');
var $entryImg = document.getElementById('entry-image');
var $entryList = document.querySelector('ol');
var $deleteModal = document.querySelector('.confirm');

$profileForm.addEventListener('input', function (event) {
  if (event.target.id === 'avatar') {
    $avatarImg.setAttribute('src', event.target.value);
  }
});

$entryForm.addEventListener('input', function (event) {
  if (event.target.id === 'photoUrl') {
    $entryImg.setAttribute('src', event.target.value);
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

$entryForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var entry = { photoUrl: null, title: null, notes: null };
  for (const property in entry) {
    entry[property] = $entryForm.elements[property].value;
  }
  entry.entryDate = Date.now();
  data.entries.unshift(entry);
  $entryList.prepend(journalBuilder(data.entries[0]));
  localStorage.setItem('data-profile', JSON.stringify(data));
  $entryForm.reset();
  $entryImg.setAttribute('src', './images/placeholder-image-square.jpg');
  viewSwapper('entries');
});

document.addEventListener('click', function (event) {
  if (event.target.nodeName.toLowerCase() === 'a') {
    if ((event.target.dataset.view === 'view-profile' && data.profile.username) ||
      (event.target.dataset.view === 'entries' && data.profile.username) ||
      (event.target.dataset.view === 'create-entry' && data.profile.username) ||
      event.target.dataset.view === 'edit-profile') {
      viewSwapper(event.target.dataset.view);
    } else if (event.target.className === 'delete') {
      $deleteModal.className = 'confirm';
      $deleteModal.dataset.entryDate = event.target.closest('li').dataset.entryDate;
    } else if (event.target.className === 'del-yes') {
      document.querySelector(`li[data-entry-date="${$deleteModal.dataset.entryDate}"]`).remove();
      for (let i = 0; i < data.entries.length; i++) {
        if (parseInt($deleteModal.dataset.entryDate, 10) === data.entries[i].entryDate) {
          data.entries.splice(i, 1);
          break;
        }
      }
      $deleteModal.dataset.entryDate = null;
      $deleteModal.className = 'confirm hidden';
      localStorage.setItem('data-profile', JSON.stringify(data));
    } else if (event.target.className === 'del-no') {
      $deleteModal.dataset.entryDate = null;
      $deleteModal.className = 'confirm hidden';
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
    for (let i = 0; i < data.entries.length; i++) {
      $entryList.appendChild(journalBuilder(data.entries[i]));
    }
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

function journalBuilder(entry) {
  var $postContainer = document.createElement('li');
  $postContainer.className = 'row';
  $postContainer.setAttribute('data-entry-date', entry.entryDate);
  var $postImgContainer = document.createElement('div');
  $postImgContainer.className = 'column-half image-container';
  var $postImg = document.createElement('img');
  $postImg.setAttribute('src', entry.photoUrl);
  var $postTextContainer = document.createElement('div');
  $postTextContainer.className = 'column-half';
  var $postHeader = document.createElement('h4');
  $postHeader.textContent = entry.title;
  var $postNotes = document.createElement('p');
  $postNotes.textContent = entry.notes;
  var $footer = document.createElement('div');
  $footer.className = 'column-full';
  var $delete = document.createElement('a');
  $delete.textContent = 'Delete';
  $delete.className = 'delete';

  $postContainer.append($postImgContainer, $postTextContainer, $footer);
  $postImgContainer.appendChild($postImg);
  $postTextContainer.append($postHeader, $postNotes);
  $footer.appendChild($delete);
  return $postContainer;
}

window.addEventListener('beforeunload', function (event) {
  localStorage.setItem('data-profile', JSON.stringify(data));
});
