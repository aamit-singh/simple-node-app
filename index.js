const os = require("os");
const fs = require("fs");
const express = require("express");

// Using os variables
const osVars = { platform: os.platform(), homeDir: os.homedir() };

// Using file System ---

// read files
fs.readFile("./files/test.txt", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data.toString());
  }
});

// write files
if (!fs.existsSync("./files/test2.txt")) {
  fs.writeFile("./files/test2.txt", "Hello Amit! ", (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("wrote in test2.txt");
    }
  });
} else {
  // deleting files
  fs.unlink("./files/test2.txt", (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("test2 deleted");
    }
  });
}

// make directories
if (!fs.existsSync("./files/dir")) {
  fs.mkdir("./files/dir", (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("dir was created.");
    }
  });
} else {
  fs.rmdir("./files/dir", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("dir folder deleted");
  });
}

// fs streams
const readStream = fs.createReadStream("./files/test.txt", {
  encoding: "utf8",
});
const writeStream = fs.createWriteStream("./files/test2.txt");

// copying data
// readStream.on("data", (chunk) => {
//   console.log("----New Chunk----");
//   console.log(chunk);
//   writeStream.write("New Chunk\n");
//   writeStream.write(chunk);
// });

// alternate copying technique
readStream.pipe(writeStream);

// ----------------------------------------------------
// ----------------------------------------------------

// Express App

const app = express();

app.use("/", (req, res) => {
  res.send("The server is running here.");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT || 3000}`, osVars);
});
