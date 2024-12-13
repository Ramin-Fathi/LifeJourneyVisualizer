// Constants for life calculations
const MAX_YEARS = 85; // Average lifespan
const WEEKS_IN_YEAR = 52;
const TOTAL_WEEKS = MAX_YEARS * WEEKS_IN_YEAR;

// Function to calculate and display life progress
function calculateLifeProgress() {
  const birthdateInput = document.getElementById("birthdate").value; // Get birthdate input
  if (!birthdateInput) {
    alert("Please enter your date of birth!"); // Alert if no input is provided
    return;
  }

  const birthdate = new Date(birthdateInput);
  const today = new Date();

  // Calculate time differences
  const ageInMilliseconds = today - birthdate;
  const weeksPassed = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 7));
  const percentagePassed = Math.min((weeksPassed / TOTAL_WEEKS) * 100, 100);

  const yearsPassed = Math.floor(weeksPassed / WEEKS_IN_YEAR);
  const monthsPassed = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 30.44));
  const daysPassed = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24));
  const hoursPassed = Math.floor(ageInMilliseconds / (1000 * 60 * 60));
  const minutesPassed = Math.floor(ageInMilliseconds / (1000 * 60));
  const secondsPassed = Math.floor(ageInMilliseconds / 1000);

  const yearsRemaining = MAX_YEARS - yearsPassed;
  const monthsRemaining = yearsRemaining * 12 - (monthsPassed % 12);
  const weeksRemaining = TOTAL_WEEKS - weeksPassed;
  const daysRemaining = Math.floor(yearsRemaining * 365.25 - (daysPassed % 365.25));
  const hoursRemaining = daysRemaining * 24 - (hoursPassed % 24);
  const minutesRemaining = hoursRemaining * 60 - (minutesPassed % 60);
  const secondsRemaining = minutesRemaining * 60 - (secondsPassed % 60);

  // Update progress bar width
  const progressBar = document.getElementById("progress-bar");
  progressBar.style.width = `${percentagePassed}%`;

  // Update life stats
  document.getElementById("years").textContent = `Years: ${yearsPassed} passed, ${yearsRemaining} remaining`;
  document.getElementById("months").textContent = `Months: ${monthsPassed} passed, ${monthsRemaining} remaining`;
  document.getElementById("weeks").textContent = `Weeks: ${weeksPassed} passed, ${weeksRemaining} remaining`;
  document.getElementById("days").textContent = `Days: ${daysPassed} passed, ${daysRemaining} remaining`;
  document.getElementById("hours").textContent = `Hours: ${hoursPassed} passed, ${hoursRemaining} remaining`;
  document.getElementById("minutes").textContent = `Minutes: ${minutesPassed} passed, ${minutesRemaining} remaining`;
  document.getElementById("seconds").textContent = `Seconds: ${secondsPassed} passed, ${secondsRemaining} remaining`;

  // Update life grid (checkboxes)
  const lifeGrid = document.getElementById("life-grid");
  lifeGrid.innerHTML = ""; // Clear previous grid

  for (let year = 0; year < MAX_YEARS; year++) {
    for (let week = 0; week < WEEKS_IN_YEAR; week++) {
      const box = document.createElement("div");
      box.classList.add("box");
      const currentWeek = year * WEEKS_IN_YEAR + week;
      if (currentWeek < weeksPassed) {
        box.classList.add("passed");
        box.style.backgroundColor = getBoxColor(currentWeek, weeksPassed, TOTAL_WEEKS);
      } else {
        box.classList.add("future");
      }
      lifeGrid.appendChild(box);
    }
  }

  updateEncouragingMessages(yearsPassed);
}

// Function to generate color gradient based on life stage
function getBoxColor(currentWeek, weeksPassed, totalWeeks) {
  const progress = currentWeek / totalWeeks;
  if (progress < 0.3) return "#4CAF50"; // Green for early life
  if (progress < 0.7) return "#FFC107"; // Yellow for middle life
  return "#2196F3"; // Blue for later life
}

// Function to update encouraging messages
function updateEncouragingMessages(yearsPassed) {
  const ageGroupMessage = document.getElementById("age-group-message");
  const opportunityList = document.getElementById("opportunity-list");

  opportunityList.innerHTML = ""; // Clear previous messages

  let ageGroup = "";
  let opportunities = [];

  if (yearsPassed < 13) {
    ageGroup = "Childhood";
    opportunities = [
      "Discover new hobbies and interests.",
      "Spend quality time with family.",
      "Learn basic life skills.",
      "Explore creativity through art or music.",
      "Make new friends and strengthen bonds.",
    ];
  } else if (yearsPassed < 20) {
    ageGroup = "Teenage Years";
    opportunities = [
      "Focus on education and career planning.",
      "Build healthy habits for the future.",
      "Explore your passions and talents.",
      "Learn financial responsibility.",
      "Volunteer and give back to the community.",
    ];
  } else if (yearsPassed < 40) {
    ageGroup = "Adulthood";
    opportunities = [
      "Advance your career or start a new one.",
      "Travel and experience new cultures.",
      "Build meaningful relationships.",
      "Invest in personal development.",
      "Start a family or strengthen family ties.",
    ];
  } else if (yearsPassed < 60) {
    ageGroup = "Middle Age";
    opportunities = [
      "Pursue hobbies you've always wanted to try.",
      "Mentor younger generations.",
      "Focus on health and wellness.",
      "Explore new professional challenges.",
      "Travel to places you've dreamed of visiting.",
    ];
  } else {
    ageGroup = "Golden Years";
    opportunities = [
      "Share your wisdom and experiences.",
      "Spend quality time with loved ones.",
      "Pursue lifelong learning opportunities.",
      "Focus on relaxation and enjoying life.",
      "Contribute to your community or charity.",
    ];
  }

  ageGroupMessage.textContent = `You are in your ${ageGroup}. Here are some opportunities to embrace:`;

  opportunities.forEach((opportunity) => {
    const listItem = document.createElement("li");
    listItem.textContent = opportunity;
    opportunityList.appendChild(listItem);
  });
}
