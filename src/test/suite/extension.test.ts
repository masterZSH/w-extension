import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../extension';

import * as tool from '../../tools/tool';


suite('Extension Test Suite', () => {
	test('test string convert',()=>{
		let str = "😀🌿🎅";
		let uint8Arr = tool.stringToUint8Array(str)
		let strConvert = tool.Uint8ArrayToString(uint8Arr);
		assert.equal(strConvert,str);
	});
});
