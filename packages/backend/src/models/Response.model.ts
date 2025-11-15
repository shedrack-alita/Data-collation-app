import mongoose, { Schema, Document } from 'mongoose';

export enum ResponseStatus {
  SUBMITTED = 'submitted',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
  FLAGGED = 'flagged'
}

interface ResponseAnswer {
  fieldId: string;
  value: any;
  files?: string[];
}

export interface IResponse extends Document {
  formId: string;
  respondentId?: string;
  answers: ResponseAnswer[];
  status: ResponseStatus;
  verifiedBy?: string;
  verificationNotes?: string;
  fraudScore: number;
  metadata: {
    ipAddress?: string;
    userAgent?: string;
    location?: {
      latitude: number;
      longitude: number;
      address?: string;
    };
    timeSpentMinutes: number;
    deviceType?: string;
  };
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentAmount: number;
  submittedAt: Date;
  verifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ResponseSchema = new Schema<IResponse>(
  {
    formId: {
      type: String,
      required: true,
      index: true
    },
    respondentId: {
      type: String,
      index: true
    },
    answers: [{
      fieldId: { type: String, required: true },
      value: { type: Schema.Types.Mixed, required: true },
      files: [String]
    }],
    status: {
      type: String,
      enum: Object.values(ResponseStatus),
      default: ResponseStatus.SUBMITTED
    },
    verifiedBy: {
      type: String,
      index: true
    },
    verificationNotes: String,
    fraudScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    metadata: {
      ipAddress: String,
      userAgent: String,
      location: {
        latitude: Number,
        longitude: Number,
        address: String
      },
      timeSpentMinutes: { type: Number, default: 0 },
      deviceType: String
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending'
    },
    paymentAmount: {
      type: Number,
      default: 0
    },
    submittedAt: {
      type: Date,
      default: Date.now
    },
    verifiedAt: Date
  },
  {
    timestamps: true
  }
);

// Indexes
ResponseSchema.index({ formId: 1, respondentId: 1 });
ResponseSchema.index({ status: 1, createdAt: -1 });
ResponseSchema.index({ fraudScore: 1 });

export default mongoose.model<IResponse>('Response', ResponseSchema);
