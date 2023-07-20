import {ITag} from "../tags/tags.model"
import { IPicture } from "../pictures/pictures.model"

export const data: {
    blogs: IBlog[]} = {blogs :[]}

export interface IBlog{
    _id: string,
    title: string,
    body: string,
    tags: ITag[],
    pictures?: IPicture[]
}