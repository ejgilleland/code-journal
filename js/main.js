var $profileForm = document.getElementById('profile');

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
  document.querySelector('img').setAttribute('src', './images/placeholder-image-square.jpg');
});
