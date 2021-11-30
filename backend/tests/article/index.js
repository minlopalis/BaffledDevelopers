const request = require("supertest");
const { mockStudentUserData } = require("../mockData");

const searchString = "_name=Bill Gates";

let articleId = null;
let studentUser = null;
let jwt = null;

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
  studentUser = response.body;
  jwt = studentUser.jwt;

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
      articleId = data.body[0]._id;
    });
});

it("should return info for an article for a supplied id", async () => {
  await request(strapi.server)
    .get(`/articles/${articleId}`)
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + jwt)
    .expect("Content-Type", /json/)
    .expect(200)
    .then((data) => {
      expect(data.body.name).toBe("Bill Gates");
    });
});
