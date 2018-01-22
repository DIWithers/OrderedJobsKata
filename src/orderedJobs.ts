export class OrderedJobs {

    static getSequence(jobStructure: string): string {
        let jobs: Array<Job> = this.createJobs(jobStructure);
        let sequence: Array = [];
        this.addJobsWithoutDependencies(jobs, sequence);
        if (jobStructure === "") return "";
        return sequence.toString().replace(/,/g, "");
    }

    private static addJobsWithoutDependencies(jobs: Array<Job>, sequence: Array): void {
        for (let job of jobs) {
            sequence.push(job.name);
        }
    }
    private static createJobs(jobStructure: string): Array<Job> {
        let jobs: any = jobStructure.split("\n");
        jobs = jobs.map((job: string) => {
            let extractedJobInfo: string = job.replace(/\W+/g, "");
            return new Job(extractedJobInfo);
        });
        return jobs;
    }
}
class Job {
    public name: string;
    public dependency: string;
    constructor(extractedJobInfo: string) {
        this.name = extractedJobInfo[0];
        this.dependency = extractedJobInfo[1];
    }
}



