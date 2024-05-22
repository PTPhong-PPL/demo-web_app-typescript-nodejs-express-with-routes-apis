# demo-web_app-typescript-nodejs-express-with-routes-apis

Demo a webapp made by TypeScript and NodeJS, Express (-session, -validator). Also experimenting routes & APIs
        
Used MySQL as database

<br>

Command to set up environment:

>`npm install express express-session express-validator mysql2`  
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
