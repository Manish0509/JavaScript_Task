const data = [];

const destinationList = [];

// show form after clicking on Add Task Button from formList
const addRecord = document.getElementById("addTask-button");
addRecord.onclick = function () {
  document.getElementById("formlist").style.display = "none";
  document.getElementById("form").style.display = "block";
  document.getElementById("sectionTask").style.display = "block";
  document.getElementById("taskAssigneeDisplay").style.display = "none";
  document.getElementById("task-status").value = "defaultStatus";
};

// Read data from the form entered by user
function readFormData() {
  var formData = {};
  formData["title"] = document.getElementById("title").value;
  formData["description"] = document.getElementById("desc").value;
  formData["assignee"] = document.getElementById("assignee").value;
  formData["status"] = "ToDo";
  return formData;
}

// For assignee change in form
const assigneeList = [
  { name: "All" },
  { name: "Deep" },
  { name: "Manish" },
  { name: "Rutvik" },
  { name: "Shiv" },
  { name: "Shivansh" },
  { name: "Viren" },
  { name: "Yash" },
  { name: "Raj_Bhatt" },
  { name: "Dinesh_Kachhot" },
  { name: "Jagat_Vasveliya" },
  { name: "Krupesh_Joshi" },
  { name: "Kinjal_Patel" },
  { name: "Mihir_Prajapati" },
  { name: "Nikhil_Singh" },
];

{
  assigneeList.map((obj) => {
    document.getElementById("assignee").innerHTML += `
      <option value=${obj.name}>
      ${obj.name}
      </option>
      `;
  });
}

{
  assigneeList.map((obj, i) => {
    document.getElementById("assignee-filter").innerHTML += `
            <option value=${obj.name} onchange="${filterAssigneeList(i)}">
            ${obj.name}
            </option>`;
  });
}

// form and formlist for status
const statusTask = [
  { status: "ToDo" },
  { status: "InProgress" },
  { status: "Done" },
];

// for formlist header status filter
{
  statusTask.map((obj) => {
    document.getElementById("task-status").innerHTML += `
      <option status=${obj.status}>
      ${obj.status}
      </option>
      `;
  });
}

function onFormSubmit() {
  document.getElementById("formlist").style.display = "block";
  document.getElementById("form").style.display = "none";
  let formData = readFormData();
  data.push(formData); // add all the data received from "form" to array "data"
  // console.log(data);
  document.getElementById("todoData").innerHTML = "";
  document.getElementById("inProgress").innerHTML = "";
  document.getElementById("done").innerHTML = "";
  console.log(data);
  taskAdd();
  resetFormData();
}

function assigneeChange(i) {
  let assignChng = document.getElementById(`cardAssignee${i}`).value;
  data[i].assignee = assignChng;
  let statusChng = document.getElementById(`taskStatus${i}`).value;
  data[i].status = statusChng;
  console.log("Assignee or Status Change", data);
  onFormSubmit();
}

function taskAdd() {
  data.map((obj, i) => {
    if (obj.title.length < 1) {
      data.splice(i, 1); //// At position i, remove 1 items
    } else if (obj.status == "ToDo") {
      document.getElementById("todoData").innerHTML += `
        <div class="toDoAddData" key=${i} onchange="assigneeChange(${i})">
            <div>${obj.title}</div>
            <div>${obj.description}</div>
            <select id="cardAssignee${i}">
            ${assigneeList.map((data) => {
              if (obj.assignee === data.name) {
                return `<option selected value=${data.name}>
                ${data.name}
                </option>`;
              } else {
                return `
                <option value=${data.name}>
                ${data.name}
                </option>`;
              }
            })}
            </select><br>
            <select id="taskStatus${i}" >
            ${statusTask.map((obj) => {
              if (obj.status === "ToDo") {
                return `<option selected value=${obj.status}>
                ${obj.status}
                </option>
                `;
              } else {
                return `
                <option value=${obj.status}>
                ${obj.status}
                </option>`;
              }
            })}
            </select>
        </div>
        `;
    } else if (obj.status === "InProgress") {
      document.getElementById("inProgress").innerHTML += `
          <div class="toDoAddData" key=${i}  onchange="assigneeChange(${i})">
              <div>${obj.title}</div>
              <div>${obj.description}</div>
              <select id="cardAssignee${i}">
              ${assigneeList.map((data) => {
                if (obj.assignee === data.name) {
                  return `<option selected value=${data.name}>
                  ${data.name}
                  </option>`;
                } else {
                  return `
                  <option value=${data.name}>
                  ${data.name}
                  </option>`;
                }
              })}
              </select><br>
              <select id="taskStatus${i}" >
              ${statusTask.map((obj) => {
                if (obj.status === "InProgress") {
                  return `<option selected value=${obj.status}>
                  ${obj.status}
                  </option>
                  `;
                } else {
                  return `
                  <option value=${obj.status}>
                  ${obj.status}
                  </option>`;
                }
              })}
              </select>
          </div>
          `;
    } else if (obj.status === "Done") {
      document.getElementById("done").innerHTML += `
            <div class="toDoAddData" key=${i} onchange="assigneeChange(${i})">
                <div>${obj.title}</div>
                <div>${obj.description}</div>
                <select id="cardAssignee${i}">
                ${assigneeList.map((data) => {
                  if (obj.assignee === data.name) {
                    return `<option selected value=${data.name}>
                    ${data.name}
                    </option>`;
                  } else {
                    return `
                    <option value=${data.name}>
                    ${data.name}
                    </option>`;
                  }
                })}
                </select><br>
                <select id="taskStatus${i}" >
                ${statusTask.map((obj) => {
                  if (obj.status === "Done") {
                    return `<option selected value=${obj.status}>
                    ${obj.status}
                    </option>
                    `;
                  } else {
                    return `
                    <option value=${obj.status}>
                    ${obj.status}
                    </option>`;
                  }
                })}
                </select>
            </div>
            `;
    } else {
      ("Not use");
    }
  });
}

