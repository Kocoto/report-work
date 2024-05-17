const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://reportwork:TvDip.J_ma_7wax@cluster0.grshbqi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Truy cập DB thành công!");
  } catch (error) {
    console.log("Truy cập DB thất bại!!!!");
  }
}

module.exports = { connect };
