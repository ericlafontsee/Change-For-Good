const uuid = require("uuid");
$(document).ready(() => {
  // Getting references to our form and input
  const createEventForm = $("form.createEvent");
  // const button = $("button.loginBtn");
  const titleInput = $("input#title");
  const monthInput = $("input#inputMonth");
  const dayInput = $("input#inputDay");
  const yearInput = $("input#inputYear");
  const dateInput = monthInput + dayInput + yearInput;
  const descriptionInput = $("input#description");

  // When the signup button is clicked, we validate the email and password are not blank
  createEventForm.on("submit", (event) => {
    event.preventDefault();
    const eventData = {
      id: UUID(),
      title: titleInput.val().trim(),
      eventDate: dateInput, //?
      description: descriptionInput.val().trim(),
      organization: $(this).OrganizationId, //??
    };
    console.log(eventData);
    if (!eventData.title || !eventData.description) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    addEvent(
      eventData.id,
      eventData.title,
      eventData.eventDate,
      eventData.description
    );
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function addEvent(id, title, eventDate, description) {
    $.post("/api/events", {
      id,
      title,
      eventDate,
      description,
    })
      .then(() => {
        window.location.replace("/orgLanding.html");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }
});
