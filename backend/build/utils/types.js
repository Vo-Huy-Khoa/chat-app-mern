"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.URL_PRODUCTION = exports.URL_LOCALHOST = void 0;
exports.URL_LOCALHOST = process.env.URL_LOCALHOST || "http://localhost:3000";
exports.URL_PRODUCTION = process.env.URL_PRODUCTION || "https://chatapp-vo-huy-khoa.vercel.app";
exports.PORT = process.env.PORT || "3001";
