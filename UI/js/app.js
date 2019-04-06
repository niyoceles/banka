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

// on activate 
const activate = document.querySelector('#activate-user-account');
const activateLink = document.querySelector('.activateLink');
const activateModal = document.querySelector('#activateModal');

  // on desactivate 
const desactivate = document.querySelector('#desactivate-user-account');
const desactivateLink = document.querySelector('.desactivateLink');
const desactivateModal = document.querySelector('#desactivateModal');

  // on create an admin/staff Account 
  const createAccount = document.querySelector('#createAccount');
  const createAccountForm = document.querySelector('#createAccountForm');

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

 //display the Activate modal page
const onActivate = () => {
  activateModal.style.display = 'block';
  desactivateModal.style.display = 'none';
  createAccountForm.style.display = 'none';
 };

  //display the Desactivate modal page
const onDesactivate = () => {
  desactivateModal.style.display = 'block';
  activateModal.style.display = 'none';
  createAccountForm.style.display = 'none';
 };

   //display the Desactivate modal page
const onCreateAccount = () => {
  createAccountForm.style.display = 'block';
  desactivateModal.style.display = 'none';
  activateModal.style.display = 'none';
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

  elementExist(activate, () => {
    activate.addEventListener('click', () => {
      // open the modal
      openModal();
      // with Activate modal
      onActivate();
    });
  });

  elementExist(desactivate, () => {
    desactivate.addEventListener('click', () => {
      // open the modal
      openModal();
      // with Desactivate modal
      onDesactivate();
    });
  });
  
  elementExist(createAccount, () => {
    createAccount.addEventListener('click', () => {
      // open the modal
      openModal();
      // with Create account form
      onCreateAccount();
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

  elementExist(activateLink, () => {
    activateLink.addEventListener('click', () => {
      // open the modal
      openModal();
      // with Activate link modal
      onActivate();
    });
  });

  elementExist(desactivateLink, () => {
    desactivateLink.addEventListener('click', () => {
      // open the modal
      openModal();
      // with Desactivate link modal
      onDesactivate();
    });
  });
  