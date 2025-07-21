Project Description – E-199 Emergency Response System

The E-199 platform is a web-based emergency incident management system developed as part of the HY359 "Web Programming" course at the University of Crete. The main goal of the project is to provide a dynamic, interactive system that supports the coordination of emergency events (such as fires) and enhances communication between citizens, volunteers, and emergency authorities.

The system supports four types of users: administrators (fire department), registered users, volunteer firefighters, and guests. Each user has access to specific features tailored to their role.

Administrators have full control of the system: they validate incident reports, coordinate actions, assign volunteers, send public or private messages, and monitor statistics via visual tools like Google Charts. They are the only ones who can change the status of an incident (e.g., from “submitted” to “running” or “finished”).

Registered users can create accounts, report incidents with full location data (address or GPS), receive alerts for nearby events based on geolocation, and communicate with admins about ongoing emergencies. Volunteer firefighters can declare availability for missions and communicate with the admin through a secure message system. They can also view their participation history and receive updates about active events.

Guests are allowed to report incidents without authentication by providing only basic information such as phone number and location. All users can view active incidents on a map and access helpful resources and external links. The system may also optionally integrate the ChatGPT API to provide intelligent safety tips and guidance.

From a technical perspective, the system uses Java Servlets and JSP for server-side logic, HTML/CSS/JavaScript for the client-side, and AJAX/REST for dynamic data interaction. A MySQL database supports persistent storage of users, events, and communication.

E-199 aims to simulate a realistic emergency coordination platform, with emphasis on usability, clarity, and functional completeness. It combines real-time interaction, user-role separation, geolocation services, and asynchronous communication to support effective emergency response simulation on a modern web architecture.
