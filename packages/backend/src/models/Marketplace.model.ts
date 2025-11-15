import mongoose, { Schema, Document } from 'mongoose';

export enum DatasetStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  SOLD = 'sold'
}

export enum RequestStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export interface IDatasetRequest extends Document {
  title: string;
  description: string;
  requesterId: string;
  category: string;
  budget: number;
  deadline?: Date;
  status: RequestStatus;
  requirements: {
    format: string[];
    minRecords?: number;
    columns?: string[];
    industry?: string;
  };
  offers: Array<{
    sellerId: string;
    price: number;
    deliveryTime: number;
    message: string;
    status: 'pending' | 'accepted' | 'rejected';
    createdAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const DatasetRequestSchema = new Schema<IDatasetRequest>(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    requesterId: {
      type: String,
      required: true,
      index: true
    },
    category: {
      type: String,
      required: true,
      index: true
    },
    budget: {
      type: Number,
      required: true
    },
    deadline: Date,
    status: {
      type: String,
      enum: Object.values(RequestStatus),
      default: RequestStatus.OPEN
    },
    requirements: {
      format: [String],
      minRecords: Number,
      columns: [String],
      industry: String
    },
    offers: [{
      sellerId: { type: String, required: true },
      price: { type: Number, required: true },
      deliveryTime: { type: Number, required: true },
      message: String,
      status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
      },
      createdAt: { type: Date, default: Date.now }
    }]
  },
  {
    timestamps: true
  }
);

export interface IDataset extends Document {
  title: string;
  description: string;
  sellerId: string;
  category: string;
  price: number;
  status: DatasetStatus;
  file: {
    url: string;
    filename: string;
    size: number;
    format: string;
  };
  preview: {
    columns: string[];
    sampleRows: any[];
    rowCount: number;
  };
  metadata: {
    industry?: string;
    source?: string;
    collectionDate?: Date;
    tags: string[];
  };
  isVerified: boolean;
  verifiedBy?: string;
  downloadCount: number;
  rating: {
    average: number;
    count: number;
  };
  reviews: Array<{
    buyerId: string;
    rating: number;
    comment: string;
    createdAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const DatasetSchema = new Schema<IDataset>(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    sellerId: {
      type: String,
      required: true,
      index: true
    },
    category: {
      type: String,
      required: true,
      index: true
    },
    price: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: Object.values(DatasetStatus),
      default: DatasetStatus.PENDING
    },
    file: {
      url: { type: String, required: true },
      filename: { type: String, required: true },
      size: { type: Number, required: true },
      format: { type: String, required: true }
    },
    preview: {
      columns: [String],
      sampleRows: [Schema.Types.Mixed],
      rowCount: { type: Number, default: 0 }
    },
    metadata: {
      industry: String,
      source: String,
      collectionDate: Date,
      tags: [String]
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    verifiedBy: String,
    downloadCount: {
      type: Number,
      default: 0
    },
    rating: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 }
    },
    reviews: [{
      buyerId: { type: String, required: true },
      rating: { type: Number, required: true, min: 1, max: 5 },
      comment: String,
      createdAt: { type: Date, default: Date.now }
    }]
  },
  {
    timestamps: true
  }
);

// Indexes
DatasetSchema.index({ category: 1, status: 1 });
DatasetSchema.index({ 'rating.average': -1 });

export const DatasetRequest = mongoose.model<IDatasetRequest>('DatasetRequest', DatasetRequestSchema);
export const Dataset = mongoose.model<IDataset>('Dataset', DatasetSchema);
