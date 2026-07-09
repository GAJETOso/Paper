# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

**Do not open public issues for security vulnerabilities.**

- Email **security@sylvara.com** with a detailed report, or
- Use GitHub's [private vulnerability reporting](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing-information-about-vulnerabilities/privately-reporting-a-security-vulnerability) on this repository.

Include:

1. A description of the vulnerability and its impact
2. Steps to reproduce (proof of concept if possible)
3. Affected components/versions
4. Any suggested remediation

## What to expect

- **Acknowledgement** within 2 business days
- **Initial assessment** within 5 business days
- **Fix or mitigation plan** communicated within 30 days for confirmed issues
- Credit in release notes (unless you prefer anonymity)

## Scope & hardening in this repository

- Secret scanning, CodeQL (SAST), and dependency scanning run in CI
- OWASP Top 10 controls: input validation, output encoding, CSRF protection,
  rate limiting, secure headers (CSP, HSTS), encrypted storage, audit logging
- All authentication supports 2FA (TOTP); sessions use short-lived JWTs with
  rotating refresh tokens
- See `docs/security.md` for the full security architecture.
