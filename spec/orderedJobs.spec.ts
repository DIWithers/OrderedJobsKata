import {OrderedJobs} from "../src/orderedJobs";
describe("Ordered Jobs  ", () => {
    it("result should be an empty sequence when passed an empty string (no jobs)", () => {
        expect(OrderedJobs.getSequence("")).toBe("");
    });
    it("result should be a sequence consisting of a single name a when: a => ", () => {
        expect(OrderedJobs.getSequence("a => ")).toBe("a");
    });
    it("result should be a sequence containing all three jobs abc in no significant order when: a => , b => ,c => ", () => {
        expect(OrderedJobs.getSequence("a => \n b => \n c => ")).toBe("abc");
    });
    it("result should be a sequence that positions c before b, when: a => , b => c, c => ", () => {
        expect(OrderedJobs.getSequence("a => \n b => c \n c => ")).toBe("acb");
        //alt
        let result: string = OrderedJobs.getSequence("a => \n b => c \n c => ");
        expect(result.indexOf("c")).toBeLessThan(result.indexOf("b"));
    });
    it("result should be a sequence that positions f before c, c before b, b before e and a before d, when: a => , b => c, c => f, d => a, e => b, f => ", () => {
        expect(OrderedJobs.getSequence("a => \n b => c \n c => f \n d => a \n e => b \n f => ")).toBe("afcbde");
        //alt
        let result: string = OrderedJobs.getSequence("a => \n b => c \n c => f \n d => a \n e => b \n f => ");
        expect(result.indexOf("c")).toBeLessThan(result.indexOf("b"));
        expect(result.indexOf("f")).toBeLessThan(result.indexOf("c"));
        expect(result.indexOf("a")).toBeLessThan(result.indexOf("d"));
        expect(result.indexOf("b")).toBeLessThan(result.indexOf("e"));
    });
    it("result should be an error stating that jobs can’t depend on themselves", () => {
        expect(OrderedJobs.getSequence("a => \n b => c \n c => c")).toBe("Error: Jobs cannot depend on themselves.");
    });
    it("result should be an error stating that jobs can’t have circular dependencies", () => {
        expect(OrderedJobs.getSequence("a => b \n b => a ")).toBe("Error: Jobs cannot have circular dependencies.");
    });
    it("result should be an error stating that jobs can’t have circular dependencies", () => {
        expect(OrderedJobs.getSequence("a => \n b => c \n c => f \n d => a \n e => \n f => b")).toBe("Error: Jobs cannot have circular dependencies.");
    });
    it("result should be an error stating that jobs can’t have circular dependencies", () => {
        expect(OrderedJobs.getSequence("a => b \n b => c \n c => a")).toBe("Error: Jobs cannot have circular dependencies.");
    });
    it("result should be an error stating that job must be a letter of the alphabet if a job is the number 2", () => {
        expect(OrderedJobs.getSequence("a => b \n b => c \n c => 2")).toBe("Error: Jobs must be a letter of the alphabet");
    });
});
