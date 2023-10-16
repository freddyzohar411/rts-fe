export const userData = [
  {
    firstName: "Sabrina",
    lastName: "Osman",
    username: "sabrina",
    email: "sabrina@aven-sys.com",
    contactNo: 82827154,
    password: "password",
  },
  {
    firstName: "He Xiang",
    lastName: "Koh",
    username: "hexiang",
    email: "hexiang@aven-sys.com",
    contactNo: 90008000,
    password: "password",
  },
  {
    firstName: "Phoebe",
    lastName: "Koh",
    username: "phoebe",
    email: "phoebe@aven-sys.com",
    contactNo: 90809090,
    password: "password",
  },
  {
    firstName: "Nitesh",
    lastName: "N",
    username: "nitesh",
    email: "nitesh@aven-sys.com",
    contactNo: 89790909,
    password: "password",
  },
  {
    firstName: "Shafeeq",
    lastName: "Mr",
    username: "shafeeq",
    email: "shafeeq@aven-sys.com",
    contactNo: 87340909,
    password: "password",
  },
  {
    firstName: "Haja",
    lastName: "Mr",
    username: "haja",
    email: "haja@aven-sys.com",
    contactNo: 91809090,
    password: "password",
  },
  {
    firstName: "Priscilla",
    lastName: "A",
    username: "priscilla",
    email: "priscilla@aven-sys.com",
    contactNo: 80903040,
    password: "password",
  },
  {
    firstName: "Mhai",
    lastName: "M",
    username: "mhai",
    email: "mhai@aven-sys.com",
    contactNo: 93840232,
    password: "password",
  },
  {
    firstName: "Bads",
    lastName: "B",
    username: "bads",
    email: "bads@aven-sys.com",
    contactNo: 92083090,
    password: "password",
  },
];

export const userGroupData = [
  {
    groupName: "IT",
    groupDescription:
      "The IT group handles information technology-related tasks, such as managing computer systems, networks, and software applications.",
  },
  {
    groupName: "Recruitment",
    groupDescription:
      "The Recruitment group focuses specifically on the process of finding and hiring new employees for the organization.",
  },
  {
    groupName: "Human Resources",
    groupDescription:
    "The Human Resources group is in charge of personnel management, including recruitment, employee relations, training, and benefits administration.",

  },
  {
    groupName: "Management",
    groupDescription:
      "The Management group is responsible for overseeing the organization's strategic direction and day-to-day operations. Members of this group typically hold leadership positions, such as executives, managers, and supervisors.",
  },
];

export const userGroupMembersData = [
  {
    groupName: "IT",
    members: ["sabrina", "hexiang"],
  },
  {
    groupName: "Recruitment",
    members: ["nitesh", "phoebe"],
  },
  {
    groupName: "Management",
    members: ["shafeeq", "haja"],
  },
  {
    groupName: "Human Resources",
    members: ["mhai", "priscilla", "bads"],
  },
];

export const roleData = [
  {
    roleName: "Super Admin",
    roleDescription:
      "Full access to all features and data. Can perform any action.",
  },
  {
    roleName: "Admin",
    roleDescription: "Administrative access to manage users and data. Limited access to settings.",
  },
  {
    roleName: "User",
    roleDescription: "Basic user with limited permissions. Can view and perform basic actions.",
  },
];

export const roleGroupData = [
  {
    roleName: "Super Admin",
    groups: ["Management", "Human Resources"],
  },
  {
    roleName: "Admin",
    groups: ["IT"],
  },
  {
    roleName: "User",
    groups: ["Recruitment", "IT"],
  },
];

export const permissionData = [
  {
    moduleName: "Account",
    permissions: [
      {
        read: false,
        write: false,
        update: false,
        delete: false,
      },
    ],
  },
  {
    moduleName: "Jobs",
    permissions: [
      {
        read: false,
        write: false,
        update: false,
        delete: false,
      },
    ],
  },
  {
    moduleName: "Candidate",
    permissions: [
      {
        read: false,
        write: false,
        update: false,
        delete: false,
      },
    ],
  },
  {
    moduleName: "Recruitment",
    permissions: [
      {
        read: false,
        write: false,
        update: false,
        delete: false,
      },
    ],
  },
];
