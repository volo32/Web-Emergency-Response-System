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

@WebServlet(name = "Messages", value = "/Messages")
public class MessagesChatSelection extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session=request.getSession();
        EditIncidentsTable editIncidentsTable=new EditIncidentsTable();
            try {
                ArrayList<Incident> incidents=editIncidentsTable.databaseToIncidents();
                ArrayList<Integer> incidentIds = new ArrayList<>();

                for (Incident incident : incidents) {
                    if(incident.getStatus().equals("running")) {
                        incidentIds.add(incident.getIncident_id());
                    }
                }


                Gson gson = new Gson();
                String json = gson.toJson(incidentIds);


                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(json);
                response.setStatus(200);
            } catch (SQLException | ClassNotFoundException e) {
                throw new RuntimeException(e);
            }


    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}