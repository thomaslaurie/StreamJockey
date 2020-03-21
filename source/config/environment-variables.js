//! this needs to be in its own file (not at the top of index.js) because imports are hoisted, which causes dotenv.config() to run after any module that uses environment variables immediately, which makes them undefined
//L https://stackoverflow.com/questions/42817339/es6-import-happening-before-env-import
import dotenv from 'dotenv';
dotenv.config({path: './config/.env'}); //C relative to root apparently