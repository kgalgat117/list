var sequelize = require('./connection')
var User = require('./users')
const { DataTypes } = require('sequelize');

const UserFriend = sequelize.define('UserFriends', {
    UserId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    FriendId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    }
})

UserFriend.belongsTo(User, { foreignKey: 'UserId' })
UserFriend.belongsTo(User, { foreignKey: 'FriendId' })
User.hasMany(UserFriend, { foreignKey: 'UserId', sourceKey: 'id' })

setTimeout(() => {
    // seeder()
}, 5000)

async function seeder() {
    try {
        let count = await User.count({})
        let usersData = getFriends(count)
        await UserFriend.bulkCreate(usersData)
    } catch (error) {
        console.log("Some Error While Creating Friends", error)
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getFriends(start) {
    let temp = []
    for (let i = start + 1; i < (start + 11); i++) {
        temp.push({
            UserId: i,
            FriendId: randomIntFromInterval(1, start)
        })
    }
    return temp
}

module.exports = UserFriend