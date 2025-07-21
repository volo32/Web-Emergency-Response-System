package mainClasses;

import java.util.Scanner;

public class ChatGPT_Java_Code {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        ChatGPT chatGPT = new ChatGPT();

        System.out.println("Καλώς ήρθατε στο ChatGPT API Demo!");
        System.out.println("Πληκτρολογήστε το ερώτημά σας ή 'exit' για έξοδο:");

        while (true) {
            System.out.print("\nΕρώτηση: ");
            String input = scanner.nextLine();

            if (input.equalsIgnoreCase("exit")) {
                System.out.println("Έξοδος... Ευχαριστούμε που χρησιμοποιήσατε το ChatGPT API!");
                break;
            }

            try {
                System.out.println("\nΕπιλέξτε μοντέλο (π.χ., davinci ή turbo): ");
                String model = scanner.nextLine();

                String response = chatGPT.getChatGPTResponse(input, model);
                System.out.println("\nΑπάντηση από ChatGPT:\n" + response);
            } catch (Exception e) {
                System.out.println("Σφάλμα κατά την επικοινωνία με το API: " + e.getMessage());
            }
        }

        scanner.close();
    }
}
