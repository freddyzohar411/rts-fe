export const sections = [
  {
    name: "Profile",
    expandCollapseButton: "ProfileExpandCollapseButton",
    subitems: [
      "Tag",
      "Associate",
      "Submit to Sales",
      "Submit to Client",
      "Profile Feedback Pending",
    ],
  },
  {
    name: "Odin",
    expandCollapseButton: "OdinExpandCollapseButton",
    subitems: [
      "Skills Assessment",
      "Coding Test",
      "Technical Interview",
      "Cultural Fit Test",
    ],
  },
  {
    name: "Interviews",
    expandCollapseButton: "InterviewsExpandCollapseButton",
    subitems: [
      "First Interview Scheduled",
      "Second Interview Scheduled",
      "Third Interview Scheduled",
      "Interview Feedback Pending",
    ],
  },
  {
    name: "TOS",
    expandCollapseButton: "TOSExpandCollapseButton",
    subitems: ["Prepare TOS", "TOS Accepted/Declined"],
  },
  {
    name: "Conditional Offer",
    expandCollapseButton: "ConditionalOfferExpandCollapseButton",
    subitems: ["Conditional Offer Sent", "Conditional Offer Accepted/Declined"],
  },
];

export const innerTimelineSteps = [
  { 1: "Profile" },
  { i: "Expand" },
  { ii: "Tag" },
  { iii: "Associate" },
  { iv: "Submit to Sales" },
  { v: "Submit to Client" },
  { vi: "Profile Feedback Pending" },

  { 2: "Odin Protocol" },
  { i: "Expand" },
  { ii: "Skills Assessment" },
  { iii: "Coding Test" },
  { iv: "Technical Interview" },
  { v: "Cultural Fit Test" },

  { 3: "Interviews" },
  { i: "Expand" },
  { ii: "First Interview Scheduled" },
  { iii: "Second Interview Scheduled" },
  { iv: "Third Interview Scheduled" },
  { v: "Interview Feedback Pending" },

  { 4: "TOS" },
  { i: "Expand" },
  { ii: "Prepare TOS" },
  { iii: "TOS Accepted/Declined" },

  { 5: "Conditional Offer" },
  { i: "Expand" },
  { ii: "Conditional Offer Sent" },
  { iii: "Conditional Offer Accepted/Declined" },
];

export const stepsToIgnore = [
  "Profile",
  "Odin Protocol",
  "Interviews",
  "TOS",
  "Conditional Offer",
  "Expand",
];

export const innerTimelineOuterSteps = [
  "Profile",
  "Odin Protocol",
  "Interviews",
  "TOS",
  "Conditional Offer",
];

export const expandedRange = {
  1: [2, 6],
  8: [9, 12],
  14: [15, 18],
  20: [21, 22],
  24: [25, 26],
};
