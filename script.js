$(document).ready(function () {
  $("#username").on("input", function () {
    var username = $(this).val();
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
});
