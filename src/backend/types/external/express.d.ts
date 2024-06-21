import "express";

declare module 'express' {
    interface User {
        id: string;
        password: string;
    }
}