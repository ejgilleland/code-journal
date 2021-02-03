var $profileForm = document.getElementById('profile');
var $avatarImg = document.querySelector('img');

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
  localStorage.setItem('data-profile', JSON.stringify(data.profile));
  $profileForm.reset();
  $avatarImg.setAttribute('src', './images/placeholder-image-square.jpg');
});

function profileRender() {
  var $container = document.createElement('div');
  $container.className = 'container';
  $container.setAttribute('data-view', 'view-profile');
  var $header = document.createElement('h1');
  $header.textContent = data.profile.fullName;
  var $row = document.createElement('div');
  $row.className = 'row';
  var $imgContainer = document.createElement('div');
  $imgContainer.className = 'column-half image-container';
  var $newAvatar = document.createElement('img');
  $newAvatar.setAttribute('src', data.profile.avatarUrl);
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
  $locationIcon.className = 'fas fa-map=marker-alt';
  var $bio = document.createElement('p');
  $bio.textContent = data.profile.bio;

  $container.append($header, $row);
  $row.append($imgContainer, $textContainer);
  $imgContainer.appendChild($newAvatar);
  $textContainer.append($usernameHeader, $locationHeader, $bio);
  $usernameHeader.appendChild($personIconSpan);
  $personIconSpan.appendChild($personIcon);
  $usernameHeader.textContent = data.profile.username;
  $locationHeader.appendChild($locationIconSpan);
  $locationIconSpan.appendChild($locationIcon);
  $locationHeader.textContent = data.profile.location;
  return $container;
}

document.querySelector('body').appendChild(profileRender());
