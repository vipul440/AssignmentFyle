document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("taxForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    validateInput("income");
    validateInput("extraIncome");
    validateSelect("ageGroup");
    validateInput("deductions");

    if (form.querySelectorAll(".is-invalid").length === 0) {
      calculateTax();
    }
  });

  function validateInput(inputId) {
    var input = document.getElementById(inputId);
    var errorIcon = input.nextElementSibling;

    if (!/^\d+$/.test(input.value.trim())) {
      input.classList.add("is-invalid");
      errorIcon.style.display = "inline-block";
    } else {
      input.classList.remove("is-invalid");
      errorIcon.style.display = "none";
    }
  }

  function validateSelect(selectId) {
    var select = document.getElementById(selectId);
    var errorIcon = select.parentElement.querySelector(".error-icon");

    if (!["<40", "40-60", "≥60"].includes(select.value)) {
      select.classList.add("is-invalid");
      errorIcon.style.display = "inline-block";
    } else {
      select.classList.remove("is-invalid");
      errorIcon.style.display = "none";
    }
  }

  function calculateTax(bool) {
    var income = parseInt(document.getElementById("income").value);
    var extraIncome = parseInt(document.getElementById("extraIncome").value);
    var ageGroup = document.getElementById("ageGroup").value;
    var deductions = parseInt(document.getElementById("deductions").value);

    var totalIncome = income + extraIncome - deductions;
    var afterTaxIncome =
      totalIncome <= 800000
        ? totalIncome
        : totalIncome - calculateTaxAmount(totalIncome, ageGroup);

    document.getElementById("overallIncome").textContent = afterTaxIncome;

    // Show the modal
    var myModal = new bootstrap.Modal(document.getElementById("myModal"), {
      centered: true,
    });
    myModal.show();
  }

  function calculateTaxAmount(totalIncome, ageGroup) {
    var taxRate = ageGroup === "<40" ? 0.3 : ageGroup === "40-60" ? 0.4 : 0.1;
    return taxRate * (totalIncome - 800000);
  }
});

/*  */

/*  */
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
var closeButton = document.getElementById("closeButton");

btn.onclick = function () {
  if (form.querySelectorAll(".is-invalid").length === 0)
    modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
closeButton.onclick = function () {
  modal.style.display = "none";
};
