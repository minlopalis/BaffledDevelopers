const request = require("supertest");
const { mockUserData } = require("../mockData");

const searchString = "_name=Bill Gates";

it("Should return a list of articles by a specified name", async () => {
  // log user in
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
