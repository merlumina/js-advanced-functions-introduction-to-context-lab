function createEmployeeRecord(array) {
  let employee = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  };
  return employee;
}

function createEmployeeRecords(employees) {
  return employees.map(createEmployeeRecord);
}

function createTimeInEvent(employee, dateTimeString) {
  employee.timeInEvents.push({
    type: 'TimeIn',
    date: dateTimeString.split(" ")[0],
    hour: parseInt(dateTimeString.split(" ")[1])
  });
  return employee;
}

function createTimeOutEvent(employee, dateTimeString) {
  employee.timeOutEvents.push({
    type: 'TimeOut',
    date: dateTimeString.split(" ")[0],
    hour: parseInt(dateTimeString.split(" ")[1])
  });
  return employee;
}

function hoursWorkedOnDate(employee, givenDate) {
  const timeIn = employee.timeInEvents.find((e) => { return e.date == givenDate}).hour;
  const timeOut = employee.timeOutEvents.find((e) => { return e.date == givenDate}).hour;
  if (timeIn > timeOut) {
    return (2400 - timeIn + timeOut) / 100;
  } else {
    return (timeOut - timeIn) / 100;
  }
}

function wagesEarnedOnDate(employee, givenDate) {
  return employee.payPerHour * hoursWorkedOnDate(employee, givenDate);
}

function allWagesFor(employee) {
  const datesWorked = employee.timeInEvents.map((e) => e.date);
  const wagesForAllDates = datesWorked.map((date) => wagesEarnedOnDate(employee, date));
  return wagesForAllDates.reduce((currentTotal, wage) => currentTotal + wage);
}

function calculatePayroll(employees) {
  return employees.reduce((memo, record) => memo + allWagesFor(record), 0);
}

function findEmployeeByFirstName(employees, name) {
  return employees.find(employee => employee.firstName == name);
}