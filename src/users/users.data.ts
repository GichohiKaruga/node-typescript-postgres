import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class UsersData {
  @ApiModelProperty()
  readonly id: number;

  @ApiModelProperty()
  readonly firstName: string;

  @ApiModelProperty()
  readonly lastName: string;

  @ApiModelProperty()
  readonly email: string;

  @ApiModelProperty()
  readonly phone: string;

  @ApiModelProperty()
  readonly password: string;

  @ApiModelProperty()
  readonly address: string;

  @ApiModelProperty()
  readonly location: any;

  @ApiModelProperty()
  readonly credit_card: any;

  @ApiModelProperty()
  readonly shipping_region: any;
}
