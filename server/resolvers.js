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
        updateUser: async (_, { id, name, email }) => {
            const updateData = {};
            if (name !== undefined) {
              updateData.name = name;
            }
            if (email !== undefined) {
              updateData.email = email;
            }
      
            return await User.findByIdAndUpdate(id, updateData, { new: true });
          },
        deleteUser: (_, { id }) => User.findByIdAndRemove(id),
        createCompany: (_, { name, yearOfCreation }) => Company.create({ name, yearOfCreation }),

        updateCompany: async (_, { id, name, yearOfCreation }) => {
            try {
              const updateData = {};
              if (name !== undefined) {
                updateData.name = name;
              }
              if (yearOfCreation !== undefined) {
                updateData.yearOfCreation = yearOfCreation;
              }
      
              return await Company.findByIdAndUpdate(id, updateData, { new: true });
            } catch (error) {
              throw new Error(error.message);
            }
          },

        deleteCompany: (_, { id }) => Company.findByIdAndRemove(id),
        addUserToCompany: async (_, { userId, companyId }) => {
            await User.findByIdAndUpdate(userId, { company: companyId });
            return Company.findByIdAndUpdate(companyId, { $addToSet: { users: userId } }, { new: true }).populate('users');
        },
        removeUserFromCompany: async (_, { userId, companyId }) => {
            await User.findByIdAndUpdate(userId, { company: null });
            return Company.findByIdAndUpdate(companyId, { $pull: { users: userId } }, { new: true }).populate('users');
        },
        removeAllUsersFromCompany: async (_, { companyId }) => {
            try {
              const updatedCompany = await Company.findByIdAndUpdate(
                companyId,
                { $set: { users: [] } }, // Set the 'users' array to an empty array
                { new: true } // Return the updated document
              );
      
              return updatedCompany;
            } catch (error) {
              throw new Error(error.message);
            }
          },
    },
};

module.exports = resolvers;
