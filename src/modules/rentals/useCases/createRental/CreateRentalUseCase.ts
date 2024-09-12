import { inject, injectable } from "tsyringe";

import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
  carId: string;
  userId: string;
  expectedReturnDate: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
  ) {}

  async execute({
    carId,
    userId,
    expectedReturnDate,
  }: IRequest): Promise<Rental> {
    const minimumHour = 24;

    const rentalOpenToCar = await this.rentalsRepository.findOpenRentalByCar(
      carId,
    );

    if (rentalOpenToCar) {
      throw new AppError("There's a rental in progress for this car!");
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      userId,
    );

    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for this user!");
    }

    const dateNow = this.dateProvider.dateNow();
    const compare = this.dateProvider.compareInHours(
      dateNow,
      expectedReturnDate,
    );

    if (compare < minimumHour) {
      throw new AppError("Invalid return time.");
    }

    const rental = await this.rentalsRepository.create({
      car_id: carId,
      user_id: userId,
      expected_return_date: expectedReturnDate,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
