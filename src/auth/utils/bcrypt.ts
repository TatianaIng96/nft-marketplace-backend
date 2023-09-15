import bcrypt from 'bcrypt';
import crypto from 'crypto';

export const hashPassword = async (password: string) => {
  const factor: number = 12;
  const salt = await bcrypt.genSalt(factor);
  return await bcrypt.hash(password, salt);
}

export const hashPasswordSync = (password: string) => {
  const factor: number = 12;
  const salt = bcrypt.genSaltSync(factor);
  return bcrypt.hashSync(password, salt);
}

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword)
}

export const createValidationToken = (data: string) => {
  return crypto.createHash('sha256').update(data).digest('hex');
}