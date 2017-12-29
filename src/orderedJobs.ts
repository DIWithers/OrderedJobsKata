export class OrderedJobs {

    static getSequence(jobs: string): string {
        let jobsDependencies: any = this.getJobDependencies(jobs);
        let sequence: any = [];
        let invalidDependency: boolean = this.checkForInvalidDependency(jobsDependencies);
        if (jobs === "") return "";
        if (invalidDependency) return "Error: Jobs cannot depend on themselves.";
        this.addJobsWithNoDependencies(jobsDependencies, sequence);
        this.addJobsWithDependencies(jobsDependencies, sequence);
        return sequence.toString().replace(/,/g, "");
    }

    private static checkForInvalidDependency(jobsDependencies: any): boolean {
        let invalidDependency: boolean = false;
        jobsDependencies.forEach((job: any) => {
            if (job.name === job.dependency) invalidDependency = true;
        });
        return invalidDependency;
    }

    private static addJobsWithDependencies(jobsDependencies: any, sequence: any): any {
        jobsDependencies.forEach((job: any) => {
            if (job.dependency !== undefined) {
                if (sequence.indexOf(job.dependency) === -1) sequence.push(job.dependency);
                let whereToInsert: number = sequence.indexOf(job.dependency) + 1;
                if (sequence.indexOf(job.name) === -1) sequence.splice(whereToInsert, 0, job.name);
            }
        });
    }

    private static addJobsWithNoDependencies(jobsDependencies: any, sequence: any): any {
        jobsDependencies.forEach((job: any) => {
            if (job.dependency === undefined && sequence.indexOf(job.name) === -1) sequence.push(job.name);

        });
    }

    private static getJobDependencies(jobs: string): any {
        let jobsDependencies: any = jobs.split("\n");
        jobsDependencies = jobsDependencies.map((job: any) => {
            let newJob: any = job.replace(/\W+/g, "");
            return {name: newJob[0], dependency: newJob[1]};
        })
        return jobsDependencies;
    }
}
