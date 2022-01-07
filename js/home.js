var logOut = document.getElementById('log-out');
var welcome = document.getElementById('welcome');

if (localStorage.getItem('userName')) {
  welcome.textContent = `welcome ${localStorage.getItem('userName')}`;
} else {
  window.location.replace('index.html');
}

logOut.addEventListener('click', function () {
  localStorage.removeItem('userName');
  window.location.replace('index.html');
});
