package servlets;

import database.init.JSON_Converter;
import database.tables.CheckForDuplicatesExample;
import database.tables.EditUsersTable;
import database.tables.EditVolunteersTable;
import mainClasses.User;
import mainClasses.Volunteer;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

@WebServlet(name = "RegisterVolunteer", value = "/RegisterVolunteer")
public class RegisterVolunteer extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        JSON_Converter jc= new JSON_Converter();
        String JsonString= jc.getJSONFromAjax(request.getReader());
        EditVolunteersTable editVol= new EditVolunteersTable();
        Volunteer vol = editVol.jsonToVolunteer(JsonString);

        CheckForDuplicatesExample checkUsername= new CheckForDuplicatesExample();
        boolean booleanUsername;
        try {
            booleanUsername= checkUsername.isUserNameAvailable(vol.getUsername());
        } catch (SQLException | ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
        if(!booleanUsername){
            response.setStatus(403);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            return ;
        }

        String JsonString1=editVol.volunteerToJSON(vol);
        PrintWriter out = response.getWriter();
        System.out.println(JsonString1);
        try {
            editVol.addVolunteerFromJSON(JsonString1);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }

    }
}