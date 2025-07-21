package mainClasses;

import com.google.gson.Gson;
import database.init.JSON_Converter;
import database.tables.EditIncidentsTable;

import static spark.Spark.*;

public class IncidentsAPI {

    static String apiPath="incidents/";

    public static void main(String[] args) {

        post(apiPath , (request, response) -> {
            System.out.println("I WAS CALLED");
            Incident incident = new Gson().fromJson(request.body(), Incident.class);
            EditIncidentsTable editIncident=new EditIncidentsTable();
            editIncident.addIncidentFromJSON(editIncident.incidentToJSON(incident));
            response.status(200);
            System.out.println(incident.toString());
            return new Gson().toJson("Successfully added incident");
        });

    }


}
