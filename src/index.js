// Global variables
let ramens = []; // Array to store ramen objects

// Function to fetch ramen data from the server
async function fetchRamenData() {
  try {
    const response = await fetch('/ramens'); // Replace '/ramens' with the actual API endpoint for fetching ramen data
    const data = await response.json();
    ramens = data; // Update the ramens array with the fetched data

    // Display ramen images in the #ramen-menu div
    const ramenMenu = document.querySelector('#ramen-menu');
    ramens.forEach(ramen => {
      const img = document.createElement('img');
      img.src = ramen.image;
      img.alt = ramen.name;
      img.addEventListener('click', () => showRamenDetails(ramen));
      ramenMenu.appendChild(img);
    });

    // Display details for the first ramen
    if (ramens.length > 0) {
      showRamenDetails(ramens[0]);
    }
  } catch (error) {
    console.error('Error fetching ramen data:', error);
  }
}

// Function to display ramen details
function showRamenDetails(ramen) {
  const ramenDetail = document.querySelector('#ramen-detail');
  ramenDetail.innerHTML = `
    <img src="${ramen.image}" alt="${ramen.name}">
    <h3>${ramen.name}</h3>
    <p>Restaurant: ${ramen.restaurant}</p>
    <p>Rating: ${ramen.rating}</p>
    <p>Comment: ${ramen.comment}</p>
  `;
}

// Function to handle form submission for creating new ramen
function handleNewRamenForm(event) {
  event.preventDefault();

  const newRamenForm = document.querySelector('#new-ramen');
  const name = newRamenForm.querySelector('#new-name').value;
  const restaurant = newRamenForm.querySelector('#new-restaurant').value;
  const image = newRamenForm.querySelector('#new-image').value;

  const newRamen = {
    name,
    restaurant,
    image
  };

  ramens.push(newRamen);

  // Add the new ramen to the #ramen-menu div
  const ramenMenu = document.querySelector('#ramen-menu');
  const img = document.createElement('img');
  img.src = newRamen.image;
  img.alt = newRamen.name;
  img.addEventListener('click', () => showRamenDetails(newRamen));
  ramenMenu.appendChild(img);

  // Reset the form fields
  newRamenForm.reset();
}

// Function to handle form submission for updating ramen rating and comment
function handleEditRamenForm(event) {
  event.preventDefault();

  const editRamenForm = document.querySelector('#edit-ramen');
  const rating = editRamenForm.querySelector('#new-rating').value;
  const comment = editRamenForm.querySelector('#new-comment').value;

  const ramenDetail = document.querySelector('#ramen-detail');
  const ramenImage = ramenDetail.querySelector('img');

  // Update the rating and comment in the ramen object
  const ramen = ramens.find(r => r.image === ramenImage.src);
  if (ramen) {
    ramen.rating = rating;
    ramen.comment = comment;
    ramenDetail.querySelector('p:nth-child(4)').textContent = `Rating: ${rating}`;
    ramenDetail.querySelector('p:nth-child(5)').textContent = `Comment: ${comment}`;
  }

  // Reset the form fields
  editRamenForm.reset();
}

// Function to delete a ramen
function deleteRamen() {
  const ramenDetail = document.querySelector('#ramen-detail');
  const ramenImage = ramenDetail.querySelector('img');

  // Remove the ramen from the ramens array
  const index = ramens.findIndex(r => r.image === ramenImage.src);
  if (index !== -1) {
    ramens.splice(index, 1);
  }

  // Remove the ramen from the #ramen-menu div
  const ramenMenu = document.querySelector('#ramen-menu');
  const img = ramenMenu.querySelector(`img[src="${ramenImage.src}"]`);
  if (img) {
    ramenMenu.removeChild(img);
  }

  // Clear the ramen detail
  ramenDetail.innerHTML = '';
}

// Event listeners
document.addEventListener('DOMContentLoaded', fetchRamenData);

const newRamenForm = document.querySelector('#new-ramen');
newRamenForm.addEventListener('submit', handleNewRamenForm);

const editRamenForm = document.querySelector('#edit-ramen');
editRamenForm.addEventListener('submit', handleEditRamenForm);

const deleteButton = document.querySelector('#delete-button');
deleteButton.addEventListener('click', deleteRamen);
