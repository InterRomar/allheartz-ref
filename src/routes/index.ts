/* eslint-disable @typescript-eslint/no-explicit-any */
import * as changeCase from 'change-case';
import express from 'express';
import requireDirectory from 'require-directory';

requireDirectory.defaults.extensions = ['ts', 'js'];

const folderContent = requireDirectory(module, __dirname);

const setRoutes = (fileOrFolder: any, app: express.Express, path: string) => {
  if (typeof fileOrFolder === 'function') {
    const router = express.Router();
    fileOrFolder(router);

    app.use(path, router);
    return;
  }

  Object.keys(fileOrFolder).forEach((key) => {
    let newPath = path;
    if (typeof fileOrFolder[key] !== 'function') {
      newPath = `${path}/${changeCase.paramCase(key)}`;
    }
    setRoutes(fileOrFolder[key], app, newPath);
  });
};

export default (app: express.Express): void => {
  setRoutes(folderContent, app, '/api');
};
