# Licensing

**Current license: Apache 2.0** (see LICENSE, NOTICE).

## Why Apache 2.0 is recommended

1. **Patent grant** — contributors license their patents to users; critical in
   manufacturing where platform features may touch patented industrial processes
2. **Business-friendly** — permits proprietary derivatives, so distributors
   and regional partners can run white-labeled deployments
3. **Enterprise trust** — widely approved by corporate OSS policies
4. **Trademark protection** — explicitly does not grant use of the Sylvara name

## Switching licenses

| Target                 | How                                                                                                     | Trade-offs |
| ---------------------- | ------------------------------------------------------------------------------------------------------- | ---------- |
| MIT                    | Replace LICENSE; simpler, but drops the patent grant                                                    |
| GPLv3                  | Replace LICENSE; forces derivatives open — deters distributor white-labels                              |
| BSD-3                  | Similar to MIT + non-endorsement clause                                                                 |
| Proprietary/Commercial | Remove OSS license, add EULA; requires consent of all copyright holders                                 |
| **Dual license**       | Apache 2.0 community + commercial license with SLA/support for enterprise — common for platform vendors |

To switch: update `LICENSE`, `NOTICE`, the `license` field in every
`package.json`, README badges, and obtain agreement from all contributors
(a CLA from day one makes this possible — consider adding one before
accepting external contributions).
