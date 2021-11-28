const request = require("supertest");
const { mockTutorUserData, mockPutPostData } = require("../mockData");

let tutorUser = null;
let articleId = null;

it("should login as a tutor and return jwt token", async () => {
  await request(strapi.server) // app server is an instance of Class: http.Server
    .post("/auth/local")
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .send({
      identifier: mockTutorUserData.email,
      password: mockTutorUserData.password,
    })
    .expect("Content-Type", /json/)
    .expect(200)
    .then((data) => {
      expect(data.body.jwt).toBeDefined();
      expect(data.body.user.role.type).toBe("tutor");
      tutorUser = data.body;
    });
});

it("should return users data for authenticated user", async () => {
  const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
    id: tutorUser.user._id,
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
      expect(data.body.id).toBe(tutorUser.user._id);
      expect(data.body.username).toBe(tutorUser.user.username);
      expect(data.body.email).toBe(tutorUser.user.email);
    });
});

it("Tutor should be able to crete an article", async () => {
  const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
    id: tutorUser.user._id,
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

it("Tutor should not be able to delete an article", async () => {
  const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
    id: tutorUser.user._id,
  });

  await request(strapi.server)
    .delete(`/articles/${articleId}`)
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + jwt)
    .expect(403);
});
