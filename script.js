AOS.init();

var faqs = {}

document.querySelectorAll(".faq").forEach(q => {
  up = "<i class='fas fa-caret-up' style='margin-right: 5px;'></i>"+ q.innerHTML
  down = '• '+ q.innerHTML
  q.style.cursor = "pointer"
  q.innerHTML = down

})



function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}



document.querySelector(".stamp").innerHTML = timeSince(new Date(1644936219392)) + ' ago'
