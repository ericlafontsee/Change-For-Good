//Using the blogger/author association as a reference
$(document).ready(() => {
  /* global moment */

  // eventFeed holds all of our Events
  const eventFeed = $(".eventFeed");
  const savedEventFeed = $(".savedEventFeed");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.save", handleEventEdit);
  //   $(".delete").on("click", function(event) {
  //     console.log("test");
  //     event.preventDefault();
  //     var id = $(this).attr("data-id");
  //     console.log(id);

  //     $.delete("/api/userevents/" + id, {
  //     }).then(result =>  {
  //       console.log(result);
  //             location.reload();
  //         }
  //     );
  // });//would need to make this save
  // Variable to hold our Events
  let events;
  let savedEvents;

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
    getSavedEvents();
  }

  // This function grabs Events from the database and updates the view
  function getEvents(organization) {
    organizationId = organization || "";
    if (organizationId) {
      organizationId = "/?organization_id=" + organizationId;
    }
    $.get("/api/Events" + organizationId, data => {
      events = data;
      if (!events || !events.length) {
        displayEmpty(organization);
      } else {
        initializeRows();
      }
    });
  }

  //this function grabs saved events from user and updates view
  function getSavedEvents() {
    $.get("/api/userevents/:id", data => {
      savedEvents = data.Events;
      if (!savedEvents || !savedEvents.length) {
        displaySavedEmpty(organization);
      } else {
        initializeSavedRows();
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

  //initializeSavedRows handles appending all of our constructed saved event html inside savedEventFeed
  function initializeSavedRows() {
    savedEventFeed.empty();
    const eventsToAdd = [];
    for (let i = 0; i < savedEvents.length; i++) {
      eventsToAdd.push(createNewSavedRow(savedEvents[i]));
    }
    savedEventFeed.append(eventsToAdd);
  }

  // This function constructs a event's HTML
  function createNewRow(event) {
    let formattedDate = new Date(event.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm a");
    const newEventCard = $("<div class='card'>");
    const newEventCardHeading = $(
      "<div class='card-header' style='background-color: #000C70'>"
    );
    const saveBtn = $(
      "<button class='button save btn-info' style='display: float; float: right'>"
    );
    saveBtn.text("SAVE");
    const newEventTitle = $("<h2 style='color: white'>");
    const newEventDate = $("<h6 color: black>");
    const newEventOrganization = $(
      "<h5 style='display: float; float: left; color: white'>"
    );
    newEventOrganization.text("Written by: " + event.Organization.name);
    const newEventCardBody = $("<div class='card-body'>");
    const newEventBody = $("<p>");
    newEventTitle.text(event.title + " ");
    newEventDate.text(formattedDate);
    newEventBody.text(event.description);
    // newEventCardHeading.append(deleteBtn);
    newEventCardHeading.append(saveBtn);
    newEventCardHeading.append(newEventTitle);
    newEventCardHeading.append(newEventOrganization);
    newEventCardBody.append(newEventBody);
    newEventBody.append(newEventDate);
    newEventCard.append(newEventCardHeading);
    newEventCard.append(newEventCardBody);
    newEventCard.data("event", event);
    return newEventCard;
  }

  // This function constructs a saved event's HTML
  function createNewSavedRow(savedEvents) {
    let formattedDate = new Date(savedEvents.eventDate);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm a");
    const newEventCard = $("<div class='card'>");
    const newEventCardHeading = $(
      "<div class='card-header' style='background-color: #000C70'>"
    );
    const deleteBtn = $(
      "<button class='button delete btn-danger' style='display: float; float: right'>"
    );
    deleteBtn.text("Delete");
    const newEventTitle = $("<h2 style='color: white'>");
    const newEventDate = $("<h6>");
    const newEventOrganization = $(
      "<h5 style='display: float; float: left; color: black'>"
    );
    newEventOrganization.text(savedEvents.description);
    const newEventCardBody = $("<div class='card-body'>");
    const newEventBody = $("<p>");
    newEventTitle.text(savedEvents.title + " ");
    newEventDate.text(formattedDate);
    newEventBody.append(newEventDate);
    newEventCardHeading.append(deleteBtn);
    // newEventCardHeading.append(saveBtn);
    newEventCardHeading.append(newEventTitle);
    newEventCardBody.append(newEventOrganization);
    newEventCardBody.append(newEventBody);
    newEventCard.append(newEventCardHeading);
    newEventCard.append(newEventCardBody);
    newEventCard.data("savedEvents", savedEvents);
    return newEventCard;
  }
  // This function figures out which Event we want to edit and takes it to the appropriate url
  function handleEventEdit() {
    const currentEvent = $(this)
      .parent()
      .parent()
      .data("event");

    $.post(`/api/userevents/${currentEvent.id}`).then(() => {
      location.reload();
    });
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
        ", navigate <a href='/orgLogin" +
        query +
        "'>here</a> in order to get started."
    );
    eventFeed.append(messageH2);
  }

  //this function displays a message when there are no saved events
  function displaySavedEmpty(id) {
    if (id) {
      partial = " for Organization #" + id;
    }
    savedEventFeed.empty();
    const messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No events saved yet");
    savedEventFeed.append(messageH2);
  }
});
