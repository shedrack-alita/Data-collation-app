import mongoose, { Document, Schema } from 'mongoose';

export enum TransactionType {
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
  EARNING = 'earning',
  PAYMENT = 'payment',
  REFUND = 'refund'
}

export enum TransactionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

export interface IWallet extends Document {
  userId: mongoose.Types.ObjectId;
  balance: number;
  pendingBalance: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

const WalletSchema = new Schema<IWallet>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    balance: {
      type: Number,
      default: 0,
      min: 0
    },
    pendingBalance: {
      type: Number,
      default: 0,
      min: 0
    },
    currency: {
      type: String,
      default: 'USD',
      uppercase: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

const Wallet = mongoose.model<IWallet>('Wallet', WalletSchema);

export default Wallet;
