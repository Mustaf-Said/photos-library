const btn = document.getElementById('loadPhotosBtn');
const container = document.getElementById('photosContainer');
const ul = document.createElement('ul');
const imgDetiales = document.querySelector('.detiales');

const photosLibrary = async () => {
  const response = await fetch('../jsonFile/sommarPhotos.json');
  const photos = await response.json();

  ul.innerHTML = '';

  photos.forEach(photo => {
    const li = document.createElement('li');
    li.innerHTML = `
            ${/* photo.title */""}
            <img src="${photo.url}" alt="${photo.title}/* " style="max-width:200px;" */>
            ${/* photo.details.description */""}
          `;
    ul.appendChild(li);
    li.addEventListener("click", () => {
      imgDetiales.innerHTML = `
               <img src="${photo.url}" alt="${photo.title} ">
              
              ${photo.title}
                <br />
       ${photo.details.description}
      `;
    })
  });

  // Append the ul to the container if not already appended
  if (!container.contains(ul)) {
    container.appendChild(ul);
  }
};

photosLibrary()