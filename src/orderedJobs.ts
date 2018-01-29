export class OrderedJobs {

    private static circularDependencyDetected: boolean;

    static getSequence(jobStructure: string): string {
        if (jobStructure === "") return "";
        let sequence: Array = [];
        let jobs: Array<Job> = this.createJobs(jobStructure);
        if (this.invalidSyntaxDetected(jobs)) return "Error: Jobs must be a letter of the alphabet";
        this.addJobs(jobs, sequence);
        this.putJobsInOrder(jobs, sequence);
        if (this.selfDependencyDetected(jobs)) return "Error: Jobs cannot depend on themselves.";
        if (this.circularDependencyDetected) return "Error: Jobs cannot have circular dependencies.";
        return sequence.toString().replace(/,/g, "");
    }
    private static createJobs(jobStructure: string): Array<Job> {
        let jobs: any = jobStructure.split("\n");
        jobs = jobs.map((job: string) => {
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
    private static addJobs(jobs: Array<Job>, sequence: Array): void {
        jobs.forEach((job: Job) => {
            sequence.push(job.name);
        });
    }
    private static putJobsInOrder(jobs: Array<Job>, sequence: Array): void {
        let dependencyChain: Array = [];
        for (let job of jobs) {
            console.log(job, dependencyChain);
            this.formDependencyChain(dependencyChain, job);
            let jobPosition: number = sequence.indexOf(job.name);
            let dependencyPosition: number = sequence.indexOf(job.dependency);
            if (dependencyPosition > jobPosition) {
                sequence.splice(dependencyPosition, 1);
                sequence.splice(jobPosition, 0, job.dependency);
            }
        }
    }

    private static formDependencyChain(dependencyChain: Array, job: Job): void {
        this.checkForCircularDependency(dependencyChain, job);
        if (job.hasDependency()) dependencyChain.push(job.dependency);
    }

    private static checkForCircularDependency(dependencyChain: Array, job: Job): void {
        if (dependencyChain.indexOf(job.dependency) !== -1) {
            this.circularDependencyDetected = true;
        }
    }
    private static selfDependencyDetected(jobs: Array<Job>): boolean {
        return jobs.some((job: Job) => job.isSelfDependent());
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



