//uses the fetch API to retrieve data from an api running at http://localhost:8080/api/contacts 
const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/contacts');
      const jsonData = await response.json();
      return jsonData;
    } catch (err) {
      console.log(err);
    }
  }
  //the method takes the retrieved JSON data as input and generates a Bootstrap card for each contact in the data.
  const handleData = jsonData => {
    const row = document.querySelector('.row');
    jsonData.forEach(contact => {
      const card = document.createElement('div');
      card.className = 'col-sm-12 col-md-12 col-lg-6 mt-2';
      card.innerHTML = `
          <div class="card" id=${contact.id}>
            <div class="card-body">
              <h5 class="card-title">${contact.firstName}</h5>
               <h6 class="card-title">${contact.email}</h6>
              <a  id="viewBtn" class="btn btn-primary float-end">View</a>
              <a href="#" id="deleteBtn" class="btn btn-primary float-end">Delete</a>
            </div>
          </div>
        `;
        row.appendChild(card);
    });
  }
  //The fetchData function is invoked and the Promise it returns is chained with .then and .catch methods.
  // If the Promise resolves successfully, the handleData function is called otherwise the error is logged to the console.
  fetchData()
    .then(handleData)
    .catch(error => {
      console.error(error);
    });

    /**
 *  This code sets up an event listener on the .row element for a click event. When the deleteBtn is clicked a request is sending in http://localhost:8080/api/contacts/${id} with  DELETE method.
 */

const row = document.querySelector(".row");
row.addEventListener("click", (event) => {
  if (event.target.id === "deleteBtn") {
    // checks if the clicked element has an id of deleteBtn.
    const card = event.target.closest(".card"); // selects the closest ancestor element of the clicked element that has a class of card and assigns it to the card constant.
    const id = card.id; //This assigns the id attribute of the card to the id variable
    fetch(`http://localhost:8080/api/contacts/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      });
  }
  window.location.reload();
});

const contactPageRow = document.querySelector(".contactPageRow");
contactPageRow.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent the default behavior of the click event
   // checks if the clicked element has an id of viewBtn.
  if (event.target.id === "viewBtn") {
    const card = event.target.closest(".card");
    const id = card.id;
    // Construct a redirect URL with the ID as a query parameter
    let redirectURL = `../details/info.html?id=${id}`;
    // Redirect the user to the constructed URL
    window.location.href = redirectURL;
  }
});


// Code for the Search Bar
function searchContact() {
  let input = document.getElementById('searchbar').value
  input=input.toLowerCase();
  let card = document.getElementsByClassName('card');

  for (i = 0; i < card.length; i++) { 
      if (!card[i].innerText.toLowerCase().includes(input)) {
          card[i].style.display="none";
      }
      else {
          card[i].style.display="";
      }
  }
}