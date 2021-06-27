# CSRF

CSRF: Cross-site request forgery，跨站请求伪装。

## 1、介绍

CSRF (sometimes also called XSRF) is a related class of attack.
The attacker causes the user's browser to perform a request to the website's backend without the user's consent or knowledge.
An attacker can use an XSS payload to launch a CSRF attack.

Wikipedia mentions a good example for CSRF.
In this situation, someone includes an image that isn’t really an image (for example in an unfiltered chat or forum),
instead it really is a request to your bank’s server to withdraw money:

```html
<img src="https://bank.example.com/withdraw?account=bob&amount=1000000&for=mallory" />
```

Now, if you are logged into your bank account and your cookies are still valid (and there is no other validation),
you will transfer money as soon as you load the HTML that contains this image.
For endpoints that require a POST request,
it's possible to programmatically trigger a <form /> submit (perhaps in an invisible `<iframe />`) when the page is loaded:

```html
<form action="https://bank.example.com/withdraw" method="POST">
  <input type="hidden" name="account" value="bob" />
  <input type="hidden" name="amount" value="1000000" />
  <input type="hidden" name="for" value="mallory" />
</form>
<script>window.addEventListener('DOMContentLoaded', (e) => { document.querySelector('form').submit(); }</script>
```

## 2、预防措施

There are a few techniques that should be used to prevent this from happening:

- GET endpoints should be idempotent—actions that enact a change and do not retrieve data should require sending a POST (or other HTTP method) request.
POST endpoints should not interchangeably accept GET requests with parameters in the query string.

- A CSRF token should be included in <form /> elements via a hidden input field.
This token should be unique per user and stored (for example, in a cookie)
such that the server can look up the expected value when the request is sent.
For all non-GET requests that have the potential to perform an action,
this input field should be compared against the expected value.
If there is a mismatch, the request should be aborted.

- This method of protection relies on an attacker being unable to predict the user's assigned CSRF token.
The token should be regenerated on sign-in.

- Cookies that are used for sensitive actions (such as session cookies) should have a short lifetime with the SameSite attribute set to Strict or Lax.
(See SameSite cookies above).
In supporting browsers, this will have the effect of ensuring that the session cookie
is not sent along with cross-site requests and so the request is effectively unauthenticated to the application server.

- Both CSRF tokens and SameSite cookies should be deployed.
This ensures all browsers are protected and provides protection where SameSite cookies cannot help
(such as attacks originating from a separate subdomain).

## 参考资料

- [Types of attacks](https://developer.mozilla.org/en-US/docs/Web/Security/Types_of_attacks)
