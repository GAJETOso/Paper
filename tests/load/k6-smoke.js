// k6 load smoke test: run with `k6 run tests/load/k6-smoke.js`
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "30s", target: 20 },
    { duration: "1m", target: 100 },
    { duration: "30s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"],
    http_req_failed: ["rate<0.01"],
  },
};

const BASE = __ENV.BASE_URL || "http://localhost:3000";

export default function () {
  const pages = ["/", "/products", "/sustainability", "/products/printing-papers/copy-paper"];
  const res = http.get(`${BASE}${pages[Math.floor(Math.random() * pages.length)]}`);
  check(res, { "status 200": (r) => r.status === 200 });
  sleep(1);
}
