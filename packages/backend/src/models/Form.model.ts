import mongoose, { Schema, Document } from 'mongoose';

export enum FormStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  CLOSED = 'closed',
  ARCHIVED = 'archived'
}

export enum FieldType {
  TEXT = 'text',
  TEXTAREA = 'textarea',
  NUMBER = 'number',
  EMAIL = 'email',
  PHONE = 'phone',
  DATE = 'date',
  TIME = 'time',
  DATETIME = 'datetime',
  SELECT = 'select',
  MULTISELECT = 'multiselect',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  RATING = 'rating',
  FILE = 'file',
  IMAGE = 'image',
  LOCATION = 'location',
  SIGNATURE = 'signature'
}

interface LogicCondition {
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than';
  value: any;
}

interface LogicAction {
  type: 'show' | 'hide' | 'require' | 'skip';
  target: string[];
}

interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  description?: string;
  required: boolean;
  options?: string[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
  logic?: {
    conditions: LogicCondition[];
    action: LogicAction;
  };
}

interface FormSection {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
}

export interface IForm extends Document {
  title: string;
  description?: string;
  creatorId: string;
  status: FormStatus;
  sections: FormSection[];
  settings: {
    anonymous: boolean;
    oneResponsePerUser: boolean;
    responseLimit?: number;
    startDate?: Date;
    endDate?: Date;
    requireVerification: boolean;
    paymentPerResponse: number;
    verificationPayment: number;
  };
  stats: {
    views: number;
    responses: number;
    completionRate: number;
    averageTimeMinutes: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const FormSchema = new Schema<IForm>(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    creatorId: {
      type: String,
      required: true,
      index: true
    },
    status: {
      type: String,
      enum: Object.values(FormStatus),
      default: FormStatus.DRAFT
    },
    sections: [{
      id: { type: String, required: true },
      title: { type: String, required: true },
      description: String,
      fields: [{
        id: { type: String, required: true },
        type: {
          type: String,
          enum: Object.values(FieldType),
          required: true
        },
        label: { type: String, required: true },
        placeholder: String,
        description: String,
        required: { type: Boolean, default: false },
        options: [String],
        validation: {
          min: Number,
          max: Number,
          pattern: String,
          message: String
        },
        logic: {
          conditions: [{
            field: String,
            operator: {
              type: String,
              enum: ['equals', 'not_equals', 'contains', 'greater_than', 'less_than']
            },
            value: Schema.Types.Mixed
          }],
          action: {
            type: {
              type: String,
              enum: ['show', 'hide', 'require', 'skip']
            },
            target: [String]
          }
        }
      }]
    }],
    settings: {
      anonymous: { type: Boolean, default: false },
      oneResponsePerUser: { type: Boolean, default: true },
      responseLimit: Number,
      startDate: Date,
      endDate: Date,
      requireVerification: { type: Boolean, default: false },
      paymentPerResponse: { type: Number, default: 0 },
      verificationPayment: { type: Number, default: 0 }
    },
    stats: {
      views: { type: Number, default: 0 },
      responses: { type: Number, default: 0 },
      completionRate: { type: Number, default: 0 },
      averageTimeMinutes: { type: Number, default: 0 }
    }
  },
  {
    timestamps: true
  }
);

// Indexes
FormSchema.index({ creatorId: 1, status: 1 });
FormSchema.index({ status: 1, 'settings.endDate': 1 });

export default mongoose.model<IForm>('Form', FormSchema);
