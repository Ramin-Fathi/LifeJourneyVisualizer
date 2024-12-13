// Constants for calculation
const MAX_YEARS = 80; // Average life expectancy
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

  // Calculate weeks passed
  const ageInMilliseconds = today - birthdate;
  const weeksPassed = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 7));

  // Calculate percentage
  const percentagePassed = Math.min((weeksPassed / TOTAL_WEEKS) * 100, 100);

  // Update Progress Bar
  const progressBar = document.getElementById("progress-bar");
  progressBar.style.width = `${percentagePassed}%`;

  // Update Progress Text
  const progressText = document.getElementById("progress-text");
  progressText.textContent = `You've lived ${weeksPassed} weeks (${percentagePassed.toFixed(
    2
  )}% of your expected life).`;

  // Update Life Grid
  const lifeGrid = document.getElementById("life-grid");
  lifeGrid.innerHTML = ""; // Clear previous grid

  for (let i = 0; i < TOTAL_WEEKS; i++) {
    const box = document.createElement("div");
    box.classList.add("box");
    if (i < weeksPassed) {
      box.classList.add("passed");
    }
    lifeGrid.appendChild(box);
  }
}

// Add event listener to button
document.querySelector("button").addEventListener("click", calculateLifeProgress);

