
const container = document.getElementById('photosContainer');
const ul = document.createElement('ul');
const imgDetiales = document.querySelector('.detiales');
// Search photos by title
let allPhotos = [];

// Search input logic
const searchInput = document.querySelector('.search');

searchInput.addEventListener("input", function (e) {
  const searchTerm = e.target.value.toLowerCase();
  ul.innerHTML = '';
  const filteredPhotos = allPhotos.filter(photo =>
    photo.title.toLowerCase().includes(searchTerm)

  );


  filteredPhotos.forEach(photo => {
    const li = document.createElement('li');
    li.innerHTML = `<img src="${photo.url}" alt="${photo.title}">`;
    ul.appendChild(li);
    imgDetiales.innerHTML = `
        <img src="${photo.url}" alt="${photo.title}">
        <br>
        Title: ${photo.title}
        <br><br>
        Description: ${photo.details.description}
      `;
    li.addEventListener("click", () => {
      imgDetiales.innerHTML = `
        <img src="${photo.url}" alt="${photo.title}">
        <br>
        Title: ${photo.title}
        <br><br>
        Description: ${photo.details.description}
      `;
      searchInput.value = ""
    });
  });
  if (!container.contains(ul)) {
    container.appendChild(ul);
  }
});

// Map activity class names to JSON paths
const activityMap = {
  sommarAk: 'jsonFile/sommarPhotos.json',
  vinterAk: 'jsonFile/vinterPhotos.json',
  hostAk: 'jsonFile/hostPhotos.json',
  varAk: 'jsonFile/varPhotos.json'
};

// Load photos for a given activity
const loadPhotos = async (jsonPath) => {
  const response = await fetch(jsonPath);
  const photos = await response.json();

  allPhotos = photos; // Store all loaded photos for searching.

  ul.innerHTML = '';

  photos.forEach(photo => {
    const li = document.createElement('li');
    li.innerHTML = `<img src="${photo.url}" alt="${photo.title}">`;
    ul.appendChild(li);

    // display single big photo with details on right side.
    imgDetiales.innerHTML = `
        <img src="${photo.url}" alt="${photo.title}">
        <br>
        Title: ${photo.title}
        <br><br>
        Description: ${photo.details.description}
      `;
    // display single big photo with details on right side efter clicked.
    li.addEventListener("click", () => {
      imgDetiales.innerHTML = `
        <img src="${photo.url}" alt="${photo.title}">
        <br>
        Title: ${photo.title}
        <br><br>
        Description: ${photo.details.description}
      `;
      searchInput.value = ""
    });
  });

  // Append the ul to the container if not already appended
  if (!container.contains(ul)) {
    container.appendChild(ul);
  }
};

// Add event listeners to each activity element
Object.keys(activityMap).forEach(activityClass => {
  const elements = document.getElementsByClassName(activityClass);
  Array.from(elements).forEach(el => {
    el.addEventListener('click', () => {
      loadPhotos(activityMap[activityClass])
      searchInput.value = ""
    });
  });
});

// Optionally, load summer photos by default
loadPhotos(activityMap.sommarAk);

// Färgklick – ändra bakgrund på details-panelen
const colorSwatches = document.querySelectorAll(".color");
const detailsPanel = document.querySelector(".detailsColors");
const backgrundColor = document.querySelector(".mainBackgrund");
const inptBC = document.querySelector("#inputBackgrund");

colorSwatches.forEach(swatch => {
  swatch.addEventListener("click", () => {
    const color = window.getComputedStyle(swatch).backgroundColor;
    detailsPanel.style.backgroundColor = color;
    backgrundColor.style.backgroundColor = color;
    inptBC.style.backgroundColor = color;
  });
});

//play music 
const musicIcons = document.querySelectorAll(".musicList");


const musicPlay = [
  document.querySelector("#musicPlay"),
  document.querySelector("#musicPlay2"),
  document.querySelector("#musicPlay3")
];

let currentlyPlayingIndex = null;

musicIcons.forEach(icon => {
  icon.addEventListener("click", (e) => {
    const index = parseInt(e.currentTarget.getAttribute("data-index"), 10);
    if (!isNaN(index)) {
      if (currentlyPlayingIndex === index && !musicPlay[index].paused) {
        musicPlay[index].pause();
        currentlyPlayingIndex = null;
      } else {
        // Stoppa och nollställ alla andra ljud
        musicPlay.forEach((audio, i) => {
          audio.pause();
          audio.currentTime = 0;
          audio.loop = false;
        });

        // Starta och loopa det valda ljudet
        musicPlay[index].loop = true;
        musicPlay[index].play();
        currentlyPlayingIndex = index;
      }
    }
  });
});

// play musikicons
const toggleIcon = document.getElementById("toggleIcon");
const audioContainer = document.getElementById("audioContainer");


toggleIcon.addEventListener("click", function () {
  audioContainer.classList.toggle("toggle");
});

//LightBox with toggle
// LightBox with toggle
const lightBox = document.getElementById("lightBox");
let lightBoxIndex = 0;
let lightBoxInterval = null;

// Create lightbox overlay elements
const lightBoxOverlay = document.createElement("div");
lightBoxOverlay.classList.add("lightBoxOverlay")

const lightBoxImg = document.createElement("img");
lightBoxImg.classList.add("lightBoxImg")

const lightBoxTitle = document.createElement("div");
lightBoxTitle.style.color = "#fff";
lightBoxTitle.style.marginTop = "20px";
lightBoxTitle.style.fontSize = "1.2rem";
lightBoxTitle.style.textAlign = "center";

const closeBtn = document.createElement("button");
closeBtn.classList.add("closeBtn")
closeBtn.textContent = "Close";

lightBoxOverlay.appendChild(lightBoxImg);
lightBoxOverlay.appendChild(lightBoxTitle);
lightBoxOverlay.appendChild(closeBtn);
document.body.appendChild(lightBoxOverlay);

function showLightBox(index) {
  if (!allPhotos.length) return;
  lightBoxIndex = index % allPhotos.length;
  const photo = allPhotos[lightBoxIndex];
  lightBoxImg.src = photo.url;
  lightBoxImg.alt = photo.title;
  /*  lightBoxTitle.innerHTML = `<strong>${photo.title}</strong><br>${photo.details?.description || ""}`; */
}

function startLightBoxSlideshow() {
  showLightBox(0);
  lightBoxOverlay.style.visibility = "visible";
  if (lightBoxInterval) clearInterval(lightBoxInterval);
  lightBoxInterval = setInterval(() => {
    lightBoxIndex = (lightBoxIndex + 1) % allPhotos.length;
    showLightBox(lightBoxIndex);
  }, 2000); // 2 seconds per photo
}

function closeLightBox() {
  lightBoxOverlay.style.visibility = "hidden";
  if (lightBoxInterval) clearInterval(lightBoxInterval);
}

closeBtn.addEventListener("click", closeLightBox);
lightBoxOverlay.addEventListener("click", (e) => {
  if (e.target === lightBoxOverlay) closeLightBox();
});

lightBox.addEventListener("click", () => {
  if (allPhotos.length) {
    startLightBoxSlideshow();
  }
});