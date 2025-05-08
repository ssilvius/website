---
id: k673z1
featured: true
draft: true
title: "JWT is Dead, Long Live PASETO"
date: 2025-02-15T14:37:21.000Z
excerpt: "JWT had a good run, but it's time to move on. If you're still using JWT for authorization tokens, you're living with unnecessary security risks. My current project, I've moved back to 'old school' session tokens so I don't have the headache of JWT. I wondered if anyone has solved this problem and I found where we're going to go."
tags:
  - Security
author:
  name: Sean Silvius
  picture: /images/profile.jpg
---
## The Problem With JWT
JWT (JSON Web Token) was designed to solve a real problem: how to create portable, self-contained tokens for authentication and authorization. And for a while, it worked fine. Then people started putting everything into their jwt tokens and they became more than a the front door key but a type of storage. This is not what they are meant for. This created many cases of private data leaks.

### JWT has fundamental design flaws:

  1 . Algorithm confusion attacks: The alg header lets attackers downgrade to none or switch to a symmetric algorithm when you're using asymmetric verification.
   ```typescript
  // JWT header that can be tampered with
{
  "alg": "none",  // Attacker changes this from "RS256"
  "typ": "JWT"
}
  ```
2. No encryption by default: JWTs are only signed, not encrypted. All claims are visible to anyone who gets the token.
3. Cryptographic agility is dangerous: Letting developers choose between multiple algorithms sounds nice but creates attack vectors. Most developers aren't cryptographers.
4. No built-in protection against replay attacks: Nothing prevents an attacker from using a valid token multiple times.
5. No standard key rotation: No built-in mechanism for key rotation, leading to tokens that stay valid indefinitely.

These aren't theoretical issues. JWT vulnerabilities have led to numerous high-profile breaches.

## PASETO: The Better Alternative
PASETO (Platform-Agnostic Security Tokens) fixes these problems with an opinionated approach to token security:
``` typescript
v4.public.eyJkYXRhIjoidGhpcyBpcyBhIHNpZ25lZCBtZXNzYWdlIiwiaWF0IjoiMjAxOS0wMS0wMVQwMDowMDowMCswMDowMCJ9BGY4MgqgZ1J_Qvb8Qb4xOWjKKGe0MG5jBsGXGlkbQ0RgEuIYrKLDU-QJxbRs4Z_Ham6DL0Z1GFK2szj7vGuuYOKqm9XFLKXxRE8BQjCIHDY9jVv51DKU
```

### PASETO has four key advantages:

  1. Versioned protocol: Each version specifies exactly which crypto primitives are used. No choices, no confusion.
  ``` typescript
  v4.public = Ed25519 signatures (asymmetric)
  v4.local = XChaCha20-Poly1305 (symmetric encryption)
  ```
  2. Purpose is explicit: local tokens are encrypted and authenticated. public tokens are signed and can be verified publicly.
  3. Built-in protection: Claims like exp (expiration), iat (issued at), and nbf (not before) are standardized.
  4. No algorithm confusion: The version prefix (v4) determines the cryptographic primitives. No way to downgrade.

### Implementation Example
Here's how you'd use PASETO in a Node.js application:
```typescript
import { V4 } from 'paseto';
import { generateKeyPair } from '@noble/ed25519';

// Generate keys (or load them securely from somewhere)
const keyPair = await generateKeyPair();

// Create a token
const token = await V4.sign({
  sub: 'user:123', 
  exp: '2023-01-01T00:00:00Z'
}, keyPair.secretKey);

// On verification
const payload = await V4.verify(token, keyPair.publicKey);
console.log(payload); // { sub: 'user:123', exp: '2023-01-01T00:00:00Z', ... }
```
Compare that with the typical JWT code, which requires you to select algorithms, handle potential vulnerabilities, and implement additional protections.

### Performance Considerations
PASETO isn't just more secure; it's also efficient. In benchmarks I've run, PASETO with XChaCha20-Poly1305 outperforms JWT with AES-GCM for tokens under 1KB (which is most tokens). The difference isn't huge, but when you're handling thousands of requests per second, it adds up.

### Making the Switch
If you're starting a new project, use PASETO from day one. If you're maintaining an existing application with JWT, consider:

### Adding PASETO support alongside JWT
Issuing new sessions as PASETO tokens
Gradually phasing out JWT validation as old sessions expire
Most modern languages have PASETO libraries now:

JavaScript: paseto.js
TypeScript:
Ruby:
Rust: paseto-rs

### Bottom Line
Like UUIDv7 replaced UUID4 for better database performance, PASETO should replace JWT for better security.

JWT was designed for flexibility, which unfortunately created too much room for error. PASETO was designed for security first, with reasonable defaults and fewer opportunities to shoot yourself in the foot.

For any new project that needs authentication tokens, PASETO is the clear choice. Your future self (and security team) will thank you.