const User = require('./models/User');
const Company = require('./models/Company');

const resolvers = {
    Query: {
        getUser: async (_, { id }) => {
            try {
              return await User.findById(id).populate('company');
            } catch (error) {
              throw new Error(error.message);
            }
          },
          getCompany: async (_, { id }) => {
            try {
              return await Company.findById(id).populate('users');
            } catch (error) {
              throw new Error(error.message);
            }
          },
      
    },
    Mutation: {
        createUser: (_, { name, email }) => User.create({ name, email }),
        updateUser: (_, { id, name, email }) => User.findByIdAndUpdate(id, { name, email }, { new: true }),
        deleteUser: (_, { id }) => User.findByIdAndRemove(id),
        createCompany: (_, { name, yearOfCreation }) => Company.create({ name, yearOfCreation }),
        updateCompany: (_, { id, name, yearOfCreation }) => Company.findByIdAndUpdate(id, { name, yearOfCreation }, { new: true }),
        deleteCompany: (_, { id }) => Company.findByIdAndRemove(id),
        addUserToCompany: async (_, { userId, companyId }) => {
            await User.findByIdAndUpdate(userId, { company: companyId });
            return Company.findByIdAndUpdate(companyId, { $addToSet: { users: userId } }, { new: true }).populate('users');
        },
        removeUserFromCompany: async (_, { userId, companyId }) => {
            await User.findByIdAndUpdate(userId, { company: null });
            return Company.findByIdAndUpdate(companyId, { $pull: { users: userId } }, { new: true }).populate('users');
        },
    },
};

module.exports = resolvers;
