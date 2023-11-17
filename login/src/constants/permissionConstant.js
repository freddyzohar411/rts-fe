export const Permission = {
  // Account Permissions
  ACCOUNT_READ: "Accounts:Read",
  ACCOUNT_WRITE: "Accounts:Write",
  ACCOUNT_DELETE: "Accounts:Delete",
  ACCOUNT_EDIT: "Accounts:Edit",
  ACCOUNT_NOACCESS: "Accounts:NoAccess",

  // Candidate Permissions
  CANDIDATE_READ: "Candidates:Read",
  CANDIDATE_WRITE: "Candidates:Write",
  CANDIDATE_DELETE: "Candidates:Delete",
  CANDIDATE_EDIT: "Candidates:Edit",
  CANDIDATE_NOACCESS: "Candidates:NoAccess",

  //Other module permissions
  SETTING_READ: "Settings:Read",
  SETTING_WRITE: "Settings:Write",
  SETTING_DELETE: "Settings:Delete",
  SETTING_EDIT: "Settings:Edit",
  SETTING_ALL: [
    "Settings:Read",
    "Settings:Write",
    "Settings:Delete",
    "Settings:Edit",
  ],
};
