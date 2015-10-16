const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const isEmail = require('email-validator');
const validUtils = require('src/services/validators/umg-email');
const SALT_FACTOR = 10;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userId: Schema.Types.ObjectId,
  creationDate: {
    type: Date,
    default: Date.now
  },
  lastLoginDate: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    required: [true, 'El correo electrónico es un campo obligatorio.'],
    validate: {
      validator: function validateEmailAddress(value) {
        return isEmail.validate(value) && validUtils.isValidUmgEmail(value);
      },
      message: 'Tu correo electrónico es inválido'
    }
  },
  username: {
    type: String,
    required: [true, 'Un nombre de usuario es requerido.']
  },
  firstName: {
    type: String,
    min: 4,
    max: 20,
    trim: true,
    required: [true, 'Su primer nombre es obligario']
  },
  lastName: {
    type: String,
    minLength: 4,
    maxLength: 20,
    trim: true
  },
  carnet: {
    type: String,
    minLength: 10,
    maxLength: 10,
    trim: true,
    required: [true, 'Su número de carné de estudiante es obligatorio.'],
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: [true, 'Una contraseña segura es obligatoria.'],
    validate: {
      validator: function validatePasswordCoincidence(value) {
        const areEquals = value === this.repeat_password;
        this.repeat_password = null;

        return areEquals;
      },
      message: 'Las contraseñas no coinciden.'
    }
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role'
  },
  repeat_password: {
    type: String
  }
});

/**
 * Virtual property which returns the full username
 * @param  {String} 'fullName' Full username
 */
UserSchema.virtual('fullName').get(function computeFullName() {
  return `${this.firstName} ${this.lastName}`;
});

/**
 * Hashing and encrypting user passwords using the bcrypt algorithm
 * @param  {Function} next Callback called when the encryption process has already finished
 */
UserSchema.pre('save', function computePassword(next) {
  // only encrypt if the password was modified or is new
  const user = this;
  if (!user.isModified('password')) return next();

  // generate salt
  bcrypt.genSalt(SALT_FACTOR, function computeSalt(error, salt) {
    if (error) return next(error);

    bcrypt.hash(user.password, salt, function encryptPassword(err, encryptedPassword) {
      if (err) return next(err);

      user.password = encryptedPassword;
      next();
    });
  });
});

/**
 * Utility method which allows us to compare an encrypted password
 * @param  {String}   candidatePassword Encrypted password
 */
UserSchema.methods.authenticate = function comparePassword(candidatePassword) {
  const _this = this;

  return new Promise(function createPromise(reject, resolve) {
    bcrypt.compare(candidatePassword, _this.password, function compare(err, isMatch) {
      if (err) return reject(err);
      if (!isMatch) return resolve(null);

      resolve(null, _this);
    });
  });
};

module.exports = mongoose.model('User', UserSchema);
