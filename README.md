E-199 is a university project developed for the HY359 "Web Programming" course at the University of Crete. It implements a web-based emergency incident management system designed to coordinate emergency events (such as fires) and facilitate communication between users, volunteers, and the fire department.

The platform supports four types of users: administrators, registered users, volunteer firefighters, and guests. Each user role has access to specific functionality based on their privileges.

Administrators manage the full lifecycle of incidents: they validate reports, assign volunteers, update incident status, communicate via public/private messages, and monitor statistics using visual tools like Google Charts.

Registered users can create an account, submit incident reports with location information (address or GPS), receive alerts for nearby events, and message admins during active emergencies.

Volunteer firefighters can register, view available missions, declare participation, exchange messages with the admin, and review their response history.

Guests are allowed to report incidents without logging in by providing basic information such as phone number and location. All users can view live incident data on a map and access external resources or information links. Integration with the ChatGPT API is optionally available for safety tips and real-time guidance.

Technically, the system is built using Java Servlets and JSP on the backend, HTML/CSS/JavaScript on the frontend, and AJAX/REST for asynchronous communication. A MySQL database is used to store users, incidents, messages, and system data.

E-199 is designed as a realistic simulation of an emergency coordination system, combining modern web technologies, user-role logic, and real-time data flow. The goal is to deliver a clear, responsive, and practical web platform that showcases key web development skills in a critical real-world scenario.

