import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
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

export interface UserAttributes {
  id: string;
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
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'roles' | 'status' | 'isEmailVerified' | 'isPhoneVerified' | 'isKYCVerified' | 'performanceScore' | 'totalEarnings'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public email!: string;
  public password?: string;
  public firstName!: string;
  public lastName!: string;
  public phone?: string;
  public roles!: UserRole[];
  public status!: UserStatus;
  public isEmailVerified!: boolean;
  public isPhoneVerified!: boolean;
  public isKYCVerified!: boolean;
  public profileImage?: string;
  public googleId?: string;
  public facebookId?: string;
  public performanceScore!: number;
  public totalEarnings!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Instance methods
  public async comparePassword(candidatePassword: string): Promise<boolean> {
    if (!this.password) return false;
    return bcrypt.compare(candidatePassword, this.password);
  }

  public toJSON(): Partial<UserAttributes> {
    const values = { ...this.get() };
    delete values.password;
    return values;
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    roles: {
      type: DataTypes.ARRAY(DataTypes.ENUM(...Object.values(UserRole))),
      defaultValue: [UserRole.CONTRIBUTOR]
    },
    status: {
      type: DataTypes.ENUM(...Object.values(UserStatus)),
      defaultValue: UserStatus.PENDING
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isPhoneVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isKYCVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    facebookId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    performanceScore: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0.00
    },
    totalEarnings: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0.00
    }
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
    hooks: {
      beforeCreate: async (user: User) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user: User) => {
        if (user.changed('password') && user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    }
  }
);

export default User;
