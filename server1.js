const express = require("express");
const Queue = require("bull");
const app = express();
const queueOptions = {
  redis: {
    port: 6378,
    host: "localhost",
  },
};

const receive_server_1 = new Queue("send_server_1", queueOptions);

const send_server_2 = new Queue("receive_server_2", queueOptions);

app.get("/", function (req, res) {
  send_server_2.add({ name: "سرور یک به سرور دوم" });
  return res.json({ message: "send something to server 2" });
});

receive_server_1.process(function (job) {
  console.log(job.data);
});

app.listen(3001, function () {
  console.log("server 1 running at port 3001");
});
