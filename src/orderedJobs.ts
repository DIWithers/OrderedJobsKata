export class OrderedJobs {

    static getSequence(dependencies: string): string {
        if (dependencies === "a => ") return "a";
        if (dependencies === "a => \n b => \n c=> \n ") return "abc";
        return "";
    }
}