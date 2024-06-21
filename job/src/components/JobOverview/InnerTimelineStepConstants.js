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
  { "Expand Profile": "Expand Profile" },
  { i: "Tag" },
  { ii: "Associate" },
  { iii: "Submit to Sales" },
  { iv: "Submit to Client" },
  { v: "Profile Feedback Pending" },

  { 2: "Odin Protocol" },
  { "Expand Odin Protocol": "Expand Odin Protocol" },
  { i: "Skills Assessment" },
  { ii: "Coding Test" },
  { iii: "Technical Interview" },
  { iv: "Cultural Fit Test" },

  { 3: "Interviews" },
  { "Expand Interviews": "Expand Interviews" },
  { i: "First Interview Scheduled" },
  { ii: "Second Interview Scheduled" },
  { iii: "Third Interview Scheduled" },
  { iv: "Interview Feedback Pending" },

  { 4: "TOS" },
  { "Expand TOS": "Expand TOS" },
  { i: "Prepare TOS" },
  { ii: "TOS Accepted/Declined" },

  { 5: "Conditional Offer" },
  { "Expand Conditional Offer": "Expand Conditional Offer" },
  { i: "Conditional Offer Sent" },
  { ii: "Conditional Offer Accepted/Declined" },
];

export const stepsToIgnore = [
  "Profile",
  "Odin Protocol",
  "Interviews",
  "TOS",
  "Conditional Offer",
  "Expand Profile",
  "Expand Odin Protocol",
  "Expand Interviews",
  "Expand TOS",
  "Expand Conditional Offer",
  "bottomLeftCurve",
  "bottomRightCurve",
  "topLeftCurve",
  "topRightCurve",
  "topRightCurve2",
  "bottomRightCurve2",
];

export const innerTimelineOuterSteps = [
  "Profile",
  "Odin Protocol",
  "Interviews",
  "TOS",
  "Conditional Offer",
];

export const initialExpandRanges = {
  "Expand Profile": false,
  "Expand Odin Protocol": false,
  "Expand Interviews": false,
  "Expand TOS": false,
  "Expand Conditional Offer": false,
};

export const curvedObjects = [
  "bottomLeftCurve",
  "bottomRightCurve",
  "topLeftCurve",
  "topRightCurve",
  "topRightCurve2",
  "bottomRightCurve2",
]

export const subStationGroupRange = [
  {"Expand Profile": "Odin Protocol"}, 
  {"Expand Odin Protocol": "Interviews"}, 
  {"Expand Interviews": "TOS"}, 
  {"Expand TOS": "Conditional Offer"},
]