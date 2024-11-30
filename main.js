let currentSlideIndex = 0;
const slides = document.querySelectorAll(".slide");
const images = document.querySelectorAll(".slide img");
const dots = document.querySelectorAll(".dot");
const fullscreen = document.getElementById("fullscreen");
const fullscreenImage = document.getElementById("fullscreenImage");
let slideInterval;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? "block" : "none";
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

// Change the slide (to the right or left)
function changeSlide(direction) {
  currentSlideIndex =
    (currentSlideIndex + direction + slides.length) % slides.length;
  showSlide(currentSlideIndex);
}

// Set the slide when a dot is clicked
function setSlide(index) {
  currentSlideIndex = index;
  showSlide(currentSlideIndex);
}

// Stop autoplay
function startAutoplay() {
  slideInterval = setInterval(() => changeSlide(1), 3000);
}

// Start autoplay
function stopAutoplay() {
  clearInterval(slideInterval);
}

images.forEach((image) => {
  image.addEventListener("click", function () {
    openFullscreen(image);
  });
});
function openFullscreen(img) {
  fullscreenImage.src = img.src;
  fullscreen.style.display = "flex";
}

function closeFullscreen() {
  fullscreen.style.display = "none";
}

fullscreen.addEventListener("click", function (event) {
  if (event.target === fullscreen || event.target.classList.contains("close")) {
    closeFullscreen();
  }
});

// Add an event listener to stop autoplay on manual interaction.
document.querySelector(".slider").addEventListener("mouseover", stopAutoplay);
document.querySelector(".slider").addEventListener("mouseout", startAutoplay);

showSlide(currentSlideIndex);
startAutoplay();
