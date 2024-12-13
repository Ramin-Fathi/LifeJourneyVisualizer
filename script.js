// Constants for calculation
const MAX_YEARS = 85; // Average life expectancy
const WEEKS_IN_YEAR = 52;
const TOTAL_WEEKS = MAX_YEARS * WEEKS_IN_YEAR;

// Function to calculate and display progress
function calculateLifeProgress() {
  const birthdateInput = document.getElementById("birthdate").value; // Get birthdate input
  if (!birthdateInput) {
    alert("Please enter your date of birth!"); // Alert if no date entered
    return;
  }

  const birthdate = new Date(birthdateInput);
  const today = new Date();

  // Calculate differences
  const ageInMilliseconds = today - birthdate;
  const weeksPassed = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 7));
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

  // Update Progress Bar
  const progressBar = document.getElementById("progress-bar");
  progressBar.style.width = `${(weeksPassed / TOTAL_WEEKS) * 100}%`;

  // Update Progress Text
  const progressText = document.getElementById("progress-text");
  progressText.textContent = `You've lived ${weeksPassed} weeks (${(
    (weeksPassed / TOTAL_WEEKS) *
    100
  ).toFixed(2)}% of your expected life).`;

  // Update Life Stats
  document.getElementById("years").textContent = `Years: ${yearsPassed} passed, ${yearsRemaining} remaining`;
  document.getElementById("months").textContent = `Months: ${monthsPassed} passed, ${monthsRemaining} remaining`;
  document.getElementById("weeks").textContent = `Weeks: ${weeksPassed} passed, ${weeksRemaining} remaining`;
  document.getElementById("days").textContent = `Days: ${daysPassed} passed, ${daysRemaining} remaining`;
  document.getElementById("hours").textContent = `Hours: ${hoursPassed} passed, ${hoursRemaining} remaining`;
  document.getElementById("minutes").textContent = `Minutes: ${minutesPassed} passed, ${minutesRemaining} remaining`;
  document.getElementById("seconds").textContent = `Seconds: ${secondsPassed} passed, ${secondsRemaining} remaining`;

  // Update Life Grid
  const lifeGrid = document.getElementById("life-grid");
  lifeGrid.innerHTML = ""; // Clear previous grid

  for (let year = 0; year < MAX_YEARS; year++) {
    for (let week = 0; week < WEEKS_IN_YEAR; week++) {
      const box = document.createElement("div");
      box.classList.add("box");
      if (year * WEEKS_IN_YEAR + week < weeksPassed) {
        box.classList.add("passed");
      }
      lifeGrid.appendChild(box);
    }
  }
}
