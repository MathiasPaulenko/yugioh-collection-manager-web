# Security Policy

## Supported Versions

This is a local application under active development. Security fixes are
applied to `main` only.

| Version | Supported |
| ------- | --------- |
| `main`  | Yes       |
| others  | No        |

## Reporting a Vulnerability

Please **do not** open a public issue for security vulnerabilities.

Report them privately through
[GitHub Security Advisories](https://github.com/MathiasPaulenko/yugioh-collection-manager-web/security/advisories/new)
or by emailing mathias.paulenko@gmail.com.

Include:

- A description of the vulnerability and its impact
- Steps to reproduce or a proof of concept
- Affected versions/components, if known

You'll get an acknowledgement as soon as possible, and we'll coordinate a fix
and disclosure timeline with you.

## Scope notes

- This app is designed to run locally. Exposing it to the internet without
  hardening (authentication, `DEBUG=False`, proper `ALLOWED_HOSTS`) is out of
  scope for the default configuration.
- Never commit `.env` files, database credentials, or API keys. If you find a
  leaked secret in the history, report it as a vulnerability.
