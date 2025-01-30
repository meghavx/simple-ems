interface Employee {
  id: string;
  name: string;
  email: string;
  gender: string;
  position: string;
}

let employees: Employee[] = [];
let currentEmployeeId: string | null = null;

const viewListButton = document.getElementById('view-employees') as HTMLButtonElement;
const addEmployeeButton = document.getElementById('add-employee') as HTMLButtonElement;
const deleteAllButton = document.getElementById('delete-employees') as HTMLButtonElement;
const employeeListSection = document.getElementById('ems_view-employees') as HTMLElement;
const employeeFormSection = document.getElementById('ems_employee-form') as HTMLElement;
const employeeDetailsSection = document.getElementById('ems_employee-details') as HTMLElement;
const employeeTableBody = document.getElementById('employee-table-body') as HTMLTableSectionElement;

const formTitle = document.getElementById('form-title') as HTMLElement;
const employeeIdInput = document.getElementById('employee-id') as HTMLInputElement;
const employeeNameInput = document.getElementById('employee-name') as HTMLInputElement;
const employeeEmailInput = document.getElementById('employee-email') as HTMLInputElement;
const employeeGenderInput = document.getElementById('employee-gender') as HTMLSelectElement;
const employeePositionInput = document.getElementById('employee-position') as HTMLSelectElement;
const saveEmployeeButton = document.getElementById('save-employee') as HTMLButtonElement;

const detailId = document.getElementById('detail-id') as HTMLElement;
const detailName = document.getElementById('detail-name') as HTMLElement;
const detailEmail = document.getElementById('detail-email') as HTMLElement;
const detailGender = document.getElementById('detail-gender') as HTMLElement;
const detailPosition = document.getElementById('detail-position') as HTMLElement;
const closeEmployeeButton = document.getElementById('close-employee') as HTMLButtonElement;

function showSection(section: HTMLElement) {
  employeeListSection.classList.add('hidden');
  employeeFormSection.classList.add('hidden');
  employeeDetailsSection.classList.add('hidden');
  section.classList.remove('hidden');
}

// Load employees from localStorage
function loadEmployees() {
  const storedEmployees = localStorage.getItem('employees');
  employees = storedEmployees ? JSON.parse(storedEmployees) : [];
}

// Save employees to localStorage
function saveEmployees() {
  localStorage.setItem('employees', JSON.stringify(employees));
}

function renderEmployeeTable() {
  employeeTableBody.innerHTML = '';

  employees
    .forEach(emp => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${emp.id}</td>
        <td>${emp.name}</td>
        <td>${emp.position}</td>
        <td>
          <div class="action-buttons">
            <img onclick="viewDetails('${emp.id}')" class="icon view-icon" src="https://cdn-icons-png.freepik.com/256/9207/9207686.png?uid=R182226373&ga=GA1.1.1313046537.1736231732&semt=ais_hybrid"/>
            <img onclick="editDetails('${emp.id}')" class="icon edit-icon" src="https://cdn-icons-png.freepik.com/256/14915/14915786.png?uid=R182226373&ga=GA1.1.1313046537.1736231732&semt=ais_hybrid"/>
            <img onclick="deleteDetails('${emp.id}')" class="icon delete-icon" src="https://cdn-icons-png.freepik.com/256/756/756906.png?uid=R182226373&ga=GA1.1.1313046537.1736231732&semt=ais_hybrid"/>
          </div>
        </td>
      `;
      employeeTableBody.appendChild(row);
    });
}

function viewDetails(id: string) {
  const employee = employees.find(emp => emp.id === id);
  if (!employee) return;

  currentEmployeeId = id;
  detailId.textContent = employee.id;
  detailName.textContent = employee.name;
  detailEmail.textContent = employee.email;
  detailGender.textContent = employee.gender;
  detailPosition.textContent = employee.position;
  showSection(employeeDetailsSection);
}

function editDetails(id: string) {
  const employee = employees.find(emp => emp.id === id);
  if (!employee) return;

  currentEmployeeId = id;
  formTitle.textContent = 'Edit Employee';
  employeeIdInput.value = employee.id;
  employeeNameInput.value = employee.name;
  employeeEmailInput.value = employee.email;
  employeeGenderInput.value = employee.gender;
  employeePositionInput.value = employee.position;
  showSection(employeeFormSection);
}

function deleteDetails(id: string) {
  employees = employees.filter(emp => emp.id !== id);
  currentEmployeeId = id;
  saveEmployees();
  renderEmployeeTable();
  showSection(employeeListSection);
}

function resetForm() {
  employeeIdInput.value = '';
  employeeNameInput.value = '';
  employeeEmailInput.value = '';
  employeeGenderInput.value = '';
  employeePositionInput.value = '';
}

viewListButton.addEventListener('click', () => showSection(employeeListSection));

addEmployeeButton.addEventListener('click', () => {
  currentEmployeeId = null;
  formTitle.textContent = 'Add Employee';
  resetForm();
  showSection(employeeFormSection);
});

deleteAllButton.addEventListener('click', () => {
  employees = [];
  localStorage.removeItem('employees');
  employeeTableBody.innerHTML = '';
  showSection(employeeListSection);
});

saveEmployeeButton.addEventListener('click', () => {
  const id = employeeIdInput.value.trim();
  const name = employeeNameInput.value.trim();
  const email = employeeEmailInput.value.trim();
  const gender = employeeGenderInput.value;
  const position = employeePositionInput.value;

  if (!id || !name) {
    alert('Please fill out all fields.');
    return;
  }

  if (currentEmployeeId) {
    const employee = employees.find(emp => emp.id === currentEmployeeId);
    if (employee) {
      employee.id = id;
      employee.name = name;
      employee.email = email;
      employee.gender = gender;
      employee.position = position;
    }
  } 
  else {
    employees.push({ id, name, email, gender, position });
  }

  saveEmployees();
  renderEmployeeTable();
  showSection(employeeListSection);
});

closeEmployeeButton.addEventListener('click', () => {
  showSection(employeeListSection);
});

loadEmployees();
renderEmployeeTable();
showSection(employeeListSection);