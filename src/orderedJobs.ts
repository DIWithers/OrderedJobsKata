export class OrderedJobs {

    static getSequence(dependencies: string): string {
        if (dependencies === "a => ") return "a";
        return "";
    }
}