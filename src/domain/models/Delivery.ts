import { Schema, model } from 'mongoose';
import IDelivery from '../interfaces/modelInterfaces/deliveryInterface';

const DeliverySchema = new Schema({
  clientId: { type: Schema.Types.ObjectId, ref: 'Client' },
  salesId: { type: Schema.Types.ObjectId, ref: 'Sales' },
  total: { type: Number },
  payment: {
    type: String,
    enum: ['pix', 'credit_card', 'debit_card', 'invoice']
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date },
  reasonOfDelete: { type: String }
});

const Delivery = model<IDelivery>('Delivery', DeliverySchema);

export default Delivery;
