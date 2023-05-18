import {
  IsNumber,
  IsString,
  Min,
  Max,
  IsLongitude,
  IsLatitude,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class GetEstimateDTO {
  @IsString()
  model: string;

  @IsString()
  make: string;

  @Transform(({ value }) => +value)
  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;

  @Transform(({ value }) => +value)
  @IsLongitude()
  lng: number;

  @Transform(({ value }) => +value)
  @IsLatitude()
  lat: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;
}
