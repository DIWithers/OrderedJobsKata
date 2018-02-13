export class OrderedJobs {

    static getSequence(jobStructure: string): string {
        if (jobStructure === "") return "";
        let sequence: Array<string> = [];
        let jobs: Array<Job> = this.createJobs(jobStructure);
        if (this.invalidSyntaxDetected(jobs)) return "Error: Jobs must be a letter of the alphabet";
        this.addJobs(jobs, sequence);
        if (this.selfDependencyDetected(jobs)) return "Error: Jobs cannot depend on themselves.";
        let dependencyChain: Map<string, Array<string>> = this.formDependencyChain(jobs);
        if(this.circularDependencyDetected(dependencyChain)) return "Error: Jobs cannot have circular dependencies.";
        this.putJobsInOrder(jobs, sequence);
        return sequence.toString().replace(/,/g, "");
    }

    private static createJobs(jobStructure: string): Array<Job> {
        let jobs: any = jobStructure.split("\n").map((job: string) => {
            let extractedJobInfo: string = job.replace(/\W+/g, "");
            return new Job(extractedJobInfo);
        });
        return jobs;
    }
    private static invalidSyntaxDetected(jobs: Array<Job>): boolean {
        return jobs.some((job: Job) => {
            let regEx: RegExp = /[^a-zA-Z]/;
            return regEx.test(job.name) || regEx.test(job.dependency);
        });
    }
    private static addJobs(jobs: Array<Job>, sequence: Array<string>): void {
        jobs.forEach((job: Job) => {
            sequence.push(job.name);
        });
    }
    private static selfDependencyDetected(jobs: Array<Job>): boolean {
        return jobs.some((job: Job) => job.isSelfDependent());
    }

    private static formDependencyChain(jobs: Array<Job>): Map<string, Array<string>> {
        let dependencyChain: Map<string, Array<string>> = new Map<string, Array<string>>();
        for (let job of jobs) {
            if (job.hasDependency()) {
                let jobsToAdd: Array<string> = this.addToChain(dependencyChain, job);
                dependencyChain.set(job.dependency, jobsToAdd);
            }
        }
        return dependencyChain;
    }
    private static addToChain(dependencyChain: Map<string, Array<string>>, job): Array<string> {
        let jobsToAdd: Array<string> = [];
        if (dependencyChain.has(job.name)){
            jobsToAdd.push(job.name);
            (dependencyChain.get(job.name)).forEach((jobName) => {
                jobsToAdd.push(jobName)
            });
            return jobsToAdd;
        }
        jobsToAdd.push(job.name);
        return jobsToAdd;
    }
    private static circularDependencyDetected(dependencyChain: Map<string, Array<string>>) {
        return Array.from(dependencyChain.keys()).some((job: string) => {
            return job, dependencyChain.get(job).includes(job);
        });
    }
    private static putJobsInOrder(jobs: Array<Job>, sequence: Array<string>): void {
        for (let job of jobs) {
            let jobPosition: number = sequence.indexOf(job.name);
            let dependencyPosition: number = sequence.indexOf(job.dependency);
            if (dependencyPosition > jobPosition) {
                sequence.splice(dependencyPosition, 1);
                sequence.splice(jobPosition, 0, job.dependency);
            }
        }
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



