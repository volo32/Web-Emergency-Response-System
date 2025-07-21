package servlets;

import database.tables.EditUsersTable;
import database.tables.EditVolunteersTable;
import mainClasses.User;
import mainClasses.Volunteer;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.sql.SQLException;

@WebServlet(name = "LoginUser", value = "/LoginUser")
public class LoginUser extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session=request.getSession();

        if(session.getAttribute("loggedIn")!=null){
            response.setStatus(200);
        }
        else{
            response.setStatus(403);
        }


    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username=request.getParameter("username");
        String password=request.getParameter("password");
        HttpSession session=request.getSession(true);
        EditUsersTable editUser=new EditUsersTable();
        EditVolunteersTable editVolunteers=new EditVolunteersTable();
        User user=null;
        Volunteer volunteer=null;
        try {
            user= editUser.databaseToUsers(username,password);
            volunteer=editVolunteers.databaseToVolunteer(username,password);
            if(user!=null){
                session.setAttribute("loggedIn", username);
                session.setAttribute("password", password);
                session.setAttribute("type", "user");
                response.setStatus(200);
            }else if(volunteer!=null){
                session.setAttribute("loggedIn", username);
                session.setAttribute("password", password);
                session.setAttribute("type", "volunteer");
                response.setStatus(200);
            }else{
                response.setStatus(403);
            }
        } catch (SQLException | ClassNotFoundException e) {
            throw new RuntimeException(e);
        }


    }
}