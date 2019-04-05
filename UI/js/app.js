const btnClose = document.querySelector('.close'); //close button to all modal
const modal = document.querySelector('#modal'); //all modal
// on signup
const signUp = document.querySelector('#sign-up');
const getStarted = document.querySelector('.get-stared-link');
const signUpLink = document.querySelector('.signUplink');
const signUpForm = document.querySelector('#signUpForm');

// on signin
const signIn = document.querySelector('#sign-in');
const signInLink = document.querySelector('.signInlink');
const signInForm = document.querySelector('#signInForm');
  
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
 signInForm.style.display = 'none';
};

//display the sign up modal page
const onSignIn = () => {
  signInForm.style.display = 'block';
  signUpForm.style.display = 'none';
 };

  // closing modal
  elementExist(btnClose, () => {
    btnClose.addEventListener('click', () => {
      modal.style.display ='none';
    });
  });
  
///////////////////////////////////////////////////////
////OPENING THE MODAL AND THEN CALL BACK FUNCTION ////
/////////////////////////////////////////////////////
  elementExist(signUp, () => {
    signUp.addEventListener('click', () => {
      // open the modal
      openModal();
      // go to Sign up form
      onSignUp();
    });
  });
// If element exist do the included function
  elementExist(signIn, () => {
    signIn.addEventListener('click', () => {
      // open the modal
      openModal();
      // go to Sign in form
      onSignIn();
    });
  });

  elementExist(getStarted, () => {
    getStarted.addEventListener('click', () => {
      // open the modal
      openModal();
      // with Sign up form
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

  elementExist(signInLink, () => {
    signInLink.addEventListener('click', () => {
      // open the modal
      openModal();
      // with Sign In form
      onSignIn();
    });
  });