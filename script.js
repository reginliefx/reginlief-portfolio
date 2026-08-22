// บังคับให้จอกลับไปบนสุดทุกครั้งที่มีการรีเฟรชหน้าเว็บ
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// 1. ระบบ Navbar เลื่อนหน้าจอ (Dynamic Style)
const navContainer = document.getElementById('navbar-container');
const navBar = document.getElementById('navbar');

const musicToggle = document.getElementById("musicToggle");
const audioPlayer = document.getElementById("audioPlayer");
const volumeControl = document.getElementById("volumeControl");
const nowPlaying = document.getElementById("nowPlaying");

let isPlaying = false;

/* ==========================
   SCROLL REVEAL EFFECT 
   ========================== */
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 50;

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("DOMContentLoaded", () => { revealOnScroll(); });
window.addEventListener("load", () => { revealOnScroll(); });

if (audioPlayer) {
  audioPlayer.volume = 0.35;
}

musicToggle?.addEventListener("click", () => {
  if (!audioPlayer) return;

  if (isPlaying) {
    audioPlayer.pause();
    isPlaying = false;
    musicToggle.textContent = "▶";
    nowPlaying.textContent = "Lasting Happiness To You";
  } else {
    audioPlayer.play().then(() => {
      isPlaying = true;
      musicToggle.textContent = "⏸";
      nowPlaying.textContent = "Playing Now...";
    }).catch(err => {
      console.log("Autoplay blocked or error:", err);
    });
  }
});

volumeControl?.addEventListener("input", () => {
  if (!audioPlayer) return;
  audioPlayer.volume = volumeControl.value / 100;
  localStorage.setItem("portfolioVolume", volumeControl.value);
});

const savedVolume = localStorage.getItem("portfolioVolume");
if (savedVolume !== null && volumeControl && audioPlayer) {
  volumeControl.value = savedVolume;
  audioPlayer.volume = savedVolume / 100;
}

if (document.getElementById("typed-text")) {
  new Typed("#typed-text", {
    strings: [
      "Graphic Designer",
      "CS-Student"
    ],
    typeSpeed: 70,   
    backSpeed: 70,   
    backDelay: 1500, 
    loop: true       
  });
}

const carouselImages = document.querySelectorAll('.carousel-img');
let currentImageIndex = 0;

if (carouselImages.length > 0) {
  setInterval(() => {
    carouselImages[currentImageIndex].classList.remove('opacity-100');
    carouselImages[currentImageIndex].classList.add('opacity-0');

    currentImageIndex = (currentImageIndex + 1) % carouselImages.length;

    carouselImages[currentImageIndex].classList.remove('opacity-0');
    carouselImages[currentImageIndex].classList.add('opacity-100');
  }, 3500);
}

/* ==========================
   VISITOR COUNTER (CounterAPI v2 Global)
   ========================== */
async function updateVisitorCount() {
  const counterElement = document.getElementById('visitorCount');
  if (!counterElement) return;

  try {
    // ใช้ลิงก์ Endpoint จากหน้า API Usage ของคุณโดยตรง
    const response = await fetch('https://api.counterapi.dev/v2/reginliefs-team-5211/reginlief-views/up');
    const data = await response.json();
    
    let views = 0;
    if (data.data && typeof data.data.value !== 'undefined') {
      views = data.data.value;
    } else if (typeof data.value !== 'undefined') {
      views = data.value;
    } else if (typeof data.count !== 'undefined') {
      views = data.count;
    }
    
    counterElement.textContent = Number(views).toLocaleString();
  } catch (error) {
    console.error("CounterAPI error:", error);
    counterElement.textContent = "0";
  }
}

document.addEventListener("DOMContentLoaded", updateVisitorCount);

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navContainer.className = "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 pt-4 md:pt-6";
    navBar.className = "flex justify-between items-center transition-all duration-300 mx-auto px-6 py-4 max-w-5xl backdrop-blur-xl bg-black/40 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] rounded-full";
  } else {
    navContainer.className = "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-0 pt-0";
    navBar.className = "flex justify-between items-center transition-all duration-300 mx-auto px-8 py-6 max-w-7xl bg-transparent border-transparent";
  }
});

function openTab(event, tabName) {
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active', 'text-white', 'border-b-2', 'border-pink-500');
    btn.classList.add('text-zinc-500');
  });

  document.getElementById(tabName).classList.add('active');
  
  event.currentTarget.classList.add('active', 'text-white', 'border-b-2', 'border-pink-500');
  event.currentTarget.classList.remove('text-zinc-500');
}

document.addEventListener("DOMContentLoaded", () => {
  if (typeof VanillaTilt !== "undefined") {
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"));
  }
});