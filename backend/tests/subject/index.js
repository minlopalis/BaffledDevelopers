const request = require("supertest");
const { mockStudentUserData } = require("../mockData");

let studentUser = null;

it("Should return a list of subjects", async () => {
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

  const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
    id: studentUser.user._id,
  });
  // This is where the test should be edited for post put delete and get
  await request(strapi.server)
    .get("/subjects")
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + jwt)
    .expect("Content-Type", /json/)
    .expect(200)
    .then((data) => {
      expect(data.body.length).toBeGreaterThan(0);
    });
});
