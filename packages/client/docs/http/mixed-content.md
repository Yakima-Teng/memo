# Mixed Content

## 1、介绍

When a user visits a page served over HTTPS,
their connection with the web server is encrypted with TLS and is therefore safeguarded from most sniffers and man-in-the-middle attacks.
An HTTPS page that includes content fetched using cleartext HTTP is called a mixed content page.
Pages like this are only partially encrypted,
leaving the unencrypted content accessible to sniffers and man-in-the-middle attackers.
That leaves the pages unsafe.

## 2、例题

题目：Which of the following use cases force a browser to throw a Mixed Content warning/error? Pick ONE or More options.

- A. The website https://www.example.com loads a script file from http://cdn-scriptr.com
- B. The website https://www.example.com loads an unencryped resoure from http://www.api-resource.com
- C. The website https://www.example.com loads an unencryped resoure from http://www.img-resource.com
- D. The website https://www.example.com makes an XMLHttpRequest to http://api.example.com

我感觉答案应该是A、B、C、D全选。

## 参考资料

- [Mixed content](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content)
