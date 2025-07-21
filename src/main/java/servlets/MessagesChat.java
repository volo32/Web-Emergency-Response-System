package servlets;

import com.google.gson.Gson;
import database.init.JSON_Converter;
import database.tables.EditMessagesTable;
import mainClasses.Message;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Map;

@WebServlet(name = "MessagesChat", value = "/MessagesChat")
public class MessagesChat extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int incidentId = Integer.parseInt(request.getParameter("incident_id"));
        HttpSession session = request.getSession();
        session.setAttribute("OpenChat",incidentId);
        EditMessagesTable editMessagesTable = new EditMessagesTable();
       try {
           ArrayList <Message> messages =editMessagesTable.databaseToMessage(incidentId);
           Gson gson = new Gson();
           String json = gson.toJson(messages);


           response.setContentType("application/json");
           response.setCharacterEncoding("UTF-8");
           response.getWriter().write(json);
           response.setStatus(200);
        } catch (SQLException | ClassNotFoundException e) {
           response.setStatus(403);
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        JSON_Converter jc= new JSON_Converter();
        EditMessagesTable editMessagesTable = new EditMessagesTable();
        int incidentId= (int)session.getAttribute("OpenChat");
        String sender =session.getAttribute("loggedIn").toString();
        String JsonString= jc.getJSONFromAjax(request.getReader());
        Gson gson = new Gson();
        LocalDateTime now = LocalDateTime.now();
        Map<String, String> map = gson.fromJson(JsonString, Map.class);
        String message = map.get("chat-content");
        String receiver = map.get("chat-receiver");
        Message messageObj = new Message();
        messageObj.setMessage(message);
        messageObj.setSender(sender);
        messageObj.setIncident_id(incidentId);
        messageObj.setRecipient(receiver);
        messageObj.setDate_time();
        try {
            editMessagesTable.createNewMessage(messageObj);
            response.setStatus(200);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }


    }
}