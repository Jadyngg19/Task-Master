// Wrap all code that interacts with the DOM in a call to jQuery to ensure that the code isn't run until the browser has finished rendering all the elements in the HTML.
$(document).ready(function() {

  // Set the current date and time using day.js
  var currentTime = dayjs();
  $("#currentDay").text(currentTime.format("dddd, MMMM D, YYYY, H:m"));

  console.log(currentTime.hour()); 
  
  // Check the time and update the time block classes
  $(".time-block").each(function() {
  var blockHour = parseInt($(this).attr("id").split("-")[1]);
    // If the block hour is less than the current hour, add the "past" class
    if (blockHour < currentTime.hour()) {
      $(this).addClass("past");
      $(this).removeClass("present");
      $(this).removeClass("future");
    }
    // If the block hour is equal to the current hour, add the "present" class
    else if (blockHour === currentTime.hour()) {
      $(this).removeClass("past");
      $(this).addClass("present");
      $(this).removeClass("future");
    }
    // If the block hour is greater than the current hour, add the "future" class
    else {
      $(this).removeClass("past");
      $(this).removeClass("present");
      $(this).addClass("future");
    }
  }); 

// Load any saved data from localStorage
$(".description").each(function() {
var id = $(this).closest(".time-block").attr("id");
var schedule = localStorage.getItem(id);
if (schedule !== null) {
  $(this).text(schedule);
}
});

// Save button functionality
$(".saveBtn").on("click", function() {
    var id = $(this).closest(".time-block").attr("id");
    var schedule = $(this).siblings(".description").val();
    localStorage.setItem(id, schedule);
  });
});
