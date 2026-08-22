// 1. ระบบ Navbar เลื่อนหน้าจอ (Dynamic Style)
const navContainer = document.getElementById('navbar-container');
const navBar = document.getElementById('navbar');

const musicToggle = document.getElementById("musicToggle");
const audioPlayer = document.getElementById("audioPlayer");
const volumeControl = document.getElementById("volumeControl");
const nowPlaying = document.getElementById("nowPlaying");

let isPlaying = false;

// บังคับให้จอกลับไปบนสุดทุกครั้งที่มีการรีเฟรชหน้าเว็บ
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

/* ==========================
   SCROLL REVEAL EFFECT 
   ========================== */
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 50; // ระยะห่างจากขอบจอก่อนจะเริ่มแสดงผล

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add("active");
    }
  });
}

// ตรวจจับตอนเลื่อนหน้าจอ
window.addEventListener("scroll", revealOnScroll);

// สั่งทำงานทันทีเมื่อหน้าเว็บโหลดเสร็จ
window.addEventListener("DOMContentLoaded", () => {
  revealOnScroll();
});

// เผื่อกรณีโหลดรูปภาพเสร็จช้า ให้ลองเช็คซ้ำอีกรอบ
window.addEventListener("load", () => {
  revealOnScroll();
});

// ตั้งค่าความดังเริ่มต้น
if (audioPlayer) {
  audioPlayer.volume = 0.35;
}

// ควบคุมการกดปุ่ม Play / Pause
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

// ควบคุมระดับเสียง (Volume Slider)
volumeControl?.addEventListener("input", () => {
  if (!audioPlayer) return;
  audioPlayer.volume = volumeControl.value / 100;
  localStorage.setItem("portfolioVolume", volumeControl.value);
});

// โหลดค่าระดับเสียงเดิมที่เคยปรับไว้ล่าสุด
const savedVolume = localStorage.getItem("portfolioVolume");
if (savedVolume !== null && volumeControl && audioPlayer) {
  volumeControl.value = savedVolume;
  audioPlayer.volume = savedVolume / 100;
}

// ตั้งค่าอนิเมชันพิมพ์ดีด (Typed.js)
if (document.getElementById("typed-text")) {
  new Typed("#typed-text", {
    strings: [
      "Graphic Designer",
      "CS-Student"
    ],
    typeSpeed: 70,   // ความเร็วในการพิมพ์ (มิลลิวินาที)
    backSpeed: 70,   // ความเร็วในการลบข้อความ
    backDelay: 1500, // เวลารอก่อนจะลบข้อความ (1.5 วินาที)
    loop: true       // วนลูปไปเรื่อยๆ ไม่มีวันหยุด
  });
}

// --- 2. ระบบหมุนเวียนรูปภาพ (Carousel) ---
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
   VISITOR COUNTER (CounterAPI v2)
   ========================== */
async function updateVisitorCount() {
  const counterElement = document.getElementById('visitorCount');
  if (!counterElement) return;

  try {
    const response = await fetch('https://api.counterapi.dev/v2/reginlief-views/up');
    const data = await response.json();
    
    const views = data.data ? data.data.value : data.value;
    counterElement.textContent = Number(views).toLocaleString();
  } catch (error) {
    console.error("CounterAPI error:", error);
    counterElement.textContent = "0";
  }
}

document.addEventListener("DOMContentLoaded", updateVisitorCount);







window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    // เมื่อเลื่อนลงมาเกิน 50px (เป็นกล่องแคปซูล)
    navContainer.className = "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 pt-4 md:pt-6";
    navBar.className = "flex justify-between items-center transition-all duration-300 mx-auto px-6 py-4 max-w-5xl backdrop-blur-xl bg-black/40 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] rounded-full";
  } else {
    // เมื่ออยู่บนสุด (โปร่งใส)
    navContainer.className = "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-0 pt-0";
    navBar.className = "flex justify-between items-center transition-all duration-300 mx-auto px-8 py-6 max-w-7xl bg-transparent border-transparent";
  }
});

// 2. ระบบ Tab ในส่วน About Me
function openTab(event, tabName) {
  // ซ่อนเนื้อหาทั้งหมดก่อน
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });

  // เอาสไตล์ปุ่ม active (ขีดเส้นใต้สีชมพู) ออกจากทุกปุ่ม
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active', 'text-white', 'border-b-2', 'border-pink-500');
    btn.classList.add('text-zinc-500');
  });

  // แสดงเนื้อหาเฉพาะ ID ที่เลือก
  document.getElementById(tabName).classList.add('active');
  
  // ไฮไลต์ปุ่มที่ถูกกด
  event.currentTarget.classList.add('active', 'text-white', 'border-b-2', 'border-pink-500');
  event.currentTarget.classList.remove('text-zinc-500');
}

// 3. เริ่มต้นการทำงานของ Vanilla-Tilt (เอฟเฟกต์ 3D รูปโปรไฟล์)
document.addEventListener("DOMContentLoaded", () => {
  VanillaTilt.init(document.querySelectorAll("[data-tilt]"));
});