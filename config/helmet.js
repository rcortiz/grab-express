import helmet from "helmet";

const helmetMiddleware = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "trusted-scripts.com"],
    },
  },
  frameguard: { action: "deny" },
  hidePoweredBy: true,
  hsts: { maxAge: 31536000, includeSubDomains: true },
  xssFilter: true,
});

export default helmetMiddleware;
