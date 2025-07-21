package servlets;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import database.init.InitDatabase;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import database.init.*;
import database.tables.*;
import mainClasses.*;


import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class RegisterUser extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        JSON_Converter jc= new JSON_Converter();
        String JsonString= jc.getJSONFromAjax(request.getReader());
        EditUsersTable editUser= new EditUsersTable();
        User user = editUser.jsonToUser(JsonString);

        CheckForDuplicatesExample checkDuplicates= new CheckForDuplicatesExample();
        boolean booleanUsername;
        try {
            booleanUsername= checkDuplicates.isUserNameAvailable(user.getUsername());
        } catch (SQLException | ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
        if(!booleanUsername){
            response.setStatus(403);
            // Write custom error details in the response body
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            return ;
        }

        boolean booleanEmail;
        try {
            booleanEmail= checkDuplicates.isUserEmailAvailable(user.getEmail());
        } catch (SQLException | ClassNotFoundException e) {
            throw new RuntimeException(e);
        }

        if(!booleanEmail){
            response.setStatus(403);

            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            return ;
        }

        boolean booleanTelephone;
        try {
            booleanTelephone= checkDuplicates.isUserTelephoneAvailable(user.getTelephone());
        } catch (SQLException | ClassNotFoundException e) {
            throw new RuntimeException(e);
        }

        if(!booleanTelephone){
            response.setStatus(403);

            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            return ;
        }

        String JsonString1=editUser.userToJSON(user);
        PrintWriter out = response.getWriter();
        System.out.println(JsonString1);

        try {
            editUser.addUserFromJSON(JsonString1);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
        response.setStatus(200);

    }
}