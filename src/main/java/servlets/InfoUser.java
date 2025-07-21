package servlets;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import database.init.JSON_Converter;
import database.tables.EditIncidentsTable;
import database.tables.EditUsersTable;
import database.tables.EditVolunteersTable;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.sql.SQLException;
import java.util.Map;

@WebServlet(name = "InfoUser", value = "/InfoUser")
public class InfoUser extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        EditUsersTable editUser=new EditUsersTable();
        String JsonVolunteer = "";
        EditVolunteersTable editVolunteers =new EditVolunteersTable();
        String JsonUser;
        HttpSession session=request.getSession();
        if(session.getAttribute("loggedIn") !=null && session.getAttribute("type").equals("user")){
            try {
                JsonUser=editUser.databaseUserToJSON((session.getAttribute("loggedIn").toString()),(session.getAttribute("password").toString()));
            } catch (SQLException | ClassNotFoundException e) {
                response.setStatus(403);
                throw new RuntimeException(e);
            }
            System.out.println(JsonUser);
            response.setStatus(200);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(JsonUser);
        }else if(session.getAttribute("loggedIn") !=null && session.getAttribute("type").equals("volunteer"))
            try {
                JsonVolunteer=editVolunteers.databaseVolunteerToJSON((session.getAttribute("loggedIn").toString()),(session.getAttribute("password").toString()));
            } catch (SQLException | ClassNotFoundException e) {
                response.setStatus(403);
                throw new RuntimeException(e);
            }
        response.setStatus(200);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(JsonVolunteer);
        }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        JSON_Converter jc = new JSON_Converter();
        String jsonString = jc.getJSONFromAjax(request.getReader());
        EditUsersTable editUser = new EditUsersTable();
        Gson gson = new Gson();
        System.out.println("EFTASA");
        Map<String, String> map = gson.fromJson(jsonString, Map.class);
        System.out.println("EFTASA1");
        String username =map.get("username");
        System.out.println(username);
        try{
            editUser.updateUser(username, "email", map.get("email"));
            editUser.updateUser(username, "password", map.get("password"));
            editUser.updateUser(username, "firstname", map.get("firstname"));
            editUser.updateUser(username, "lastname", map.get("lastname"));
            editUser.updateUser(username, "birthdate", map.get("birthdate"));
            editUser.updateUser(username, "gender", map.get("gender"));
            editUser.updateUser(username, "country", map.get("country"));
            editUser.updateUser(username, "address", map.get("address"));
            editUser.updateUser(username, "municipality", map.get("municipality"));
            editUser.updateUser(username, "prefecture", map.get("prefecture"));
            editUser.updateUser(username, "job", map.get("job"));
            editUser.updateUser(username, "lat",map.get("lat"));
            editUser.updateUser(username, "lon",map.get("lon"));
            response.setStatus(200);
        } catch (SQLException | ClassNotFoundException e) {
            response.setStatus(403);
            throw new RuntimeException("Error updating user details", e);
        }


    }
}