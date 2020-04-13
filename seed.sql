use employee_trackername_db;

INSERT INTO department (name)
VALUES  ("Human Resources"), 
        ("Accounting"), 
        ("Marketing"), 
        ("IT"), 
        ("Sales");

INSERT INTO role (title, salary, department_id)
VALUE   ("Supervisor", 70000, 1), 
        ("Accountant", 60000, 2), 
        ("Marketing", 100000, 3),   
        ("Sales", 65000, 4), 
        ("Manager", 50000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE   ("Dwight", "Schrute", 2, 4), 
        ("Jim", "Halpert", 2, 1), 
        ("Pam", "Beesly", 3, 2), 
        ("Stanley", "Hudson", 3, 2), 
        ("Kevin", "Malone", 4, 3), 
        ("Angela", "Martin", 4, 3), 
        ("Phyllis", "Vance", 3, 1), 
        ("Meredith", "Palmer", 3, 4),
        ("Michael", "Scott", 1, 1);