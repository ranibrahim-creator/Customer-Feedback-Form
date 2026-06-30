(function () {
  var STORAGE_KEY = "noon-feedback-lang";

  var translations = {
    en: {
      pageTitle: "Customer Feedback | noon",
      langSwitchAria: "Language",
      greeting: "Hala!",
      step1Headline:
        "We recently assisted you with your concern. Was your concern handled as needed?",
      step1ActionsAria: "Resolution status",
      sentimentNotFixedTitle: "No, it's not fixed",
      sentimentAllFixedTitle: "Yes, it's fixed",
      step2aHeadline: "Thank you for your feedback. We're glad we could help.",
      successPlaceholder: "We'd love to hear more.",
      successAria: "Optional feedback",
      submitBtn: "Submit",
      step2bHeadline:
        "We're sorry your experience did not meet expectations. Please tell us how we can improve.",
      step2bSubhead: "What went wrong?",
      issueOptionsAria: "Issue reasons",
      optionSolution: "The solution didn't work",
      optionSpeed: "It took too long to resolve",
      optionAgent: "The agent didn't understand my problem",
      optionOther: "Other",
      step2cHeadline: "Could you share a bit more detail so we can improve your experience?",
      step2cPlaceholder: "Share any additional details…",
      step2cAria: "Additional details",
      optionalCommentsPlaceholder: "Share any additional details…",
      optionalCommentsAria: "Optional comments",
      issueError: "Please select an option to continue.",
      submitFeedback: "Submit Feedback",
      doneHeadline: "Thanks! Your feedback means a lot.",
      doneLede: "We'll use it to deliver a better noon experience.",
    },
    ar: {
      pageTitle: "ملاحظات العملاء | noon",
      langSwitchAria: "اللغة",
      greeting: "هلا!",
      step1Headline: "لقد ساعدناك مؤخراً في مشكلتك. هل تم التعامل مع مشكلتك كما ينبغي؟",
      step1ActionsAria: "حالة الحل",
      sentimentNotFixedTitle: "لا، لم تُحل",
      sentimentAllFixedTitle: "نعم، تم حلها",
      step2aHeadline: "شكراً على ملاحظاتك. يسعدنا أننا تمكنا من مساعدتك.",
      successPlaceholder: "نود أن نسمع المزيد.",
      successAria: "ملاحظات اختيارية",
      submitBtn: "إرسال",
      step2bHeadline:
        "نأسف لأن تجربتك لم تكن كما توقعت. يرجى إخبارنا كيف يمكننا التحسين.",
      step2bSubhead: "ما الذي حدث؟",
      issueOptionsAria: "أسباب المشكلة",
      optionSolution: "الحل لم ينجح",
      optionSpeed: "استغرق الحل وقتاً طويلاً",
      optionAgent: "لم يفهم الموظف مشكلتي",
      optionOther: "أخرى",
      step2cHeadline: "هل يمكنك مشاركة المزيد من التفاصيل حتى نتمكن من تحسين تجربتك؟",
      step2cPlaceholder: "شارك أي تفاصيل إضافية…",
      step2cAria: "تفاصيل إضافية",
      optionalCommentsPlaceholder: "شارك أي تفاصيل إضافية…",
      optionalCommentsAria: "تعليقات اختيارية",
      issueError: "يرجى اختيار خيار للمتابعة.",
      submitFeedback: "إرسال الملاحظات",
      doneHeadline: "شكراً! ملاحظاتك تهمنا كثيراً.",
      doneLede: "سنستخدمها لتقديم تجربة noon أفضل.",
    },
  };

  var steps = {
    1: document.getElementById("step-1"),
    "2a": document.getElementById("step-2a"),
    "2b": document.getElementById("step-2b"),
    "2c": document.getElementById("step-2c"),
    done: document.getElementById("step-done"),
  };

  var currentStep = "1";
  var currentLang = "en";
  var otherPanel = document.getElementById("other-panel");

  function getStoredLang() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      return stored === "ar" || stored === "en" ? stored : null;
    } catch (e) {
      return null;
    }
  }

  function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;

    var copy = translations[lang];
    var html = document.documentElement;

    html.lang = lang;
    html.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = copy.pageTitle;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (copy[key]) el.textContent = copy[key];
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      if (copy[key]) el.placeholder = copy[key];
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria");
      if (copy[key]) el.setAttribute("aria-label", copy[key]);
    });

    document.querySelector(".lang-switch").setAttribute("aria-label", copy.langSwitchAria);

    document.querySelectorAll(".lang-switch__btn").forEach(function (btn) {
      var isActive = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* ignore */
    }
  }

  function toggleOtherPanel(show) {
    if (!otherPanel) return;
    otherPanel.classList.toggle("panel--open", show);
  }

  function resetStep2b() {
    var form = document.getElementById("form-2b");
    if (form) form.reset();
    toggleOtherPanel(false);
    document.getElementById("issue-error").hidden = true;
  }

  function resetStep2c() {
    var form = document.getElementById("form-2c");
    if (form) form.reset();
  }

  function getFocusTarget(stepEl) {
    return (
      stepEl.querySelector(".slate__input") ||
      stepEl.querySelector(".option-item__input") ||
      stepEl.querySelector(".sentiment-card") ||
      stepEl.querySelector(".btn--primary") ||
      stepEl.querySelector(".btn--secondary")
    );
  }

  function showStep(nextStep) {
    var outgoing = steps[currentStep];
    var incoming = steps[nextStep];

    if (!incoming || nextStep === currentStep) return;

    if (nextStep === "2b") resetStep2b();
    if (nextStep === "2c") resetStep2c();

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

          var focusTarget = getFocusTarget(incoming);
          if (focusTarget) focusTarget.focus({ preventScroll: true });
        },
        { once: true }
      );
    } else {
      incoming.hidden = false;
    }

    currentStep = nextStep;
  }

  document.querySelectorAll(".lang-switch__btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLanguage(btn.getAttribute("data-lang"));
    });
  });

  document.querySelectorAll("[data-goto]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      showStep(btn.getAttribute("data-goto"));
    });
  });

  document.querySelectorAll('input[name="issue-reason"]').forEach(function (radio) {
    radio.addEventListener("change", function () {
      toggleOtherPanel(radio.value === "other" && radio.checked);
      document.getElementById("issue-error").hidden = true;
    });
  });

  document.getElementById("form-2b").addEventListener("submit", function (e) {
    e.preventDefault();
    var selected = document.querySelector('input[name="issue-reason"]:checked');
    if (!selected) {
      document.getElementById("issue-error").hidden = false;
      return;
    }
    if (selected.value === "other") {
      showStep("done");
      return;
    }
    showStep("2c");
  });

  document.getElementById("form-2a").addEventListener("submit", function (e) {
    e.preventDefault();
    showStep("done");
  });

  document.getElementById("form-2c").addEventListener("submit", function (e) {
    e.preventDefault();
    showStep("done");
  });

  setLanguage(getStoredLang() || "en");
})();
