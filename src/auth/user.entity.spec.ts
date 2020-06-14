import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';

describe('User entity', () => {
  describe('validatePassword', () => {
    let user: User;

    beforeEach(() => {
      user = new User();
      user.password = 'hashedPassword';
      bcrypt.compare = jest.fn();
    });

    it('returns true as password is valid', async () => {
      bcrypt.compare.mockReturnValue(true);
      expect(bcrypt.compare).not.toHaveBeenCalled();
      const result = await user.validatePassword('plainTextPassword');
      expect(bcrypt.compare).toHaveBeenCalledWith('plainTextPassword', 'hashedPassword');
      expect(result).toEqual(true);
    });

    it('returns false as password is invalid', async () => {
      bcrypt.compare.mockReturnValue(false);
      expect(bcrypt.compare).not.toHaveBeenCalled();
      const result = await user.validatePassword('plainTextPassword');
      expect(bcrypt.compare).toHaveBeenCalledWith('plainTextPassword', 'hashedPassword');
      expect(result).toEqual(false);
    });
  });
});
