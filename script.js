// Constants for life calculations
const MAX_YEARS = 90; // Average lifespan
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
  const percentageRemaining = 100 - percentagePassed;

  console.log(`Weeks Passed: ${weeksPassed}, Total Weeks: ${TOTAL_WEEKS}, Percentage Passed: ${percentagePassed}%`);

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

  // Update progress bar width and color
  const progressBar = document.getElementById("progress-bar");
  if (progressBar) {
    progressBar.style.width = `${percentagePassed}%`;
    progressBar.style.backgroundColor = getProgressColor(percentagePassed);
  } else {
    console.error("Element with ID 'progress-bar' not found in the DOM.");
  }

  // Update progress text
  const progressText = document.getElementById("progress-text");
  if (progressText) {
    progressText.textContent = `${percentagePassed.toFixed(2)}% of your life has passed, ${percentageRemaining.toFixed(2)}% remaining.`;
  }

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

// Function to determine progress bar color based on percentage
function getProgressColor(percentage) {
  if (percentage < 30) return "#4CAF50"; // Green
  if (percentage < 70) return "#FFC107"; // Yellow
  return "#c44cf7"; // Red
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
        "🎨 **Discover new hobbies and interests.** It takes just one week to start learning a new skill like painting, writing, or sports. Many great artists and athletes began exploring their talents at this age.",
        "👨‍👩‍👧‍👦 **Spend quality time with family** and build strong bonds. This is the foundation for lifelong support and love.",
        "🍳 **Learn basic life skills** such as cooking, organizing, or managing simple tasks. These small steps lead to independence.",
        "🎶 **Explore creativity** through art, music, or games. Creativity at a young age opens doors to innovation later in life.",
        "🤝 **Make new friends** and strengthen social bonds. Friendships formed now often last a lifetime."
    ];
} else if (yearsPassed < 20) {
    ageGroup = "Teenage Years";
    opportunities = [
        "📚 **Focus on education and career planning.** These years set the foundation for your future success.",
        "💪 **Build healthy habits for the future.** Regular exercise and a balanced diet can become lifelong practices.",
        "✨ **Explore your passions and talents.** Join clubs, participate in competitions, and discover what excites you.",
        "💵 **Learn financial responsibility.** Start saving, budgeting, or even earning through small jobs.",
        "🌍 **Volunteer and give back to the community.** A month of community work can create lasting impacts and connections."
    ];
} else if (yearsPassed < 40) {
    ageGroup = "Adulthood";
    opportunities = [
        "💼 **Advance your career or start a new one.** Take courses, network, and aim for professional growth.",
        "✈️ **Travel and experience new cultures.** A single trip can broaden your perspective and inspire fresh ideas.",
        "🤝 **Build meaningful relationships.** Invest time in friendships, partnerships, and family bonds.",
        "📖 **Invest in personal development.** Read books, attend workshops, or learn new skills.",
        "👨‍👩‍👧‍👦 **Start a family or strengthen existing relationships.** Building a strong support system is invaluable."
    ];
} else if (yearsPassed < 60) {
    ageGroup = "Middle Adulthood";
    opportunities = [
        "🎨 **Pursue hobbies you’ve always wanted to try.** Dedicate time to activities that bring joy and fulfillment.",
        "👨‍🏫 **Mentor younger generations.** Share your experiences and guide others towards success.",
        "🏋️‍♂️ **Focus on health and wellness.** Establish a fitness routine and prioritize mental health.",
        "🚀 **Embrace new professional challenges.** Start a business or explore a new career path.",
        "🌍 **Travel to dream destinations.** Experiencing different places can refresh your perspective."
    ];
} else {
    ageGroup = "Golden Years";
    opportunities = [
        "📜 **Share your wisdom and experiences.** Document your stories to inspire others.",
        "❤️ **Spend quality time with loved ones.** Create memorable moments with family and friends.",
        "🧠 **Engage in lifelong learning.** Take up a course, learn a language, or explore a new subject.",
        "🌼 **Focus on relaxation and enjoying life.** Dedicate time to activities that bring you happiness.",
        "🤝 **Contribute to your community or charities.** Participate in meaningful projects that make a difference."
    ];
}

opportunities.push("🌟 ***Remember: Life’s boxes are limited but always enough to achieve greatness. Start today, plan well, and witness your progress with each step. It’s the small, consistent actions that lead to monumental achievements.***");




  ageGroupMessage.textContent = `You are in your ${ageGroup}. Here are some opportunities to embrace:`;

  opportunities.forEach((opportunity) => {
    const listItem = document.createElement("li");
    listItem.textContent = opportunity;
    opportunityList.appendChild(listItem);
  });
}
