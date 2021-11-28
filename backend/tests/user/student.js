const request = require("supertest");
const {
  mockStudentUserData,
  mockPutPostData,
  mockTopicData,
  mockSubjectData,
  articleData
} = require("../mockData");

let studentUser = null;

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
    });
});

it("should return users data for authenticated user", async () => {
  const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
    id: studentUser.user._id,
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
      expect(data.body.id).toBe(studentUser.user._id);
      expect(data.body.username).toBe(studentUser.user.username);
      expect(data.body.email).toBe(studentUser.user.email);
    });
});

it("Student can NOT CREATE an article", async () => {
  const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
    id: studentUser.user._id,
  });
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

it("Student can NOT CREATE an topic", async () => {
  const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
    id: studentUser.user._id,
  });
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

it("Student can NOT CREATE an subject", async () => {
  const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
    id: studentUser.user._id,
  });
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


test('Student should be able to READ an aricle by the Article ID', async ()=> {
  const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
    id: studentUser.user._id,
  });

  await request(strapi.server)
    .get(`/articles/${articleData._id}`)
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${jwt}`)
    .expect(200)
    .then(res => {
      expect(res.body._id).toBe(articleData._id);
    })
});

test("Student should NOT be able to DELETE an article", async () => {
  const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
    id: studentUser.user._id,
  });

  await request(strapi.server)
    .delete(`/articles/${articleData._id}`)
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + jwt)
    .expect(403);
});