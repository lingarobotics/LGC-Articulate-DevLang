export const scenarios = [
  {
    id: "perf-review-docs",
    title: "Performance Review — Documentation Feedback",

    speakerRole: "QA Engineer (Jessica)",
    listenerRole: "Engineering Manager (Bob)",

    listenerQuestion:
      "If the documentation isn't detailed enough, it can cause problems later. What do you think?",

    context: [
      { speaker: "Bob", text: "Hi, Jessica. Thanks for joining me for your performance review." },
      { speaker: "Bob", text: "You've done a great job with your QA work and caught several issues." },
      { speaker: "Bob", text: "However, I've noticed that your documentation isn't always complete." },
      { speaker: "Bob", text: "If the documentation isn't detailed enough, it can cause problems later." }
    ],

    contextString: `
Bob: "Hi, Jessica. Thanks for joining me for your performance review."
Bob: "You've done a great job with your QA work and caught several issues."
Bob: "However, I've noticed that your documentation isn't always complete."
Bob: "If the documentation isn't detailed enough, it can cause problems later."
    `.trim()
  },

  {
    id: "project-planning-role-allocation",
    title: "Project Planning — Role Allocation Decision",

    speakerRole: "Product Designer (Linda)",
    listenerRole: "Project Manager (Bob)",

    listenerQuestion: "Does that work for you?",

    context: [
      {
        speaker: "Bob",
        text: "We need to start planning our new mobile app project. Let's discuss the timeline."
      },
      {
        speaker: "Bob",
        text: "I was thinking we should aim to have the initial prototype ready in four weeks."
      },
      {
        speaker: "Linda",
        text: "I think that's doable. We can work on the design sketches this week and then move on to wireframes."
      },
      {
        speaker: "Bob",
        text: "By the way, we need to allocate tasks among the team."
      },
      {
        speaker: "Bob",
        text: "I was thinking that you could lead the UX design and I'll coordinate with the developers."
      }
    ],

    contextString: `
Bob: "We need to start planning our new mobile app project. Let's discuss the timeline."
Bob: "I was thinking we should aim to have the initial prototype ready in four weeks."
Linda: "I think that's doable. We can work on the design sketches this week and then move on to wireframes."
Bob: "By the way, we need to allocate tasks among the team."
Bob: "I was thinking that you could lead the UX design and I'll coordinate with the developers."
    `.trim()
  },

  {
    id: "code-review-improvement",
    title: "Code Review — Improvement Discussion",

    speakerRole: "Software Engineer (Mark)",
    listenerRole: "Senior Engineer (Sarah)",

    listenerQuestion: "Is there anything else you'd like me to improve on?",

    context: [
      {
        speaker: "Sarah",
        text: "Mark, I reviewed your code for the new feature and it's looking good."
      },
      {
        speaker: "Sarah",
        text: "It's well organized and works as expected."
      },
      {
        speaker: "Mark",
        text: "Thanks, Sarah. I made sure to keep the code clean and easy to read."
      },
      {
        speaker: "Sarah",
        text: "The comments you added in the code really helped the team understand what each part does."
      },
      {
        speaker: "Sarah",
        text: "I also like how you tested the code to make sure it doesn't have any errors."
      }
    ],

    contextString: `
Sarah: "Mark, I reviewed your code for the new feature and it's looking good."
Sarah: "It's well organized and works as expected."
Mark: "Thanks, Sarah. I made sure to keep the code clean and easy to read."
Sarah: "The comments you added in the code really helped the team understand what each part does."
Sarah: "I also like how you tested the code to make sure it doesn't have any errors."
    `.trim()
  }
];