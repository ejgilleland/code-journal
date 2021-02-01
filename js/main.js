var $profileForm = document.getElementById('profile');

$profileForm.addEventListener('input', function (event) {
  if (event.target.id === 'avatar') {
    document.querySelector('img').setAttribute('src', event.target.value);
  }
});
