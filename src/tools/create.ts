import * as vscode from 'vscode';
import { config } from '../config/config';
import { stringToUint8Array, Uint8ArrayToString,formatTextDucument } from './tool';

export namespace Create {

    /**
     * 创建文件
     * @param fileUri {vscode.Uri} -文件地址
     * @param content {string} -内容
     * @returns {Thenable<void>}
     */
    export function createFile(fileUri: vscode.Uri, content: string): Thenable<void> {
        let bytes = stringToUint8Array(content);
        let createFile = vscode.workspace.fs.writeFile(fileUri, bytes);
        return createFile;
    }

    /**
     * 创建目录
     * @param pageUri 页面路径
     * @returns {Thenable<void>}
     */
    export function createFolder(pageUri: vscode.Uri): Thenable<void> {
        let createPageFolder = vscode.workspace.fs.createDirectory(pageUri);
        return createPageFolder;
    }

    /**
     * 创建页面
     * @param pageName 页面名称
     */
    export function createPage(pageName: string, uri: vscode.Uri): void {
        let pagePath: string = ""; // 页面路径
        let rootPath: string = ""; // 小程序根路径
        if (uri.fsPath.match(/pages$/)) {
            // 在pages目录点击的话
            pagePath = `${uri.fsPath}\\${pageName}`;
            rootPath = uri.fsPath.replace('\\pages', '');
        }
        else {
            // 根目录点击新建
            pagePath = `${uri.fsPath}\\pages\\${pageName}`;
            rootPath = uri.fsPath;
        }
        let createFolderPro = createFolder(vscode.Uri.file(pagePath));
        createFolderPro.then(() => {
            try {
                for (let [i, v] of Object.entries(config.templates)) {
                    let filePath = vscode.Uri.file(`${pagePath}\\${pageName}.${i}`);
                    createFile(filePath, v);
                }
                // 更新app.json中的pages
                updatePages(vscode.Uri.file(`${rootPath}\\app.json`), pageName)
                vscode.window.showInformationMessage('创建页面成功');
            }
            catch (e) {
                vscode.window.showErrorMessage('创建页面失败');
            }
        });
    }

    /**
     * 更新页面配置文件
     * @param uri 小程序根地址
     * @param pageName 页面名称
     */
    export function updatePages(uri: vscode.Uri, pageName: string) {
        let getFilePromise = vscode.workspace.fs.readFile(uri);
        getFilePromise.then(value => {
            let appJson = Uint8ArrayToString(value);
            try {
                let appConfig: any = JSON.parse(appJson);
                appConfig.pages.push(`pages/${pageName}/${pageName}`)
                appJson = JSON.stringify(appConfig);
                // 存在格式化问题，调用一次格式化再写入
                appJson = formatTextDucument(appJson,'json');
                vscode.workspace.fs.writeFile(uri, stringToUint8Array(appJson))
            }
            catch (e) {

            }
        })
    }
}