const request = require("supertest");
const {
  mockTutorUserData,
  mockAdminUserData,
  mockPutPostData,
  mockTopicData,
  mockSubjectData,
  articleData,
  knownArticleId,
} = require("../mockData");

let adminUser = null;
let tutorUser = null;
let articleId = null;
let subjectId = null;
let topicId = null;
let jwt = null;

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
      expect(data.body.id).toBe(tutorUser.user._id);
      expect(data.body.username).toBe(tutorUser.user.username);
      expect(data.body.email).toBe(tutorUser.user.email);
    });
});

it("Tutor should be able to CREATE an article", async () => {
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

test("Tutor should be able to READ an article by the Article ID", async () => {
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

test("Tutor should be able to UPDATE an article", async () => {
  const newData = { name: "Bill (William) Gates" };

  await request(strapi.server)
    .put(`/articles/${articleId}`)
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + jwt)
    .send(newData)
    .expect("Content-Type", /json/)
    .expect(200)
    .then((res) => {
      expect(res.body).toBeDefined();
      expect(res.body.name).toBe(newData.name);
    });
});

it("Tutor should NOT be able to DELETE an article", async () => {
  await request(strapi.server)
    .delete(`/articles/${articleId}`)
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + jwt)
    .expect(403);
});

// Get All Articles
it("Tutor can Get All Articles", async () => {
  // This is where the test should be edited for post put delete and get
  await request(strapi.server)
    .get("/articles")
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + jwt)
    .expect("Content-Type", /json/)
    .expect(200);
});

it("Tutor should be able to CREATE a subject", async () => {
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

// Update subject
it("Tutor can Update subject", async () => {
  // This is where the test should be edited for post put delete and get
  await request(strapi.server)
    .put(`/subjects/${subjectId}`)
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + jwt)
    .send({ name: "testing subject update" })
    .expect(200)
    .then((data) => {
      expect(data.body).toBeDefined();
      expect(data.body.name).toBe("testing subject update");
    });
});

it("Tutor should not be able to DELETE a subject", async () => {
  await request(strapi.server)
    .delete(`/subjects/${subjectId}`)
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + jwt)
    .expect(403);
});

it("tutor should be able to CREATE a topic", async () => {
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

// Update topic
it("tutor can Update subject", async () => {
  // This is where the test should be edited for post put delete and get
  await request(strapi.server)
    .put(`/topics/${topicId}`)
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + jwt)
    .send({ name: "testing topic update" })
    .expect(200)
    .then((data) => {
      expect(data.body).toBeDefined();
      expect(data.body.name).toBe("testing topic update");
    });
});

it("Tutor should be able to DELETE a topic", async () => {
  await request(strapi.server)
    .delete(`/topics/${topicId}`)
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + jwt)
    .expect(403);
});

it("Admin tidy up", async () => {
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
  const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
    id: adminUser.user._id,
  });

  await request(strapi.server)
    .delete(`/topics/${topicId}`)
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + jwt)
    .expect(200);

  await request(strapi.server)
    .delete(`/subjects/${subjectId}`)
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + jwt)
    .expect(200);

  await request(strapi.server)
    .delete(`/articles/${articleId}`)
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + jwt)
    .expect(200);
});
