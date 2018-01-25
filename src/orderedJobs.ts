export class OrderedJobs {

    static getSequence(jobStructure: string): string {
        if (jobStructure === "") return "";
        let jobs: Array<Job> = this.createJobs(jobStructure);
        let sequence: Array = [];
        this.addJobsWithoutDependencies(jobs, sequence);
        this.addJobsWithDependencies(jobs, sequence);
        if (jobs.some((job: Job) => job.isSelfDependent())) return "Error: Jobs cannot depend on themselves.";
        let chain: Array = this.formDependencyChain(jobs);
        if (this.circularDependencyDetected(chain)) return "Error: Jobs cannot have circular dependencies.";
        console.log(sequence.toString().replace(/\W+/g, ""));
        return sequence.toString().replace(/,/g, "");
    }

    private static circularDependencyDetected(chain: Array<string>): boolean {
        let lastJob: string = "";
        let dependencyDetected: boolean = false;
        for (let job of chain) {
            if (job === lastJob)  dependencyDetected = true;
            lastJob = job;
        }
        return dependencyDetected;
    }

    private static formDependencyChain(jobs: Array<Job>): Array<string> {
        let chain: Array = [];
        for (let job of jobs) {
            if (job.hasDependency() && this.dependencyNotInSequence(chain, job)) chain.push(job.dependency);
            let whereToInsert: number = chain.indexOf(job.dependency) + 1;
            chain.splice(whereToInsert, 0, job.name);
        }
        return chain;
    }
    private static addJobsWithDependencies(jobs: Array<Job>, sequence: Array): void {
        for (let job of jobs) {
            if (job.hasDependency() && this.dependencyNotInSequence(sequence, job)) sequence.push(job.dependency);
            let whereToInsert: number = sequence.indexOf(job.dependency) + 1;
            if (this.jobNotInSequence(sequence, job)) sequence.splice(whereToInsert, 0, job.name);
        }
    }

    private static jobNotInSequence(sequence: Array, job: Job): boolean {
        return sequence.indexOf(job.name) === -1;
    }

    private static dependencyNotInSequence(sequence: Array, job: Job): boolean {
        return sequence.indexOf(job.dependency) === -1;
    }

    private static addJobsWithoutDependencies(jobs: Array<Job>, sequence: Array): void {
    jobs.forEach((job: Job) => {
        if (job.dependency === undefined) {
            if (sequence.indexOf(job.name) === -1) {
                sequence.push(job.name);
            }
        }
    });
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
    hasDependency(): boolean {
        return this.dependency !== undefined;
    }
    isSelfDependent(): boolean {
        return this.name === this.dependency;
    }
}



