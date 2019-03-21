const modal = document.querySelector('#modal');
const btnClose = document.querySelector('.close');
const activateDeactivateLink = document.querySelector('#activate-user-account');
const desactivateActivateLink = document.querySelector('#desactivate-user-account');
const activateDesactivate = document.querySelector('#activate');
const desactivateActivate = document.querySelector('#desactivate');
const gotoDesactivateActivate= document.querySelector('#goto-desactivate');
const gotoActivateDesactivate= document.querySelector('#goto-activate');

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
};
 // display  Desactivate modal page
 const _gotoDesactivateActivate = () => {
    setDisplay(desactivateActivate, 'block');
    setDisplay(activateDesactivate, 'none');
  };
 
  // closing modal
  elementExist(btnClose, () => {
    btnClose.addEventListener('click', () => {
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

