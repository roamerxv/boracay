<%--
  ~ Boracay - Web 项目实用组件框架
  ~
  ~ @author 徐泽宇 roamerxv@gmail.com
  ~ @version 1.0.0
  ~ Copyright (c) 2017. 徐泽宇
  ~
  --%>

<%--
  Created by IntelliJ IDEA.
  User: roamer
  Date: 2017/7/7
  Time: 下午12:34
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
  <head>
    <title>Boracay Web Smaple</title>
  </head>
  <body>
    <h1>Boracay Web Smaple</h1>
    <h2>
      <a href="https://github.com/roamerxv/boracay">项目 git 源码</a>
    </h2>
   <div>
     <ol>
       <li>
         <a href="<%=request.getContextPath()%>/test/500_error.json" >测试错误进行 json 化。500_error.json</a>
       </li>
       <li>
         <a href="<%=request.getContextPath()%>/test/500_error" >测试错误不进行 json 化。500_error</a>
       </li>
     </ol>

   </div>
  </body>
</html>
