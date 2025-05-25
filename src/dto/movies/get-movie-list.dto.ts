import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetMovieListDto {
  @ApiProperty({ default: 1 })
  page: string;

  @ApiProperty({ default: 10})
  pageSize: string;

  @ApiPropertyOptional()
  sortColumn: string;

  @ApiPropertyOptional()
  sortDirection: string;
}
