import { type CheckoutMetadata, type PaymentDto } from 'shared/build/index.js';
import { type Stripe } from 'stripe';

import { type IEntity } from '~/libs/interfaces/entity.interface.js';

import { convertCentsToCurrency } from './libs/helpers/convert-cents-to-currency.helper.js';
import { convertUnixSecondsToDate } from './libs/helpers/convert-unix-seconds-to-date.helper.js';

class PaymentEntity implements IEntity {
  private genuinePaymentIntent: Stripe.PaymentIntent;

  private metadata: CheckoutMetadata;

  private constructor(
    paymentIntent: Stripe.PaymentIntent,
    metadata: CheckoutMetadata,
  ) {
    this.genuinePaymentIntent = paymentIntent;
    this.metadata = metadata;
  }

  public static initialize(
    paymentIntent: Stripe.PaymentIntent,
    metadata: CheckoutMetadata,
  ): PaymentEntity {
    return new PaymentEntity(paymentIntent, metadata);
  }

  public toObject(): PaymentDto {
    return {
      amount: this.calculateAmountInCurrency(),
      currency: this.genuinePaymentIntent.currency,
      timestamp: convertUnixSecondsToDate(this.genuinePaymentIntent.created),
      businessId: this.metadata.businessId,
      orderId: this.metadata.orderId,
      userId: this.metadata.userId,
      customerName: this.metadata.customerName,
      customerPhone: this.metadata.customerPhone,
    };
  }

  public toNewObject(): never {
    throw new Error('Unsuppoerted operation');
  }

  private calculateAmountInCurrency(): number {
    const amount =
      this.genuinePaymentIntent.amount -
      (this.genuinePaymentIntent.application_fee_amount ?? 0);

    return convertCentsToCurrency(amount);
  }
}

export { PaymentEntity };
