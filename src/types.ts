export type WarcRecord = {
    type: "warcinfo" | "response" | "resource" | "request" | "metadata" | "revisit" | "conversion" | "continuation",
    date: Date,
    body: String | Object
}
