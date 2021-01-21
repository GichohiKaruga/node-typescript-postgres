import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class ProductsData {
    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty()
    readonly title: string;

    @ApiModelProperty()
    readonly category: number;

    @ApiModelProperty()
    readonly description: string;

    @ApiModelProperty()
    readonly price: number;

    @ApiModelProperty()
    readonly image: string;

    @ApiModelProperty()
    readonly rating: number;
}
