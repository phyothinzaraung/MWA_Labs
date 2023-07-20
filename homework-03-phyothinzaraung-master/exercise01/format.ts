import { Todo, Output } from "./types";
import {fork, ChildProcess} from "child_process";

export function format(response_body: Todo[]): Promise<{[userId: number]: Output[]}> {

    return new Promise(resolve => {
        const childProcess: ChildProcess = fork(__dirname + "/formatchild.ts");

        childProcess.on('message', (transformedResponse: {[userId:number]: Output[]}) => {
            resolve(transformedResponse);
        });

        childProcess.send(response_body);
    });
}