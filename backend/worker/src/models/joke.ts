import { Document, model, Model, Schema } from "mongoose";

export interface IJoke extends Document {
    prompt: string;
    joke: string;
    }

    const jokeSchema: Schema<IJoke> = new Schema({
        prompt: {type: String, required: true},
        joke: {type: String, required: true}
    }, {
        timestamps: true
    });

    const Jokes: Model<IJoke> = model<IJoke>("Jokes", jokeSchema);