#

Command to set up environment:

npm install express express-session mysql2
npm install -D typescript ts-node nodemon @types/node @types/express @types/express-session

npm init -y
tsc --init
create 'nodemon.json' manually


Command to use during development:

tsc -w                                  // Giám sát Giám sát sự thay đổi của các file trong folder, thay đổi thì tự động compile
npm start                               // Chạy script trong phần "start" ở package.json (trong trường hợp này là chạy nodemon)

nodemon.json explain:
{
    "watch": ["src"],                   // Giám sát sự thay đổi của các file trong folder...
    "ext" : ".ts, .js",                 // Giám sát sự thay đổi của các file có đuôi... trong folder "watch" :
    "exec" : "ts-node .../file.ts"      // Câu lệnh sử dụng để chạy chương trình... (thường là file index.ts khởi động server như
                                           express)
}