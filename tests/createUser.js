const request = require("supertest");
const { expect } = require("chai");

const baseUrl = "https://kasir-api.belajarqa.com";
let bearerToken;
let statusCode;
let body;

describe("User - Create User", () => {

    before(async () => {
        const responseAuthLogin = await request(baseUrl)
        .post("/authentications")
        .send({ email: "tokop@edi.com", password: "larismanis"})

        bearerToken = (responseAuthLogin.body.data.accessToken);
    })

    describe("Positive Case - Send valid email", () => {

        before(async () => {
            const responseCreateUserList = await request(baseUrl)
            .post("/users")
            .set("Authorization", `Bearer ${bearerToken}`)
            .send({
                "name": "User Baru Satu",
                "email": "user1@new.com",
                "password": "jiasda2321@"
            })

            statusCode = responseCreateUserList.status;
            body = responseCreateUserList.body;
        })

        it("Response status is 201", () => {
            expect(statusCode).to.equal(201);
        });

        it("Response body status is Success", () => {
            expect(body.status).to.equal("success");
        });

        it("Response message is success", () => {
            expect(body.message).to.equal("User berhasil ditambahkan");
        });
    })

    describe("Negative Case - Send invalid email", () => {

        before(async () => {
            const responseCreateUserList = await request(baseUrl)
            .post("/users")
            .set("Authorization", `Bearer ${bearerToken}`)
            .send({
                "name": "User Baru Dua",
                "email": "user1new.com",
                "password": "jiasda2321@"
            })

            statusCode = responseCreateUserList.status;
            body = responseCreateUserList.body;
        })

        it("Response status is 400", () => {
            expect(statusCode).to.equal(400);
        });

        it("Response body status is Fail", () => {
            expect(body.status).to.equal("fail");
        });

        it("Response message is fail", () => {
            expect(body.message).to.equal("\"email\" must be a valid email");
        });
    });
});