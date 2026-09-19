/*
 * Interior Life Mapping — A Domain-Specific Emotional Intelligence Assessment
 * Companion resource to "Emotionally Whole: From the Mirror to the Door" by Winston H.K. Chew.
 *
 * Plain HTML/CSS/JS, no build step, no framework. Progress is saved to the
 * visitor's own browser (localStorage) so a refresh does not lose answers.
 * Nothing is sent anywhere — there is no server component.
 */

(function () {
  "use strict";

  var STORAGE_KEY = "ile-assessment-v1";
  var CONTEXTS = ["Personal Reflection", "Counselling Session", "Coaching", "Group Workshop"];
  var ROMAN = ["I", "II", "III", "IV", "V"];

  var DOMAINS = [
    {
      num: 1,
      name: "SELF-AWARENESS",
      subtitle: "The Mirror",
      anchor: "Psalm 139:1 — “O Lord, you have searched me and known me.”",
      icon: "mirror",
      items: [
        { id: "1.1", text: "I often reflect on my feelings and usually gain valuable insight from that reflection.", cite: "[SRIS — Grant et al., 2002]", reverse: false },
        { id: "1.2", text: "When I notice an emotional reaction in myself, I can usually identify the feeling accurately.", cite: "[SRIS / TEIQue — Petrides, 2009]", reverse: false },
        { id: "1.3", text: "I am aware of how my moods affect the people around me.", cite: "[ESCI — Boyatzis & Goleman, 2007]", reverse: false },
        { id: "1.4", text: "I can notice when I am beginning to feel stressed or anxious before others see it in my behaviour.", cite: "[MAIA — Mehling et al., 2012]", reverse: false },
        { id: "1.5", text: "It is difficult for me to understand why I feel the way I do in certain situations. ®", cite: "[SRIS — Grant et al., 2002]", reverse: true },
        { id: "1.6", text: "I am able to identify my emotions even when they conflict with what I think I should be feeling.", cite: "[DERS — Gratz & Roemer, 2004]", reverse: false },
        { id: "1.7", text: "Feedback that reveals a gap between how I see myself and how others see me is something I actively seek.", cite: "[ESCI 360 — Boyatzis & Goleman, 2007]", reverse: false }
      ],
      bands: [
        { range: "7–17", text: "Limited self-awareness. The gap between self-image and reality may be wide and largely invisible." },
        { range: "18–28", text: "Developing self-awareness. Reflection is happening; insight is inconsistent." },
        { range: "29–35", text: "Strong self-awareness. The mirror is held honestly and regularly." }
      ]
    },
    {
      num: 2,
      name: "SELF-REGULATION",
      subtitle: "The Furnace",
      anchor: "Genesis 39:9 — “How then can I do this great wickedness, and sin against God?”",
      icon: "furnace",
      items: [
        { id: "2.1", text: "When I am upset or under pressure, I am able to think about the situation in a way that helps me stay calm.", cite: "[ERQ — Gross & John, 2003]", reverse: false },
        { id: "2.2", text: "When I experience a strong negative emotion, I can find my way back to functioning within a reasonable time.", cite: "[DERS — Gratz & Roemer, 2004]", reverse: false },
        { id: "2.3", text: "When I am upset, I control my emotions by not expressing them — keeping them hidden rather than processed. ®", cite: "[ERQ — Gross & John, 2003]", reverse: true },
        { id: "2.4", text: "When I face a difficult situation, I draw on past experiences to give me confidence that I can manage it.", cite: "[CD-RISC — Connor & Davidson, 2003]", reverse: false },
        { id: "2.5", text: "When I am in conflict with someone, I am able to pause before responding rather than react immediately.", cite: "[DERS — Gratz & Roemer, 2004]", reverse: false },
        { id: "2.6", text: "I can stay committed to a long-term goal even when progress is slow and no one is affirming the effort.", cite: "[Grit Scale — Duckworth et al., 2007]", reverse: false },
        { id: "2.7", text: "When I am under sustained pressure, I have effective strategies that genuinely help — not just distractions.", cite: "[DTS — Simons & Gaher, 2005]", reverse: false }
      ],
      bands: [
        { range: "7–17", text: "Significant regulation difficulty. The furnace may be governing the person rather than forming them." },
        { range: "18–28", text: "Moderate regulation. Able to manage in most situations; specific pressure points remain unaddressed." },
        { range: "29–35", text: "Strong regulation. The interior has been brought under deliberate governance over time." }
      ]
    },
    {
      num: 3,
      name: "MOTIVATION",
      subtitle: "The Ruins",
      anchor: "Nehemiah 1:4 — “When I heard these words, I sat down and wept.”",
      icon: "ruins",
      items: [
        { id: "3.1", text: "I have a strong sense that my work makes a positive difference beyond my own career or financial gain.", cite: "[CVQ — Dik et al., 2012]", reverse: false },
        { id: "3.2", text: "My life has a clear sense of purpose that gives direction to my daily decisions.", cite: "[MLQ — Steger et al., 2006]", reverse: false },
        { id: "3.3", text: "I feel drawn toward the work I do by something I could not easily walk away from, even when it is costly.", cite: "[CVQ — Dik et al., 2012]", reverse: false },
        { id: "3.4", text: "In uncertain times, I usually expect that things will work out well.", cite: "[LOT-R — Scheier, Carver & Bridges, 1994]", reverse: false },
        { id: "3.5", text: "My current drive comes primarily from external confirmation — results, recognition, or the absence of criticism. ®", cite: "[WEIMS — Tremblay et al., 2009]", reverse: true },
        { id: "3.6", text: "I can identify a specific unmet need or broken situation in the world that I find I cannot look away from.", cite: "[CVQ / Calling — Dik et al., 2012]", reverse: false },
        { id: "3.7", text: "I continue pursuing my calling even in seasons where the outcomes do not seem to confirm the investment.", cite: "[Grit Scale — Duckworth et al., 2007]", reverse: false }
      ],
      bands: [
        { range: "7–17", text: "Motivation may be primarily excitement- or obligation-based. The burden beneath the calling needs locating." },
        { range: "18–28", text: "Mixed motivation. A genuine drive is present but may be diluted by external dependency." },
        { range: "29–35", text: "Burden-based drive. The calling is sourced in something deeper than affirmation or outcome." }
      ]
    },
    {
      num: 4,
      name: "EMPATHY",
      subtitle: "The Border Crossing",
      anchor: "Ruth 1:16 — “Where you go, I will go; where you lodge, I will lodge.”",
      icon: "border",
      items: [
        { id: "4.1", text: "I try to understand another person’s perspective fully before forming my own view in a disagreement.", cite: "[IRI (Perspective-Taking) — Davis, 1983]", reverse: false },
        { id: "4.2", text: "I often have genuine concern for people who are struggling, even when their struggle does not directly affect me.", cite: "[IRI (Empathic Concern) — Davis, 1983]", reverse: false },
        { id: "4.3", text: "I feel satisfied in my work of helping or caring for others — it still gives me energy rather than only costing it.", cite: "[ProQOL-5 — Stamm, 2010]", reverse: false },
        { id: "4.4", text: "I notice when someone around me is struggling emotionally, even when they have not said anything.", cite: "[TEIQue — Petrides, 2009]", reverse: false },
        { id: "4.5", text: "I feel drained, numb, or emotionally unavailable after sustained engagement with people in need. ®", cite: "[ProQOL-5 / CFST — Figley, 1995]", reverse: true },
        { id: "4.6", text: "I am able to be genuinely present with another person’s pain without immediately moving toward fixing it.", cite: "[IRI (Empathic Concern) — Davis, 1983]", reverse: false },
        { id: "4.7", text: "I am aware of the specific person or relationship I most consistently avoid crossing toward right now.", cite: "[Relational Needs Assessment — Erskine et al., 1999]", reverse: false }
      ],
      bands: [
        { range: "7–17", text: "Empathic depletion likely. The capacity for genuine border-crossing may be near its functional limit." },
        { range: "18–28", text: "Empathy is present but under strain. The source from which it draws needs attention." },
        { range: "29–35", text: "Strong empathic capacity. The crossing is happening; maintaining the source is the formation priority." }
      ]
    },
    {
      num: 5,
      name: "SOCIAL SKILLS",
      subtitle: "The Door",
      anchor: "Acts 16:15 — “Come to my house and stay.”",
      icon: "door",
      items: [
        { id: "5.1", text: "I am effective at influencing others’ thinking and decisions through the quality of my engagement rather than my position.", cite: "[TSIS — Silvera et al., 2001]", reverse: false },
        { id: "5.2", text: "I am able to see what another person needs to grow and to act on that seeing in ways that expand rather than diminish them.", cite: "[ICQ — Buhrmester et al., 1988]", reverse: false },
        { id: "5.3", text: "I can navigate conflict in a way that preserves the relationship while addressing the real issue.", cite: "[TKI — Thomas & Kilmann, 1974]", reverse: false },
        { id: "5.4", text: "I am good at reading unspoken social cues — noticing what is not being said as well as what is.", cite: "[TSIS — Silvera et al., 2001]", reverse: false },
        { id: "5.5", text: "The primary source of my influence in relationships is my character rather than my competence or position.", cite: "[VIA / Influence Style — Peterson & Seligman, 2004]", reverse: false },
        { id: "5.6", text: "I open doors for others to walk through — creating access and opportunity that others can benefit from.", cite: "[ICQ / SSI — Riggio, 1986]", reverse: false },
        { id: "5.7", text: "I am able to have the difficult conversation — the correction, the challenge, the honest word — in a way the other person receives as gift rather than threat.", cite: "[ICQ — Buhrmester et al., 1988]", reverse: false }
      ],
      bands: [
        { range: "7–17", text: "Social intelligence may be primarily positional or competency-based. Character-formed influence needs development." },
        { range: "18–28", text: "Growing social intelligence. The door is opening in some contexts; character formation remains the work." },
        { range: "29–35", text: "Strong character-formed social intelligence. The door is opened for others consistently." }
      ]
    }
  ];

  var TOTAL_ITEMS = DOMAINS.reduce(function (sum, d) { return sum + d.items.length; }, 0);

  var ICONS = {
    mirror: '<svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="16" cy="13" rx="9" ry="11"></ellipse><path d="M13 27h6"></path><path d="M16 24v3"></path></svg>',
    furnace: '<svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4c2 4-3 5-3 9a3 3 0 0 0 6 0c1 2 1 4 0 6a7 7 0 0 1-13 0c-1-4 1-6 3-9 0 2 1 3 2 3-1-3 1-6 5-9z"></path></svg>',
    ruins: '<svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 27V13l3-3v17"></path><path d="M14 27V9l4-4v22"></path><path d="M22 27V15l4 2v10"></path><path d="M4 27h24"></path></svg>',
    border: '<svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="16" r="8"></circle><circle cx="20" cy="16" r="8"></circle></svg>',
    door: '<svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4h13v24H9z"></path><circle cx="19" cy="16" r="1.2" fill="currentColor" stroke="none"></circle></svg>'
  };

  var state = { answers: {}, name: "", date: "", context: null };

  // ---------- persistence ----------

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          state.answers = parsed.answers || {};
          state.name = parsed.name || "";
          state.date = parsed.date || "";
          state.context = parsed.context || null;
        }
      }
    } catch (e) {
      /* localStorage unavailable or corrupt — start fresh */
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      /* storage full or unavailable — progress just won't persist */
    }
  }

  // ---------- scoring ----------

  function rawFor(items) {
    var complete = items.every(function (it) { return state.answers[it.id] != null; });
    if (!complete) return null;
    return items.reduce(function (sum, it) {
      var v = state.answers[it.id];
      return sum + (it.reverse ? 6 - v : v);
    }, 0);
  }

  function bandIndexFor(raw) {
    if (raw == null) return null;
    if (raw <= 17) return 0;
    if (raw <= 28) return 1;
    return 2;
  }

  function computeDomains() {
    return DOMAINS.map(function (d, di) {
      var raw = rawFor(d.items);
      var score = raw != null ? raw / 7 : null;
      var bandIndex = bandIndexFor(raw);
      var complete = raw != null;
      var answeredCount = d.items.filter(function (it) { return state.answers[it.id] != null; }).length;
      var status = !complete ? "incomplete" : (bandIndex === 0 ? "priority" : bandIndex === 1 ? "developing" : "strength");
      var statusLabel = !complete ? "Not yet complete" : (bandIndex === 0 ? "Priority" : bandIndex === 1 ? "Developing" : "Strength");
      return {
        def: d,
        roman: ROMAN[di],
        raw: raw,
        score: score,
        scoreLabel: score != null ? score.toFixed(1) : "—",
        bandIndex: bandIndex,
        complete: complete,
        answeredCount: answeredCount,
        status: status,
        statusLabel: statusLabel
      };
    });
  }

  // ---------- state mutation (exposed to inline handlers) ----------

  function setAnswer(id, value) {
    state.answers[id] = value;
    saveState();
    render();
  }

  function setName(value) {
    state.name = value;
    saveState();
  }

  function setDate(value) {
    state.date = value;
    saveState();
  }

  function setContext(value) {
    state.context = value === state.context ? null : value;
    saveState();
    render();
  }

  function resetAll() {
    if (!window.confirm("Clear all your answers? This cannot be undone.")) return;
    state = { answers: {}, name: "", date: "", context: null };
    saveState();
    render();
  }

  window.setAnswer = setAnswer;
  window.setName = setName;
  window.setDate = setDate;
  window.setContext = setContext;
  window.resetAll = resetAll;

  // ---------- rendering ----------

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function escapeAttr(str) {
    return escapeHtml(str).replace(/`/g, "&#96;");
  }

  function renderHeader() {
    return (
      '<div class="header">' +
      '<div class="eyebrow">A companion to Emotionally Whole: From the Mirror to the Door</div>' +
      '<h1 class="h1">Interior Life Mapping</h1>' +
      '<div class="subtitle">A Domain-Specific Emotional Intelligence Assessment</div>' +
      '<div class="lede">Five 10-minute evidence-based assessments for mapping the interior life of a leader, counsellor, or parent.</div>' +
      '<div class="byline">Winston H.K. Chew</div>' +
      "</div>"
    );
  }

  function renderIntro() {
    var pills = CONTEXTS.map(function (c) {
      var selected = state.context === c;
      return (
        '<button type="button" class="pill' + (selected ? " selected" : "") + '" aria-pressed="' + selected + '" onclick="setContext(\'' + c + "')\">" +
        escapeHtml(c) +
        "</button>"
      );
    }).join("");

    return (
      '<div class="card">' +
      '<div class="meta-row">' +
      '<div class="field"><label for="fld-name">Name</label>' +
      '<input id="fld-name" type="text" value="' + escapeAttr(state.name) + '" placeholder="Your name" oninput="setName(this.value)"></div>' +
      '<div class="field"><label for="fld-date">Date</label>' +
      '<input id="fld-date" type="text" value="' + escapeAttr(state.date) + '" placeholder="dd / mm / yyyy" oninput="setDate(this.value)"></div>' +
      "</div>" +
      '<div class="context-row"><label style="font-size:11px;text-transform:uppercase;letter-spacing:0.06em;color:var(--label);">Context</label>' +
      '<div class="pills">' + pills + "</div></div>" +
      '<div class="intro-note">Complete each domain independently. Work quickly — your first instinct is more accurate than your considered one. This instrument is a conversation starter, not a diagnostic. Scores open questions; they do not close them.</div>' +
      "</div>"
    );
  }

  function renderProgress(totalAnswered, progressPct) {
    return (
      '<div class="progress">' +
      '<div class="progress-labels"><span>Your progress</span><span>' + totalAnswered + " of " + TOTAL_ITEMS + " answered</span></div>" +
      '<div class="progress-track"><div class="progress-fill" style="width:' + progressPct + '%"></div></div>' +
      '<button type="button" class="reset-link" onclick="resetAll()">Clear all answers</button>' +
      "</div>"
    );
  }

  function renderDomain(domain) {
    var d = domain.def;

    var legend = '<div class="legend">1 = Rarely &nbsp; 2 = Sometimes &nbsp; 3 = About half the time &nbsp; 4 = Often &nbsp; 5 = Almost always &nbsp; | &nbsp; ® = Reverse scored</div>';

    var items = d.items.map(function (it) {
      var options = [1, 2, 3, 4, 5].map(function (v) {
        var selected = state.answers[it.id] === v;
        return (
          '<button type="button" class="opt-btn' + (selected ? " selected" : "") + '" aria-label="Rate ' + v + ' of 5" aria-pressed="' + selected + '" onclick="setAnswer(\'' + it.id + "', " + v + ')">' +
          v +
          "</button>"
        );
      }).join("");

      return (
        '<div class="item">' +
        '<div><div class="item-text">' + escapeHtml(it.text) + '</div><div class="item-cite">' + escapeHtml(it.cite) + "</div></div>" +
        '<div class="options">' + options + "</div>" +
        "</div>"
      );
    }).join("");

    var scoreBody;
    if (domain.complete) {
      var bandRows = d.bands.map(function (b, i) {
        var active = i === domain.bandIndex;
        return (
          '<div class="band-row' + (active ? " active" : "") + '">' +
          '<div class="band-range">' + b.range + "</div>" +
          '<div class="band-text">' + escapeHtml(b.text) + "</div>" +
          "</div>"
        );
      }).join("");
      scoreBody = '<div class="bands">' + bandRows + "</div>";
    } else {
      scoreBody = '<div class="score-hint">' + domain.answeredCount + " of 7 answered — complete all seven to see your score.</div>";
    }

    return (
      '<div class="domain">' +
      '<div class="domain-head">' +
      '<div class="domain-icon">' + ICONS[d.icon] + "</div>" +
      '<div class="domain-meta">' +
      '<div class="domain-eyebrow">Domain ' + domain.roman + " &middot; ⏱ 10 minutes</div>" +
      '<h2 class="domain-title">' + escapeHtml(d.name) + ' <span class="domain-sub">· ' + escapeHtml(d.subtitle) + "</span></h2>" +
      '<div class="domain-anchor">' + d.anchor + "</div>" +
      "</div></div>" +
      legend +
      '<div class="items-card">' + items + "</div>" +
      '<div class="card score-card">' +
      '<div class="score-head"><div class="score-label">My score</div>' +
      '<div class="score-value-row"><span class="score-value">' + domain.scoreLabel + '</span><span class="score-max">/ 5.0</span></div></div>' +
      scoreBody +
      "</div>" +
      "</div>"
    );
  }

  function renderSynthesis(domains, allComplete) {
    var rows = domains.map(function (domain) {
      var d = domain.def;
      return (
        '<div class="synthesis-row">' +
        '<div class="synthesis-name">' + escapeHtml(d.name) + ' <span class="domain-sub">· ' + escapeHtml(d.subtitle) + "</span></div>" +
        '<div class="synthesis-right">' +
        '<div class="synthesis-score">' + domain.scoreLabel + " / 5</div>" +
        '<div class="status-badge" data-status="' + domain.status + '">' + domain.statusLabel + "</div>" +
        "</div></div>"
      );
    }).join("");

    var note = allComplete
      ? '<div class="synthesis-note complete">All five domains complete. This map is a conversation starter, not a diagnosis — bring it to the mirror, and then to the door.</div>'
      : '<div class="synthesis-note">Complete all five domains above to see your full interior life map.</div>';

    return (
      '<div class="synthesis">' +
      '<div class="synthesis-head"><h2 class="synthesis-title">My Interior Life Map</h2><div class="synthesis-sub">Synthesis across all five domains</div></div>' +
      '<div class="synthesis-table">' + rows + "</div>" +
      note +
      "</div>"
    );
  }

  function renderReference() {
    var rows = [
      ["1.0–2.4", "Priority development area — formation work is needed here."],
      ["2.5–3.4", "Developing — the competency is present but inconsistent."],
      ["3.5–4.2", "Strength — operating well; maintain and deepen."],
      ["4.3–5.0", "Exceptional — a formation asset; ensure it is serving others, not only yourself."]
    ].map(function (r) {
      return '<div class="reference-row"><div class="reference-range">' + r[0] + '</div><div class="reference-text">' + r[1] + "</div></div>";
    }).join("");

    return (
      '<div class="reference">' +
      '<div class="reference-title">Scoring reference</div>' +
      '<div class="reference-rows">' + rows + "</div>" +
      '<div class="reference-footnote">® Reverse scoring: for items marked ®, score as 6 minus your response (e.g., if you selected 4, record 2). Items adapted from validated instruments; attribution for each item appears beneath its statement.</div>' +
      "</div>"
    );
  }

  function renderFooter() {
    return '<div class="footer">Winston H.K. Chew &middot; Companion resource to <em>Emotionally Whole: From the Mirror to the Door</em></div>';
  }

  function render() {
    var domains = computeDomains();
    var totalAnswered = Object.keys(state.answers).length;
    var progressPct = Math.round((totalAnswered / TOTAL_ITEMS) * 100);
    var allComplete = totalAnswered === TOTAL_ITEMS;

    var html =
      renderHeader() +
      renderIntro() +
      renderProgress(totalAnswered, progressPct) +
      domains.map(renderDomain).join("") +
      renderSynthesis(domains, allComplete) +
      renderReference() +
      renderFooter();

    document.getElementById("app").innerHTML = '<div class="page"><div class="wrap">' + html + "</div></div>";
  }

  document.addEventListener("DOMContentLoaded", function () {
    loadState();
    render();
  });
})();
