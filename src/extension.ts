// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Your extension "copy-code-with-file-name" is now successfully active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('extension.cocoas', () => {
    // The code you place here will be executed every time your command is executed

    // 현재 열려 있는 편집기에서 선택한 코드 가져오기
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const selectedCode = editor.document.getText(editor.selection);
      const fileName = editor.document.fileName;

      // 프로젝트 폴더 경로 가져오기
      const projectFolder = vscode.workspace.getWorkspaceFolder(vscode.Uri.file(fileName));

      if (projectFolder) {
        const projectFolderPath = projectFolder.uri.fsPath;
        const relativeFilePath = path.relative(projectFolderPath, fileName);

        // 최상위 폴더와 파일 경로를 주석으로 복사
        const projectRoot = path.basename(projectFolderPath);
        const codeWithFilePath = `/* ${projectRoot}${path.sep}${relativeFilePath.replace(
          /\\/g,
          '/'
        )} */\n${selectedCode}`;
        // console.log({ fileName, projectFolder, projectFolderPath, relativeFilePath, projectRoot });
        vscode.env.clipboard.writeText(codeWithFilePath);
      }
    }

    // Display a message box to the user
    vscode.window.showInformationMessage('Copied code with file name!');
  });

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
