package servlets;

import com.google.gson.Gson;
import database.init.JSON_Converter;
import database.tables.EditIncidentsTable;
import mainClasses.Incident;
import java.time.LocalDateTime;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@WebServlet(name = "IncidentRegister", value = "/IncidentRegister")
public class IncidentRegister extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ArrayList<Incident> incidents;
        EditIncidentsTable editIncidentsTable = new EditIncidentsTable();
        String type=request.getParameter("typeget");
        String status=request.getParameter("statusget");
        String municipality=request.getParameter("municipalityget");
        System.out.println(type+status+municipality);
        try {
            incidents=editIncidentsTable.databaseToIncidentsSearch(type,status,municipality);
        } catch (SQLException | ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
        if(incidents.isEmpty()){
            response.setStatus(403);
            return;
        }
        String json = new Gson().toJson(incidents);
        System.out.println(json);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        JSON_Converter jc= new JSON_Converter();
        String JsonString= jc.getJSONFromAjax(request.getReader());
        EditIncidentsTable editIncident=new EditIncidentsTable();
        try {
            editIncident.addIncidentFromJSON(JsonString);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
        response.setStatus(200);


    }


    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        JSON_Converter jc= new JSON_Converter();
        String JsonString= jc.getJSONFromAjax(request.getReader());
        EditIncidentsTable editIncident=new EditIncidentsTable();
        HashMap<String, String> updates= new HashMap<>();
        LocalDateTime now = LocalDateTime.now();
        Gson gson = new Gson();
        Map<String, String> map = gson.fromJson(JsonString, Map.class);
        String id = map.get("putid");
        updates.put("status",map.get("putstatus"));
        updates.put("end_datetime", String.valueOf(now));
        try {
            editIncident.updateIncident(id,updates);
            response.setStatus(200);
        } catch (SQLException | ClassNotFoundException e) {
            response.setStatus(403);
            throw new RuntimeException(e);
        }

    }


    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        JSON_Converter jc= new JSON_Converter();
        String JsonString= jc.getJSONFromAjax(request.getReader());
        Gson gson = new Gson();
        Map<String, String> map = gson.fromJson(JsonString, Map.class);
        String id = map.get("delid");
        EditIncidentsTable editIncidentsTable = new EditIncidentsTable();
        id=id.trim();
        try {
            editIncidentsTable.deleteIncident(id);
            response.setStatus(200);
        } catch (SQLException | ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
    }
}