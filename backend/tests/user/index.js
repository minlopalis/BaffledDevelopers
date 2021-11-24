const request = require("supertest");

// user mock data
const mockUserData = {
  username: "student",
  email: "student@test.com",
  provider: "local",
  password: "Student123",
  confirmed: true,
  blocked: null,
};

it("should login user and return jwt token", async () => {
  await request(strapi.server) // app server is an instance of Class: http.Server
    .post("/auth/local")
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .send({
      identifier: mockUserData.email,
      password: mockUserData.password,
    })
    .expect("Content-Type", /json/)
    .expect(200)
    .then((data) => {
      expect(data.body.jwt).toBeDefined();
    });
});

it("should return users data for authenticated user", async () => {
  /** Gets the default user role */
  const defaultRole = await strapi
    .query("role", "users-permissions")
    .findOne({}, []);

  const role = defaultRole ? defaultRole.id : null;
  const random = Math.random().toString(36).substring(7);
  /** Creates a new user an push to database */
  const response = await request(strapi.server) // app server is an instance of Class: http.Server
    .post("/auth/local")
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .send({
      identifier: mockUserData.email,
      password: mockUserData.password,
    });

  const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
    id: response.body.user._id,
  });

  await request(strapi.server) // app server is an instance of Class: http.Server
    .get("/users/me")
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + jwt)
    .expect("Content-Type", /json/)
    .expect(200)
    .then((data) => {
      expect(data.body).toBeDefined();
      expect(data.body.id).toBe(response.body.user._id);
      expect(data.body.username).toBe(response.body.user.username);
      expect(data.body.email).toBe(response.body.user.email);
    });
});
