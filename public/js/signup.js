$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  // const button = $("button.loginBtn");
  const emailInput = $("input#email");
  const passwordInput = $("input#password");
  const name = $("input#name");
  // const passwordConfirm = $("input#passwordConfirm");
  // const telephone = $("input#orgPhone");
  // const website = $("input#orgSite");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      name: name.val().trim(),
      password: passwordInput.val().trim()
    };
    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.name, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, name, password) {
    $.post("/api/signup", {
      name: name,
      email: email,
      password: password
    })
      .then(() => {
        window.location.replace("/");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});

// function passwordCheck(password, confirm) {
//   if (password !== confirm) {
//     alert("Your password does not match, please enter again");
//     passwordInput.empty();
//     passwordConfirm.empty();
//     return;
//   }
// }
