import bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
  const factor: number = 12;
  const salt = await bcrypt.genSalt(factor);
  return await bcrypt.hash(password, salt);
}


export const comparePassword = async (
  password: string, 
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword)
}