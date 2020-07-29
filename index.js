const os = require("os");
const fs = require("fs");

// Using os variables
const osVars = {
  platform: os.platform(),
  homeDir: os.homedir(),
  architecture: os.arch(),
};

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
    } else {
      console.log("dir folder deleted");
    }
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

// --------------------------------------------------------------------------
// --------------------------------------------------------------------------

// Server with http module

const http = require("http");

const server = http.createServer((req, res) => {
  console.log("Request made.");

  // set Header
  res.setHeader("Content-type", "text/html");

  // sending data with res.write
  // res.write("<h2>hello world!</h2>");
  // res.write("<p>hello world! Again</p>");
  // res.end("<p> end line </p>");

  // basic routing
  let path = "./views/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/about-me":
      res.setHeader("Location", "/about");
      res.statusCode = 301;
      res.end();
      break;
    default:
      path += "404.html";
      res.statusCode = 404;
      break;
  }

  // Sending html file
  if (path !== "./views/") {
    fs.readFile(path, (err, data) => {
      if (err) {
        console.log(err);
        res.end("there was some error");
      } else {
        res.end(data);
      }
    });
  }
});

server.listen(4200, "localhost", () => {
  console.log("listening on port 4200 ", osVars);
});
