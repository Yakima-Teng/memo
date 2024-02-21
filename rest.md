[[toc]]

## REST接口设计的5条指导规则 {#rest-guidelines}

1. 不要使用物理地址作为url。比如`http://www.acme.com/inventory/product003.xml`应更换为`http://www.acme.com/inventory/product/003`。

2. 不要返回过多的数据。比如，产品列表查询接口应返回前几条产品数据，而非全部的产品列表数据。数据较多时，可以考虑分页。

3. 接口文档应书写清晰，不要随意改动，避免影响已有的客户端。

4. 应返回实际地址而非让客户端根据id等自行去拼接。

5. GET请求不应导致服务端状态的变动。
