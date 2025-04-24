function getStarted() {
    // Replace with your actual route
    window.location.href = "http://localhost:5173/signup"; 
}

document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('open');
  });
});

setInterval(() => {
  window.location.reload();
}, 60000); 
