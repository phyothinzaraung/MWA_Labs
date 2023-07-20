/// <reference types="node" />

import {Todo, Output} from "./types";

process.on('message', (response_body: Todo[])=> {
    const transformedResponse: {[userId:number]: Output[]} = {};
    response_body.forEach(item => {

        const {userId, ...Output} = item;
        
        if(!transformedResponse[userId]){
            transformedResponse[userId] = [Output];
        }else{
            transformedResponse[userId].push(Output);
        }
    });

    if(process.send){
        process.send(transformedResponse);
    }
});