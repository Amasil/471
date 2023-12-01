function validateUserLogin() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // Check if the credentials match the desired values
  if (username === "admin" && password === "admin") {
    // Redirect to the dashboard page
    window.location.href = "userDashboard.html";
    return false; // Prevent the form from submitting
  }

  // If the credentials don't match, the form will submit as usual
  return true;
}

function validateDoctorLogin() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // Check if the credentials match the desired values
  if (username === "admin" && password === "admin") {
    // Redirect to the dashboard page
    window.location.href = "doctorDashboard.html";
    return false; // Prevent the form from submitting
  }

  // If the credentials don't match, the form will submit as usual
  return true;
}

function validateAdminLogin() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // Check if the credentials match the desired values
  if (username === "admin" && password === "admin") {
    // Redirect to the dashboard page
    window.location.href = "adminDashboard.html";
    return false; // Prevent the form from submitting
  }

  // If the credentials don't match, the form will submit as usual
  return true;
}
