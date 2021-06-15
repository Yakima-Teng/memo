# REST设计指南

Some soft guidelines for designing a REST architecture:

## 1、五条指导规则

### 1、Do not use "physical" URLs

A physical URL points at something physical -- e.g., an XML file: "http://www.acme.com/inventory/product003.xml".
A logical URL does not imply a physical file: "http://www.acme.com/inventory/product/003".

- Sure, even with the .xml extension, the content could be dynamically generated.
But it should be "humanly visible" that the URL is logical and not physical.

### 2、Do not return an **overload** of data

Queries should not return an overload of data.
If needed, provide a paging mechanism.
For example, a "product list" GET request should return the first n products (e.g., the first 10),
with next/prev links.

### 3、Well documented

Even though the REST response can be anything,
make sure it's well documented,
and do not change the output format lightly (since it will break existing clients).

- Remember, even if the output is human-readable, your clients aren't human users.
- If the output is in XML, make sure you document it with a schema or a DTD.

### 4、Include the actual URLs with REST responses

Rather than letting clients construct URLs for additional actions,
include the actual URLs with REST responses.
For example, a "product list" request could return an ID per product,
and the specification says that you should use http://www.acme.com/product/PRODUCT_ID to get additional details.
That's bad design.
Rather, the response should include the actual URL with each item: http://www.acme.com/product/001263, etc.

- Yes, this means that the output is larger.
But it also means that you can easily direct clients to new URLs as needed,
without requiring a change in client code.

### 5、GET access requests should never cause a state change

Anything that changes the server state should be a POST request (or other HTTP verbs, such as DELETE).

## 2、例题

题目：Which of the following statements are true about REST? Pick ONE or More options.

- A. Logical URLs should be used instead of physical URLs
- B. Actual URLs must always be used in REST response
- C. A paging technique should used if the output data is small
- D. Get requests must be read only
- E. Output format can be changed
- F. Post requests must be read only

我自己觉得的答案是A(yes), B(yes), C(no), D(yes), E(no), F(no)，不清楚正确答案是啥。

## 参考资料

- [9. REST Design Guidelines](http://rest.elkstein.org/2008/02/rest-design-guidelines.html)
