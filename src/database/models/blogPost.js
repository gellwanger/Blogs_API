const BlogPost = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define("BlogPost", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:  true,
    },
    
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: {type:DataTypes.DATE, defaultValue:Date.now()},
    updated: {type:DataTypes.DATE, defaultValue:Date.now()},
  },
  {
    timestamps: false,
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User,
      { foreignKey: 'userId',  as: 'user' });
  }

  return BlogPost;
};

module.exports = BlogPost;