function assigneeTaskFilterout() {
  destinationList.map((obj, i) => {
    if (obj.title.length < 1) {
      destinationList.splice(i, 1); //// At position i, remove 1 items
    } else if (obj.status == "ToDo") {
      document.getElementById("assigneeTodoTask").innerHTML += `
        <div class="toDoAddData" key=${i} onchange="filterMyAssignee(${i})">
          <div>${obj.title}</div>
          <div>${obj.description}</div>
          <select id="cardAssigneeFilter${i}">
            ${assigneeList.map((data) => {
              if (obj.assignee === data.name) {
                return `<option selected value=${data.name}>
                ${data.name}
                </option>`;
              } else {
                return `
                <option value=${data.name}>
                ${data.name}
                </option>`;
              }
            })}
          </select><br>
          <select id="taskStatusFilter${i}">
            ${statusTask.map((obj) => {
              if (obj.status === "ToDo") {
                return `<option selected value=${obj.status}>
                ${obj.status}
                </option>
                `;
              } else {
                return `
                <option value=${obj.status}>
                ${obj.status}
                </option>`;
              }
            })}
          </select>
        </div>`;
    } else if (obj.status === "InProgress") {
      document.getElementById("assigneeProgressTask").innerHTML += `
          <div class="inProgressAddData" key=${i} onchange="filterMyAssignee(${i})">
            <div>${obj.title}</div>
            <div>${obj.description}</div>
            <select id="cardAssigneeFilter${i}">
              ${assigneeList.map((data) => {
                if (obj.assignee === data.name) {
                  return `<option selected value=${data.name}>
                  ${data.name}
                  </option>`;
                } else {
                  return `
                  <option value=${data.name}>
                  ${data.name}
                  </option>`;
                }
              })}
            </select><br>
            <select id="taskStatusFilter${i}" >
              ${statusTask.map((obj) => {
                if (obj.status === "InProgress") {
                  return `<option selected value=${obj.status}>
                  ${obj.status}
                  </option>
                  `;
                } else {
                  return `
                  <option value=${obj.status}>
                  ${obj.status}
                  </option>`;
                }
              })}
            </select>
          </div>`;
    } else if (obj.status === "Done") {
      document.getElementById("assigneeDoneTask").innerHTML += `
            <div class="doneAddData" key=${i} onchange="filterMyAssignee(${i})">
              <div>${obj.title}</div>
              <div>${obj.description}</div>
              <select id="cardAssigneeFilter${i}">
                ${assigneeList.map((data) => {
                  if (obj.assignee === data.name) {
                    return `<option selected value=${data.name}>
                    ${data.name}
                    </option>`;
                  } else {
                    return `
                    <option value=${data.name}>
                    ${data.name}
                    </option>`;
                    InProgress;
                  }
                })}
              </select><br>
              <select id="taskStatusFilter${i}" >
                ${statusTask.map((obj) => {
                  if (obj.status === "Done") {
                    return `<option selected value=${obj.status}>
                    ${obj.status}
                    </option>
                    `;
                  } else {
                    return `
                    <option value=${obj.status}>
                    ${obj.status}
                    </option>`;
                  }
                })}
              </select>
            </div>`;
    }
  });
}

//filter asssignee
function filterAssigneeList() {
  destinationList.length = 0;
  document.getElementById("sectionTask").style.display = "none";
  document.getElementById("taskAssigneeDisplay").style.display = "block";
  let assigneeVal = document.getElementById("assignee-filter").value;
  let statusVal = document.getElementById("task-status").value;

  let findAssignee = data.find((obj) => {
    if (obj.assignee === assigneeVal) {
      console.log(obj);
      destinationList.push(obj);
      document.getElementById("task-status").value = "defaultStatus";
    } else if (obj.status === statusVal) {
      console.log(obj);
      destinationList.push(obj);
      document.getElementById("task-status").value = "defaultStatus";
    } else if (statusVal === "all") {
      console.log(obj);
      destinationList.push(obj);
      document.getElementById("assignee-filter").value = "assignee";
    } else {
      document.getElementById("assignee-filter").value = "assignee";
      document.getElementById("task-status").value = "defaultStatus";
    }
  });

  document.getElementById("assigneeTodoTask").innerHTML = "";
  document.getElementById("assigneeProgressTask").innerHTML = "";
  document.getElementById("assigneeDoneTask").innerHTML = "";
  assigneeTaskFilterout();
}

//filter assignee change
function filterMyAssignee(i) {
  const assignChange = document.getElementById(`cardAssigneeFilter${i}`).value;
  destinationList[i].assignee = assignChange;
  const statusChange = document.getElementById(`taskStatusFilter${i}`).value;
  destinationList[i].status = statusChange;
  filterAssigneeList();
}

// show formList on clicking Submit button from form after entering data
const submitBtn = document.getElementById("submit");
submitBtn.onclick = function () {
  document.getElementById("formlist").style.display = "block";
  document.getElementById("form").style.display = "none";
};

// reset form after submit data
function resetFormData() {
  document.getElementById("title").value = "";
  document.getElementById("desc").value = "";
  document.getElementById("assignee").value = "select"; // while adding task if you don't select then it will assign to all
}
