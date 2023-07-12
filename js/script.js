const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");
const btn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");
const logo = document.getElementById("logo");

const downloadButton = document.querySelector(`.download-button`)
const downloadIcon = document.querySelector(`.download-icon`)
const downloadLoader = document.querySelector(`.download-loader`)
const downloadCheckMark = document.querySelector(`.check-svg`)
const downloadText = document.querySelector(`.button-copy`)

document.addEventListener("DOMContentLoaded", function(){
  setTimeout(function(){
      var replacers = document.querySelectorAll('[data-replace]');
      for(var i=0; i<replacers.length; i++){
          let replaceClasses = JSON.parse(replacers[i].dataset.replace.replace(/'/g, '"'));
          Object.keys(replaceClasses).forEach(function(key) {
              replacers[i].classList.remove(key);
              replacers[i].classList.add(replaceClasses[key]);
          });
      }
  }, 1);
});

// Tabs menu event listener
tabs.forEach((tab) => tab.addEventListener("click", onTabClick));

// Hamburger button listener
btn.addEventListener("click", navToggle);

function onTabClick(e) {
  // Deactivate all tabs
  tabs.forEach((tab) => {
    tab.children[0].classList.remove(
      "border-softRed",
      "border-b-4",
      "md:border-b-0"
    );
  });

  // Hide all panels
  panels.forEach((panel) => panel.classList.add("hidden"));

  // Activate a new tab and panel based on the target
  e.target.classList.add("border-softRed", "border-b-4");
  const classString = e.target.getAttribute("data-target");
  document
    .getElementById("panels")
    .getElementsByClassName(classString)[0]
    .classList.remove("hidden");
}

function navToggle() {
  btn.classList.toggle("open");
  menu.classList.toggle("flex");
  menu.classList.toggle("hidden");

  if (menu.classList.contains("flex")) {
    logo.setAttribute("src", "./images/logo-bookmark-footer.svg");
  } else {
    logo.setAttribute("src", "./images/Logo No BG.png");
  }
}
const scrollProgress = () => {
  return {
    init() {
      window.addEventListener("scroll", () => {
        let winScroll =
          document.body.scrollTop || document.documentElement.scrollTop;
        let height =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;
        this.percent = Math.round((winScroll / height) * 100);
      });
    },
    circumference: 30 * 2 * Math.PI,
    percent: 0,
  };
};

//Init tooltips
tippy('.link', {
  placement: 'bottom'
})


// download button script code

downloadButton.addEventListener('click', () => {
  downloadIcon.classList.add(`hidden`)
  downloadLoader.classList.remove(`hidden`)
  downloadText.innerHTML = "Please Wait...";
}, { once: true })

downloadLoader.addEventListener('animationend', () => {
  downloadLoader.classList.add(`hidden`)
  downloadCheckMark.classList.remove(`hidden`)
  downloadText.innerHTML = "Succesfully";
})

let timer;

  document.addEventListener("alpine:init", () => {
      Alpine.data("app", () => ({
          open: false,

          openToast() {
              if (this.open) return;
              this.open = true;

              clearTimeout(timer);

              timer = setTimeout(() => {
                  this.open = false;
              }, 5000);
          },

          closeToast() {
              this.open = false;
          },
      }));
  });

const userForm = document.getElementById("user-form")
const dataContainer = document.getElementById("data-container")
const username = document.getElementById("username");
const email = document.getElementById("email");
const emailError = document.getElementById("email-error");


function ValidateName() {
    if (username.value !== "") {
        username.classList.add("border-green-400")
        username.classList.remove("border-gray-300")
    }
    else {
        username.classList.remove("border-green-400")
        username.classList.add("border-red-400")
    }
}

username.addEventListener("keyup", () => {
    ValidateName()
})


function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value)) {
        email.classList.add("border-green-400")
        email.classList.remove("border-red-400")
        emailError.classList.add("hidden")
        emailError.classList.remove("block")
        return true
    }
    else {
        email.classList.add("border-red-400")
        email.classList.remove("border-green-400")
        emailError.classList.remove("hidden")
        emailError.classList.add("block")
        return false;
    }
}

email.addEventListener("keyup", () => {
    ValidateEmail(email)
})

userForm.addEventListener("submit", (e) => {
    e.preventDefault()
    if (username.classList.contains("border-green-400") &&
        email.classList.contains("border-green-400")) {
       
    }
})