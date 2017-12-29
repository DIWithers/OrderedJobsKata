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
    });
    it("result should be a sequence that positions f before c, c before b, b before e and a before d, when: a => , b => c, c => f, d => a, e => b, f => ", () => {
        expect(OrderedJobs.getSequence("a => , b => c, c => f, d => a, e => b, f => ")).toBe("adfcbe");
    });

});
