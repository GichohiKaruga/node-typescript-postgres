import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class OrdersData {
    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty()
    readonly userId: number;

    @ApiModelProperty()
    readonly orderDate: string;

    @ApiModelProperty()
    readonly orderDetail: any;

    @ApiModelProperty()
    readonly total: number;
}
