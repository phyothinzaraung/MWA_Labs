import { IQuestion } from "./questions.schema";

process.on('message', (data_string: string) => {
    const data: {results: string, question_id: string} = JSON.parse(data_string);
    // @ts-ignore
    const question = data.results ? JSON.parse(data.results).lectures[0].questions.filter((q: IQuestion) => q._id.toString() === data.question_id)[0] : {} as IQuestion;

    process.send && process.send(JSON.stringify(question));
})