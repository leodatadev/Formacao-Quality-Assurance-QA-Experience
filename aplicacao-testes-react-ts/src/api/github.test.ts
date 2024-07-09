import axios from "axios";
import gitApi from "./github";

jest.mock("axios");
const axiosMock = axios as jest.Mocked<typeof axios>;

describe("github", () => {
  it("Deve retornar login e id do usuário", async () => {
    axiosMock.get = jest.fn().mockResolvedValue({
      data: {
        login: "leodata",
        id: "123456",
      },
    });

    const response = await gitApi.getUser("leodata");
    expect(response).toMatchObject({
      login: "leodata",
      id: "123456",
    });
  });

  it("Deve retornar a mensagem de usuário não encontrado", async () => {
    axiosMock.get = jest.fn().mockResolvedValue({
      data: {
        message: "Not found",
      },
    });

    const response = await gitApi.getUser("usuario-invalido");
    expect(response).toMatchObject({ message: "Not found" });
  });
});
