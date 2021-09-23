const passwordCard = document.querySelector(".card-password");
const message = document.querySelector(".message");
const passwordText = document.querySelector(".card-password-text");
const redo = document.getElementById("redo");
const copy = document.getElementById("copy");
const sliderLength = document.getElementById("myRange");
const cbLetters = document.getElementById("cb-letters");
const cbMixedCase = document.getElementById("cb-mixed-case");
const cbPunctuations = document.getElementById("cb-punctuations");
const cbNumbers = document.getElementById("cb-numbers");
const bubble = document.getElementById("bubble");

const passwordStrength = Object.freeze({ weak: 0, strong: 1 });

const alphas = "abcdefghijklmnopqrstuvwxyz";
const digits = "0123456789";
const symbols = "`-=[]\\;,./!@#$%^&*()_+{}|:<>?";

let length = sliderLength.value; //(4-64)
let letters = true;
let mixedCase = true;
let punctuations = true;
let numbers = true;

const getSource = () => {
  let source = "";

  if (letters) source += alphas;
  if (mixedCase) source += alphas.toUpperCase();
  if (punctuations) source += symbols;
  if (numbers) source += digits;

  return source;
};

const generatePassword = () => {
  const source = getSource();
  console.log(source);
  const sourceLength = source.length;

  let password = "";

  for (let i = 0; i < length; i++) {
    let temp = source.charAt(Math.floor(Math.random() * sourceLength));
    // if (symbols.includes(temp)) {
    //   temp = "\\" + temp;
    // }

    password += temp;
  }

  return password;
};

const changePasswordStrength = (strength) => {
  passwordCard.classList.toggle("weak", strength !== passwordStrength.strong);
};

const showPassword = (password) => {
  adjustFontSize();
  passwordText.textContent = password;
  changePasswordStrength(
    length > 10 ? passwordStrength.strong : passwordStrength.weak
  );
};

document.addEventListener("DOMContentLoaded", function () {
  setBubble();
  letters = cbLetters.checked;
  numbers = cbNumbers.checked;
  mixedCase = cbMixedCase.checked;
  punctuations = cbPunctuations.checked;
  showPassword(generatePassword());
});

redo.addEventListener("click", () => {
  showPassword(generatePassword());
});

copy.addEventListener("click", () => {
  const r = document.createRange();
  r.selectNode(passwordText);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(r);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
  message.classList.add("message-show");
  setTimeout(() => {
    message.classList.remove("message-show");
  }, 1500);
});

sliderLength.oninput = function () {
  setBubble();
  length = this.value;
  showPassword(generatePassword());
};

sliderLength.onclick = () => {
  showPassword(generatePassword());
};

cbLetters.onclick = function () {
  letters = this.checked;
  if (!letters) {
    mixedCase = false;
    cbMixedCase.checked = false;
  }
  cbMixedCase.disabled = !letters;
  cbNumbers.disabled = !letters;
  showPassword(generatePassword());
};

cbNumbers.onclick = function () {
  numbers = this.checked;
  cbLetters.disabled = !numbers;
  showPassword(generatePassword());
};

cbMixedCase.onclick = function () {
  mixedCase = this.checked;
  showPassword(generatePassword());
};

cbPunctuations.onclick = function () {
  punctuations = this.checked;
  showPassword(generatePassword());
};

const setBubble = () => {
  const val = sliderLength.value;
  const min = sliderLength.min;
  const max = sliderLength.max;
  const newVal = Number(((val - min) * 100) / (max - min));
  bubble.innerHTML = val;
  bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
};

function adjustFontSize() {
  if (length > 40) {
    passwordText.style.fontSize = "1rem";
  } else if (length > 20) {
    passwordText.style.fontSize = "1.5rem";
  } else {
    passwordText.style.fontSize = "2rem";
  }
}
