// Wait for the page to finish loading before running the code
$(document).ready(function() {
  // Display the current date and time at the top of the page
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY, h:mm A"));

  // Get the current hour in 24-hour format
  const currentHour = dayjs().hour();

  // Loop through each time-block div and apply the appropriate class based on the current hour
  $(".time-block").each(function() {
    // Extract the hour from the id attribute of the time-block div
    const hour = parseInt($(this).attr("id").split("-")[1]);

    // If the hour is before the current hour, add the "past" class
    if (hour < currentHour) {
      $(this).addClass("past").removeClass("present future");
    }
    // If the hour is the same as the current hour, add the "present" class
    else if (hour === currentHour) {
      $(this).addClass("present").removeClass("past future");
    }
    // If the hour is after the current hour, add the "future" class
    else {
      $(this).addClass("future").removeClass("past present");
    }
  });

  // Save button event listener
  $(".saveBtn").on("click", function() {
    // Get the value of the sibling textarea
    const text = $(this).siblings(".description").val();
    // Get the id of the parent time-block div
    const id = $(this).parent().attr("id");
    // Save the text and id to local storage
    localStorage.setItem(id, text);
  });

  // Loop through each time-block div and retrieve its saved text from local storage
  $(".time-block").each(function() {
    const id = $(this).attr("id");
    const text = localStorage.getItem(id);
    // If there is saved text, display it in the textarea
    if (text !== null) {
      $(this).children(".description").val(text);
    }
  });
});
