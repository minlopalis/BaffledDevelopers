const request = require("supertest");
const {
  mockStudentUserData,
  mockPutPostData,
  mockTopicData,
  mockSubjectData,
  knownArticleId,
} = require("../mockData");

let studentUser = null;
let subjectId = null;
let topicId = null;
let jwt = null;

it("should login as a student and return jwt token", async () => {
  await request(strapi.server) // app server is an instance of Class: http.Server
    .post("/auth/local")
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .send({
      identifier: mockStudentUserData.email,
      password: mockStudentUserData.password,
    })
    .expect("Content-Type", /json/)
    .expect(200)
    .then((data) => {
      expect(data.body.jwt).toBeDefined();
      expect(data.body.user.role.type).toBe("student");
      studentUser = data.body;
      jwt = data.body.jwt;
    });
});

it("should return users data for authenticated user", async () => {
  await request(strapi.server) // app server is an instance of Class: http.Server
    .get("/users/me")
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + jwt)
    .expect("Content-Type", /json/)
    .expect(200)
    .then((data) => {
      expect(data.body).toBeDefined();
      expect(data.body.id).toBe(studentUser.user._id);
      expect(data.body.username).toBe(studentUser.user.username);
      expect(data.body.email).toBe(studentUser.user.email);
    });
});

it("Student can NOT CREATE an article", async () => {
  // This is where the test should be edited for post put delete and get
  await request(strapi.server)
    .post("/articles")
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + jwt)
    .send(mockPutPostData)
    .expect("Content-Type", /json/)
    .expect(403);
});

test("Student should be able to READ an article by the Article ID", async () => {
  await request(strapi.server)
    .get(`/articles/${knownArticleId}`)
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", `Bearer ${jwt}`)
    .expect(200)
    .then((res) => {
      expect(res.body._id).toBe(knownArticleId);
    });
});

test("Student should NOT be able to DELETE an article", async () => {
  await request(strapi.server)
    .delete(`/articles/${knownArticleId}`)
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + jwt)
    .expect(403);
});

// Get All Articles
it("Student can Get All Articles", async () => {
  // This is where the test should be edited for post put delete and get
  await request(strapi.server)
    .get("/articles")
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + jwt)
    .expect("Content-Type", /json/)
    .expect(200);
});

// Update Article
it("Student can NOT Update an Article", async () => {
  // This is where the test should be edited for post put delete and get
  await request(strapi.server)
    .put(`/articles/${knownArticleId}`)
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + jwt)
    .expect("Content-Type", /json/)
    .expect(403);
});

it("Student can NOT CREATE a topic", async () => {
  // This is where the test should be edited for post put delete and get
  await request(strapi.server)
    .post("/topics")
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + jwt)
    .send(mockTopicData)
    .expect("Content-Type", /json/)
    .expect(403);
});

// Update Topic
it("student can NOT Update a topic", async () => {
  // This is where the test should be edited for post put delete and get
  await request(strapi.server)
    .put(`/topics/${topicId}`)
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + jwt)
    .send({ name: "testing topic update" })
    .expect(403);
});

it("Student can NOT CREATE a subject", async () => {
  // This is where the test should be edited for post put delete and get
  await request(strapi.server)
    .post("/subjects")
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + jwt)
    .send(mockSubjectData)
    .expect("Content-Type", /json/)
    .expect(403);
});

// Update subject
it("student can NOT Update a subject", async () => {
  // This is where the test should be edited for post put delete and get
  await request(strapi.server)
    .put(`/subjects/${subjectId}`)
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + jwt)
    .send({ name: "testing subject update" })
    .expect(403);
});
