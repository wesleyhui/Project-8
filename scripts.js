// ==== Main Variables ==== 

const url = 'https://randomuser.me/api/?results=12&nat=us'; //12 random API 
const employees = [];
const employeeBox = document.getElementById('main');
const employeeOverlay = document.getElementsByClassName('modal-overlay')[0];

let search = document.getElementById('search');
const string = document.getElementById('search');
let letter = document.getElementsByClassName('card');


// ==== Fetch Functions ====

    fetch(url) //random fetch of 12 employees
        .then((response) => response.json()) //parse JSON
        .then(employeeInfo)


//==== Helper Functions ====

    /*---Employee Card Function---*/ //Employee Card Data of img, first & last name, email, location.city

        function employeeInfo(data) {
            for(let i=0; i < data.results.length; i += 1) {
                employees.push(data.results[i]);
                employeeBox.innerHTML += 
                `
                    <div class="card"> 
                        <div class="employee-img">
                            <img src="${data.results[i].picture.medium}" alt=""> 
                        </div>
                        <div class="employee-data">
                            <h2>${data.results[i].name.first} ${data.results[i].name.last}</h2>
                            <p class="email">${data.results[i].email}</p>
                            <p>${data.results[i].location.city}</p>
                        </div>
                    </div>
                `;
            }

            //Event Listener
            document.querySelectorAll('.card').forEach((card,index) => {
                card.addEventListener('click', (event) => { 
                    employeeModal(employees[index], index);
                });
            });
        }

    /*---Overlay Function---*/

        function employeeModal(employee, index) {

            //creating date variable based upon user's locale
            const dob = new Date(Date.parse(employee.dob.date)).toLocaleDateString(navigator.language);

            employeeOverlay.innerHTML = 
            `
                <div class="modal-content" data-index="${index}">
                    <span class="closing">X</span>
                    <div class="modal-img"> 
                        <button class="left"><</button>
                        <img src="${employee.picture.large}" alt="" class="profile-img"> 
                        <button class="right">></button>
                    </div>
                    <h2>${employee.name.first} ${employee.name.last}</h2>
                    <p>${employee.email}</p>
                    <p>${employee.location.city}</p>
                    
                    <hr>
                    <p>${employee.cell}</p>
                    <p>${employee.location.street.number} ${employee.location.street.name}, 
                    ${employee.location.state} ${employee.location.postcode} </p>
                    <p>Birthday: ${dob}</p>
                    
                </div>
            `;

            employeeOverlay.style.display = 'flex';

            //Event Listener for the "X" overlay
            const modalClose = document.getElementsByClassName('closing')[0];

            modalClose.addEventListener('click', () => {
                employeeOverlay.style.display = 'none';
            })
        }


//====Event Listener/ Flip through Employees in Modal Overlay====

employeeOverlay.addEventListener('click', (event) => {
    if(event.target.className === 'left') { //left arrow
        let indexPosition = parseInt(employeeOverlay.firstElementChild.getAttribute('data-index'));
        indexPosition -= 1; //minus 1 to index position with every left arrow click
        if (indexPosition > -1) {
            employeeModal(employees[indexPosition], indexPosition);
        }
    }
    if(event.target.className === 'right') { //right arrow
        let indexPosition = parseInt(employeeOverlay.firstElementChild.getAttribute('data-index'));
        indexPosition += 1; //adding 1 to index position with every right arrow click
        if (indexPosition < 12) {
            employeeModal(employees[indexPosition], indexPosition);
        }
    }
})



//====Search Filter Function ====

string.addEventListener('keyup', () =>{
    const input = string.value.toLowerCase();

    for(let i=0; i< letter.length; i += 1){
        const nameInfo = letter[i].innerHTML;
        if (nameInfo.toLowerCase().indexOf(input) > -1) {
            letter[i].style.display = '';
        } else {
            letter[i].style.display = 'none';
        }
    }
});