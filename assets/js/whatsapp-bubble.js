$(document).on("click", "#send-it", function () {
  var chatInput = document.getElementById("chat-input").value.trim();
  if (chatInput !== "") {
    var phoneNumber = $("#get-number").text();
    var message = "&text=" + encodeURIComponent(chatInput);
    var url = "https://api.whatsapp.com/send";
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      url = "whatsapp://send";
    }
    var whatsappUrl = url + "?phone=" + phoneNumber + message;
    window.open(whatsappUrl, "_blank");
  }
});

$(document).on("click", ".informasi", function () {
  $("#get-number").html($(this).children(".my-number").text());
  $(".start-chat,.get-new").addClass("show").removeClass("hide");
  $(".home-chat,.head-home").addClass("hide").removeClass("show");
  $("#get-nama").html(
    $(this).children(".info-chat").children(".chat-nama").text()
  );
  $("#get-label").html(
    $(this).children(".info-chat").children(".chat-label").text()
  );
});

$(document).on("click", ".close-chat", function () {
  $("#whatsapp-chat").addClass("hide").removeClass("show");
});

$(document).ready(function () {
  var animationFrameId = null;

  function typeMessage(element, message, callback) {
    var i = 0;
    var startTime = null;

    function animateMessage(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = timestamp - startTime;

      if (progress > 25) {
        if (i < message.length) {
          element.html(message.substring(0, i + 1));
          i++;
          startTime = timestamp;
        } else {
          if (callback) callback();
          return;
        }
      }

      animationFrameId = requestAnimationFrame(animateMessage);
    }

    animationFrameId = requestAnimationFrame(animateMessage);
  }

  function updateMessageTime() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var formattedTime = hours + ":" + (minutes < 10 ? "0" + minutes : minutes);
    $("#chat-time").text(formattedTime);
  }

  function resetChat() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
    $("#chat-message").html("");
    $("#chat-time").text("1:40");
  }

  $(document).on("click", ".show-chat-btn", function () {
    $("#whatsapp-chat").toggleClass("show");

    if ($("#whatsapp-chat").hasClass("show")) {
      resetChat();
      var messageText =
        "Olá! 😊 Estamos aqui para cuidar da sua saúde digestiva com soluções personalizadas. Nossos atendentes especializados estão à disposição para te ajudar com exames e tratamentos.<br /><br />Como posso te ajudar hoje?";
      typeMessage($("#chat-message"), messageText, function () {
        updateMessageTime();
      });
    } else {
      resetChat(); // Reseta o chat ao fechar
    }
  });
});
