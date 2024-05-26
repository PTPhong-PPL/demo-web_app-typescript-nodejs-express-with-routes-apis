# demo-web_app-typescript-nodejs-express-with-routes-apis

Demo a webapp made by TypeScript and NodeJS, Express (-session, -validator). Also experimenting APIs-routes-endpoint, cookies  

Used MySQL as database  

API -> routes -> controller logic -> services -> controller response -> client   

References:  
- Expressjs :  
https://www.youtube.com/playlist?list=PL_cUvD4qzbkwjmjy-KjbieZ8J9cGwxZpC  
- Folder structure (delete later) :  
https://www.youtube.com/watch?v=Cgvopu9zg8Y  
https://www.youtube.com/watch?v=oNlMrpnUSFE  
https://www.youtube.com/watch?v=fc6o1gwqZuA  

<br>
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
<br>

Command to set up environment:

>`npm install express express-session express-validator cookie-parser mysql2`  
>`npm install -D typescript ts-node nodemon @types/node @types/express @types/express-session`  
>
>`npm init -y`  
>`tsc --init`  
>`create 'nodemon.json' manually`  

Command to use during development:

>`tsc -w`&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&nbsp;// Giám sát Giám sát sự thay đổi của các file trong folder, thay đổi thì tự động compile  
>`npm start`&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;//Chạy script trong phần "start" ở package.json (trong trường hợp này là chạy nodemon)

<br>

nodemon.json explain:
>{  
>&emsp;&emsp;`"watch": ["src"],`&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;// Giám sát sự thay đổi của các file trong folder...  
>&emsp;&emsp;`"ext" : ".ts, .js",`&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;// Giám sát sự thay đổi của các file có đuôi... trong folder "watch":  
>&emsp;&emsp;`"exec" : "ts-node .../file.ts"`&emsp;// Câu lệnh sử dụng để chạy chương trình... (thường là file index.ts khởi động server như express)  
>}

PascalCase
PascalCase is used for naming classes and file names that typically export a single class.

Classes:

Controllers: e.g., UserController, ProductController
Models: e.g., UserModel, ProductModel
Services: e.g., ProductService, UserService
File Names for Classes:

Controllers: e.g., UserController.ts, ProductController.ts
Models: e.g., UserModel.ts, ProductModel.ts
Services: e.g., ProductService.ts, UserService.ts
camelCase
camelCase is used for naming variables, instances of classes.

Instances of Classes:
Service Instances: e.g., productService, userService
Controller Instances (if applicable): e.g., userController, productController
kebab-case
kebab-case is commonly used for naming files that do not export a single class, such as route files, middleware files, and utility files.

Non-Class File Names:
Routes: e.g., product-routes.ts, user-routes.ts
Middleware: e.g., auth-middleware.ts, error-handler.ts
Utilities: e.g., format-date.ts, logger.ts