(function () {
  const badge = document.getElementById("progress-badge");
  const steps = {
    1: document.getElementById("step-1"),
    "2a": document.getElementById("step-2a"),
    "2b": document.getElementById("step-2b"),
    done: document.getElementById("step-done"),
  };

  const badgeText = {
    1: "Hala! 👋",
    "2a": "YAY! 🎉",
    "2b": "Oh no! 😔",
    done: "Thanks! ✨",
  };

  let currentStep = "1";
  let selectedIssue = "";

  function showStep(nextStep) {
    const outgoing = steps[currentStep];
    const incoming = steps[nextStep];

    if (!incoming || nextStep === currentStep) return;

    badge.textContent = badgeText[nextStep] || badgeText[1];
    badge.dataset.step = nextStep;

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

  var somethingElsePanel = document.getElementById("something-else-panel");
  var issueRadios = document.querySelectorAll('input[name="issue"]');

  issueRadios.forEach(function (radio) {
    radio.addEventListener("change", function () {
      selectedIssue = radio.value;
      document.getElementById("issue-error").hidden = true;
      if (radio.value === "something-else") {
        somethingElsePanel.hidden = false;
        requestAnimationFrame(function () {
          somethingElsePanel.classList.add("panel--open");
        });
        setTimeout(function () {
          document.getElementById("issue-detail").focus();
        }, 280);
      } else {
        somethingElsePanel.classList.remove("panel--open");
        setTimeout(function () {
          somethingElsePanel.hidden = true;
        }, 280);
      }
    });
  });

  document.getElementById("form-2b").addEventListener("submit", function (e) {
    e.preventDefault();
    if (!selectedIssue) {
      document.getElementById("issue-error").hidden = false;
      return;
    }
    if (selectedIssue === "something-else") {
      var detail = document.getElementById("issue-detail").value.trim();
      if (!detail) {
        document.getElementById("issue-detail").focus();
        return;
      }
    }
    submitFeedback("2b");
  });

  document.getElementById("form-2a").addEventListener("submit", function (e) {
    e.preventDefault();
    submitFeedback("2a");
  });

  function submitFeedback(path) {
    showStep("done");
  }
})();
