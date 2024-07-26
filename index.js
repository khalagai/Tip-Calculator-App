    const billInput = document.getElementById("bill");
    const peopleInput = document.getElementById("people");
    const totalTip = document.getElementById("tipTotal");
    const tipAmount = document.getElementById("tipOne");
    const reset = document.getElementById("reset");
    const tipButtons = document.querySelectorAll("[data-tip]");
    const custom = document.getElementById("six");
    const billError = document.getElementById("bill-required");
    const peopleError = document.getElementById("people-required");
    
    let bill = 0;
    let tip = 0;
    let total = 0;
    let tipPerson = 0;
        
    const calculateTip = (tipPercentage) => {
      if(!validateInput()) {
        return;
      }
      updateTip(tipPercentage);
    }
    
    tipButtons.forEach(button => {
      button.addEventListener("click", () => {
        const tipPercentage = Number(button.dataset.tip);
        calculateTip(tipPercentage);
        
      });
    });
    
    custom.addEventListener("input", () => {
      const tipPercentage = Number(custom.value);
      calculateTip(tipPercentage);
    });
    
    reset.addEventListener("click", () => {
      billInput.value = "";
      peopleInput.value = "";
      custom.value = "";
      totalTip.innerText = "$0.00";
      tipAmount.innerText = "$0.00";
      peopleError.innerText = "";
      billError.innerText = "";
      billInput.style.border = "none";
      peopleInput.style.border = "none";
    });

    const validateInput = () => {
      billValue = Number(billInput.value);
      peopleValue = Number(peopleInput.value);
      const isValidInput = /^\d+$/;
    
      if(!billValue || !isValidInput.test(billValue)) {
        billError.innerText = "Enter bill amount!!";
        billError.setAttribute('role', 'alert'); // Announce as an alert
        billInput.style.border = "1.5px solid red";
        return false;
      }   
      if(!peopleValue || !isValidInput.test(peopleValue)) {
        peopleError.innerText = "Cannot be Zero!!";
        peopleError.setAttribute('role', 'alert'); // Announce as an alert
        peopleInput.style.border = "1.5px solid red";
        return false;          
      }

      billError.innerText = "";
      billInput.style.border = "none";
      peopleError.innerText = "";
      peopleInput.style.border = "none";
      billError.removeAttribute('role'); // Remove alert role
      peopleError.removeAttribute('role'); // Remove alert role
      return true; 
    }

    const updateTip = (tipPercentage) => {
      bill = billValue;      
      tip = (tipPercentage * bill) / 100;
      tipPerson = tip / peopleValue;
      total = tip + bill;
      totalTip.innerText = `$${total.toFixed(2)}`;
      tipAmount.innerText = `$${tipPerson.toFixed(2)}`;  
    }
    