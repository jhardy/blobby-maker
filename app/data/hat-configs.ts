export interface HatColorConfig {
  colors: {
    name: string;
    default: string;
    cssVar: string;
  }[];
}

export const hatConfigs: Record<string, HatColorConfig> = {
  empty: {
    colors: [],
  },
  "ball-cap": {
    colors: [
      { name: "Main Color", default: "#3E3030", cssVar: "--hat-color-1" },
      { name: "Brim Color", default: "#000000", cssVar: "--hat-color-2" },
    ],
  },
  beanie: {
    colors: [
      { name: "Main Color", default: "#446686", cssVar: "--hat-color-1" },
      { name: "Border Color", default: "#10283E", cssVar: "--hat-color-2" },
    ],
  },
  beret: {
    colors: [
      { name: "Main Color", default: "#AD3319", cssVar: "--hat-color-1" },
      { name: "Accent", default: "#4E1104", cssVar: "--hat-color-2" },
    ],
  },
  "bucket-hat": {
    colors: [
      { name: "Main Color", default: "#B2B087", cssVar: "--hat-color-1" },
      { name: "Band Color", default: "#000000", cssVar: "--hat-color-2" },
    ],
  },
  captain: {
    colors: [
      { name: "Hat Color", default: "#F8FDFF", cssVar: "--hat-color-1" },
      { name: "Badge Color", default: "#FFC115", cssVar: "--hat-color-2" },
      { name: "Brim Color", default: "#313D49", cssVar: "--hat-color-3" },
    ],
  },
  "chefs-hat": {
    colors: [
      { name: "Hat Color", default: "#F8F3F0", cssVar: "--hat-color-1" },
      { name: "Band Color", default: "#46423E", cssVar: "--hat-color-2" },
    ],
  },
  "cowboy-hat": {
    colors: [
      { name: "Hat Color", default: "#925B29", cssVar: "--hat-color-1" },
      { name: "Band Color", default: "#62432B", cssVar: "--hat-color-2" },
      { name: "Outline Color", default: "#3F2107", cssVar: "--hat-color-3" },
    ],
  },
  "hard-hat": {
    colors: [
      { name: "Hat Color", default: "#FDCE4A", cssVar: "--hat-color-1" },
      { name: "SOutline Color", default: "#480B38", cssVar: "--hat-color-2" },
    ],
  },
  "jester-hat": {
    colors: [
      { name: "Primary Color", default: "#C24024", cssVar: "--hat-color-1" },
      { name: "Secondary Color", default: "#4F7755", cssVar: "--hat-color-2" },
      { name: "Bell Color", default: "#DEA827", cssVar: "--hat-color-3" },
    ],
  },
  pirate: {
    colors: [
      { name: "Hat Color", default: "#232241", cssVar: "--hat-color-1" },
      { name: "Skull Color", default: "#FFFFFF", cssVar: "--hat-color-2" },
      { name: "Accent Color", default: "#FBB811", cssVar: "--hat-color-3" },
    ],
  },
  "top-hat": {
    colors: [
      { name: "Hat Color", default: "#332E2E", cssVar: "--hat-color-1" },
      { name: "Band Color", default: "#000000", cssVar: "--hat-color-2" },
    ],
  },
  crown: {
    colors: [
      { name: "Crown Color", default: "#FFD700", cssVar: "--hat-color-1" },
      { name: "Jewel Primary", default: "#EF4144", cssVar: "--hat-color-2" },
      { name: "Jewel Secondary", default: "#1EBAEE", cssVar: "--hat-color-3" },
      { name: "Jewel Tertiary", default: "#71EE1E", cssVar: "--hat-color-4" },
    ],
  },
  "party-hat": {
    colors: [
      { name: "Base Color", default: "#FBA7ED", cssVar: "--hat-color-1" },
      { name: "Stripe Color", default: "#3FBCE9", cssVar: "--hat-color-2" },
      { name: "Pom Pom Color", default: "#F8E57E", cssVar: "--hat-color-3" },
    ],
  },
  "wizard-hat": {
    colors: [
      { name: "Hat Color", default: "#5A3B74", cssVar: "--hat-color-1" },
      { name: "Stars Color", default: "#7B5999", cssVar: "--hat-color-2" },
      { name: "Moon Color", default: "#C0C0C0", cssVar: "--hat-color-3" },
    ],
  },
};

export const hatNames = [
  "empty",
  "ball-cap",
  "beanie",
  "beret",
  "bucket-hat",
  "captain",
  "chefs-hat",
  "cowboy-hat",
  "hard-hat",
  "jester-hat",
  "pirate",
  "top-hat",
  "crown",
  "party-hat",
  "wizard-hat",
];
