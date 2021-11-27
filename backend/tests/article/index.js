const request = require("supertest");
const {
  mockStudentUserData,
  mockTutorUserData,
  mockPutPostData,
  mockAdminUserData,
} = require("../mockData");

const searchString = "_name=Bill Gates";

let articleId = null;

it("Should return a list of articles by a specified name", async () => {
  // log user in
  const response = await request(strapi.server) // app server is an instance of Class: http.Server
    .post("/auth/local")
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .send({
      identifier: mockStudentUserData.email,
      password: mockStudentUserData.password,
    });

  const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
    id: response.body.user._id,
  });
  // This is where the test should be edited for post put delete and get
  await request(strapi.server)
    .get("/articles")
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + jwt)
    .query(searchString)
    .expect("Content-Type", /json/)
    .expect(200)
    .then((data) => {
      expect(data.body.length).toBeGreaterThan(0);
    });
});

it("should crete an article", async () => {
  // log user in
  const response = await request(strapi.server) // app server is an instance of Class: http.Server
    .post("/auth/local")
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .send({
      identifier: mockTutorUserData.email,
      password: mockTutorUserData.password,
    });

  const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
    id: response.body.user._id,
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

it("should not be able to delete an article", async () => {
  // log user in
  const response = await request(strapi.server) // app server is an instance of Class: http.Server
    .post("/auth/local")
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .send({
      identifier: mockTutorUserData.email,
      password: mockTutorUserData.password,
    });

  const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
    id: response.body.user._id,
  });

  await request(strapi.server)
    .delete(`/articles/${articleId}`)
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + jwt)
    .expect(403);
});

it("should be able to delete an article", async () => {
  // log user in
  const response = await request(strapi.server) // app server is an instance of Class: http.Server
    .post("/auth/local")
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .send({
      identifier: mockAdminUserData.email,
      password: mockAdminUserData.password,
    });

  const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
    id: response.body.user._id,
  });

  await request(strapi.server)
    .delete(`/articles/${articleId}`)
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + jwt)
    .expect(200);
});
