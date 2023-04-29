const express = require("express");
const Queue = require("bull");
const app = express();
const queueOptions = {
  redis: {
    port: 6378,
    host: "localhost",
  },
};

const send_server_1 = new Queue("send_server_1", queueOptions);

const receive_server_2 = new Queue("receive_server_2", queueOptions);

app.get("/", function (req, res) {
  send_server_1.add({ name: "hosein ladmakhi" });
  return res.json({ message: "send something to server 1" });
});

receive_server_2.process(function (job) {
  console.log(job.data);
});

app.listen(3000, function () {
  console.log("server 2 running at port 3000");
});
