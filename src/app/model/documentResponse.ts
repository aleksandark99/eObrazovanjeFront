export class Document {

    constructor(
        public url: string,
        public documentId: Number,
        private documentTitle: String,
        public createdAt: String
    ) { }
}