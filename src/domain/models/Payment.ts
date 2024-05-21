import { Schema, model } from 'mongoose';
import IPayment from '../interfaces/modelInterfaces/paymentInterface';

const PaymentSchema: Schema = new Schema({
  total: { type: Number, required: true },
  clientId: { type: Schema.Types.ObjectId, ref: 'Client' },
  payment_type: {
    type: String,
    enum: ['pix', 'credit_card', 'debit_card', 'money_bill'],
    required : true
  },
  deletedAt: { type: Date },
  reasonOfCancel: { type: String },
  payment_date: { type: Date, default: Date.now }
});

const Payment = model<IPayment>('Payment', PaymentSchema);

export default Payment;
