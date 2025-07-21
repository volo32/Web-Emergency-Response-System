package servlets;

import com.google.gson.Gson;
import database.tables.EditIncidentsTable;
import mainClasses.Incident;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;

@WebServlet(name = "ActiveIncidents", value = "/ActiveIncidents")
public class ActiveIncidents extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        EditIncidentsTable editIncidents=new EditIncidentsTable();
        ArrayList<Incident> incidents;
        try {
            incidents=editIncidents.databaseToActiveIncidents();
            response.setStatus(200);
        } catch (SQLException | ClassNotFoundException e) {
            response.setStatus(500);
            throw new RuntimeException(e);
        }
        Gson gson = new Gson();
        String json = gson.toJson(incidents);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(json);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}