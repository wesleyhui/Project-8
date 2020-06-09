/*$.ajax({
    url: 'https://randomuser.me/api/',
    dataType: 'json',
    success: function(data) {
      console.log(data);
    }
  });
*/

// ==== Main Variables ====
const url = 'https://randomuser.me/api/?results=12&nat=us'; //12 random API 
const employees = [];
const employeeBox = document.getElementById('main');
const employeeOverlay = document.querySelector('.modal-overlay');

let search = document.getElementById('search');


// ==== Fetch Functions ====
    fetch(url) //random fetch of 12 employees
        .then((response) => response.json()) //parse JSON
        .then(employeeInfo)


//==== Helper Functions ====

    /*---Employee Card Function---*/ //Employee Card Data of img, first & last name, email, location.city

        function employeeInfo(data) {
            for(let i=0; i < data.results.length; i += 1) {
                employees.push(data.results[i]);
                main.innerHTML += `
                    <div class="card"> 
                        <div class="employee-img">
                            <img src="${data.results[i].picture.medium}" alt=""> 
                        </div>
                        <div class="employee-data">
                            <h2 class="name">${data.results[i].name.first} ${data.results[i].name.last}</h2>
                            <p>${data.results[i].email}</p>
                            <p>${data.results[i].location.city}</p>
                        </div>
                    </div>
                `;
            }

            document.querySelectorAll('.card').forEach((card,index) => {
                card.addEventListener('click', (e) => {
                    modal(employees[index], index);
                });
            });
        }

    /*---Overlay Function---*/

//====Event Listener Functions====

//====Search Filter Function ==== 