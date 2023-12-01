$(document).ready(function () {
  // Event handler for username input
  $("#register-username").on("input", function () {
    checkUsernameAvailability();
  });

  // Event handler for email input
  $("#register-email").on("input", function () {
    checkEmailAvailability();
  });

  // Event handler for phone input
  $("#register-phone").on("input", function () {
    checkPhoneAvailability();
  });

  // Validation functions for different login types
  function validateLogin(redirectPage) {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Check if the credentials match the desired values
    if (username === "admin" && password === "admin") {
      // Redirect to the specified dashboard page
      window.location.href = redirectPage;
      return false; // Prevent the form from submitting
    }

    // If the credentials don't match, the form will submit as usual
    return true;
  }

  // Event handlers for form submissions
  $("#registrationForm").submit(function () {
    // If everything is valid, the form will submit as usual
    return true;
  });

  $("#userLoginForm").submit(function () {
    return validateLogin("userDashboard.html");
  });

  $("#doctorLoginForm").submit(function () {
    return validateLogin("doctorDashboard.html");
  });

  $("#adminLoginForm").submit(function () {
    return validateLogin("adminDashboard.html");
  });

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
        $("#phoneAvailability").text("Phone not available").css("color", "red");
      } else {
        $("#phoneAvailability").text("Phone available").css("color", "green");
      }
    });
  }
});
