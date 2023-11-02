$(document).ready(function () {
    $("#uname").on("input", function () {
      validateUName();
      checkValidity();
    });
  
    $("#email").on("input", function () {
      validateEmail();
      checkValidity();
    });
  
    $("#password").on("input", function () {
      validatePassword();
      checkValidity();
    });
  
    $("#confirmPassword").on("input", function () {
      validateConfirmPassword();
      checkValidity();
    });
  
    let UnameValid = false;
    let emailValid = false;
    let passwordValid = false;
    let confirmPasswordValid = false;
  
    function validateUName() {
      var name = $("#uname").val();
      let specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/g;
      if (name === "") {
        showError($("#uname"), $("#uname_error"), "Username cannot be empty");
      } else if (name != "" && name.length < 2) {
        showError(
          $("#uname"),
          $("#uname_error"),
          "Username is too short. Minimum length is 3 characters."
        );
      }
      else if(specialCharRegex.test(name)){
        showError(
          $("#uname"),
          $("#uname_error"),
          "Username cannot have special characters"
        );
      } else if (name.length > 15) {
        showError(
          $("#uname"),
          $("#uname_error"),
          "Username is too long. Maximum length is 15 characters."
        );
      } else {
          localStorage.setItem("name",$("#uname").val());
        showSuccess($("#uname"), $("#uname_error"), "");
        UnameValid = true;
      }
    }
  
    function validateEmail() {
      var email = $("#email").val();
      var emailRegex = /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(northeastern)\.edu$/;
      var emailTest = emailRegex.test(email);
      if (email === "") {
        showError($("#email"), $("#email_error"), "Email cannot be empty");
      } else if (emailTest === true) {
        var emailSplit = email.split("@");
        var domain = emailSplit[1];
        if (domain != "northeastern.edu") {
          showError($("#email"), $("#email_error"), "Incorrect domain name");
        } else {
          showSuccess($("#email"), $("#email_error"), "");
          emailValid = true;
        }
      } else {
        showError($("#email"), $("#email_error"), "Incorrect email address");
      }
    }
  
    function validatePassword() {
      let alphanumeric = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
      let lowercaseRegex = /[a-z]/g;
      let uppercaseRegex = /[A-Z]/g;
      let specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/g;
      var password = $("#password").val();
      let passwordStrength = $("#passwordStrength");
  
      if (password.length < 8) {
        showError(
          $("#password"),
          $("#feedback-password"),
          "Password cannot be empty"
        );
  
        passwordStrength.addClass("text-danger");
        passwordStrength.html("Weak");
      } else if (!alphanumeric.test(password)) {
        showError(
          $("#password"),
          $("#feedback-password"),
          "Try a mix of letters and numbers"
        );
 
        passwordStrength.addClass("text-danger");
        passwordStrength.html("Weak");
      } else if (password.length >= 8 && alphanumeric.test(password)) {
        if (
          !(
            lowercaseRegex.test(password) &&
            uppercaseRegex.test(password) &&
            specialCharRegex.test(password)
          )
        ) {
          showError(
            $("#password"),
            $("#feedback-password"),
            "Your password must contain a combination of uppercase and lowercase letters, as well as at least one special character. Please ensure your password meets these requirements for enhanced security."
          );
     
          passwordStrength.removeClass("text-danger").addClass("text-warning");
          passwordStrength.html("Medium");
        } else {
          showSuccess($("#password"), $("#feedback-password"), "");
         
        
          passwordStrength
            .removeClass("text-danger text-warning")
            .addClass("text-success");
          passwordStrength.html("Strong");
          isPasswordValid = true;
          passwordValid = true;
        }
      }
    }
  
    function validateConfirmPassword(){
      var password = $("#password").val();
      var confirmPassword = $("#confirmPassword").val();
      if(password === confirmPassword){
          showSuccess($("#confirmPassword"), $("#feedback-confirmPassword"), "");
          confirmPasswordValid = true;
      }
      else{
          showError($("#confirmPassword"),$("#feedback-confirmPassword"),"Password and Confirm Password doesnot match")
      }
  
    }
  
  
    function showSuccess(element, feedbackElement, message) {
      element.removeClass("is-invalid").addClass("is-valid");
      feedbackElement
        .removeClass("invalid-feedback")
        .addClass("valid-feedback")
        .text(message);
    }
  
    function showError(element, feedbackElement, message) {
      element.removeClass("is-valid").addClass("is-invalid");
      feedbackElement
        .removeClass("valid-feedback")
        .addClass("invalid-feedback")
        .text(message);
    }
  
    function storeNameInLocalStorage() {
      const name = $("#uname").val();
      localStorage.setItem("name", name);
    }
  
    $("#submit-button").on("submit", function (event) {
      localStorage.setItem("name",$("#uname").val());
  })
  
  function checkValidity() {
    if (UnameValid && emailValid && passwordValid && confirmPasswordValid) {
      $("#submit-button").prop("disabled", false);
      $("#submit-button").click(function(){
        $("#form")[0].reset();
        window.location.href = "./calc.html";
      })
    } else {
      $("#submit-button").prop("disabled", true);
    }
  }
  checkValidity();
  
  });
  