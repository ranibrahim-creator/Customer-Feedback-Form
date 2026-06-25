(function () {
  var STORAGE_KEY = "noon-feedback-lang";

  var translations = {
    en: {
      pageTitle: "Customer Feedback | noon",
      langSwitchAria: "Language",
      greeting: "Hala!",
      step1Headline:
        "We recently assisted you with your concern. Was everything sorted out to your satisfaction?",
      step1ActionsAria: "Resolution status",
      yesFixed: "Yes, All Fixed!",
      noHelp: "No, Still Need Help",
      step2aHeadline: "We're so glad we could get that sorted for you.",
      step2aLede: "Is there anything else we can do to make your noon experience even better?",
      successPlaceholder: "Share anything on your mind — we're all ears…",
      successAria: "Optional feedback",
      doneBtn: "Done",
      previousBtn: "Previous",
      step2bHeadline: "Let's make this right. What went wrong?",
      issuePlaceholder:
        "Please spill the details here so we can jump on this and fix it for you ASAP…",
      issueAria: "Describe what went wrong",
      quickTagsAria: "Quick suggestions",
      chipSpeed: "Resolution Speed",
      chipAgent: "Agent Understanding",
      chipSolution: "Solution Didn't Work",
      chipInject: {
        speed: "The resolution took too long.",
        agent: "The agent didn't fully understand my issue.",
        solution: "The solution provided didn't work for me.",
      },
      issueError: "Please share a few words so we can help.",
      submitFeedback: "Submit Feedback",
      doneHeadline: "Thanks! Your feedback means a lot.",
      doneLede: "We'll use it to deliver a better noon experience.",
    },
    ar: {
      pageTitle: "ملاحظات العملاء | noon",
      langSwitchAria: "اللغة",
      greeting: "هلا!",
      step1Headline: "لقد ساعدناك مؤخراً في مشكلتك. هل تم حل كل شيء على رضاك؟",
      step1ActionsAria: "حالة الحل",
      yesFixed: "نعم، تم حل كل شيء!",
      noHelp: "لا، ما زلت بحاجة للمساعدة",
      step2aHeadline: "يسعدنا أننا تمكنا من حل مشكلتك.",
      step2aLede: "هل هناك أي شيء آخر يمكننا فعله لتحسين تجربتك مع noon؟",
      successPlaceholder: "شاركنا أي أفكار — نحن نستمع…",
      successAria: "ملاحظات اختيارية",
      doneBtn: "تم",
      previousBtn: "السابق",
      step2bHeadline: "دعنا نصلح هذا. ما الذي حدث؟",
      issuePlaceholder: "شاركنا التفاصيل حتى نتمكن من التدخل وإصلاح الأمر في أسرع وقت…",
      issueAria: "صف ما حدث",
      quickTagsAria: "اقتراحات سريعة",
      chipSpeed: "سرعة الحل",
      chipAgent: "فهم الموظف",
      chipSolution: "الحل لم ينجح",
      chipInject: {
        speed: "استغرق الحل وقتاً طويلاً.",
        agent: "لم يفهم الموظف مشكلتي بالكامل.",
        solution: "الحل المقدم لم ينجح معي.",
      },
      issueError: "يرجى كتابة بضع كلمات حتى نتمكن من المساعدة.",
      submitFeedback: "إرسال الملاحظات",
      doneHeadline: "شكراً! ملاحظاتك تهمنا كثيراً.",
      doneLede: "سنستخدمها لتقديم تجربة noon أفضل.",
    },
  };

  var steps = {
    1: document.getElementById("step-1"),
    "2a": document.getElementById("step-2a"),
    "2b": document.getElementById("step-2b"),
    done: document.getElementById("step-done"),
  };

  var currentStep = "1";
  var currentLang = "en";

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

  function getChipPhrase(chip) {
    var key = chip.getAttribute("data-chip");
    return translations[currentLang].chipInject[key];
  }

  function getFocusTarget(stepEl) {
    return (
      stepEl.querySelector(".slate__input") ||
      stepEl.querySelector(".btn--primary") ||
      stepEl.querySelector(".btn--link")
    );
  }

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

  document.querySelectorAll(".chip[data-chip]").forEach(function (chip) {
    chip.addEventListener("click", function () {
      var textarea = document.getElementById("issue-feedback");
      var phrase = getChipPhrase(chip);
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

  setLanguage(getStoredLang() || "en");
})();
