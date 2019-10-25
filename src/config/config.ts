// import * as vscode from 'vscode';

export const defaultJsTemplate = `
Page({

  
  data: {

  },

  
  onLoad: function (options) {

  },

  
  onReady: function () {

  },

  
  onShow: function () {

  },

  
  onHide: function () {

  },

  
  onUnload: function () {

  },

  
  onPullDownRefresh: function () {

  },

  
  onReachBottom: function () {

  },

  
  onShareAppMessage: function () {

  }
})`;

export const defaultJsonTemplate = `{
    "usingComponents": {},
    "navigationBarTitleText": "title"
  }`;

export const defaultWxmlTemplate = `<text>page</text>`;
export const defaultWxssTemplate = `page{

}`;


        
// todo 目前vscode.workspace.fs.writeFile的content是uint8Array,
// [0-255],非asicc码会乱码，所以暂时去掉中文字符

export interface Templates {
    js: string,
    json: string,
    wxml: string,
    wxss: string
}



export interface Config {
    pagePath: string, // 页面路径一般默认pages
    templates: Templates
}

export const config: Config = {
    pagePath: 'pages', // 页面路径一般默认pages
    templates: {
        js: defaultJsTemplate,
        json: defaultJsonTemplate,
        wxml: defaultWxmlTemplate,
        wxss: defaultWxssTemplate
    }
}




