function askChatGPT() {
    const data = {
        question: $("#question").val(),
        model: $("#model").val(),
    };

    $("#chatgptResponse").text("Περιμένετε...");

    $.ajax({
        url: "/HY359_ask2_war_exploded/chatgpt",
        type: "POST",
        contentType: "application/x-www-form-urlencoded",
        data: data,
        success: function(response) {
            if (response.answer) {
                $("#chatgptResponse").text("Απάντηση από ChatGPT: " + response.answer);
            } else if (response.error) {
                $("#chatgptResponse").text("Σφάλμα από ChatGPT: " + response.error);
            } else {
                $("#chatgptResponse").text("Δεν βρέθηκε απάντηση από το ChatGPT.");
            }
        },
        error: function(xhr, status, error) {
            $("#chatgptResponse").text("Σφάλμα: " + xhr.responseText);
        }
    });
}
