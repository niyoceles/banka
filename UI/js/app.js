const btnClose = document.querySelector('.close'); //close button to all modal
const modal = document.querySelector('#modal'); //all modal
// on signup
const signUp = document.querySelector('#sign-up');
const signUpLink = document.querySelector('.get-stared-link');
const signUpForm = document.querySelector('#signUpForm');
  
//check if an element is in DOM
//  @parameter element 
// @parameter callback function to do action

const elementExist = (element, doThis) => {
  if (typeof (element) !== 'undefined' && element != null) {
    doThis();
  }
};

  const openModal = () => {
  modal.style.display ='block';
};

//display the sign up modal page
const onSignUp = () => {
 signUpForm.style.display = 'block';
};

  // closing modal
  elementExist(btnClose, () => {
    btnClose.addEventListener('click', () => {
      modal.style.display ='none';
    });
  });
  
  elementExist(signUp, () => {
    signUp.addEventListener('click', () => {
      onSignUp();
    });
  });
///////////////////////////////////////////////////
////           OPENING THE MODAL AND THEN CALL BACK FUNCTION              ////
/////////////////////////////////////////////////
  elementExist(signUp, () => {
    signUp.addEventListener('click', () => {
      // open the modal
      openModal();
      // go to Sign up form
      onSignUp();
    });
  });

  elementExist(signUpLink, () => {
    signUpLink.addEventListener('click', () => {
      // open the modal
      openModal();
      // with Sign up form
      onSignUp();
    });
  });