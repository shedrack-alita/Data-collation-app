import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export enum UserRole {
  CREATOR = 'creator',
  CONTRIBUTOR = 'contributor',
  VERIFIER = 'verifier',
  ADMIN = 'admin'
}

export enum UserStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  PENDING = 'pending'
}

export interface IUser extends Document {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  phone?: string;
  roles: UserRole[];
  status: UserStatus;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isKYCVerified: boolean;
  profileImage?: string;
  googleId?: string;
  facebookId?: string;
  performanceScore: number;
  totalEarnings: number;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  toJSON(): any;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    password: {
      type: String,
      select: false
    },
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      trim: true
    },
    roles: {
      type: [String],
      enum: Object.values(UserRole),
      default: [UserRole.CONTRIBUTOR]
    },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.ACTIVE
    },
    isEmailVerified: {
      type: Boolean,
      default: false
    },
    isPhoneVerified: {
      type: Boolean,
      default: false
    },
    isKYCVerified: {
      type: Boolean,
      default: false
    },
    profileImage: {
      type: String
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true
    },
    facebookId: {
      type: String,
      unique: true,
      sparse: true
    },
    performanceScore: {
      type: Number,
      default: 0
    },
    totalEarnings: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.password;
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
