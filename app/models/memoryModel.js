module.exports = mongoose => {
    const memoryModel = mongoose.model(
      "memoryModel",
      mongoose.Schema(
        {
          imageURL: String,
          location: String,
          date: {type: Date, default:Date.now},
          relation: String,
          owneremail: String,
          tips: String,
          memoryowner: String

        },
        { timestamps: true }
      )
    );
    return memoryModel;
  };