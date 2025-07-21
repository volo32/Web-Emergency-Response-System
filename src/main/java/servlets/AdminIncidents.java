package servlets;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import database.init.JSON_Converter;
import database.tables.EditIncidentsTable;
import mainClasses.Incident;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@WebServlet(name = "AdminIncidents", value = "/AdminIncidents")
public class AdminIncidents extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        EditIncidentsTable editIncidents=new EditIncidentsTable();
        ArrayList<Incident> incidents;
        try {
            incidents=editIncidents.databaseToIncidents();
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
        JSON_Converter jc= new JSON_Converter();
        String JsonString= jc.getJSONFromAjax(request.getReader());
        EditIncidentsTable editIncident=new EditIncidentsTable();
        try {
            editIncident.addIncidentFromJSON(JsonString);
            response.setStatus(200);
        } catch (ClassNotFoundException e) {
            response.setStatus(403);
            throw new RuntimeException(e);
        }


    }


    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        JSON_Converter jc = new JSON_Converter();
        String jsonString = jc.getJSONFromAjax(request.getReader());
        System.out.println(jsonString);
        EditIncidentsTable editIncident = new EditIncidentsTable();
        LocalDateTime now = LocalDateTime.now();
        Gson gson = new Gson();


        List<Map<String, Object>> incidentsList;
        try {
            incidentsList = gson.fromJson(jsonString, new TypeToken<List<Map<String, Object>>>() {}.getType());
        } catch (Exception e) {
            response.setStatus(400); // Bad request
            response.getWriter().write("Invalid JSON format");
            return;
        }


        StringBuilder errorDetails = new StringBuilder();

        for (Map<String, Object> incident : incidentsList) {


            String id = String.valueOf(incident.get("incident_id"));
            if (id == null || id.isEmpty()) {
                errorDetails.append("Missing or invalid incident_id for one update. ");
                continue;
            }



            HashMap<String, String> updates = new HashMap<>();

            updates.put("incident_type", String.valueOf(incident.get("incident_type")));
            updates.put("description", String.valueOf(incident.get("description")));
            updates.put("user_phone", String.valueOf(incident.get("user_phone")));
            updates.put("user_type", String.valueOf(incident.get("user_type")));
            updates.put("address", String.valueOf(incident.get("address")));
            updates.put("prefecture", String.valueOf(incident.get("prefecture")));
            updates.put("municipality", String.valueOf(incident.get("municipality")));
            updates.put("start_datetime", String.valueOf(incident.get("start_datetime")));
            updates.put("end_datetime", String.valueOf(now));
            updates.put("danger", String.valueOf(incident.get("danger")));
            updates.put("status", String.valueOf(incident.get("status")));
            System.out.println("Danger: " + updates.get("danger"));
            System.out.println("Status: " + updates.get("status"));
            updates.put("finalResult", String.valueOf(incident.get("finalResult")));
            updates.put("lat", String.valueOf(incident.get("lat")));
            updates.put("lon", String.valueOf(incident.get("lon")));
            updates.put("vehicles", String.valueOf(incident.get("vehicles")));
            updates.put("firemen", String.valueOf(incident.get("firemen")));


            try {
                editIncident.updateIncident(id, updates);
                response.setStatus(200);
            } catch (SQLException | ClassNotFoundException e) {

                errorDetails.append("Error updating incident with ID ").append(id).append(": ").append(e.getMessage()).append(". ");
            }
        }



    }

}