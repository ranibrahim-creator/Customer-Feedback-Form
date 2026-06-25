(function () {
  var steps = {
    1: document.getElementById("step-1"),
    "2a": document.getElementById("step-2a"),
    "2b": document.getElementById("step-2b"),
    done: document.getElementById("step-done"),
  };

  var currentStep = "1";

  function showStep(nextStep) {
    var outgoing = steps[currentStep];
    var incoming = steps[nextStep];

    if (!incoming || nextStep === currentStep) return;

    if (outgoing) {
      outgoing.classList.add("step--exit");
      outgoing.addEventListener(
        "transitionend",
        function onExit() {
          outgoing.removeEventListener("transitionend", onExit);
          outgoing.hidden = true;
          outgoing.classList.remove("step--exit");

          incoming.hidden = false;
          incoming.classList.add("step--enter");
          requestAnimationFrame(function () {
            incoming.classList.remove("step--enter");
          });

          var focusTarget = incoming.querySelector(".field__textarea, .choice");
          if (focusTarget) focusTarget.focus();
        },
        { once: true }
      );
    } else {
      incoming.hidden = false;
    }

    currentStep = nextStep;
  }

  document.querySelectorAll("[data-goto]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      showStep(btn.getAttribute("data-goto"));
    });
  });

  document.querySelectorAll(".chip[data-inject]").forEach(function (chip) {
    chip.addEventListener("click", function () {
      var textarea = document.getElementById("issue-feedback");
      var phrase = chip.getAttribute("data-inject");
      if (!textarea || !phrase) return;

      var current = textarea.value.trim();
      textarea.value = current ? current + " " + phrase : phrase;
      textarea.focus();

      chip.classList.add("chip--used");
      setTimeout(function () {
        chip.classList.remove("chip--used");
      }, 400);

      document.getElementById("issue-error").hidden = true;
    });
  });

  document.getElementById("form-2b").addEventListener("submit", function (e) {
    e.preventDefault();
    var textarea = document.getElementById("issue-feedback");
    if (!textarea.value.trim()) {
      document.getElementById("issue-error").hidden = false;
      textarea.focus();
      return;
    }
    showStep("done");
  });

  document.getElementById("form-2a").addEventListener("submit", function (e) {
    e.preventDefault();
    showStep("done");
  });
})();
