import {
  IsNumber,
  IsString,
  Min,
  Max,
  IsLatLong,
  IsLongitude,
} from 'class-validator';

export class CreateReportDTO {
  @IsNumber()
  @Min(0)
  @Max(1000000)
  price: number;

  @IsString()
  model: string;

  @IsString()
  make: string;

  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;

  @IsLongitude()
  lng: number;

  @IsLatLong()
  lat: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;
}
