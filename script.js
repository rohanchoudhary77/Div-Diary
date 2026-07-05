const calendarGrid = document.getElementById('calendarGrid');
const diarySection = document.getElementById('diarySection');
const selectedDateText = document.getElementById('selectedDateText');
const routineInput = document.getElementById('routineInput');
const monthYearTitle = document.getElementById('monthYearTitle');
const lockScreen = document.getElementById('lockScreen');
const welcomeScreen = document.getElementById('welcomeScreen');
const mainApp = document.getElementById('mainApp');
const heartsContainer = document.getElementById('heartsContainer');
const dailyQuoteBox = document.getElementById('dailyQuoteBox');
const passwordInput = document.getElementById('passwordInput');
const errorMessage = document.getElementById('errorMessage');

let selectedDate = null;

const today = new Date();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
monthYearTitle.innerText = `${months[currentMonth]} ${currentYear}`;

const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

// 1. Password Verification Function
function checkPassword() {
    
    const correctPassword = "Divya@Rohan"; 
    
    if (passwordInput.value === correctPassword) {
        lockScreen.style.opacity = '0';
        setTimeout(() => {
            lockScreen.style.display = 'none';
            welcomeScreen.style.display = 'flex'; 
        }, 500);
    } else {
        errorMessage.style.display = 'block';
        passwordInput.value = ""; 
    }
}

// Event listener for the Enter key to unlock
passwordInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        checkPassword();
    }
});

// 2. Switch from Welcome Screen to Main App
function startApp() {
    welcomeScreen.style.opacity = '0';
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
        mainApp.style.display = 'block';
        startHeartRain(); 
    }, 500);
}

// Generate Calendar Days Dynamically
for (let i = 1; i <= daysInMonth; i++) {
    const dayButton = document.createElement('div');
    dayButton.classList.add('calendar-day');
    dayButton.innerText = i;
    dayButton.onclick = () => openDiaryForDate(i, dayButton);
    calendarGrid.appendChild(dayButton);
}

// Function to fetch a 100% random quote from the internet
async function fetchLifetimeQuote() {
    dailyQuoteBox.innerText = "✨🦋 Generating a new magical quote for my princess... 🦋✨";
    try {
        const response = await fetch('https://api.adviceslip.com/advice', { cache: 'no-store' });
        if (response.ok) {
            const data = await response.json();
            dailyQuoteBox.innerText = `“${data.slip.advice}”`;
        } else {
            throw new Error("API Issue");
        }
    } catch (error) {
        const fallbackQuotes = [
            "“Believe you can and you're halfway there. ✨”",
            "“Every day is a fresh start to write a beautiful story. 🌸”",
            "“Your smile can brighten up the darkest days. Keep smiling! 😊”",
            "“Make today so awesome that yesterday gets jealous. 🌟”"
        ];
        const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
        dailyQuoteBox.innerText = fallbackQuotes[randomIndex];
    }
}

// Open Diary for the Selected Date
function openDiaryForDate(day, element) {
    selectedDate = `${currentYear}-${currentMonth + 1}-${day}`;
    
    document.querySelectorAll('.calendar-day').forEach(el => el.classList.remove('active'));
    element.classList.add('active');

    selectedDateText.innerText = `Date: ${day} ${months[currentMonth]}`;
    diarySection.style.display = 'block';

    fetchLifetimeQuote();

    const savedData = localStorage.getItem(selectedDate);
    routineInput.value = savedData ? savedData : "";
}

function saveRoutine() {
  if (selectedDate) {
    localStorage.setItem(selectedDate, routineInput.value);
    
    // Get our beautiful custom pink notification
    const toast = document.getElementById("customToast");

    // Show the pink notification
    toast.style.display = "block";

    // Automatically hide it after 3 seconds
    setTimeout(() => {
      toast.style.display = "none";
    }, 3000);
  }
}

// Floating Hearts Generator Logic
function startHeartRain() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 2 + 's'; 
        heart.style.fontSize = Math.random() * 15 + 15 + 'px'; 
        
        const colors = ['#ff477e', '#ff7096', '#ff8fab', '#ff0a54'];
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];

        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }, 300); 
}
