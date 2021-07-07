const request = require("supertest");
const server = request(require("./server"));

describe("server.js", () => {
    describe("index route", () => {
        it("should return status 201 when creating a user", async () => {
            const user = {
                name: "user",
                password: "password"
            };

            const expectedStatusCode = 201;

            const response = await server.post("/api/users")
            .send(user)
            .set("Accept", "applications/json");

            expect(response.status).toEqual(expectedStatusCode);
        });

        it("should return 400 when missing user object property", async () => {
            const user = {
                name: "user"
            };

            const expectedStatusCode = 400;

            const response = await server.post("/api/users")
            .send(user)
            .set("Accept", "applications/json");
                        
            expect(response.status).toEqual(expectedStatusCode);
        });
        
        it("should return 200 when deleting a user", async () => {
            const expectedStatusCode = 200;
            
            const response = await server.delete("/api/users/1");

            expect(response.status).toEqual(expectedStatusCode);
        });

        it("should return the deleted user", async () => {
            const response = await server.delete("/api/users/4");

            expect(response.body.name).toBeDefined();
            expect(response.body.password).toBeDefined();
        });
    })
})