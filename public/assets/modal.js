// Get the modal
const modal = document.getElementById('mod');

// Get the buttons that opens the modal
const btn1 = document.getElementsByClassName('sign-up')[0];
const btn2 = document.getElementsByClassName('sign-up')[1];

// Get the <span> element that closes the modal
const span = document.getElementsByClassName('close-button')[0];

// When the user clicks the button, open the modal
btn1.onclick = function () {
  modal.style.display = 'flex';
};

btn2.onclick = function () {
  modal.style.display = 'flex';
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};
