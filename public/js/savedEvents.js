//Using the blogger/author association as a reference
$(document).ready(() => {
  /* global moment */

  // eventFeed holds all of our Events
  const eventFeed = $(".eventFeed");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.save", handleEventEdit); //would need to make this save
  // Variable to hold our Events
  let events;

  // The code below handles the case where we want to get blog Events for a specific organization
  // Looks for a query param in the url for organization_id
  const url = window.location.search;
  let organizationId;
  if (url.indexOf("?organization_id=") !== -1) {
    //would this work with uuid
    organizationId = url.split("=")[1];
    getEvents(organizationId);
  }
  // If there's no organizationId we just get all Events as usual
  else {
    getEvents();
  }

  // This function grabs Events from the database and updates the view
  function getEvents(organization) {
    organizationId = organization || "";
    if (organizationId) {
      organizationId = "/?organization_id=" + organizationId;
    }
    $.get("/api/Events" + organizationId, data => {
      console.log("Events", data);
      events = data;
      if (!events || !events.length) {
        displayEmpty(organization);
      } else {
        initializeRows();
      }
    });
  }
  // InitializeRows handles appending all of our constructed Event HTML inside eventFeed
  function initializeRows() {
    eventFeed.empty();
    const eventsToAdd = [];
    for (let i = 0; i < events.length; i++) {
      eventsToAdd.push(createNewRow(events[i]));
    }
    eventFeed.append(eventsToAdd);
  }

  // This function constructs a event's HTML
  function createNewRow(event) {
    let formattedDate = new Date(event.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    const newEventCard = $("<div>");
    newEventCard.addClass("card");
    const newEventCardHeading = $("<div>");
    newEventCardHeading.addClass("card-header");
    // const deleteBtn = $("<button>");
    // deleteBtn.text("x");
    // deleteBtn.addClass("delete btn btn-danger");
    const saveBtn = $("<button>");
    saveBtn.text("SAVE");
    saveBtn.addClass("save btn btn-info");
    const newEventTitle = $("<h2>");
    const newEventDate = $("<small>");
    const newEventOrganization = $("<h5>");
    newEventOrganization.text("Written by: " + event.Organization.name);
    newEventOrganization.css({
      float: "right",
      color: "blue",
      "margin-top": "-10px"
    });
    const newEventCardBody = $("<div>");
    newEventCardBody.addClass("card-body");
    const newEventBody = $("<p>");
    newEventTitle.text(event.title + " ");
    newEventBody.text(event.body);
    newEventDate.text(formattedDate);
    newEventTitle.append(newEventDate);
    // newEventCardHeading.append(deleteBtn);
    newEventCardHeading.append(saveBtn);
    newEventCardHeading.append(newEventTitle);
    newEventCardHeading.append(newEventOrganization);
    newEventCardBody.append(newEventBody);
    newEventCard.append(newEventCardHeading);
    newEventCard.append(newEventCardBody);
    newEventCard.data("event", event);
    return newEventCard;
  }
  // This function figures out which Event we want to edit and takes it to the appropriate url
  function handleEventEdit() {
    const currentEvent = $(this)
      .parent()
      .parent()
      .data("event");
    window.location.href = "/cms?event_id=" + currentEvent.id;
  }

  // This function displays a message when there are no events
  function displayEmpty(id) {
    const query = window.location.search;
    let partial = "";
    if (id) {
      partial = " for Organization #" + id;
    }
    eventFeed.empty();
    const messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html(
      "No events yet" +
        partial +
        ", navigate <a href='/cms" +
        query +
        "'>here</a> in order to get started."
    );
    eventFeed.append(messageH2);
  }
});
