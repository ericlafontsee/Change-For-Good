$(document).ready(() => {
  // Getting references to our form and inputs
  const loginForm = $("form.login");
  const eventForm = $("form.eventCreate");
  const emailInput = $("input#email");
  const passwordInput = $("input#password");
  const title = $("input#eventTitle");
  const description = $("input#eventDesc");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    console.log(userData);
    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  eventForm.on("submit", event => {
    event.preventDefault();
    const eventData = {
      title: title.val().trim(),
      description: description.val()
    };

    if (!eventData.title || !eventData.description) {
      return;
    }
    console.log(eventData);
    // If we have an email and password we run the loginUser function and clear the form
    createEvent(eventData.title, eventData.description);
    title.val("");
    description.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(() => {
        // window.location.replace("/userLanding.html");
        window.location.replace("/members");

        // If there's an error, log the error
      })
      .catch(err => {
        console.log(err);
      });
  }

  function createEvent(title, description) {
    $.post("/api/events", {
      title: title,
      description: description
    })
      .then(() => {
        // window.location.replace("/userLanding.html");
        window.location.replace("/");

        // If there's an error, log the error
      })
      .catch(err => {
        console.log(err);
      });
  }
});
