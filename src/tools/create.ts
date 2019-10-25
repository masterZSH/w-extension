import * as vscode from 'vscode';
import { config } from '../config/config';
import { stringToUint8Array } from './tool';
const workspaceFolders = vscode.workspace.workspaceFolders;

export namespace Create {

    // path目录
    export const pageFolder = workspaceFolders ? `${workspaceFolders[0].uri.fsPath}\\${config.pagePath}` : ''

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
    export function createPage(pageName: string): void {
        if (!pageFolder) return void 0;
        const pagePath = `${pageFolder}\\${pageName}`;
        let createFolderPro = createFolder(vscode.Uri.file(pagePath));
        createFolderPro.then(() => {
            for (let [i, v] of Object.entries(config.templates)) {
                let filePath = vscode.Uri.file(`${pagePath}\\${pageName}.${i}`);
                createFile(filePath, v);
            }
        });
    }


}