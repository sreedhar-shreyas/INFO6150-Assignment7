$(document).ready(function () {
    $("#heading").text("INFO6150 - Welcome back " + localStorage.getItem("name"));

    $("#fno").on("input", function () {
      validatefno();
    });

    $("#sno").on("input", function () {
      validatesno();
    });

    $(".add, .subtract, .multiply, .divide").on("click", function () {
      var operation = $(this).text();
      var num1 = $("#fno").val();
      var num2 = $("#sno").val();

      if (validatefno() && validatesno()) {
        var result = calculate(num1, num2, operation);
        if(result === "Infinity"){
          showError($("#answererror"), "Error, Please check your number.");
        }
        else{
          hideError($("#answererror"));
          $("#answer").val(result);
        }
      }
    });

    $(".reset").on("click", function () {
      $("#fno").val("");
      $("#sno").val("");
      $("#answer").val("");
    });

    const validatefno = () => {
      var fno = $("#fno").val();
      if(fno === ""){
        showError($("#fnoError"), "Input cant be empty");
        return false;
      }
      else if (!$.isNumeric(fno)) {
        showError($("#fnoError"), "Not Allowed, Please enter a number");
        return false;
      } else {
        hideError($("#fnoError"));
        return true;
      }
    };

    const validatesno = () => {
        var sno = $("#sno").val();
        if(sno === ""){
          showError($("#snoError"), "Cant math if there is no math, please input numbers");
          return false;
        }
        else if (!$.isNumeric(sno)) {
          showError($("#snoError"), "Not Allowed, Please enter a number");
          return false;
        } else {
          hideError($("#snoError"));
          return true;
        }
    };
const calculate = (num1, num2, operation) => {
    switch (operation) {
      case "+":
        return Number(num1) + Number(num2);
      case "-":
        return Number(num1) - Number(num2);
      case "*":
        return Number(num1) * Number(num2);
      case "/":
        if (Number(num2) !== 0) {
          return Number(num1) / Number(num2);
        } else {
          return "Infinity";
        }
    }
  };

  const showError = (feedbackElement, message) => {
    feedbackElement.text(message);
  };

  const hideError = (feedbackElement) => {
    feedbackElement.text("");
  };
});