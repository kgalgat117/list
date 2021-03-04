var sequelize = require('./connection')
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
    }
})

setTimeout(() => {
    // seeder()
}, 5000)


async function seeder() {
    try {
        let count = await User.count({})
        let usersData = getUsers(count)
        await User.bulkCreate(usersData)
    } catch (error) {
        console.log("Some Error While Creating Users", error)
    }
}

function getUsers(start) {
    let temp = []
    for (let i = start + 1; i < (start + 11); i++) {
        temp.push({
            firstName: `firstName ${i}`,
            lastName: `lastName ${i}`
        })
    }
    return temp
}

module.exports = User