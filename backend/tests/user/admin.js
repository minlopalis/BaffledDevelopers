const request = require("supertest");
const {
  mockAdminUserData,
  mockPutPostData,
  mockSubjectData,
  mockTopicData,
} = require("../mockData");

let adminUser = null;

it("should login as an admin and return jwt token", async () => {
  await request(strapi.server) // app server is an instance of Class: http.Server
    .post("/auth/local")
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .send({
      identifier: mockAdminUserData.email,
      password: mockAdminUserData.password,
    })
    .expect("Content-Type", /json/)
    .expect(200)
    .then((data) => {
      expect(data.body.jwt).toBeDefined();
      expect(data.body.user.role.type).toBe("administrator");
      adminUser = data.body;
    });
});

it("should return users data for authenticated user", async () => {
  /** Gets the default user role */
  const defaultRole = await strapi
    .query("role", "users-permissions")
    .findOne({}, []);

  const role = defaultRole ? defaultRole.id : null;

  /** Creates a new user an push to database */

  const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
    id: adminUser.user._id,
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
      expect(data.body.id).toBe(adminUser.user._id);
      expect(data.body.username).toBe(adminUser.user.username);
      expect(data.body.email).toBe(adminUser.user.email);
    });
});

let subjectId = null;
let topicId = null;

it("Admin should be able to crete an article", async () => {
  const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
    id: adminUser.user._id,
  });
  // This is where the test should be edited for post put delete and get
  await request(strapi.server)
    .post("/articles")
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + jwt)
    .send(mockPutPostData)
    .expect("Content-Type", /json/)
    .expect(200)
    .then((data) => {
      articleId = data.body._id;
    });
});

it("Admin should be able to update an article", async () => {
  const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
    id: adminUser.user._id,
  });
  // This is where the test should be edited for post put delete and get
  await request(strapi.server)
    .put(`/articles/${articleId}`)
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + jwt)
    .send({ name: "testing 1 2" })
    .expect(200)
    .then((data) => {
      expect(data.body).toBeDefined();
      expect(data.body.name).toBe("testing 1 2");
    });
});

it("Admin should be able to delete an article", async () => {
  const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
    id: adminUser.user._id,
  });

  await request(strapi.server)
    .delete(`/articles/${articleId}`)
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + jwt)
    .expect(200);
});

it("Admin should be able to crete a subject", async () => {
  const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
    id: adminUser.user._id,
  });
  // This is where the test should be edited for post put delete and get
  await request(strapi.server)
    .post("/subjects")
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + jwt)
    .send(mockSubjectData)
    .expect("Content-Type", /json/)
    .expect(200)
    .then((data) => {
      subjectId = data.body._id;
    });
});

it("Admin should be able to delete an subject", async () => {
  const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
    id: adminUser.user._id,
  });

  await request(strapi.server)
    .delete(`/subjects/${subjectId}`)
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + jwt)
    .expect(200);
});

it("Admin should be able to crete a topic", async () => {
  const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
    id: adminUser.user._id,
  });
  // This is where the test should be edited for post put delete and get
  await request(strapi.server)
    .post("/topics")
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + jwt)
    .send(mockTopicData)
    .expect("Content-Type", /json/)
    .expect(200)
    .then((data) => {
      topicId = data.body._id;
    });
});

it("Admin should be able to delete a topic", async () => {
  const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
    id: adminUser.user._id,
  });

  await request(strapi.server)
    .delete(`/topics/${topicId}`)
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + jwt)
    .expect(200);
});
