---
id: 5tycyX
featured: true
title: Passwords Suck - Why do we still use them?
date: 2024-06-24T13:00:00.000Z
excerpt: The idea of a secret combination of alpha-numeric characters to act as a lock is much older than the digital world. The first examples date back to Mesopotamia
tags:
  - Authentication
  - security
  - rails
  - typescript
author:
  name: Sean Silvius
  picture: /images/profile.jpg
---

Much like the first Roman challenge/response passwords which were still used as late as World War II (Thunder!/Flash! was used during the Allied landing on Normandy) and beyond, our digital counterpart has the same flaw. Complexity. The evolution of the password over the last couple of decades was led by engineers' limits placed on the database field that stored the password data. You have no idea how many times I've had to update a field in databases first created in the 90s that had limits like 16 characters that were forced to downcase in clear text (not encrypted). 

## Passwords Suck

A password is inherently poor security because the human factor is always the weak link. People tend to use passwords that are easy to remember and therefore easy to compromise. People hate entropy and only entropy creates a password that is tougher to crack. Here, lets have [xkcd](https://xkcd.com/936/) explain.

![](https://imgs.xkcd.com/comics/password_strength_2x.png)

As the example above clarifies, complexity ensures difficulty for common password-cracking techniques. No matter what, the usability is poor in entering a password, simple or complex, creating a mental load.

Those same engineers who thought 16 downcased un-encrypted characters were enough to store a good password then for some reason decided to encourage the common substitution of numbers and symbols for letters in the same database tables when they all were taught the rules of entropy at college. Then the bad actors upped their game. They started using something called a [Beowulf cluster](https://en.wikipedia.org/wiki/Beowulf_cluster) to make light work of their attacks. Then came the [Botnet](https://en.wikipedia.org/wiki/Botnet).

## Password Attacks

One of the factors that the xkcd comic above pointed out, that we can mitigate is the requests allowed per second. A password string like in the first cell of the comic can be attacked for a couple of days at a rate of 1000s of queries per second.

Bad actors commonly use brute force, dictionary, and password-stuffing attacks on websites using basic authentication.

1. **Brute force** attacks are the oldest and most common, bad actors use automated scripts to try out possible passwords until the correct one works. Brute-force attacks are most successful when users have common or weak passwords, which can be “guessed” by tools in seconds. Cracking a strong password might take a few hours or days.

2. Like brute-force attacks, **dictionary attacks** are less about quantity and more about quality. In other words, instead of trying every possible combination, bad actors start with the assumption that users are likely to follow certain patterns when they create a password.

3. With **credential stuffing** bad actors take advantage of the tendency for users to reuse the same usernames and passwords for multiple accounts. Pairs of compromised usernames and passwords are added to a botnet that 
   automates the process of trying those credentials on multiple sites at 
   the same time.

Many other attack types take advantage of simple passwords and unmanaged rate limits. It is not only wise, but a requirement today to rate limit authentication, registration, and password reset endpoints no matter what technologies you're using. 

### Rails 7.2

Here with rails 7.2 and above you can use the rails rate limiter, it makes use of the rails cache to stop abuse of api endpoints as well as mitigating the attacks mentioned above. 

Like everything rails, it just works out of the box. 

```ruby
class SessionsController < ApplicationController
  # Limit new session (login) requests to 10 in 3 minutes #11 hard stops with redirect
  rate_limit to: 10, within: 3.minutes, only: :create, with: -> { redirect_to new_session_url, alert: "Please try again later." }
end
```

**to:** the number of requests before the rule is acted upon

**within:** the amount of time to gate the request within

**only:** Just like every other before or after action, limits to what functions you wish

**by:** (not in example) `by: -> { request.subdomain }` Option allows you to group requests, this can offer some very powerful filtering. By default, rate limits are by unique IP address.

**store:** You may assign any `ActiveSupport::Cache` store as the target to store the rate-limiting data. Combined with [rails/solid_cache](https://github.com/rails/solid_cache) you can have a highly performant rate limiter all with built-in features of Rails 8 and only adding solid_cache to Rails 7.2.

*Before 7.2 you should install and configure [rack-attack](https://github.com/rack/rack-attack)*

### Nextjs and other js frameworks

Upstash has written a great rate-limit package that uses key-value stores to keep track of limits. Of course, they want you to use their hosted Redis service, but you don't have to. If you're hosting your Nextjs app on Vercel like many, you can write a quick middleware to rate limit. 

```typescript
import { ipAddress, next } from '@vercel/edge'
import { Ratelimit } from '@upstash/ratelimit'
import { kv } from '@vercel/kv'

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(5, '10 s'), // limit to 5 requests every 10 seconds
})

export const config = {
  matcher: '/auth',
}

export default async function middleware(request) {
  const ip = ipAddress(request) || '127.0.0.1'
  const { success, pending, limit, reset, remaining } = await ratelimit.limit(ip)
  // You should add some logging here.
  return success ? next() : Response.redirect(new URL('/429.html', request.url))
}
```

Make sure you enable vercel kv and it should be working well. You can sub in anything that provides the redis api. If you're building on other frameworks, this example is a great starting point for the frameworks middleware.

## Other Measures

**Knowledge** The weakest link is [PEBKAC](https://www.computerhope.com/jargon/p/pebkac.htm). If possible, train your users to spot phishing attacks.

**Software** Use a password manager that creates and stores strong passwords in a local vault. I highly suggest 1Password, Apple's new iCloud Passwords is promising too. It's missing ssh key managment, however.  

**Multifactor** Add non-sms-based multifactor support to your app. For rails, there is [Ruby One Time Password library](https://github.com/mdp/rotp), and for next and js frameworks there are many options. Too many in my opinion.

**Passwordless** Slack made magic links popular and gave us a UX for relying on the users' email addresses to provide a login. Unfortunately, this method is vulnerable to password stuffing.

**Passkeys** Soon, passwords will go away and we will only have passkeys. Of course, that soon is like everything, it will be determined by humans and it will take forever to happen. Passkeys are the future of authentication. A person does not have to make something up. You use your face, fingerprint, or some other biometric. With some systems, the fingerprint is of your device not you. These are stored in secure places on your devices and each device has its passkeys so you don't need to figure out a way to sync them.

**Password Policy** One of the first things you can do to help your users stay safe is to put a policy in place that helps them create good passwords. Here is a Stimulus controller and a React component that promote the same kind of passwords as shown in the xkcd comic above.

#### Stimulus Controller

```javascript
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "strengthMeter", "feedback"]
  static values = { score: Number, strength: String }

  connect() {
    this.updateStrength()
  }

  updateStrength() {
    const password = this.inputTarget.value
    const result = this.evaluatePassword(password)

    this.scoreValue = result.score
    this.strengthValue = result.strength

    this.updateStrengthMeter()
    this.updateFeedback(result.feedback)

    this.dispatch("strengthUpdated", { 
      detail: { score: this.scoreValue, strength: this.strengthValue } 
    })
  }

  updateStrengthMeter() {
    const blocks = this.strengthMeterTarget.querySelectorAll('div > div')
    const title = this.strengthMeterTarget.querySelector('span')

    blocks.forEach((block, index) => {
      const blockScore = (index + 1) * 20
      block.className = `w-5 h-2.5 ${index < 4 ? 'mr-0.5' : ''} ${this.getColorClass(this.scoreValue, blockScore)} transition-colors duration-300`
    })

    title.textContent = this.strengthValue
    title.className = `font-bold ${this.getColorClass(this.scoreValue)}`
  }

  updateFeedback(feedback) {
    this.feedbackTarget.innerHTML = feedback.map(item => `<li>${item}</li>`).join('')
  }

  getColorClass(score, threshold = 0) {
    const colors = ['red', 'orange', 'yellow', 'lime', 'green']
    const index = Math.min(Math.floor(score / 20), 4)
    return threshold ? (score < threshold ? 'bg-red-500' : `bg-${colors[index]}-500`) : `text-${colors[index]}-500`
  }

  evaluatePassword(password) {
    const score = this.calculateScore(password)
    return {
      score,
      strength: this.passwordStrength(score),
      feedback: this.generateFeedback(password)
    }
  }

  calculateScore(password) {
    return Math.min(
      this.wordCountScore(password) +
      this.lengthScore(password) +
      this.complexityScore(password),
      100
    )
  }

  wordCountScore(password) {
    const wordCount = password.split(/[\s_-]+/).length
    return Math.min(wordCount * 20, 60)
  }

  lengthScore(password) {
    return Math.min(password.length * 2, 20)
  }

  complexityScore(password) {
    return [/[A-Z]/, /[a-z]/, /[0-9]/, /[^A-Za-z0-9]/]
      .filter(regex => regex.test(password))
      .length * 5
  }

  passwordStrength(score) {
    const strengths = ['Very Weak', 'Weak', 'Moderate', 'Strong', 'Very Strong']
    return strengths[Math.floor(score / 20)]
  }

  generateFeedback(password) {
    const feedback = []
    const checks = [
      { condition: password.split(/[\s_-]+/).length < 4, message: 'Consider using four or more words separated by spaces, underscores, or dashes.' },
      { condition: !/[A-Z]/.test(password), message: 'Add uppercase letters.' },
      { condition: !/[a-z]/.test(password), message: 'Add lowercase letters.' },
      { condition: !/[0-9]/.test(password), message: 'Add numbers.' },
      { condition: !/[^A-Za-z0-9]/.test(password), message: 'Add special characters.' }
    ]

    checks.forEach(({ condition, message }) => {
      if (condition) feedback.push(message)
    })

    return feedback.length > 0 ? feedback : ['Great password!']
  }
}
```

And here is a html.erb partial to include as your password fields. Create `app/views/shared/_password_strength.html.erb`

```erb
<div data-controller="password-strength" class="space-y-4">
  <%= form.password_field :password,
    data: {
      password_strength_target: "input",
      action: "input->password-strength#updateStrength"
    },
    class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" %>

  <div data-password-strength-target="strengthMeter" class="flex items-center">
    <div class="flex mr-4">
      <% 5.times do |i| %>
        <div class="w-5 h-2.5 <%= 'mr-0.5' unless i == 4 %> bg-red-500 transition-colors duration-300"></div>
      <% end %>
    </div>
    <span class="font-bold"></span>
  </div>

  <ul data-password-strength-target="feedback" class="list-disc list-inside text-sm text-gray-600"></ul>
</div>
```

- The partial is designed to work within a form, expecting a `form` object to be passed as a local variable. This allows it to use the correct field name and integrate smoothly with Rails form helpers.
- The Stimulus controller's data attributes are applied directly to the elements, making it easy for the JavaScript to interact with the DOM.
- Tailwind CSS classes are used for styling, maintaining consistency with our previous examples.
- The strength meter blocks are generated using a Ruby loop, which is a more Rails-like approach than hard-coding five separate divs.

Here is an example of how to use the partial in a registration form `app/views/registration/new.html.erb`

```erb
<%= form_with(model: @user, local: true) do |form| %>
  <div class="mb-4">
    <%= form.label :email, class: "block mb-2 font-bold text-gray-700" %>
    <%= form.email_field :email, class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" %>
  </div>

  <div class="mb-4">
    <%= form.label :password, class: "block mb-2 font-bold text-gray-700" %>
    <%= render partial: 'shared/password_strength', locals: { form: form } %>
  </div>

  <div class="mb-4">
    <%= form.label :password_confirmation, class: "block mb-2 font-bold text-gray-700" %>
    <%= form.password_field :password_confirmation, class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" %>
  </div>

  <div>
    <%= form.submit "Sign Up", class: "px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" %>
  </div>
<% end %>
```

### React Component

This react component implements the strength evaluation the same way as the ruby. 

1. The component takes a `password` prop which is the password to be evaluated. 

2. It use the `useState` and `useEffect` hooks to manage the state of the evaluation and updates as the password changes.

3. The scoring and feedback are implemented as functions so it's easy to modify to match your needs.

4. It uses Tailwind CSS for style. Easy to remove/override/modify.

The evaluator implementation in Typescript , `./PasswordStrength.ts`

```typescript
import React, { useState, useEffect } from 'react';

interface PasswordEvaluation {
  score: number;
  strength: string;
  feedback: string[];
}

interface PasswordStrengthProps {
  password: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const [evaluation, setEvaluation] = useState<PasswordEvaluation>({ 
    score: 0, 
    strength: '', 
    feedback: [] 
  });

  useEffect(() => {
    setEvaluation(evaluatePassword(password));
  }, [password]);

  const evaluatePassword = (password: string): PasswordEvaluation => {
    const score = calculateScore(password);
    return {
      score,
      strength: getStrengthLabel(score),
      feedback: generateFeedback(password)
    };
  };

  const calculateScore = (password: string): number => {
    const wordCount = password.split(/[\s_-]+/).length;
    const wordScore = Math.min(wordCount * 20, 60);
    const lengthScore = Math.min(password.length * 2, 20);
    const complexityScore = [/[A-Z]/, /[a-z]/, /[0-9]/, /[^A-Za-z0-9]/]
      .filter(regex => regex.test(password))
      .length * 5;

    return Math.min(wordScore + lengthScore + complexityScore, 100);
  };

  const getStrengthLabel = (score: number): string => {
    const strengths = ['Very Weak', 'Weak', 'Moderate', 'Strong', 'Very Strong'];
    return strengths[Math.floor(score / 20)];
  };

  const generateFeedback = (password: string): string[] => {
    const checks = [
      { condition: password.split(/[\s_-]+/).length < 4, message: 'Consider using four or more words separated by spaces, underscores, or dashes.' },
      { condition: !/[A-Z]/.test(password), message: 'Add uppercase letters.' },
      { condition: !/[a-z]/.test(password), message: 'Add lowercase letters.' },
      { condition: !/[0-9]/.test(password), message: 'Add numbers.' },
      { condition: !/[^A-Za-z0-9]/.test(password), message: 'Add special characters.' }
    ];

    const feedback = checks
      .filter(({ condition }) => condition)
      .map(({ message }) => message);

    return feedback.length > 0 ? feedback : ['Great password!'];
  };

  const getColorClass = (score: number, isText: boolean = false): string => {
    const colors = ['red', 'orange', 'yellow', 'lime', 'green'];
    const index = Math.floor(score / 20);
    return `${isText ? 'text' : 'bg'}-${colors[index]}-500`;
  };

  return (
    <div className="password-strength">
      <div className="strength-meter flex">
        {[1, 2, 3, 4, 5].map((block) => (
          <div
            key={block}
            className={`w-5 h-2.5 ${block < 5 ? 'mr-0.5' : ''} ${getColorClass(evaluation.score)} transition-colors duration-300`}
          />
        ))}
      </div>
      <span className={`font-bold ${getColorClass(evaluation.score, true)}`}>
        {evaluation.strength}
      </span>
      <ul className="feedback-list">
        {evaluation.feedback.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordStrength;
```

To use the evaluator, include it in a form element input component like so.

```typescript
import React, { useState } from 'react';
import PasswordStrength from './PasswordStrength';

const PasswordInput: React.FC = () => {
  const [password, setPassword] = useState<string>('');

  return (
    <div>
      <input
        type="password"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <PasswordStrength password={password} />
    </div>
  );
};

export default PasswordInput;
```

Are these examples the best code in the world? Na. But they are good illustrations of how it's pretty simple, with a tiny amount of code, to help your users find better passwords. 

In a future article, I will explore how Rails 7.2 and maybe Rails 8 are improving simple credentials-based authentication. 
