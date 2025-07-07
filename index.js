const btn = document.getElementById('loadPhotosBtn');
const container = document.getElementById('photosContainer');
const ul = document.createElement('ul');
const imgDetiales = document.querySelector('.detiales');

const sommarAktivitet = document.getElementsByClassName("sommarAk");
const vinterAktivitet = document.getElementsByClassName("vinterAk");
const hostAktivitet = document.getElementsByClassName("hostAk");
const varAktivitet = document.getElementsByClassName("varAk");

const activityMap = {
  sommarAk: '../jsonFile/sommarPhotos.json',
  vinterAk: '../jsonFile/vinterPhotos.json',
  hostAk: '../jsonFile/hostPhotos.json',
  varAk: '../jsonFile/varPhotos.json'
};

const loadPhotos = async (jsonPath) => {
  const response = await fetch(jsonPath);
  const photos = await response.json();

  ul.innerHTML = '';

  photos.forEach(photo => {
    const li = document.createElement('li');
    li.innerHTML = `
                    <img src="${photo.url}" alt="${photo.title}">
                   `;
    ul.appendChild(li);
    imgDetiales.innerHTML = `
               <img src="${photo.url}" alt="${photo.title} ">
              
              Title: ${photo.title}
              <br>
              <br>
              Describtion: ${photo.details.description}
      `;
    li.addEventListener("click", () => {
      imgDetiales.innerHTML = `
               <img src="${photo.url}" alt="${photo.title} ">
              
              Title: ${photo.title}
               <br>
              <br>
              Describtion: ${photo.details.description}
      `;
    })
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
    el.addEventListener('click', () => loadPhotos(activityMap[activityClass]));
  });
});

// Optionally, load summer photos by default
loadPhotos(activityMap.sommarAk);

// Färgklick – ändra bakgrund på details-panelen
const colorSwatches = document.querySelectorAll(".color");
const detailsPanel = document.querySelector(".detailsColors");
const backgrundColor = document.querySelector(".mainbackgrund");
colorSwatches.forEach(swatch => {
  swatch.addEventListener("click", () => {
    const color = window.getComputedStyle(swatch).backgroundColor;
    detailsPanel.style.backgroundColor = color;
    backgrundColor.style.backgroundColor = color;
  });
});
