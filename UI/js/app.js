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

  // on credit account
const creditAccount = document.querySelector('#creditAccount');
const creditAccountForm= document.querySelector('#creditAccountForm');

 // on debit account
 const debitAccount = document.querySelector('#debitAccount');
 const debitAccountForm= document.querySelector('#debitAccountForm');

 // on view specific bank account
 const viewAccount = document.querySelector('#viewAccount');
 const viewAccountLink = document.querySelector('#viewAccountLink');
 const viewAccountTable= document.querySelector('#viewAccountTable');

  // on delete specific  bank account
  const deleteAccount = document.querySelector('#deleteAccount');
  const deleteAccountLink = document.querySelector('#deleteAccountLink');
  const deleteAccountForm= document.querySelector('#deleteAccountForm');

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

    //display the credit account modal page
const onCreditAccount = () => {
  creditAccountForm.style.display = 'block';
  debitAccountForm.style.display = 'none';
 };

     //display the debit account modal page
const onDebitAccount = () => {
  debitAccountForm.style.display = 'block';
  creditAccountForm.style.display = 'none';
 };

 const onViewAccount = ()=>{
   viewAccountTable.style.display= 'block';
   deleteAccountForm.style.display= 'none';
 };

 const onDeleteAccount = ()=>{
 deleteAccountForm.style.display= 'block';
 viewAccountTable.style.display= 'none';
}

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

  elementExist(creditAccount, () => {
    creditAccount.addEventListener('click', () => {
      // open the modal
      openModal();
      // with credit account form
      onCreditAccount();
    });
  });

  elementExist(debitAccount, () => {
    debitAccount.addEventListener('click', () => {
      // open the modal
      openModal();
      // with Debit account form
      onDebitAccount();
    });
  });

  
  elementExist(viewAccount, () => {
    viewAccount.addEventListener('click', () => {
      // open the modal
      openModal();
      // with view account table
      onViewAccount();
    });
  });

  elementExist(deleteAccount, () => {
    deleteAccount.addEventListener('click', () => {
      // open the modal
      openModal();
      // with delete an account 
      onDeleteAccount();
    });
  });

  //////////////////////////////////
  ////// LINKS/////////////////////
  ///////////////////////////////

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
  
    
  elementExist(viewAccountLink, () => {
    viewAccountLink.addEventListener('click', () => {
      // open the modal
      openModal();
      // with view account table
      onViewAccount();
    });
  });

  elementExist(deleteAccountLink, () => {
    deleteAccountLink.addEventListener('click', () => {
      // open the modal
      openModal();
      // with delete an account 
      onDeleteAccount();
    });
  });