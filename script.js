// Show the form if she clicks Yes
document.getElementById('yesBtn').addEventListener('click', () => {
  document.getElementById('landing').style.display = 'none';
  document.getElementById('form-section').style.display = 'block';
});

// Show the popup if she says No
document.getElementById('noBtn').addEventListener('click', () => {
  document.getElementById('popup').style.display = 'block';
});

// Handle change in date type and load appropriate followup questions
document.getElementById('dateType').addEventListener('change', function () {
  const type = this.value;
  const followup = document.getElementById('followup');
  followup.innerHTML = '';
  if (!type) return;

  let html = '';
  switch (type) {
    case 'Dinner':
      html = `
        <label for="location">Location</label>
        <select id="location">
          <option>Spur</option>
          <option>Flave</option>
          <option>Cremosa</option>
        </select>
      `;
      break;
    case 'Movie':
      html = `
        <label for="genre">Movie Genre</label>
        <select id="genre">
          <option>Romance</option>
          <option>Comedy</option>
          <option>Action</option>
        </select>
        <label for="theater">Theater Location</label>
        <select id="theater">
          <option>Nu Mutro</option>
          <option>Levy Mall</option>
          <option>Ster-Kinekor</option>
        </select>
      `;
      break;
    case 'Sleep_Over':
      html = `
        <label for="sleepLocation">Location</label>
        <select id="sleepLocation">
          <option>Emmy's Place</option>
          <option>Lodge</option>
        </select>
      `;
      break;
    case 'Cooking':
      html = `
        <label for="cookingLocation">Location</label>
        <select id="cookingLocation">
          <option>Emmy's Place</option>
          <option>I have run out of ideas😁</option>
        </select>
        <label for="foodPref">What are we going to cook?</label>
        <input type="text" id="foodPref" placeholder="e.g. Pasta with beef, Nshima with beef etc." />
      `;
      break;
    case 'Pinic':
      html = `
        <label for="picnicLocation">Location</label>
        <input type="text" id="picnicLocation" placeholder="Put a picnic spot you know" />
        <label for="foodPref">Food</label>
        <textarea id="foodPref" rows="4" cols="50" placeholder="e.g. Strawberries, homemade sandwiches, juice, cookies, chocolate..."></textarea>
      `;
      break;
  }

  followup.innerHTML = html;
  followup.style.display = 'block';
  document.getElementById('datetime').style.display = 'block';
  document.getElementById('submit-section').style.display = 'block';
});

// Time formatter to make time friendlier
function formatTime(timeStr) {
  const [hourStr, minute] = timeStr.split(':');
  let hour = parseInt(hourStr);
  const ampm = hour >= 12 ? 'pm' : 'am';
  hour = hour % 12 || 12;
  return `${hour}:${minute}${ampm}`;
}

// Final submission for YES
function submitPlan() {
  const dateType = document.getElementById('dateType').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;

  if (!dateType || !date || !time) {
    alert("Please complete all fields.");
    return;
  }

  let message = "She said she’ll go out with you ";

  switch (dateType) {
    case 'Dinner':
      const location = document.getElementById('location').value;
      message += `for a dinner at ${location.toLowerCase()} on ${date} at ${formatTime(time)}.`;
      break;
    case 'Movie':
      const genre = document.getElementById('genre').value;
      const theater = document.getElementById('theater').value;
      message += `to ${theater} to watch a ${genre.toLowerCase()} movie on ${date} at ${formatTime(time)}.`;
      break;
    case 'Sleep_Over':
      const sleepLocation = document.getElementById('sleepLocation').value;
      message += `for a sleep over at ${sleepLocation.toLowerCase()} on ${date} at ${formatTime(time)}.`;
      break;
    case 'Cooking':
      const cookingLocation = document.getElementById('cookingLocation').value;
      const cookingPref = document.getElementById('foodPref').value;
      message += `to prepare ${cookingPref.toLowerCase()} at the ${cookingLocation.toLowerCase()} on ${date} at ${formatTime(time)}.`;
      break;
    case 'Pinic':
      const picnicLocation = document.getElementById('picnicLocation').value;
      const foodPref = document.getElementById('foodPref').value;
      message += `for a ${foodPref.toLowerCase()} picnic at the ${picnicLocation.toLowerCase()} on ${date} at ${formatTime(time)}.`;
      break;
    default:
      message += `on ${date} at ${formatTime(time)}.`;
  }

  window.emailjs.send("service_jvalr9p", "template_b0wi9uh", {
    message: message,
    to_email: "simpandemoses6@gmail.com"
  })
  .then(function (response) {
    console.log("SUCCESS!", response.status, response.text);
    alert("Message sent successfully!");

    // 🎉 Show only confetti for YES
    document.getElementById('confetti').style.display = 'block';
    document.getElementById('no').style.display = 'none';
  }, function (error) {
    console.error("FAILED...", error);
    alert("Something went wrong. Try again.");
  });
}

// Handle rejection or unsure ("I'm sure" or "Maybe yes?")
function sendEmail(choice) {
  let message = choice === 'no'
    ? "I am sorry I can't go out with you."
    : "I’m not so sure, maybe yes? 💖";

  window.emailjs.send("service_jvalr9p", "template_b0wi9uh", {
    message: message,
    to_email: "simpandemoses6@gmail.com"
  })
  .then(function (response) {
    console.log("SUCCESS!", response.status, response.text);
    alert("Message sent successfully!");

    if (choice === 'no') {
      document.getElementById('no').style.display = 'block';
      document.getElementById('confetti').style.display = 'none';
    } else {
      document.getElementById('confetti').style.display = 'block';
      document.getElementById('no').style.display = 'none';
    }
  }, function (error) {
    console.error("FAILED...", error);
    alert("Something went wrong. Try again.");
  });
}
