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

