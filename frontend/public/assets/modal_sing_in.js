// Get the modal
const modal = document.getElementById('modal-sign-in');
// Get the modal form
const modalForm = document.getElementById('myModal');

// Get the buttons that opens the modal
const btn1 = document.getElementsByClassName('sign-up')[0];
const btn2 = document.getElementsByClassName('sign-up')[1];

// Get the <span> (x) element that closes the modal
const span = document.getElementsByClassName('close-button')[0];

// When the user clicks the button, open the modal
btn1.onclick = function () {
  modalForm.style.visibility = 'visible';
  modal.style.visibility = 'visible';
  modal.style.opacity = 1;
};

// When the user clicks the button in the footer, open the modal
btn2.onclick = function () {
  modalForm.style.visibility = 'visible';
  modal.style.visibility = 'visible';
  modal.style.opacity = 1;
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modalForm.style.visibility = 'hidden';
  modal.style.visibility = 'hidden';
  modal.style.opacity = 0;
};

// Swipe modal window

let startY = 0;

// Add a "touchstart" event handler to the modal window to track the start of the touch.
modalForm.addEventListener('touchstart', (e) => {
  startY = e.touches[0].clientY;
});

// Add a "touchmove" event handler to the modal window to track finger movement.
modal.addEventListener('touchmove', (e) => {
  e.preventDefault(); // forbid scrolling with fingers
});

// Swipe action
modal.addEventListener('touchend', (e) => {
  const endY = e.changedTouches[0].clientY;
  const deltaY = endY - startY;
  // Close modal window when the swipe is big enought (more than 200px)
  if (deltaY > 200) {
    // add style with animation to modalForm
    modalForm.classList.add('modal-close');
    // After 3 ms hide the modal with form and remove style with animation from modalForm
    setTimeout(() => {
      modalForm.style.visibility = 'hidden';
      modal.style.visibility = 'hidden';
      modalForm.classList.remove('modal-close');
    }, 300);
  }
});
