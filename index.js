const mysql = require('mysql')
const inquirer = require('inquirer')

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  database: 'employee_tracker_db',
  password: 'Kiparis12'
})

connection.connect(function (err) {
  if (err) throw err
  runSearch()
})

function runSearch () {
  inquirer
    .prompt({
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        'View Employees by Manager',
        'View Department',
        'View Employee by Role',
        'Add Employee',
        'Delete Employee',
        'Update Employee Role',
        'EXIT']

    })
    .then(function (answer) {
      console.log(answer)
      switch (answer.action) {
        case 'View All Employees':
          employeeSearch()
          break

        case 'View Employees by Manager':
          viewDepartment()
          break

        case 'View Department':
          departmentSearch()
          break

        case 'Add Employee':
          addEmployee()
          break

        case 'Delete Employee':
          deleteEmployee()
          break

        case 'Update Employee Role':
          updateRole()
          break

        case 'exit':
          connection.end()
          break
      }
    })
}

function employeeSearch () {
  var query = 'SELECT * FROM employee'
  connection.query(query, function (err, res) {
    if (err) throw err
    console.table(res)
    runSearch()
  })
}

function viewDepartment () {
  connection.query('SELECT * FROM department', function (err, res) {
    if (err) throw err
    console.table(res)
    runSearch()
  })
}

function departmentSearch () {
  inquirer
    .prompt({
      type: 'list',
      name: 'choice',
      message: 'View Department?',
      choices: ['Human Resources',
                'Accounting',
                'Marketing',
                'IT',
                'Sales'
      ]
    })
    .then(function (answer) {
         connection.query(`SELECT * FROM department WHERE name = "${answer.choices}"`, function (err, res) {
        if (err) throw err
        console.table(res)
        runSearch()
      })
    })
}

const updateRole = () => {
  
  connection.query('SELECT *  FROM employee', function (err, res) {
    if (err) throw err
    console.table(res)
    inquirer.prompt([
      {
        type: 'Number',
        message: 'What is the ID of the employee you would you like to update?',
        name: 'id'
      },
      {
        type: 'number',
        message: 'What new role ID would you like to assign the employee?',
        name: 'role_id'
      }
    ]).then(answer => {
      const query = `UPDATE employee SET role_id = "${answer.role_id}" WHERE id = ${answer.id}`
      connection.query(query, function (err, res) {
        if (err) throw err
        console.log('Employee role updated!')
        runSearch()
      })
    })
  })
}

const addEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      message: 'what is the first name of the new employee?',
      name: 'first_name'
    },
    {
      type: 'input',
      message: 'what is the last name of the new employee?',
      name: 'last_name'
    },
    {
      type: 'number',
      message: 'what is the role ID of the new employee?',
      name: 'role_id'
    },
    {
      type: 'number',
      message: 'what is the manager ID of the new employee?',
      name: 'manager_id'
    }
  ])

    .then(answer => {
      const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ("${answer.first_name}", "${answer.last_name}", "${answer.role_id}", "${answer.manager_id}")`
      connection.query(query, function (err, res) {
        if (err) throw err
        console.table(res)
        runSearch()
      })
    })
}
const deleteEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      message: 'what is the first name of the employee you would like to delete?',
      name: 'first_name'
    },
    {
      type: 'input',
      message: 'what is the last name of the employee you would like to delete?',
      name: 'last_name'
    },
    {
      type: 'number',
      message: 'what is the role ID of the employee you would like to delete?',
      name: 'role_id'
    },
    {
      type: 'number',
      message: 'what is the manager ID of the employee you would like to delete?',
      name: 'manager_id'
    }
  ])

    .then(answer => {
      const query = `DELETE FROM employee WHERE(first_name, last_name, role_id, manager_id) =("${answer.first_name}", "${answer.last_name}", "${answer.role_id}", "${answer.manager_id}")`
      connection.query(query, function (err, res) {
        if (err) throw err
        console.table(res)
        runSearch()
      })
    })
}
