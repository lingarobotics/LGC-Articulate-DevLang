export const learnScenarios = [
  {
    id: "db-security-sql-injection",

    title: "Database Security — SQL Injection Prevention",

    intro:
      "In this scenario, a developer discusses database security improvements with a teammate. Observe how solutions, decisions, and follow-ups are communicated.",

    roles: {
      speaker: "Backend Developer (Jake)",
      listener: "Team Member (Maria)"
    },

    conversation: [
      { speaker: "Jake", text: "I've been looking into our database security," },
      { speaker: "Jake", text: "and I think we're going to need some additional measures to prevent SQL injection attacks." },
      { speaker: "Maria", text: "I agree. We've been noticing some unusual queries in the logs. What are you going to recommend to improve security?" },
      { speaker: "Jake", text: "We're going to implement parameterized queries to minimize the risk." },
      { speaker: "Jake", text: "This should reduce the chances of unauthorized access to our data." },
      { speaker: "Maria", text: "That sounds like a solid plan. Are we going to require additional training for our developers?" },
      { speaker: "Jake", text: "Yes. We're going to hold the session next week to ensure everyone knows how to implement these changes." },
      { speaker: "Jake", text: "It's crucial that we all follow best practices." },
      { speaker: "Maria", text: "I'm going to inform the team about the upcoming training. Is there anything else we need to do?" },
      { speaker: "Jake", text: "We're going to monitor the database activity more closely. This will help us catch any suspicious patterns early." },
      { speaker: "Maria", text: "Great. I think this is going to make a big difference in our security." },
      { speaker: "Maria", text: "Are we going to share this information with other departments?" },
      { speaker: "Jake", text: "We'll probably do that after we've completed the training. It's better to ensure our team is fully prepared first." }
    ],

    articulation: [
      {
        lineIndex: 1,
        original: "and I think we're going to need some additional measures to prevent SQL injection attacks.",
        analysis: "Uses tentative language ('I think'), which reduces authority.",
        improved: "We need to implement additional measures to prevent SQL injection attacks.",
        level: "medium"
      },
      {
        lineIndex: 3,
        original: "We're going to implement parameterized queries to minimize the risk.",
        analysis: "Clear, direct, and solution-oriented articulation.",
        improved: "We'll implement parameterized queries to eliminate SQL injection risks.",
        level: "strong"
      },
      {
        lineIndex: 6,
        original: "Yes. We're going to hold the session next week to ensure everyone knows how to implement these changes.",
        analysis: "Clear action but slightly repetitive phrasing.",
        improved: "Yes, we’ll conduct a training session next week to ensure proper implementation.",
        level: "medium"
      },
      {
        lineIndex: 9,
        original: "We're going to monitor the database activity more closely. This will help us catch any suspicious patterns early.",
        analysis: "Combines action + reasoning effectively.",
        improved: "We’ll closely monitor database activity to detect suspicious patterns early.",
        level: "strong"
      },
      {
        lineIndex: 12,
        original: "We'll probably do that after we've completed the training. It's better to ensure our team is fully prepared first.",
        analysis: "Good prioritization but weakened by 'probably'.",
        improved: "We’ll share this after training to ensure full readiness.",
        level: "medium"
      }
    ]
  },

  {
    id: "team-tension-deadline",

    title: "Team Tension — Expressing Concerns About Deadlines",

    intro:
      "In this scenario, a team member discusses concerns about workload and deadlines with a manager.",

    roles: {
      speaker: "Team Member (Maria)",
      listener: "Manager (Bob)"
    },

    conversation: [
      { speaker: "Bob", text: "Hi, Maria. I heard there was some tension in the last team meeting. Can we talk about it?" },
      { speaker: "Maria", text: "Sure, Bob. It's about the new deadline. The team is really worried it's too tight." },
      { speaker: "Maria", text: "They're feeling quite overwhelmed with the extra workload." },
      { speaker: "Bob", text: "I see. Did they mention why they think it's too tight?" },
      { speaker: "Maria", text: "Yes, they said they're already putting in extra hours. If we add more tasks, it could lead to burnout." },
      { speaker: "Bob", text: "So did they say how we could fix it?" },
      { speaker: "Maria", text: "They mentioned a couple of things. First, they really need more support." },
      { speaker: "Maria", text: "We're quite short on a few roles, which makes it really hard to meet the new deadline." },
      { speaker: "Bob", text: "Okay. Is there anything else we should consider?" },
      { speaker: "Maria", text: "They also said the communication isn't great because they often don't hear about changes until it's too late." },
      { speaker: "Maria", text: "It'd be helpful if we had more regular check-ins." },
      { speaker: "Bob", text: "That makes sense. Could you set up a weekly meeting?" },
      {
        speaker: "Maria",
        text: "Sure, I can do that. But to really ease the pressure, we might need to adjust the deadline even if it's just a few days."
      }
    ],

    articulation: [
      {
        lineIndex: 1,
        original: "The team is really worried it's too tight.",
        analysis: "Clear articulation of concern.",
        improved: "The team is concerned that the deadline is too tight.",
        level: "strong"
      },
      {
        lineIndex: 4,
        original: "If we add more tasks, it could lead to burnout.",
        analysis: "Strong reasoning linking workload to risk.",
        improved: "Adding more tasks could lead to burnout.",
        level: "strong"
      },
      {
        lineIndex: 10,
        original: "It'd be helpful if we had more regular check-ins.",
        analysis: "Good suggestion but phrased softly.",
        improved: "We should introduce regular check-ins.",
        level: "medium"
      },
      {
        lineIndex: 12,
        original: "we might need to adjust the deadline",
        analysis: "Important suggestion weakened by 'might'.",
        improved: "We should adjust the deadline.",
        level: "medium"
      }
    ]
  },

  {
    id: "team-stress-feedback-loop",

    title: "Team Stress — Gathering and Acting on Feedback",

    intro:
      "In this scenario, a team lead gathers feedback and responds with empathy and action.",

    roles: {
      speaker: "Team Lead (Maria)",
      listener: "Developer (James)"
    },

    conversation: [
      { speaker: "Maria", text: "I need to understand how the team feels about the new project deadline." },
      { speaker: "James", text: "They're pretty stressed." },
      { speaker: "Maria", text: "I hear you. This extra workload could lead to burnout." },
      { speaker: "Maria", text: "Wouldn't it be better if we prioritized tasks differently?" },
      { speaker: "James", text: "We also need more hands on deck." },
      { speaker: "Maria", text: "I'll bring it up again and see if I can convince him." },
      { speaker: "Maria", text: "I'll suggest having more regular check-ins." },
      { speaker: "Maria", text: "I'll take this feedback to Bob." }
    ],

    articulation: [
      {
        lineIndex: 0,
        original: "I need to understand how the team feels",
        analysis: "Clear intent and listening mindset.",
        improved: "I want to understand the team’s perspective.",
        level: "strong"
      },
      {
        lineIndex: 2,
        original: "This extra workload could lead to burnout.",
        analysis: "Strong articulation linking issue to risk.",
        improved: "This workload could lead to burnout.",
        level: "strong"
      },
      {
        lineIndex: 3,
        original: "Wouldn't it be better if we prioritized tasks differently?",
        analysis: "Good idea but phrased weakly.",
        improved: "We should prioritize tasks differently.",
        level: "medium"
      },
      {
        lineIndex: 6,
        original: "I'll suggest having more regular check-ins.",
        analysis: "Actionable but slightly passive.",
        improved: "I’ll implement regular check-ins.",
        level: "medium"
      }
    ]
  }
];