"use strict";

/*

   Payment Form Script

    Author: Laura Coombs
    Date:   June 3, 2024

   Filename: co_payment.js

   Function List
   =============

   runSubmit() DONE
      Runs validation tests when the submit button is clicked

   validateCVC() DONE
      Validates the credit card CVC number

   validateMonth() DONE
      Validates that the user has selected the expiration month of the credit card

   validateYear() DONE
      Validates that the user has selected the expiration year of the credit card

   validateNumber() DONE
      Validates that the user has entered a valid and legitimate card number

   validateCredit() DONE
      Validates that the user has selected a credit card type

   validateName() DONE
      Validates that the user has specified the name on the credit card

   sumDigits(numStr)
      Sums the digits characters in a text string

   luhn(idNum)
      Returns true of idNum satisfies the Luhn Algorithm

*/

window.addEventListener("load", function() {
  // add event listener to submit button
  document.getElementById("subButton").onclick = runSubmit
  document.getElementById("cardName").oninput = validateName
  document.getElementById("cardNumber").oninput = validateNumber
  document.getElementById("expMonth").oninput = validateMonth
  document.getElementById("expYear").oninput = validateYear
  document.getElementById("cvc").oninput = validateCVC

  // location.search is everything after the ? from the url
  // slice(1) removes the ? from the string
  // everywhere we see a +, replace with a space
  // %28, %29 etc need to be cleaned up. use decodeURIComponent()
  var formData = location.search.slice(1)
  formData = formData.replace((/\+/g), " ")
  formData = decodeURIComponent(formData) // decode %24 to render $, %28 to render ( etc
  // (/\+/g) finds all instances of + in the string 'g' gets all. no 'g' gets first
  // whenever you see & or =, split the string -> end result is an array
  var formField = formData.split(/[&=]/g)

  // write values out to form fields on the page
  document.forms.order.elements.orderDate.value = formField[1]
  document.forms.order.elements.modelName.value = formField[5]
  document.forms.order.elements.qty.value = formField[7]
  document.forms.order.elements.initialCost.value = formField[9]
  document.forms.order.elements.protectionName.value = formField[13]
  document.forms.order.elements.protectionCost.value = formField[15]
  document.forms.order.elements.subtotal.value = formField[17]
  document.forms.order.elements.salesTax.value = formField[19]
  document.forms.order.elements.totalCost.value = formField[21]
})

function validateName() {
  var cardName = document.getElementById("cardName")

  if (cardName.validity.valueMissing) {
    cardName.setCustomValidity("Enter your name as it appears on the card")
  } else {
    cardName.setCustomValidity("")
  }
}

function validateCreditCard() {
  var creditCard = document.forms.payment.elements.credit[0]
  if (creditCard.validity.valueMissing) {
    creditCard.setCustomValidity("Select your credit card")
  } else {
    creditCard.setCustomValidity("")
  }
}

function validateNumber() {
  var cardNumber = document.getElementById("cardNumber")
  if (cardNumber.validity.valueMissing) {
    cardNumber.setCustomValidity("Enter your card number")
  } else if (cardNumber.validity.patternMismatch) {
    cardNumber.setCustomValidity("Enter a valid card number")
  } else if (luhn(cardNumber.value) === false) {
    cardNumber.setCustomValidity("Enter a legitimate card number")
  } else {
    cardNumber.setCustomValidity("")
  }
}

function validateMonth() {
  var cardMonth = document.forms.payment.elements.expMonth
  if (cardMonth.selectedIndex === 0) {
    cardMonth.setCustomValidity("Select the expiration month")
  } else {
    cardMonth.setCustomValidity("")
  }

}

function validateYear() {
  var cardYear = document.forms.payment.elements.expYear
  if (cardYear.selectedIndex === 0) {
    cardYear.setCustomValidity("Select the expiration year")
  } else {
    cardYear.setCustomValidity("")
  }
}

function validateCVC() {
  var cardCVC = document.getElementById("cvc")
  var creditCard = document.querySelector('input[name="credit"]:checked').value

  if (cardCVC.validity.valueMissing) {
    cardCVC.setCustomValidity("Enter the card CVC number")
  } else if ((creditCard === "amex") && (/^\d{4}$/.test(cardCVC.value) === false)) {
    cardCVC.setCustomValidity("Enter a 4-digit CVC number")
  } else if ((creditCard !== "amex") && (/^\d{3}$/.test(cardCVC.value) === false)) {
    cardCVC.setCustomValidity("Enter a 3-digit CVC number")
  } else {
    cardCVC.setCustomValidity("")
  }
}


function sumDigits(numStr) {
  var digitTotal = 0
  for (var i = 0; i < numStr.length; i++) {
    digitTotal += parseInt(numStr.charAt(i))
  }
  return digitTotal
}


function luhn(idNum) {
  var string1 = ""
  var string2 = ""

  // get odd numbered digits
  for(var i = idNum.length - 1; i >=0; i-= 2) {
    string1 += idNum.charAt(i)
  }

  // get even numbered digits
  for(var i = idNum.length - 2; i >= 0; i-= 2) {
    string2 += 2*idNum.charAt(i)
  }

  // return whether sum of digits is divisible by 10
  return sumDigits(string1 + string2) % 10 === 0
}

function runSubmit() {
  validateName();
  validateCreditCard()
  validateNumber()
  validateMonth()
  validateYear()
  validateCVC()
}
