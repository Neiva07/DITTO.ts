import User, { UserModel } from "@models/user.model";

import { sanitizeUser } from "@modules/users/config/strategies/jwt";

type GetUserArgs = {
  _id?: string;
  email?: string;
};

const UserResolveFunctions = {
  Query: {
    getUsers: async () => {
      try {
        const users = await User.find();
        const userSanitized = users.map(sanitizeUser);
        return userSanitized;
      } catch (err) {
        throw err;
      }
    },
    getUser: async (_: any, { _id, email }: GetUserArgs) => {
      try {
        const user = await User.findOne({
          $or: [{ _id }, { email }]
        });
        if (user) {
          return sanitizeUser(user);
        }
        throw "not found any user";
      } catch (err) {
        throw err;
      }
    }
  }
};

export default UserResolveFunctions;
