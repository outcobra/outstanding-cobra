const PROXY_CONFIG = [
  {
    context: [
      "/api",
      "/info"
    ],
    target: "http://localhost:8080"
  }
];

module.exports = PROXY_CONFIG;
