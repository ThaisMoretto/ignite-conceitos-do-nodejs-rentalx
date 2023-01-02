import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, driver_license, email, password } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      name,
      driver_license,
      email,
      password,
    });

    return response.status(201).send();
  }
}

export { CreateUserController };
