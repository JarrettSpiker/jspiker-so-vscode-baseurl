import * as vscode from 'vscode';
import {getAString} from "common/commonFile"


// called when the extension is first activated
export function activate(context: vscode.ExtensionContext) {

	console.log("The extension has been activated")

	// Provide implementations of the commmands defined in the package.json
	let samplecommand = vscode.commands.registerCommand("jspiker.samplecommand", () => {
		vscode.window.showInformationMessage(getAString());		
	});
	context.subscriptions.push(samplecommand);
}

// this method is called when your extension is deactivated
export function deactivate() { }
