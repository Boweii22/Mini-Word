let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");
let characCount = document.getElementById("charac-count");
let wordCount = document.getElementById("word-count");

// List of font names
let fontList = [
  "Arial",
  "Verdana",
  "Times New Roman",
  "Garamond",
  "Georgia",
  "Courier New",
  "cursive",
];

// Update character and word count
const updateCounts = () => {
  const text = writingArea.innerText || writingArea.textContent;

  characCount.textContent = text.length;

  // Remove HTML tags if any, and trim spaces for accurate word count
  const plainText = text.replace(/<[^>]*>/g, '').trim();
  wordCount.textContent = plainText.split(/\s+/).filter(Boolean).length;
};

writingArea.addEventListener("input", updateCounts);

// Initialize settings
const initializer = () => {
  highlighter(alignButtons, true);
  highlighter(spacingButtons, true);
  highlighter(formatButtons, false);
  highlighter(scriptButtons, true);

  // Create options for font names
  fontList.forEach((value) => {
    let option = document.createElement("option");
    option.value = value;
    option.innerHTML = value;
    fontName.appendChild(option);
  });

  // Font sizes from 1 to 7
  for (let i = 1; i <= 7; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    fontSizeRef.appendChild(option);
  }

  // Default font size
  fontSizeRef.value = 3;
};

// Apply text modification commands
const modifyText = (command, defaultUi, value) => {
  document.execCommand(command, defaultUi, value);
};

// Handle basic operations
optionsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modifyText(button.id, false, null);
  });
});

// Handle advanced operations
advancedOptionButton.forEach((button) => {
  button.addEventListener("change", () => {
    modifyText(button.id, false, button.value);
  });
});

// Handle link creation
linkButton.addEventListener("click", () => {
  let userLink = prompt("Enter a URL");
  if (userLink) {
    if (!/https?:\/\//i.test(userLink)) {
      userLink = "http://" + userLink;
    }
    modifyText("createLink", false, userLink);
  }
});

// Highlight buttons
const highlighter = (className, needsRemoval) => {
  className.forEach((button) => {
    button.addEventListener("click", () => {
      if (needsRemoval) {
        let alreadyActive = button.classList.contains("active");
        highlighterRemover(className);
        if (!alreadyActive) {
          button.classList.add("active");
        }
      } else {
        button.classList.toggle("active");
      }
    });
  });
};

// Remove highlight from all buttons
const highlighterRemover = (className) => {
  className.forEach((button) => {
    button.classList.remove("active");
  });
};

// Initialize settings on page load
window.onload = initializer;
