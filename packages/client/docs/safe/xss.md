# Cross-site scripting

XSS攻击: Cross-site scripting

## 1、介绍

Cross-site scripting (XSS) is a security exploit
which allows an attacker to inject into a website malicious client-side code.
This code is executed by the victims and lets the attackers bypass access controls and impersonate users.
According to the Open Web Application Security Project,
XSS was the seventh most common Web app vulnerability in 2017.

These attacks succeed if the Web app does not employ enough validation or encoding.
The user's browser cannot detect the malicious script is untrustworthy,
and so gives it access to any cookies, session tokens,
or other sensitive site-specific information,
or lets the malicious script rewrite the HTML content.

Cross-site scripting attacks usually occur when

- 1) data enters a Web app through an untrusted source (most often a Web request) or
- 2) dynamic content is sent to a Web user without being validated for malicious content.

The malicious content often includes JavaScript,
but sometimes HTML, Flash, or any other code the browser can execute.
The variety of attacks based on XSS is almost limitless,
but they commonly include transmitting private data like cookies or other session information to the attacker,
redirecting the victim to a webpage controlled by the attacker,
or performing other malicious operations on the user's machine under the guise of the vulnerable site.

XSS attacks can be put into three categories:

- stored (also called persistent),
- reflected (also called non-persistent), or
- DOM-based.

**Stored XSS Attacks**

The injected script is stored permanently on the target servers.
The victim then retrieves this malicious script from the server when the browser sends a request for data.

**Reflected XSS Attacks**

When a user is tricked into clicking a malicious link,
submitting a specially crafted form,
or browsing to a malicious site, the injected code travels to the vulnerable website.
The Web server reflects the injected script back to the user's browser,
such as in an error message, search result,
or any other response that includes data sent to the server as part of the request.
The browser executes the code because it assumes the response is from a "trusted" server
which the user has already interacted with.

**DOM-based XSS Attacks**

The payload is executed as a result of
modifying the DOM environment (in the victim’s browser) used by the original client-side script.
That is, the page itself does not change,
but the client side code contained in the page runs in an unexpected manner
because of the malicious modifications to the DOM environment.

## 参考

- [Cross-site scripting](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting)
- [Types of attacks](https://developer.mozilla.org/en-US/docs/Web/Security/Types_of_attacks)
