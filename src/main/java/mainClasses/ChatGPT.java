package mainClasses;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import org.json.JSONObject;
import org.json.JSONArray;

public class ChatGPT {

    public String key = "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";

    public String getChatGPTResponse(String text, String model) throws Exception {
        if (model.equalsIgnoreCase("turbo")) {
            return chatGPT_TURBO(text);
        }
        return "";
    }

    public String chatGPT_TURBO(String text) throws Exception {
        String url = "https://api.openai.com/v1/chat/completions";
        HttpURLConnection con = (HttpURLConnection) new URL(url).openConnection();

        con.setRequestMethod("POST");
        con.setRequestProperty("Content-Type", "application/json");
        con.setRequestProperty("Authorization", "Bearer " + key);

        JSONObject data = new JSONObject();
        data.put("model", "gpt-3.5-turbo");
        data.put("messages", new JSONArray().put(
                new JSONObject().put("role", "user").put("content", text)
        ));
        data.put("temperature", 0.7);
        data.put("max_tokens", 1500);

        con.setDoOutput(true);
        String requestBody = data.toString();
        System.out.println("Request Body: " + requestBody);

        con.getOutputStream().write(requestBody.getBytes());

        int responseCode = con.getResponseCode();
        System.out.println("Response Code: " + responseCode);

        BufferedReader in;
        if (responseCode >= 200 && responseCode < 300) {
            in = new BufferedReader(new InputStreamReader(con.getInputStream()));
        } else {
            in = new BufferedReader(new InputStreamReader(con.getErrorStream()));
        }

        String inputLine;
        StringBuilder content = new StringBuilder();

        while ((inputLine = in.readLine()) != null) {
            content.append(inputLine);
        }
        in.close();

        System.out.println("Response Body: " + content.toString());

        // Ανάλυση JSON απάντησης
        JSONObject jsonResponse = new JSONObject(content.toString());
        if (jsonResponse.has("choices")) {
            String answer = jsonResponse.getJSONArray("choices")
                    .getJSONObject(0)
                    .getString("content");
            return answer.trim();
        } else if (jsonResponse.has("error")) {
            throw new Exception(jsonResponse.getJSONObject("error").getString("message"));
        } else {
            throw new Exception("Απροσδιόριστο σφάλμα από το API.");
        }
    }
}
