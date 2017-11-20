import {OrderedJobs} from "../src/orderedJobs";
describe("Ordered Jobs  ", () => {
    it("result should be an empty sequence when passed an empty string (no jobs)", () => {
        expect(OrderedJobs.getSequence()).toBe("");
    });

});