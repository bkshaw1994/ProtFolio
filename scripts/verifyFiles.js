const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + "/../server/.env" });

const profileSchema = new mongoose.Schema({}, { strict: false });
const Profile = mongoose.model("Profile", profileSchema);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    const profile = await Profile.findOne({ isActive: true });

    console.log("Profile Image URL:", profile.profileImage);
    console.log("Resume URL:", profile.resume);
    console.log("Has Image Data:", !!profile.profileImageData?.data);
    console.log("Has Resume Data:", !!profile.resumeData?.data);

    if (profile.profileImageData?.data) {
      console.log(
        "Image Size:",
        (profile.profileImageData.data.length / 1024).toFixed(2),
        "KB",
      );
    }
    if (profile.resumeData?.data) {
      console.log(
        "Resume Size:",
        (profile.resumeData.data.length / 1024).toFixed(2),
        "KB",
      );
    }

    await mongoose.connection.close();
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
