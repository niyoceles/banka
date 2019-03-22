const modal = document.querySelector('#modal'); //all modal
const btnClose = document.querySelector('.close'); //close button to all modal
// on Activate
const activateDeactivateLink = document.querySelector('#activate-user-account');
const activateDesactivate = document.querySelector('#activate');
const gotoActivateDesactivate= document.querySelector('#goto-activate');
// on desactivate
const desactivateActivateLink = document.querySelector('#desactivate-user-account');
const desactivateActivate = document.querySelector('#desactivate');
const gotoDesactivateActivate= document.querySelector('#goto-desactivate');

// on creating account 
const btnCancel = document.querySelector('.cancelbtn');
const createAccountLink = document.querySelector('#create-account-link');
const createAccount = document.querySelector('#createAccount');
const gotoCreateAccount= document.querySelector('.goto-createAccount');
// on credit account
const creditAccountLink = document.querySelector('#credit-account-link');
const creditAccount = document.querySelector('#creditAccount');
const gotoCreditAccount= document.querySelector('.goto-creditAccount');

// on debit account
const debitAccountLink = document.querySelector('#debit-account-link');
const debitAccount = document.querySelector('#debitAccount');
const gotoDebitAccount= document.querySelector('.goto-debitAccount');
// on view specific account
const viewAccount = document.querySelector('#viewAccount');
const viewAccountLink = document.querySelector('.view-account-link');
const gotoViewAccount= document.querySelector('#goto-viewAccount');

// on delete specific account
const deleteAccount = document.querySelector('#deleteAccount');
const deleteAccountLink = document.querySelector('.delete-account-link');
const gotoDeleteAccount= document.querySelector('#goto-delete-account');
/*
    check if an element is in the DOM
    @params element
    @params callback
 */
const elementExist = (element, callback) => {
    if (typeof (element) !== 'undefined' && element != null) {
      callback();
    }
  };
  
  /**
   * change the display of an HTML element
   * @param  DOM element
   * @param  string value
   */
  const setDisplay = (element, value) => {
    element.style.display = value;
  };
  
  /*
      * open a modal page
   */
  const openModal = () => {
    setDisplay(modal, 'block');
  };

 // display  Activate modal page
const _gotoActivateDesactivate = () => {
  setDisplay(activateDesactivate, 'block');
  setDisplay(desactivateActivate, 'none');
  setDisplay(createAccount, 'none');
};
 // display  Desactivate modal page
 const _gotoDesactivateActivate = () => {
    setDisplay(desactivateActivate, 'block');
    setDisplay(activateDesactivate, 'none');
    setDisplay(createAccount, 'none');
  };

  // display create account modal page
  const _gotoCreateAccount = () => {
    setDisplay(createAccount, 'block');
    setDisplay(activateDesactivate, 'none');
    setDisplay(desactivateActivate, 'none');
  };

  // display credit account modal page
  const _gotoCreditAccount = () => {
    setDisplay(creditAccount, 'block');
    setDisplay(debitAccount, 'none');
  };
   // display debit account modal page
   const _gotoDebitAccount = () => {
    setDisplay(debitAccount, 'block');
    setDisplay(creditAccount, 'none');
  };

  //display  view specific account modal page
 const _gotoViewAccount = () => {
   setDisplay(viewAccount, 'block');
   setDisplay(deleteAccount, 'none');
 };
// display delete specific account modal
 const _gotoDeleteAccount = () => {
  setDisplay(deleteAccount, 'block');
  setDisplay(viewAccount, 'none');
};

  // closing modal
  elementExist(btnClose, () => {
    btnClose.addEventListener('click', () => {
      setDisplay(modal, 'none');
    });
  });

   // closing modal button
   elementExist(btnCancel, () => {
    btnCancel.addEventListener('click', () => {
      setDisplay(modal, 'none');
    });
  });

  elementExist(gotoActivateDesactivate, () => {
    gotoActivateDesactivate.addEventListener('click', () => {
      _gotoActivateDesactivate();
    });
  });

  elementExist(gotoDesactivateActivate, () => {
    gotoDesactivateActivate.addEventListener('click', () => {
      _gotoDesactivateActivate();
    });
  });

  elementExist(gotoCreateAccount, () => {
    gotoCreateAccount.addEventListener('click', () => {
      _gotoCreateAccount();
    });
  });

  elementExist(gotoCreditAccount, () => {
    gotoCreditAccount.addEventListener('click', () => {
      _gotoCreateAccount();
    });
  });

 elementExist(gotoDebitAccount, () => {
    gotoDebitAccount.addEventListener('click', () => {
      _gotoDebitAccount();
    });
  });

  elementExist(gotoViewAccount, () => {
    gotoViewAccount.addEventListener('click', () => {
      _gotoViewAccount();
    });
  });

  elementExist(gotoDeleteAccount, () => {
    gotoDeleteAccount.addEventListener('click', () => {
      _gotoDeleteAccount();
    });
  });
///////////////////////////////////////////////////
////           OPENING THE MODA               ////
/////////////////////////////////////////////////
  elementExist(activateDeactivateLink, () => {
    activateDeactivateLink.addEventListener('click', () => {
      // open the modal
      openModal();
      // go to Activate form
      _gotoActivateDesactivate();
    });
  });

  elementExist(desactivateActivateLink, () => {
    desactivateActivateLink.addEventListener('click', () => {
      // open the modal
      openModal();
      // go to Desactivate form
      _gotoDesactivateActivate();
    });
  });

  elementExist(gotoActivateDesactivate, () => {
    gotoActivateDesactivate.addEventListener('click', () => {
      // open the modal
      openModal();
      // go to Activate form
      _gotoActivateDesactivate();
    });
  });

  elementExist(gotoDesactivateActivate, () => {
    gotoDesactivateActivate.addEventListener('click', () => {
      // open the modal
      openModal();
      // go to Desactivate form
      _gotoDesactivateActivate();
    });
  });

  elementExist(createAccountLink, () => {
    createAccountLink.addEventListener('click', () => {
      // open the modal
      openModal();
      // and the Create account form
      _gotoCreateAccount();
    });
  });

  elementExist(creditAccountLink, () => {
    creditAccountLink.addEventListener('click', () => {
      // open the modal
      openModal();
      // and the Credit account form
      _gotoCreditAccount();
    });
  });
  elementExist(debitAccountLink, () => {
    debitAccountLink.addEventListener('click', () => {
      // open the modal
      openModal();
      // and the Debit account form
      _gotoDebitAccount();
    });
  });

  elementExist(viewAccountLink, () => {
    viewAccountLink.addEventListener('click', () => {
      // open the modal
      openModal();
  
      // and the view specific account 
      _gotoViewAccount();
    });
  });

  elementExist(gotoViewAccount, () => {
    gotoViewAccount.addEventListener('click', () => {
      // open the modal
      openModal();
      // go to View account form
      _gotoViewAccount();
    });
  });

  elementExist(gotoDeleteAccount, () => {
    gotoDeleteAccount.addEventListener('click', () => {
      // open the modal
      openModal();
      // go to Delete specific account form
      _gotoDeleteAccount();
    });
  });
  elementExist(deleteAccountLink, () => {
    deleteAccountLink.addEventListener('click', () => {
      // open the modal
      openModal();
      // go to Delete specific account form
      _gotoDeleteAccount();
    });
  });