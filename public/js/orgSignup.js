$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  // const button = $("button.loginBtn");
  const emailInput = $("input#email");
  const passwordInput = $("input#password");
  const name = $("input#name");
  // const passwordConfirm = $("input#passwordConfirm");
  // const telephone = $("input#orgPhone");
  const website = $("input#orgSite");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      name: name.val().trim(),
      password: passwordInput.val().trim(),
      website: website.val().trim()
    };
    console.log(userData);
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
  function signUpUser(email, name, password, website) {
    $.post("/api/orgsignup", {
      name: name,
      email: email,
      password: password,
      website: website
    });
    return alert(
      "organization created and added to database but cannot be logged in"
    );
  }
});
