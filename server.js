// server.js
const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");

// Helper function to format uptime
const formatUptime = seconds => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${hours}h ${minutes}m ${secs}s`;
};

// Helper function to format memory in GB
const formatMemory = bytes => (bytes / 1024 / 1024 / 1024).toFixed(2);

const server = http.createServer((req, res) => {
  if (req.url === "/info") {
    const info = {
      hostname: os.hostname(),
      uptime: formatUptime(os.uptime()),
      platform: os.platform(),
      architecture: os.arch(),
      totalMemory: formatMemory(os.totalmem()),
      freeMemory: formatMemory(os.freemem()),
      cpuModel: os.cpus()[0].model,
      cpuCount: os.cpus().length,
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(info));
  } else if (req.url === "/script.js") {
    const scriptPath = path.join(__dirname, "script.js");
    fs.readFile(scriptPath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("Error loading script.js");
      } else {
        res.writeHead(200, { "Content-Type": "application/javascript" });
        res.end(data);
      }
    });
  } else {
    const htmlPath = path.join(__dirname, "index.html");
    fs.readFile(htmlPath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("Error loading index.html");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`\nBasic Stat Server is running at http://localhost:${PORT}`);
});
