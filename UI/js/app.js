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
const creditAccountForm = document.querySelector('#creditAccountForm');

// on debit account
const debitAccount = document.querySelector('#debitAccount');
const debitAccountForm = document.querySelector('#debitAccountForm');

// on view specific bank account
const viewAccount = document.querySelector('#viewAccount');
const viewAccountLink = document.querySelector('#viewAccountLink');
const viewAccountTable = document.querySelector('#viewAccountTable');

// on delete specific  bank account
const deleteAccount = document.querySelector('#deleteAccount');
const deleteAccountLink = document.querySelector('#deleteAccountLink');
const deleteAccountForm = document.querySelector('#deleteAccountForm');

// on user create  bank account
const createBankAccount = document.querySelector('#createBankAccount');
const createBankAccountLink = document.querySelector('.createBankAccountLink');
const createBankActivateForm = document.querySelector('#createBankAccountForm');
//check if an element is in DOM
//  @parameter element 
// @parameter callback function to do action
const elementExist = (element, doThis) => {
  if (typeof (element) !== 'undefined' && element != null) {
    doThis();
  }
};
// open modal const.
const openModal = () => {
  modal.style.display = 'block';
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
//Display view account modal
const onViewAccount = () => {
  viewAccountTable.style.display = 'block';
  deleteAccountForm.style.display = 'none';
};
// display delete account modal
const onDeleteAccount = () => {
  deleteAccountForm.style.display = 'block';
  viewAccountTable.style.display = 'none';
}
// display create bank modal
const onCreateBankAccount = () => {
  createBankActivateForm.style.display = 'block';
}
// closing modal
elementExist(btnClose, () => {
  btnClose.addEventListener('click', () => {
    modal.style.display = 'none';
  });
});

///////////////////////////////////////////////////////
////OPENING THE MODAL AND THEN CALL BACK FUNCTION ////
/////////////////////////////////////////////////////
elementExist(signUp, () => {
  signUp.addEventListener('click', () => {
    openModal();
    // go to Sign up form
    onSignUp();
  });
});
// If element exist do the included function
elementExist(signIn, () => {
  signIn.addEventListener('click', () => {
    openModal();
    // go to Sign in form
    onSignIn();
  });
});

elementExist(getStarted, () => {
  getStarted.addEventListener('click', () => {
    openModal(); // open the modal
    onSignUp(); // with Sign up form
  });
});

elementExist(activate, () => {
  activate.addEventListener('click', () => {
    openModal();// open the modal
    onActivate(); // with Activate modal
  });
});

elementExist(desactivate, () => {
  desactivate.addEventListener('click', () => {
    openModal(); // open the modal
    onDesactivate(); // with Desactivate modal
  });
});

elementExist(createAccount, () => {
  createAccount.addEventListener('click', () => {
    openModal(); // open the modal
    onCreateAccount(); // with Create account form
  });
});

elementExist(creditAccount, () => {
  creditAccount.addEventListener('click', () => {
    openModal(); // open the modal
    onCreditAccount(); // with credit account form
  });
});

elementExist(debitAccount, () => {
  debitAccount.addEventListener('click', () => {
    openModal(); // open the modal
    onDebitAccount(); // with Debit account form
  });
});

elementExist(viewAccount, () => {
  viewAccount.addEventListener('click', () => {
    openModal(); // open the modal
    onViewAccount(); // with view account table
  });
});

elementExist(deleteAccount, () => {
  deleteAccount.addEventListener('click', () => {
    openModal(); // open the modal
    onDeleteAccount(); // with delete an account 
  });
});

elementExist(createBankAccount, () => {
  createBankAccount.addEventListener('click', () => {
    openModal(); // open the modal
    onCreateBankAccount(); // with  create bank account 
  });
});
//////////////////////////////////
////// LINKS/////////////////////
///////////////////////////////
elementExist(signUpLink, () => {
  signUpLink.addEventListener('click', () => {
    openModal(); // open the modal  
    onSignUp(); // with Sign up form link
  });
});

elementExist(signInLink, () => {
  signInLink.addEventListener('click', () => {
    openModal(); // open the modal
    onSignIn(); // with Sign In form link modal
  });
});

elementExist(activateLink, () => {
  activateLink.addEventListener('click', () => {
    openModal(); // open the modal
    onActivate(); // with Activate link modal
  });
});

elementExist(desactivateLink, () => {
  desactivateLink.addEventListener('click', () => {
    openModal(); // open the modal
    onDesactivate(); // with Desactivate link modal
  });
});

elementExist(viewAccountLink, () => {
  viewAccountLink.addEventListener('click', () => {
    openModal(); // open the modal
    onViewAccount();  // with view account link modal
  });
});

elementExist(deleteAccountLink, () => {
  deleteAccountLink.addEventListener('click', () => {
    openModal(); // open the modal 
    onDeleteAccount(); // with delete an account link modal
  });
});

elementExist(createBankAccountLink, () => {
  createBankAccountLink.addEventListener('click', () => {
    openModal(); // open the modal
    onCreateBankAccount(); // with  create bank account 
  });
});
