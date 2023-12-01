$(document).ready(function () {
  // Event handler for username input
  $("#register-username").on("input", function () {
    checkUsernameAvailability();
    updateSubmitButton();
  });

  // Event handler for email input
  $("#register-email").on("input", function () {
    checkEmailAvailability();
    updateSubmitButton();
  });

  // Event handler for phone input
  $("#register-phone").on("input", function () {
    checkPhoneAvailability();
    updateSubmitButton();
  });

  // Event handler for form submission
  $("#registrationForm").submit(function () {
    // If everything is valid, the form will submit as usual
    return true;
  });

  // Function to update the submit button based on form validity
  function updateSubmitButton() {
    var form = $("#registrationForm")[0];
    var submitButton = $("#registerButton")[0];

    // Check if the form is valid
    if (form.checkValidity()) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  }

  // Function to check username availability
  function checkUsernameAvailability() {
    var username = $("#register-username").val();
    $.post("check_username.php", { username: username }, function (data) {
      if (data === "taken") {
        $("#usernameAvailability")
          .text("Username not available")
          .css("color", "red");
      } else {
        $("#usernameAvailability")
          .text("Username available")
          .css("color", "green");
      }
    });
  }

  // Function to check email availability
  function checkEmailAvailability() {
    var email = $("#register-email").val();
    $.post("check_email.php", { email: email }, function (data) {
      if (data === "taken") {
        $("#emailAvailability").text("Email not available").css("color", "red");
      } else {
        $("#emailAvailability").text("Email available").css("color", "green");
      }
    });
  }

  // Function to check phone availability
  function checkPhoneAvailability() {
    var phone = $("#register-phone").val();
    $.post("check_phone.php", { phone: phone }, function (data) {
      if (data === "taken") {
        $("#telAvailability").text("Phone not available").css("color", "red");
      } else {
        $("#telAvailability").text("Phone available").css("color", "green");
      }
    });
  }
});
