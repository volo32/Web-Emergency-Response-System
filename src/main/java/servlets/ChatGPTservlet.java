package servlets;

import mainClasses.ChatGPT;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONObject;

@WebServlet("/chatgpt")
public class ChatGPTservlet extends HttpServlet {

    private ChatGPT chatGPT = new ChatGPT();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String question = request.getParameter("question");
        String model = request.getParameter("model");

        try {
            System.out.println("question " + question);
            System.out.println("model " + model);

            String answer = chatGPT.getChatGPTResponse(question, model);

            System.out.println(" ChatGPT API: " + answer);


            JSONObject jsonResponse = new JSONObject();
            jsonResponse.put("answer", answer);


            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(jsonResponse.toString());
        } catch (Exception e) {

            System.err.println("error ChatGPT API: " + e.getMessage());
            e.printStackTrace();

            JSONObject errorResponse = new JSONObject();
            errorResponse.put("error", e.getMessage());

            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(errorResponse.toString());
        }
    }
}
