// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {Create} from './tools/create';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
 

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json

	let newPage = vscode.commands.registerCommand("wechat.newPage",(e)=>{
		const uri = vscode.Uri.parse(e.fsPath);		
		try{
			let inputPromise = vscode.window.showInputBox({
				placeHolder:"请输入页面名称",
			});
			inputPromise.then(v=>{
				// 用户输入的页面名称
				if(!v) return void 0;
				Create.createPage(v,uri);		
			});
		}catch(e){
			vscode.window.showErrorMessage(String(e));
		}
	})

	let reverseWord = vscode.commands.registerCommand('extension.reverseWord',()=>{
		let editor = vscode.window.activeTextEditor;
		if(editor){
			let document = editor.document;
			let selection = editor.selection;

			// Get the word within the selection
			let word = document.getText(selection);
			let reversed = word.split('').reverse().join('');
			editor.edit(editBuilder => {
				editBuilder.replace(selection, reversed);
			});
		}
	})



	context.subscriptions.push(newPage,reverseWord);
}

// this method is called when your extension is deactivated
export function deactivate() {}
