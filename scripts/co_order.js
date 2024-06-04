"use strict";

/*

   Order Form Script

    Author: Laura Coombs
    Date:   June 3, 2024

   Filename: co_order.js

   Function List
   =============

   calcOrder() DONE
      Calculates the cost of the customer order

   formatNumber(val, decimals) DONE
      Format a numeric value, val, using the local
      numeric format to the number of decimal
      places specified by decimals

   formatUSACurrency(val) DONE
      Formats val as U.S.A. currency

*/

window.addEventListener("load", function() {
  var orderForm = document.forms.orderForm;
  orderForm.elements.orderDate.value = new Date().toDateString()
  // set focus to model dropdown
  orderForm.elements.model.focus()

  // calculate the cost of the Order
  calcOrder()

  // respond to any change events (quantity or model)
  orderForm.elements.model.onchange = calcOrder;
  orderForm.elements.qty.onchange = calcOrder;

  // grab ALL radio buttons
  var planOptions = document.querySelectorAll("input[name='protection']");

  // loop over and add event listener to each radio button
  for (var i = 0; i < planOptions.length; i++) {
    planOptions[i].onclick = calcOrder;
  }

})

function calcOrder() {
  var orderForm = document.forms.orderForm;

  // calculate initial cost of order
  // get selected index
  var mIndex = orderForm.elements.model.selectedIndex;
  // get the value(cost) of the selected index
  var mCost = orderForm.elements.model.options[mIndex].value;
  // get the quantity of the selected index
  var qIndex = orderForm.elements.qty.selectedIndex;
  var quantity = orderForm.elements.qty[qIndex].value;

  // initial cost model cost * quantity
  var initialCost = mCost * quantity;

  // write it to the initial cost text box
  orderForm.elements.initialCost.value = formatUSACurrency(initialCost)

  // retrieve the selected protection plan
  var pCost = document.querySelector("input[name='protection']:checked").value * quantity;
  orderForm.elements.protectionCost.value = formatNumber(pCost, 2);

  // Subtotal
  orderForm.elements.subtotal.value = formatNumber(initialCost + pCost, 2);

  // sales tax
  var salesTax = 0.05 * (initialCost + pCost);
  orderForm.elements.salesTax.value = formatNumber(salesTax, 2);

  var totalCost = initialCost + pCost + salesTax;

  // format the total cost
  orderForm.elements.totalCost.value = formatUSACurrency(totalCost);
  // store text details into the hidden fields
  orderForm.elements.modelName.value = orderForm.elements.model.options[mIndex].text;
  // only one is checked. get the node value of next sibling which is the input
  // TODO This isn't working?
  orderForm.elements.protectionName.value = document.querySelector("input[name='protection']:checked").nextSibling.nodeValue;
}

// format basic numbers
function formatNumber(val, decimals) {
  return val.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  })
}

// format US Currency specifically
function formatUSACurrency(val) {
  return val.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  })
}
