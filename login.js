document.addEventListener("DOMContentLoaded", function() {
  
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      let email = document.getElementById("email").value.trim();
      if (email !== "") {
        alert("Logged in as: " + email);
        loginForm.reset();
      }
    });
  }

 
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      let firstName = document.getElementById("firstName").value.trim();
      if (firstName !== "") {
        alert("Registered successfully as: " + firstName);
        signupForm.reset();
      }
    });
  }


document.getElementById('signupForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  
  this.style.display = 'none';

  
  document.getElementById('message').innerHTML = '<h1>Thank you for registering!</h1>';
});


});

