AOS.init();

var faqs = {}

document.querySelectorAll(".faq").forEach(q => {
  up = "<i class='fas fa-caret-up' style='margin-right: 5px;'></i>"+ q.innerHTML
  down = '• '+ q.innerHTML
  q.style.cursor = "pointer"
  q.innerHTML = down

})