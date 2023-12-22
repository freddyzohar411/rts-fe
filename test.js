const user = {
  userId: 1,
  userName: "John",
  email: "john@gmail.com",
  permissions: {
//  role : [permissions]
    admin: ["create", "read", "update", "delete"],
    superAdmin: ["create", "read", "update", "delete"],
    account: ["create", "read", "update", "delete"],
    job: ["create", "read", "update", "delete"],
    candidate: ["create", "read", "update", "delete"],
  }
};
